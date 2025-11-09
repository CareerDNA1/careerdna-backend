// src/lib/cdnaDominance.js

function clamp(min, max, v) {
  return Math.min(max, Math.max(min, v));
}

/**
 * Numeric dominance boost based on top included weight.
 * Example: domBoost = clamp(0, 0.35, 1.2 * (topWeight - 0.5))
 */
function numericDominanceBoost(included) {
  if (!Array.isArray(included) || !included.length) return 0;
  const topW = included[0]?.weight ?? 0;
  return clamp(0, 0.35, 1.2 * (topW - 0.5));
}

module.exports = { numericDominanceBoost, clamp };
