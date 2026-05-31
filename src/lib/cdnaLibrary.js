// src/lib/cdnaLibrary.js
// CareerDNA data loader for the revised world-based architecture.

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "..", "data", "cdna");

function safeReadJson(fileName, fallback = []) {
  const full = path.join(DATA_DIR, fileName);
  try {
    const raw = fs.readFileSync(full, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[cdnaLibrary] error loading ${fileName}: ${err.message}`);
    return fallback;
  }
}

function safeReadFirstJson(candidates = [], fallback = []) {
  for (const fileName of candidates) {
    const full = path.join(DATA_DIR, fileName);
    if (!fs.existsSync(full)) continue;
    try {
      const raw = fs.readFileSync(full, "utf8");
      return JSON.parse(raw);
    } catch (err) {
      console.warn(`[cdnaLibrary] error loading ${fileName}: ${err.message}`);
    }
  }
  console.warn(`[cdnaLibrary] no candidate found from: ${candidates.join(", ")}`);
  return fallback;
}

function flattenSubjects(subjectSource = []) {
  if (!Array.isArray(subjectSource) || !subjectSource.length) return [];

  // Already flat
  if (!subjectSource[0]?.subjects) {
    return subjectSource
      .filter((x) => x && x.title)
      .map((x) => ({ ...x }));
  }

  const flat = [];
  for (const world of subjectSource) {
    const careerWorldId = world.careerWorldId || world.id || "";
    const careerWorldTitle = world.careerWorldTitle || world.title || "";
    const careerWorldArchetypes = Array.isArray(world.archetypes) ? world.archetypes : [];
    const subjects = Array.isArray(world.subjects) ? world.subjects : [];

    for (const subj of subjects) {
      if (!subj || !subj.title) continue;
      flat.push({
        ...subj,
        careerWorldId,
        careerWorldTitle,
        careerWorldArchetypes,
      });
    }
  }
  return flat;
}

function flattenRoles(roleWorlds = []) {
  if (!Array.isArray(roleWorlds) || !roleWorlds.length) return [];

  // Already flat
  if (!roleWorlds[0]?.roleFamilies) {
    return roleWorlds
      .filter((x) => x && x.title)
      .map((x) => ({ ...x }));
  }

  const flat = [];
  for (const world of roleWorlds) {
    const careerWorldId = world.careerWorldId || world.id || "";
    const careerWorldTitle = world.careerWorldTitle || world.title || "";
    const careerWorldArchetypes = Array.isArray(world.careerWorldArchetypes)
      ? world.careerWorldArchetypes
      : Array.isArray(world.archetypes)
      ? world.archetypes
      : [];

    for (const family of world.roleFamilies || []) {
      const familyId = family.id || "";
      const familyTitle = family.familyTitle || family.title || "";
      const familyArchetypes = Array.isArray(family.familyArchetypes) ? family.familyArchetypes : [];
      const familyKeySubdimensions = Array.isArray(family.keySubdimensions)
        ? family.keySubdimensions
        : [];
      const whyBelongs = family.whyBelongs || "";
      const confidence = family.confidence || "";
      const sourceUrls = Array.isArray(family.sourceUrls) ? family.sourceUrls : [];

      for (const role of family.roles || []) {
        if (!role || !role.title) continue;
        flat.push({
          ...role,
          careerWorldId,
          careerWorldTitle,
          careerWorldArchetypes,
          roleFamilyId: familyId,
          roleFamilyTitle: familyTitle,
          roleFamilyArchetypes: familyArchetypes,
          roleFamilyKeySubdimensions: familyKeySubdimensions,
          whyBelongs,
          confidence,
          sourceUrls,
        });
      }
    }
  }
  return flat;
}

function loadCdnaLibrary() {
  const career_worlds = safeReadFirstJson([
    "career_worlds.json",
    "career_worlds_revised.json",
    "career_worlds_corrected.json",
  ]);

  const strengths = safeReadFirstJson([
    "strengths2.json",
    "strengths_revised.json",
    "strengths.json",
  ]);

  const environments = safeReadFirstJson([
    "environments2.json",
    "environments_revised.json",
    "environments.json",
  ]);

  const subjectsGrouped = safeReadFirstJson([
    "subjects1.json",
    "career_worlds_to_ucas_subjects_grouped_evidence.json",
    "career_worlds_to_ucas_subjects_grouped.json",
    "subjects.json",
  ]);

  const rolesByWorld = safeReadFirstJson([
    "Roles2.json",
    "roles2.json",
    "role_families_and_roles_by_career_world.json",
    "roles.json",
  ]);

  const subjects = flattenSubjects(subjectsGrouped);
  const rolesFlat = flattenRoles(rolesByWorld);

  const universityPathwayMatrixRaw = safeReadFirstJson([
    "university_pathway_matrix_v1.json",
    "university_pathway_matrix.json",
  ], { subjects: [] });

  const universityPathwayMatrix = Array.isArray(universityPathwayMatrixRaw?.subjects)
    ? universityPathwayMatrixRaw.subjects
    : Array.isArray(universityPathwayMatrixRaw)
    ? universityPathwayMatrixRaw
    : [];

  return {
    career_worlds,
    strengths,
    environments,
    subjectsGrouped,
    subjects,
    rolesByWorld,
    rolesFlat,
    universityPathwayMatrixRaw,
    universityPathwayMatrix,
  };
}

module.exports = {
  DATA_DIR,
  loadCdnaLibrary,
  flattenSubjects,
  flattenRoles,
  safeReadJson,
  safeReadFirstJson,
};
