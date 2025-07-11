require('dotenv').config();
console.log("🔑 Loaded key:", process.env.OPENAI_API_KEY?.slice(0, 10) + "...");

const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Generate prompt function
function generatePrompt(archetypes) {
  const archetypeDescriptions = {
    Achiever: `Ambitious, driven, and focused on results. Achievers set high standards, work hard to meet goals, and thrive where performance is recognised.`,
    Connector: `People-focused, empathetic, and collaborative. Connectors love supporting others and excel at building relationships and community.`,
    Creator: `Imaginative, expressive, and hands-on. Creators enjoy turning ideas into reality through art, design, technology, or storytelling.`,
    Explorer: `Curious, adventurous, and driven by discovery. Explorers love trying new things and learning through real-world experiences.`,
    Organizer: `Structured, dependable, and detail-oriented. Organizers bring order to chaos and thrive on planning, systems, and reliability.`,
    Thinker: `Analytical, logical, and reflective. Thinkers enjoy solving complex problems and working independently with intellectual depth.`,
    Visionary: `Future-focused, bold, and full of ideas. Visionaries are inspired by big-picture thinking and love leading innovation and change.`,
  };

  const sorted = Object.entries(archetypes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name, score]) => ({
      name,
      score,
      description: archetypeDescriptions[name] || 'No description available.',
    }));

  return `
Top Archetypes:

${sorted.map(a => `- **${a.name}** (${a.score}%): ${a.description}`).join('\n')}

Instructions:
Use the list above to write a personalised markdown report based only on the top 3 archetypes. Analyse their relative scores and descriptions to infer the user's likely strengths, motivations, environments, and career fit.

FORMAT: Use exactly this markdown structure — no changes:
### 1. Summary
### 2. Strengths
### 3. Ideal Environments
### 4. Career Fit Ideas

No other sections. No headline. Be specific, motivational, and write like you're advising a smart young adult. Markdown only. No filler.

VERSION: V2_${Date.now()}
`;
}

// ✅ API route
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
      user: "v2-test", // ✅ Helps force cache bypass
      messages: [
        {
          role: "system",
          content: `
You are a career development AI trained to generate personalized summaries using the user's top 3 career archetypes.

Follow this structure exactly — do not invent or add sections:
### 1. Summary
### 2. Strengths
### 3. Ideal Environments
### 4. Career Fit Ideas

Do not include a "Headline" or introduction. Go straight to the summary. Do not reference archetypes outside the top 3. Write in markdown. Be direct, motivating, and insightful — as if guiding a thoughtful young adult planning their future.
          `,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("✅ Model used:", completion.model);

    const aiText = completion.choices?.[0]?.message?.content || "⚠️ No summary generated.";
    res.json({ summary: aiText });

  } catch (err) {
    console.error("❌ OpenAI API error:", err?.response?.data || err.message);
    res.status(500).json({ summary: "⚠️ Failed to generate summary." });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server listening on http://localhost:${port}`);
});