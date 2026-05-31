#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const { loadCdnaLibrary } = require('../src/lib/cdnaLibrary');
const {
  selectStrengths,
  selectCareerWorlds,
  selectEnvironmentsForWorlds,
  selectSubjectsForCareerWorlds,
  selectRolesForSubject,
  findBestMatchingSubject,
} = require('../src/lib/cdnaSelect');
const { initPickSubdims, pickIncludedArchetypes } = require('../src/lib/cdnaPickSubdims');

function ensureArray(v) {
  return Array.isArray(v) ? v : [];
}

function canonSubdimName(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/\s*&\s*/g, ' & ')
    .replace(/\s*\/\s*/g, '/')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeScoreToPct(v) {
  const n = Number.parseFloat(v);
  if (!Number.isFinite(n)) return 0;
  return n <= 1 ? n * 100 : n;
}

function buildTopSubdimProfile(userSubdimMap, limit = 8) {
  return Array.from(userSubdimMap.entries())
    .map(([name, score]) => ({ name, score }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function sortArchetypes(archetypes = {}) {
  return Object.entries(archetypes)
    .map(([name, score]) => ({ name, score: Number(score) || 0 }))
    .sort((a, b) => b.score - a.score);
}

function inferSubjectFamily(item) {
  const explicit = item?.subjectFamily || item?.family || item?.subject_family;
  if (explicit) return String(explicit);

  const title = String(item?.title || '').toLowerCase();
  if (/education|teaching|coaching/.test(title)) return 'teaching_development';
  if (/counselling|psychotherapy|occupational therapy|health|medicine|nursing|midwifery|physio|pharmacy|radiography|paramedic|dentistry|optometry|veterinary/.test(title)) return 'helping_care';
  if (/psychology|social work|youth studies/.test(title)) return 'people_support';
  if (/architecture|planning|building|construction|product design|graphic design|fashion|textiles|jewellery/.test(title)) return 'design_spatial';
  if (/english language|languages|journalism|communications|pr|media studies|film studies/.test(title)) return 'communication_language';
  if (/art|music|dance|drama|photography|creative writing|games|animation|digital media/.test(title)) return 'creative_expression';
  if (/business|marketing|finance|economics|accounting|hospitality|events|tourism/.test(title)) return 'business_commercial';
  if (/computer science|software|engineering|mathematics|statistics|physics|chemistry|biology|biomedical|forensic|zoology|materials science/.test(title)) return 'technical_quantitative';
  if (/law|politics|criminology|policing|sociology|anthropology|archaeology|classics|history|philosophy|religion|geography|environmental/.test(title)) return 'society_policy_humanities';
  return 'general_other';
}

function inferSubjectCluster(item) {
  const explicit = item?.subjectCluster || item?.cluster || item?.subject_cluster;
  if (explicit) return String(explicit);

  const title = String(item?.title || '').toLowerCase();
  if (/education|teaching/.test(title)) return 'education';
  if (/counselling|psychotherapy|occupational therapy/.test(title)) return 'therapy_support';
  if (/health|medicine|nursing|midwifery|pharmacy|physio|optometry|radiography|paramedic|dentistry|veterinary/.test(title)) return 'clinical_health';
  if (/architecture|planning|building|construction/.test(title)) return 'architecture_built_environment';
  if (/english language|languages|journalism|communications|pr/.test(title)) return 'language_communication';
  if (/media studies|film studies|digital media/.test(title)) return 'media_communication';
  if (/art|music|dance|drama|photography|creative writing|games|animation/.test(title)) return 'creative_arts';
  if (/business|marketing|finance|economics|accounting/.test(title)) return 'business_commerce';
  if (/computer science|software/.test(title)) return 'computing';
  if (/engineering|mathematics|statistics|physics|chemistry|biology|biomedical|forensic|zoology/.test(title)) return 'stem_science_engineering';
  if (/psychology/.test(title)) return 'psychology';
  if (/social work|youth studies/.test(title)) return 'social_support';
  if (/law|politics|criminology|policing|sociology|anthropology|archaeology|classics|history|philosophy|religion|geography|environmental/.test(title)) return 'society_policy_humanities';
  return inferSubjectFamily(item);
}

function uniq(arr) {
  return Array.from(new Set(arr));
}

function coverageCount(items, includedArchetypes) {
  const set = new Set();
  for (const item of ensureArray(items)) {
    for (const tag of ensureArray(item?.archetypes)) {
      if (includedArchetypes.includes(tag)) set.add(tag);
    }
  }
  return set.size;
}

function countBy(items, keyFn) {
  const map = new Map();
  for (const item of ensureArray(items)) {
    const key = keyFn(item);
    if (!key) continue;
    map.set(key, (map.get(key) || 0) + 1);
  }
  return map;
}

function pushCheck(checks, name, pass, severity, details, meta = {}) {
  checks.push({ name, pass: !!pass, severity: pass ? 'pass' : severity, details, ...meta });
}

function summariseChecks(checks) {
  if (checks.some((c) => !c.pass && c.severity === 'fail')) return 'FAIL';
  if (checks.some((c) => !c.pass && c.severity === 'warn')) return 'WARN';
  return 'PASS';
}

function evaluateSchoolCase(result, benchCase) {
  const checks = [];
  const subjects = result.subjects || [];
  const main = subjects.slice(0, 3);
  const other = subjects.slice(3);
  const titles = subjects.map((x) => x.title);
  const families = subjects.map(inferSubjectFamily);
  const clusters = subjects.map(inferSubjectCluster);
  const familyCounts = countBy(subjects, inferSubjectFamily);
  const coverage = coverageCount(subjects, result.included);
  const defaultMinFamilies = benchCase.expectations?.minDistinctSubjectFamilies ?? 4;
  const defaultMinClusters = benchCase.expectations?.minDistinctSubjectClusters ?? 4;

  pushCheck(checks, 'exact_subject_count', subjects.length === 5, 'fail', `Found ${subjects.length} subjects; expected 5.`);
  pushCheck(checks, 'exact_main_count', main.length === 3, 'fail', `Found ${main.length} main suggestions; expected 3.`);
  pushCheck(checks, 'exact_other_count', other.length === 2, 'fail', `Found ${other.length} other options; expected 2.`);
  pushCheck(checks, 'no_duplicate_titles', uniq(titles).length === titles.length, 'fail', 'Duplicate subject titles detected.');
  pushCheck(checks, 'subject_family_diversity', uniq(families).length >= defaultMinFamilies, 'warn', `Distinct subject families=${uniq(families).length}; target >= ${defaultMinFamilies}.`, { actual: uniq(families).length, target: defaultMinFamilies });
  pushCheck(checks, 'subject_cluster_diversity', uniq(clusters).length >= defaultMinClusters, 'warn', `Distinct subject clusters=${uniq(clusters).length}; target >= ${defaultMinClusters}.`, { actual: uniq(clusters).length, target: defaultMinClusters });
  pushCheck(checks, 'included_archetype_coverage', coverage >= Math.min(3, result.included.length), 'warn', `Subject coverage across included archetypes=${coverage}.`, { actual: coverage });
  pushCheck(checks, 'other_options_broader_than_main', other.some((x) => !main.map(inferSubjectFamily).includes(inferSubjectFamily(x))), 'warn', 'Other options do not broaden the recommendation set beyond the main families.');

  const secondary = result.included.slice(2);
  if (secondary.length) {
    const visible = main.some((item) => ensureArray(item.archetypes).some((tag) => secondary.includes(tag)));
    pushCheck(checks, 'secondary_archetypes_visible_in_main', visible, 'warn', `Secondary included archetypes in main suggestions: ${secondary.join(', ')}.`);
  }

  const desiredMainFamilies = ensureArray(benchCase.expectations?.mustIncludeMainSubjectFamiliesAny);
  if (desiredMainFamilies.length) {
    const found = main.some((x) => desiredMainFamilies.includes(inferSubjectFamily(x)));
    pushCheck(checks, 'custom_main_family_expectation', found, 'warn', `Expected one main subject family from: ${desiredMainFamilies.join(', ')}.`);
  }

  const maxFamilyCount = benchCase.expectations?.maxSubjectsPerFamily ?? 2;
  const familyOvercrowded = Array.from(familyCounts.values()).some((n) => n > maxFamilyCount);
  pushCheck(checks, 'family_overcrowding', !familyOvercrowded, 'warn', `A subject family appears more than ${maxFamilyCount} times.`);

  return checks;
}

function evaluateRoleCase(result, benchCase) {
  const checks = [];
  const roles = result.roles || [];
  const titles = roles.map((x) => x.title);
  const familyCounts = countBy(roles, (r) => r.roleFamilyTitle || r.familyTitle || '');
  const distinctFamilies = Array.from(familyCounts.keys()).filter(Boolean).length;
  const coverage = coverageCount(roles, result.included);
  const expectedCount = benchCase.expectations?.expectedRoleCount ?? 8;
  const maxPerFamily = benchCase.expectations?.maxRolesPerFamily ?? 2;

  pushCheck(checks, 'matched_subject_found', !!result.matchedSubject, 'fail', 'Could not match the case uniSubject to a library subject.');
  pushCheck(checks, 'exact_role_count', roles.length === expectedCount, 'fail', `Found ${roles.length} roles; expected ${expectedCount}.`);
  pushCheck(checks, 'no_duplicate_titles', uniq(titles).length === titles.length, 'fail', 'Duplicate role titles detected.');
  pushCheck(checks, 'role_family_diversity', distinctFamilies >= (benchCase.expectations?.minDistinctRoleFamilies ?? 4), 'warn', `Distinct role families=${distinctFamilies}.`, { actual: distinctFamilies });
  pushCheck(checks, 'role_family_overcrowding', !Array.from(familyCounts.values()).some((n) => n > maxPerFamily), 'warn', `A role family appears more than ${maxPerFamily} times.`);
  pushCheck(checks, 'included_archetype_coverage', coverage >= Math.min(3, result.included.length), 'warn', `Role coverage across included archetypes=${coverage}.`, { actual: coverage });

  return checks;
}

function runBenchmarkCase(benchCase, lib) {
  const sorted = sortArchetypes(benchCase.archetypes || {});
  const included = pickIncludedArchetypes(benchCase.archetypes || {}, { maxCount: 4, includeTies: true });
  const includedWeights = {};
  for (const name of included) {
    const raw = Number.parseFloat(benchCase.archetypes?.[name]) || 0;
    includedWeights[name] = raw > 1 ? raw / 100 : raw;
  }

  const incomingSubdims = ensureArray(benchCase.subdims);
  const userSubdimMap = new Map();
  for (const row of incomingSubdims) {
    const key = canonSubdimName(row.name || row.title || row.subdim);
    if (!key) continue;
    userSubdimMap.set(key, normalizeScoreToPct(row.score ?? row.score_pct ?? row.value ?? row.percentage ?? row.adjusted ?? 0));
  }

  const pickCtx = initPickSubdims(benchCase.archetypes || {}, incomingSubdims, { includedOverride: included });
  const topSubdimProfile = buildTopSubdimProfile(userSubdimMap, 8);
  const topSubdimMap = Object.fromEntries(topSubdimProfile.map((x) => [x.name, x.score]));

  const ctx = {
    includedArchetypes: included,
    includedWeights,
    fullArchetypes: sorted,
    topSubdimProfile,
    topSubdimMap,
  };

  const topCareerWorlds = selectCareerWorlds(lib.career_worlds, ctx, 5);
  const topStrengths = selectStrengths(lib.strengths, ctx, 5);
  const topEnvironments = selectEnvironmentsForWorlds(lib.environments, topCareerWorlds, ctx, 6);

  const result = {
    id: benchCase.id,
    title: benchCase.title,
    status: benchCase.status,
    included,
    sortedArchetypes: sorted,
    allowedSubdims: pickCtx.allowedSubdims,
    topSubdimProfile,
    careerWorlds: topCareerWorlds,
    strengths: topStrengths,
    environments: topEnvironments,
    subjects: [],
    roles: [],
    matchedSubject: null,
  };

  if (benchCase.status === 'school') {
    const userSubjects = ensureArray(benchCase.schoolSubjects);
    result.subjects = selectSubjectsForCareerWorlds(lib.subjects, topCareerWorlds, ctx, {
      userSubjects,
      total: benchCase.expectations?.expectedSubjectCount || 5,
      subjectSlots: userSubjects.length ? 3 : 0,
    });
    result.checks = evaluateSchoolCase(result, benchCase);
  } else {
    result.matchedSubject = findBestMatchingSubject(benchCase.uniSubject, lib.subjects);
    result.roles = selectRolesForSubject(lib.rolesFlat, result.matchedSubject, topCareerWorlds, ctx, {
      total: benchCase.expectations?.expectedRoleCount || 8,
    });
    result.checks = evaluateRoleCase(result, benchCase);
  }

  result.statusLabel = summariseChecks(result.checks);
  return result;
}

function markdownReport(results) {
  const lines = [];
  lines.push('# CareerDNA benchmark report');
  lines.push('');
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push('');

  const overall = {
    PASS: results.filter((r) => r.statusLabel === 'PASS').length,
    WARN: results.filter((r) => r.statusLabel === 'WARN').length,
    FAIL: results.filter((r) => r.statusLabel === 'FAIL').length,
  };

  lines.push(`Overall: PASS=${overall.PASS}, WARN=${overall.WARN}, FAIL=${overall.FAIL}`);
  lines.push('');

  for (const r of results) {
    lines.push(`## ${r.title} (${r.statusLabel})`);
    lines.push('');
    lines.push(`- Case ID: ${r.id}`);
    lines.push(`- Status: ${r.status}`);
    lines.push(`- Included archetypes: ${r.included.join(', ')}`);
    lines.push(`- Top career worlds: ${r.careerWorlds.map((x) => x.title).join(' | ')}`);
    if (r.status === 'school') {
      lines.push(`- Main suggestions: ${r.subjects.slice(0, 3).map((x) => x.title).join(' | ')}`);
      lines.push(`- Other options: ${r.subjects.slice(3).map((x) => x.title).join(' | ')}`);
    } else {
      lines.push(`- Matched subject: ${r.matchedSubject?.title || '—'}`);
      lines.push(`- Top roles: ${r.roles.slice(0, 5).map((x) => x.title).join(' | ')}`);
    }
    lines.push('');
    lines.push('| Check | Status | Details |');
    lines.push('|---|---|---|');
    for (const c of r.checks) {
      lines.push(`| ${c.name} | ${c.pass ? 'PASS' : c.severity.toUpperCase()} | ${String(c.details || '').replace(/\|/g, '\\|')} |`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function parseArgs(argv) {
  const args = { cases: null, outDir: null };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--cases') args.cases = argv[++i];
    else if (token === '--out') args.outDir = argv[++i];
  }
  return args;
}

function main() {
  const args = parseArgs(process.argv);
  const root = path.resolve(__dirname, '..');
  const casesPath = path.resolve(root, args.cases || path.join('benchmarks', 'cdna_benchmark_cases.json'));
  const outDir = path.resolve(root, args.outDir || path.join('benchmarks', 'output'));

  const cases = JSON.parse(fs.readFileSync(casesPath, 'utf8'));
  const lib = loadCdnaLibrary();
  const results = cases.map((benchCase) => runBenchmarkCase(benchCase, lib));

  ensureDir(outDir);
  const jsonPath = path.join(outDir, 'cdna_benchmark_report.json');
  const mdPath = path.join(outDir, 'cdna_benchmark_report.md');
  fs.writeFileSync(jsonPath, JSON.stringify(results, null, 2), 'utf8');
  fs.writeFileSync(mdPath, markdownReport(results), 'utf8');

  const pass = results.filter((r) => r.statusLabel === 'PASS').length;
  const warn = results.filter((r) => r.statusLabel === 'WARN').length;
  const fail = results.filter((r) => r.statusLabel === 'FAIL').length;

  console.log(`CareerDNA benchmark complete: PASS=${pass} WARN=${warn} FAIL=${fail}`);
  console.log(`JSON report: ${jsonPath}`);
  console.log(`Markdown report: ${mdPath}`);

  for (const r of results) {
    console.log(`- ${r.id}: ${r.statusLabel}`);
  }

  process.exit(fail > 0 ? 1 : 0);
}

main();
