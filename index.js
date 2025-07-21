require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Archetype descriptions
const archetypeDescriptions = {
  Achiever: `Ambitious, driven, and focused on results. Achievers set high standards, work hard to meet goals, and thrive where performance is recognised.`,
  Connector: `People-focused, empathetic, and collaborative. Connectors love supporting others and excel at building relationships and community.`,
  Creator: `Imaginative, expressive, and hands-on. Creators enjoy turning ideas into reality through art, design, technology, or storytelling.`,
  Explorer: `Curious, adventurous, and driven by discovery. Explorers love trying new things and learning through real-world experiences.`,
  Organizer: `Structured, dependable, and detail-oriented. Organizers bring order to chaos and thrive on planning, systems, and reliability.`,
  Thinker: `Analytical, logical, and reflective. Thinkers enjoy solving complex problems and working independently with intellectual depth.`,
  Visionary: `Future-focused, bold, and full of ideas. Visionaries are inspired by big-picture thinking and love leading innovation and change.`,
};

// ✅ Shared markdown report instructions (updated)
const REPORT_INSTRUCTIONS = `
FORMAT: Use this exact markdown structure:

### 1. Summary
### 2. Strengths
### 3. Ideal Environments
### 4. Career Fit Areas
### 5. Career Role Ideas

Guidelines:
- Base all content on the user's top 3 archetypes only.
- In “Career Fit Areas”, list exactly **5** career domains (e.g. psychology, science, design, finance, politics, healthcare, etc.) and explain **why** each aligns with the user's traits, motivations, and energy drivers. Keep explanations to 1–2 short sentences.
- In “Career Role Ideas”, split into two subgroups:
  - **Classic & Well-Known Roles**: List **exactly 5** popular, widely recognised roles. These should feel familiar, aspirational, and accessible.
  - **Emerging & Future-Oriented Roles**: List **exactly 5** modern or evolving roles with strong trait fit. Avoid futuristic or far-fetched options unless clearly justified.
- For each role, include a short 1–2 sentence explanation and a [sector] tag (e.g., [healthcare], [education], [design]).
- At least 3 classic roles must be mainstream and grounded (e.g. teacher, financial analyst, marketing manager, UX designer).
- Be practical, clear, and specific. Avoid overly abstract or unusual career titles.
- Assume the user is aged 14–24 and in an early exploration phase.
- End the report with this line:
*For a bespoke, in-depth analysis tailored to your age, strengths and future goals, unlock your full CareerDNA report, including a detailed career map, development tips and access to our personalised coaching service.*
- Output markdown only. No extra notes or sections. Keep tone warm, motivational, and age-appropriate.
`.trim();

// ✅ Generate prompt from archetype scores
function generatePrompt(archetypes) {
  const sorted = Object.entries(archetypes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([name, score]) => ({
      name,
      score,
      description: archetypeDescriptions[name] || 'No description available.',
    }));

  const topDescriptions = sorted
    .map(a => `- **${a.name}** (${a.score}%): ${a.description}`)
    .join('\n');

  const dominant = sorted[0];
  const emphasisNote = `The highest-scoring archetype is **${dominant.name}**, so give slightly more weight to its traits when interpreting fit.\n`;

  return `
Top Archetypes:

${topDescriptions}

${emphasisNote}
Instructions:
${REPORT_INSTRUCTIONS}

VERSION: V7_${Date.now()}
`.trim();
}

// ✅ API endpoint
app.post("/api/summary", async (req, res) => {
  const archetypes = req.body;

  if (
    !archetypes ||
    typeof archetypes !== "object" ||
    Array.isArray(archetypes) ||
    Object.keys(archetypes).length === 0
  ) {
    return res.status(400).json({ summary: "⚠️ Invalid or missing archetype data." });
  }

  console.log("✅ Received archetype scores:", archetypes);

  const prompt = generatePrompt(archetypes);
  console.log("🧠 Prompt being sent to OpenAI:\n", prompt);

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      temperature: 0.7,
      user: "career-dna-v7",
      messages: [
        {
          role: "system",
          content: `
You are a career development AI trained to help 14–24-year-olds explore their top 3 career archetypes and discover aligned fields and job ideas.

${REPORT_INSTRUCTIONS}
`.trim(),
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const aiText = completion.choices?.[0]?.message?.content || "⚠️ No summary generated.";
    res.json({ summary: aiText });

  } catch (err) {
    console.error("❌ OpenAI API error:", err?.response?.data || err.message);
    res.status(500).json({ summary: "⚠️ Failed to generate summary." });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 CareerDNA backend running at http://localhost:${port}`);
});
