// scripts/cdna-sanitize.js
// Run: node scripts/cdna-sanitize.js
//
// What it does:
// - Finds core CDNA lib files in src/lib and lib
// - Creates a .bak backup for each
// - Replaces literal "..." occurrences (corruption artifacts) with nothing
// - Prints counts so you know exactly what changed

const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const CANDIDATE_DIRS = [path.join(ROOT, "src", "lib"), path.join(ROOT, "lib")];
const TARGET_FILES = [
  "cdnaPickSubdims.js",
  "cdnaLibrary.js",
  "cdnaSelect.js",
  "cdnaLookup.js",
  "cdnaProse.js",
  "cdnaDominance.js",
  "cdnaValidate.js",
];

function findTargets() {
  const found = [];
  for (const base of CANDIDATE_DIRS) {
    if (!fs.existsSync(base)) continue;
    for (const name of TARGET_FILES) {
      const p = path.join(base, name);
      if (fs.existsSync(p)) found.push(p);
    }
  }
  return found;
}

function sanitizeFile(file) {
  const orig = fs.readFileSync(file, "utf8");
  const matches = orig.match(/\.\.\./g);
  const count = matches ? matches.length : 0;
  if (count === 0) return { changed: false, count: 0 };

  // backup
  const bak = file + ".bak";
  if (!fs.existsSync(bak)) fs.writeFileSync(bak, orig, "utf8");

  // remove literal ellipses
  const cleaned = orig.replace(/\.\.\./g, "");
  fs.writeFileSync(file, cleaned, "utf8");
  return { changed: true, count };
}

(function main() {
  console.log("🧹 CDNA sanitizer running…\n");
  const targets = findTargets();
  if (!targets.length) {
    console.log("⚠️  No target files found in src/lib or lib. Nothing to do.");
    process.exit(0);
  }

  let total = 0;
  for (const f of targets) {
    const { changed, count } = sanitizeFile(f);
    const rel = path.relative(ROOT, f);
    if (changed) {
      console.log(`  ✅ ${rel} — removed ${count} occurrence(s) of "..." (backup: ${path.basename(f)}.bak)`);
      total += count;
    } else {
      console.log(`  ⭘  ${rel} — clean (no "...")`);
    }
  }

  console.log(`\nDone. Total removals: ${total}`);
  console.log("Next: restart your backend, or run the diagnose script again to re-check.");
})();
