// src/lib/cdnaValidate.js
// Validation helpers for the revised world-based architecture.

function lev(a, b) {
  a = String(a);
  b = String(b);
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 1; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

function bestFuzzyMatch(candidate, canonKeys = [], normFn = (x) => String(x || "").toLowerCase()) {
  const q = normFn(candidate);
  if (!q || !canonKeys.length) return null;
  let best = null;
  let bestScore = Infinity;
  for (const k of canonKeys) {
    const dist = lev(q, k);
    if (dist < bestScore) {
      bestScore = dist;
      best = k;
    }
  }
  const maxDist = Math.ceil(Math.max(q.length, String(best || "").length) * 0.35);
  return bestScore <= maxDist ? best : null;
}

function intersectIncluded(archTags, included) {
  const allow = new Set((included || []).map((a) => (typeof a === "string" ? a : a.name)).filter(Boolean));
  const result = [];
  for (const a of archTags || []) if (allow.has(a)) result.push(a);
  return result;
}

function normTitle(s = "") {
  return String(s).trim().toLowerCase();
}

function dedupeBy(items = [], keyFn = (x) => x?.title || "") {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = String(keyFn(item) || "").toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function mapLookup(mapOrObj, key) {
  if (!mapOrObj) return null;
  if (mapOrObj instanceof Map) return mapOrObj.get(key) || null;
  return mapOrObj[key] || null;
}

function validateByTitle(items = [], titleLookup, extra = () => ({})) {
  const keys = titleLookup instanceof Map ? Array.from(titleLookup.keys()) : Object.keys(titleLookup || {});
  const out = [];

  for (const raw of items) {
    const t = String(raw?.title || raw || "").trim();
    if (!t) continue;
    const nt = normTitle(t);
    const matchKey = mapLookup(titleLookup, nt)
      ? nt
      : bestFuzzyMatch(nt, keys, (x) => x);
    if (!matchKey) continue;
    const whitelist = mapLookup(titleLookup, matchKey);
    if (!whitelist) continue;
    out.push({
      title: whitelist.title,
      whitelist,
      ...extra(raw, whitelist),
    });
  }

  return dedupeBy(out, (x) => x.title);
}

function validateEnvironments(envItems = [], CDNA_IDX = {}) {
  const envByTitle = CDNA_IDX.envByTitle || CDNA_IDX.environmentByTitle || new Map();
  return validateByTitle(envItems, envByTitle);
}

function validateCareerWorlds(worldItems = [], CDNA_IDX = {}) {
  const worldByTitle = CDNA_IDX.careerWorldByTitle || new Map();
  return validateByTitle(worldItems, worldByTitle, (_raw, whitelist) => ({
    careerWorldId: whitelist.id || whitelist.careerWorldId || "",
  }));
}

function validateSubjects(subjectItems = [], CDNA_IDX = {}) {
  const subjectByTitle = CDNA_IDX.subjectByTitle || new Map();
  return validateByTitle(subjectItems, subjectByTitle, (_raw, whitelist) => ({
    subjectId: whitelist.id || "",
    careerWorldId: whitelist.careerWorldId || "",
  }));
}

function validateRoles(roleItems = [], CDNA_IDX = {}) {
  const roleByTitle = CDNA_IDX.roleByTitle || new Map();
  const out = validateByTitle(roleItems, roleByTitle, (raw, whitelist) => ({
    roleId: whitelist.id || "",
    careerWorldId: whitelist.careerWorldId || "",
    careerWorldTitle: whitelist.careerWorldTitle || "",
    roleFamilyId: whitelist.roleFamilyId || "",
    roleFamilyTitle: whitelist.roleFamilyTitle || "",
    outlook: Number(raw?.outlook || 0),
    interest_match: Number(raw?.interest_match || 0),
  }));
  return dedupeBy(out, (x) => `${x.title}@${x.careerWorldId || ""}`);
}

// Deprecated in the new architecture, kept only so old imports do not crash.
function validateFitAreas() {
  return [];
}

module.exports = {
  intersectIncluded,
  validateEnvironments,
  validateCareerWorlds,
  validateSubjects,
  validateRoles,
  validateFitAreas,
  lev,
  bestFuzzyMatch,
  normTitle,
};
