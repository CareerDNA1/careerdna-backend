// scripts/cdna-diagnose.js
// Run: node scripts/cdna-diagnose.js
// What it does:
// - Scans your repo for core CDNA files and flags corruption (literal "..." tokens)
// - Checks archetypeWeights.json is present & non-empty
// - Looks for the data/cdna JSON banks (strengths, environments, fit_areas, roles, subjects)
// - Prints a concise pass/fail report with suggested next steps

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CANDIDATE_LIB_DIRS = [
  path.join(ROOT, "src", "lib"),
  path.join(ROOT, "lib"),
];

const SUSPECT_JS = [
  "cdnaPickSubdims.js",
  "cdnaLibrary.js",
  "cdnaSelect.js",
  "cdnaLookup.js",
  "cdnaProse.js",
  "cdnaDominance.js",
  "cdnaValidate.js",
];

const WEIGHTS_FILES = [
  path.join(ROOT, "src", "lib", "archetypeWeights.json"),
  path.join(ROOT, "lib", "archetypeWeights.json"),
];

const BANK_NAMES = ["strengths.json", "environments.json", "fit_areas.json", "roles.json", "subjects.json"];

function findFilesByName(baseDirs, names) {
  const found = [];
  for (const base of baseDirs) {
    if (!fs.existsSync(base)) continue;
    const stack = [base];
    while (stack.length) {
      const cur = stack.pop();
      const stat = fs.statSync(cur);
      if (stat.isDirectory()) {
        for (const f of fs.readdirSync(cur)) stack.push(path.join(cur, f));
      } else if (stat.isFile()) {
        if (names.includes(path.basename(cur))) found.push(cur);
      }
    }
  }
  return found;
}

function scanEllipses(file) {
  const txt = fs.readFileSync(file, "utf8");
  const lines = txt.split(/\r?\n/);
  const hits = [];
  lines.forEach((line, i) => {
    if (line.includes("...")) hits.push({ line: i + 1, preview: line.slice(0, 200) });
  });
  return hits;
}

function findBanks(root) {
  const found = {};
  for (const name of BANK_NAMES) found[name] = [];
  const stack = [root];
  while (stack.length) {
    const cur = stack.pop();
    let stat;
    try { stat = fs.statSync(cur); } catch { continue; }
    if (stat.isDirectory()) {
      for (const f of fs.readdirSync(cur)) stack.push(path.join(cur, f));
    } else if (stat.isFile()) {
      const base = path.basename(cur);
      if (BANK_NAMES.includes(base)) found[base].push(cur);
    }
  }
  return found;
}

function readJsonSafe(p) {
  try {
    const raw = fs.readFileSync(p, "utf8");
    if (!raw.trim()) return { ok: false, reason: "empty file" };
    const obj = JSON.parse(raw);
    return { ok: true, obj };
  } catch (e) {
    return { ok: false, reason: "parse error: " + e.message };
  }
}

(async function main() {
  console.log("🔎 CareerDNA Diagnose — starting\n");

  // 1) Scan suspect JS files for literal "..."
  const suspectFiles = findFilesByName(CANDIDATE_LIB_DIRS, SUSPECT_JS);
  if (suspectFiles.length === 0) {
    console.log("⚠️  No CDNA suspect files found under src/lib or lib. Check your repo paths.");
  } else {
    console.log("📁 Scanning CDNA JS files for corruption ('...'):");
    for (const f of suspectFiles) {
      const hits = scanEllipses(f);
      const rel = path.relative(ROOT, f);
      if (hits.length) {
        console.log(`  ❌ ${rel} — FOUND ${hits.length} '...' occurrences (first few lines):`);
        hits.slice(0, 5).forEach(h => console.log(`     • line ${h.line}: ${h.preview}`));
      } else {
        console.log(`  ✅ ${rel} — no '...' found`);
      }
    }
  }

  // 2) Check archetypeWeights.json presence & non-emptiness
  console.log("\n📁 Checking archetypeWeights.json:");
  let weightsStatus = 0; // 0 = none ok, 1 = warn, 2 = ok
  for (const wf of WEIGHTS_FILES) {
    if (!fs.existsSync(wf)) continue;
    const rel = path.relative(ROOT, wf);
    const stat = fs.statSync(wf);
    if (stat.size === 0) {
      console.log(`  ❌ ${rel} — file exists but is EMPTY`);
    } else {
      const parsed = readJsonSafe(wf);
      if (!parsed.ok) {
        console.log(`  ❌ ${rel} — ${parsed.reason}`);
      } else {
        console.log(`  ✅ ${rel} — JSON present (${Object.keys(parsed.obj).length} top-level keys)`);
        weightsStatus = 2;
      }
    }
    if (weightsStatus === 0) weightsStatus = 1;
  }
  if (weightsStatus === 0) {
    console.log("  ⚠️  No archetypeWeights.json found under src/lib or lib. You need at least one.");
  }

  // 3) Search for data/cdna banks (wherever they live)
  console.log("\n📁 Searching for data/cdna banks (strengths, environments, fit_areas, roles, subjects):");
  const banks = findBanks(ROOT);
  let missing = [];
  for (const name of BANK_NAMES) {
    const paths = banks[name];
    if (!paths || paths.length === 0) {
      console.log(`  ❌ ${name} — NOT FOUND anywhere in repo`);
      missing.push(name);
    } else {
      console.log(`  ✅ ${name} — found (${paths.map(p => path.relative(ROOT, p)).join(", ")})`);
      // light parse check:
      const first = readJsonSafe(paths[0]);
      if (!first.ok) {
        console.log(`     ↳ ⚠️  parse issue in ${path.relative(ROOT, paths[0])}: ${first.reason}`);
      }
    }
  }

  // 4) Summary & exit code
  console.log("\n===== SUMMARY =====");
  let fatal = false;

  // Fatal if any suspect JS contains '...' (it will crash imports or zero scoring)
  let anyCorrupt = false;
  for (const f of suspectFiles) {
    const hits = scanEllipses(f);
    if (hits.length) { anyCorrupt = true; break; }
  }
  if (anyCorrupt) {
    console.log("❌ Corrupted CDNA JS detected (literal '...' tokens). Replace those files first.");
    fatal = true;
  } else {
    console.log("✅ No obvious corruption in core CDNA JS files.");
  }

  // Warn/fail if weights missing/empty
  if (weightsStatus === 0) {
    console.log("❌ archetypeWeights.json missing. The inclusion logic will collapse (no archetypes included).");
    fatal = true;
  } else if (weightsStatus === 1) {
    console.log("⚠️  archetypeWeights.json exists but is empty/invalid — fix it.");
  } else {
    console.log("✅ archetypeWeights.json present with content.");
  }

  // Banks missing -> sections will be empty
  if (missing.length > 0) {
    console.log(`⚠️  Missing banks: ${missing.join(", ")}. Any missing bank → corresponding section can be blank.`);
  } else {
    console.log("✅ All banks are present in the repo (at least one copy each).");
  }

  console.log("\nNext steps:");
  if (anyCorrupt) {
    console.log("  1) Restore clean copies of: " + SUSPECT_JS.join(", "));
  }
  if (weightsStatus !== 2) {
    console.log("  2) Populate src/lib/archetypeWeights.json (or lib/archetypeWeights.json) with thresholds/weights.");
  }
  if (missing.length > 0) {
    console.log("  3) Ensure data/cdna/*.json banks exist at runtime and match expected schema.");
  }

  process.exit(fatal ? 1 : 0);
})();
