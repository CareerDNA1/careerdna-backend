function parseEnvBool(value, fallback = false) {
  if (value == null || value === "") return fallback;
  return String(value).trim().toLowerCase() === "true";
}

function parseEnvNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

const CDNA_RUNTIME_CONFIG = Object.freeze({
  verbose: parseEnvBool(process.env.VERBOSE_LOGGING, false),
  logSummary: parseEnvBool(process.env.CDNA_LOG_SUMMARY, false),
  devNoLlm: parseEnvBool(process.env.CDNA_DEV_NO_LLM, false),
  maxLogItemsPerSection: parseEnvNumber(process.env.CDNA_MAX_LOG_ITEMS_PER_SECTION, 7),
  minProseSubdimScore: parseEnvNumber(process.env.CDNA_PROSE_SUBDIM_MIN_PCT, 60),
  careerWorldLimit: parseEnvNumber(process.env.CDNA_CAREER_WORLD_LIMIT, 5),
  schoolSubjectLimit: parseEnvNumber(process.env.CDNA_SCHOOL_SUBJECT_LIMIT, 10),
  roleLimit: parseEnvNumber(process.env.CDNA_ROLE_LIMIT, 8),
  environmentLimit: parseEnvNumber(process.env.CDNA_ENVIRONMENT_LIMIT, 6),
  strengthLimit: parseEnvNumber(process.env.CDNA_STRENGTH_LIMIT, 5),
  defaultMaxSpillovers: parseEnvNumber(process.env.CDNA_DEFAULT_MAX_SPILLOVERS, 1),
  profileOptions: Object.freeze({
    includeOptions: Object.freeze({
      minScore: parseEnvNumber(process.env.CDNA_INCLUDED_ARCHETYPE_MIN_SCORE, 60),
      minCount: parseEnvNumber(process.env.CDNA_INCLUDED_ARCHETYPE_MIN_COUNT_ROUTE, 1),
      maxCount: parseEnvNumber(process.env.CDNA_INCLUDED_ARCHETYPE_MAX_COUNT_ROUTE, 4),
      strictAboveMin: parseEnvBool(process.env.CDNA_INCLUDED_ARCHETYPE_STRICT_ABOVE_MIN, true),
    }),
    topSubdimLimit: parseEnvNumber(process.env.CDNA_ROUTE_TOP_SUBDIM_LIMIT, 9),
    topSubdimMinPct: parseEnvNumber(process.env.CDNA_ROUTE_TOP_SUBDIM_MIN_PCT, 60),
  }),
});

const MODEL_CHAIN = Array.from(
  new Set([process.env.OPENAI_MODEL, "gpt-4o-mini", "gpt-4o"].filter(Boolean))
);

const modelSupportsTemperature = (model) => !/^gpt-5($|[-_])/.test(model);

module.exports = {
  CDNA_RUNTIME_CONFIG,
  MODEL_CHAIN,
  modelSupportsTemperature,
  parseEnvBool,
  parseEnvNumber,
};
