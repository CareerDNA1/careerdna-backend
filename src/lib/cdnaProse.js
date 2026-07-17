// src/lib/cdnaProse.js
// Prompt builder for CareerDNA narrative — evidence-led, student-friendly flow.
// Hybrid rewrite: separate prose logic by item type, strict evidence discipline,
// and separate Discover More / Selection Insight prompt generation.

const ARCHETYPE_DEFINITIONS = require("./archetypeDefinitions");
const SUBDIMENSION_DEFINITIONS = require("./subdimensionDefinitions");

function skeletonList(titles = []) {
  return titles.map((title, i) => `${i + 1}) **${title}**: `).join("\n");
}

function uniqStrings(values = []) {
  const out = [];
  const seen = new Set();

  for (const value of values || []) {
    const key = String(value || "").trim();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(key);
  }

  return out;
}

function limitRelevantArchetypes(values = []) {
  return uniqStrings(values).slice(0, 3);
}

function buildRelevantSubdims(ctx = {}, hints = []) {
  const matched = uniqStrings(ctx?.matched_user_subdims || []);
  const supporting = uniqStrings(ctx?.supporting_user_subdims || []).filter(
    (name) => !matched.includes(name)
  );

  const designedRelevant = uniqStrings([
    ...(ctx?.item_core_subdims || []),
    ...(ctx?.item_relevant_subdims || []),
    ...(ctx?.preferred_relevant_subdims || []),
    ...(ctx?.core_subdims || []),
    ...(ctx?.primary_subdims || []),
    ...(ctx?.prose_subdims || []),
  ]).filter((name) => !matched.includes(name) && !supporting.includes(name));

  // Evidence lock: hints are only allowed as a final fallback when the item has
  // no explicit designed/key subdimension evidence. This prevents prose drift.
  const fallbackHints = designedRelevant.length || matched.length || supporting.length
    ? []
    : uniqStrings(hints || []);

  return uniqStrings([...matched, ...supporting, ...designedRelevant, ...fallbackHints]).slice(0, 3);
}

function enrichItem(title, archetypes = [], hints = [], ctx = {}) {
  return {
    title,
    archetypes: limitRelevantArchetypes(archetypes || []),
    subdims: buildRelevantSubdims(ctx, hints),
  };
}

function enrichHiddenSelectionGroups({
  hiddenSelectionGroups = [],
  itemArchetypes = {},
  itemSubdimContext = {},
  itemSubdimHints = {},
}) {
  return (hiddenSelectionGroups || []).map((group) => ({
    ...group,
    items: (group.items || []).map((item) => {
      const title = item?.title || "";
      const kind = item?.kind || "";
      const sourceKey = kind === "role" ? "roles" : "subjects";

      const fallback = enrichItem(
        title,
        itemArchetypes?.[sourceKey]?.[title],
        itemSubdimHints?.[sourceKey]?.[title],
        itemSubdimContext?.[sourceKey]?.[title]
      );

      return {
        ...item,
        archetypes: limitRelevantArchetypes(item?.archetypes || fallback.archetypes),
        subdims: uniqStrings(item?.subdims || item?.traits || fallback.subdims).slice(0, 3),
      };
    }),
  }));
}



function pickArchetypeDefinitions(allowedArchetypes = []) {
  const definitions = {};
  uniqStrings(allowedArchetypes).forEach((name) => {
    if (ARCHETYPE_DEFINITIONS[name]) {
      definitions[name] = ARCHETYPE_DEFINITIONS[name];
    }
  });
  return definitions;
}

function pickSubdimensionDefinitions(items = {}) {
  const used = new Set();

  Object.values(items || {}).forEach((section) => {
    (section || []).forEach((item) => {
      (item.subdims || []).forEach((name) => {
        if (name) used.add(name);
      });
    });
  });

  const definitions = {};
  used.forEach((name) => {
    if (SUBDIMENSION_DEFINITIONS[name]) {
      definitions[name] = SUBDIMENSION_DEFINITIONS[name];
    }
  });

  return definitions;
}

function buildMeta({
  archetypes = {},
  age = "",
  status = "",
  profileMode = "",
  subjects = [],
  allowedArchetypes = [],
  strengthsFixed = [],
  envsFixed = [],
  careerWorldsFixed = [],
  careerWorldsAlignedFixed = [],
  careerWorldsOtherFixed = [],
  rolesFixed = [],
  rolesAlignedFixed = [],
  rolesAdjacentFixed = [],
  subjectsFixed = [],
  subjectsBestFitFixed = [],
  subjectsOtherFixed = [],
  subjectsAlignedFixed = [],
  subjectsExploratoryFixed = [],
  specialistSubjectsFixed = [],
  itemArchetypes = {},
  itemSubdimContext = {},
  itemSubdimHints = {},
  hiddenSelectionGroups = [],
}) {
  const orderedAllowedArchetypeScores = allowedArchetypes.map((name) => ({
    name,
    score: Number(archetypes?.[name] ?? 0) || 0,
  }));

  const items = {
    strengths: strengthsFixed.map((t) =>
      enrichItem(t, itemArchetypes?.strengths?.[t], itemSubdimHints?.strengths?.[t], itemSubdimContext?.strengths?.[t])
    ),
    environments: envsFixed.map((t) =>
      enrichItem(t, itemArchetypes?.environments?.[t], itemSubdimHints?.environments?.[t], itemSubdimContext?.environments?.[t])
    ),
    career_worlds: careerWorldsFixed.map((t) =>
      enrichItem(t, itemArchetypes?.career_worlds?.[t], itemSubdimHints?.career_worlds?.[t], itemSubdimContext?.career_worlds?.[t])
    ),
    career_worlds_aligned: careerWorldsAlignedFixed.map((t) =>
      enrichItem(t, itemArchetypes?.career_worlds?.[t], itemSubdimHints?.career_worlds?.[t], itemSubdimContext?.career_worlds?.[t])
    ),
    career_worlds_other: careerWorldsOtherFixed.map((t) =>
      enrichItem(t, itemArchetypes?.career_worlds?.[t], itemSubdimHints?.career_worlds?.[t], itemSubdimContext?.career_worlds?.[t])
    ),
    subjects: subjectsFixed.map((t) =>
      enrichItem(t, itemArchetypes?.subjects?.[t], itemSubdimHints?.subjects?.[t], itemSubdimContext?.subjects?.[t])
    ),
    subjects_best_fit: subjectsBestFitFixed.map((t) =>
      enrichItem(t, itemArchetypes?.subjects?.[t], itemSubdimHints?.subjects?.[t], itemSubdimContext?.subjects?.[t])
    ),
    subjects_other: subjectsOtherFixed.map((t) =>
      enrichItem(t, itemArchetypes?.subjects?.[t], itemSubdimHints?.subjects?.[t], itemSubdimContext?.subjects?.[t])
    ),
    subjects_aligned: subjectsAlignedFixed.map((t) =>
      enrichItem(t, itemArchetypes?.subjects?.[t], itemSubdimHints?.subjects?.[t], itemSubdimContext?.subjects?.[t])
    ),
    subjects_exploratory: subjectsExploratoryFixed.map((t) =>
      enrichItem(t, itemArchetypes?.subjects?.[t], itemSubdimHints?.subjects?.[t], itemSubdimContext?.subjects?.[t])
    ),
    specialist_subjects: specialistSubjectsFixed.map((t) =>
      enrichItem(t, itemArchetypes?.subjects?.[t], itemSubdimHints?.subjects?.[t], itemSubdimContext?.subjects?.[t])
    ),
    pathways: rolesFixed.map((t) =>
      enrichItem(t, itemArchetypes?.roles?.[t], itemSubdimHints?.roles?.[t], itemSubdimContext?.roles?.[t])
    ),
    pathways_aligned: rolesAlignedFixed.map((t) =>
      enrichItem(t, itemArchetypes?.roles?.[t], itemSubdimHints?.roles?.[t], itemSubdimContext?.roles?.[t])
    ),
    pathways_adjacent: rolesAdjacentFixed.map((t) =>
      enrichItem(t, itemArchetypes?.roles?.[t], itemSubdimHints?.roles?.[t], itemSubdimContext?.roles?.[t])
    ),
  };

  return {
    user: { status, profileMode, age, subjects },
    allowed: {
      archetypes: allowedArchetypes,
      archetype_scores: orderedAllowedArchetypeScores,
      archetype_definitions: pickArchetypeDefinitions(allowedArchetypes),
      subdimension_definitions: pickSubdimensionDefinitions(items),
    },
    items,
    hidden_selection_groups: enrichHiddenSelectionGroups({
      hiddenSelectionGroups,
      itemArchetypes,
      itemSubdimContext,
      itemSubdimHints,
    }),
  };
}

function getReportInstructions(profileMode = "", status = "") {
  const isSchool = status === "school";
  const isSchoolInterest = profileMode === "school_interest";
  const isUndergraduate = !isSchool;
  const careerDirectionLabel = isUndergraduate ? "career pathways" : "career worlds";

  return `
You are writing a highly personalised CareerDNA report for a student.
Your job is to explain why the selected strengths, environments, and career directions fit this person, using only the evidence supplied in META.
Each bullet must stand on its own. Do not refer to other bullets by number or title.

EVIDENCE RULES
- Use only the archetypes and traits supplied in META for that specific item.
- Refer to archetypes as profiles, for example "your Thinker profile" or "your Creator and Visionary profiles".
- Refer to subdimensions as traits, using the exact supplied names, for example "your Analytical Curiosity" or "your Technical Curiosity".
- Use META.allowed.archetype_definitions to understand what each supplied profile means, but do not quote or expose the definitions directly.
- Use META.allowed.subdimension_definitions to understand what each supplied trait means, but do not quote or expose the definitions directly.
- Do not define traits in general terms. For every supplied trait, explain how it appears in the specific item being written about.
- Trait explanations must connect trait → specific activity, task, challenge, decision, or output in that item.
- Do not invent achievements, exam choices, projects, personal history, job experience, traits, motives, values, or abilities.
- Never mention internal metadata language such as matched pair, canonical pair, primary subdimensions, core subdimensions, preferred relevant subdimensions, supporting subdimensions, source of pair, scoring, or weighting.
- Never use the word "energy".
- Preserve the section headings, item order, numbering, and markdown structure exactly as provided.
- Write directly to the student using "you" and "your". Do not use "one", "the person", or "the student" in the visible report.
- If an item has three supplied traits in its subdims array, you MUST mention all three exact trait names in that item paragraph.
- If an item has two supplied traits in its subdims array, you MUST mention both exact trait names in that item paragraph.
- If an item has one supplied trait in its subdims array, you MUST mention that exact trait name in that item paragraph.
- Do not silently drop supplied traits.
- Do not paraphrase trait names. Use the exact names supplied in META.

STYLE RULES
- Write in clear, natural English that a student and parent can both understand.
- Keep the tone personal, thoughtful, practical, and grounded in real behaviour.
- Do not sound like generic career advice, a job advert, or a Wikipedia definition.
- Avoid empty verdicts such as "you will thrive", "this aligns well", "well-suited", "this suits you perfectly", or "this combination means" unless the sentence explains the mechanism clearly.
- Every item must include at least one concrete detail about what people do, what students study, what problems they solve, what decisions they make, what outputs they create, or how the experience feels in practice.
- If a paragraph could apply to several different items with only the title changed, make it more specific.
- Vary sentence openings and rhythm across nearby bullets.
- Do not repeat the item title immediately after the bullet heading. After "**Title**:" begin naturally with "This strength...", "This environment...", "This world...", "This pathway...", "This degree...", "This role...", or similar.
- Never attribute internal motivation, desire, or drive to the person. Do not write phrases such as "drives your desire", "drives you to", "motivates you to", "you are motivated to", "pushes you to", "compels you to", or "you are driven to". Use only what can be inferred from the trait: ability ("your X means you can...", "your X allows you to..."), tendency ("you tend to", "you naturally..."), fit ("may suit you", "could feel like a natural fit"), or potential enjoyment ("you may find this rewarding", "you might naturally find engaging").
- Never open or close a sentence with collective trait summaries such as "Together, these traits enable you to...", "These traits combine to...", or "Together, these profiles...". Each sentence must explain a specific mechanism or connection — not bundle traits into a generic endpoint.

SUMMARY RULES
- Write exactly 5 sentences in one paragraph.
- Sentence 1 must start with: "Your CareerDNA blends" and must name the supplied profiles from META.allowed.archetypes. The profile names should be in bold.
- Sentence 1 must end by referring to them as "career profiles", not "archetypes".
- Sentence 2 must state "Your strongest traits are" and provide all subdimensions supplied in META.allowed or META.
- Sentence 3 must explain broadly how these traits translate to the person's key strengths and preferred work environments that are mentioned in the strengths and environments section.
- Sentence 4 must explain broadly what type of ${careerDirectionLabel} this combination may draw them towards.
- Sentence 5 must state exactly: "The next sections delve into specific strengths, environments, and ${careerDirectionLabel} that fit your profile."
- Each sentence should feel like a natural continuation of the previous sentence.
- Do not use bullet points in the summary.

SECTION-SPECIFIC RULES

1) STRENGTHS
Purpose: Explain how this person naturally performs at their best in real situations.

Write 5 sentences per item.

Sentence 1: describe what this person actually tends to do when using this strength in practice (specific actions, not general descriptions)
Sentence 2: explain what this allows you to do in practice (what improves, what becomes easier, or what you can do that others might struggle with)
Sentence 3: explain how the supplied profiles make this a natural strength for you, by connecting the nature of the profiles to the specific actions or tendencies described in Sentence 1.
Sentence 4: explicitly connect every supplied trait in the item's subdims array to how they apply this strength in practice. Use ability or tendency language — never say a trait "drives you to" or "pushes you to" anything. For example, if the strength is "Creative Problem Solving" and the traits are "Analytical Curiosity" and "Technical Curiosity", you might say: "Your Analytical Curiosity means you naturally explore problems from multiple angles, often approaching complex challenges with a systematic mindset, while your Technical Curiosity means you can find practical solutions by experimenting with tools and methods."
Sentence 5: provide 2-3 concrete examples the most relevant to this strength work environments or career worlds drawing from section 2 where this strength would be especially useful or energising for you. For example, if the strength is "Creative Problem Solving", you might say: "This strength would be especially useful in work environments that require innovative thinking and tackling complex challenges, such as in technology startups, research and development teams, or strategic roles in dynamic industries.
Each sentence should feel like a natural continuation of the previous sentence.

2) IDEAL ENVIRONMENTS
Purpose: Explain it what kind of work environment this person performs best and feels most comfortable.
Write 4 sentences per item.
Sentence 1: explain what this work environment is actually like in real-world settings.
Sentence 2: provide some examples of real settings that embody this environment.
Sentence 3: explain what the supplied profiles are linked to your preference or needs in this environment.
Sentence 4: explain how the supplied traits in the item's subdims array can make this setting feel comfortable, productive or motivating.
Each sentence should feel like a natural continuation of the previous sentence.

3) CAREER WORLDS
Purpose: Explain a broad career direction of work for school users. The tone should feel inspiring and directional, but grounded and specific.
Remember: a career world is not a specific job and not a university degree. It is a broad career direction.
Write exactly 6 sentences per item.
Sentence 1: explain what this career world involves in plain English.
Sentence 2: explain what professionals actually do in it, including typical tasks, problems, outputs, or decisions.
Sentence 3: explain why this world matters in practice, using concrete real-world problems or outcomes.
Sentence 4: explain why the supplied profiles suggest the person may be drawn to this world, by linking the profile combination to the nature of the work.
Sentence 5: explain how the single most relevant supplied could makes this career world rewarding or satisfying, based on the definition in META.allowed.subdimension_definitions. 
Sentence 6: explain how the remaining supplied traits connect to specific aspects of this career world, again preserving each trait’s definition and using reward, preference, interest, or ability language only where appropriate.

Each sentence should feel like a natural continuation of the previous sentence.
Do not combine Sentence 5 and Sentence 6. Sentence 6 must always be present.




4) CAREER PATHWAYS
Purpose: Explain a direction of professional work for university users. Remember: a pathway is broader than a single role, but more specific than a career world.
Write 6 sentences per item.
Sentence 1: explain what this pathway typically involves in professional terminology.
Sentence 2: explain what professionals actually do in this pathway, including the work, tasks, problems, outputs, decisions, or responsibilities involved.
Sentence 3: explain why this world matters in practice, using concrete real-world problems or outcomes.
Sentence 4: explain why the supplied profiles suggest the person may be drawn to this pathway, by linking the profile combination to the nature of the work.
Sentence 5: explain how the most relevant supplied trait could make this pathway rewarding or satisfying, based on the definition in META.allowed.subdimension_definitions. 
Sentence 6: explain how the remaining supplied traits connect to specific aspects of the pathway, again preserving each trait’s definition and using reward, preference, interest, or ability language only where appropriate.
Each sentence should feel like a natural continuation of the previous sentence.
Do not combine Sentence 5 and Sentence 6. Sentence 6 must always be present.



SECTION COUNTS
- Summary: 1 paragraph, 5 sentences.
- Strengths: use every item provided and write one bullet per item.
- Ideal Environments: use every item provided and write one bullet per item.
- ${isUndergraduate ? "Career Pathways" : "Career Worlds"}: use every item provided and write one bullet per item.
${isSchoolInterest ? "- Career Worlds Most Aligned With Your Interest Area and Other Career Worlds to Explore: keep the subsections distinct and use every item provided." : ""}
${isUndergraduate ? "- Career Pathways only. Do not add a Career Worlds section to the visible report." : ""}
${isUndergraduate ? "- For university users, keep the visible Career Pathways section split into the exact subsections supplied in the skeleton: Career Pathways Most Aligned With Your Subject Area and Adjacent Career Pathways to Explore." : ""}
${isUndergraduate ? "- Use only META.items.pathways_aligned for Career Pathways Most Aligned With Your Subject Area, and only META.items.pathways_adjacent for Adjacent Career Pathways to Explore. Do not merge, rename, hide, or move adjacent pathways into the aligned section." : ""}

FINAL QUALITY CHECK
- Strengths should sound like patterns in how the person works well.
- Environments should sound like settings that help the person feel comfortable and perform well.
- Career worlds should sound like broad future directions.
- Career pathways should sound like professional directions.
- Subjects should sound like undergraduate degrees.
- Roles should sound like specific work people actually do.
- The final sentence of each item should explain the practical reason the item fits, not end with a slogan or generic verdict.
`;
}

function getSelectionNarrativeInstructions(status = "") {
  const isSchool = status === "school";

  const common = `
You are writing hidden CareerDNA drill-down narratives for the Discover More / Selection Insight Explorer section.
Return JSON only. No markdown, no commentary, no code fence.

STRICT OUTPUT SHAPE
{
  "groups": [
    {
      "parentId": "...",
      "parentTitle": "...",
      "parentType": "...",
      "items": [
        {
          "id": "...",
          "title": "...",
          "relation": "...",
          "kind": "...",
          "parentId": "...",
          "parentTitle": "...",
          "parentType": "...",
          "fullSummary": "..."
        }
      ]
    }
  ]
}

EVIDENCE RULES
- Use META.hidden_selection_groups exactly. Do not add, remove, rename, or reorder groups or items.
- For each hidden item, use only that item's own archetypes and subdims arrays.
- Do not borrow evidence from the parent world/pathway or from the user's wider profile.
- Refer to archetypes as profiles, for example "your Thinker profile".
- Refer to subdims as traits, using the exact supplied names.
- Do not mention scoring, metadata, internal logic, relation labels, or matching mechanics.
- Never use the word "energy".
- If an item has three supplied traits, mention all three exact trait names.
- If an item has two supplied traits, mention both exact trait names.
- If an item has one supplied trait, mention that exact trait name.
- Do not paraphrase trait names.
- Do NOT use these phrases anywhere: "aligns well", "well-suited", "great fit", "perfect fit", "find joy", "find satisfaction", "impactful", "valuable outcomes", "shape the future".
- Make the summary specific to the item. It should not sound reusable across several subjects or roles.
- Hidden summaries must describe the specific item, not repeat the parent career world/pathway summary.
`;

  if (isSchool) {
    return `${common}



SUBJECTS / UNIVERSITY DEGREES
Purpose: Explain what studying this undergraduate subject actually involves in concrete academic terms and why it fits.
Write one fullSummary for every hidden subject / university degree.
Write 5 sentences per item.
Sentence 1: explain what this degree subject is about as a career direction.
Sentence 2: explain what students actually study or do, such as modules, projects, methods, practical work, reading, research, technical work, design work, analysis.
Sentence 3: explain why the supplied profiles fit this subject. 
Sentence 4: explain how 2-3 of the key supplied traits could contribute to enjoying, engaging with, and succeeding in studying this particular subject.
Sentence 5: explain why this degree is a good future direction and how one can make an impact to the world by studying and working in this subject area, using concrete examples of problems one could solve or outcomes one could achieve by pursuing this subject.
Each sentence should feel like a natural continuation of the previous sentence.

`;
  }

  return `${common}


ROLES
Purpose: Explain a specific job or graduate role. Be concrete and real. Do not sound like a generic job description.
Write one fullSummary for every hidden role.
Write 5 sentences per item.
Sentence 1: explain what this role involves day to day.
Sentence 2: explain the tasks, decisions, outputs, or responsibilities that define it.
Sentence 3: explain why the supplied profiles are naturally drawn to this kind of work or makes this role satisfying for them specifically.
Sentence 4: explain how the supplied traits help them operate effectively and enjoy the role.
Sentence 5: explain why this role is a good future direction and how one can make an impact to the world by working in this role, using concrete examples of problems one could solve or outcomes one could achieve by pursuing this role.

Each sentence should feel like a natural continuation of the previous sentence.

`;
}


function buildReportPrompt(payload = {}) {
  const {
    status = "",
    profileMode = "",
    strengthsFixed = [],
    envsFixed = [],
    careerWorldsFixed = [],
    careerWorldsAlignedFixed = [],
    careerWorldsOtherFixed = [],
    rolesFixed = [],
    rolesAlignedFixed = [],
    rolesAdjacentFixed = [],
  } = payload;

  const instructions = getReportInstructions(profileMode, status);
  const meta = buildMeta(payload);
  const header = `
[META START]
${JSON.stringify(meta)}
[META END]

${instructions}

## Summary
`;

  if (status === "school") {
    const schoolInterest = profileMode === "school_interest";

    const careerWorldSection = schoolInterest
      ? `
## Career Worlds Most Aligned With Your Interest Area
${skeletonList(careerWorldsAlignedFixed)}

## Other Career Worlds to Explore
${skeletonList(careerWorldsOtherFixed)}`
      : `
## Career Worlds
${skeletonList(careerWorldsFixed)}`;

    return `
${header}

## Strengths
${skeletonList(strengthsFixed)}

## Ideal Environments
${skeletonList(envsFixed)}${careerWorldSection}
`;
  }

  return `
${header}

## Strengths
${skeletonList(strengthsFixed)}

## Ideal Environments
${skeletonList(envsFixed)}

## Career Pathways Most Aligned With Your Subject Area
${skeletonList(rolesAlignedFixed.length ? rolesAlignedFixed : rolesFixed)}

## Adjacent Career Pathways to Explore
${skeletonList(rolesAdjacentFixed)}
`;
}

function buildSelectionNarrativesPrompt(payload = {}) {
  const meta = buildMeta(payload);

  return `
[META START]
${JSON.stringify({ hidden_selection_groups: meta.hidden_selection_groups })}
[META END]

${getSelectionNarrativeInstructions(payload.status)}
`;
}

module.exports = {
  buildReportPrompt,
  buildSelectionNarrativesPrompt,
};
