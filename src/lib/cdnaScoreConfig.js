function parseEnvNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

const CDNA_SCORE_CONFIG = Object.freeze({
  profileNormalization: Object.freeze({
    minPct: parseEnvNumber(process.env.CDNA_PROFILE_NORMALIZE_MIN_PCT, 46),
    rangePct: parseEnvNumber(process.env.CDNA_PROFILE_NORMALIZE_RANGE_PCT, 54),
  }),

  archetype: Object.freeze({
    positionWeights: Object.freeze([
      parseEnvNumber(process.env.CDNA_ARCH_POS_W1, 0.55),
      parseEnvNumber(process.env.CDNA_ARCH_POS_W2, 0.45),
      parseEnvNumber(process.env.CDNA_ARCH_POS_W3, 0.35),
      parseEnvNumber(process.env.CDNA_ARCH_POS_W4, 0.22),
      parseEnvNumber(process.env.CDNA_ARCH_POS_W5, 0.12),
    ]),
    fallbackPositionWeight: parseEnvNumber(process.env.CDNA_ARCH_FALLBACK_POS_WEIGHT, 0.08),
    secondaryTagMultiplier: parseEnvNumber(process.env.CDNA_ARCH_SECONDARY_TAG_MULTIPLIER, 0.74),
    minPctFloor: parseEnvNumber(process.env.CDNA_ARCH_MIN_PCT_FLOOR, 0.18),
    matchedCountBonusOne: parseEnvNumber(process.env.CDNA_ARCH_MATCHED_COUNT_BONUS_ONE, 0.015),
    matchedCountBonusTwo: parseEnvNumber(process.env.CDNA_ARCH_MATCHED_COUNT_BONUS_TWO, 0.04),
    matchedCountBonusThreePlus: parseEnvNumber(process.env.CDNA_ARCH_MATCHED_COUNT_BONUS_THREE_PLUS, 0.08),
    primaryPenaltyLowThreshold: parseEnvNumber(process.env.CDNA_ARCH_PRIMARY_PENALTY_LOW_THRESHOLD, 42),
    primaryPenaltyMidThreshold: parseEnvNumber(process.env.CDNA_ARCH_PRIMARY_PENALTY_MID_THRESHOLD, 52),
    primaryPenaltyLow: parseEnvNumber(process.env.CDNA_ARCH_PRIMARY_PENALTY_LOW, 0.08),
    primaryPenaltyMid: parseEnvNumber(process.env.CDNA_ARCH_PRIMARY_PENALTY_MID, 0.035),
  }),

  subdimension: Object.freeze({
    tierWeights: Object.freeze({
      core: parseEnvNumber(process.env.CDNA_SUBDIM_TIER_CORE_WEIGHT, 1.0),
      secondary: parseEnvNumber(process.env.CDNA_SUBDIM_TIER_SECONDARY_WEIGHT, 0.60),
    }),
    fallbackWeights: Object.freeze([
      parseEnvNumber(process.env.CDNA_SUBDIM_FALLBACK_W1, 1.0),
      parseEnvNumber(process.env.CDNA_SUBDIM_FALLBACK_W2, 0.78),
      parseEnvNumber(process.env.CDNA_SUBDIM_FALLBACK_W3, 0.58),
      parseEnvNumber(process.env.CDNA_SUBDIM_FALLBACK_W4, 0.42),
      parseEnvNumber(process.env.CDNA_SUBDIM_FALLBACK_W5, 0.3),
      parseEnvNumber(process.env.CDNA_SUBDIM_FALLBACK_W6, 0.2),
      parseEnvNumber(process.env.CDNA_SUBDIM_FALLBACK_W7, 0.16),
    ]),
    coreMatchThresholdPct: parseEnvNumber(process.env.CDNA_SUBDIM_CORE_MATCH_THRESHOLD_PCT, 60),
    strongBoostHighThresholdPct: parseEnvNumber(process.env.CDNA_SUBDIM_STRONG_BOOST_HIGH_THRESHOLD_PCT, 82),
    strongBoostMidThresholdPct: parseEnvNumber(process.env.CDNA_SUBDIM_STRONG_BOOST_MID_THRESHOLD_PCT, 72),
    strongBoostHigh: parseEnvNumber(process.env.CDNA_SUBDIM_STRONG_BOOST_HIGH, 0.02),
    strongBoostMid: parseEnvNumber(process.env.CDNA_SUBDIM_STRONG_BOOST_MID, 0.01),
    coverageGateBase: parseEnvNumber(process.env.CDNA_SUBDIM_COVERAGE_GATE_BASE, 0.2),
    coverageGateWeight: parseEnvNumber(process.env.CDNA_SUBDIM_COVERAGE_GATE_WEIGHT, 0.8),
    combinedCoverageCoreWeight: parseEnvNumber(process.env.CDNA_SUBDIM_COMBINED_COVERAGE_CORE_WEIGHT, 0.70),
    combinedCoverageAnyWeight: parseEnvNumber(process.env.CDNA_SUBDIM_COMBINED_COVERAGE_ANY_WEIGHT, 0.30),
    totalScoreScale: parseEnvNumber(process.env.CDNA_SUBDIM_TOTAL_SCORE_SCALE, 3.2),
  }),

  total: Object.freeze({
    archetypeContributionWeight: parseEnvNumber(process.env.CDNA_TOTAL_ARCHETYPE_CONTRIBUTION_WEIGHT, 0.20),
  }),
});

module.exports = {
  CDNA_SCORE_CONFIG,
  parseEnvNumber,
};
