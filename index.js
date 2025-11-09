// index.js — weighted scoring + section-aware subdim hints (1 per item)
require("dotenv").config({ override: true });
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const { randomUUID } = require("crypto");

const { loadCdnaLibrary } = require("./src/lib/cdnaLibrary");
const {
  rankBank,
  selectStrengths,
  selectEnvironments,
  selectFitAreas,
  selectSubjects,
  scoreItemByArchetypeOrder,
} = require("./src/lib/cdnaSelect");
const { buildReportPrompt } = require("./src/lib/cdnaProse");
const { initPickSubdims, deriveHintsForItem } = require("./src/lib/cdnaPickSubdims");

// ===== express / server setup =====
const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: (_origin, cb) => cb(null, true),
  credentials: true,
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400,
};
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json({ limit: "2mb" }));

// ===== globals =====
const VERBOSE = String(process.env.VERBOSE_LOGGING).toLowerCase() === "true";
const LOG_SUMMARY = String(process.env.CDNA_LOG_SUMMARY).toLowerCase() === "true";
const DEV_NO_LLM = String(process.env.CDNA_DEV_NO_LLM).toLowerCase() === "true";
const MAX_LOG_ITEMS_PER_SECTION = 7;

const VLOG = (...args) => {
  if (VERBOSE) console.log(...args);
};

const norm = (s = "") =>
  String(s)
    .toLowerCase()
    .replace(/\s*&\s*/g, " & ")
    .replace(/\s+/g, " ")
    .trim();

// canonicalise subdim names
function canonSubdimName(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/\s*&\s*/g, " & ")
    .replace(/\s*\/\s*/g, "/")
    .replace(/\s+/g, " ")
    .trim();
}

// ===== dimension-aware subdim groups (24 from your matrix) =====
const SUBDIM_GROUPS = {
  whoYouAre: [
    "Curiosity & Openness",
    "Reliability & Focus",
    "Emotional Stability",
    "Uncertainty Tolerance",
    "Perseverance",
    "Sociability & Extroversion",
  ].map(canonSubdimName),
  whatYouLove: [
    "Investigative Curiosity",
    "Creative Expression",
    "Helping Orientation",
    "Entrepreneurial Drive",
    "Hands-On Engagement",
    "Novelty & Variety Seeking",
  ].map(canonSubdimName),
  whatMatters: [
    "Purpose & Impact",
    "Independence & Autonomy",
    "Stability & Predictability",
    "Recognition & Visibility",
    "Financial Ambition",
    "Belonging & Connection",
  ].map(canonSubdimName),
  howYouWorkBest: [
    "Pace & Intensity Preference",
    "Organisation & Systems Orientation",
    "Clarity & Structure Preference",
    "Team Collaboration",
    "Independent Working Approach",
    "Attention to Detail",
  ].map(canonSubdimName),
};

// keep order of groups: first match wins
function filterSubdimsByGroupsOrdered(allSubdims, groupNames) {
  const out = [];
  for (const g of groupNames) {
    const groupList = SUBDIM_GROUPS[g] || [];
    for (const sd of allSubdims) {
      if (groupList.includes(sd) && !out.includes(sd)) {
        out.push(sd);
      }
    }
  }
  return out;
}

// ===== per-request logging middleware =====
app.use((req, res, next) => {
  const rid = randomUUID();
  const started = Date.now();
  req._rid = rid;
  console.log(
    `➡️  [${rid}] ${req.method} ${req.path} (origin=${req.get("origin") || "-"} referer=${
      req.get("referer") || "-"
    })`
  );
  res.on("finish", () => {
    const ms = Date.now() - started;
    console.log(`⬅️  [${rid}] ${req.method} ${req.path} ${res.statusCode} (${ms}ms)`);
  });
  next();
});

// ===== model setup =====
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL_CHAIN = Array.from(
  new Set([process.env.OPENAI_MODEL, "gpt-4o-mini", "gpt-4o"].filter(Boolean))
);
const modelSupportsTemperature = (model) => !/^gpt-5($|[-_])/.test(model);

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
        ...(modelSupportsTemperature(model) ? { temperature: 0.7 } : {}),
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

// ===== helpers =====
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

function pickIncludedArchetypes(archetypes = {}) {
  const sorted = Object.entries(archetypes)
    .map(([name, score]) => ({ name, score: Number.parseFloat(score) || 0 }))
    .filter((a) => !Number.isNaN(a.score))
    .sort((a, b) => b.score - a.score);

  const included = sorted
    .filter((a) => a.score >= 60)
    .slice(0, 3)
    .map((a) => a.name);

  if (included.length === 0 && sorted.length) included.push(sorted[0].name);

  VLOG("Sorted archetypes:", JSON.stringify(sorted.slice(0, 10), null, 2));
  VLOG("Included archetypes:", included);
  return { included, sorted };
}

// allow maxPerItem, we’ll pass 1
function buildItemSubdimHintsWithPicker(items, allowedSubdims, includedSet, maxPerItem = 1) {
  const out = {};
  for (const it of items || []) {
    const tags = Array.isArray(it.archetypes) ? it.archetypes : [];
    const hints = deriveHintsForItem(tags, allowedSubdims, includedSet, maxPerItem);
    out[it.title] = Array.isArray(hints) ? hints.slice(0, maxPerItem) : [];
  }
  return out;
}

function buildItemArchetypeMap(list, includedList) {
  const inc = new Set(includedList || []);
  const out = {};
  for (const it of list || []) {
    const tags = Array.isArray(it.archetypes) ? it.archetypes : [];
    const matched = tags.filter((t) => inc.has(t));
    out[it.title] = matched;
  }
  return out;
}

// ===== routes =====
app.get("/", (_req, res) => res.send("✅ CareerDNA backend is live."));
app.get("/api/ping", (_req, res) => res.json({ ok: true }));

app.post("/api/summary", async (req, res) => {
  const rid = req._rid;
  try {
    console.log(
      `[${rid}] ▶ payload bytes=${Buffer.byteLength(JSON.stringify(req.body) || "", "utf8")}`
    );

    const {
      archetypes,
      age,
      status: rawStatus,
      schoolSubjects,
      uniSubject,
      subdims,
      subdimensions,
    } = req.body;

    const status = normalizeStatus(rawStatus);
    if (!archetypes || typeof archetypes !== "object") {
      return res.status(400).json({ summary: "⚠️ Invalid or missing archetype data." });
    }
    if (!status) {
      return res.status(400).json({ summary: "⚠️ Invalid or missing status." });
    }

    // subjects
    let subjects = [];
    if (status === "school") {
      subjects = normalizeSubjects(schoolSubjects);
    } else {
      const uni = typeof uniSubject === "string" ? uniSubject.trim() : "";
      if (!uni) {
        return res
          .status(400)
          .json({ summary: "⚠️ University subject must be a non-empty string." });
      }
      subjects = [uni];
    }

    // archetypes
    const { included, sorted } = pickIncludedArchetypes(archetypes);
    const includedWeights = {};
    for (const name of included) {
      const raw = Number.parseFloat(archetypes[name]) || 0;
      includedWeights[name] = raw > 1 ? raw / 100 : raw;
    }

    // user subdims
    const userSubdimMap = new Map();
    const incomingSubdims = Array.isArray(subdims) && subdims.length ? subdims : subdimensions;
    if (Array.isArray(incomingSubdims)) {
      for (const row of incomingSubdims) {
        if (!row) continue;
        const key = canonSubdimName(row.name || row.title || row.subdim);
        if (!key) continue;
        const val = Number.parseFloat(row.score) || 0;
        userSubdimMap.set(key, val);
      }
    }

    // init picker
    const pickCtx = initPickSubdims(archetypes, incomingSubdims || []);
    const { allowedSubdims, includedSet } = pickCtx;

    // prefer ≥60
    const allowedSubdims60 = allowedSubdims.filter((sd) => (userSubdimMap.get(sd) || 0) >= 60);
    const finalAllowedSubdims = allowedSubdims60.length ? allowedSubdims60 : allowedSubdims;

    const ctx = {
      includedArchetypes: included,
      includedWeights,
      fullArchetypes: sorted,
    };

    // load library
    const lib = loadCdnaLibrary();

    // 1) strengths
    const topStrengths = selectStrengths(lib.strengths, ctx, 5);

    // 2) environments (7)
    const topEnvironments = selectEnvironments(lib.environments, ctx, 6);

    // 3) fit areas (7)
    const topFitAreas = selectFitAreas(lib.fit_areas, ctx, {
      userSubjects: subjects,
      libSubjects: lib.subjects,
      total: 6,
      subjectSlots: 3,
    });

    const selectedAreaTitles = new Set(topFitAreas.map((x) => x.title));
    const selectedAreaTitlesArr = Array.from(selectedAreaTitles);

    // 4) subjects for school (7 total, only reserve 3 if user actually gave some)
    let topSubjects = [];
    if (status === "school" && Array.isArray(lib.subjects)) {
      const userHasSubjects = Array.isArray(subjects) && subjects.length > 0;
      topSubjects = selectSubjects(lib.subjects, ctx, {
        userSubjects: subjects,
        total: 6,
        subjectSlots: userHasSubjects ? 3 : 0,
      });
    }

    // 5) roles for non-school
    let classicRankedItems = [];
    let emergingRankedItems = [];
    if (status !== "school") {
      const selectedNorm = new Set(selectedAreaTitlesArr.map((t) => norm(t)));
      const rolesFiltered = (lib.roles || []).filter((r) => {
        const fa = r.fit_area ? norm(r.fit_area) : "";
        return fa && selectedNorm.has(fa);
      });

      const classicRoles = rolesFiltered.flatMap((r) =>
        (r.classic || []).map((item) => ({ ...item, type: "classic" }))
      );
      const emergingRoles = rolesFiltered.flatMap((r) =>
        (r.emerging || []).map((item) => ({ ...item, type: "emerging" }))
      );

      classicRankedItems = rankBank(classicRoles, ctx, 5);
      emergingRankedItems = rankBank(emergingRoles, ctx, 5);
    }

    // console scoring
    const userArcArr = included;
    const printScored = (label, items) => {
      console.log(`\n=== ${label} (scored) ===`);
      items.forEach((it) => {
        const score = scoreItemByArchetypeOrder(it, userArcArr, includedWeights, sorted);
        console.log(
          `- ${it.title} | score=${score.toFixed(3)} | tags=[${
            Array.isArray(it.archetypes) ? it.archetypes.join(", ") : ""
          }]`
        );
      });
    };

    printScored("STRENGTHS", topStrengths);
    printScored("ENVIRONMENTS", topEnvironments);
    printScored("FIT AREAS", topFitAreas);
    if (status === "school" && topSubjects.length) {
      printScored("SUBJECTS", topSubjects);
    }
    if (classicRankedItems.length) printScored("ROLES (classic)", classicRankedItems);
    if (emergingRankedItems.length) printScored("ROLES (emerging)", emergingRankedItems);

    // deduped lists for prompt
    const uniq = (arr) => Array.from(new Set(arr));
    const strengthsFixed = uniq(topStrengths.map((x) => x.title)).slice(
      0,
      MAX_LOG_ITEMS_PER_SECTION
    );
    const envsFixed = uniq(topEnvironments.map((x) => x.title)).slice(
      0,
      MAX_LOG_ITEMS_PER_SECTION
    );
    const areasFixed = uniq(topFitAreas.map((x) => x.title)).slice(0, MAX_LOG_ITEMS_PER_SECTION);
    const rolesClassicFixed = uniq(classicRankedItems.map((x) => x.title)).slice(
      0,
      MAX_LOG_ITEMS_PER_SECTION
    );
    const rolesEmergingFixed = uniq(emergingRankedItems.map((x) => x.title)).slice(
      0,
      MAX_LOG_ITEMS_PER_SECTION
    );
    const subjectsFixed = uniq(topSubjects.map((x) => x.title)).slice(
      0,
      MAX_LOG_ITEMS_PER_SECTION
    );

    // item archetypes
    const itemArchetypes = {
      strengths: buildItemArchetypeMap(topStrengths, included),
      environments: buildItemArchetypeMap(topEnvironments, included),
      fit_areas: buildItemArchetypeMap(topFitAreas, included),
      subjects: buildItemArchetypeMap(topSubjects, included),
      roles_classic: buildItemArchetypeMap(classicRankedItems, included),
      roles_emerging: buildItemArchetypeMap(emergingRankedItems, included),
    };

    // SECTION-AWARE subdim pools
    const strengthSubdims = filterSubdimsByGroupsOrdered(
      finalAllowedSubdims,
      ["whoYouAre", "whatYouLove", "whatMatters"]
    );
    const envSubdims = filterSubdimsByGroupsOrdered(
      finalAllowedSubdims,
      ["howYouWorkBest", "whatMatters"]
    );
    const fitAreaSubdims = filterSubdimsByGroupsOrdered(
      finalAllowedSubdims,
      ["whatYouLove", "whatMatters"]
    );
    const subjectSubdims = filterSubdimsByGroupsOrdered(
      finalAllowedSubdims,
      ["whatYouLove", "whoYouAre"]
    );
    const roleSubdims = filterSubdimsByGroupsOrdered(
      finalAllowedSubdims,
      ["whatYouLove", "howYouWorkBest", "whatMatters"]
    );

    // item subdim hints — NO cross-item de-dup, max 1 per item
    const itemSubdimHints = {
      strengths: buildItemSubdimHintsWithPicker(topStrengths, strengthSubdims, includedSet, 1),
      environments: buildItemSubdimHintsWithPicker(topEnvironments, envSubdims, includedSet, 1),
      fit_areas: buildItemSubdimHintsWithPicker(topFitAreas, fitAreaSubdims, includedSet, 1),
      subjects: buildItemSubdimHintsWithPicker(topSubjects, subjectSubdims, includedSet, 1),
      roles_classic: buildItemSubdimHintsWithPicker(
        classicRankedItems,
        roleSubdims,
        includedSet,
        1
      ),
      roles_emerging: buildItemSubdimHintsWithPicker(
        emergingRankedItems,
        roleSubdims,
        includedSet,
        1
      ),
    };

    // debug: see what we actually handed to the LLM
    if (VERBOSE) {
      console.log("itemSubdimHints:", JSON.stringify(itemSubdimHints, null, 2));
    }

    // flattened list to show the LLM what it's allowed to use
    const allowedSubdimsFlattened = Array.from(
      new Set(
        Object.values(itemSubdimHints)
          .flatMap((obj) => Object.values(obj))
          .flat()
      )
    );

    if (DEV_NO_LLM) {
      return res.json({
        summary: "# Summary\n\n1) Dev mode: LLM skipped.",
        diagnostics: {
          included,
          strengths: strengthsFixed,
          environments: envsFixed,
          fit_areas: areasFixed,
          roles_classic: rolesClassicFixed,
          roles_emerging: rolesEmergingFixed,
          subjects: subjectsFixed,
          itemArchetypes,
          itemSubdimHints,
          allowedSubdims: allowedSubdimsFlattened,
        },
      });
    }

    const prompt = buildReportPrompt({
      showSubdimScores: false,
      archetypes,
      age,
      status,
      subjects,
      allowedArchetypes: included,
      allowedSubdims: allowedSubdimsFlattened,
      strengthsFixed,
      envsFixed,
      areasFixed,
      rolesClassicFixed,
      rolesEmergingFixed,
      subjectsFixed,
      itemArchetypes,
      itemSubdimHints,
      subdimScores: [],
    });

const messages = [{ role: "user", content: prompt }];

const summary = await callModels(messages);

    if (LOG_SUMMARY) {
      console.log(`[${rid}] Full Prose Summary:\n${summary}`);
    }

    return res.json({ summary });
  } catch (err) {
    const status = err.status || err.response?.status || 500;
    const data = err.response?.data || err.message || String(err);
    console.error(`❌ [${rid}] Server error:`, status, data, err.stack);
    return res
      .status(status)
      .json({ summary: "⚠️ Failed to generate summary.", error: data, requestId: req._rid });
  }
});

app.listen(port, () => {
  console.log(`🚀 CareerDNA backend running at http://localhost:${port}`);
});
