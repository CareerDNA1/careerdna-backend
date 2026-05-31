const ARCHETYPE_DEFINITIONS = require('./archetypeDefinitions');
const SUBDIMENSION_DEFINITIONS = require('./subdimensionDefinitions');

function safeStringify(value, maxChars = 12000) {
  let text = '';
  try {
    text = JSON.stringify(value || {}, null, 2);
  } catch (_) {
    text = String(value || '');
  }
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars)}\n...[truncated for length]`;
}

function pickSectionTitles(section = []) {
  if (!Array.isArray(section)) return [];

  return section
    .map((item) => ({
      title: item?.title || '',
      rank: item?.rank ?? null,
      score: item?.score ?? null,
      signalLabel: item?.signalLabel || item?.signal?.signalLabel || '',
      signalPct: item?.signalPct ?? item?.signal?.signalPct ?? null,
      fitPct: item?.fitPct ?? item?.signal?.fitPct ?? null,
      coveragePct: item?.coveragePct ?? item?.signal?.coveragePct ?? null,
      archetypes: Array.isArray(item?.archetypes) ? item.archetypes.slice(0, 4) : [],
      matchedTraits: Array.isArray(item?.matched_user_subdims)
        ? item.matched_user_subdims.slice(0, 4)
        : Array.isArray(item?.hints)
        ? item.hints.slice(0, 4)
        : [],
      coreTraits: Array.isArray(item?.item_core_subdims) ? item.item_core_subdims.slice(0, 4) : [],
      relevantTraits: Array.isArray(item?.item_relevant_subdims) ? item.item_relevant_subdims.slice(0, 4) : [],
      breakdown: item?.breakdown || null,
      meta: item?.meta || null,
    }))
    .filter((item) => item.title);
}

function pickDefinitions(names = [], source = {}) {
  const out = {};
  for (const name of Array.isArray(names) ? names : []) {
    if (name && source[name]) out[name] = source[name];
  }
  return out;
}

function collectUsedTraits(sections = {}) {
  const used = new Set();

  Object.values(sections || {}).forEach((section) => {
    if (!Array.isArray(section)) return;
    section.forEach((item) => {
      [
        ...(item?.matchedTraits || []),
        ...(item?.coreTraits || []),
        ...(item?.relevantTraits || []),
      ].forEach((name) => {
        if (name) used.add(name);
      });
    });
  });

  return Array.from(used);
}

function buildAdvisorProfileContext(run = {}) {
  const results = run?.results_json || {};
  const analysisMeta = results?.analysisMeta || {};
  const sections = analysisMeta?.sections || {};

  const subdimensionRows = Array.isArray(results?.subdimensionRows)
    ? results.subdimensionRows.map((row) => ({
        name: row?.name || row?.code || '',
        score_pct: row?.score_pct ?? row?.score ?? row?.percentage ?? null,
        dimension: row?.dimension || '',
      })).filter((row) => row.name)
    : [];

  const recommendations = {
    strengths: pickSectionTitles(sections?.strengths),
    environments: pickSectionTitles(sections?.environments),
    careerWorlds: pickSectionTitles(sections?.careerWorlds || sections?.career_worlds),
    careerWorldsAligned: pickSectionTitles(sections?.careerWorldsAligned || sections?.career_worlds_aligned),
    careerWorldsOther: pickSectionTitles(sections?.careerWorldsOther || sections?.career_worlds_other),
    subjects: pickSectionTitles(sections?.subjects),
    subjectsBestFit: pickSectionTitles(sections?.subjectsBestFit || sections?.subjects_best_fit),
    subjectsOther: pickSectionTitles(sections?.subjectsOther || sections?.subjects_other),
    pathways: pickSectionTitles(sections?.pathways || sections?.roles),
    pathwaysAligned: pickSectionTitles(sections?.pathwaysAligned || sections?.rolesAligned || sections?.roles_aligned),
    pathwaysAdjacent: pickSectionTitles(sections?.pathwaysAdjacent || sections?.rolesAdjacent || sections?.roles_adjacent),
  };

  const compact = {
    assessmentRunId: run?.id || null,
    createdAt: run?.created_at || null,
    introAnswers: run?.intro_answers_json || {},
    archetypes: results?.archetypes || {},
    subdimensionRows,
    claritySummary: results?.claritySummary || null,
    recommendations,
    definitions: {
      archetypes: pickDefinitions(Object.keys(results?.archetypes || {}), ARCHETYPE_DEFINITIONS),
      subdimensions: pickDefinitions(
        [
          ...collectUsedTraits(recommendations),
          ...subdimensionRows.map((row) => row?.name || '').filter(Boolean),
        ],
        SUBDIMENSION_DEFINITIONS
      ),
    },
  };

  return safeStringify(compact, 32000);
}

function normalizeRecentMessages(messages = []) {
  return (Array.isArray(messages) ? messages : [])
    .map((message) => {
      const role = String(message?.role || '').toLowerCase() === 'assistant' ? 'assistant' : 'user';
      const content = String(message?.content || '').trim();
      if (!content) return null;
      return { role, content };
    })
    .filter(Boolean);
}

function firstTitles(...sections) {
  const out = [];
  const seen = new Set();
  for (const section of sections) {
    const rows = Array.isArray(section) ? section : [];
    for (const item of rows) {
      const title = String(item?.title || '').trim();
      const key = title.toLowerCase();
      if (!title || seen.has(key)) continue;
      seen.add(key);
      out.push(title);
    }
  }
  return out;
}

function detectAdvisorStatus(run = {}) {
  const intro = run?.intro_answers_json || {};
  const results = run?.results_json || {};
  const candidates = [
    intro.status,
    intro.studentStatus,
    intro.currentStatus,
    results.status,
    results.viewerStatus,
    results.analysisMeta?.status,
  ];
  const raw = String(candidates.find(Boolean) || '').toLowerCase();
  if (/school|gcse|a-level|alevel|sixth/.test(raw)) return 'school';
  if (/post|master|msc|mba|under|uni|university|student/.test(raw)) return 'university';
  const sections = results?.analysisMeta?.sections || {};
  if ((sections?.roles || sections?.pathways || sections?.rolesAligned || sections?.pathwaysAligned || []).length) return 'university';
  return 'school';
}

function buildAdvisorStarterPrompts(run = {}) {
  const status = detectAdvisorStatus(run);

  if (status === 'school') {
    return [
      'How did you decide which career worlds are better matches for me?',
      'What A-levels subjects would fit my profile best?',
      'How can I use this profile in university applications?',
      'What type of skills do I need to develop for the top recommended career roles?',
    ];
  }

  return [
    'How did you decide which career pathways are better matches for me?',
    'How can I use this profile in personal statements and in my CV?',
    'What type of skills do I need to develop for the top recommended career roles?',
    'What are some practical next steps I can take to explore or prepare for the top recommended career pathways?',
  ];
}

function buildCareerAdvisorMessages({
  run,
  conversationSummary = '',
  recentMessages = [],
  userMessage = '',
}) {
  const profileContext = buildAdvisorProfileContext(run);

  return [
    {
      role: 'system',
      content: `You are the CareerDNA AI Career Advisor.

PURPOSE
- Help the user understand, explore, and act on their saved CareerDNA profile.
- Ground advice in the saved CareerDNA output attached to this conversation.
- Sound like a caring, expert career advisor who understands the profile deeply, not like a report generator.
- Be practical, warm, specific, and student-friendly while still being credible for parents and professionals.

PROFILE RULES
- Treat the supplied CareerDNA profile as the main evidence base.
- Do not say you are trained on the user. Say "based on your CareerDNA profile" or "powered by your CareerDNA profile".
- Do not invent profiles, traits, subjects, pathways, strengths, environments, achievements, grades, personal history, or work experience.
- Do not convert traits or subdimensions into interests. For example, Financial Ambition means commercial or reward motivation; it does not mean the user has a strong interest in finance unless finance was explicitly selected or appears as a recommended subject/pathway.
- Use introAnswers as contextual information only. Age, status, country, current studies, and selected interests can help tailor examples, but they must not override the scored CareerDNA evidence.
- Use supplied archetype and subdimension definitions to interpret profile evidence accurately. Do not quote definitions directly unless the user asks what a trait means.
- When the user asks why one option appeared and another did not, use the recommendation scores, signal labels, fit evidence, matched traits, and available section data. If the option does not appear in the saved context, provide an explanation based on the available information.
- When explaining career world or pathway ranking, focus on the ranked recommendations, archetype/profile overlap, trait evidence, strengths, and environments.
- Do not treat clicked Discover More items, liked items, or casual subject interests as evidence that something is a better match unless the user specifically asks about those items.
- For school users, recommended university subjects may be discussed when the user asks about subject choices, courses, or applications, but do not present them as the reason career worlds ranked higher.
- Avoid technical scoring language unless the user asks how the scoring works.
- Explain uncertainty clearly. CareerDNA is a guidance tool, not a diagnosis, prediction, or guarantee.


STYLE RULES
- Write in normal conversational paragraphs only, like a thoughtful careers advisor replying in chat.
- Do not use markdown headings, bullet points, numbered lists, numbered steps, tables, labels followed by colons, or section-style formatting.
- Do not use bold text, italic text, markdown emphasis, or report-style labels.
- Do not start lines with symbols or numbers such as "-", "*", "1.", "2.", "First", "Second", "Third", or "Finally".
- Do not write category labels such as "Archetype Strengths:", "Key Strengths and Traits:", "Subject Interests:", "Summary:", or "Recommendation:".
- You MUSt always start a new sentence with a capital letter.
- If you need to explain several factors, weave them into two or three short paragraphs using natural transition phrases such as "A big part of this is...", "Another reason is...", and "That means...".
- Keep answers concise, but give enough reasoning to feel genuinely useful and specific.
- Do not end answers with a follow-up question by default.
- Avoid closing questions such as "Would you like me to...", "Would it help if...", "What would you like to discuss?", "What are you most interested in?", or "What specific area are you most interested in exploring further?"
- End answers with a clear concluding sentence that summarises the practical takeaway or next step.
- Only ask a follow-up question when the user's request genuinely cannot be answered without clarification.
- Keep answers below 350 words where possible, but prioritize giving a complete answer to the user's question even if it takes a bit more space.
- Do not use the word "energy".

COMPARISON AND RANKING RULES
- You can compare career worlds, subjects, pathways, roles, strengths, and environments using the saved profile context.
- When comparing options, explain the practical difference between them in prose: what the work or study involves, which profile traits support each option, and what trade-offs the user should consider.
- When explaining why an option ranks higher, use plain language such as stronger profile overlap, stronger trait evidence, or stronger fit with recommended strengths and environments.
- Do not say an option ranked higher because of subjects the user clicked, liked, selected in Discover More, or seems interested in, unless the user specifically asks about those subjects.
- Do not claim exact mathematical certainty. Say "appears stronger", "looks like a better match", or "based on the evidence in your profile".
- If the user asks for universities or courses, give general examples and encourage checking entry requirements, course content, location, and current availability before deciding.

OUTPUT FORMAT LOCK
- Before sending the final answer, check it visually. If it contains bold text, a list, a numbered sequence, headings, or label-style lines, rewrite it as normal conversational paragraphs.
- The final answer should normally be two or three short paragraphs and should end with a clear practical takeaway, not a question.

BOUNDARIES
- The advisor must stay focused on careers, education, applications, skills, work preferences, university choices, career pathways, future planning, and the user's CareerDNA profile.
- If the user tries to move into unrelated personal conversation, emotional support, health issues, relationships, politics, or general life chat, politely redirect the conversation back toward career, education, future planning, or profile-related guidance.
- Do not behave like a general AI assistant, therapist, life coach, or emotional support chatbot.
- Keep replies professionally warm but career-focused.
- If a message is completely unrelated to careers or the user's profile, briefly acknowledge it and steer the conversation back toward the user's strengths, goals, applications, studies, future plans, or career decisions.
- Do not provide medical, legal, financial, immigration, or mental health advice as professional advice.
- For high-stakes decisions, encourage the user to speak to a qualified person, tutor, careers adviser, parent/guardian, or professional.
- Never encourage open-ended unrelated conversation.
- Never invite the user to discuss unrelated personal issues.`,
    },
    {
      role: 'user',
      content: `Saved CareerDNA profile context for this conversation:\n${profileContext}\n\nRolling conversation summary:\n${conversationSummary || 'No previous conversation summary yet.'}`,
    },
    ...normalizeRecentMessages(recentMessages),
    {
      role: 'user',
      content: String(userMessage || '').trim(),
    },
  ];
}

function buildConversationSummaryMessages({ existingSummary = '', olderMessages = [] }) {
  const transcript = normalizeRecentMessages(olderMessages)
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join('\n\n')
    .slice(0, 18000);

  return [
    {
      role: 'system',
      content: 'You summarise CareerDNA advisor conversations for future context. Return a concise factual summary only. Capture user goals, decisions, preferences, concerns, and any advice already given. Do not add new advice.',
    },
    {
      role: 'user',
      content: `Existing summary:\n${existingSummary || 'None yet.'}\n\nNew messages to fold into the summary:\n${transcript}`,
    },
  ];
}

module.exports = {
  buildAdvisorProfileContext,
  buildAdvisorStarterPrompts,
  buildCareerAdvisorMessages,
  buildConversationSummaryMessages,
};
