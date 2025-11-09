// src/lib/cdnaLookup.js

function normTitle(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s/&()+-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Build fast lookup indexes over the static CDNA library.
 * Expected CDNA_LIB shape:
 * - environments: [{ title, ... }]
 * - fit_areas: [ "Finance, Economics & FinTech", ... ]
 * - subjects: [{ parent: "Engineering", subareas: ["Civil Engineering", ...] }]
 * - roles: [{ fit_area, classic: [{ title, ... }], emerging: [{ title, ... }] }]
 */
function buildIndexes(CDNA_LIB = {}) {
  // Environments
  const envByTitle = new Map();
  for (const e of CDNA_LIB.environments || []) {
    if (!e || !e.title) continue;
    envByTitle.set(normTitle(e.title), e);
  }

  // Fit Areas
  const fitAreasSet = new Set(CDNA_LIB.fit_areas || []);

  // Subjects
  const subjectParents = new Set();
  const subjectSubareas = new Map(); // parent -> Set(subareas)
  for (const row of CDNA_LIB.subjects || []) {
    if (!row) continue;
    const parent = String(row.parent || "").trim();
    if (!parent) continue;
    subjectParents.add(parent);
    const set = subjectSubareas.get(parent) || new Set();
    for (const s of row.subareas || []) set.add(s);
    subjectSubareas.set(parent, set);
  }

  // Roles — build both a by-title map and a by-fit-area grouping
  const roleByTitle = new Map();
  const rolesByFitArea = new Map();
  for (const group of CDNA_LIB.roles || []) {
    if (!group) continue;
    const fa = String(group.fit_area || "").trim();
    if (!fa) continue;

    const classic = Array.isArray(group.classic) ? group.classic : [];
    const emerging = Array.isArray(group.emerging) ? group.emerging : [];
    rolesByFitArea.set(fa, { classic, emerging });

    for (const r of classic) {
      if (!r || !r.title) continue;
      roleByTitle.set(normTitle(r.title), { ...r, fit_area: fa, title: r.title });
    }
    for (const r of emerging) {
      if (!r || !r.title) continue;
      roleByTitle.set(normTitle(r.title), { ...r, fit_area: fa, title: r.title });
    }
  }

  return Object.freeze({
    normTitle,
    envByTitle,
    fitAreasSet,
    subjectParents,
    subjectSubareas,
    roleByTitle,
    rolesByFitArea,
  });
}

module.exports = { buildIndexes, normTitle };
