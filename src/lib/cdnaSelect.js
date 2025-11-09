// src/lib/cdnaSelect.js
//
// Pure archetype-based selectors.
// Now with penalties for low user archetypes AND console logs for those penalties.
// UPDATED: ensure each included archetype appears at least once per category.

const { bestFuzzyMatch } = require("./cdnaValidate");

// ---------- CORE SCORING ----------

function scoreItemByArchetypeOrder(
  item,
  userArchetypesArr = [],
  userArchetypePerc = {},
  fullArchetypes = [] // [{ name, score }]
) {
  const tags = Array.isArray(item?.archetypes) ? item.archetypes : [];
  const title = item?.title || "(untitled)";
  if (!tags.length) return 0;

  const A1 = userArchetypesArr[0];
  const A2 = userArchetypesArr[1];
  const A3 = userArchetypesArr[2];

  const p1 = A1 ? (userArchetypePerc[A1] ?? 1) : 0;
  const p2 = A2 ? (userArchetypePerc[A2] ?? 1) : 0;
  const p3 = A3 ? (userArchetypePerc[A3] ?? 1) : 0;

  let score = 0;
  let matchedCount = 0;

  // ===== POSITIVE PART =====
  if (A1) {
    if (tags[0] === A1) {
      score += 3 * p1;
      matchedCount++;
    } else if (tags.includes(A1)) {
      score += 2 * p1;
      matchedCount++;
    }
  }

  if (A2) {
    if (tags[0] === A2) {
      score += 2 * p2;
      matchedCount++;
    } else if (tags.includes(A2)) {
      score += 1 * p2;
      matchedCount++;
    }
  }

  if (A3) {
    if (tags[0] === A3) {
      score += 1.5 * p3;
      matchedCount++;
    } else if (tags.includes(A3)) {
      score += 0.7 * p3;
      matchedCount++;
    }
  }

  if (matchedCount === 3) score += 0.75;
  else if (matchedCount === 2) score += 0.4;
  else if (matchedCount === 1) score += 0.1;

  // ===== NEGATIVE PART + LOGGING =====
  if (Array.isArray(fullArchetypes) && fullArchetypes.length) {
    const baseBeforePenalties = score;
    const userPctByName = {};
    for (const a of fullArchetypes) {
      const pct = typeof a.score === "number" ? a.score : Number(a.score) || 0;
      userPctByName[a.name] = pct;
    }

    const posWeights = [1.0, 0.6, 0.4];
    let anyPenalty = false;
    let totalPenalty = 0;

    tags.forEach((tag, idx) => {
      const userPct = userPctByName[tag];
      if (userPct == null) return;

      let basePenalty = 0;
      let severity = "";

      if (userPct < 50) {
        basePenalty = 1.2;
        severity = "weak<50";
      } else if (userPct < 60) {
        basePenalty = 0.8;            // you already reduced this
        severity = "mid50s";
      } else {
        return; // no penalty
      }

      const posWeight = posWeights[idx] ?? 0.4;
      let finalPenalty = basePenalty * posWeight;

      totalPenalty += finalPenalty;
      score -= finalPenalty;
      anyPenalty = true;

      console.log(
        `[cdnaSelect] penalty -> item="${title}" tag="${tag}" userPct=${userPct} severity=${severity} pos=${idx} penalty=${finalPenalty.toFixed(
          3
        )}`
      );
    });

    const MAX_PENALTY = 1.2;
    if (totalPenalty > MAX_PENALTY) {
      const diff = totalPenalty - MAX_PENALTY;
      score += diff;
      totalPenalty = MAX_PENALTY;
    }

    if (anyPenalty) {
      console.log(
        `[cdnaSelect] item="${title}" base=${baseBeforePenalties.toFixed(
          3
        )} penaltyTotal=${totalPenalty.toFixed(3)} final=${score.toFixed(3)}`
      );
    }
  }

  return score;
}

// deterministic tie-breaker
function sortByScoreDesc(itemsWithScores) {
  return itemsWithScores.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;

    const aTags = Array.isArray(a.item.archetypes) ? a.item.archetypes.length : 999;
    const bTags = Array.isArray(b.item.archetypes) ? b.item.archetypes.length : 999;
    if (aTags !== bTags) return aTags - bTags;

    const ta = String(a.item.title || "").toLowerCase();
    const tb = String(b.item.title || "").toLowerCase();
    return ta.localeCompare(tb);
  });
}

// ---------- COVERAGE HELPER (NEW) ----------
//
// ensures each included archetype appears at least once
// picked: [item, ...]
// scored: [{ item, score }, ...]  (full list)
// includedArchetypes: ['Connector','Explorer','Organizer']
// limit: how many we ultimately want in this category
function ensureArchetypeCoverage(picked, scored, includedArchetypes = [], limit) {
  const result = [...picked];

  for (const arch of includedArchetypes) {
    const hasOne = result.some(
      (it) => Array.isArray(it.archetypes) && it.archetypes.includes(arch)
    );

    if (!hasOne) {
      // find best candidate for this archetype from scored list
      const candidate = scored
        .filter(
          (s) =>
            Array.isArray(s.item.archetypes) &&
            s.item.archetypes.includes(arch) &&
            !result.find((r) => r.title === s.item.title)
        )
        .sort((a, b) => b.score - a.score)[0];

      if (candidate) {
        // replace the lowest-scoring current item
        // to know which is lowest, we need scores for current items too
        // so temporarily pair them with scores
        const currentWithScores = result.map((it) => {
          // look up its score from scored[]
          const found = scored.find((s) => s.item.title === it.title);
          return { item: it, score: found ? found.score : 0 };
        });

        currentWithScores.sort((a, b) => a.score - b.score);
        currentWithScores[0] = { item: candidate.item, score: candidate.score };

        // unwrap back to just items
        const unwrapped = currentWithScores.map((x) => x.item);
        // update result
        for (let i = 0; i < result.length; i++) {
          result[i] = unwrapped[i];
        }
      }
    }
  }

  // final trim / order not strictly required, but let's keep as original order
  return result.slice(0, limit);
}

// ---------- SUBJECT MATCHING ----------

function matchUserSubjectsToLibSubjects(userSubjects = [], libSubjects = []) {
  const titles = libSubjects.map((s) => s.title.toLowerCase());
  const matched = [];
  for (const us of userSubjects) {
    const norm = String(us || "").toLowerCase().trim();
    if (!norm) continue;
    const best = bestFuzzyMatch(norm, titles, (x) => x);
    if (best) {
      const subjObj = libSubjects.find((s) => s.title.toLowerCase() === best);
      if (subjObj) matched.push(subjObj);
    }
  }
  return matched;
}

function filterItemsBySubjectArchetypes(items, subjectObjs) {
  if (!subjectObjs.length) return [];
  const subjArcs = new Set();
  for (const s of subjectObjs) {
    (s.archetypes || []).forEach((a) => subjArcs.add(a));
  }
  return items.filter((it) => (it.archetypes || []).some((a) => subjArcs.has(a)));
}

function dedupeByTitle(items) {
  const seen = new Set();
  const out = [];
  for (const it of items) {
    const t = it.title;
    if (!seen.has(t)) {
      seen.add(t);
      out.push(it);
    }
  }
  return out;
}

// ---------- SELECTORS ----------

function selectStrengths(strengths = [], ctx = {}, limit = 5) {
  const { includedArchetypes = [], includedWeights = {}, fullArchetypes = [] } = ctx;
  const scored = strengths.map((st) => ({
    item: st,
    score: scoreItemByArchetypeOrder(st, includedArchetypes, includedWeights, fullArchetypes),
  }));
  const sorted = sortByScoreDesc(scored);
  const top = sorted.slice(0, limit).map((x) => x.item);

  // NEW: guarantee coverage for A1/A2/A3
  return ensureArchetypeCoverage(top, scored, includedArchetypes, limit);
}

function selectEnvironments(environments = [], ctx = {}, limit = 7) {
  const { includedArchetypes = [], includedWeights = {}, fullArchetypes = [] } = ctx;
  const scored = environments.map((env) => ({
    item: env,
    score: scoreItemByArchetypeOrder(env, includedArchetypes, includedWeights, fullArchetypes),
  }));
  const sorted = sortByScoreDesc(scored);
  const top = sorted.slice(0, limit).map((x) => x.item);

  return ensureArchetypeCoverage(top, scored, includedArchetypes, limit);
}

function selectFitAreas(
  fitAreas = [],
  ctx = {},
  {
    userSubjects = [],
    libSubjects = [],
    total = 7,
    subjectSlots = 3,
  } = {}
) {
  const { includedArchetypes = [], includedWeights = {}, fullArchetypes = [] } = ctx;

  const scored = fitAreas.map((fa) => ({
    item: fa,
    score: scoreItemByArchetypeOrder(fa, includedArchetypes, includedWeights, fullArchetypes),
  }));

  let sortedGlobal = sortByScoreDesc(scored).map((x) => x.item);

  // subject-aware part (keep your existing behaviour)
  const matchedSubjects = matchUserSubjectsToLibSubjects(userSubjects, libSubjects);
  let subjectRelated = [];
  if (matchedSubjects.length) {
    const fromGlobal = filterItemsBySubjectArchetypes(sortedGlobal, matchedSubjects);
    subjectRelated = fromGlobal.slice(0, subjectSlots);
  }

  const taken = new Set(subjectRelated.map((x) => x.title));
  const remainder = [];
  for (const it of sortedGlobal) {
    if (subjectRelated.length + remainder.length >= total) break;
    if (taken.has(it.title)) continue;
    remainder.push(it);
  }

  let picked = dedupeByTitle([...subjectRelated, ...remainder]).slice(0, total);

  // coverage pass
  picked = ensureArchetypeCoverage(picked, scored, includedArchetypes, total);

  return picked;
}

function selectSubjects(
  allSubjects = [],
  ctx = {},
  {
    userSubjects = [],
    total = 7,
    subjectSlots = 3,
  } = {}
) {
  const { includedArchetypes = [], includedWeights = {}, fullArchetypes = [] } = ctx;

  const scored = allSubjects.map((subj) => ({
    item: subj,
    score: scoreItemByArchetypeOrder(subj, includedArchetypes, includedWeights, fullArchetypes),
  }));
  const sortedGlobal = sortByScoreDesc(scored).map((x) => x.item);

  const matchedSubjects = matchUserSubjectsToLibSubjects(userSubjects, allSubjects);
  let subjectFirst = [];
  if (matchedSubjects.length) {
    subjectFirst = matchedSubjects.slice(0, subjectSlots);
  }

  const taken = new Set(subjectFirst.map((x) => x.title));
  const remainder = [];
  for (const it of sortedGlobal) {
    if (subjectFirst.length + remainder.length >= total) break;
    if (taken.has(it.title)) continue;
    remainder.push(it);
  }

  let picked = dedupeByTitle([...subjectFirst, ...remainder]).slice(0, total);

  // coverage pass
  picked = ensureArchetypeCoverage(picked, scored, includedArchetypes, total);

  return picked;
}

// roles / generic bank
function rankBank(list = [], ctx = {}, limit = 5) {
  const { includedArchetypes = [], includedWeights = {}, fullArchetypes = [] } = ctx;
  const scored = list.map((r) => ({
    item: r,
    score: scoreItemByArchetypeOrder(r, includedArchetypes, includedWeights, fullArchetypes),
  }));
  const sorted = sortByScoreDesc(scored);
  const top = sorted.slice(0, limit).map((x) => x.item);

  return ensureArchetypeCoverage(top, scored, includedArchetypes, limit);
}

module.exports = {
  selectStrengths,
  selectEnvironments,
  selectFitAreas,
  selectSubjects,
  rankBank,
  scoreItemByArchetypeOrder,
};
