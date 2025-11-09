// src/lib/cdnaValidate.js

// Tiny Levenshtein (no deps)
function lev(a, b) {
  a = String(a); b = String(b);
  const m = a.length, n = b.length;
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

function bestFuzzyMatch(candidate, canonKeys, normFn) {
  const q = normFn(candidate);
  let best = null;
  let bestScore = Infinity;
  for (const k of canonKeys) {
    const dist = lev(q, k);
    if (dist < bestScore) { bestScore = dist; best = k; }
  }
  // Relative threshold: allow up to 35% of length
  const maxDist = Math.ceil(Math.max(q.length, (best || "").length) * 0.35);
  return bestScore <= maxDist ? best : null;
}

function intersectIncluded(archTags, included) {
  const allow = new Set((included || []).map(a => a.name));
  const result = [];
  for (const a of (archTags || [])) if (allow.has(a)) result.push(a);
  return result.length ? result : [];
}

/** ENVIRONMENTS **/
function validateEnvironments(envItems, CDNA_IDX) {
  if (!Array.isArray(envItems)) return [];
  const keys = Array.from(CDNA_IDX.envByTitle.keys());
  const out = [];

  for (const it of envItems) {
    const t = String(it?.title || it || "");
    if (!t) continue;
    const key = CDNA_IDX.envByTitle.has(CDNA_IDX.normTitle(t))
      ? CDNA_IDX.normTitle(t)
      : bestFuzzyMatch(t, keys, CDNA_IDX.normTitle);

    if (!key) continue;
    const whitelist = CDNA_IDX.envByTitle.get(key);
    out.push({
      title: whitelist.title,
      whitelist
    });
  }
  // de-duplicate by title
  const seen = new Set();
  return out.filter(x => {
    const k = x.title.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** FIT AREAS **/
function validateFitAreas(faItems, CDNA_IDX) {
  if (!Array.isArray(faItems)) return [];
  // Canonical titles (lowercased) from index
  const canonTitles = Array.from(CDNA_IDX.fitAreasSet).map(s => String(s).toLowerCase());
  const out = [];

  for (const it of faItems) {
    const t = String(it?.title || it || "").trim();
    if (!t) continue;
    const lt = t.toLowerCase();

    if (canonTitles.includes(lt)) {
      const canonical = Array.from(CDNA_IDX.fitAreasSet).find(s => s.toLowerCase() === lt);
      out.push({ title: canonical });
      continue;
    }
    // fuzzy against titles
    const key = bestFuzzyMatch(lt, canonTitles, s => s);
    if (key) {
      const canonical = Array.from(CDNA_IDX.fitAreasSet).find(s => s.toLowerCase() === key);
      out.push({ title: canonical });
    }
  }

  // de-duplicate
  const seen = new Set();
  return out.filter(x => {
    const k = x.title.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** ROLES **/
function validateRoles(roleItems, CDNA_IDX) {
  if (!Array.isArray(roleItems)) return [];
  const keys = Array.from(CDNA_IDX.roleByTitle.keys());
  const out = [];

  for (const it of roleItems) {
    const t = String(it?.title || it || "");
    if (!t) continue;

    // Exact or fuzzy by role title
    const nt = CDNA_IDX.normTitle(t);
    const key = CDNA_IDX.roleByTitle.has(nt)
      ? nt
      : bestFuzzyMatch(nt, keys, s => s);

    if (!key) continue;
    const whitelist = CDNA_IDX.roleByTitle.get(key);

    // Allow LLM to provide outlook/interest; otherwise default 0
    out.push({
      title: whitelist.title,
      fit_area: whitelist.fit_area,
      whitelist,
      outlook: Number(it?.outlook || 0),
      interest_match: Number(it?.interest_match || 0)
    });
  }

  // De-dup by title + fit_area
  const seen = new Set();
  return out.filter(x => {
    const k = x.title.toLowerCase() + "@" + x.fit_area.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

module.exports = {
  intersectIncluded,
  validateEnvironments,
  validateFitAreas,
  validateRoles,
  lev,               // optional but handy
  bestFuzzyMatch,    // 👈 THIS is the one cdnaSelect.js needs
};
