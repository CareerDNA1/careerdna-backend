const MATRIX = require("../../data/cdna/subdim_matrix");

const VERBOSE = process.env.VERBOSE_LOGGING === "true";
const MIN_PERSONAL_SCORE = Number(process.env.CDNA_MIN_SUBDIM_SCORE || 0.45);
const DEFAULT_MIN_INCLUDED_SCORE = Number(process.env.CDNA_INCLUDED_ARCHETYPE_MIN || 60);
const DEFAULT_MIN_INCLUDED_COUNT = Number(process.env.CDNA_INCLUDED_ARCHETYPE_MIN_COUNT || 2);
const DEFAULT_MAX_INCLUDED_COUNT = Number(process.env.CDNA_INCLUDED_ARCHETYPE_MAX_COUNT || 4);
const DEFAULT_TOP_SUBDIM_LIMIT = Number(process.env.CDNA_TOP_SUBDIM_LIMIT || 8);
const DEFAULT_TOP_SUBDIM_MIN_PCT = Number(process.env.CDNA_TOP_SUBDIM_MIN_PCT || 60);
const HINTS_PER_ITEM = Number(process.env.CDNA_HINTS_PER_ITEM || 2);

function log(...args) {
  if (VERBOSE) console.log("[cdnaPickSubdims]", ...args);
}

function canonSubdimName(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/\s*&\s*/g, " & ")
    .replace(/\s*\/\s*/g, "/")
    .replace(/\s+/g, " ")
    .replace("extraversion/sociability", "extroversion/sociability")
    .trim();
}

function normalizeScoreToPct(v) {
  const n = Number.parseFloat(v);
  if (!Number.isFinite(n)) return 0;
  return n <= 1 ? n * 100 : n;
}

function coerceArchetypeArray(archetypeScores) {
  if (Array.isArray(archetypeScores)) {
    return archetypeScores
      .map((x) => ({ name: String(x?.name || "").trim(), score: Number(x?.score) || 0 }))
      .filter((x) => x.name);
  }

  if (archetypeScores && typeof archetypeScores === "object") {
    return Object.entries(archetypeScores)
      .map(([name, score]) => ({ name: String(name || "").trim(), score: Number(score) || 0 }))
      .filter((x) => x.name);
  }

  return [];
}

function sortArchetypes(archetypeScores) {
  return coerceArchetypeArray(archetypeScores).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return String(a.name).localeCompare(String(b.name));
  });
}

function pickIncludedArchetypes(archetypeScores, options = {}) {
  const sorted =
    Array.isArray(archetypeScores) && archetypeScores[0]?.name
      ? archetypeScores
      : sortArchetypes(archetypeScores);

  if (!sorted.length) return [];

  const minScore = Number(options?.minScore ?? DEFAULT_MIN_INCLUDED_SCORE);
  const minCount = Number(options?.minCount ?? DEFAULT_MIN_INCLUDED_COUNT);
  const maxCount = Number(options?.maxCount ?? DEFAULT_MAX_INCLUDED_COUNT);
  const strictAboveMin = Boolean(options?.strictAboveMin);
  const passesThreshold = (score) =>
    strictAboveMin ? Number(score) > minScore : Number(score) >= minScore;

  let included = sorted.filter((a) => passesThreshold(a.score)).map((a) => a.name);

  if (included.length < minCount) {
    included = sorted.slice(0, Math.max(1, minCount)).map((a) => a.name);
  }

  included = included.slice(0, Math.max(1, maxCount));

  log("Included archetypes:", included);
  return included;
}

function findMatrixKeyMaybeCanonical(name) {
  const canon = canonSubdimName(name);
  if (MATRIX[name]) return name;

  const hit = Object.keys(MATRIX).find((k) => canonSubdimName(k) === canon);
  return hit || null;
}

function subdimBelongsToIncluded(sd, includedSet) {
  const row = MATRIX[sd];
  if (!row) return false;

  for (const a of includedSet) {
    if ((row[a] || 0) !== 0) return true;
  }

  return false;
}

function buildIncomingSubdimMap(userSubdimScores = []) {
  const entries = [];

  for (const d of Array.isArray(userSubdimScores) ? userSubdimScores : []) {
    const rawName = d?.name || d?.title || d?.subdim;
    const name = String(rawName || "").trim();
    if (!name) continue;

    const raw =
      d?.score ??
      d?.score_pct ??
      d?.value ??
      d?.percentage ??
      d?.adjusted ??
      0;

    entries.push([name, normalizeScoreToPct(raw)]);
  }

  return new Map(entries);
}

function buildUserSubdimWeights(userSubdimScoresMap, includedSet) {
  const rows = [];

  for (const [rawName, rawVal] of userSubdimScoresMap.entries()) {
    const key = findMatrixKeyMaybeCanonical(rawName);
    if (!key) continue;

    const personal = normalizeScoreToPct(rawVal) / 100;
    if (personal < MIN_PERSONAL_SCORE) continue;

    const belongsToIncluded = subdimBelongsToIncluded(key, includedSet);
    if (!belongsToIncluded && personal < 0.8) continue;

    const weighted = Math.max(0, Math.min(1, personal));
    rows.push([key, weighted, belongsToIncluded ? 1 : 0]);
  }

  rows.sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1];
    if (b[2] !== a[2]) return b[2] - a[2];
    return String(a[0]).localeCompare(String(b[0]));
  });

  return new Map(rows.map(([key, weighted]) => [key, weighted]));
}

function computeAllowedSubdims(userSubdimWeights) {
  return Array.from(userSubdimWeights.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([sd]) => sd);
}

function buildTopSubdimProfile(
  userSubdimMap,
  allowedSubdims = [],
  limit = DEFAULT_TOP_SUBDIM_LIMIT,
  minPct = DEFAULT_TOP_SUBDIM_MIN_PCT,
  includedSet = new Set()
) {
  const allowedSet = new Set((allowedSubdims || []).map(canonSubdimName));

  return Array.from((userSubdimMap || new Map()).entries())
    .map(([name, score]) => {
      const canonical = findMatrixKeyMaybeCanonical(name);
      const row = MATRIX[canonical] || {};
      let includedWeight = 0;
      let includedMatches = 0;
      for (const arch of includedSet || []) {
        const w = Number(row[arch] || 0);
        if (w > 0) includedMatches += 1;
        includedWeight += w;
      }
      return {
        name: canonical,
        score: Number(score) || 0,
        includedWeight,
        includedMatches,
      };
    })
    .filter((x) => x.name && x.score >= minPct)
    .filter((x) => !allowedSet.size || allowedSet.has(canonSubdimName(x.name)))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.includedWeight !== a.includedWeight) return b.includedWeight - a.includedWeight;
      if (b.includedMatches !== a.includedMatches) return b.includedMatches - a.includedMatches;
      return String(a.name).localeCompare(String(b.name));
    })
    .slice(0, limit)
    .map(({ name, score }) => ({ name, score }));
}

function buildIncludedWeights(archetypeScores, included = []) {
  const sorted =
    Array.isArray(archetypeScores) && archetypeScores[0]?.name
      ? archetypeScores
      : sortArchetypes(archetypeScores);

  const byName = new Map(
    sorted.map((x) => [x.name, normalizeScoreToPct(x.score) / 100])
  );

  const out = {};
  for (const name of included) out[name] = byName.get(name) || 0;
  return out;
}

function uniqCanonical(arr) {
  const out = [];
  const seen = new Set();

  for (const x of arr || []) {
    const key = findMatrixKeyMaybeCanonical(x);
    const canon = canonSubdimName(key || x);
    if (!key || seen.has(canon)) continue;
    seen.add(canon);
    out.push(key);
  }

  return out;
}

function buildItemCanonicalSubdimTiers(item = {}) {
  const core = uniqCanonical([
    ...(Array.isArray(item?.coreSubdimensions) ? item.coreSubdimensions : []),
    ...(Array.isArray(item?.careerWorldCoreSubdimensions) ? item.careerWorldCoreSubdimensions : []),
  ]);

  const evidence = uniqCanonical([
    ...(Array.isArray(item?.evidenceSubdims) ? item.evidenceSubdims : []),
    ...(Array.isArray(item?.keySubdimensions) ? item.keySubdimensions : []),
    ...(Array.isArray(item?.careerWorldKeySubdimensions) ? item.careerWorldKeySubdimensions : []),
    ...(Array.isArray(item?.roleFamilyKeySubdimensions) ? item.roleFamilyKeySubdimensions : []),
    ...(Array.isArray(item?.subdimensions) ? item.subdimensions : []),
  ]).filter((sd) => !core.includes(sd));

  const secondary = uniqCanonical([
    ...(Array.isArray(item?.secondarySubdimensions) ? item.secondarySubdimensions : []),
    ...(Array.isArray(item?.careerWorldSecondarySubdimensions) ? item.careerWorldSecondarySubdimensions : []),
  ]).filter((sd) => !core.includes(sd) && !evidence.includes(sd));

  return { core, evidence, secondary, modifier: [] };
}

function buildCanonicalPool(item = {}) {
  const tiers = buildItemCanonicalSubdimTiers(item);
  return {
    tiers,
    canonicalPool: uniqCanonical([
      ...tiers.core,
      ...tiers.evidence,
      ...tiers.secondary,
    ]),
  };
}

function deriveCanonicalPairFromPool(item = {}, maxCount = 2) {
  const { tiers, canonicalPool } = buildCanonicalPool(item);
  const canonicalPair = canonicalPool.slice(0, Math.max(1, maxCount));

  let source = 'fallback';
  if (tiers.core.length >= Math.max(1, maxCount)) source = 'core';
  else if ((tiers.core.length + tiers.evidence.length) >= Math.max(1, maxCount)) source = tiers.core.length ? 'core' : 'evidence';
  else if (canonicalPair.length) source = tiers.core.length ? 'core' : tiers.evidence.length ? 'evidence' : 'secondary';

  return { tiers, canonicalPool, canonicalPair, source };
}

function scoreCanonicalCandidate(sd, userSubdimMap = new Map()) {
  const exact = Number(userSubdimMap.get(sd));
  if (Number.isFinite(exact)) return exact;

  const canon = canonSubdimName(sd);
  for (const [name, score] of userSubdimMap.entries()) {
    if (canonSubdimName(name) === canon) return Number(score) || 0;
  }
  return 0;
}

function selectCanonicalSubdimPair(item = {}, userSubdimMap = new Map(), maxCount = 2) {
  const targetCount = Math.max(1, maxCount);
  const { tiers, canonicalPool, canonicalPair, source } = deriveCanonicalPairFromPool(item, targetCount);

  // Hard lock: personalization can only operate INSIDE the canonical pair.
  // We may reorder the canonical pair by the user's scores, but we never pull a
  // replacement subdimension from the wider canonical pool.
  const rankedCanonicalPair = canonicalPair
    .map((sd, idx) => ({ sd, score: scoreCanonicalCandidate(sd, userSubdimMap), idx }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.idx - b.idx;
    });

  const matched = [];
  const seen = new Set();
  for (const row of rankedCanonicalPair) {
    if (matched.length >= targetCount) break;
    if (seen.has(row.sd)) continue;
    if (row.score <= 0) continue;
    seen.add(row.sd);
    matched.push(row.sd);
  }

  for (const sd of canonicalPair) {
    if (matched.length >= targetCount) break;
    if (seen.has(sd)) continue;
    seen.add(sd);
    matched.push(sd);
  }

  const preferredRelevant = uniqCanonical([
    ...tiers.core,
    ...tiers.evidence,
    ...tiers.secondary,
    ...tiers.modifier,
  ]);

  return {
    primary_subdims: canonicalPair.slice(),
    preferred_relevant_subdims: preferredRelevant.slice(),
    core_subdims: tiers.core.slice(),
    canonical_pair: canonicalPair.slice(),
    matched_pair: matched.slice(0, targetCount),
    source_of_pair: source,
    canonical_pool: canonicalPool.slice(),
    item_core_subdims: tiers.core.slice(),
    item_evidence_subdims: tiers.evidence.slice(),
    item_secondary_subdims: tiers.secondary.slice(),
    item_relevant_subdims: preferredRelevant.slice(),
    designed_anchor_subdims: canonicalPair.slice(),
  };
}

function deriveHintsForItem(
  archetypeTags = [],
  allowedSubdims = [],
  includedSet = new Set(),
  N = HINTS_PER_ITEM,
  preferredSubdims = [],
  usedCounts = new Map()
) {
  const canonicalPool = uniqCanonical(preferredSubdims);
  if (!canonicalPool.length) return [];

  const ranked = canonicalPool
    .map((sd, idx) => ({
      sd,
      idx,
      used: Number(usedCounts.get(sd) || 0),
      allowed: allowedSubdims.some((x) => canonSubdimName(x) === canonSubdimName(sd)) ? 1 : 0,
    }))
    .sort((a, b) => {
      if (b.allowed !== a.allowed) return b.allowed - a.allowed;
      if (a.used !== b.used) return a.used - b.used;
      return a.idx - b.idx;
    });

  const picked = ranked.slice(0, Math.max(1, N)).map((row) => row.sd);
  for (const sd of picked) usedCounts.set(sd, (usedCounts.get(sd) || 0) + 1);
  return picked;
}

function initPickSubdims(archetypeScores = [], userSubdimScores = [], options = {}) {
  const sorted = sortArchetypes(archetypeScores);

  const included =
    Array.isArray(options?.includedOverride) && options.includedOverride.length
      ? Array.from(
          new Set(
            options.includedOverride
              .map((x) => String(x || "").trim())
              .filter(Boolean)
          )
        )
      : pickIncludedArchetypes(sorted, options?.includeOptions);

  const includedSet = new Set(included);
  const userSubdimMap = buildIncomingSubdimMap(userSubdimScores);
  const userSubdimWeights = buildUserSubdimWeights(userSubdimMap, includedSet);
  const allowedSubdims = computeAllowedSubdims(userSubdimWeights);

  return {
    included,
    includedSet,
    userSubdimMap,
    userSubdimWeights,
    allowedSubdims,
  };
}

function buildProfileContext(archetypeScores = [], userSubdimScores = [], options = {}) {
  const sorted = sortArchetypes(archetypeScores);

  const included =
    Array.isArray(options?.includedOverride) && options.includedOverride.length
      ? Array.from(
          new Set(
            options.includedOverride
              .map((x) => String(x || "").trim())
              .filter(Boolean)
          )
        )
      : pickIncludedArchetypes(sorted, options?.includeOptions);

  const pickCtx = initPickSubdims(archetypeScores, userSubdimScores, {
    includedOverride: included,
  });

  const topSubdimProfile = buildTopSubdimProfile(
    pickCtx.userSubdimMap,
    pickCtx.allowedSubdims,
    options.topSubdimLimit,
    options.topSubdimMinPct,
    pickCtx.includedSet
  );

  const topSubdimMap = Object.fromEntries(
    topSubdimProfile.map((x) => [x.name, x.score])
  );

  const fullSubdimMap = Object.fromEntries(
    Array.from(pickCtx.userSubdimMap.entries()).map(([name, score]) => [
      findMatrixKeyMaybeCanonical(name) || name,
      score,
    ])
  );

  const includedWeights = buildIncludedWeights(sorted, included);

  return {
    sorted,
    included,
    includedSet: pickCtx.includedSet,
    includedWeights,
    userSubdimMap: pickCtx.userSubdimMap,
    userSubdimWeights: pickCtx.userSubdimWeights,
    allowedSubdims: pickCtx.allowedSubdims,
    topSubdimProfile,
    topSubdimMap,
    fullSubdimMap,
  };
}

module.exports = {
  pickIncludedArchetypes,
  buildUserSubdimWeights,
  computeAllowedSubdims,
  deriveHintsForItem,
  selectCanonicalSubdimPair,
  initPickSubdims,
  buildIncomingSubdimMap,
  buildTopSubdimProfile,
  buildProfileContext,
  canonSubdimName,
  normalizeScoreToPct,
  sortArchetypes,
};
