// /src/lib/cdnaPickSubdims.js — STRICT per spec (personal-only weights; no later gating)
// Contracts this module guarantees:
// 1) pickIncludedArchetypes(archetypeScores, k=3, min=60)
//    • Accepts EITHER an array of { name, score } OR an object map { Name: score }.
//    • Returns an array of included archetype names (≤ k, ≥ min; if none ≥ min, includes top-1).
// 2) buildUserSubdimWeights(userSubdimScoresMap, includedSet)
//    • userSubdimScoresMap: Map<subdimName, number in [0..1] or [0..100]>.
//    • includedSet: Set<string> of included archetypes.
//    • Returns Map<subdimName, weight 0..1> where weight = PERSONAL ONLY (no alignment bonus).
//       Filters: (a) subdim must belong to ≥1 included archetype; (b) personal ≥ 0.30.
// 3) computeAllowedSubdims(userSubdimWeights)
//    • Returns ALL kept subdims (ordered by weight desc). No ≥0.6 gating, no top-K cap.
// 4) initPickSubdims(archetypeScores, userSubdimScores)
//    • archetypeScores: array OR object (see #1)
//    • userSubdimScores: array of { name, score|score_pct } (0..1 or 0..100)
//    • Returns { included: string[], includedSet: Set<string>, userSubdimWeights: Map, allowedSubdims: string[] }
// 5) buildTopSubdimWeights(archetypeScores, userSubdimScores)
//    • BACK-COMPAT ALIAS used by index.js
//    • IMPORTANT: returns ONLY the Map<subdim, weight> (what index.js expects)

const MATRIX = require("../../data/cdna/subdim_matrix"); // { [subdim]: { Achiever:0..1, Connector:.., ... } }

const VERBOSE = process.env.VERBOSE_LOGGING === "true";
const MIN_PERSONAL_SCORE = Number(process.env.CDNA_MIN_SUBDIM_SCORE || 0.30); // keep only if personal ≥ 0.30

function log(...args) { if (VERBOSE) console.log("[cdnaPickSubdims]", ...args); }

// --- helpers ---------------------------------------------------------------

function coerceArchetypeArray(archetypeScores) {
  // Accept array of {name, score} OR object map {Name: score}
  if (Array.isArray(archetypeScores)) {
    return archetypeScores
      .map(x => ({ name: String(x?.name || "").trim(), score: Number(x?.score) || 0 }))
      .filter(x => x.name);
  }
  if (archetypeScores && typeof archetypeScores === "object") {
    return Object.entries(archetypeScores).map(([name, score]) => ({ name, score: Number(score) || 0 }));
  }
  return [];
}

function canonSubdimName(s) {
  // Minimal canonicalization to avoid common misses (symbols/spaces/spelling)
  return String(s || "")
    .toLowerCase()
    .replace(/\s*&\s*/g, " & ")
    .replace(/\s*\/\s*/g, "/")
    .replace(/\s+/g, " ")
    .replace("extraversion/sociability", "extroversion/sociability")
    .trim();
}

function findMatrixKeyMaybeCanonical(name) {
  const canon = canonSubdimName(name);
  if (MATRIX[name]) return name;
  // try canonical match over keys once (cost is tiny, keys are few)
  const hit = Object.keys(MATRIX).find(k => canonSubdimName(k) === canon);
  return hit || name; // fall back to original (will simply fail the belongs check if absent)
}

function subdimBelongsToIncluded(sd, includedSet) {
  const row = MATRIX[sd];
  if (!row) return false;
  // treat ANY non-zero link (positive OR negative) as membership
   for (const a of includedSet) if (((row[a] || 0) !== 0)) return true;
  return false;
}

// --- API -------------------------------------------------------------------

function pickIncludedArchetypes(archetypeScores, k = 3, min = 60) {
  const arr = coerceArchetypeArray(archetypeScores);
  const sorted = arr.sort((a, b) => b.score - a.score);
  const included = sorted.filter(a => (Number(a.score) || 0) >= min).slice(0, k).map(a => a.name);
  if (!included.length && sorted.length) included.push(sorted[0].name);
  log("Included archetypes:", included);
  return included;
}

/**
 * Build Map(subdim -> weight 0..1) using PERSONAL score only (after filters):
 *  - keep only subdims that belong to ≥1 INCLUDED archetype
 *  - keep only personal ≥ MIN_PERSONAL_SCORE
 *  - weight = personal (0..1)
 */
function buildUserSubdimWeights(userSubdimScoresMap, includedSet) {
  if (!(userSubdimScoresMap instanceof Map)) {
    throw new Error("buildUserSubdimWeights expects a Map for userSubdimScoresMap");
  }
  const rows = [];
  for (const [rawName, rawVal] of userSubdimScoresMap.entries()) {
    const key = findMatrixKeyMaybeCanonical(rawName);       // resolve minor name variants
    if (!subdimBelongsToIncluded(key, includedSet)) continue; // must map to at least one included archetype
    const personal = (rawVal > 1 ? rawVal : rawVal * 100) / 100; // normalize to 0..1
    if (personal < MIN_PERSONAL_SCORE) continue;               // personal ≥ 0.30
    rows.push([key, Math.max(0, Math.min(1, personal))]);      // weight = personal only
  }
  rows.sort((a, b) => b[1] - a[1]); // rank high→low
  return new Map(rows);
}

/**
 * Allowed subdims for scoring/prose:
 * • RETURN ALL KEPT SUBDIMS (ordered by weight desc). No ≥0.6 filter, no cap.
 */
function computeAllowedSubdims(userSubdimWeights) {
  return Array.from(userSubdimWeights.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([sd]) => sd);
}

/**
 * Choose up to N hint subdims for an item given its archetype tags.
 * (Still handy for prose; now works over whatever allowedSubdims you give it.)
 */
const HINTS_PER_ITEM = Number(process.env.CDNA_HINTS_PER_ITEM || 3);
function deriveHintsForItem(archetypeTags = [], allowedSubdims = [], includedSet = new Set(), N = HINTS_PER_ITEM) {
  const usableTags = (Array.isArray(archetypeTags) ? archetypeTags : []).filter(Boolean);
  if (!usableTags.length || !allowedSubdims.length) return allowedSubdims.slice(0, Math.min(N, allowedSubdims.length));
  const scored = [];
  for (const sd of allowedSubdims) {
    const row = MATRIX[sd] || {};
    let s = 0; for (const a of usableTags) s += (row[a] || 0);
    if (s > 0) scored.push([sd, s]);
  }
  if (!scored.length) return allowedSubdims.slice(0, Math.min(N, allowedSubdims.length));
  scored.sort((a, b) => b[1] - a[1]);
  return scored.slice(0, N).map(([sd]) => sd);
}

/** One-shot initialiser returning everything the caller needs */
function initPickSubdims(archetypeScores = [], userSubdimScores = []) {
  const included = pickIncludedArchetypes(archetypeScores, 3, 60);
  const includedSet = new Set(included);

  // Normalize incoming user subdim array → Map(name → 0..1 personal)
  const userMap = new Map(
    (Array.isArray(userSubdimScores) ? userSubdimScores : [])
      .map(d => {
        const name = String(d?.name || "").trim();
        const raw = Number(d?.score ?? d?.score_pct ?? 0);
        const personal = Number.isFinite(raw) ? (raw > 1 ? raw / 100 : raw) : 0;
        return [name, personal];
      })
      .filter(([n]) => n)
  );

  const userSubdimWeights = buildUserSubdimWeights(userMap, includedSet); // Map<subdim, personal>
  const allowedSubdims = computeAllowedSubdims(userSubdimWeights);        // ALL kept subdims
  return { included, includedSet, userSubdimWeights, allowedSubdims };
}

// Back-compat entry used by index.js: return ONLY the Map
function buildTopSubdimWeights(archetypeScores, userSubdimScores) {
  const { userSubdimWeights } = initPickSubdims(archetypeScores, userSubdimScores);
  return userSubdimWeights; // Map<subdim, weight>
}

module.exports = {
  pickIncludedArchetypes,
  buildUserSubdimWeights,
  computeAllowedSubdims,
  deriveHintsForItem,
  initPickSubdims,
  buildTopSubdimWeights,
};
