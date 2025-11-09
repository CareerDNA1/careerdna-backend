require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ CareerDNA backend is live.');
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* ---------- Model chain ---------- */
const MODEL_CHAIN = [
  process.env.OPENAI_MODEL,
  'gpt-5-chat-latest',
  'gpt-4o',
  'gpt-4o-mini'
].filter(Boolean);

/* ---------- Archetype selection config ---------- */
const CDNA_MIN_INCLUDE = Number(process.env.CDNA_MIN_INCLUDE ?? 60);
const CDNA_AUTO_INCLUDE = Number(process.env.CDNA_AUTO_INCLUDE ?? 80);
const CDNA_SOFT_CAP    = Number(process.env.CDNA_SOFT_CAP ?? 3);
const CDNA_HARD_BONUS  = Number(process.env.CDNA_HARD_BONUS ?? 5);
const CDNA_WEIGHT_EXP  = Number(process.env.CDNA_WEIGHT_EXP ?? 1.7);

/* ---------- Sub-dimension policy ---------- */
const SD_MIN_PCT               = Number(process.env.SD_MIN_PCT ?? 60); // include only ≥ this %
const SD_PER_ARCHETYPE_CAP     = Number(process.env.SD_PER_ARCHETYPE_CAP ?? 4);
const SD_UNKNOWN_FACTOR        = Number(process.env.SD_UNKNOWN_FACTOR ?? 0.5); // weight penalty if archetype unknown
const SD_STRICT_ARCHETYPE_ONLY = String(process.env.SD_STRICT_ARCHETYPE_ONLY ?? 'false').toLowerCase() === 'true'; // if true, drop unknowns entirely
const CDNA_DEBUG_EMBED         = String(process.env.CDNA_DEBUG_EMBED ?? 'false').toLowerCase() === 'true';

/* ---------- Archetype descriptions ---------- */
const archetypeDescriptions = {
  Achiever:  'Ambitious, driven, and focused on results. Achievers set high standards, work hard to meet goals, and thrive where performance is recognised.',
  Connector: 'People-focused, empathetic, and collaborative. Connectors love supporting others and excel at building relationships and community.',
  Creator:   'Imaginative, expressive, and hands-on. Creators enjoy turning ideas into reality through art, design, technology, or storytelling.',
  Explorer:  'Curious, adventurous, and driven by discovery. Explorers love trying new things and learning through real-world experiences.',
  Organizer: 'Structured, dependable, and detail-oriented. Organizers bring order to chaos and thrive on planning, systems, and reliability.',
  Thinker:   'Analytical, logical, and reflective. Thinkers enjoy solving complex problems and working independently with intellectual depth.',
  Visionary: 'Future-focused, bold, and full of ideas. Visionaries are inspired by big-picture thinking and love leading innovation and change.',
};

/* ---------- Item → sub-dimension tags (fallback) ---------- */
const SUBDIM_TAGS = {
  // SUBJECTS
  'Psychology': ['Analytical reasoning','Empathy','Communication'],
  'Geography': ['Curiosity/Openness','Fieldwork orientation','Analytical reasoning'],
  'Medicine': ['Conscientiousness','Stress tolerance','Empathy','Analytical reasoning'],
  'Computer Science': ['Analytical reasoning','Systems thinking','Conscientiousness'],
  'International Relations': ['Big-picture/Systems','Communication','Empathy','Curiosity/Openness'],
  'Media and Communication Studies': ['Communication','Creative Expression','Empathy'],
  'Anthropology': ['Curiosity/Openness','Investigative Curiosity','Communication'],
  'Design': ['Creative Expression','Hands-On Engagement','Conscientiousness'],
  'Drama and Theatre Studies': ['Creative Expression','Communication','Extroversion/Sociability'],

  // ENVIRONMENTS
  'Collaborative Groups': ['Communication','Empathy'],
  'Community-Focused Networks': ['Empathy','Helping Orientation','Communication'],
  'Hands-on Learning Settings': ['Hands-On Engagement','Curiosity/Openness'],
  'Dynamic, Varied Spaces': ['Novelty & Variety Seeking','Adaptability','Hands-On Engagement'],
  'Creative Studios': ['Creative Expression','Hands-On Engagement'],

  // FIT AREAS
  'Education and Community Engagement': ['Empathy','Communication','Helping Orientation'],
  'International Development': ['Empathy','Big-picture/Systems','Curiosity/Openness'],
  'Counselling and Support Services': ['Empathy','Communication','Emotional Stability'],
  'Travel, Culture, and Tourism': ['Curiosity/Openness','Communication','Novelty & Variety Seeking'],
  'Creative Industries (Media, Arts, Design)': ['Creative Expression','Communication','Hands-On Engagement'],

  // ROLES
  'Teacher': ['Communication','Empathy','Helping Orientation'],
  'Journalist': ['Investigative Curiosity','Communication','Creative Expression'],
  'Social Worker': ['Empathy','Helping Orientation','Emotional Stability'],
  'Graphic Designer': ['Creative Expression','Conscientiousness','Communication'],
  'User Experience (UX) Designer': ['Empathy','Creative Expression','Analytical reasoning'],
  'Community Manager for Online Platforms': ['Communication','Empathy','Extroversion/Sociability'],
  'Sustainability Innovator': ['Curiosity/Openness','Entrepreneurial Drive','Analytical reasoning'],
  'Digital Content Creator': ['Creative Expression','Communication','Novelty & Variety Seeking'],
};

/* ---------- Sub-dimension → archetype inference (fallback) ---------- */
const SUBDIM_TO_ARCHETYPE = {
  'Empathy': 'Connector',
  'Communication': 'Connector',
  'Helping Orientation': 'Connector',
  'Extroversion/Sociability': 'Connector',

  'Curiosity/Openness': 'Explorer',
  'Investigative Curiosity': 'Explorer',
  'Novelty & Variety Seeking': 'Explorer',
  'Hands-On Engagement': 'Explorer',

  'Creative Expression': 'Creator',

  'Analytical reasoning': 'Thinker',
  'Systems thinking': 'Thinker',
  'Big-picture/Systems': 'Visionary',

  'Entrepreneurial Drive': 'Achiever',
  'Grit / Persistence': 'Achiever',
  'Risk Tolerance': 'Visionary',
  'Conscientiousness': 'Organizer',
  'Emotional Stability': 'Achiever',
  'Stress tolerance': 'Achiever',
  'Fieldwork orientation': 'Explorer',
  'Adaptability': 'Explorer',
};

/* ---------- Helpers ---------- */
function computeWeights(included) {
  const transformed = included.map(a => {
    const bonus = a.score >= CDNA_AUTO_INCLUDE ? CDNA_HARD_BONUS : 0;
    const base  = Math.max(0, a.score + bonus);
    const w     = Math.pow(base, CDNA_WEIGHT_EXP);
    return { ...a, _w: w };
  });
  const sum = transformed.reduce((s, x) => s + x._w, 0) || 1;
  return transformed.map(a => ({ ...a, weight: Number((a._w / sum).toFixed(3)) }));
}

function selectArchetypes(raw) {
  const sorted = Object.entries(raw || {})
    .map(([name, score]) => ({ name, score: Number(score) || 0 }))
    .sort((a,b) => b.score - a.score);

  if (!sorted.length) {
    return {
      included: [],
      excluded: [],
      dominanceNote: 'No scores provided.',
      rules: { topAlways: true, minInclude: CDNA_MIN_INCLUDE, autoInclude: CDNA_AUTO_INCLUDE, softCap: CDNA_SOFT_CAP }
    };
  }

  const top = sorted[0];
  const included = [top];
  const excluded = [];

  for (let i=1;i<sorted.length;i++) if (sorted[i].score >= CDNA_AUTO_INCLUDE) included.push(sorted[i]);
  for (let i=1;i<sorted.length;i++) {
    const a = sorted[i];
    if (!included.find(x=>x.name===a.name) && a.score >= CDNA_MIN_INCLUDE && included.length < CDNA_SOFT_CAP) included.push(a);
  }
  for (const a of sorted) {
    if (!included.find(x=>x.name===a.name)) {
      const reason = a.score >= CDNA_MIN_INCLUDE ? `Dropped to respect soft cap of ${CDNA_SOFT_CAP}.` : `Below base threshold ${CDNA_MIN_INCLUDE}%.`;
      excluded.push({ ...a, reason });
    }
  }

  const second = sorted[1], third = sorted[2];
  const gap12 = second ? (top.score - second.score) : top.score;
  let dominanceNote = '';
  if (second) {
    if      (gap12 > 10) dominanceNote = `Strong dominance: ${top.name} leads by ${gap12} pts over #2.`;
    else if (third && Math.abs(top.score - third.score) <= 5) dominanceNote = `Tight cluster among the top 3 (${top.score}/${second.score}/${third.score}).`;
    else dominanceNote = `Moderate lead for ${top.name}.`;
  } else {
    dominanceNote = `Single-archetype profile dominated by ${top.name}.`;
  }

  return {
    included: computeWeights(included),
    excluded,
    dominanceNote,
    rules: { topAlways: true, minInclude: CDNA_MIN_INCLUDE, autoInclude: CDNA_AUTO_INCLUDE, softCap: CDNA_SOFT_CAP }
  };
}

/* ---------- Prompt builder ---------- */
function subdimsForPrompt(sd, includedNames, selectedInfo) {
  if (!selectedInfo?.selected?.length) return `No subdimensions met selection (≥${SD_MIN_PCT}%).`;
  const byArch = new Map(includedNames.map(n => [n, []]));
  const { selected } = selectedInfo;

  for (const x of selected) {
    const arch = x.archetype || x.inferredArchetype || 'Unknown';
    if (byArch.has(arch)) {
      byArch.get(arch).push(x);
    }
  }

  const lines = [];
  for (const arch of includedNames) {
    const arr = (byArch.get(arch) || []).sort((a,b) => b.score_pct - a.score_pct);
    if (!arr.length) continue;
    lines.push(`**${arch}**`);
    for (const r of arr) {
      const wPct = (r.normWeight * 100).toFixed(1);
      const tag  = r.archetype ? '' : (r.inferredArchetype ? ' (inferred)' : ' (unknown)');
      lines.push(`- ${r.name}: **${r.score_pct}%** • weight ${wPct}%${tag}`);
    }
  }
  if (!lines.length) return `No subdimensions mapped to the included archetypes after selection rules.`;
  return lines.join('\n');
}

function getReportInstructions(status) {
  const baseInstructions = `
Output markdown for the visible report only. Use - list bullets exactly as shown. Do not use en/em dashes (–/—) inside sentences; avoid stray hyphens in prose.
Follow the exact markdown format below, including headers and bullets.

Each section must contain the exact number of items:
- Summary: 5–6 lines. Lead with the included archetypes, then explicitly name the top-scoring sub-dimensions that explain the profile and the choices below.
- Strengths: exactly 5. Use plain-English labels derived from the user's top sub-dimensions (within the included archetypes). At least 2 should connect to the top archetype.
- Ideal Environments: exactly 5. Derive from the included archetypes and high sub-dimensions (not job titles; these are work environment types).
- University Subject Suggestions (school users): exactly 6. Only real UK degree subjects (UCAS categories). Base choices on the included archetypes + high sub-dimensions. If subjects of interest were selected, match 2–3 to those; the rest should reflect the archetype/sub-dimension blend. Provide a rationale naming the sub-dimensions.
- Career Fit Areas (school users): exactly 5 general areas linked to the subject suggestions. Ground choices in the archetype + sub-dimension profile. Provide rationales.
- Graduate Role Ideas (school users): 4 classic and 4 emerging roles linked to the subject suggestions. Base on the weighted archetype + sub-dimension mix and any interests. Provide rationales.
- Career Role Ideas (non-school users): 5 classic and 5 emerging roles, based on the weighted archetype + sub-dimension mix and subject of study. Provide rationales.

Never use placeholder labels. Every bullet must include a 1–2 sentence rationale that names the relevant sub-dimensions.

Metadata (hidden) JSON for backend scoring:
- For each item provide: title, archetypes (1–3 from the Included Archetypes list only), subdims (array of 0–5 strings naming the sub-dimensions you used), outlook (very high=0.92, solid=0.75, neutral=0.52, declining=0.25; or 0 if not applicable), interest_match (0 or 1).
- Append the block exactly like this:
<!--CDNA:BEGIN
{
  "strengths":      [ { "title": "...", "archetypes": ["Achiever","Thinker"], "subdims": ["Analytical reasoning","Grit / Persistence"], "outlook": 0, "interest_match": 0 } ],
  "subjects":       [ { "title": "Computer Science", "archetypes": ["Thinker","Visionary"], "subdims": ["Analytical reasoning","Systems thinking"], "outlook": 0.75, "interest_match": 1 } ],
  "environments":   [ { "title": "Data-led teams",   "archetypes": ["Thinker","Organizer"], "subdims": ["Analytical reasoning","Conscientiousness"], "outlook": 0, "interest_match": 0 } ],
  "fit_areas":      [ { "title": "AI in Business",   "archetypes": ["Visionary","Thinker"], "subdims": ["Analytical reasoning","Entrepreneurial Drive"], "outlook": 0.8, "interest_match": 0 } ],
  "roles_classic":  [ { "title": "Business Analyst", "archetypes": ["Achiever","Thinker"],  "subdims": ["Analytical reasoning","Conscientiousness"], "outlook": 0.75, "interest_match": 1 } ],
  "roles_emerging": [ { "title": "AI Product Strategist", "archetypes": ["Visionary","Thinker"], "subdims": ["Systems thinking","Entrepreneurial Drive"], "outlook": 0.92, "interest_match": 0 } ]
}
CDNA:END-->
`.trim();

  if (status === 'school') {
    return `${baseInstructions}

### 3. University Subject Suggestions
- **[Subject Title 1]**: Rationale.
- **[Subject Title 2]**: ...
- **[Subject Title 3]**: ...
- **[Subject Title 4]**: ...
- **[Subject Title 5]**: ...
- **[Subject Title 6]**: ...

### 4. Ideal Environments
- **[Environment 1]**: Rationale
- **[Environment 2]**: ...
- **[Environment 3]**: ...
- **[Environment 4]**: ...
- **[Environment 5]**: ...

### 5. Career Fit Areas
- **[Domain 1]**: Rationale
- **[Domain 2]**: ...
- **[Domain 3]**: ...
- **[Domain 4]**: ...
- **[Domain 5]**: ...

### 6. Graduate Role Ideas

**Classic & Well-Known Roles**
- **[Role 1]**: Rationale
- **[Role 2]**: ...
- **[Role 3]**: ...
- **[Role 4]**: ...

**Emerging & Future-Oriented Roles**
- **[Emerging Role 1]**: Rationale
- **[Emerging Role 2]**: ...
- **[Emerging Role 3]**: ...
- **[Emerging Role 4]**: ...

*To unlock your full CareerDNA profile with development advice, subject deep dives and mapping tools, check out CareerDNA+.*`;
  } else {
    return `${baseInstructions}

### 3. Ideal Environments
- **[Environment 1]**: Rationale
- **[Environment 2]**: ...
- **[Environment 3]**: ...
- **[Environment 4]**: ...
- **[Environment 5]**: ...

### 4. Career Role Ideas

**Classic & Well-Known Roles**
- **[Role 1]**: Rationale
- **[Role 2]**: ...
- **[Role 3]**: ...
- **[Role 4]**: ...
- **[Role 5]**: ...

**Emerging & Future-Oriented Roles**
- **[Emerging Role 1]**: Rationale
- **[Emerging Role 2]**: ...
- **[Emerging Role 3]**: ...
- **[Emerging Role 4]**: ...
- **[Emerging Role 5]**: ...

*To unlock your full CareerDNA profile with development advice and role deep dives, check out CareerDNA+.*`;
  }
}

/* ---------- Prompt (includes selected sub-dims preview) ---------- */
function generatePrompt({ selection, age, status, subjects, selectedSDText }) {
  const { included, excluded, dominanceNote, rules } = selection;

  const weightedSummary = included
    .map(a => `- **${a.name}** (${a.score}% | Weight: ${(a.weight * 100).toFixed(1)}%): ${archetypeDescriptions[a.name] || ''}`)
    .join('\n');

  const inclusionNote = `
Apply these inclusion rules:
- Use ONLY the included archetypes listed below.
- Rules used: Top archetype always included; hard-include ≥ ${rules.autoInclude}%; base include ≥ ${rules.minInclude}% up to a soft cap of ${rules.softCap} (unless hard-includes exceed this).
${excluded.length ? `- Excluded for clarity: ${excluded.map(e => `${e.name} (${e.score}% – ${e.reason})`).join('; ')}` : ''}`.trim();

  const stageNote =
    status === 'school'      ? `They are still at school (approx. age ${age || 'unknown'}) and are exploring subject interests.`
  : status === 'undergraduate' ? `They are currently an undergraduate student.`
  : status === 'postgraduate'  ? `They are currently pursuing postgraduate study.`
                               : `The user's current education status is ${status || 'unknown'}.`;

  const subjectNote = subjects?.length ? `They are interested in or currently studying: ${subjects.join(', ')}.` : '';

  return `
Please follow the formatting and output structure described above.

User Context:
- Age: ${age || 'Not provided'}
- Status: ${status}
- ${stageNote}
${subjectNote ? `- Subjects: ${subjectNote}` : ''}

Included Archetypes (weights computed ONLY across included set):
${weightedSummary}

Key Subdimensions Used (≥${SD_MIN_PCT}% • cap ${SD_PER_ARCHETYPE_CAP} per archetype; unknown archetype at ${Math.round(SD_UNKNOWN_FACTOR*100)}% weight):
${selectedSDText}

${inclusionNote}

Emphasis Guidance:
- ${dominanceNote}
- Weigh narrative and choices proportionally to the included weights and the high sub-dimensions.
- If only one archetype is included, keep the story cohesive.

Think silently. Provide only the final markdown and the hidden JSON block.
VERSION: V19_${Date.now()}
`.trim();
}

/* ---------- Scoring ---------- */
const SIMPLE_SCORING = {
  strengths:      { wFit: 0.90, wOutlook: 0.00, wInterest: 0.00, wDom: 0.10 },
  subjects:       { wFit: 0.65, wOutlook: 0.25, wInterest: 0.10, wDom: 0.00 },
  environments:   { wFit: 0.85, wOutlook: 0.00, wInterest: 0.00, wDom: 0.15 },
  fit_areas:      { wFit: 0.75, wOutlook: 0.20, wInterest: 0.05, wDom: 0.00 },
  roles_classic:  { wFit: 0.60, wOutlook: 0.30, wInterest: 0.07, wDom: 0.03 },
  roles_emerging: { wFit: 0.58, wOutlook: 0.35, wInterest: 0.05, wDom: 0.02 },
};

function itemFitSimple(archetypeTags, included) {
  if (!Array.isArray(archetypeTags) || !archetypeTags.length) return 0;
  const w = new Map(included.map(a => [a.name, a.weight]));
  let s = 0;
  for (const name of archetypeTags) s += (w.get(name) || 0);
  return Math.min(1, s);
}

function dominanceBoostSimple(dominanceNote, itemTags, included) {
  if (!included?.length) return 0;
  const topName = included[0].name;
  const leansTop = Array.isArray(itemTags) && itemTags.includes(topName);
  if (!leansTop) return 0;
  if (dominanceNote?.startsWith('Strong dominance')) return 1;
  if (dominanceNote?.startsWith('Moderate')) return 0.5;
  return 0.25;
}

/* ---------- Sub-dimension selection & weights ---------- */
function inferArchetype(name) {
  const key = String(name || '').trim();
  return SUBDIM_TO_ARCHETYPE[key] || null;
}

/** Build selected sub-dimensions with your rules + fallback inference.
 * Returns: { weights: Map<label->normWeight], selected: [{name,score_pct,archetype|inferredArchetype,normWeight}], reasonLog: [...] }
 */
function buildTopSubdimWeights(sd, includedNames) {
  const outWeights = new Map();
  const selected = [];
  const reasonLog = [];
  if (!Array.isArray(sd) || !sd.length || !includedNames?.length) {
    reasonLog.push('No sub-dimension payload or no included archetypes.');
    return { weights: outWeights, selected, reasonLog };
  }

  const allow = new Set(includedNames);
  const perArch = new Map(includedNames.map(n => [n, []]));
  const unknownBucket = []; // for sub-dims with unknown archetype (will use penalty)

  // total cap = included_count * per-arch cap
  const totalCap = includedNames.length * SD_PER_ARCHETYPE_CAP;

  for (const r of sd) {
    if (!r || typeof r !== 'object') continue;
    const score = Number(r.score_pct);
    const name  = String(r.name || r.code || '').trim();
    const arch  = r.archetype ? String(r.archetype).trim() : '';

    if (!name || !Number.isFinite(score)) continue;
    if (score < SD_MIN_PCT) { reasonLog.push(`Dropped <${SD_MIN_PCT}%: ${name} (${score}%)`); continue; }

    let targetArch = '';
    let isInferred = false;

    if (arch && allow.has(arch)) {
      targetArch = arch;
    } else if (arch && !allow.has(arch)) {
      reasonLog.push(`Excluded: ${name} (${score}%) belongs to non-included archetype ${arch}.`);
      continue;
    } else {
      const inferred = inferArchetype(name);
      if (inferred && allow.has(inferred)) {
        targetArch = inferred;
        isInferred = true;
      } else {
        if (SD_STRICT_ARCHETYPE_ONLY) {
          reasonLog.push(`Dropped unknown archetype for ${name} (${score}%).`);
          continue;
        }
        // keep for unknown bucket (penalised)
        unknownBucket.push({ name, score, archetype: null, inferredArchetype: null, penalty: SD_UNKNOWN_FACTOR });
        continue;
      }
    }

    perArch.get(targetArch).push({ name, score, archetype: targetArch, inferredArchetype: isInferred ? targetArch : null, penalty: 1 });
  }

  // Take top N per included archetype
  for (const [arch, arr] of perArch.entries()) {
    arr.sort((a,b) => b.score - a.score);
    perArch.set(arch, arr.slice(0, SD_PER_ARCHETYPE_CAP));
  }

  // Flatten selected; then (optionally) fill remaining slots with unknowns (penalised)
  let flat = [];
  for (const name of includedNames) flat = flat.concat(perArch.get(name) || []);

  if (flat.length < totalCap && unknownBucket.length) {
    unknownBucket.sort((a,b) => b.score - a.score);
    const remain = totalCap - flat.length;
    flat = flat.concat(unknownBucket.slice(0, Math.max(0, remain)));
  }

  if (!flat.length) {
    reasonLog.push('No sub-dimensions passed selection after all rules.');
    return { weights: outWeights, selected, reasonLog };
  }

  // Normalize -> weights
  let sum = 0;
  for (const x of flat) sum += (x.score/100) * (x.penalty || 1);
  for (const x of flat) {
    const w = ((x.score/100) * (x.penalty || 1)) / (sum || 1);
    outWeights.set(x.name, w);
    selected.push({ ...x, normWeight: w });
  }

  return { weights: outWeights, selected, reasonLog };
}

function itemFitSubdim(subdimTags, weightMap) {
  if (!Array.isArray(subdimTags) || !subdimTags.length) return 0;
  if (!(weightMap instanceof Map)) return 0;
  let s = 0;
  for (const tag of subdimTags) s += (weightMap.get(tag) || 0);
  return Math.min(1, s);
}

function scoreItems(sectionKey, items, included, dominanceNote, sdWeights, sd) {
  const W = SIMPLE_SCORING[sectionKey] || SIMPLE_SCORING.subjects;

  return (items || []).map(it => {
    const fitA = itemFitSimple(it.archetypes, included);

    const explicit = Array.isArray(it.subdims) ? it.subdims : null;
    const fallback = SUBDIM_TAGS[it.title] || [];
    const itemSubdimsResolved = (explicit && explicit.length ? explicit : fallback);

    const fitS = itemFitSubdim(itemSubdimsResolved, sdWeights);
    const fitCombined = Math.min(1, (0.5 * fitA) + (0.5 * fitS));

    const outlook  = Math.max(0, Math.min(1, Number(it.outlook || 0)));
    const interest = Math.max(0, Math.min(1, Number(it.interest_match || 0)));
    const dom      = dominanceBoostSimple(dominanceNote, it.archetypes, included);

    let score = (W.wFit * fitCombined) + (W.wOutlook * outlook) + (W.wInterest * interest) + (W.wDom * dom);
    if (fitCombined < 0.40) score *= 0.5;

    return {
      ...it,
      itemSubdimsResolved,
      _fitA: Number(fitA.toFixed(4)),
      _fitS: Number(fitS.toFixed(4)),
      _fit:  Number(fitCombined.toFixed(4)),
      _score: Number(score.toFixed(4)),
    };
  }).sort((a,b) =>
    b._score - a._score
    || ((b._fit - a._fit) > 0.02 ? 1 : (a._fit - b._fit) > 0.02 ? -1 : 0)
    || (itemFitSimple(b.archetypes, included) - itemFitSimple(a.archetypes, included))
    || (Number(b.outlook || 0) - Number(a.outlook || 0))
    || (Number(b.interest_match || 0) - Number(a.interest_match || 0))
  );
}

/* ---------- CDNA block utils ---------- */
function extractCdnaJsonBlock(text) {
  const m = text.match(/<!--CDNA:BEGIN\s*([\s\S]*?)\s*CDNA:END-->/);
  if (!m) return null;
  try { return JSON.parse(m[1]); } catch { return null; }
}
function stripCdnaJsonBlock(text) {
  return text.replace(/<!--CDNA:BEGIN[\s\S]*?CDNA:END-->/, '').trim();
}

/* ---------- Markdown reordering (keeps LLM rationales) ---------- */
function reorderSection(markdown, headerRegex, rankedTitles) {
  if (!Array.isArray(rankedTitles) || rankedTitles.length === 0) return markdown;

  const m = markdown.match(headerRegex);
  if (!m) return markdown;

  const startIdx = m.index + m[0].length;
  const rest = markdown.slice(startIdx);
  const nextHeader = rest.search(/\n#{2,3}\s|^\d+\.\s|\n\*\*Classic|$/m);
  const endIdx = nextHeader >= 0 ? (startIdx + nextHeader) : markdown.length;

  const sectionBody = markdown.slice(startIdx, endIdx);

  const bulletRegex = /^\s*-\s+\*\*(.+?)\*\*:(.*)$/gm;
  const bullets = [];
  let bm;
  while ((bm = bulletRegex.exec(sectionBody)) !== null) {
    bullets.push({ title: bm[1].trim(), full: bm[0] });
  }
  if (bullets.length === 0) return markdown;

  const byTitle = new Map(bullets.map(b => [b.title, b.full]));
  const ordered = [];
  for (const t of rankedTitles) {
    const b = byTitle.get(t);
    if (b) ordered.push(b);
  }
  for (const b of bullets) {
    if (!rankedTitles.includes(b.title)) ordered.push(b.full);
  }

  const newSectionBody = '\n' + ordered.join('\n') + '\n';
  return markdown.slice(0, startIdx) + newSectionBody + markdown.slice(endIdx);
}

function reorderAllSections(markdown, rankings) {
  if (!rankings) return markdown;
  const getOrder = (key) => (Array.isArray(rankings[key]) ? rankings[key].map(x => x.title) : []);

  markdown = reorderSection(markdown, /### 3\. University Subject Suggestions[\s\S]*?\n/, getOrder('subjects'));
  markdown = reorderSection(markdown, /### 4\. Ideal Environments[\s\S]*?\n/, getOrder('environments'));
  markdown = reorderSection(markdown, /### 5\. Career Fit Areas[\s\S]*?\n/, getOrder('fit_areas'));

  const classics = getOrder('roles_classic');
  if (classics.length) markdown = reorderSection(markdown, /\*\*Classic & Well-Known Roles\*\*[\s\S]*?\n/, classics);

  const emerging = getOrder('roles_emerging');
  if (emerging.length) markdown = reorderSection(markdown, /\*\*Emerging & Future-Oriented Roles\*\*[\s\S]*?\n/, emerging);

  const strengths = getOrder('strengths');
  if (strengths.length) markdown = reorderSection(markdown, /2\.\s*Strengths[\s\S]*?\n/, strengths);

  return markdown;
}

/* ---------- Utilities ---------- */
function normalizeSubjects(input) {
  if (input == null) return [];
  if (Array.isArray(input)) return input.map(x => String(x).trim()).filter(Boolean);
  if (typeof input === 'string') return [input.trim()].filter(Boolean);
  return [];
}

async function callModels(messages) {
  let lastErr;
  for (const model of MODEL_CHAIN) {
    try {
      const resp = await openai.chat.completions.create({ model, temperature: 0.7, messages });
      const content = resp.choices?.[0]?.message?.content?.trim();
      if (!content) throw new Error('Empty content from model');
      return content;
    } catch (err) {
      lastErr = err;
      console.error(`⚠️ Model ${model} failed:`, err?.status || '', err?.message || err);
    }
  }
  throw lastErr || new Error('All models failed');
}

/* ---------- Route ---------- */
app.post('/api/summary', async (req, res) => {
  try {
    const { archetypes, age, status, schoolSubjects, uniSubject, subdimensions } = req.body;

    // Sanitize subdimensions early
    const sdRaw = Array.isArray(subdimensions) ? subdimensions : [];
    const sd = sdRaw
      .filter(r => r && typeof r === 'object')
      .map(r => ({
        code: String(r.code || r.name || '').trim(),
        name: String(r.name || r.code || '').trim(),
        score_pct: Number(r.score_pct) || 0,
        n_items: Number(r.n_items) || 0,
        dimension: r.dimension ? String(r.dimension) : undefined,
        archetype: r.archetype ? String(r.archetype) : undefined,
      }))
      .filter(r => r.code && r.name);

    const validStatuses = ['school', 'undergraduate', 'postgraduate'];
    const validAgeRanges = ['13-15','16-18','19-21','22-24','25+'];

    if (!archetypes || typeof archetypes !== 'object') {
      return res.status(400).json({ summary: '⚠️ Invalid or missing archetype data.' });
    }
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ summary: '⚠️ Invalid or missing status.' });
    }
    if (age && !validAgeRanges.includes(age)) {
      return res.status(400).json({ summary: '⚠️ Invalid age value.' });
    }

    // Select archetypes
    const selection = selectArchetypes(archetypes);

    // Subjects
    let subjects = [];
    if (status === 'school') {
      subjects = normalizeSubjects(schoolSubjects);
    } else {
      const uni = typeof uniSubject === 'string' ? uniSubject.trim() : '';
      if (!uni) return res.status(400).json({ summary: '⚠️ University subject must be a non-empty string.' });
      subjects = [uni];
    }

    // Build sub-dimension weights (with inference + unknown policy)
    const includedNames = selection.included.map(a => a.name);
    const sdSelection = buildTopSubdimWeights(sd, includedNames);
    const sdText = subdimsForPrompt(sd, includedNames, sdSelection);

    // Prompt
    const prompt = generatePrompt({ selection, age, status, subjects, selectedSDText: sdText });
    if (process.env.NODE_ENV !== 'production') {
      console.log('🧠 Prompt snippet:\n', prompt.slice(0, 800));
    }

    const messages = [
      { role: 'system', content: `You are a career development coach that produces highly tailored, age-appropriate reports using included archetypes and high sub-dimensions.\n\n${getReportInstructions(status)}` },
      { role: 'user', content: prompt },
    ];

    const summary = await callModels(messages);

    // Parse + score
    const cdnaRaw = extractCdnaJsonBlock(summary);
    const finalSummary = stripCdnaJsonBlock(summary);

    // Rank using 50/50 with sdSelection.weights
    const rankings = {};
    const itemsBySection = {};
    if (cdnaRaw) {
      const { included, dominanceNote } = selection;
      for (const key of Object.keys(SIMPLE_SCORING)) {
        if (Array.isArray(cdnaRaw[key])) {
          const ranked = scoreItems(key, cdnaRaw[key], included, dominanceNote, sdSelection.weights, sd);
          rankings[key] = ranked.map(x => ({ title: x.title, score: x._score }));
          itemsBySection[key] = ranked; // full details for debug
        }
      }
    }

    // Reorder visible markdown according to our rankings
    let visibleSummary = reorderAllSections(finalSummary, rankings);

    // Debug block (full items + selected subdims + reasons)
    const wantEmbedDebug = String(req.query.debug || '') === '1' || CDNA_DEBUG_EMBED;
    if (wantEmbedDebug) {
      const debugJson = {
        included: selection?.included || [],
        dominanceNote: selection?.dominanceNote || '',
        itemsBySection: itemsBySection || {},
        selectedSubdims: {
          normalized: Array.from(sdSelection.weights.entries()).map(([name, w]) => ({ name, weight: Number(w.toFixed(4)) })),
          byArchetype: selection.included.reduce((acc, a) => {
            acc[a.name] = sdSelection.selected.filter(x => (x.archetype || x.inferredArchetype) === a.name)
              .map(x => ({ name: x.name, score_pct: x.score_pct, normWeight: Number(x.normWeight.toFixed(4)), inferred: !x.archetype && !!x.inferredArchetype }));
            return acc;
          }, {})
        },
        subdimSelectionReasons: sdSelection.reasonLog
      };
      visibleSummary =
        '**DEBUG (temporary) — ranked items per section (all) + selected sub-dimensions used**\n\n' +
        '```json\n' + JSON.stringify(debugJson, null, 2) + '\n```\n\n' +
        visibleSummary;
    }

    const payload = {
      summary: visibleSummary,
      scores: rankings,
      selection,
      rawMeta: cdnaRaw || null
    };

    return res.json(payload);
  } catch (err) {
    const status = err.status || err.response?.status || 500;
    const data = err.response?.data || err.message || String(err);
    console.error('❌ Server error:', status, data);
    return res.status(500).json({ summary: '⚠️ Failed to generate summary.', error: data });
  }
});

app.listen(port, () => {
  console.log(`🚀 CareerDNA backend running at http://localhost:${port}`);
});
