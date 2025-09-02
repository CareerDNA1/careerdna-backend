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

// Prefer env override, then sane fallbacks
const MODEL_CHAIN = [
  process.env.OPENAI_MODEL,       // optional
  "gpt-5-chat-latest",
  "gpt-4o",
  "gpt-4o-mini"
].filter(Boolean);

/* ---------- Your existing content ---------- */
const archetypeDescriptions = {
  Achiever: 'Ambitious, driven, and focused on results. Achievers set high standards, work hard to meet goals, and thrive where performance is recognised.',
  Connector: 'People-focused, empathetic, and collaborative. Connectors love supporting others and excel at building relationships and community.',
  Creator: 'Imaginative, expressive, and hands-on. Creators enjoy turning ideas into reality through art, design, technology, or storytelling.',
  Explorer: 'Curious, adventurous, and driven by discovery. Explorers love trying new things and learning through real-world experiences.',
  Organizer: 'Structured, dependable, and detail-oriented. Organizers bring order to chaos and thrive on planning, systems, and reliability.',
  Thinker: 'Analytical, logical, and reflective. Thinkers enjoy solving complex problems and working independently with intellectual depth.',
  Visionary: 'Future-focused, bold, and full of ideas. Visionaries are inspired by big-picture thinking and love leading innovation and change.',
};

function getReportInstructions(status) {
  const baseInstructions = `
Output markdown only. 
No extra notes or titles outside the structure. 
Follow the exact markdown format below, including headers and bullets. 
Do not use dashes in any of the text

Each section must contain the **exact number of items**:
- Summary: 5-6 lines, with a positive narrative on the meaning of their mix of archetypes potential. Mention their subject of study/interest only briefly (if they have selected any).
- Strengths: exactly 5. Must be based **entirely on archetypes**, not subject interests. Of those a minimum of 2 should refer to their top archetype. You should also refer to combinations of archetypes where possible/appropriate. 
- Ideal Environments: exactly 5. Must be based **entirely on archetypes**, not subject interests. Ideal environments must reflect genuine types of work environments rather than roles or types of companies/organisations.
- University Subject Suggestions (school users): exactly 6 suggestions. For University subjects, you must select only real UK degree subjects (UCAS categories), and only the top most relevant ones for this user's profile. Consider relevance from a wide array of topics/sciences including social sciences, life sciences, earth science, physical science, business, arts etc with emphasis on the most relevant to their top archetypes and also most in demand in the future of work. If they have selected subjects of interest, match 2-3 suggestions to those. The rest should be the absolute top matches to their archetype mix outside their subjects of interest. Each suggestion must include a rationale that clearly shows how it connects to the unique combination and weight of archetypes.
- Career Fit Areas (school users): exactly 5 general areas linked to the University subject suggestions proposed. A maximum of 3 should be based on subjects of interest (if they have selected any). The rest should be based optimally on their weighted mix of archetypes with at least two being based on their top archetype. Each area must include a rationale that clearly shows how it connects to their top archetype or their unique combination and weight of archetypes.
- Graduate Role Ideas (school users): 4 classic roles and 4 emerging roles linked to the University subject suggestions, optimally based on weighted archetype mix and subjects of interest (if any declared). 4 (2 classic and 2 emerging) should be based on their subjects of interest if any declared. All roles should be of University graduate level or above. Each role must include a rationale that clearly shows how it connects to the unique combination and weight of archetypes.
- Career Role Ideas (non-school users): 5 classic roles and 5 emerging roles, optimally based on weigthted archetype mix and subject of study. Each role must include a rationale that clearly shows how it connects to the unique combination and weight of archetypes.

When generating suggestions do not base them only on individual archetype traits. Consider how the top 3 archetypes and their weights combine to create a unique cognitive and motivational profile. Subjects and domains should reflect **intersections** — not just one-to-one archetype matches.For example, if a user scores highly in both Visionary and Thinker, they may thrive in **technological innovation**, **futuristic design**, or **systems architecture**. If they are Connector + Creator + Explorer, they may be suited for **education technology**, **experiential marketing**, or **interactive media**. List these in order of compatibility.

NEVER use placeholder labels like "Subject 1", "Role 2", "Domain 3", or "Other 1". Always replace bullet labels with real, meaningful titles (e.g. **Financial Analyst**, **Creative Collaboration Spaces**, etc.).
Every bullet point must include a 1–2 sentence rationale explaining how it connects to the user’s top archetypes and/or subject interests.

Subheadings like **Other Ideas You May Consider**, **Classic & Well-Known Roles**, and **Emerging & Future-Oriented Roles** must:
- Be standalone bold lines
- Not be bulleted or merged into sentences
- Be preceded by two line breaks (\\n\\n)

The closing line must be italicised, on its own line, and not bulleted:
*To unlock your full CareerDNA profile with development advice, subject deep dives and mapping tools, check out CareerDNA+.*
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
-**[Role 5]**: ...

**Emerging & Future-Oriented Roles**
- **[Emerging Role 1]**: Rationale
- **[Emerging Role 2]**: ...
- **[Emerging Role 3]**: ...
- **[Emerging Role 4]**: ...
-- **[Emerging Role 5]**: ...

*To unlock your full CareerDNA profile with development advice and role deep dives, check out CareerDNA+.*`;
  }
}

function generatePrompt({ archetypes, age, status, subjects }) {
  const sorted = Object.entries(archetypes)
    .sort(([, a], [, b]) => b - a)
    .map(([name, score]) => ({
      name,
      score,
      description: archetypeDescriptions[name] || 'No description available.',
    }));

  const topThree = sorted.slice(0, 3);
  const [dominant, second, third] = topThree;

  const totalTopScore = topThree.reduce((sum, a) => sum + a.score, 0) || 1;
  const weightedList = topThree.map(a => ({
    ...a,
    weight: parseFloat((a.score / totalTopScore).toFixed(3))
  }));

  const weightedSummary = weightedList
    .map(a => `- **${a.name}** (${a.score}% | Weight: ${(a.weight * 100).toFixed(1)}%): ${a.description}`)
    .join('\n');

  let emphasisNote = '';
  const scoreGap = (dominant?.score ?? 0) - (second?.score ?? 0);
  const scoreRange = (dominant?.score ?? 0) - (third?.score ?? 0);

  if (scoreGap > 10) {
    emphasisNote = `The user's top archetype is **${dominant.name}**, with a significantly higher score (${dominant.score}%). Its traits should be prioritised in shaping the report.`;
  } else if (scoreRange <= 5) {
    emphasisNote = `The user's top 3 archetypes are closely matched (${dominant?.score ?? 0}%, ${second?.score ?? 0}%, ${third?.score ?? 0}%), so they should be given roughly equal emphasis.`;
  } else {
    emphasisNote = `All three top archetypes are important, but slightly more emphasis should be placed on **${dominant?.name ?? ''}**.`;
  }

  const stageNote =
    status === 'school'
      ? `They are still at school (approx. age ${age || 'unknown'}) and are exploring subject interests.`
      : status === 'undergraduate'
      ? `They are currently an undergraduate student.`
      : status === 'postgraduate'
      ? `They are currently pursuing postgraduate study.`
      : `The user's current education status is ${status || 'unknown'}.`;

  const subjectNote = subjects?.length
    ? `They are interested in or currently studying: ${subjects.join(', ')}.`
    : '';

  return `
  Please follow the formatting and output structure described above.

User Context:
- Age: ${age || 'Not provided'}
- Status: ${status}
- ${stageNote}
${subjectNote ? `- Subjects: ${subjectNote}` : ''}

Top Archetypes (with weighted influence):
${weightedSummary}

${emphasisNote}

Use the weights to proportionally guide how much influence each archetype should have in the report. If one archetype is clearly dominant, prioritise it in the narrative, strengths, and role suggestions. Be sure each bullet point is connected to one or more of the user's top archetypes.

First, reason step-by-step: Identify top archetypes and subjects. Generate content for each section, ensuring every list item has a rationale. Ensure subheadings like 'Other Ideas You May Consider' are standalone bold text on their own line with line breaks, not bulleted or merged. Then, format exactly as in the instructions.

VERSION: V16_${Date.now()}
`.trim();
}

/* ---------- Minimal, robust utils ---------- */
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
      const resp = await openai.chat.completions.create({
        model,
        temperature: 0.7,
        messages
      });
      const content = resp.choices?.[0]?.message?.content?.trim();
      if (!content) throw new Error("Empty content from model");
      return content;
    } catch (err) {
      lastErr = err;
      console.error(`⚠️ Model ${model} failed:`, err?.status || "", err?.message || err);
      // try next
    }
  }
  throw lastErr || new Error("All models failed");
}

/* ---------- Route ---------- */
app.post("/api/summary", async (req, res) => {
  try {
    const { archetypes, age, status, schoolSubjects, uniSubject } = req.body;

    const validStatuses = ['school', 'undergraduate', 'postgraduate'];
    const validAgeRanges = ['13-15', '16-18', '19-21', '22-24', '25+'];

    if (!archetypes || typeof archetypes !== "object") {
      return res.status(400).json({ summary: "⚠️ Invalid or missing archetype data." });
    }
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ summary: "⚠️ Invalid or missing status." });
    }
    if (age && !validAgeRanges.includes(age)) {
      return res.status(400).json({ summary: "⚠️ Invalid age value." });
    }

    // Looser, user-friendly normalization
    let subjects = [];
    if (status === 'school') {
      subjects = normalizeSubjects(schoolSubjects); // allow [], "Maths", or ["Maths","CS"]
    } else {
      const uni = typeof uniSubject === 'string' ? uniSubject.trim() : "";
      if (!uni) return res.status(400).json({ summary: "⚠️ University subject must be a non-empty string." });
      subjects = [uni];
    }

    const prompt = generatePrompt({ archetypes, age, status, subjects });

    if (process.env.NODE_ENV !== 'production') {
      console.log("🧠 Prompt to OpenAI:\n", prompt.slice(0, 2000)); // avoid huge log spam
    }

    const messages = [
      {
        role: "system",
        content: `You are a career development coach that produces highly tailored, age-appropriate reports for young users aged 14–24 using their top archetypes and subject interests or study background. Adjust your tone and vocabulary based on whether the user is at school, undergraduate, or postgraduate level.\n\n${getReportInstructions(status)}`
      },
      { role: "user", content: prompt },
    ];

    const summary = await callModels(messages);
    return res.json({ summary });

  } catch (err) {
    const status = err.status || err.response?.status || 500;
    const data = err.response?.data || err.message || String(err);
    console.error("❌ Server error:", status, data);
    return res.status(500).json({ summary: "⚠️ Failed to generate summary.", error: data });
  }
});

app.listen(port, () => {
  console.log(`🚀 CareerDNA backend running at http://localhost:${port}`);
});
