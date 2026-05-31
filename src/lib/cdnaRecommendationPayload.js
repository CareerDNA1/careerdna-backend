function roundMaybe(value, digits = 3) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Number(n.toFixed(digits));
}

function buildLookupKey(item = {}) {
  return String(item?.id || item?.title || "").toLowerCase();
}

function getItemEvidence(itemEvidence = {}, sectionKey = "", title = "") {
  const archetypes = itemEvidence?.itemArchetypes?.[sectionKey]?.[title] || [];
  const hints = itemEvidence?.itemSubdimHints?.[sectionKey]?.[title] || [];
  const context = itemEvidence?.itemSubdimContext?.[sectionKey]?.[title] || {};
  const pairs = itemEvidence?.itemSubdimPairs?.[sectionKey]?.[title] || {};

  return {
    archetypes,
    hints,
    context,
    pairs,
  };
}

function buildSectionItems(
  sectionKey,
  items = [],
  scoreMap = new Map(),
  itemEvidence = {},
  breakdownMap = new Map()
) {
  return (items || []).map((item, idx) => {
    const key = buildLookupKey(item);
    const scoreRow = scoreMap.get(key) || {};
    const meta = scoreRow?.meta || null;
    const evidence = getItemEvidence(itemEvidence, sectionKey, item?.title || "");
    const breakdown = breakdownMap.get(key) || null;

    return {
      rank: idx + 1,
      id: item?.id || null,
      title: item?.title || "",
      score: roundMaybe(scoreRow?.score || 0),
      archetypes: Array.isArray(item?.archetypes) ? item.archetypes : evidence.archetypes,
      hints: evidence.hints,
      matched_pair: evidence.pairs?.matched_pair || [],
      canonical_pair: evidence.pairs?.canonical_pair || [],
      designed_anchor_subdims: evidence.pairs?.designed_anchor_subdims || [],
      matched_user_subdims: evidence.pairs?.matched_user_subdims || [],
      supporting_user_subdims: evidence.pairs?.supporting_user_subdims || [],
      supporting_subdims: evidence.pairs?.supporting_subdims || [],
      item_core_subdims: evidence.context?.item_core_subdims || [],
      item_relevant_subdims: evidence.context?.item_relevant_subdims || [],
      meta,
      breakdown,
    };
  });
}



function buildRecommendationPayload({
  profile,
  recommendations,
  scoreMaps,
  itemEvidence,
  fixedLists,
  breakdownMaps,
}) {
  const careerWorlds = buildSectionItems(
    "career_worlds",
    recommendations?.topCareerWorlds,
    scoreMaps?.careerWorldScoreMap,
    itemEvidence,
    breakdownMaps?.careerWorldBreakdownMap
  );
  const careerWorldsAligned = buildSectionItems(
    "career_worlds",
    recommendations?.topCareerWorldsAligned,
    scoreMaps?.careerWorldScoreMap,
    itemEvidence,
    breakdownMaps?.careerWorldBreakdownMap
  );
  const careerWorldsOther = buildSectionItems(
    "career_worlds",
    recommendations?.topCareerWorldsOther,
    scoreMaps?.careerWorldScoreMap,
    itemEvidence,
    breakdownMaps?.careerWorldBreakdownMap
  );
  const strengths = buildSectionItems(
    "strengths",
    recommendations?.topStrengths,
    scoreMaps?.strengthScoreMap,
    itemEvidence,
    breakdownMaps?.strengthBreakdownMap
  );
  const environments = buildSectionItems(
    "environments",
    recommendations?.topEnvironments,
    scoreMaps?.environmentScoreMap,
    itemEvidence,
    breakdownMaps?.environmentBreakdownMap
  );
  const subjects = buildSectionItems(
    "subjects",
    recommendations?.topSubjects,
    scoreMaps?.subjectScoreMap,
    itemEvidence,
    breakdownMaps?.subjectBreakdownMap
  );
  const subjectsBestFit = buildSectionItems(
    "subjects",
    recommendations?.topSubjectsBestFit,
    scoreMaps?.subjectScoreMap,
    itemEvidence,
    breakdownMaps?.subjectBreakdownMap
  );
  const subjectsOther = buildSectionItems(
    "subjects",
    recommendations?.topSubjectsOther,
    scoreMaps?.subjectScoreMap,
    itemEvidence,
    breakdownMaps?.subjectBreakdownMap
  );
  const subjectsAligned = buildSectionItems(
    "subjects",
    recommendations?.topSubjectsAligned,
    scoreMaps?.subjectScoreMap,
    itemEvidence,
    breakdownMaps?.subjectBreakdownMap
  );
  const subjectsExploratory = buildSectionItems(
    "subjects",
    recommendations?.topSubjectsExploratory,
    scoreMaps?.subjectScoreMap,
    itemEvidence,
    breakdownMaps?.subjectBreakdownMap
  );
  const specialistSubjects = buildSectionItems(
    "subjects",
    recommendations?.topSpecialistSubjects,
    scoreMaps?.subjectScoreMap,
    itemEvidence,
    breakdownMaps?.subjectBreakdownMap
  );
  const pathways = buildSectionItems(
    "roles",
    recommendations?.topRoles,
    scoreMaps?.roleScoreMap,
    itemEvidence,
    breakdownMaps?.roleBreakdownMap
  );
  const pathwaysAligned = buildSectionItems(
    "roles",
    recommendations?.topRolesAligned,
    scoreMaps?.roleScoreMap,
    itemEvidence,
    breakdownMaps?.roleBreakdownMap
  );
  const pathwaysAdjacent = buildSectionItems(
    "roles",
    recommendations?.topRolesAdjacent,
    scoreMaps?.roleScoreMap,
    itemEvidence,
    breakdownMaps?.roleBreakdownMap
  );

  return {
    profile: {
      includedArchetypes: profile?.included || [],
      includedWeights: profile?.includedWeights || {},
      topSubdimProfile: profile?.topSubdimProfile || [],
    },
    profileMode: recommendations?.profileMode || null,
    matchedSubject: recommendations?.matchedSubject?.title || null,
    fixedLists: fixedLists || {},
    sections: {
      career_worlds: careerWorlds,
      careerWorlds,
      career_worlds_aligned: careerWorldsAligned,
      careerWorldsAligned,
      career_worlds_other: careerWorldsOther,
      careerWorldsOther,
      strengths,
      environments,
      subjects,
      subjects_best_fit: subjectsBestFit,
      subjectsBestFit,
      subjects_other: subjectsOther,
      subjectsOther,
      subjects_aligned: subjectsAligned,
      subjectsAligned,
      subjects_exploratory: subjectsExploratory,
      subjectsExploratory,
      specialist_subjects: specialistSubjects,
      specialistSubjects,
      pathways,
      pathways_aligned: pathwaysAligned,
      pathwaysAligned,
      pathways_adjacent: pathwaysAdjacent,
      pathwaysAdjacent,
    },
  };
}

module.exports = {
  buildRecommendationPayload,
};
