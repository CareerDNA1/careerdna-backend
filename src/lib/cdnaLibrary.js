// src/lib/cdnaLibrary.js
// clean loader that reads from /data/cdna/*.json (project root), no subdim_matrix

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "..", "data", "cdna");

function safeReadJson(fileName, fallback = []) {
  const full = path.join(DATA_DIR, fileName);
  try {
    const raw = fs.readFileSync(full, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    // log once but don't crash
    console.warn(`[cdnaLibrary] error loading ${fileName}: ${err.message}`);
    return fallback;
  }
}

function loadCdnaLibrary() {
  const strengths = safeReadJson("strengths.json", []);
  const environments = safeReadJson("environments.json", []);
  const fit_areas = safeReadJson("fit_areas.json", []);
  const subjects = safeReadJson("subjects.json", []);
  const roles = safeReadJson("roles.json", []);

  return {
    strengths,
    environments,
    fit_areas,
    subjects,
    roles,
  };
}

module.exports = { loadCdnaLibrary };
