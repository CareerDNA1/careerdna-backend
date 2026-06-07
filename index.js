const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, ".env"), override: true });
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const { createClient } = require("@supabase/supabase-js");
const { randomUUID } = require("crypto");

const { CDNA_RUNTIME_CONFIG, MODEL_CHAIN, modelSupportsTemperature } = require("./src/lib/cdnaRuntimeConfig");

const { loadCdnaLibrary } = require("./src/lib/cdnaLibrary");
const {
  selectStrengths,
  selectCareerWorlds,
  selectEnvironmentsForWorlds,
  selectSegmentedSubjectsForCareerWorlds,
  selectRolesForSubject,
  findBestMatchingSubject,
  scoreItemByArchetypeOrder,
  scoreItemBySubdimensionProfile,
  scoreItemBreakdown,
  scoreItemTotal,
  buildScoredCareerWorldRows,
  buildScoredEnvironmentRows,
  buildScoredRoleRows,
  buildScoredSubjectRows,
  normalizeItemScoreToPct,
  getItemSignalFromBreakdown,
} = require("./src/lib/cdnaSelect");
const { buildReportPrompt, buildSelectionNarrativesPrompt } = require("./src/lib/cdnaProse");
const { buildRecommendationPayload } = require("./src/lib/cdnaRecommendationPayload");
const {
  buildCareerAdvisorMessages,
  buildAdvisorStarterPrompts,
  buildConversationSummaryMessages,
} = require("./src/lib/cdnaAdvisorPrompt");
const {
  buildProfileContext,
  canonSubdimName,
} = require("./src/lib/cdnaPickSubdims");
const {
  buildSelectionIndexes,
  getSelectionLibraryItem,
  buildSelectionInsight,
  extractCanonicalSignal,
} = require("./src/lib/cdnaSelectionInsights");

const app = express();
const port = process.env.PORT || 3001;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseAdmin = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;
const supabaseAuthClient = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

const stripe = process.env.STRIPE_SECRET_KEY
  ? require("stripe")(process.env.STRIPE_SECRET_KEY)
  : null;

function readEnvValueFromBackendDotenv(key) {
  try {
    const envPath = path.join(__dirname, ".env");
    const raw = fs.readFileSync(envPath, "utf8");
    const line = raw
      .split(/\r?\n/)
      .find((row) => row.trim().startsWith(`${key}=`));
    if (!line) return "";
    return line.slice(line.indexOf("=") + 1).trim().replace(/^[\"']|[\"']$/g, "");
  } catch (_) {
    return "";
  }
}

function getStripeWebhookSecret() {
  return String(
    process.env.STRIPE_WEBHOOK_SECRET ||
      readEnvValueFromBackendDotenv("STRIPE_WEBHOOK_SECRET") ||
      ""
  ).trim();
}

const allowedOrigins = new Set(
  (process.env.CDNA_ALLOWED_ORIGINS ||
    "http://localhost:3000,http://localhost:3001,https://mycareerdna.ai,https://www.mycareerdna.ai,https://mycareerdna.io,https://www.mycareerdna.io")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

const corsOptions = {
  origin: (origin, cb) => {
    // Allow non-browser/server-to-server requests with no Origin header.
    if (!origin || allowedOrigins.has(origin)) return cb(null, true);
    return cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

// Stripe webhooks must receive the raw request body for signature verification.
// This route MUST stay before express.json().
app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  console.log("Stripe webhook hit", {
    contentType: req.headers["content-type"],
    hasSignature: Boolean(req.headers["stripe-signature"]),
    hasStripeClient: Boolean(stripe),
    hasSupabaseAdmin: Boolean(supabaseAdmin),
    hasWebhookSecret: Boolean(getStripeWebhookSecret()),
  });

  try {
    if (!stripe) {
      console.error("Stripe webhook error: STRIPE_NOT_CONFIGURED");
      return res.status(500).json({ error: "STRIPE_NOT_CONFIGURED" });
    }

    if (!supabaseAdmin) {
      console.error("Stripe webhook error: SUPABASE_NOT_CONFIGURED");
      return res.status(500).json({ error: "SUPABASE_NOT_CONFIGURED" });
    }

    const webhookSecret = getStripeWebhookSecret();
    if (!webhookSecret) {
      console.error("Stripe webhook error: STRIPE_WEBHOOK_SECRET_NOT_CONFIGURED");
      return res.status(500).json({ error: "STRIPE_WEBHOOK_SECRET_NOT_CONFIGURED" });
    }

    const signature = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    } catch (err) {
      console.error("Stripe webhook signature verification failed:", err?.message || err);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log(`Stripe webhook verified: ${event.type} (${event.id})`);

    const stripeObject = event.data.object;
    let result = null;

    if (event.type === "checkout.session.completed") {
      console.log("Checkout session payload:", {
        id: stripeObject?.id,
        mode: stripeObject?.mode,
        customer: stripeObject?.customer,
        subscription: stripeObject?.subscription,
        client_reference_id: stripeObject?.client_reference_id,
        metadata: stripeObject?.metadata,
        payment_status: stripeObject?.payment_status,
      });

      result = await processCheckoutSessionCompleted(stripeObject, event);
      console.log("Stripe checkout processed:", result);
      return res.json({ received: true, processed: true, result });
    }

    if (event.type === "invoice.paid" || event.type === "invoice.payment_succeeded") {
      result = await processInvoicePaid(stripeObject, event);
      console.log("Stripe invoice processed:", result);
      return res.json({ received: true, processed: true, result });
    }

    if (event.type === "customer.subscription.updated" || event.type === "customer.subscription.deleted") {
      result = await processSubscriptionStatusChange(stripeObject, event);
      console.log("Stripe subscription status processed:", result);
      return res.json({ received: true, processed: true, result });
    }

    console.log(`Stripe webhook acknowledged without processing: ${event.type}`);
    return res.json({ received: true, ignored: true, type: event.type });
  } catch (err) {
    console.error("Stripe webhook processing failed:", err?.message || err, err?.stack || "");
    return res.status(500).json({
      error: "STRIPE_WEBHOOK_PROCESSING_FAILED",
      message: err?.message || "Unknown Stripe webhook processing error",
    });
  }
});

app.use(express.json({ limit: "2mb" }));

const {
  verbose: VERBOSE,
  logSummary: LOG_SUMMARY,
  devNoLlm: DEV_NO_LLM,
  maxLogItemsPerSection: MAX_LOG_ITEMS_PER_SECTION,
  minProseSubdimScore: MIN_PROSE_SUBDIM_SCORE,
  careerWorldLimit: CAREER_WORLD_LIMIT,
  schoolSubjectLimit: SCHOOL_SUBJECT_LIMIT,
  roleLimit: ROLE_LIMIT,
  environmentLimit: ENVIRONMENT_LIMIT,
  strengthLimit: STRENGTH_LIMIT,
  defaultMaxSpillovers: DEFAULT_MAX_SPILLOVERS,
  profileOptions: PROFILE_OPTIONS,
} = CDNA_RUNTIME_CONFIG;
const CDNA_LIBRARY = loadCdnaLibrary();
const CDNA_SELECTION_INDEXES = buildSelectionIndexes(CDNA_LIBRARY);
const CDNA_LIBRARY_COUNTS = Object.freeze({
  career_worlds: CDNA_LIBRARY.career_worlds.length,
  strengths: CDNA_LIBRARY.strengths.length,
  environments: CDNA_LIBRARY.environments.length,
  subjects: CDNA_LIBRARY.subjects.length,
  rolesFlat: CDNA_LIBRARY.rolesFlat.length,
});

function logVerbose(...args) {
  if (VERBOSE) console.log(...args);
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

function normalizeSubjects(input) {
  if (input == null) return [];
  if (Array.isArray(input)) return input.map((x) => String(x).trim()).filter(Boolean);
  if (typeof input === "string") return [input.trim()].filter(Boolean);
  return [];
}

function normalizeStatus(raw) {
  const s = String(raw || "").trim().toLowerCase();
  if (["school", "undergraduate", "postgraduate"].includes(s)) return s;
  if (["gcse", "a-level", "alevel", "sixth form", "sixth-form"].includes(s)) return "school";
  if (["undergrad", "ug"].includes(s)) return "undergraduate";
  if (["postgrad", "pg", "masters", "master", "msc", "mba"].includes(s)) return "postgraduate";
  return "";
}

function buildItemArchetypeMap(list, includedList) {
  const inc = new Set(includedList || []);
  const out = {};
  for (const it of list || []) {
    const tags = Array.isArray(it?.archetypes) ? it.archetypes : [];
    out[it.title] = tags.filter((t) => inc.has(t));
  }
  return out;
}

function buildItemLookupKey(item = {}) {
  return String(item?.id || item?.title || "").toLowerCase();
}

function uniqByIdOrTitle(items = []) {
  const out = [];
  const seen = new Set();
  for (const item of Array.isArray(items) ? items : []) {
    const key = buildItemLookupKey(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function buildSimpleScoreMap(items = [], scoreFn = () => 0) {
  return new Map(
    (items || []).map((item) => {
      const key = buildItemLookupKey(item);
      return [key, { item, score: Number(scoreFn(item)) || 0 }];
    })
  );
}

function buildSubjectScoreMap(items = [], metaByKey = new Map(), scoreFn = () => 0) {
  return new Map(
    (items || []).map((item) => {
      const key = buildItemLookupKey(item);
      const meta = metaByKey.get(key) || null;
      const score = meta ? Number(meta.finalScore || 0) : Number(scoreFn(item)) || 0;
      return [key, { item, score, meta }];
    })
  );
}

function stripInternalMeta(item = {}) {
  const clone = { ...item };
  delete clone.__cdnaSubjectScore;
  delete clone.__cdnaCareerWorldScore;
  return clone;
}

function normalizeMetaNumbers(meta = {}) {
  const out = {};
  for (const [key, value] of Object.entries(meta || {})) {
    out[key] = typeof value === "number" ? Number(value) : value;
  }
  return out;
}

function clampNumber(min, max, value) {
  return Math.min(max, Math.max(min, value));
}

function getLabelFromRankBand(rankPosition = 1, populationSize = 0) {
  const total = Math.max(0, Number(populationSize) || 0);
  const rank = Math.max(1, Number(rankPosition) || 1);

  if (total <= 1) return { signalLabel: "Standout", signalBlocks: 4 };

  const standoutCount = Math.max(1, Math.floor(total * 0.15));
  const strongCount = Math.max(1, Math.floor(total * 0.20));
  const goodCount = Math.max(1, Math.floor(total * 0.20));

  if (rank <= standoutCount) return { signalLabel: "Standout", signalBlocks: 4 };
  if (rank <= standoutCount + strongCount) return { signalLabel: "Strong", signalBlocks: 3 };
  if (rank <= standoutCount + strongCount + goodCount) return { signalLabel: "Good", signalBlocks: 2 };
  return { signalLabel: "Lower", signalBlocks: 1 };
}

function buildRelativeSignal(score = 0, populationScoreMap = new Map(), fallbackSignal = {}) {
  const populationScores = Array.from((populationScoreMap || new Map()).values())
    .map((row) => Number(row?.score))
    .filter((value) => Number.isFinite(value))
    .sort((a, b) => b - a);

  const currentScore = Number(score);
  const safeScore = Number.isFinite(currentScore) ? currentScore : 0;

  const total = populationScores.length;
  const higherCount = populationScores.filter((value) => value > safeScore).length;
  const equalCount = populationScores.filter((value) => value === safeScore).length || 1;
  const avgRank = higherCount + ((equalCount + 1) / 2);

  let relativePct = 0;
  if (total <= 1) {
    relativePct = safeScore > 0 ? 100 : 0;
  } else {
    relativePct = 100 * (1 - ((avgRank - 1) / (total - 1)));
  }

  relativePct = clampNumber(0, 100, relativePct);

  return {
    signalPct: Number(relativePct.toFixed(1)),
    fitPct: Number(fallbackSignal?.fitPct || 0),
    coveragePct: Number(fallbackSignal?.coveragePct || 0),
    coverageRatio: Number(fallbackSignal?.coverageRatio || 0),
    ...getLabelFromRankBand(avgRank, total),
  };
}

function buildSectionSignals(items = [], scoreMap = new Map(), breakdownMap = new Map(), itemType = "", populationScoreMap = scoreMap) {
  const rows = (items || [])
    .map((item) => {
      const row = scoreMap.get(buildItemLookupKey(item));
      const breakdown = breakdownMap.get(buildItemLookupKey(item)) || null;
      const score = Number(row?.score);
      const baseSignal = getItemSignalFromBreakdown(
        breakdown || { totalScore: score, absoluteFitPct: normalizeItemScoreToPct(score) }
      );
      const signal = buildRelativeSignal(score, populationScoreMap, baseSignal);

      return {
        id: item?.id || null,
        type: itemType || "",
        title: item?.title || "",
        careerWorldId: item?.careerWorldId || "",
        careerWorldTitle: item?.careerWorldTitle || "",
        familyTitle: item?.roleFamilyTitle || item?.subjectFamily || "",
        score: Number.isFinite(score) ? score : 0,
        signal,
      };
    })
    .filter((row) => row.title);

  return rows.map((row) => ({
    id: row.id,
    type: row.type,
    title: row.title,
    careerWorldId: row.careerWorldId,
    careerWorldTitle: row.careerWorldTitle,
    familyTitle: row.familyTitle,
    score: Number(row.score.toFixed(3)),
    ratioToTop: Number((row.signal.signalPct / 100).toFixed(3)),
    signalPct: Number(row.signal.signalPct),
    fitPct: Number(row.signal.fitPct),
    coveragePct: Number(row.signal.coveragePct),
    coreCoverageRatio: Number(Number(row.signal.coverageRatio || 0).toFixed(3)),
    signalLabel: row.signal.signalLabel,
    signalBlocks: row.signal.signalBlocks,
  }));
}

function getUserSubdimPct(userSubdimMap = new Map(), rawName = "") {
  const wanted = canonSubdimName(rawName);
  if (!wanted) return 0;

  for (const [name, score] of userSubdimMap.entries()) {
    if (canonSubdimName(name) === wanted) {
      const n = Number(score);
      return Number.isFinite(n) ? n : 0;
    }
  }

  return 0;
}

function uniqSubdims(values = []) {
  const out = [];
  const seen = new Set();

  for (const value of values || []) {
    const key = canonSubdimName(value);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(String(value).trim());
  }

  return out;
}

function readSubdimensionName(value) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") return value.name || value.title || value.label || value.subdimension || "";
  return "";
}

function getExplicitItemSubdimensionPool(item = {}) {
  // Prose evidence comes from the item's own designed evidence only.
  // It no longer uses canonical pairs or matched pairs.
  return uniqSubdims([
    ...(Array.isArray(item?.coreSubdimensions) ? item.coreSubdimensions : []),
    ...(Array.isArray(item?.keySubdimensions) ? item.keySubdimensions : []),
    ...(Array.isArray(item?.evidenceSubdims) ? item.evidenceSubdims : []),
    ...(Array.isArray(item?.primarySubdimensions) ? item.primarySubdimensions : []),
    ...(Array.isArray(item?.secondarySubdimensions) ? item.secondarySubdimensions : []),
    ...(Array.isArray(item?.signatureSubdimensions) ? item.signatureSubdimensions.map(readSubdimensionName) : []),
    ...(Array.isArray(item?.roleFamilyCoreSubdimensions) ? item.roleFamilyCoreSubdimensions : []),
    ...(Array.isArray(item?.roleFamilyKeySubdimensions) ? item.roleFamilyKeySubdimensions : []),
    ...(Array.isArray(item?.roleFamilySecondarySubdimensions) ? item.roleFamilySecondarySubdimensions : []),
    ...(Array.isArray(item?.careerWorldCoreSubdimensions) ? item.careerWorldCoreSubdimensions : []),
    ...(Array.isArray(item?.careerWorldKeySubdimensions) ? item.careerWorldKeySubdimensions : []),
    ...(Array.isArray(item?.careerWorldSecondarySubdimensions) ? item.careerWorldSecondarySubdimensions : []),
    ...(Array.isArray(item?.subdimensions) ? item.subdimensions.map(readSubdimensionName) : []),
  ]);
}

function pickProseSubdimensionsForItem(item = {}, userSubdimMap = new Map(), { maxCount = 3, minPct = MIN_PROSE_SUBDIM_SCORE } = {}) {
  const explicitPool = getExplicitItemSubdimensionPool(item);
  const poolOrder = new Map(explicitPool.map((name, index) => [canonSubdimName(name), index]));

  const scored = explicitPool
    .map((name) => ({ name, pct: getUserSubdimPct(userSubdimMap, name), order: poolOrder.get(canonSubdimName(name)) ?? 999 }))
    .filter((row) => row.name)
    .sort((a, b) => {
      if (b.pct !== a.pct) return b.pct - a.pct;
      return a.order - b.order;
    });

  const strong = scored.filter((row) => row.pct >= minPct).slice(0, maxCount).map((row) => row.name);
  const fallback = !strong.length && scored.length ? scored.slice(0, Math.min(1, maxCount)).map((row) => row.name) : [];
  const picked = strong.length ? strong : fallback;

  return {
    picked,
    strong,
    allDesigned: explicitPool,
    minPct,
    maxCount,
  };
}

function buildItemSubdimContextForSection(items = [], userSubdimMap = new Map(), maxCount = 3, minPct = MIN_PROSE_SUBDIM_SCORE) {
  const context = {};
  const hints = {};
  const evidence = {};

  for (const item of items || []) {
    const title = String(item?.title || "").trim();
    if (!title) continue;

    const pickedView = pickProseSubdimensionsForItem(item, userSubdimMap, { maxCount, minPct });
    const subdims = pickedView.picked || [];

    context[title] = {
      prose_subdims: subdims,
      matched_user_subdims: subdims,
      item_relevant_subdims: subdims,
      strong_user_subdims: pickedView.strong || [],
      all_designed_subdims: pickedView.allDesigned || [],
    };

    hints[title] = subdims;
    evidence[title] = {
      subdimensions: subdims,
      strong_user_subdims: pickedView.strong || [],
      all_designed_subdims: pickedView.allDesigned || [],
      minPct: pickedView.minPct,
      maxCount: pickedView.maxCount,
    };
  }

  return { context, hints, pairs: evidence };
}

function parseSummaryRequest(body = {}) {
  const { archetypes, age, status: rawStatus, schoolSubjects, uniSubject, subdims, subdimensions } = body;

  const status = normalizeStatus(rawStatus);
  if (!archetypes || typeof archetypes !== "object") {
    return { error: { status: 400, summary: "⚠️ Invalid or missing archetype data." } };
  }

  if (!status) {
    return { error: { status: 400, summary: "⚠️ Invalid or missing status." } };
  }

  let subjects = [];
  if (status === "school") {
    subjects = normalizeSubjects(schoolSubjects);
  } else {
    const uni = typeof uniSubject === "string" ? uniSubject.trim() : "";
    if (!uni) {
      return { error: { status: 400, summary: "⚠️ University subject must be a non-empty string." } };
    }
    subjects = [uni];
  }

  return {
    value: {
      archetypes,
      age,
      status,
      subjects,
      incomingSubdims: Array.isArray(subdims) && subdims.length ? subdims : subdimensions,
    },
  };
}

function buildProfileBundle(archetypes, incomingSubdims = []) {
  const profile = buildProfileContext(archetypes, incomingSubdims || [], PROFILE_OPTIONS);

  logVerbose("Sorted archetypes:", JSON.stringify(profile.sorted.slice(0, 10), null, 2));
  logVerbose("Included archetypes:", profile.included);
  logVerbose("Top subdimensions:", JSON.stringify(profile.topSubdimProfile.slice(0, 12), null, 2));

  const allowedSubdimsForPrompt = profile.topSubdimProfile.length
    ? profile.topSubdimProfile.map((x) => x.name)
    : profile.allowedSubdims;

  const ctx = {
    includedArchetypes: profile.included,
    includedWeights: profile.includedWeights,
    fullArchetypes: profile.sorted,
    topSubdimMap: profile.topSubdimMap,
    topSubdimProfile: profile.topSubdimProfile,
    fullSubdimMap: profile.fullSubdimMap,
    userSubdimMap: profile.userSubdimMap,
  };

  return { profile, ctx, allowedSubdimsForPrompt };
}

function buildCareerWorldSelectionOptions(subjects, allSubjects) {
  return {
    subjectLabels: subjects,
    allSubjects,
    strictSubjectAnchoring: true,
    maxSpillovers: DEFAULT_MAX_SPILLOVERS,
  };
}

function buildCareerWorldMetaById(worldDebugRows = []) {
  return new Map(
    worldDebugRows.map((row, idx) => [
      String(row?.item?.id || ""),
      {
        finalScore: Number(row?.score || 0),
        baseScore: Number(row?.baseScore || 0),
        subjectBonus: Number(row?.subjectBonus || 0),
        subjectTier: row?.subjectTier || "other",
        displayRank: idx + 1,
      },
    ])
  );
}

function sortCareerWorldsByMeta(careerWorlds = [], careerWorldMetaById = new Map()) {
  return (careerWorlds || []).slice().sort((a, b) => {
    const sa = Number(careerWorldMetaById.get(String(a?.id || ""))?.finalScore || 0);
    const sb = Number(careerWorldMetaById.get(String(b?.id || ""))?.finalScore || 0);
    if (sb !== sa) return sb - sa;
    return String(a?.title || "").localeCompare(String(b?.title || ""));
  });
}


function normalizeMatrixMatchLabel(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findUniversityPathwayMatrixEntry(matchedSubject = null, subjectLabel = "", matrix = []) {
  const rows = Array.isArray(matrix) ? matrix : [];
  const subjectId = String(matchedSubject?.id || "").trim();
  const subjectTitle = normalizeMatrixMatchLabel(matchedSubject?.title || "");
  const requestedTitle = normalizeMatrixMatchLabel(subjectLabel || "");
  if (!rows.length) return null;
  return rows.find((row) => String(row?.subjectId || "").trim() === subjectId) ||
    rows.find((row) => normalizeMatrixMatchLabel(row?.subjectTitle || "") === subjectTitle) ||
    rows.find((row) => normalizeMatrixMatchLabel(row?.subjectTitle || "") === requestedTitle) ||
    null;
}

function buildRoleFamilyItemsFromRoles(allRoles = []) {
  const groups = new Map();
  for (const role of Array.isArray(allRoles) ? allRoles : []) {
    const familyId = String(role?.roleFamilyId || "").trim();
    const familyTitle = String(role?.roleFamilyTitle || "").trim();
    if (!familyId || !familyTitle) continue;
    if (!groups.has(familyId)) {
      groups.set(familyId, {
        id: familyId,
        title: familyTitle,
        type: "pathway",
        careerWorldId: role?.careerWorldId || role?.primaryCareerWorldId || "",
        careerWorldTitle: role?.careerWorldTitle || role?.primaryCareerWorldTitle || "",
        roleFamilyId: familyId,
        roleFamilyTitle: familyTitle,
        familyTitle,
        archetypes: Array.isArray(role?.roleFamilyArchetypes) && role.roleFamilyArchetypes.length ? role.roleFamilyArchetypes : (Array.isArray(role?.archetypes) ? role.archetypes : []),
        keySubdimensions: Array.isArray(role?.roleFamilyKeySubdimensions) && role.roleFamilyKeySubdimensions.length ? role.roleFamilyKeySubdimensions : (Array.isArray(role?.keySubdimensions) ? role.keySubdimensions : []),
        coreSubdimensions: Array.isArray(role?.roleFamilyCoreSubdimensions) ? role.roleFamilyCoreSubdimensions : [],
        secondarySubdimensions: Array.isArray(role?.roleFamilySecondarySubdimensions) ? role.roleFamilySecondarySubdimensions : [],
        whyBelongs: role?.whyBelongs || "",
        confidence: role?.confidence || "",
        primarySubjectIds: [],
        adjacentSubjectIds: [],
        roles: [],
      });
    }
    const family = groups.get(familyId);
    family.primarySubjectIds = uniq([...(family.primarySubjectIds || []), ...(Array.isArray(role?.primarySubjectIds) ? role.primarySubjectIds : [])]);
    family.adjacentSubjectIds = uniq([...(family.adjacentSubjectIds || []), ...(Array.isArray(role?.adjacentSubjectIds) ? role.adjacentSubjectIds : [])]);
    family.roles.push({
      id: role?.id || "",
      title: role?.title || "",
      archetypes: Array.isArray(role?.archetypes) ? role.archetypes : [],
      keySubdimensions: Array.isArray(role?.keySubdimensions) ? role.keySubdimensions : [],
      entryLevelFit: role?.entryLevelFit || "",
    });
  }
  return Array.from(groups.values());
}

function scoreRoleFamiliesByIds(roleFamilies = [], ids = [], ctx = {}) {
  const wanted = new Set((Array.isArray(ids) ? ids : []).map(String).filter(Boolean));
  if (!wanted.size) return [];
  return (Array.isArray(roleFamilies) ? roleFamilies : [])
    .filter((family) => wanted.has(String(family?.id || family?.roleFamilyId || "")))
    .map((family) => ({ family, score: scoreItemTotal(family, ctx) }))
    .sort((a, b) => b.score !== a.score ? b.score - a.score : String(a?.family?.title || "").localeCompare(String(b?.family?.title || "")));
}

function buildRoleFamilyPopulationScoreMap(roleFamilies = [], ctx = {}) {
  return new Map((Array.isArray(roleFamilies) ? roleFamilies : []).map((family) => [buildItemLookupKey(family), { item: family, score: Number(scoreItemTotal(family, ctx) || 0) }]));
}

function getRoleFamilySignalLabel(family = {}, score = 0, populationScoreMap = new Map()) {
  const signal = buildRelativeSignal(Number(score || 0), populationScoreMap, {
    fitPct: normalizeItemScoreToPct(Number(score || 0)),
    coveragePct: 0,
    coverageRatio: 0,
  });
  return signal?.signalLabel || "Lower";
}

function pickMatrixRoleFamilyRows(rows = [], roleFamilies = [], ctx = {}, {
  limit = ROLE_LIMIT,
  minimum = 0,
  requireGoodFit = false,
  allowMinimumFallback = false,
  populationScoreMapOverride = null,
} = {}) {
  const populationScoreMap = populationScoreMapOverride || buildRoleFamilyPopulationScoreMap(roleFamilies, ctx);
  const enrichedRows = (Array.isArray(rows) ? rows : []).map((row) => ({
    ...row,
    signalLabel: getRoleFamilySignalLabel(row.family, row.score, populationScoreMap),
  }));
  const picked = [];
  const seen = new Set();
  const addRow = (row, cap = limit) => {
    const key = buildItemLookupKey(row?.family);
    if (!key || seen.has(key) || picked.length >= cap) return;
    picked.push(row);
    seen.add(key);
  };
  const normaliseSignalLabel = (label) => String(label || "Lower").trim().toLowerCase();
  const isGoodOrBetter = (row) => ["standout", "strong", "good"].includes(normaliseSignalLabel(row?.signalLabel));
  const isStrongOrBetter = (row) => ["standout", "strong"].includes(normaliseSignalLabel(row?.signalLabel));

  // First pass: always prioritise pathways that are Good / Strong / Standout.
  const goodOrBetterRows = enrichedRows.filter(isGoodOrBetter);
  goodOrBetterRows.filter(isStrongOrBetter).forEach((row) => addRow(row));
  goodOrBetterRows.filter((row) => normaliseSignalLabel(row?.signalLabel) === "good").forEach((row) => addRow(row));

  // Main pathway behaviour: show up to the limit only when the options are at least Good.
  // If fewer than the requested minimum are Good+, backfill only up to the minimum with the next-best Lower rows.
  // Adjacent pathway behaviour: by default, hide weak adjacent matches; allowMinimumFallback can show a small fallback list
  // so the adjacent section does not disappear entirely when all adjacent options are scored Lower.
  if ((!requireGoodFit || allowMinimumFallback) && picked.length < minimum) {
    enrichedRows
      .filter((row) => normaliseSignalLabel(row?.signalLabel) === "lower")
      .forEach((row) => addRow(row, minimum));
  }

  return picked.map((row) => stripInternalMeta(row.family));
}

function selectUniversityPathwaysFromMatrix({ matchedSubject = null, subjectLabel = "", roleFamilies = [], matrix = [], ctx = {}, adjacentPopulationScoreMap = null }) {
  const matrixEntry = findUniversityPathwayMatrixEntry(matchedSubject, subjectLabel, matrix);
  if (!matrixEntry) return { matrixEntry: null, aligned: [], adjacent: [] };
  const coreIds = Array.isArray(matrixEntry.corePathwayIds) ? matrixEntry.corePathwayIds : [];
  const adjacentIds = Array.isArray(matrixEntry.adjacentPathwayIds) ? matrixEntry.adjacentPathwayIds : [];
  const coreIdSet = new Set(coreIds.map(String));
  const alignedRows = scoreRoleFamiliesByIds(roleFamilies, coreIds, ctx);
  const adjacentRows = scoreRoleFamiliesByIds(roleFamilies, adjacentIds.filter((id) => !coreIdSet.has(String(id))), ctx);
  const aligned = pickMatrixRoleFamilyRows(alignedRows, roleFamilies, ctx, {
    limit: Math.min(7, ROLE_LIMIT),
    minimum: Math.min(5, alignedRows.length),
    requireGoodFit: false,
  });
  const alignedIdSet = new Set(aligned.map((family) => String(family?.id || family?.roleFamilyId || "")));
  const adjacent = pickMatrixRoleFamilyRows(adjacentRows.filter((row) => !alignedIdSet.has(String(row?.family?.id || row?.family?.roleFamilyId || ""))), roleFamilies, ctx, {
    limit: 3,
    minimum: Math.min(2, adjacentRows.length),
    requireGoodFit: true,
    allowMinimumFallback: true,
    populationScoreMapOverride: adjacentPopulationScoreMap,
  });
  return { matrixEntry, aligned, adjacent };
}

function selectRecommendations({ status, subjects, ctx, lib }) {
  const matchedSubject = status !== "school" ? findBestMatchingSubject(subjects[0], lib.subjects) : null;

  const careerWorldSelectionOptions = buildCareerWorldSelectionOptions(subjects, lib.subjects);
  const selectedCareerWorlds = selectCareerWorlds(lib.career_worlds, ctx, CAREER_WORLD_LIMIT, careerWorldSelectionOptions);
  const worldDebugRows = buildScoredCareerWorldRows(lib.career_worlds, ctx, careerWorldSelectionOptions);
  const careerWorldMetaById = buildCareerWorldMetaById(worldDebugRows);

  let topCareerWorlds = sortCareerWorldsByMeta(selectedCareerWorlds, careerWorldMetaById).map(stripInternalMeta);
  let topCareerWorldsAligned = [];
  let topCareerWorldsOther = [];
  let profileMode = null;

  const topStrengths = selectStrengths(lib.strengths, ctx, STRENGTH_LIMIT).map(stripInternalMeta);
  const topEnvironments = selectEnvironmentsForWorlds(lib.environments, topCareerWorlds, ctx, ENVIRONMENT_LIMIT).map(stripInternalMeta);

  let topSubjects = [];
  let topBroadSubjects = [];
  let topSpecialistSubjects = [];
  let topSubjectsBestFit = [];
  let topSubjectsOther = [];
  let topSubjectsAligned = [];
  let topSubjectsExploratory = [];
  let topRoles = [];
  let topRolesAligned = [];
  let topRolesAdjacent = [];
  let matchedPathwayMatrixEntry = null;
  let subjectMetaByKey = new Map();

  if (status === "school") {
    const hasSubjectInterest = (subjects || []).some((x) => String(x || "").trim());

    if (hasSubjectInterest) {
      const isRelevantTier = (row) => {
        const tier = String(row?.subjectTier || "").toLowerCase();
        return tier === "primary" || tier === "secondary";
      };

      const alignedRows = (worldDebugRows || []).filter((row) => isRelevantTier(row));
      const subjectWorldIds = new Set(
        alignedRows
          .map((row) => String(row?.item?.id || ""))
          .filter(Boolean)
      );
      const otherRows = (worldDebugRows || []).filter((row) => {
        const worldId = String(row?.item?.id || "");
        if (!worldId) return false;
        return !subjectWorldIds.has(worldId);
      });

      topCareerWorldsAligned = alignedRows.slice(0, 3).map((row) => stripInternalMeta(row.item));
      topCareerWorldsOther = otherRows.slice(0, 3).map((row) => stripInternalMeta(row.item));
      topCareerWorlds = [...topCareerWorldsAligned, ...topCareerWorldsOther];
      profileMode = "school_interest";
    } else {
      topCareerWorldsAligned = [];
      topCareerWorldsOther = [];
      topCareerWorlds = sortCareerWorldsByMeta(selectedCareerWorlds, careerWorldMetaById).map(stripInternalMeta);
      profileMode = "school_general";
    }

    const segmentedSubjects = selectSegmentedSubjectsForCareerWorlds(lib.subjects, topCareerWorlds, ctx, {
      userSubjects: subjects,
      total: SCHOOL_SUBJECT_LIMIT,
      broadTarget: 6,
      specialistMax: 4,
    });
    topBroadSubjects = segmentedSubjects.broad.map(({ item }) => stripInternalMeta(item));
    topSpecialistSubjects = segmentedSubjects.specialist.map(({ item }) => stripInternalMeta(item));
    topSubjects = segmentedSubjects.combined.map(({ item }) => stripInternalMeta(item));

    // Subject groups used by the visible report, signal metadata, and Discover More accordions.
    // Keep these as explicit aliases instead of relying only on topSubjects so the prose layer can
    // generate the same item-by-item narratives for subjects as it does for strengths/worlds/pathways.
    topSubjectsBestFit = topBroadSubjects;
    topSubjectsOther = topSpecialistSubjects;
    topSubjectsAligned = topBroadSubjects;
    topSubjectsExploratory = topSpecialistSubjects;

    subjectMetaByKey = new Map(
      segmentedSubjects.combined.map(({ item, meta }) => [buildItemLookupKey(item), normalizeMetaNumbers(meta)])
    );
  } else {
    const roleFamilies = buildRoleFamilyItemsFromRoles(lib.rolesFlat);
    const adjacentPopulationScoreMap = new Map(
      buildScoredRoleRows(lib.rolesFlat, matchedSubject, topCareerWorlds, ctx).map((row) => [
        buildItemLookupKey(row?.item),
        { item: row?.item, score: Number(row?.score || 0) },
      ])
    );

    const matrixSelection = selectUniversityPathwaysFromMatrix({
      matchedSubject,
      subjectLabel: subjects[0],
      roleFamilies,
      matrix: lib.universityPathwayMatrix,
      ctx,
      adjacentPopulationScoreMap,
    });

    matchedPathwayMatrixEntry = matrixSelection.matrixEntry;

    if (matchedPathwayMatrixEntry) {
      topRolesAligned = matrixSelection.aligned;
      topRolesAdjacent = matrixSelection.adjacent;
      topRoles = [...topRolesAligned, ...topRolesAdjacent];
      profileMode = "university_subject_matrix";
    } else {
      topRoles = selectRolesForSubject(lib.rolesFlat, matchedSubject, topCareerWorlds, ctx, { total: ROLE_LIMIT }).map(stripInternalMeta);
      topRolesAligned = topRoles;
      topRolesAdjacent = [];
      profileMode = "university_general";
    }
  }

  return {
    matchedSubject,
    matchedPathwayMatrixEntry,
    careerWorldSelectionOptions,
    worldDebugRows,
    careerWorldMetaById,
    subjectMetaByKey,
    profileMode,
    topCareerWorlds,
    topCareerWorldsAligned,
    topCareerWorldsOther,
    topStrengths,
    topEnvironments,
    topSubjects,
    topBroadSubjects,
    topSpecialistSubjects,
    topSubjectsBestFit,
    topSubjectsOther,
    topSubjectsAligned,
    topSubjectsExploratory,
    topRoles,
    topRolesAligned,
    topRolesAdjacent,
  };
}

function buildScoreMaps(recommendations, ctx) {
  return {
    strengthScoreMap: buildSimpleScoreMap(recommendations.topStrengths, (item) => scoreItemTotal(item, ctx)),
    environmentScoreMap: buildSimpleScoreMap(recommendations.topEnvironments, (item) => scoreItemTotal(item, ctx)),
    careerWorldScoreMap: buildSimpleScoreMap(
      recommendations.topCareerWorlds,
      (item) => Number(recommendations.careerWorldMetaById.get(String(item?.id || ""))?.finalScore || scoreItemTotal(item, ctx))
    ),
    subjectScoreMap: buildSubjectScoreMap(recommendations.topSubjects, recommendations.subjectMetaByKey, (item) => scoreItemTotal(item, ctx)),
    roleScoreMap: buildSimpleScoreMap(uniqByIdOrTitle([...(recommendations.topRoles || []), ...(recommendations.topRolesAligned || []), ...(recommendations.topRolesAdjacent || [])]), (item) => scoreItemTotal(item, ctx)),
  };
}

function buildPopulationScoreMaps(recommendations, ctx, lib, subjects = [], status = "") {
  const strengthPopulationScoreMap = buildSimpleScoreMap(lib.strengths, (item) => scoreItemTotal(item, ctx));

  const environmentPopulationRows = buildScoredEnvironmentRows(lib.environments, recommendations.topCareerWorlds, ctx);
  const environmentPopulationScoreMap = new Map(
    environmentPopulationRows.map((row) => [buildItemLookupKey(row?.item), { item: row?.item, score: Number(row?.score || 0) }])
  );

  const careerWorldPopulationScoreMap = new Map(
    (recommendations.worldDebugRows || []).map((row) => [
      buildItemLookupKey(row?.item),
      { item: row?.item, score: Number(row?.score || 0) },
    ])
  );

  const subjectPopulationRows = buildScoredSubjectRows(lib.subjects, recommendations.topCareerWorlds, ctx, subjects);
  const subjectPopulationScoreMap = new Map(
    subjectPopulationRows.map((row) => [buildItemLookupKey(row?.item), { item: row?.item, score: Number(row?.finalScore || row?.score || 0) }])
  );

  const rolePopulationRows = status === "school"
    ? []
    : buildScoredRoleRows(lib.rolesFlat, recommendations.matchedSubject, recommendations.topCareerWorlds, ctx);
  const rolePopulationScoreMap = new Map(
    rolePopulationRows.map((row) => [buildItemLookupKey(row?.item), { item: row?.item, score: Number(row?.score || 0) }])
  );

  return {
    strengthPopulationScoreMap,
    environmentPopulationScoreMap,
    careerWorldPopulationScoreMap,
    subjectPopulationScoreMap,
    rolePopulationScoreMap,
  };
}

function roundBreakdownValue(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Number(n.toFixed(3));
}

function buildSectionBreakdownMap(items = [], ctx = {}, scoreMap = new Map(), metaByKey = new Map()) {
  return new Map(
    (items || []).map((item) => {
      const key = buildItemLookupKey(item);
      const generic = scoreItemBreakdown(item, ctx);
      const scoredRow = scoreMap.get(key) || {};
      const meta = metaByKey.get(key) || scoredRow.meta || null;
      return [
        key,
        {
          subdimensionScore: roundBreakdownValue(generic.subdimensionScore),
          archetypeScore: roundBreakdownValue(generic.archetypeScore),
          archetypeContribution: roundBreakdownValue(generic.archetypeContribution),
          totalScore: roundBreakdownValue(generic.totalScore),
          finalDisplayedScore: roundBreakdownValue(scoredRow.score || generic.totalScore),
          absoluteFitPct: Number(generic.absoluteFitPct || normalizeItemScoreToPct(scoredRow.score || generic.totalScore)),
          rawFitPct: Number(generic.rawFitPct || 0),
          coreCoverageRatio: Number(generic.coreCoverageRatio || 0),
          coverageRatio: Number(generic.coverageRatio || 0),
          metaApplied: Boolean(meta),
        },
      ];
    })
  );
}

function buildBreakdownMaps(recommendations, ctx, scoreMaps) {
  return {
    strengthBreakdownMap: buildSectionBreakdownMap(recommendations.topStrengths, ctx, scoreMaps.strengthScoreMap),
    environmentBreakdownMap: buildSectionBreakdownMap(recommendations.topEnvironments, ctx, scoreMaps.environmentScoreMap),
    careerWorldBreakdownMap: buildSectionBreakdownMap(recommendations.topCareerWorlds, ctx, scoreMaps.careerWorldScoreMap, recommendations.careerWorldMetaById),
    subjectBreakdownMap: buildSectionBreakdownMap(recommendations.topSubjects, ctx, scoreMaps.subjectScoreMap, recommendations.subjectMetaByKey),
    roleBreakdownMap: buildSectionBreakdownMap(recommendations.topRoles, ctx, scoreMaps.roleScoreMap),
  };
}

function printScoredSection(label, items, profile, ctx, recommendations) {
  console.log(`
=== ${label} (total score) ===`);
  items.forEach((it, idx) => {
    const archetype = scoreItemByArchetypeOrder(it, profile.included, profile.includedWeights, profile.sorted);
    const subdim = scoreItemBySubdimensionProfile(it, ctx);
    const total = scoreItemTotal(it, ctx);
    const subjectMeta = label === "SUBJECTS" ? recommendations.subjectMetaByKey.get(buildItemLookupKey(it)) || null : null;
    const careerWorldMeta = label === "CAREER WORLDS" ? recommendations.careerWorldMetaById.get(String(it?.id || "")) || null : null;

    if (subjectMeta) {
      console.log(`- #${subjectMeta.displayRank || idx + 1} ${it.title} | final=${Number(subjectMeta.finalScore || 0).toFixed(3)} | base=${Number(subjectMeta.baseScore || 0).toFixed(3)} | world=${Number(subjectMeta.worldBonus || 0).toFixed(3)} | user=${Number(subjectMeta.userBonus || 0).toFixed(3)} | archetype=${archetype.toFixed(3)} | subdim=${subdim.toFixed(3)} | family=${subjectMeta.family || ""} | cluster=${subjectMeta.cluster || ""}`);
    } else if (careerWorldMeta) {
      console.log(`- #${idx + 1} ${it.title} | final=${Number(careerWorldMeta.finalScore || 0).toFixed(3)} | base=${Number(careerWorldMeta.baseScore || 0).toFixed(3)} | subjectBonus=${Number(careerWorldMeta.subjectBonus || 0).toFixed(3)} | tier=${careerWorldMeta.subjectTier || "other"} | archetype=${archetype.toFixed(3)} | subdim=${subdim.toFixed(3)} | tags=[${Array.isArray(it.archetypes) ? it.archetypes.join(", ") : ""}]`);
    } else {
      console.log(`- ${it.title} | total=${total.toFixed(3)} | archetype=${archetype.toFixed(3)} | subdim=${subdim.toFixed(3)} | tags=[${Array.isArray(it.archetypes) ? it.archetypes.join(", ") : ""}]`);
    }
  });
}

function logScoredSections(status, recommendations, profile, ctx) {
  if (!VERBOSE) return;
  printScoredSection("CAREER WORLDS", recommendations.topCareerWorlds, profile, ctx, recommendations);
  printScoredSection("STRENGTHS", recommendations.topStrengths, profile, ctx, recommendations);
  printScoredSection("ENVIRONMENTS", recommendations.topEnvironments, profile, ctx, recommendations);
  if (status === "school" && recommendations.topBroadSubjects.length) {
    printScoredSection("SUBJECTS — BROAD", recommendations.topBroadSubjects, profile, ctx, recommendations);
  }
  if (status === "school" && recommendations.topSpecialistSubjects.length) {
    printScoredSection("SUBJECTS — SPECIALIST", recommendations.topSpecialistSubjects, profile, ctx, recommendations);
  }
  if (status !== "school" && recommendations.topRoles.length) {
    printScoredSection("ROLES", recommendations.topRoles, profile, ctx, recommendations);
  }
}

function buildFixedLists(recommendations) {
  return {
    strengthsFixed: uniq(recommendations.topStrengths.map((x) => x.title)).slice(0, MAX_LOG_ITEMS_PER_SECTION),
    envsFixed: uniq(recommendations.topEnvironments.map((x) => x.title)).slice(0, MAX_LOG_ITEMS_PER_SECTION),
    careerWorldsFixed: uniq(recommendations.topCareerWorlds.map((x) => x.title)).slice(0, MAX_LOG_ITEMS_PER_SECTION),
    careerWorldsAlignedFixed: uniq((recommendations.topCareerWorldsAligned || []).map((x) => x.title)).slice(0, 3),
    careerWorldsOtherFixed: uniq((recommendations.topCareerWorldsOther || []).map((x) => x.title)).slice(0, 3),
    subjectsFixed: uniq((recommendations.topSubjects || []).map((x) => x.title)).slice(0, SCHOOL_SUBJECT_LIMIT),
    broadSubjectsFixed: uniq((recommendations.topBroadSubjects || []).map((x) => x.title)).slice(0, SCHOOL_SUBJECT_LIMIT),
    specialistSubjectsFixed: uniq((recommendations.topSpecialistSubjects || []).map((x) => x.title)).slice(0, 4),
    subjectsBestFitFixed: uniq((recommendations.topSubjectsBestFit || recommendations.topBroadSubjects || []).map((x) => x.title)).slice(0, SCHOOL_SUBJECT_LIMIT),
    subjectsOtherFixed: uniq((recommendations.topSubjectsOther || recommendations.topSpecialistSubjects || []).map((x) => x.title)).slice(0, 4),
    subjectsAlignedFixed: uniq((recommendations.topSubjectsAligned || recommendations.topBroadSubjects || []).map((x) => x.title)).slice(0, SCHOOL_SUBJECT_LIMIT),
    subjectsExploratoryFixed: uniq((recommendations.topSubjectsExploratory || recommendations.topSpecialistSubjects || []).map((x) => x.title)).slice(0, 4),
    rolesFixed: uniq(recommendations.topRoles.map((x) => x.title)).slice(0, MAX_LOG_ITEMS_PER_SECTION),
    rolesAlignedFixed: uniq((recommendations.topRolesAligned || []).map((x) => x.title)).slice(0, MAX_LOG_ITEMS_PER_SECTION),
    rolesAdjacentFixed: uniq((recommendations.topRolesAdjacent || []).map((x) => x.title)).slice(0, MAX_LOG_ITEMS_PER_SECTION),
  };
}

function buildItemEvidenceBundle(recommendations, profile) {
  const itemArchetypes = {
    strengths: buildItemArchetypeMap(recommendations.topStrengths, profile.included),
    environments: buildItemArchetypeMap(recommendations.topEnvironments, profile.included),
    career_worlds: buildItemArchetypeMap(recommendations.topCareerWorlds, profile.included),
    subjects: buildItemArchetypeMap(recommendations.topSubjects, profile.included),
    roles: buildItemArchetypeMap(recommendations.topRoles, profile.included),
  };

  const strengthsSubdimMeta = buildItemSubdimContextForSection(recommendations.topStrengths, profile.userSubdimMap, 2);
  const environmentsSubdimMeta = buildItemSubdimContextForSection(recommendations.topEnvironments, profile.userSubdimMap, 2);
  const careerWorldsSubdimMeta = buildItemSubdimContextForSection(recommendations.topCareerWorlds, profile.userSubdimMap, 3);
  const subjectsSubdimMeta = buildItemSubdimContextForSection(recommendations.topSubjects, profile.userSubdimMap, 3);
  const rolesSubdimMeta = buildItemSubdimContextForSection(recommendations.topRoles, profile.userSubdimMap, 3);

  const itemSubdimContext = {
    strengths: strengthsSubdimMeta.context,
    environments: environmentsSubdimMeta.context,
    career_worlds: careerWorldsSubdimMeta.context,
    subjects: subjectsSubdimMeta.context,
    roles: rolesSubdimMeta.context,
  };

  const itemSubdimHints = {
    strengths: strengthsSubdimMeta.hints,
    environments: environmentsSubdimMeta.hints,
    career_worlds: careerWorldsSubdimMeta.hints,
    subjects: subjectsSubdimMeta.hints,
    roles: rolesSubdimMeta.hints,
  };

  const itemSubdimPairs = {
    strengths: strengthsSubdimMeta.pairs,
    environments: environmentsSubdimMeta.pairs,
    career_worlds: careerWorldsSubdimMeta.pairs,
    subjects: subjectsSubdimMeta.pairs,
    roles: rolesSubdimMeta.pairs,
  };

  logVerbose("itemSubdimHints:", JSON.stringify(itemSubdimHints, null, 2));
  logVerbose("itemSubdimEvidence:", JSON.stringify(itemSubdimPairs, null, 2));

  return {
    itemArchetypes,
    itemSubdimContext,
    itemSubdimHints,
    itemSubdimPairs,
  };
}


function normalizeNarrativeMatchKey(value = "") {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildNarrativeMatchKeys(item = {}) {
  const keys = [];
  const push = (value) => {
    const key = normalizeNarrativeMatchKey(value);
    if (key && !keys.includes(key)) keys.push(key);
  };

  push(item?.id);
  push(item?.sourceId);
  push(item?.title);

  const parentId = item?.parentId || item?.parentSourceId || "";
  const parentTitle = item?.parentTitle || "";
  const id = item?.id || item?.sourceId || "";
  const title = item?.title || "";

  if (parentId && id) push(`${parentId}::${id}`);
  if (parentId && title) push(`${parentId}::${title}`);
  if (parentTitle && id) push(`${parentTitle}::${id}`);
  if (parentTitle && title) push(`${parentTitle}::${title}`);

  return keys;
}

function buildNarrativeItemLookup(items = []) {
  const map = new Map();

  for (const item of Array.isArray(items) ? items : []) {
    for (const key of buildNarrativeMatchKeys(item)) {
      if (!map.has(key)) map.set(key, item);
    }
  }

  return map;
}

function findNarrativeForItem(item = {}, narrativeLookup = new Map()) {
  for (const key of buildNarrativeMatchKeys(item)) {
    const match = narrativeLookup.get(key);
    if (match) return match;
  }
  return null;
}

function mergeNarrativeItems(existingItems = [], narrativeItems = []) {
  if (!Array.isArray(existingItems)) return existingItems;

  const lookup = buildNarrativeItemLookup(narrativeItems);

  return existingItems.map((item) => {
    const narrative = findNarrativeForItem(item, lookup);
    const fallbackSummary = item?.fallbackSummary || item?.entryLevelFit || "";

    if (!narrative) {
      return {
        ...item,
        fallbackSummary,
        narrativeSource: item?.narrativeSource || "fallback",
      };
    }

    const narrativeSummary = String(narrative?.fullSummary || narrative?.summary || "").trim();
    const hasLlmNarrative = Boolean(narrativeSummary);

    return {
      ...item,
      id: item?.id || narrative?.id || "",
      title: item?.title || narrative?.title || "",
      relation: item?.relation || narrative?.relation || "",
      kind: item?.kind || narrative?.kind || "",
      parentId: item?.parentId || narrative?.parentId || "",
      parentTitle: item?.parentTitle || narrative?.parentTitle || "",
      parentType: item?.parentType || narrative?.parentType || "",
      fullSummary: hasLlmNarrative ? narrativeSummary : (item?.fullSummary || item?.summary || fallbackSummary || ""),
      summary: hasLlmNarrative ? narrativeSummary : (item?.summary || item?.fullSummary || fallbackSummary || ""),
      fallbackSummary,
      narrativeSource: hasLlmNarrative ? "llm" : "fallback",
    };
  });
}

function applyPrewrittenNarratives(insights = [], explorerNarratives = null) {
  if (!Array.isArray(insights) || !explorerNarratives) return insights;

  const narrativeGroups = Array.isArray(explorerNarratives)
    ? explorerNarratives
    : Array.isArray(explorerNarratives?.groups)
    ? explorerNarratives.groups
    : Array.isArray(explorerNarratives?.selectionInsights)
    ? explorerNarratives.selectionInsights
    : [];

  if (!narrativeGroups.length) return insights;

  const byParentId = new Map();
  const byParentTitle = new Map();

  for (const group of narrativeGroups) {
    const parentId = normalizeNarrativeMatchKey(group?.parentId || group?.sourceId || group?.id || "");
    const parentTitle = normalizeNarrativeMatchKey(group?.parentTitle || group?.title || "");
    if (parentId) byParentId.set(parentId, group);
    if (parentTitle) byParentTitle.set(parentTitle, group);
  }

  const allNarrativeItems = narrativeGroups.flatMap((group) =>
    (Array.isArray(group?.items) ? group.items : []).map((item) => ({
      ...item,
      parentId: item?.parentId || group?.parentId || group?.sourceId || group?.id || "",
      parentTitle: item?.parentTitle || group?.parentTitle || group?.title || "",
      parentType: item?.parentType || group?.parentType || "",
    }))
  );

  const merged = insights.map((insight) => {
    const id = normalizeNarrativeMatchKey(insight?.sourceId || insight?.id || "");
    const title = normalizeNarrativeMatchKey(insight?.title || "");
    const group = byParentId.get(id) || byParentTitle.get(title) || null;

    const narrativeText = group?.narrative || group?.summary || group?.description || group?.explanation || "";
    const groupNarrativeItems = (Array.isArray(group?.items) ? group.items : []).map((item) => ({
      ...item,
      parentId: item?.parentId || group?.parentId || group?.sourceId || group?.id || "",
      parentTitle: item?.parentTitle || group?.parentTitle || group?.title || "",
      parentType: item?.parentType || group?.parentType || "",
    }));

    const narrativeItems = [...groupNarrativeItems, ...allNarrativeItems];
    const next = { ...insight };

    if (narrativeText && !next.narrative) next.narrative = narrativeText;
    next.linkedSubjects = mergeNarrativeItems(next.linkedSubjects, narrativeItems);
    next.roles = mergeNarrativeItems(next.roles, narrativeItems);
    next.items = Array.isArray(next.linkedSubjects) && next.linkedSubjects.length
      ? next.linkedSubjects
      : Array.isArray(next.roles) && next.roles.length
      ? next.roles
      : groupNarrativeItems;

    return next;
  });

  if (VERBOSE) {
    const counts = merged.reduce((acc, insight) => {
      const items = Array.isArray(insight?.linkedSubjects) && insight.linkedSubjects.length
        ? insight.linkedSubjects
        : Array.isArray(insight?.roles)
        ? insight.roles
        : [];
      for (const item of items) {
        acc.total += 1;
        if (item?.narrativeSource === "llm") acc.llm += 1;
        else acc.fallback += 1;
      }
      return acc;
    }, { total: 0, llm: 0, fallback: 0 });
    console.log("[selection narrative merge]", counts);
  }

  return merged;
}

function parseJsonFromModelOutput(content = "") {
  const raw = String(content || "").trim();
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (_) {}
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    try {
      return JSON.parse(fenced[1].trim());
    } catch (_) {}
  }
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    try {
      return JSON.parse(raw.slice(start, end + 1));
    } catch (_) {}
  }
  return null;
}

function buildHiddenNarrativeItem(item = {}, profile = {}, kind = "subject", parent = {}) {
  const requestItem = {
    id: item?.id || "",
    title: item?.title || "",
    type: kind,
  };

  const libraryItem = getSelectionLibraryItem(requestItem, CDNA_SELECTION_INDEXES) || item;
  const included = new Set(profile?.included || []);
  const sourceArchetypes = Array.isArray(libraryItem?.archetypes) && libraryItem.archetypes.length
    ? libraryItem.archetypes
    : Array.isArray(item?.archetypes)
    ? item.archetypes.map((row) => row?.name || row).filter(Boolean)
    : [];

  const archetypes = sourceArchetypes.filter((name) => included.has(name)).slice(0, 3);
  const subdimPick = pickProseSubdimensionsForItem(libraryItem, profile.userSubdimMap, {
    maxCount: 3,
    minPct: MIN_PROSE_SUBDIM_SCORE,
  });
  const subdimensions = subdimPick.picked || [];

  return {
    id: String(item?.id || libraryItem?.id || item?.title || ""),
    title: String(item?.title || libraryItem?.title || ""),
    relation: String(item?.relation || ""),
    kind,
    parentId: String(parent?.id || parent?.sourceId || ""),
    parentTitle: String(parent?.title || ""),
    parentType: String(parent?.type || ""),
    signalLabel: item?.signalLabel || "",
    signalBlocks: Number(item?.signalBlocks || 0),
    archetypes,
    subdimensions,
    matched_user_subdims: subdimensions,
    item_relevant_subdims: subdimensions,
    evidenceRules: {
      strictEvidenceOnly: true,
      maxArchetypes: 3,
      maxSubdimensions: 3,
      minSubdimensionScore: MIN_PROSE_SUBDIM_SCORE,
      fallbackToTopDesignedSubdimensionWhenNoStrongMatch: true,
    },
  };
}

function buildExplorerNarrativeGroups(status, insights = [], profile = {}) {
  return (Array.isArray(insights) ? insights : [])
    .map((insight) => {
      const kind = status === "school" ? "subject" : "role";
      const items = status === "school"
        ? (Array.isArray(insight?.linkedSubjects) ? insight.linkedSubjects : [])
        : (Array.isArray(insight?.roles) ? insight.roles : []);

      const parent = {
        id: insight?.sourceId || insight?.id || "",
        title: insight?.title || "",
        type: status === "school" ? "career_world" : "pathway",
      };

      return {
        parentId: String(parent.id || ""),
        parentTitle: String(parent.title || ""),
        parentType: parent.type,
        items: items
          .map((item) => buildHiddenNarrativeItem(item, profile, kind, parent))
          .filter((item) => item.id && item.title),
      };
    })
    .filter((group) => group.parentId && group.items.length);
}

function extractSelectionNarrativesFromCombinedOutput(content = "") {
  const raw = String(content || "");
  const match = raw.match(/\[SELECTION_INSIGHTS_JSON_START\]\s*([\s\S]*?)\s*\[SELECTION_INSIGHTS_JSON_END\]/);
  if (!match) {
    return {
      summary: raw.trim(),
      explorerNarratives: null,
    };
  }

  let explorerNarratives = null;
  try {
    explorerNarratives = JSON.parse(String(match[1] || "").trim());
  } catch (_) {
    explorerNarratives = null;
  }

  const summary = raw.replace(match[0], "").trim();
  return {
    summary,
    explorerNarratives,
  };
}

function buildPrecomputedSelectionInsights(status, recommendations, profile, sectionSignalMap = new Map()) {
  const baseItems = status === "school"
    ? (recommendations.topCareerWorlds || []).map((item) => ({ item, type: "career_world" }))
    : (recommendations.topRoles || []).map((item) => ({ item, type: "pathway" }));

  return baseItems
    .map(({ item, type }) => {
      const requestItem = {
        id: item?.id || item?.title || "",
        type,
        title: item?.title || "",
        careerWorldId: item?.careerWorldId || item?.id || "",
        careerWorldTitle: item?.careerWorldTitle || item?.title || "",
        familyTitle: item?.roleFamilyTitle || item?.familyTitle || item?.subjectFamily || "",
      };
      const enrichedItem = getSelectionLibraryItem(requestItem, CDNA_SELECTION_INDEXES) || item;
      const signal = sectionSignalMap.get(buildItemLookupKey(item)) || null;
      return buildSelectionInsight(enrichedItem, profile, requestItem, { canonicalSignal: signal });
    })
    .filter(Boolean);
}

function buildCanonicalSectionSignalMap(status, recommendations, scoreMaps, breakdownMaps, populationScoreMaps = {}) {
  const baseItems = status === "school" ? recommendations.topCareerWorlds : recommendations.topRoles;
  const baseScoreMap = status === "school" ? scoreMaps.careerWorldScoreMap : scoreMaps.roleScoreMap;
  const baseBreakdownMap = status === "school" ? breakdownMaps.careerWorldBreakdownMap : breakdownMaps.roleBreakdownMap;
  const basePopulationScoreMap = status === "school"
    ? populationScoreMaps.careerWorldPopulationScoreMap || baseScoreMap
    : populationScoreMaps.rolePopulationScoreMap || baseScoreMap;

  return new Map(
    (baseItems || []).map((item) => {
      const key = buildItemLookupKey(item);
      const score = Number(baseScoreMap.get(key)?.score || 0);
      const breakdown = baseBreakdownMap.get(key) || { totalScore: score, absoluteFitPct: normalizeItemScoreToPct(score) };
      const fallbackSignal = getItemSignalFromBreakdown(breakdown);
      return [key, buildRelativeSignal(score, basePopulationScoreMap, fallbackSignal)];
    })
  );
}

function buildAnalysisMeta(recommendations, scoreMaps, breakdownMaps, populationScoreMaps = {}, precomputedSelectionInsights = []) {
  const strengths = buildSectionSignals(recommendations.topStrengths, scoreMaps.strengthScoreMap, breakdownMaps.strengthBreakdownMap, "strength", populationScoreMaps.strengthPopulationScoreMap || scoreMaps.strengthScoreMap);
  const environments = buildSectionSignals(recommendations.topEnvironments, scoreMaps.environmentScoreMap, breakdownMaps.environmentBreakdownMap, "environment", populationScoreMaps.environmentPopulationScoreMap || scoreMaps.environmentScoreMap);
  const careerWorlds = buildSectionSignals(recommendations.topCareerWorlds, scoreMaps.careerWorldScoreMap, breakdownMaps.careerWorldBreakdownMap, "career_world", populationScoreMaps.careerWorldPopulationScoreMap || scoreMaps.careerWorldScoreMap);
  const careerWorldsAligned = buildSectionSignals(recommendations.topCareerWorldsAligned || [], scoreMaps.careerWorldScoreMap, breakdownMaps.careerWorldBreakdownMap, "career_world", populationScoreMaps.careerWorldPopulationScoreMap || scoreMaps.careerWorldScoreMap);
  const careerWorldsOther = buildSectionSignals(recommendations.topCareerWorldsOther || [], scoreMaps.careerWorldScoreMap, breakdownMaps.careerWorldBreakdownMap, "career_world", populationScoreMaps.careerWorldPopulationScoreMap || scoreMaps.careerWorldScoreMap);
  const subjects = buildSectionSignals(recommendations.topSubjects, scoreMaps.subjectScoreMap, breakdownMaps.subjectBreakdownMap, "subject", populationScoreMaps.subjectPopulationScoreMap || scoreMaps.subjectScoreMap);
  const broadSubjects = buildSectionSignals(recommendations.topBroadSubjects, scoreMaps.subjectScoreMap, breakdownMaps.subjectBreakdownMap, "subject", populationScoreMaps.subjectPopulationScoreMap || scoreMaps.subjectScoreMap);
  const specialistSubjects = buildSectionSignals(recommendations.topSpecialistSubjects, scoreMaps.subjectScoreMap, breakdownMaps.subjectBreakdownMap, "subject", populationScoreMaps.subjectPopulationScoreMap || scoreMaps.subjectScoreMap);
  const subjectsBestFit = buildSectionSignals(recommendations.topSubjectsBestFit || recommendations.topBroadSubjects, scoreMaps.subjectScoreMap, breakdownMaps.subjectBreakdownMap, "subject", populationScoreMaps.subjectPopulationScoreMap || scoreMaps.subjectScoreMap);
  const subjectsOther = buildSectionSignals(recommendations.topSubjectsOther || recommendations.topSpecialistSubjects, scoreMaps.subjectScoreMap, breakdownMaps.subjectBreakdownMap, "subject", populationScoreMaps.subjectPopulationScoreMap || scoreMaps.subjectScoreMap);
  const subjectsAligned = buildSectionSignals(recommendations.topSubjectsAligned || recommendations.topBroadSubjects, scoreMaps.subjectScoreMap, breakdownMaps.subjectBreakdownMap, "subject", populationScoreMaps.subjectPopulationScoreMap || scoreMaps.subjectScoreMap);
  const subjectsExploratory = buildSectionSignals(recommendations.topSubjectsExploratory || recommendations.topSpecialistSubjects, scoreMaps.subjectScoreMap, breakdownMaps.subjectBreakdownMap, "subject", populationScoreMaps.subjectPopulationScoreMap || scoreMaps.subjectScoreMap);
  const roles = buildSectionSignals(recommendations.topRoles, scoreMaps.roleScoreMap, breakdownMaps.roleBreakdownMap, "role", populationScoreMaps.rolePopulationScoreMap || scoreMaps.roleScoreMap);
  const rolesAligned = buildSectionSignals(recommendations.topRolesAligned || [], scoreMaps.roleScoreMap, breakdownMaps.roleBreakdownMap, "role", populationScoreMaps.rolePopulationScoreMap || scoreMaps.roleScoreMap);
  const rolesAdjacent = buildSectionSignals(recommendations.topRolesAdjacent || [], scoreMaps.roleScoreMap, breakdownMaps.roleBreakdownMap, "role", populationScoreMaps.rolePopulationScoreMap || scoreMaps.roleScoreMap);

  return {
    sections: {
      strengths,
      environments,
      careerWorlds,
      careerWorldsAligned,
      careerWorldsOther,
      career_worlds_aligned: careerWorldsAligned,
      career_worlds_other: careerWorldsOther,
      subjects,
      broad_subjects: broadSubjects,
      specialist_subjects: specialistSubjects,
      subjectsBestFit,
      subjects_best_fit: subjectsBestFit,
      subjectsOther,
      subjects_other: subjectsOther,
      subjectsAligned,
      subjects_aligned: subjectsAligned,
      subjectsExploratory,
      subjects_exploratory: subjectsExploratory,
      roles,
      rolesAligned,
      rolesAdjacent,
      roles_aligned: rolesAligned,
      roles_adjacent: rolesAdjacent,
    },
    precomputedSelectionInsights: Array.isArray(precomputedSelectionInsights) ? precomputedSelectionInsights : [],
  };
}

function buildInternalRecommendationPayload({ profile, recommendations, scoreMaps, itemEvidence, fixedLists, breakdownMaps }) {
  return buildRecommendationPayload({
    profile,
    recommendations,
    scoreMaps,
    itemEvidence,
    fixedLists,
    breakdownMaps,
  });
}

function buildDevDiagnostics({ profile, recommendations, itemEvidence, fixedLists, allowedSubdimsForPrompt, recommendationPayload }) {
  return {
    included: profile.included,
    career_worlds: fixedLists.careerWorldsFixed,
    career_worlds_aligned: fixedLists.careerWorldsAlignedFixed,
    career_worlds_other: fixedLists.careerWorldsOtherFixed,
    strengths: fixedLists.strengthsFixed,
    environments: fixedLists.envsFixed,
    subjects: fixedLists.subjectsFixed,
    broadSubjects: fixedLists.broadSubjectsFixed,
    specialistSubjects: fixedLists.specialistSubjectsFixed,
    subjectsBestFit: fixedLists.subjectsBestFitFixed,
    subjectsOther: fixedLists.subjectsOtherFixed,
    subjectsAligned: fixedLists.subjectsAlignedFixed,
    subjectsExploratory: fixedLists.subjectsExploratoryFixed,
    matchedSubject: recommendations.matchedSubject?.title || null,
    roles: fixedLists.rolesFixed,
    roles_aligned: fixedLists.rolesAlignedFixed,
    roles_adjacent: fixedLists.rolesAdjacentFixed,
    matchedPathwayMatrixEntry: recommendations.matchedPathwayMatrixEntry?.subjectTitle || null,
    itemArchetypes: itemEvidence.itemArchetypes,
    itemSubdimHints: itemEvidence.itemSubdimHints,
    itemSubdimContext: itemEvidence.itemSubdimContext,
    itemSubdimPairs: itemEvidence.itemSubdimPairs,
    allowedSubdims: allowedSubdimsForPrompt,
    topSubdimProfile: profile.topSubdimProfile,
    recommendationPayload,
  };
}

function buildSummaryPromptPayload({ archetypes, age, status, subjects, profileMode, profile, allowedSubdimsForPrompt, fixedLists, itemEvidence, hiddenSelectionGroups = [] }) {
  return {
    showSubdimScores: true,
    archetypes,
    age,
    status,
    profileMode,
    subjects,
    allowedArchetypes: profile.included,
    allowedSubdims: allowedSubdimsForPrompt,
    strengthsFixed: fixedLists.strengthsFixed,
    envsFixed: fixedLists.envsFixed,
    careerWorldsFixed: fixedLists.careerWorldsFixed,
    careerWorldsAlignedFixed: fixedLists.careerWorldsAlignedFixed,
    careerWorldsOtherFixed: fixedLists.careerWorldsOtherFixed,
    rolesFixed: fixedLists.rolesFixed,
    rolesAlignedFixed: fixedLists.rolesAlignedFixed,
    rolesAdjacentFixed: fixedLists.rolesAdjacentFixed,
    subjectsFixed: fixedLists.subjectsFixed,
    broadSubjectsFixed: fixedLists.broadSubjectsFixed,
    specialistSubjectsFixed: fixedLists.specialistSubjectsFixed,
    subjectsBestFitFixed: fixedLists.subjectsBestFitFixed,
    subjectsOtherFixed: fixedLists.subjectsOtherFixed,
    subjectsAlignedFixed: fixedLists.subjectsAlignedFixed,
    subjectsExploratoryFixed: fixedLists.subjectsExploratoryFixed,
    itemArchetypes: itemEvidence.itemArchetypes,
    itemSubdimContext: itemEvidence.itemSubdimContext,
    itemSubdimHints: itemEvidence.itemSubdimHints,
    subdimScores: profile.topSubdimProfile,
    hiddenSelectionGroups,
  };
}

function parseSelectionInsightsRequest(body = {}) {
  const { archetypes, likedItems, subdimensions, subdimensionScores } = body || {};

  if (!archetypes || typeof archetypes !== "object") {
    return { error: { status: 400, message: "Invalid or missing archetype data." } };
  }

  if (!Array.isArray(likedItems) || !likedItems.length) {
    return { error: { status: 400, message: "No liked items were provided." } };
  }

  return {
    value: {
      archetypes,
      likedItems,
      incomingSubdims: Array.isArray(subdimensions) && subdimensions.length
        ? subdimensions
        : Array.isArray(subdimensionScores)
        ? subdimensionScores
        : [],
    },
  };
}

app.use((req, res, next) => {
  const rid = randomUUID();
  const started = Date.now();
  req._rid = rid;

  console.log(`➡️  [${rid}] ${req.method} ${req.path} (origin=${req.get("origin") || "-"} referer=${req.get("referer") || "-"})`);

  res.on("finish", () => {
    const ms = Date.now() - started;
    console.log(`⬅️  [${rid}] ${req.method} ${req.path} ${res.statusCode} (${ms}ms)`);
  });

  next();
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function callModels(messages) {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY missing — returning placeholder summary.");
    return "# Summary\n\n1) Placeholder summary while developing without an API key.";
  }

  let lastErr;

  for (const model of MODEL_CHAIN) {
    try {
      const payload = {
        model,
        messages,
        ...(modelSupportsTemperature(model) ? { temperature: 0.35 } : {}),
      };

      const resp = await openai.chat.completions.create(payload);
      const content = resp?.choices?.[0]?.message?.content?.trim();

      if (!content) throw new Error("Empty content from model");
      return content;
    } catch (err) {
      lastErr = err;
      console.error(`⚠️ Model failed: ${model}`, err?.status || "", err?.message || err);
    }
  }

  throw lastErr || new Error("All models failed");
}

app.get("/", (_req, res) => res.send("✅ CareerDNA backend is live."));
app.get("/api/ping", (_req, res) => res.json({ ok: true }));

function getBearerToken(req) {
  const header = String(req.headers.authorization || "");
  if (!header.toLowerCase().startsWith("bearer ")) return "";
  return header.slice(7).trim();
}

const RATE_LIMIT_BUCKETS = new Map();

function getClientIp(req) {
  return String(
    req.headers["x-forwarded-for"] ||
      req.ip ||
      req.socket?.remoteAddress ||
      "unknown"
  )
    .split(",")[0]
    .trim();
}

function makeRateLimiter({ name = "default", windowMs = 60_000, max = 60, keyBy = "user-or-ip" } = {}) {
  return (req, res, next) => {
    const now = Date.now();
    const token = getBearerToken(req);
    const ip = getClientIp(req);

    // For classroom/lab use, authenticated routes are limited primarily by user token,
    // not by shared campus Wi-Fi IP. For unauthenticated calls, we fall back to IP.
    const identity = keyBy === "ip" ? ip : token || ip;
    const key = `${name}:${identity}`;
    const bucket = RATE_LIMIT_BUCKETS.get(key) || { count: 0, resetAt: now + windowMs };

    if (bucket.resetAt <= now) {
      bucket.count = 0;
      bucket.resetAt = now + windowMs;
    }

    bucket.count += 1;
    RATE_LIMIT_BUCKETS.set(key, bucket);

    if (bucket.count > max) {
      const retryAfter = Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
      res.set("Retry-After", String(retryAfter));
      return res.status(429).json({
        error: "RATE_LIMITED",
        message: "Too many requests. Please wait a moment and try again.",
        retryAfter,
      });
    }

    if (RATE_LIMIT_BUCKETS.size > 5000) {
      for (const [storedKey, value] of RATE_LIMIT_BUCKETS.entries()) {
        if (value.resetAt <= now) RATE_LIMIT_BUCKETS.delete(storedKey);
      }
    }

    return next();
  };
}

const summaryRateLimit = makeRateLimiter({
  name: "summary",
  windowMs: 60 * 60 * 1000,
  max: 10,
});

const couponRateLimit = makeRateLimiter({
  name: "coupon",
  windowMs: 15 * 60 * 1000,
  max: 10,
});

const selectionInsightsRateLimit = makeRateLimiter({
  name: "selection-insights",
  windowMs: 10 * 60 * 1000,
  max: 120,
});

const advisorRateLimit = makeRateLimiter({
  name: "career-advisor",
  windowMs: 10 * 60 * 1000,
  max: 80,
});

const deleteAccountRateLimit = makeRateLimiter({
  name: "delete-account",
  windowMs: 10 * 60 * 1000,
  max: 5,
});


function isUnlimitedPlan(profile = {}) {
  const plan = String(profile?.plan || "").toLowerCase();
  return ["premium_school", "premium_university", "dev"].includes(plan);
}

function isUnlimitedAdvisorPlan(profile = {}) {
  return isUnlimitedPlan(profile);
}

function getAdvisorUsage(profile = {}) {
  const advisorQuestionsUsed = Number(profile?.advisor_questions_used || 0);
  const advisorQuestionsLimit = Number(profile?.advisor_questions_limit || 0);
  const advisorExtraQuestions = Number(profile?.advisor_extra_questions || 0);
  const advisorQuestionsTotal = advisorQuestionsLimit + advisorExtraQuestions;
  const advisorUnlimited = isUnlimitedAdvisorPlan(profile);

  return {
    advisorQuestionsUsed,
    advisorQuestionsLimit,
    advisorExtraQuestions,
    advisorQuestionsTotal,
    advisorQuestionsRemaining: advisorUnlimited ? null : Math.max(0, advisorQuestionsTotal - advisorQuestionsUsed),
    advisorUnlimited,
    advisorPeriodStart: profile?.advisor_period_start || null,
    advisorPeriodEnd: profile?.advisor_period_end || null,
  };
}

function buildEntitlementView(profile = {}) {
  const reportsUsed = Number(profile?.reports_used || 0);
  const reportLimit = Number(profile?.report_limit || 0);
  const unlimited = isUnlimitedPlan(profile);
  const advisorUsage = getAdvisorUsage(profile);

  return {
    plan: profile?.plan || "free",
    planSource: profile?.plan_source || "free",
    reportsUsed,
    reportLimit,
    reportsRemaining: unlimited ? null : Math.max(0, reportLimit - reportsUsed),
    couponCode: profile?.coupon_code || null,
    subscriptionStatus: profile?.subscription_status || null,
    subscriptionPriceId: profile?.subscription_price_id || null,
    subscriptionCurrentPeriodStart: profile?.subscription_current_period_start || null,
    subscriptionCurrentPeriodEnd: profile?.subscription_current_period_end || null,
    cancelAtPeriodEnd: Boolean(profile?.cancel_at_period_end),
    pendingPlanChange: profile?.pending_plan_change || null,
    pendingPlanChangeAt: profile?.pending_plan_change_at || null,
    pendingPlanPriceId: profile?.pending_plan_price_id || null,
    reportPeriodStart: profile?.report_period_start || null,
    reportPeriodEnd: profile?.report_period_end || null,
    bonusReports: Number(profile?.bonus_reports || 0),
    bonusAdvisorQuestions: Number(profile?.bonus_advisor_questions || 0),
    bonusExpiresAt: profile?.bonus_expires_at || null,
    unlimited,
    ...advisorUsage,
  };
}

function hasReportAccess(profile = {}) {
  if (isUnlimitedPlan(profile)) return true;
  const reportsUsed = Number(profile?.reports_used || 0);
  const reportLimit = Number(profile?.report_limit || 0);
  return reportsUsed < reportLimit;
}

function hasAdvisorAccess(profile = {}) {
  if (isUnlimitedAdvisorPlan(profile)) return true;
  return getAdvisorUsage(profile).advisorQuestionsRemaining > 0;
}

async function getAuthenticatedUserAndProfile(req) {
  if (!supabaseAdmin) {
    const err = new Error("Supabase admin client is not configured on the backend.");
    err.status = 500;
    throw err;
  }

  const token = getBearerToken(req);
  if (!token) {
    const err = new Error("Missing authorization token.");
    err.status = 401;
    throw err;
  }

  const {
    data: { user },
    error: userError,
  } = await supabaseAdmin.auth.getUser(token);

  if (userError || !user?.id) {
    const err = new Error("Invalid or expired session.");
    err.status = 401;
    throw err;
  }

  let { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError && profileError.code !== "PGRST116") {
    throw profileError;
  }

  if (!profile) {
    const { data: createdProfile, error: createProfileError } = await supabaseAdmin
      .from("profiles")
      .insert({
        id: user.id,
        email: user.email || null,
        plan: "free",
        plan_source: "free",
        reports_used: 0,
        report_limit: 0,
        advisor_questions_used: 0,
        advisor_questions_limit: 0,
        advisor_extra_questions: 0,
      })
      .select("*")
      .single();

    if (createProfileError) throw createProfileError;
    profile = createdProfile;
  }

  return { user, profile };
}


async function requireAdmin(req) {
  const { user, profile } = await getAuthenticatedUserAndProfile(req);

  if (!profile?.is_admin) {
    const err = new Error("Admin access required.");
    err.status = 403;
    throw err;
  }

  return { user, profile };
}

async function consumeReportCredit(profile = {}) {
  if (!profile?.id) {
    return { allowed: false, profile };
  }

  const { data, error } = await supabaseAdmin.rpc("consume_report_credit", {
    p_user_id: profile.id,
  });

  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data;
  const allowed = Boolean(row?.allowed);
  const updatedProfile =
    row?.profile && typeof row.profile === "object" ? row.profile : profile;

  return { allowed, profile: updatedProfile };
}

async function consumeAdvisorCredit(profile = {}) {
  if (!profile?.id) {
    return { allowed: false, profile };
  }

  const { data, error } = await supabaseAdmin.rpc("consume_advisor_credit", {
    p_user_id: profile.id,
  });

  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data;
  const allowed = Boolean(row?.allowed);
  const updatedProfile =
    row?.profile && typeof row.profile === "object" ? row.profile : profile;

  return { allowed, profile: updatedProfile };
}

function getStripePriceIdForPlan(plan = "") {
  const key = String(plan || "").trim().toLowerCase();

  const priceMap = {
    explore: process.env.STRIPE_EXPLORE_PRICE_ID || process.env.STRIPE_PRICE_EXPLORE,
    plus: process.env.STRIPE_PLUS_PRICE_ID || process.env.STRIPE_PRICE_PLUS,
    premium: process.env.STRIPE_PREMIUM_PRICE_ID || process.env.STRIPE_PRICE_PREMIUM,
  };

  return priceMap[key] || "";
}

function getStripeCheckoutModeForPlan(plan = "") {
  return String(plan || "").trim().toLowerCase() === "explore" ? "payment" : "subscription";
}

function getClientUrl() {
  return String(
    process.env.CLIENT_URL ||
    process.env.FRONTEND_URL ||
    process.env.REACT_APP_CLIENT_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

function getStripePlanEntitlement(plan = "") {
  const key = String(plan || "").trim().toLowerCase();

  // Central source of truth for Stripe entitlements.
  // Free = basic profile only.
  // Explore = one-off report credit.
  // Plus/Premium = monthly report allowance + monthly AI allowance, reset every paid billing period.
  // Unused subscription allowances do not roll over.
  const entitlements = {
    explore: {
      plan: "free",
      planSource: "stripe_purchase",
      reportCredits: Number(process.env.CDNA_EXPLORE_REPORT_CREDITS || 1),
      advisorExtraQuestions: Number(process.env.CDNA_EXPLORE_ADVISOR_EXTRA_QUESTIONS || 0),
      reportMonthlyLimit: null,
      advisorMonthlyLimit: null,
      description: "Explore one-off report credit purchase",
    },
    plus: {
      plan: "plus",
      planSource: "stripe_subscription",
      reportMonthlyLimit: Number(process.env.CDNA_PLUS_MONTHLY_REPORT_LIMIT || process.env.CDNA_PLUS_MONTHLY_REPORT_CREDITS || 1),
      advisorMonthlyLimit: Number(process.env.CDNA_PLUS_MONTHLY_ADVISOR_QUESTIONS || 5),
      description: "Plus monthly subscription entitlement",
    },
    premium: {
      plan: "premium",
      planSource: "stripe_subscription",
      reportMonthlyLimit: Number(process.env.CDNA_PREMIUM_MONTHLY_REPORT_LIMIT || process.env.CDNA_PREMIUM_MONTHLY_REPORT_CREDITS || 2),
      advisorMonthlyLimit: Number(process.env.CDNA_PREMIUM_MONTHLY_ADVISOR_QUESTIONS || 20),
      description: "Premium monthly subscription entitlement",
    },
  };

  return entitlements[key] || null;
}

function getStripePlanFromPriceId(priceId = "") {
  const id = String(priceId || "").trim();
  if (!id) return "";

  const priceMap = [
    ["explore", getStripePriceIdForPlan("explore")],
    ["plus", getStripePriceIdForPlan("plus")],
    ["premium", getStripePriceIdForPlan("premium")],
  ];

  const match = priceMap.find(([, configuredPriceId]) => configuredPriceId && configuredPriceId === id);
  return match ? match[0] : "";
}

function getStripeSubscriptionIdFromInvoice(invoice = {}) {
  return String(
    invoice?.subscription ||
      invoice?.parent?.subscription_details?.subscription ||
      invoice?.lines?.data?.[0]?.subscription ||
      ""
  ).trim();
}

function getStripeInvoiceBillingReason(invoice = {}) {
  return String(invoice?.billing_reason || invoice?.parent?.type || "").trim().toLowerCase();
}

function getStripePeriodRangeFromSubscription(subscription = {}) {
  const item = Array.isArray(subscription?.items?.data) && subscription.items.data.length
    ? subscription.items.data[0]
    : null;

  const startSeconds = Number(subscription?.current_period_start || item?.current_period_start || 0);
  const endSeconds = Number(subscription?.current_period_end || item?.current_period_end || 0);

  return {
    periodStart: startSeconds ? new Date(startSeconds * 1000).toISOString() : new Date().toISOString(),
    periodEnd: endSeconds ? new Date(endSeconds * 1000).toISOString() : null,
  };
}

function getStripeCancelAtPeriodEnd(subscription = {}) {
  const cancelAtPeriodEnd = Boolean(subscription?.cancel_at_period_end);
  const cancelAtSeconds = Number(subscription?.cancel_at || 0);
  const hasScheduledCancelAt = Number.isFinite(cancelAtSeconds) && cancelAtSeconds > 0;
  return cancelAtPeriodEnd || hasScheduledCancelAt;
}

function getStripeCancellationEndDate(subscription = {}, period = {}) {
  const cancelAtSeconds = Number(subscription?.cancel_at || 0);
  if (Number.isFinite(cancelAtSeconds) && cancelAtSeconds > 0) {
    return new Date(cancelAtSeconds * 1000).toISOString();
  }

  return period?.periodEnd || null;
}

function getStripePlanRank(plan = "") {
  const key = String(plan || "").trim().toLowerCase();
  const ranks = { free: 0, explore: 1, plus: 2, premium: 3 };
  return ranks[key] || 0;
}

function getStripeSubscriptionItem(subscription = {}) {
  return Array.isArray(subscription?.items?.data) && subscription.items.data.length
    ? subscription.items.data[0]
    : null;
}

function getStripePeriodUnixRangeFromSubscription(subscription = {}) {
  const item = getStripeSubscriptionItem(subscription);
  const startSeconds = Number(subscription?.current_period_start || item?.current_period_start || 0);
  const endSeconds = Number(subscription?.current_period_end || item?.current_period_end || 0);

  return {
    periodStartSeconds: Number.isFinite(startSeconds) && startSeconds > 0 ? startSeconds : 0,
    periodEndSeconds: Number.isFinite(endSeconds) && endSeconds > 0 ? endSeconds : 0,
  };
}

function getPendingPlanChangeFields({ plan = null, effectiveAt = null, priceId = null } = {}) {
  return {
    pending_plan_change: plan || null,
    pending_plan_change_at: effectiveAt || null,
    pending_plan_price_id: priceId || null,
  };
}

function shouldClearPendingPlanChange(profile = {}, activePlan = "", cancelAtPeriodEnd = false) {
  const pendingPlan = String(profile?.pending_plan_change || "").trim().toLowerCase();
  const currentActivePlan = String(activePlan || "").trim().toLowerCase();

  if (!pendingPlan) return true;
  if (cancelAtPeriodEnd) return true;
  if (pendingPlan && currentActivePlan && pendingPlan === currentActivePlan) return true;
  return false;
}

function getPendingPlanChangeFromStripeSubscription(subscription = {}, period = {}) {
  const pendingPlan = String(subscription?.metadata?.pending_plan || "").trim().toLowerCase();
  const pendingPriceId = String(subscription?.metadata?.pending_plan_price_id || "").trim();

  if (!["plus", "premium"].includes(pendingPlan)) {
    return null;
  }

  const activePriceId = getStripePriceIdFromSubscription(subscription);
  const activePlan = getStripePlanFromPriceId(activePriceId);
  const activeRank = getStripePlanRank(activePlan);
  const pendingRank = getStripePlanRank(pendingPlan);

  // Only treat this as a pending downgrade while the active Stripe price is still the higher plan.
  if (!activeRank || !pendingRank || pendingRank >= activeRank) {
    return null;
  }

  return {
    plan: pendingPlan,
    priceId: pendingPriceId || getStripePriceIdForPlan(pendingPlan),
    effectiveAt: period?.periodEnd || getStripeCancellationEndDate(subscription || {}, period),
  };
}

async function releaseStripeScheduleIfPresent(subscription = {}) {
  const scheduleId = String(subscription?.schedule || "").trim();
  if (!scheduleId) return null;

  try {
    return await stripe.subscriptionSchedules.release(scheduleId);
  } catch (err) {
    console.warn("Could not release Stripe subscription schedule; continuing:", err?.message || err);
    return null;
  }
}

async function scheduleStripeDowngradeAtPeriodEnd({
  subscription = {},
  currentItem = null,
  requestedPlan = "",
  requestedPriceId = "",
  metadata = {},
} = {}) {
  const subscriptionId = String(subscription?.id || "").trim();
  const item = currentItem || getStripeSubscriptionItem(subscription);
  const currentPriceId = getStripePriceIdFromSubscription(subscription);
  const currentPlan = getStripePlanFromPriceId(currentPriceId) || String(metadata?.plan || "").trim().toLowerCase();
  const requested = String(requestedPlan || "").trim().toLowerCase();

  if (!subscriptionId) throw new Error("Cannot schedule plan change without a Stripe subscription id.");
  if (!item?.id) throw new Error("Cannot schedule plan change without a Stripe subscription item.");
  if (!currentPriceId) throw new Error("Cannot schedule plan change because the current Stripe price could not be found.");
  if (!requestedPriceId) throw new Error("Cannot schedule plan change because the requested Stripe price could not be found.");

  const { periodStartSeconds, periodEndSeconds } = getStripePeriodUnixRangeFromSubscription(subscription);
  if (!periodEndSeconds) {
    throw new Error("Cannot schedule downgrade because Stripe did not return a current period end date.");
  }

  let schedule;
  if (subscription?.schedule) {
    schedule = await stripe.subscriptionSchedules.retrieve(subscription.schedule);
  } else {
    schedule = await stripe.subscriptionSchedules.create({
      from_subscription: subscriptionId,
    });
  }

  const currentPhaseStart = Number(schedule?.current_phase?.start_date || periodStartSeconds || Math.floor(Date.now() / 1000));
  const currentPhaseEnd = Number(schedule?.current_phase?.end_date || periodEndSeconds);
  const quantity = Number(item?.quantity || 1);

  const scheduled = await stripe.subscriptionSchedules.update(schedule.id, {
    end_behavior: "release",
    proration_behavior: "none",
    metadata: {
      ...metadata,
      pending_plan: requested,
      pending_plan_price_id: requestedPriceId,
    },
    phases: [
      {
        start_date: currentPhaseStart,
        end_date: currentPhaseEnd,
        items: [{ price: currentPriceId, quantity }],
        metadata: {
          ...metadata,
          plan: currentPlan,
          pending_plan: requested,
        },
      },
      {
        start_date: currentPhaseEnd,
        items: [{ price: requestedPriceId, quantity }],
        proration_behavior: "none",
        metadata: {
          ...metadata,
          plan: requested,
          pending_plan: "",
        },
      },
    ],
  });

  return {
    schedule: scheduled,
    effectiveAt: new Date(currentPhaseEnd * 1000).toISOString(),
  };
}

async function updateProfileById(userId = "", updatePayload = {}) {
  const runUpdate = async (payload) => supabaseAdmin
    .from("profiles")
    .update(payload)
    .eq("id", userId)
    .select("*")
    .single();

  let { data, error } = await runUpdate(updatePayload);
  if (!error) return data;

  // Keep local development resilient if Supabase schema cache is temporarily missing newer optional columns.
  const optionalColumns = [
    "subscription_current_period_start",
    "report_period_start",
    "report_period_end",
    "bonus_reports",
    "bonus_advisor_questions",
    "bonus_expires_at",
  ];

  const message = String(error?.message || "");
  const isMissingOptionalColumn =
    error?.code === "PGRST204" ||
    optionalColumns.some((column) => message.includes(`'${column}'`) || message.includes(`\"${column}\"`));

  if (!isMissingOptionalColumn) throw error;

  const fallbackPayload = { ...updatePayload };
  optionalColumns.forEach((column) => delete fallbackPayload[column]);

  const fallback = await runUpdate(fallbackPayload);
  if (fallback.error) throw fallback.error;
  return fallback.data;
}

function getStripePriceIdFromSubscription(subscription = {}) {
  const item = Array.isArray(subscription?.items?.data) && subscription.items.data.length
    ? subscription.items.data[0]
    : null;

  return String(item?.price?.id || subscription?.plan?.id || "").trim();
}

async function getStripeSubscriptionSafe(subscriptionId = "") {
  const id = String(subscriptionId || "").trim();
  if (!stripe || !id) return null;

  try {
    return await stripe.subscriptions.retrieve(id);
  } catch (err) {
    console.warn("Could not retrieve Stripe subscription; continuing with available data:", err?.message || err);
    return null;
  }
}

async function recordStripeEvent(event = {}) {
  try {
    const { error } = await supabaseAdmin.from("stripe_events").insert({
      id: event.id,
      event_type: event.type,
      payload: {
        id: event.id,
        type: event.type,
        created: event.created || null,
        livemode: Boolean(event.livemode),
        object_id: event?.data?.object?.id || null,
      },
    });

    if (error?.code === "23505") {
      console.log(`Stripe event already processed: ${event.id}`);
      return false;
    }

    if (error) {
      console.warn("Could not write stripe_events row; continuing:", error.message || error);
    }

    return true;
  } catch (err) {
    console.warn("stripe_events insert threw; continuing:", err?.message || err);
    return true;
  }
}

async function recordEntitlementLedger(row = {}) {
  try {
    const { error } = await supabaseAdmin.from("entitlement_ledger").insert(row);
    if (error?.code === "23505") return;
    if (error) console.warn("Could not write entitlement_ledger row; entitlement may still have been applied:", error.message || error);
  } catch (err) {
    console.warn("entitlement_ledger insert threw; entitlement may still have been applied:", err?.message || err);
  }
}

async function loadProfileForStripeUser(userId = "") {
  const { data: profile, error } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(`Could not load profile for Stripe user ${userId}: ${error.message || error}`);
  }

  return profile;
}

async function applyExplorePurchaseEntitlement({ session = {}, event = {}, userId = "", plan = "", entitlement = {} }) {
  const profile = await loadProfileForStripeUser(userId);

  const reportsDelta = Number(entitlement.reportCredits || 0);
  const advisorDelta = Number(entitlement.advisorExtraQuestions || 0);
  const nextReportLimit = Number(profile?.report_limit || 0) + reportsDelta;
  const nextAdvisorExtra = Number(profile?.advisor_extra_questions || 0) + advisorDelta;

  const { data: updatedProfile, error } = await supabaseAdmin
    .from("profiles")
    .update({
      plan: profile?.plan || "free",
      plan_source: profile?.plan_source || entitlement.planSource,
      report_limit: nextReportLimit,
      advisor_extra_questions: nextAdvisorExtra,
      stripe_customer_id: session?.customer || profile?.stripe_customer_id || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select("*")
    .single();

  if (error) throw new Error(`Could not update profile credit after Stripe checkout: ${error.message || error}`);

  await recordEntitlementLedger({
    user_id: userId,
    source_type: "stripe_purchase",
    source_id: session?.id || event?.id || null,
    description: entitlement.description,
    reports_delta: reportsDelta,
    advisor_questions_delta: advisorDelta,
    plan_delta: null,
    starts_at: new Date().toISOString(),
    expires_at: null,
    status: "active",
    metadata: {
      stripe_event_id: event?.id || null,
      stripe_checkout_session_id: session?.id || null,
      stripe_payment_intent_id: session?.payment_intent || null,
      stripe_customer_id: session?.customer || null,
      plan,
      amount_total: session?.amount_total || null,
      currency: session?.currency || null,
    },
  });

  return {
    userId,
    plan,
    reportsAdded: reportsDelta,
    advisorQuestionsAdded: advisorDelta,
    reportLimit: updatedProfile?.report_limit,
    reportsUsed: updatedProfile?.reports_used,
  };
}

async function applySubscriptionEntitlement({
  userId = "",
  plan = "",
  entitlement = {},
  event = {},
  session = {},
  invoice = {},
  subscription = null,
  resetMonthlyUsage = true,
  addReportCredits = true,
}) {
  const profile = await loadProfileForStripeUser(userId);

  const subscriptionId = String(subscription?.id || session?.subscription || getStripeSubscriptionIdFromInvoice(invoice) || profile?.stripe_subscription_id || "").trim();
  const priceId = getStripePriceIdFromSubscription(subscription) || profile?.subscription_price_id || getStripePriceIdForPlan(plan);
  const period = getStripePeriodRangeFromSubscription(subscription || {});

  const reportMonthlyLimit = Number(entitlement.reportMonthlyLimit || 0);
  const advisorMonthlyLimit = Number(entitlement.advisorMonthlyLimit || 0);
  const reportsDelta = addReportCredits ? reportMonthlyLimit : 0;

  const updatePayload = {
    plan: entitlement.plan,
    plan_source: entitlement.planSource,
    report_limit: reportMonthlyLimit,
    advisor_questions_limit: advisorMonthlyLimit,
    advisor_extra_questions: 0,
    stripe_customer_id: session?.customer || invoice?.customer || subscription?.customer || profile?.stripe_customer_id || null,
    stripe_subscription_id: subscriptionId || null,
    subscription_status: subscription?.status || "active",
    subscription_price_id: priceId || null,
    subscription_current_period_start: period.periodStart,
    subscription_current_period_end: getStripeCancellationEndDate(subscription || {}, period),
    cancel_at_period_end: getStripeCancelAtPeriodEnd(subscription || {}),
    ...getPendingPlanChangeFields(),
    report_period_start: period.periodStart,
    report_period_end: period.periodEnd,
    advisor_period_start: period.periodStart,
    advisor_period_end: period.periodEnd,
    updated_at: new Date().toISOString(),
  };

  if (resetMonthlyUsage) {
    updatePayload.reports_used = 0;
    updatePayload.advisor_questions_used = 0;
  }

  let updatedProfile;
  try {
    updatedProfile = await updateProfileById(userId, updatePayload);
  } catch (error) {
    throw new Error(`Could not update subscription entitlement: ${error.message || error}`);
  }

  await recordEntitlementLedger({
    user_id: userId,
    source_type: "stripe_subscription",
    source_id: session?.id || invoice?.id || subscriptionId || event?.id || null,
    description: entitlement.description,
    reports_delta: reportsDelta,
    advisor_questions_delta: advisorMonthlyLimit,
    plan_delta: entitlement.plan,
    starts_at: period.periodStart || new Date().toISOString(),
    expires_at: period.periodEnd,
    status: "active",
    metadata: {
      stripe_event_id: event?.id || null,
      stripe_checkout_session_id: session?.id || null,
      stripe_invoice_id: invoice?.id || null,
      stripe_subscription_id: subscriptionId || null,
      stripe_customer_id: session?.customer || invoice?.customer || subscription?.customer || null,
      stripe_price_id: priceId || null,
      plan,
      resetMonthlyUsage,
      addReportCredits,
    },
  });

  return {
    userId,
    plan,
    subscriptionId,
    reportMonthlyLimit,
    advisorMonthlyLimit,
    reportLimit: updatedProfile?.report_limit,
    reportsUsed: updatedProfile?.reports_used,
    advisorQuestionsUsed: updatedProfile?.advisor_questions_used,
    advisorQuestionsLimit: updatedProfile?.advisor_questions_limit,
    periodEnd: updatedProfile?.advisor_period_end,
  };
}

async function processCheckoutSessionCompleted(session = {}, event = {}) {
  const shouldProcess = await recordStripeEvent(event);
  if (!shouldProcess) return { skipped: true, reason: "duplicate_event", eventId: event.id };

  const userId = String(session?.metadata?.userId || session?.client_reference_id || "").trim();
  const plan = String(session?.metadata?.plan || "").trim().toLowerCase();

  if (!userId) throw new Error("Stripe checkout session is missing metadata.userId/client_reference_id.");

  const entitlement = getStripePlanEntitlement(plan);
  if (!entitlement) throw new Error(`Unknown Stripe plan in checkout metadata: ${plan || "(empty)"}`);

  if (plan === "explore") {
    return applyExplorePurchaseEntitlement({ session, event, userId, plan, entitlement });
  }

  const subscriptionId = String(session?.subscription || "").trim();
  const subscription = await getStripeSubscriptionSafe(subscriptionId);

  return applySubscriptionEntitlement({
    userId,
    plan,
    entitlement,
    event,
    session,
    subscription,
    resetMonthlyUsage: true,
    addReportCredits: true,
  });
}

async function processInvoicePaid(invoice = {}, event = {}) {
  const shouldProcess = await recordStripeEvent(event);
  if (!shouldProcess) return { skipped: true, reason: "duplicate_event", eventId: event.id };

  const billingReason = getStripeInvoiceBillingReason(invoice);

  // checkout.session.completed already applies the first subscription allowance.
  // This avoids double-adding credits during the initial subscription purchase.
  if (billingReason === "subscription_create") {
    return { skipped: true, reason: "initial_subscription_invoice_handled_by_checkout", invoiceId: invoice?.id || null };
  }

  const subscriptionId = getStripeSubscriptionIdFromInvoice(invoice);
  const subscription = await getStripeSubscriptionSafe(subscriptionId);
  const priceId = getStripePriceIdFromSubscription(subscription) || String(invoice?.lines?.data?.[0]?.price?.id || "").trim();
  const plan = String(subscription?.metadata?.plan || getStripePlanFromPriceId(priceId) || "").trim().toLowerCase();
  const userId = String(subscription?.metadata?.userId || invoice?.metadata?.userId || "").trim();

  if (!subscriptionId) return { skipped: true, reason: "missing_subscription_id", invoiceId: invoice?.id || null };
  if (!plan) return { skipped: true, reason: "missing_plan", subscriptionId, priceId };
  if (!userId) return { skipped: true, reason: "missing_user_id", subscriptionId, plan };

  const entitlement = getStripePlanEntitlement(plan);
  if (!entitlement || plan === "explore") {
    return { skipped: true, reason: "not_subscription_entitlement", subscriptionId, plan };
  }

  return applySubscriptionEntitlement({
    userId,
    plan,
    entitlement,
    event,
    invoice,
    subscription,
    resetMonthlyUsage: true,
    addReportCredits: true,
  });
}

async function processSubscriptionStatusChange(subscription = {}, event = {}) {
  const shouldProcess = await recordStripeEvent(event);
  if (!shouldProcess) return { skipped: true, reason: "duplicate_event", eventId: event.id };

  const userId = String(subscription?.metadata?.userId || "").trim();
  if (!userId) return { skipped: true, reason: "missing_user_id", subscriptionId: subscription?.id || null };

  const profile = await loadProfileForStripeUser(userId);
  const currentSubscriptionId = String(profile?.stripe_subscription_id || "").trim();
  const incomingSubscriptionId = String(subscription?.id || "").trim();

  // Protect the current profile from stale Stripe webhooks.
  // This can happen if an older Plus subscription was scheduled to cancel,
  // then the user later moved to Premium. The old Plus webhook must not
  // overwrite the newer active Premium subscription stored on the profile.
  if (
    currentSubscriptionId &&
    incomingSubscriptionId &&
    currentSubscriptionId !== incomingSubscriptionId
  ) {
    console.log("Ignoring stale subscription webhook", {
      currentSubscriptionId,
      incomingSubscriptionId,
      status: subscription?.status,
      eventId: event?.id || null,
    });

    return {
      skipped: true,
      reason: "stale_subscription_event",
      currentSubscriptionId,
      incomingSubscriptionId,
    };
  }

  const status = String(subscription?.status || "").trim().toLowerCase();
  const priceId = getStripePriceIdFromSubscription(subscription);
  const planFromPrice = getStripePlanFromPriceId(priceId);
  const entitlement = getStripePlanEntitlement(planFromPrice);
  const period = getStripePeriodRangeFromSubscription(subscription);
  const cancelAtPeriodEnd = getStripeCancelAtPeriodEnd(subscription);
  const pendingPlanFromStripe = getPendingPlanChangeFromStripeSubscription(subscription, period);

  console.log("Stripe subscription status payload:", {
    subscriptionId: subscription?.id || null,
    status,
    priceId,
    planFromPrice,
    cancelAtPeriodEnd,
    pendingPlanFromStripe,
    rawCancelAtPeriodEnd: subscription?.cancel_at_period_end,
    rawCancelAt: subscription?.cancel_at || null,
    currentPeriodEnd: period.periodEnd,
    cancellationEndDate: getStripeCancellationEndDate(subscription || {}, period),
    metadata: subscription?.metadata || {},
  });

  const updatePayload = {
    stripe_subscription_id: subscription?.id || null,
    subscription_status: status || null,
    subscription_price_id: priceId || null,
    subscription_current_period_start: period.periodStart,
    subscription_current_period_end: getStripeCancellationEndDate(subscription || {}, period),
    cancel_at_period_end: cancelAtPeriodEnd,
    updated_at: new Date().toISOString(),
  };

  // Cancellation overrides any previously scheduled downgrade.
  // Stripe can keep old pending_plan metadata after a user cancels at period end.
  // In that case the app must show "Cancels on...", not "Downgrades to...".
  if (cancelAtPeriodEnd) {
    Object.assign(updatePayload, getPendingPlanChangeFields());
  } else if (pendingPlanFromStripe) {
    Object.assign(updatePayload, getPendingPlanChangeFields(pendingPlanFromStripe));
  } else if (shouldClearPendingPlanChange(profile, planFromPrice, cancelAtPeriodEnd)) {
    Object.assign(updatePayload, getPendingPlanChangeFields());
  }

  if (entitlement && ["active", "trialing", "past_due"].includes(status)) {
    updatePayload.plan = entitlement.plan;
    updatePayload.plan_source = entitlement.planSource;
    updatePayload.report_limit = Number(entitlement.reportMonthlyLimit || 0);
    updatePayload.advisor_questions_limit = Number(entitlement.advisorMonthlyLimit || 0);
    updatePayload.advisor_extra_questions = 0;
    updatePayload.report_period_start = period.periodStart;
    updatePayload.report_period_end = period.periodEnd;
    updatePayload.advisor_period_start = period.periodStart;
    updatePayload.advisor_period_end = period.periodEnd;
  }

  // If the subscription is set to cancel at period end but is still active, keep access until Stripe sends the final deleted/canceled state.
  if (["canceled", "incomplete_expired", "unpaid"].includes(status)) {
    updatePayload.plan = "free";
    updatePayload.plan_source = "free";
    updatePayload.report_limit = 0;
    updatePayload.reports_used = 0;
    updatePayload.advisor_questions_limit = 0;
    updatePayload.advisor_questions_used = 0;
    updatePayload.advisor_extra_questions = 0;
    Object.assign(updatePayload, getPendingPlanChangeFields());
    updatePayload.report_period_start = null;
    updatePayload.report_period_end = null;
    updatePayload.advisor_period_start = null;
    updatePayload.advisor_period_end = null;
  }

  let updatedProfile;
  try {
    updatedProfile = await updateProfileById(userId, updatePayload);
  } catch (error) {
    throw new Error(`Could not update subscription status: ${error.message || error}`);
  }

  return {
    userId,
    plan: updatedProfile?.plan,
    subscriptionId: subscription?.id || null,
    subscriptionStatus: updatedProfile?.subscription_status,
    cancelAtPeriodEnd: Boolean(updatedProfile?.cancel_at_period_end),
    pendingPlanChange: updatedProfile?.pending_plan_change || null,
    pendingPlanChangeAt: updatedProfile?.pending_plan_change_at || null,
    currentPeriodEnd: updatedProfile?.subscription_current_period_end || null,
  };
}

app.post("/api/stripe/create-checkout-session", async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        error: "STRIPE_NOT_CONFIGURED",
        message: "Stripe is not configured on the backend.",
      });
    }

    const { user } = await getAuthenticatedUserAndProfile(req);
    const plan = String(req.body?.plan || "").trim().toLowerCase();
    const allowedPlans = new Set(["explore", "plus", "premium"]);

    if (!allowedPlans.has(plan)) {
      return res.status(400).json({
        error: "INVALID_PLAN",
        message: "Please choose a valid CareerDNA plan.",
      });
    }

    const priceId = getStripePriceIdForPlan(plan);
    if (!priceId) {
      return res.status(500).json({
        error: "STRIPE_PRICE_NOT_CONFIGURED",
        message: `Stripe price ID is not configured for ${plan}.`,
      });
    }

    const mode = getStripeCheckoutModeForPlan(plan);
    const clientUrl = getClientUrl();
    const metadata = {
      userId: user.id,
      plan,
      source: "careerdna",
    };

    const sessionPayload = {
      mode,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${clientUrl}/profile?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/profile?checkout=cancelled`,
      client_reference_id: user.id,
      customer_email: user.email || undefined,
      allow_promotion_codes: true,
      metadata,
    };

    if (mode === "subscription") {
      sessionPayload.subscription_data = { metadata };
    } else {
      sessionPayload.payment_intent_data = { metadata };
    }

    const session = await stripe.checkout.sessions.create(sessionPayload);

    return res.json({
      ok: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (err) {
    const status = err.status || err.response?.status || 500;
    console.error("❌ Stripe checkout session error:", err?.message || err);
    return res.status(status).json({
      error: "STRIPE_CHECKOUT_FAILED",
      message: err.message || "Could not start Stripe checkout.",
    });
  }
});

app.post("/api/stripe/create-billing-portal-session", async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        error: "STRIPE_NOT_CONFIGURED",
        message: "Stripe is not configured on the backend.",
      });
    }

    const { profile } = await getAuthenticatedUserAndProfile(req);
    const customerId = String(profile?.stripe_customer_id || "").trim();

    if (!customerId) {
      return res.status(400).json({
        error: "NO_STRIPE_CUSTOMER",
        message: "No Stripe customer is linked to this account yet.",
      });
    }

    const clientUrl = getClientUrl();
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${clientUrl}/profile?billing=portal_return`,
    });

    return res.json({
      ok: true,
      url: portalSession.url,
    });
  } catch (err) {
    const status = err.status || err.response?.status || 500;
    console.error("❌ Stripe billing portal session error:", err?.message || err);
    return res.status(status).json({
      error: "STRIPE_BILLING_PORTAL_FAILED",
      message: err.message || "Could not open Stripe billing portal.",
    });
  }
});





async function syncStripeSubscriptionProfile(profile = {}) {
  const userId = String(profile?.id || "").trim();
  const subscriptionId = String(profile?.stripe_subscription_id || "").trim();

  if (!userId) {
    const err = new Error("Profile is missing user id.");
    err.status = 400;
    throw err;
  }

  if (!stripe) {
    const err = new Error("Stripe is not configured on the backend.");
    err.status = 500;
    throw err;
  }

  if (!subscriptionId) {
    return {
      profile,
      synced: false,
      reason: "no_subscription_id",
      subscription: null,
    };
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const status = String(subscription?.status || "").trim().toLowerCase();
  const priceId = getStripePriceIdFromSubscription(subscription);
  const planFromPrice = getStripePlanFromPriceId(priceId);
  const entitlement = getStripePlanEntitlement(planFromPrice);
  const period = getStripePeriodRangeFromSubscription(subscription);
  const cancelAtPeriodEnd = getStripeCancelAtPeriodEnd(subscription);
  const pendingPlanFromStripe = getPendingPlanChangeFromStripeSubscription(subscription, period);

  const updatePayload = {
    stripe_subscription_id: subscription?.id || subscriptionId,
    stripe_customer_id: subscription?.customer || profile?.stripe_customer_id || null,
    subscription_status: status || null,
    subscription_price_id: priceId || null,
    subscription_current_period_start: period.periodStart,
    subscription_current_period_end: getStripeCancellationEndDate(subscription || {}, period),
    cancel_at_period_end: cancelAtPeriodEnd,
    updated_at: new Date().toISOString(),
  };

  // Cancellation overrides any previously scheduled downgrade.
  // Stripe can keep old pending_plan metadata after a user cancels at period end.
  // In that case the app must show "Cancels on...", not "Downgrades to...".
  if (cancelAtPeriodEnd) {
    Object.assign(updatePayload, getPendingPlanChangeFields());
  } else if (pendingPlanFromStripe) {
    Object.assign(updatePayload, getPendingPlanChangeFields(pendingPlanFromStripe));
  } else if (shouldClearPendingPlanChange(profile, planFromPrice, cancelAtPeriodEnd)) {
    Object.assign(updatePayload, getPendingPlanChangeFields());
  }

  if (["canceled", "incomplete_expired", "unpaid"].includes(status)) {
    updatePayload.plan = "free";
    updatePayload.plan_source = "free";
    updatePayload.report_limit = 0;
    updatePayload.reports_used = 0;
    updatePayload.advisor_questions_limit = 0;
    updatePayload.advisor_questions_used = 0;
    updatePayload.advisor_extra_questions = 0;
    Object.assign(updatePayload, getPendingPlanChangeFields());
    updatePayload.report_period_start = null;
    updatePayload.report_period_end = null;
    updatePayload.advisor_period_start = null;
    updatePayload.advisor_period_end = null;
  } else if (entitlement && ["plus", "premium"].includes(planFromPrice)) {
    updatePayload.plan = entitlement.plan;
    updatePayload.plan_source = entitlement.planSource;
    updatePayload.report_limit = Number(entitlement.reportMonthlyLimit || 0);
    updatePayload.advisor_questions_limit = Number(entitlement.advisorMonthlyLimit || 0);
    updatePayload.advisor_extra_questions = 0;
    updatePayload.report_period_start = period.periodStart;
    updatePayload.report_period_end = period.periodEnd;
    updatePayload.advisor_period_start = period.periodStart;
    updatePayload.advisor_period_end = period.periodEnd;
  }

  const updatedProfile = await updateProfileById(userId, updatePayload);

  return {
    profile: updatedProfile,
    synced: true,
    subscription: {
      id: subscription?.id || subscriptionId,
      status,
      priceId,
      plan: planFromPrice || updatedProfile?.plan || "",
      cancelAtPeriodEnd,
      cancelAt: subscription?.cancel_at || null,
      currentPeriodEnd: getStripeCancellationEndDate(subscription || {}, period),
    },
  };
}

async function handleStripeSubscriptionSyncRequest(req, res) {
  try {
    const { profile } = await getAuthenticatedUserAndProfile(req);
    const result = await syncStripeSubscriptionProfile(profile);

    console.log("Stripe subscription sync result:", {
      userId: result?.profile?.id || profile?.id || null,
      plan: result?.profile?.plan || null,
      subscriptionStatus: result?.profile?.subscription_status || null,
      cancelAtPeriodEnd: Boolean(result?.profile?.cancel_at_period_end),
      stripeSubscriptionCancelAt: result?.subscription?.cancelAt || null,
      pendingPlanChange: result?.profile?.pending_plan_change || null,
      pendingPlanChangeAt: result?.profile?.pending_plan_change_at || null,
      subscriptionId: result?.profile?.stripe_subscription_id || null,
      synced: Boolean(result?.synced),
      reason: result?.reason || null,
    });

    return res.json({
      ok: true,
      profile: result.profile,
      subscription: result.subscription,
      synced: result.synced,
      reason: result.reason || null,
    });
  } catch (err) {
    const status = err.status || err.response?.status || 500;
    console.error("❌ Stripe subscription sync error:", err?.message || err, err?.stack || "");
    return res.status(status).json({
      error: "STRIPE_SUBSCRIPTION_SYNC_FAILED",
      message: err.message || "Could not refresh your subscription status.",
    });
  }
}

app.post("/api/account/sync-stripe-subscription", handleStripeSubscriptionSyncRequest);
app.post("/api/stripe/sync-subscription", handleStripeSubscriptionSyncRequest);


app.post("/api/stripe/cancel-scheduled-downgrade", async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        error: "STRIPE_NOT_CONFIGURED",
        message: "Stripe is not configured on the backend.",
      });
    }

    const { user, profile } = await getAuthenticatedUserAndProfile(req);
    const pendingPlan = String(profile?.pending_plan_change || "").trim().toLowerCase();

    if (!pendingPlan) {
      return res.json({
        ok: true,
        unchanged: true,
        message: "There is no scheduled downgrade to cancel.",
        profile,
      });
    }

    const subscriptionId = String(profile?.stripe_subscription_id || "").trim();
    if (!subscriptionId) {
      return res.status(400).json({
        error: "NO_ACTIVE_SUBSCRIPTION",
        message: "No active Stripe subscription is linked to this account.",
      });
    }

    const existingSubscription = await stripe.subscriptions.retrieve(subscriptionId);

    const profileCustomerId = String(profile?.stripe_customer_id || "").trim();
    const subscriptionCustomerId = String(existingSubscription?.customer || "").trim();
    if (profileCustomerId && subscriptionCustomerId && profileCustomerId !== subscriptionCustomerId) {
      return res.status(403).json({
        error: "STRIPE_CUSTOMER_MISMATCH",
        message: "This subscription does not belong to the signed-in account.",
      });
    }

    if (existingSubscription?.schedule) {
      await releaseStripeScheduleIfPresent(existingSubscription);
    }

    const activePriceId = getStripePriceIdFromSubscription(existingSubscription) || profile?.subscription_price_id || "";
    const activePlan = getStripePlanFromPriceId(activePriceId) || String(profile?.plan || "").trim().toLowerCase();

    const cleanMetadata = {
      ...(existingSubscription?.metadata || {}),
      userId: user.id,
      plan: activePlan || String(profile?.plan || "").trim().toLowerCase(),
      source: "careerdna",
      pending_plan: "",
      pending_plan_price_id: "",
    };

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
      metadata: cleanMetadata,
    });

    const period = getStripePeriodRangeFromSubscription(updatedSubscription || existingSubscription);
    const priceId = getStripePriceIdFromSubscription(updatedSubscription) || activePriceId;

    const updatedProfile = await updateProfileById(user.id, {
      stripe_subscription_id: updatedSubscription?.id || subscriptionId,
      stripe_customer_id: updatedSubscription?.customer || profile?.stripe_customer_id || null,
      subscription_status: updatedSubscription?.status || profile?.subscription_status || null,
      subscription_price_id: priceId || null,
      subscription_current_period_start: period.periodStart,
      subscription_current_period_end: getStripeCancellationEndDate(updatedSubscription || existingSubscription || {}, period),
      cancel_at_period_end: false,
      ...getPendingPlanChangeFields(),
      updated_at: new Date().toISOString(),
    });

    return res.json({
      ok: true,
      cancelled: true,
      cancelledPendingPlan: pendingPlan,
      plan: updatedProfile?.plan || activePlan,
      subscriptionId,
      profile: updatedProfile,
    });
  } catch (err) {
    const status = err.status || err.response?.status || 500;
    console.error("❌ Stripe cancel scheduled downgrade error:", err?.message || err, err?.stack || "");
    return res.status(status).json({
      error: "STRIPE_CANCEL_SCHEDULED_DOWNGRADE_FAILED",
      message: err.message || "Could not cancel your scheduled downgrade.",
    });
  }
});

app.post("/api/stripe/change-subscription-plan", async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        error: "STRIPE_NOT_CONFIGURED",
        message: "Stripe is not configured on the backend.",
      });
    }

    const { user, profile } = await getAuthenticatedUserAndProfile(req);
    const requestedPlan = String(req.body?.plan || "").trim().toLowerCase();

    if (!["plus", "premium"].includes(requestedPlan)) {
      return res.status(400).json({
        error: "INVALID_PLAN",
        message: "Please choose either Plus or Premium.",
      });
    }

    const currentPlan = String(profile?.plan || "free").trim().toLowerCase();
    const currentRank = getStripePlanRank(currentPlan);
    const requestedRank = getStripePlanRank(requestedPlan);
    const pendingPlan = String(profile?.pending_plan_change || "").trim().toLowerCase();

    if (
      currentPlan === requestedPlan &&
      !profile?.cancel_at_period_end &&
      !pendingPlan
    ) {
      return res.json({ ok: true, unchanged: true, profile });
    }

    const subscriptionId = String(profile?.stripe_subscription_id || "").trim();
    if (!subscriptionId) {
      return res.status(400).json({
        error: "NO_ACTIVE_SUBSCRIPTION",
        message: "No active Stripe subscription is linked to this account.",
      });
    }

    const priceId = getStripePriceIdForPlan(requestedPlan);
    if (!priceId) {
      return res.status(500).json({
        error: "STRIPE_PRICE_NOT_CONFIGURED",
        message: `Stripe price ID is not configured for ${requestedPlan}.`,
      });
    }

    const existingSubscription = await stripe.subscriptions.retrieve(subscriptionId);
    const item = getStripeSubscriptionItem(existingSubscription);

    if (!item?.id) {
      return res.status(400).json({
        error: "SUBSCRIPTION_ITEM_NOT_FOUND",
        message: "Could not find the Stripe subscription item to update.",
      });
    }

    const profileCustomerId = String(profile?.stripe_customer_id || "").trim();
    const subscriptionCustomerId = String(existingSubscription?.customer || "").trim();
    if (profileCustomerId && subscriptionCustomerId && profileCustomerId !== subscriptionCustomerId) {
      return res.status(403).json({
        error: "STRIPE_CUSTOMER_MISMATCH",
        message: "This subscription does not belong to the signed-in account.",
      });
    }

    const metadata = {
      ...(existingSubscription?.metadata || {}),
      userId: user.id,
      plan: requestedPlan,
      source: "careerdna",
    };

    const isDowngrade = currentRank > requestedRank;

    if (isDowngrade) {
      if (pendingPlan === requestedPlan && profile?.pending_plan_change_at) {
        return res.json({
          ok: true,
          scheduled: true,
          unchanged: true,
          plan: currentPlan,
          pendingPlanChange: requestedPlan,
          pendingPlanChangeAt: profile.pending_plan_change_at,
          subscriptionId,
          profile,
        });
      }

      const scheduled = await scheduleStripeDowngradeAtPeriodEnd({
        subscription: existingSubscription,
        currentItem: item,
        requestedPlan,
        requestedPriceId: priceId,
        metadata: {
          ...metadata,
          plan: currentPlan,
        },
      });

      const currentPeriod = getStripePeriodRangeFromSubscription(existingSubscription);
      const updatedProfile = await updateProfileById(user.id, {
        stripe_subscription_id: existingSubscription.id,
        stripe_customer_id: existingSubscription.customer || profile?.stripe_customer_id || null,
        subscription_status: existingSubscription.status || profile?.subscription_status || null,
        subscription_price_id: getStripePriceIdFromSubscription(existingSubscription) || profile?.subscription_price_id || null,
        subscription_current_period_start: currentPeriod.periodStart,
        subscription_current_period_end: scheduled.effectiveAt,
        cancel_at_period_end: false,
        pending_plan_change: requestedPlan,
        pending_plan_change_at: scheduled.effectiveAt,
        pending_plan_price_id: priceId,
        updated_at: new Date().toISOString(),
      });

      return res.json({
        ok: true,
        scheduled: true,
        plan: currentPlan,
        pendingPlanChange: requestedPlan,
        pendingPlanChangeAt: scheduled.effectiveAt,
        subscriptionId,
        scheduleId: scheduled?.schedule?.id || null,
        profile: updatedProfile,
      });
    }

    if (existingSubscription?.schedule) {
      await releaseStripeScheduleIfPresent(existingSubscription);
    }

    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
      proration_behavior: "create_prorations",
      metadata,
      items: [
        {
          id: item.id,
          price: priceId,
        },
      ],
    });

    const entitlement = getStripePlanEntitlement(requestedPlan);
    const updatedProfile = await applySubscriptionEntitlement({
      userId: user.id,
      plan: requestedPlan,
      entitlement,
      subscription: updatedSubscription,
      resetMonthlyUsage: true,
      addReportCredits: false,
    });

    return res.json({
      ok: true,
      scheduled: false,
      plan: requestedPlan,
      subscriptionId: updatedSubscription.id,
      cancelAtPeriodEnd: Boolean(updatedSubscription.cancel_at_period_end),
      profile: updatedProfile,
    });
  } catch (err) {
    const status = err.status || err.response?.status || 500;
    console.error("❌ Stripe subscription plan change error:", err?.message || err, err?.stack || "");
    return res.status(status).json({
      error: "STRIPE_SUBSCRIPTION_CHANGE_FAILED",
      message: err.message || "Could not change your subscription plan.",
    });
  }
});

app.post("/api/delete-account", deleteAccountRateLimit, async (req, res) => {
  const rid = req._rid;

  try {
    if (!supabaseAdmin) {
      return res.status(500).json({
        error: "Supabase admin client is not configured on the backend.",
      });
    }

    if (!supabaseAuthClient) {
      return res.status(500).json({
        error: "Supabase auth client is not configured on the backend.",
      });
    }

    if (String(req.body?.confirmation || "").trim() !== "DELETE") {
      return res.status(400).json({ error: "Deletion confirmation is required." });
    }

    const password = String(req.body?.password || "");
    if (!password) {
      return res.status(400).json({ error: "Password is required to delete your account." });
    }

    const token = getBearerToken(req);
    if (!token) {
      return res.status(401).json({ error: "Missing authorization token." });
    }

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user?.id) {
      return res.status(401).json({ error: "Invalid or expired session." });
    }

    if (!user.email) {
      return res.status(400).json({ error: "Your account email could not be verified." });
    }

    const { error: passwordError } = await supabaseAuthClient.auth.signInWithPassword({
      email: user.email,
      password,
    });

    if (passwordError) {
      return res.status(401).json({ error: "Incorrect password. Account deletion was not completed." });
    }

    await supabaseAuthClient.auth.signOut();

    const userId = user.id;

    const { error: advisorMessagesError } = await supabaseAdmin
      .from("advisor_messages")
      .delete()
      .eq("user_id", userId);

    if (advisorMessagesError && advisorMessagesError.code !== "42P01") throw advisorMessagesError;

    const { error: advisorConversationsError } = await supabaseAdmin
      .from("advisor_conversations")
      .delete()
      .eq("user_id", userId);

    if (advisorConversationsError && advisorConversationsError.code !== "42P01") throw advisorConversationsError;

    const { error: runsError } = await supabaseAdmin
      .from("assessment_runs")
      .delete()
      .eq("user_id", userId);

    if (runsError) throw runsError;

    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .delete()
      .eq("id", userId);

    if (profileError) throw profileError;

    const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (deleteUserError) throw deleteUserError;

    console.log(`[${rid}] Deleted account and app data for user ${userId}`);
    return res.json({ ok: true });
  } catch (err) {
    console.error(`❌ [${rid}] Delete account error:`, err?.message || err, err?.stack || "");
    return res.status(500).json({ error: "Failed to delete account." });
  }
});

app.post("/api/summary", summaryRateLimit, async (req, res) => {
  const rid = req._rid;

  try {
    console.log(`[${rid}] ▶ payload bytes=${Buffer.byteLength(JSON.stringify(req.body) || "", "utf8")}`);

    const parsed = parseSummaryRequest(req.body);
    if (parsed.error) {
      return res.status(parsed.error.status).json({ summary: parsed.error.summary });
    }

    const { archetypes, age, status, subjects, incomingSubdims } = parsed.value;
    const { profile: accountProfile } = await getAuthenticatedUserAndProfile(req);

    const reportCredit = await consumeReportCredit(accountProfile);
    if (!reportCredit.allowed) {
      return res.status(403).json({
        error: "REPORT_LIMIT_REACHED",
        summary: "REPORT_LIMIT_REACHED",
        message: "You have used your available free report generation. Upgrade or apply a coupon code to generate another report.",
        entitlement: buildEntitlementView(reportCredit.profile || accountProfile),
      });
    }
    const accountProfileAfterCredit = reportCredit.profile || accountProfile;

    const { profile, ctx, allowedSubdimsForPrompt } = buildProfileBundle(archetypes, incomingSubdims);

    logVerbose("[library counts]", CDNA_LIBRARY_COUNTS);

    const recommendations = selectRecommendations({ status, subjects, ctx, lib: CDNA_LIBRARY });

    const scoreMaps = buildScoreMaps(recommendations, ctx);
    logScoredSections(status, recommendations, profile, ctx);

    const fixedLists = buildFixedLists(recommendations);
    const itemEvidence = buildItemEvidenceBundle(recommendations, profile);
    const breakdownMaps = buildBreakdownMaps(recommendations, ctx, scoreMaps);
    const populationScoreMaps = buildPopulationScoreMaps(recommendations, ctx, CDNA_LIBRARY, subjects, status);
    const canonicalSectionSignalMap = buildCanonicalSectionSignalMap(status, recommendations, scoreMaps, breakdownMaps, populationScoreMaps);
    let precomputedSelectionInsights = buildPrecomputedSelectionInsights(status, recommendations, profile, canonicalSectionSignalMap);
    const hiddenSelectionGroups = buildExplorerNarrativeGroups(status, precomputedSelectionInsights, profile);
    let analysisMeta = buildAnalysisMeta(recommendations, scoreMaps, breakdownMaps, populationScoreMaps, precomputedSelectionInsights);

    const recommendationPayload = buildInternalRecommendationPayload({
      profile,
      recommendations,
      scoreMaps,
      itemEvidence,
      fixedLists,
      breakdownMaps,
    });

    if (DEV_NO_LLM) {
      return res.json({
        summary: "# Summary\n\n1) Dev mode: LLM skipped.",
        analysisMeta,
        entitlement: buildEntitlementView(accountProfileAfterCredit),
        diagnostics: buildDevDiagnostics({
          profile,
          recommendations,
          itemEvidence,
          fixedLists,
          allowedSubdimsForPrompt,
          recommendationPayload,
        }),
      });
    }

    const promptPayload = buildSummaryPromptPayload({
      archetypes,
      age,
      status,
      subjects,
      profileMode: recommendations.profileMode,
      profile,
      allowedSubdimsForPrompt,
      fixedLists,
      itemEvidence,
      hiddenSelectionGroups,
    });

    const prompt = buildReportPrompt(promptPayload);
    const combinedOutput = await callModels([{ role: "user", content: prompt }]);
    const { summary } = extractSelectionNarrativesFromCombinedOutput(combinedOutput);

    let explorerNarratives = null;
    if (hiddenSelectionGroups.length) {
      try {
        const selectionPrompt = buildSelectionNarrativesPrompt(promptPayload);
        const selectionOutput = await callModels([{ role: "user", content: selectionPrompt }]);
        explorerNarratives = parseJsonFromModelOutput(selectionOutput);
      } catch (selectionErr) {
        console.error(`⚠️ [${rid}] Selection narrative generation failed; using fallback summaries.`, selectionErr?.message || selectionErr);
        explorerNarratives = null;
      }
    }

    if (explorerNarratives) {
      precomputedSelectionInsights = applyPrewrittenNarratives(precomputedSelectionInsights, explorerNarratives);
      analysisMeta = buildAnalysisMeta(recommendations, scoreMaps, breakdownMaps, populationScoreMaps, precomputedSelectionInsights);
    }

      if (LOG_SUMMARY) {
      console.log(`[${rid}] Full Prose Summary:\n${summary}`);
      if (explorerNarratives) {
        console.log(`[${rid}] Explorer narratives generated separately for ${status}.`);
      }
    }
  

    return res.json({
      summary,
      analysisMeta,
      entitlement: buildEntitlementView(accountProfileAfterCredit),
    });
  } catch (err) {
    const status = err.status || err.response?.status || 500;
    const data = err.response?.data || err.message || String(err);
    console.error(`❌ [${rid}] Server error:`, status, data, err.stack);

    return res.status(status).json({
      summary: "⚠️ Failed to generate summary.",
      error: "SUMMARY_GENERATION_FAILED",
      message: "We could not generate your report right now. Please try again shortly.",
      requestId: req._rid,
    });
  }
});


const ADVISOR_RECENT_MESSAGE_LIMIT = Number(process.env.CDNA_ADVISOR_RECENT_MESSAGE_LIMIT || 12);
const ADVISOR_SUMMARY_AFTER_MESSAGES = Number(process.env.CDNA_ADVISOR_SUMMARY_AFTER_MESSAGES || 18);
const ADVISOR_SUMMARY_KEEP_RECENT = Number(process.env.CDNA_ADVISOR_SUMMARY_KEEP_RECENT || 10);

function normalizeAdvisorRole(role = "") {
  return String(role || "").toLowerCase() === "assistant" ? "assistant" : "user";
}

function serializeAdvisorMessage(row = {}) {
  return {
    id: row.id,
    conversationId: row.conversation_id,
    role: normalizeAdvisorRole(row.role),
    content: row.content || "",
    createdAt: row.created_at || null,
  };
}

function sanitizeAdvisorReply(raw = "") {
  let text = String(raw || "").trim();
  if (!text) return "";

  text = text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "");

  const rawLines = text.split(/\r?\n/);
  const lines = [];

  for (const rawLine of rawLines) {
    let line = String(rawLine || "").trim();
    if (!line) {
      lines.push("");
      continue;
    }

    line = line
      .replace(/^\s*[-*•]+\s+/g, "")
      .replace(/^\s*\d+[.)]\s+/g, "")
      .replace(/^\s*(first|second|third|fourth|fifth|finally)[,:.-]\s+/i, "");

    line = line.replace(
      /^\s*(archetype strengths?|archetype analysis|key strengths? and traits?|strengths? and traits?|subject interests?|career worlds?|career pathways?|recommended options?|summary|recommendation|why this fits|how this works)\s*:\s*/i,
      ""
    );

    lines.push(line);
  }

  text = lines.join("\n");
  text = text.replace(/\n{3,}/g, "\n\n").trim();

  const paragraphs = text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\n+/g, " ").replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return paragraphs.join("\n\n");
}

async function getAssessmentRunForUser(assessmentRunId, userId) {
  const runId = String(assessmentRunId || "").trim();
  if (!runId) {
    const err = new Error("assessmentRunId is required.");
    err.status = 400;
    throw err;
  }

  const { data, error } = await supabaseAdmin
    .from("assessment_runs")
    .select("*")
    .eq("id", runId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) {
    const err = new Error("Saved CareerDNA result not found.");
    err.status = 404;
    throw err;
  }
  return data;
}

async function getOrCreateAdvisorConversation({ userId, assessmentRunId, conversationId = "" }) {
  const requestedConversationId = String(conversationId || "").trim();

  if (requestedConversationId) {
    const { data, error } = await supabaseAdmin
      .from("advisor_conversations")
      .select("*")
      .eq("id", requestedConversationId)
      .eq("user_id", userId)
      .eq("assessment_run_id", assessmentRunId)
      .maybeSingle();

    if (error) throw error;
    if (data) return data;
  }

  const { data: existing, error: existingError } = await supabaseAdmin
    .from("advisor_conversations")
    .select("*")
    .eq("user_id", userId)
    .eq("assessment_run_id", assessmentRunId)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingError) throw existingError;
  if (existing) return existing;

  const { data: created, error: createError } = await supabaseAdmin
    .from("advisor_conversations")
    .insert({
      user_id: userId,
      assessment_run_id: assessmentRunId,
      title: "CareerDNA Advisor Chat",
      summary: "",
      message_count: 0,
    })
    .select("*")
    .single();

  if (createError) throw createError;
  return created;
}

async function listAdvisorMessages(conversationId, { ascending = true, limit = 50 } = {}) {
  let query = supabaseAdmin
    .from("advisor_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending });

  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

async function maybeUpdateAdvisorConversationSummary(conversation = {}) {
  const messageCount = Number(conversation?.message_count || 0);
  if (!messageCount || messageCount < ADVISOR_SUMMARY_AFTER_MESSAGES) return conversation;
  if (messageCount % ADVISOR_SUMMARY_AFTER_MESSAGES !== 0) return conversation;

  const allMessages = await listAdvisorMessages(conversation.id, { ascending: true, limit: 200 });
  const olderMessages = allMessages.slice(0, Math.max(0, allMessages.length - ADVISOR_SUMMARY_KEEP_RECENT));
  if (!olderMessages.length) return conversation;

  try {
    const summaryMessages = buildConversationSummaryMessages({
      existingSummary: conversation.summary || "",
      olderMessages,
    });
    const summary = await callModels(summaryMessages);
    const { data, error } = await supabaseAdmin
      .from("advisor_conversations")
      .update({ summary, updated_at: new Date().toISOString() })
      .eq("id", conversation.id)
      .select("*")
      .single();

    if (error) throw error;
    return data || conversation;
  } catch (err) {
    console.error("⚠️ Advisor summary update failed:", err?.message || err);
    return conversation;
  }
}

app.get("/api/career-advisor/conversation", advisorRateLimit, async (req, res) => {
  try {
    const { user, profile } = await getAuthenticatedUserAndProfile(req);
    const assessmentRunId = String(req.query?.assessmentRunId || "").trim();
    const run = await getAssessmentRunForUser(assessmentRunId, user.id);

    const conversation = await getOrCreateAdvisorConversation({
      userId: user.id,
      assessmentRunId,
      conversationId: String(req.query?.conversationId || "").trim(),
    });

    const rows = await listAdvisorMessages(conversation.id, { ascending: true, limit: 100 });
    return res.json({
      conversation: {
        id: conversation.id,
        assessmentRunId: conversation.assessment_run_id,
        title: conversation.title,
        summary: conversation.summary || "",
        messageCount: Number(conversation.message_count || rows.length || 0),
        createdAt: conversation.created_at || null,
        updatedAt: conversation.updated_at || null,
      },
      messages: rows.map(serializeAdvisorMessage),
      starterPrompts: buildAdvisorStarterPrompts(run),
      entitlement: buildEntitlementView(profile),
    });
  } catch (err) {
    const status = err.status || err.response?.status || 500;
    console.error("❌ Career advisor conversation load error:", err?.message || err);
    return res.status(status).json({
      error: "ADVISOR_CONVERSATION_FAILED",
      message: err.message || "Could not load this advisor conversation.",
    });
  }
});

app.post("/api/career-advisor", advisorRateLimit, async (req, res) => {
  try {
    const { user, profile: accountProfile } = await getAuthenticatedUserAndProfile(req);
    const assessmentRunId = String(req.body?.assessmentRunId || "").trim();
    const conversationId = String(req.body?.conversationId || "").trim();
    const userMessage = String(req.body?.message || "").trim();

    if (!userMessage) {
      return res.status(400).json({ error: "MESSAGE_REQUIRED", message: "Please enter a message." });
    }

    const advisorCredit = await consumeAdvisorCredit(accountProfile);
    if (!advisorCredit.allowed) {
      return res.status(403).json({
        error: "ADVISOR_LIMIT_REACHED",
        message: "You have used all your available AI Advisor questions. You can upgrade or buy extra advisor credits to continue.",
        entitlement: buildEntitlementView(advisorCredit.profile || accountProfile),
      });
    }
    const accountProfileAfterCredit = advisorCredit.profile || accountProfile;

    const run = await getAssessmentRunForUser(assessmentRunId, user.id);
    let conversation = await getOrCreateAdvisorConversation({
      userId: user.id,
      assessmentRunId,
      conversationId,
    });

    const recentRowsDesc = await listAdvisorMessages(conversation.id, {
      ascending: false,
      limit: ADVISOR_RECENT_MESSAGE_LIMIT,
    });
    const recentMessages = recentRowsDesc.slice().reverse().map((row) => ({
      role: normalizeAdvisorRole(row.role),
      content: row.content || "",
    }));

    const { data: savedUserMessage, error: userMessageError } = await supabaseAdmin
      .from("advisor_messages")
      .insert({
        conversation_id: conversation.id,
        user_id: user.id,
        role: "user",
        content: userMessage,
      })
      .select("*")
      .single();

    if (userMessageError) throw userMessageError;

    const messages = buildCareerAdvisorMessages({
      run,
      conversationSummary: conversation.summary || "",
      recentMessages,
      userMessage,
    });

    const rawReply = await callModels(messages);
    const reply = sanitizeAdvisorReply(rawReply);

    const { data: savedAssistantMessage, error: assistantMessageError } = await supabaseAdmin
      .from("advisor_messages")
      .insert({
        conversation_id: conversation.id,
        user_id: user.id,
        role: "assistant",
        content: reply,
      })
      .select("*")
      .single();

    if (assistantMessageError) throw assistantMessageError;

    const nextCount = Number(conversation.message_count || 0) + 2;
    const { data: updatedConversation, error: conversationUpdateError } = await supabaseAdmin
      .from("advisor_conversations")
      .update({
        message_count: nextCount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", conversation.id)
      .select("*")
      .single();

    if (conversationUpdateError) throw conversationUpdateError;
    conversation = await maybeUpdateAdvisorConversationSummary(updatedConversation || conversation);

    return res.json({
      conversation: {
        id: conversation.id,
        assessmentRunId: conversation.assessment_run_id,
        title: conversation.title,
        summary: conversation.summary || "",
        messageCount: Number(conversation.message_count || nextCount),
        createdAt: conversation.created_at || null,
        updatedAt: conversation.updated_at || null,
      },
      messages: [serializeAdvisorMessage(savedUserMessage), serializeAdvisorMessage(savedAssistantMessage)],
      starterPrompts: buildAdvisorStarterPrompts(run),
      reply,
      entitlement: buildEntitlementView(accountProfileAfterCredit),
    });
  } catch (err) {
    const status = err.status || err.response?.status || 500;
    console.error("❌ Career advisor error:", err?.message || err, err?.stack || "");
    return res.status(status).json({
      error: "ADVISOR_RESPONSE_FAILED",
      message: err.message || "Could not generate an advisor response right now.",
    });
  }
});

app.get("/api/account/entitlement", async (req, res) => {
  try {
    const { profile } = await getAuthenticatedUserAndProfile(req);
    return res.json({ entitlement: buildEntitlementView(profile) });
  } catch (err) {
    const status = err.status || err.response?.status || 500;
    return res.status(status).json({ error: err.message || "Failed to fetch account entitlement." });
  }
});

app.post("/api/apply-coupon", couponRateLimit, async (req, res) => {
  const rid = req._rid;

  const couponMessages = {
    COUPON_CODE_REQUIRED: "Please enter a coupon code.",
    PROFILE_NOT_FOUND: "Your account profile could not be found.",
    COUPON_NOT_NEEDED: "Your account already has unlimited access.",
    COUPON_ALREADY_APPLIED: "This access code has already been applied to your account.",
    COUPON_ALREADY_REDEEMED_BY_USER: "You have already used this access code on this account.",
    INVALID_COUPON: "This coupon code was not found.",
    COUPON_INACTIVE: "This coupon code is no longer active.",
    COUPON_EXPIRED: "This coupon code has expired.",
    COUPON_FULLY_USED: "This coupon code has reached its usage limit.",
  };

  const couponStatuses = {
    COUPON_CODE_REQUIRED: 400,
    PROFILE_NOT_FOUND: 404,
    COUPON_NOT_NEEDED: 400,
    COUPON_ALREADY_APPLIED: 400,
    COUPON_ALREADY_REDEEMED_BY_USER: 400,
    INVALID_COUPON: 404,
    COUPON_INACTIVE: 400,
    COUPON_EXPIRED: 400,
    COUPON_FULLY_USED: 400,
  };

  try {
    const rawCode = String(req.body?.code || "").trim().toUpperCase();
    if (!rawCode) {
      return res.status(400).json({
        error: "COUPON_CODE_REQUIRED",
        message: couponMessages.COUPON_CODE_REQUIRED,
      });
    }

    const { user, profile } = await getAuthenticatedUserAndProfile(req);

    const { data, error } = await supabaseAdmin.rpc("redeem_coupon_atomic", {
      p_user_id: user.id,
      p_code: rawCode,
    });

    if (error) throw error;

    const row = Array.isArray(data) ? data[0] : data;
    const ok = Boolean(row?.ok);
    const errorCode = String(row?.error_code || "");
    const updatedProfile =
      row?.profile && typeof row.profile === "object" ? row.profile : profile;

    if (!ok) {
      const status = couponStatuses[errorCode] || 400;
      return res.status(status).json({
        error: errorCode || "COUPON_NOT_APPLIED",
        message: couponMessages[errorCode] || "This access code could not be applied.",
        entitlement: buildEntitlementView(updatedProfile),
      });
    }

    console.log(`[${rid}] Applied coupon ${rawCode} to user ${user.id}`);
    return res.json({
      ok: true,
      entitlement: buildEntitlementView(updatedProfile),
    });
  } catch (err) {
    const status = err.status || err.response?.status || 500;
    const data = err.response?.data || err.message || String(err);
    console.error(`❌ [${rid}] Apply coupon error:`, status, data, err.stack);
    return res.status(status).json({
      error: "FAILED_TO_APPLY_COUPON",
      message: "We could not apply this access code right now. Please check the code or try again shortly.",
      requestId: req._rid,
    });
  }
});

app.post("/api/selection-insights", selectionInsightsRateLimit, async (req, res) => {
  const rid = req._rid;

  try {
    await getAuthenticatedUserAndProfile(req);

    const parsed = parseSelectionInsightsRequest(req.body);
    if (parsed.error) {
      return res.status(parsed.error.status).json({ error: parsed.error.message });
    }

    const { archetypes, likedItems, incomingSubdims } = parsed.value;
    const { profile } = buildProfileBundle(archetypes, incomingSubdims);

    const selectionInsights = (likedItems || [])
      .map((requestItem) => {
        const libItem = getSelectionLibraryItem(requestItem, CDNA_SELECTION_INDEXES);
        if (!libItem) return null;
        const canonicalSignal = extractCanonicalSignal(requestItem);
        return buildSelectionInsight(libItem, profile, requestItem, { canonicalSignal });
      })
      .filter(Boolean);

    return res.json({ selectionInsights });
  } catch (err) {
    const status = err.status || err.response?.status || 500;
    const data = err.response?.data || err.message || String(err);
    console.error(`❌ [${rid}] Selection insight error:`, status, data, err.stack);

    return res.status(status).json({
      error: "SELECTION_INSIGHTS_FAILED",
      message: "We could not load deeper insights right now.",
      requestId: req._rid,
    });
  }
});


app.post("/api/analytics/event", async (req, res) => {
  try {
    const { user } = await getAuthenticatedUserAndProfile(req);

    const eventType = String(req.body?.eventType || "").trim();
    const eventData = req.body?.eventData && typeof req.body.eventData === "object"
      ? req.body.eventData
      : {};

    if (!eventType) {
      return res.status(400).json({ error: "EVENT_TYPE_REQUIRED" });
    }

    const { error } = await supabaseAdmin
      .from("analytics_events")
      .insert({
        user_id: user.id,
        event_type: eventType,
        event_data: eventData,
      });

    if (error) throw error;

    return res.json({ ok: true });
  } catch (err) {
    console.error("Analytics event error:", err?.message || err);
    return res.status(err.status || 500).json({
      error: "ANALYTICS_EVENT_FAILED",
      message: err.message || "Could not save analytics event.",
    });
  }
});

app.get("/api/admin/dashboard", async (req, res) => {
  try {
    await requireAdmin(req);

    const excludedEmails = new Set([
      "georgealexandridis@hotmail.com",
    ]);

    const { data: profilesRaw, error: profilesError } = await supabaseAdmin
      .from("profiles")
      .select("id, email, full_name, plan, created_at, reports_used, report_limit, advisor_questions_used, advisor_questions_limit")
      .order("created_at", { ascending: false });

    if (profilesError) throw profilesError;

    const profiles = (profilesRaw || []).filter((profile) => {
      const email = String(profile?.email || "").trim().toLowerCase();
      return !excludedEmails.has(email);
    });

    const includedUserIds = new Set(profiles.map((profile) => profile.id).filter(Boolean));

    const { data: eventsRaw, error: eventsError } = await supabaseAdmin
      .from("analytics_events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);

    if (eventsError) throw eventsError;

    const { data: runsRaw, error: runsError } = await supabaseAdmin
      .from("assessment_runs")
      .select("id, user_id, created_at, intro_answers_json, results_json")
      .order("created_at", { ascending: false })
      .limit(5000);

    if (runsError) throw runsError;

    const { data: feedbackRaw, error: feedbackError } = await supabaseAdmin
      .from("result_feedback")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10000);

    if (feedbackError && feedbackError.code !== "42P01") throw feedbackError;

    const events = (eventsRaw || []).filter((event) => includedUserIds.has(event.user_id));
    const runs = (runsRaw || []).filter((run) => includedUserIds.has(run.user_id));
    const feedback = (feedbackRaw || []).filter((row) => includedUserIds.has(row.user_id));

    return res.json({
      users: profiles,
      events,
      runs,
      feedback,
    });
  } catch (err) {
    console.error("Admin dashboard error:", err?.message || err);
    return res.status(err.status || 500).json({
      error: "ADMIN_DASHBOARD_FAILED",
      message: err.message || "Could not load admin dashboard.",
    });
  }
});

app.listen(port, () => {
  console.log(`🚀 CareerDNA backend running at http://localhost:${port}`);
  logVerbose("[library counts]", CDNA_LIBRARY_COUNTS);
});
