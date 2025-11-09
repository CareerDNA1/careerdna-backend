// src/lib/cdnaLineage.js
// Enforces lineage between strengths, environments, and roles.

const VERBOSE_LOGGING = process.env.VERBOSE_LOGGING === "true";

function attachRolesToTopFitAreas(roles, fitAreasRanked, minFitAreaScore = 0.45) {
  const topFA = new Set(
    (fitAreasRanked || [])
      .filter(x => (x.score ?? 0) >= minFitAreaScore)
      .map(x => x.item?.title || x.title)
  );
  return (roles || []).filter(r => r.fit_area && topFA.has(r.fit_area));
}

function filterEnvironmentsByStrengths(envsRanked, strengthsRanked, minShare = 0.3, includedArchetypes = []) {
  // Use includedArchetypes to ensure all relevant archetypes are considered
  const strengthArchetypes = new Set(includedArchetypes);
  if (VERBOSE_LOGGING) {
    console.log("Strength archetypes (from includedArchetypes):", [...strengthArchetypes]);
  }

  // Filter environments with at least one matching archetype
  const filteredEnvs = (envsRanked || [])
    .filter(env => {
      const envItem = env.item || env;
      const envArchetypes = Array.isArray(envItem.archetypes) ? envItem.archetypes : [];
      const hasOverlap = envArchetypes.some(a => strengthArchetypes.has(a));
      if (!hasOverlap && VERBOSE_LOGGING) {
        console.log(`Environment ${envItem.title || "unknown"} skipped: no archetype overlap`, envArchetypes);
      }
      return hasOverlap;
    })
    .slice(0, 10)
    .map(env => {
      const envItem = env.item || env;
      return {
        title: envItem.title || "Unknown Environment",
        subdims: Array.isArray(envItem.subdims) ? envItem.subdims : [],
        archetypes: Array.isArray(envItem.archetypes) ? envItem.archetypes : []
      };
    });

  if (VERBOSE_LOGGING) {
    console.log("Filtered environments:", JSON.stringify(filteredEnvs, null, 2));
  }
  return filteredEnvs.length ? filteredEnvs : envsRanked.slice(0, 10).map(env => {
    const envItem = env.item || env;
    return {
      title: envItem.title || "Unknown Environment",
      subdims: Array.isArray(envItem.subdims) ? envItem.subdims : [],
      archetypes: Array.isArray(envItem.archetypes) ? envItem.archetypes : []
    };
  });
}

module.exports = { attachRolesToTopFitAreas, filterEnvironmentsByStrengths };