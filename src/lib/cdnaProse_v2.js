// src/lib/cdnaProse_v2.js
// Prompt builder v2 — adviser voice, coverage obligations, no rigid sentence slots.
//
// KEY CHANGES FROM v1 (cdnaProse.js):
//   - Adviser voice: expert careers adviser speaking directly to a student
//   - No sentence-slot assignments — coverage obligations let the LLM write naturally
//   - Separate instructions for aligned vs adjacent pathways (tone + length differ)
//   - primarySubdims / supportingSubdims distinction in META — LLM weights emphasis accordingly
//   - matchTier per item (primary / adjacent / exploratory) passed to LLM
//   - Expanded banned phrases — catches the formulaic openers v1 was generating
//   - Definitions instruction: draw on specifics, not verbatim, not general paraphrase
//   - Summary: content obligations only, no mandated verbatim sentence openers
//   - Selection narratives: same improvements + strengthened banned phrase list
//
// To activate: in index.js change require("./src/lib/cdnaProse") to require("./src/lib/cdnaProse_v2")

"use strict";

const ARCHETYPE_DEFINITIONS = require("./archetypeDefinitions");
const SUBDIMENSION_DEFINITIONS = require("./subdimensionDefinitions");
const { PATHWAY_DESCRIPTIONS } = require("./pathwayDescriptions");

// ─── helpers ──────────────────────────────────────────────────────────────────

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

  // Hints are only used when no designed evidence exists at all.
  const fallbackHints =
    designedRelevant.length || matched.length || supporting.length
      ? []
      : uniqStrings(hints || []);

  return uniqStrings([
    ...matched,
    ...supporting,
    ...designedRelevant,
    ...fallbackHints,
  ]).slice(0, 5);
}

// enrichItemV2: surfaces strong_user_subdims as primarySubdims so the LLM
// knows which traits to emphasise most vs. mention more briefly.
function enrichItemV2(title, archetypes = [], hints = [], ctx = {}) {
  const subdims = buildRelevantSubdims(ctx, hints);
  // strong_user_subdims: subdims where the user's score meets the min threshold
  const primary = uniqStrings(ctx?.strong_user_subdims || []).filter((s) =>
    subdims.includes(s)
  );
  const supportingSubdims = subdims.filter((s) => !primary.includes(s));

  return {
    title,
    archetypes: limitRelevantArchetypes(archetypes || []),
    subdims,                          // full list (keeps backward compat)
    primarySubdims: primary,          // strongest user matches — emphasise these
    supportingSubdims,                // relevant but weaker — mention, can be briefer
  };
}

function enrichHiddenSelectionGroupsV2({
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

      const fallback = enrichItemV2(
        title,
        itemArchetypes?.[sourceKey]?.[title],
        itemSubdimHints?.[sourceKey]?.[title],
        itemSubdimContext?.[sourceKey]?.[title]
      );

      return {
        ...item,
        archetypes: limitRelevantArchetypes(item?.archetypes || fallback.archetypes),
        subdims: uniqStrings(item?.subdims || item?.traits || fallback.subdims).slice(0, 3),
        primarySubdims: fallback.primarySubdims,
        supportingSubdims: fallback.supportingSubdims,
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

// ─── buildMeta ────────────────────────────────────────────────────────────────

function buildMeta({
  archetypes = {},
  age = "",
  status = "",
  profileMode = "",
  subjects = [],
  allowedArchetypes = [],
  topSubdimProfile = [],
  subdimScores = [],
  strengthsFixed = [],
  envsFixed = [],
  careerWorldsFixed = [],
  careerWorldsAlignedFixed = [],
  careerWorldsOtherFixed = [],
  rolesFixed = [],
  rolesAlignedFixed = [],
  rolesAdjacentFixed = [],
  rolesContextFixed = [],
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

  // Enrich an item and attach its matchTier so the LLM can calibrate tone.
  // Also injects item.description from pathwayDescriptions lookup for grounding.
  function enrich(t, sourceKey, matchTier) {
    const description = PATHWAY_DESCRIPTIONS[t] || null;
    return {
      ...enrichItemV2(
        t,
        itemArchetypes?.[sourceKey]?.[t],
        itemSubdimHints?.[sourceKey]?.[t],
        itemSubdimContext?.[sourceKey]?.[t]
      ),
      matchTier,
      ...(description ? { description } : {}),
    };
  }

  const items = {
    strengths: strengthsFixed.map((t) => enrich(t, "strengths", "primary")),
    environments: envsFixed.map((t) => enrich(t, "environments", "primary")),
    career_worlds: careerWorldsFixed.map((t) => enrich(t, "career_worlds", "primary")),
    career_worlds_aligned: careerWorldsAlignedFixed.map((t) => enrich(t, "career_worlds", "primary")),
    career_worlds_other: careerWorldsOtherFixed.map((t) => enrich(t, "career_worlds", "exploratory")),
    subjects: subjectsFixed.map((t) => enrich(t, "subjects", "primary")),
    subjects_best_fit: subjectsBestFitFixed.map((t) => enrich(t, "subjects", "primary")),
    subjects_other: subjectsOtherFixed.map((t) => enrich(t, "subjects", "exploratory")),
    subjects_aligned: subjectsAlignedFixed.map((t) => enrich(t, "subjects", "primary")),
    subjects_exploratory: subjectsExploratoryFixed.map((t) => enrich(t, "subjects", "exploratory")),
    specialist_subjects: specialistSubjectsFixed.map((t) => enrich(t, "subjects", "primary")),
    pathways: rolesFixed.map((t) => enrich(t, "roles", "primary")),
    // Aligned pathways: confident fit — full treatment
    pathways_aligned: rolesAlignedFixed.map((t) => enrich(t, "roles", "primary")),
    // Adjacent pathways: broader reach — curious, open tone
    pathways_adjacent: rolesAdjacentFixed.map((t) => enrich(t, "roles", "adjacent")),
    // Context pathways: aligned pathways filtered to Good or better — used by summary, strengths, environments
    pathways_context: rolesContextFixed.map((t) => enrich(t, "roles", "primary")),
  };

  return {
    user: { status, profileMode, age, subjects },
    allowed: {
      archetypes: allowedArchetypes,
      archetype_scores: orderedAllowedArchetypeScores,
      archetype_definitions: pickArchetypeDefinitions(allowedArchetypes),
      subdimension_definitions: pickSubdimensionDefinitions(items),
      // top_subdims: the student's actual ranked trait scores — use these (and only these) when listing the student's traits in the Summary.
      top_subdims: (subdimScores.length ? subdimScores : topSubdimProfile).map((x) => ({ name: x.name, score: x.score ?? x.pct ?? 0 })),
    },
    items,
    hidden_selection_groups: enrichHiddenSelectionGroupsV2({
      hiddenSelectionGroups,
      itemArchetypes,
      itemSubdimContext,
      itemSubdimHints,
    }),
  };
}

// ─── report instructions ──────────────────────────────────────────────────────

function getReportInstructions(profileMode = "", status = "") {
  const isSchool = status === "school";
  const isSchoolInterest = profileMode === "school_interest";
  const isUndergraduate = !isSchool;
  const careerDirectionLabel = isUndergraduate ? "career pathways" : "career worlds";

  return `
You are an expert careers adviser writing a personalised CareerDNA report directly to a student.

Your voice is knowledgeable, warm, and specific. Write as though you have read this student's results carefully and you are telling them something true and useful about who they are and where they might go — not generating a generic career description. Every paragraph should feel like it was written for this particular student, not assembled from a template.

A good careers adviser is encouraging without being vague, concrete without being clinical, and expert without being distant. That is the voice to aim for throughout.

When a student's profile has a distinctive combination of archetypes, name what makes that combination specific and unusual — not just what each profile means in isolation, but what it means that this person has all of them together. A Creator-Thinker-Visionary is a different kind of person from a Creator alone or a Thinker alone. The student should feel that something particular about how they are wired has been seen and named — not just that each of their archetypes has been described correctly. Recognition is as important as accuracy.

ABSOLUTE RULE — DASHES ARE FORBIDDEN
Do not use em-dashes (—), en-dashes (–), or hyphens used as dashes anywhere in this report. This applies to every sentence in every section, including the summary. There are no exceptions.
If you would use a dash, you must rewrite the sentence:
  WRONG: "you dig deeply—following threads wherever they lead"
  RIGHT: "you dig deeply, following threads wherever they lead"
  WRONG: "influence outcomes—often in environments like this"
  RIGHT: "influence outcomes, often in environments like this"
  WRONG: "rare combination—analytical rigour and creative thinking"
  RIGHT: "rare combination of analytical rigour and creative thinking"
Use a comma, a colon, or restructure the clause. A dash in any form is a failure.

SYNTHESIS RULE — READ THIS FIRST
Coverage obligations (mentioning traits, examples, worlds) are floors, not ceilings. The goal is not to produce a paragraph that mentions everything — it is to produce a paragraph that says something true and specific about this student that they will recognise as their own experience.

Trait names should appear as evidence for observations you are making, not as the observations themselves. If you find yourself writing "your X helps you..., your Y helps you..., your Z helps you..." in sequence, you are enumerating, not synthesising. Stop and find a unified observation that these traits together explain, then let the trait names appear as evidence for it.

The most common enumeration failure is the one-trait-per-sentence pattern: "Your Analytical Curiosity means you dig into details. Your Independence lets you work through this alone. Your Originality means you look for unexpected connections." This assigns each trait its own sentence with its own "your X means/lets/helps/ensures/gives" clause. A paragraph with four traits and four sentences each beginning "your X [verb]" is trait enumeration no matter which verbs are used. Instead, write sentences that make observations about how this student works or what this item requires, and bring trait names in as evidence — two traits can appear in the same sentence as joint evidence for one observation; a trait name can appear mid-sentence rather than leading it.

A sentence that accurately names a trait but says nothing new is weaker than a sentence that makes something true about this person vivid and concrete. Aim for paragraphs where the student reads it and thinks "yes, that is exactly how I work" — not "yes, I have those traits listed."

Practical specificity means concrete enough that the student can picture a real moment. Not "you can investigate a problem deeply" — but something specific enough to be recognisable: "when a line of data raises more questions than it answers" or "when a design brief leaves the approach open". Generic capability statements are less useful than scenario-based descriptions that show the capability in action.

EVIDENCE RULES
- Use only the archetypes and subdims supplied in META for that specific item. Do not import evidence from other items or from the student's wider profile.
- Refer to archetypes as profiles: "your Thinker profile", "your Creator and Visionary profiles".
- Refer to subdims as traits, using the exact supplied names. Every trait name must be preceded by "your" — every time, without exception. WRONG: "Analytical Curiosity helps you", "Independence and Data Curiosity help you", "Achievement ensures". RIGHT: "your Analytical Curiosity helps you", "your Independence and Data Curiosity help you", "your Achievement ensures". When listing multiple traits in one clause, "your" must appear before the first trait in the group; it does not need to repeat before each subsequent trait in the same clause — "your Independence and Data Curiosity" is correct, "your Independence and your Data Curiosity" is also correct, but "Independence and Data Curiosity" (no "your") is wrong. Never paraphrase trait names.
- Use META.allowed.archetype_definitions to understand what each profile means in practice. Draw on the specific behaviours and tendencies described there when connecting a profile to an item — do not copy definitions verbatim, and do not expose them as definitions. The goal is to write as someone who understands the profiles deeply, not to quote them.
- Use META.allowed.subdimension_definitions to understand what each trait means in practice. These definitions describe what a trait looks like in action — use that level of specificity when explaining how a trait connects to an item. Do not copy them verbatim. Do not explain traits in general terms: say how this specific trait shows up in this specific item.
- For each item, check whether a subdim appears in primarySubdims or supportingSubdims. Traits in primarySubdims are the strongest user matches — give at least one of these prominent, detailed treatment in every paragraph. Traits in supportingSubdims may be woven in more briefly where they add something specific to this item.
- You do not need to mention every supplied trait. Draw on those most relevant to this specific item. Feature at least 2 trait names across the paragraph. Vary which traits you foreground across different items in the same section — do not distribute the same combination to every paragraph.
- Do not silently drop primarySubdims. Do not invent traits or import them from other items.
- Do not name the same trait twice within the same paragraph. If a trait has already been named in one sentence, do not name it again in the closing sentence of the same item.
- Do not invent achievements, exam choices, projects, personal history, job experience, traits, motives, values, or abilities not present in META.
- Never mention internal metadata language: matched pair, canonical pair, primary subdimensions, core subdimensions, scoring, weighting, matchTier, primarySubdims, supportingSubdims, or any other system terms.
- Never use the word "energy".
- Do not use em-dashes (—), en-dashes (–), or hyphens used as dashes anywhere in the prose. If you would use a dash, use a comma, a colon, or restructure the sentence instead. Two common violation patterns to avoid: (1) parenthetical em-dashes around a list — WRONG: "Your strongest traits — Originality, Curiosity, and Achievement — come together"; RIGHT: "Your strongest traits, including Originality, Curiosity, and Achievement, come together"; (2) connector em-dashes — WRONG: "you are not satisfied with just understanding each piece — you want to see how"; RIGHT: "you are not satisfied with just understanding each piece: you want to see how".
- Preserve the section headings, item order, numbering, and markdown structure exactly as provided in the skeleton.
- Do not bold trait names (subdimensions) anywhere in the prose. The only text that should be bold in each item is the item title itself — the text immediately after the number and before the colon, exactly as provided in the skeleton. Trait names appear in plain text: write "your Analytical Curiosity", not "**your Analytical Curiosity**".
- Write directly to the student using "you" and "your". Never use "one", "the person", or "the student" in the visible report.

STYLE RULES
- Write in clear, natural English that both a student and a parent can understand.
- Keep the tone personal, thoughtful, and grounded in real behaviour and real professional settings.
- Do not sound like a job advert, a Wikipedia entry, or generic careers advice. Every sentence should earn its place.
- After **Title**: do not begin with the item title restated, or with any generic category phrase. The following openers are banned as sentence starters: "This pathway involves", "This strength involves", "This environment is", "This world involves", "This career world involves", "This role involves", "Professionals in this pathway", "Professionals in this field", "People in this field", "People working in", "You are likely to", "You are unlikely to". Begin instead with something that immediately grounds the reader in a specific aspect of what this item requires, involves, or feels like in practice.
- Vary sentence openings and rhythm across all items in each section. No two items in the same section should open with the same grammatical construction. Before finishing, read back the first sentence of every item in each section and revise any that share a pattern. Useful alternatives include: starting with what the work or setting actually involves ("Consulting work often means...", "Settings like this are defined by..."), starting with a conditional ("When a problem has no obvious answer...", "If you have space to design and test..."), starting with an observation about who thrives in this context ("People who do their best work in this kind of environment..."), or starting with the strength or environment described in action ("Spotting how separate parts of a system connect...", "Following a question past its first answer...").
- Every item must include at least one concrete detail: a specific task, a type of problem, a kind of decision, a characteristic output, or a real example of what this work or study looks or feels like in practice.
- If a paragraph could apply to several different items with only the title changed, it is too generic — make it more specific.
- Never attribute internal motivation to the student. Do not write "drives you to", "motivates you to", "pushes you to", "you are driven to", "you are motivated to", "compels you to", "fuels your drive to". Use ability language ("your X means you can..."), tendency language ("you naturally...", "you tend to..."), fit language ("may suit you", "could feel like a natural fit"), or enjoyment language ("you may find this engaging", "you might find this rewarding"). VIOLATION TO AVOID: "Your Analytical Curiosity pushes you to break down the problem" — rewrite as "Your Analytical Curiosity leads you to break it into parts" or "Analytical Curiosity means you will work through the problem methodically".
- Never open or close a sentence with collective trait summaries. Do not write "Together, these traits...", "These traits combine to...", "Together, these profiles...", or "This combination of traits...". Each sentence must make a specific point about a specific profile or trait.
- Never write about the student through their profile as a mediating object. Do not write "your profile points toward", "your profile suggests", "your profile supports", "is something your profile...", or "your profile connects with". Address the student directly: "you tend to", "you can", "this suits you because".
- When explaining how multiple profiles relate to an item, do not write a separate clause for each in sequence ("Your X profile helps you..., your Y profile helps you..., and your Z profile..."). Blend them into a single observation or spread them naturally across different sentences so the paragraph reads as prose, not a checklist.
- When describing a preference for independence or autonomy, frame it positively. Write "you work well when given ownership of a task" not "you work well without constant supervision". Write "you can direct your own investigation" not "without someone checking every step". Avoid any construction of the form "without needing X", "without someone X", or "without having to X" when describing how the student works independently — this includes "without needing step-by-step direction", "without needing constant input", "without needing oversight", and all similar forms. Always reframe positively: "when the approach is yours to decide", "when you have room to set your own direction", "when you have ownership of the work".
- The final sentence of each item must explain a specific mechanism of fit. Do not end with a verdict, a slogan, or a summary statement like "this is why this could be the right direction for you". Do not use the same phrasing for this final sentence across multiple items — "The fit comes from..." used repeatedly is as formulaic as any other repeated pattern. Vary how you close each item.
- Read the prose back before finishing. Fix any sentence that sounds like a system output rather than a person speaking ("is a real strength in your results", "your profile supports this"), any grammatically reversed construction ("your X is supported by tasks" when you mean "your X suits tasks"), and any word that feels corporate or imprecise ("gives you comfort", "your X benefits when").
- Never use these phrases anywhere in the report: "aligns well", "well-suited", "great fit", "perfect fit", "find joy", "find satisfaction", "impactful", "valuable outcomes", "shape the future", "may be drawn to this", "could be particularly rewarding", "connects to specific aspects", "this combination of traits", "makes this pathway a strong match", "makes this a natural fit", "This direction connects with you", "This world connects with you", "This career world connects with you", "This direction suits you because", "This world suits you because".
- Do not use the word "below" anywhere in the report. Do not refer to sections that follow as "below" or "the sections below".
- Do not use "not only...but", "not just...but", or any contrast construction to describe a student's traits or profile. These read as formulaic regardless of the specific words used. Instead of framing a combination as a surprising juxtaposition, describe what the combination produces or enables — what kind of thinker or worker it makes this person.
- Do not use the construction "The [demand/need] for X gives your [trait] a [Y]" or any variant of it. This is a mechanical template that produces identical-sounding final sentences across items.

SUMMARY RULES
- Write exactly 5 sentences in one paragraph. No bullet points.
- Do not begin any sentence with a mandated phrase. Write naturally while meeting the content requirements below.
- Sentence 1: Introduce the student's profile blend. Name the profiles and put each profile name in bold. Write this as an opening observation, not a form-letter opener.
- Sentence 2: Name 4 or 5 of the student's strongest traits from META.allowed.top_subdims, but do not simply list them. Choose the ones whose combination is most revealing about how this particular student thinks and works, and say something about what having them together means in practice — what kind of mind or way of working it produces. Do not use "not only...but also", "not just...but", or any other contrast construction. Describe what the combination produces or enables, not what is surprising about it.
- Sentence 3: Connect these profiles and traits to the kind of strengths and preferred environments that characterise this student — what this combination looks like in practice.
- Sentence 4: ${isUndergraduate ? "Reference the student's strongest career directions in plain, descriptive language — draw only on META.items.pathways_context (the aligned pathways, pre-filtered to Good or better). Use the first one or two. Do NOT reference career worlds here. Do NOT use the exact capitalized pathway titles as they appear in the report headers — describe the directions in plain language instead (e.g. 'social research and international policy analysis' not 'Social Research & Cultural Analysis'). Do not use the word 'below'. Do not reference adjacent pathways here." : `Point broadly to what kind of ${careerDirectionLabel} this combination of profiles and traits tends to draw people toward, and why.`}
- Sentence 5: Signal what the report covers next — written as a natural continuation, not a fixed transition phrase.
- The paragraph should feel like an expert who has just read this student's results opening a conversation with them: personal, considered, and specific enough that the student could not mistake this summary for someone else's.
- Do not use em-dashes, en-dashes, or hyphens used as dashes anywhere in the summary. This is the section where dashes appear most often — do not let that happen. Use a comma, a colon, or restructure the sentence instead. The two patterns that keep appearing: (1) Parenthetical list set off by dashes: WRONG: "traits — Originality, Analytical Curiosity, and Independence — that set you apart"; RIGHT: "traits including Originality, Analytical Curiosity, and Independence that set you apart". (2) Connector between clauses: WRONG: "you approach problems with rigour — always looking for a solution others have missed"; RIGHT: "you approach problems with rigour, always looking for a solution others have missed". Before finalising the summary, re-read every sentence and confirm there is no — or – character anywhere in it.

SECTION-SPECIFIC RULES

1) STRENGTHS
Purpose: Tell the student something specific and true about how they naturally work well — grounded entirely in their subdimension traits, not in archetype profiles.

Write 4–5 sentences per item.

Do not mention archetypes or profiles (Creator, Thinker, Visionary, etc.) anywhere in this section. Every sentence must be grounded in the supplied subdimension traits only.

Cover all of the following — weave them together naturally, do not assign them to fixed positions:
- What this strength looks like when this student applies it in practice: describe specific behaviours grounded in the supplied traits. Avoid "you enjoy..." or "you like working on..." as the basis of the description.
- What it enables or makes more natural for this student than it might be for others — be specific to this strength, not generic self-affirmation.
- The supplied traits, drawn on selectively: feature those that best explain how this strength operates for this student. Give fuller treatment to primarySubdims that connect most directly to this strength; weave in supportingSubdims where they add something specific. Do not list traits sequentially as "your X means... your Y means...". Vary which traits you foreground across strength items.
- Close with a concrete connection to the student's career directions. ${isUndergraduate ? "Draw only on META.items.pathways_context — the specific professional roles and settings from the student's subject domain. Do not reference career worlds or career areas outside that domain." : "Draw on META.items.career_worlds to name the types of work this strength is most relevant to."} Do not use the exact capitalized titles of career worlds or pathways. Reference one, two, or three career directions if more than one is genuinely relevant to this specific strength. Do not make a generic claim about the strength being broadly useful. Across all strength items, vary which directions you reference — do not close on the same types of work repeatedly.

2) IDEAL ENVIRONMENTS
Purpose: Make the student able to picture the kind of setting where they will do their best work — grounded entirely in their subdimension traits, not in archetype profiles.

Write 4 sentences per item.

Do not mention archetypes or profiles (Creator, Thinker, Visionary, etc.) anywhere in this section. Every sentence must be grounded in the supplied subdimension traits only.

Cover all of the following — weave them naturally:
- What this environment actually feels like to work in: its pace, culture, structure, level of autonomy, day-to-day character and expectations. Make it recognisable and real, not a dictionary definition.
- One or two real examples of where this environment appears — woven naturally into the body of the paragraph, not introduced with "Examples include..." or listed separately. ${isUndergraduate ? "Draw on META.items.pathways_context for context; examples should name the kinds of organisations, teams, or roles that exist within the student's subject domain." : "Draw on META.items.career_worlds for context; examples should feel like they belong to the worlds this student is heading towards."} Do not name specific pathway titles in the body text, but let their context shape which organisations, teams, and types of work you reference.
- The supplied traits, drawn on selectively: connect those most relevant to what this environment actually demands or provides. Give fuller treatment to primarySubdims; weave in supportingSubdims where they sharpen the picture. Vary which traits you foreground across environment items.
- Where two environments share overlapping traits, approach them from meaningfully different angles. One might focus on the cognitive demands the setting places on the student; another might focus on how autonomy and accountability are structured; another on the pace and type of output. The goal is for each environment paragraph to feel like a genuinely different place to be — not a variation on the same description with some words changed.
- Close with a sentence that grounds this environment in the student's actual career landscape. ${isUndergraduate ? "Name specific types of roles or settings from META.items.pathways_context — the student's subject domain. Do not reference career areas outside that domain." : "Name the types of work or career directions from META.items.career_worlds where this environment is most common."} Do not use the exact capitalized titles of career worlds or pathways. Do not close two environment items on the same direction. This sentence must name at least one specific role or type of setting — a sentence that describes the environment in abstract terms without anchoring it to a named role or direction does not satisfy this requirement.

3) ${isSchool ? "CAREER WORLDS" : "CAREER PATHWAYS — ALIGNED"}
${isSchool ? `Purpose: Help a school student understand a broad career direction and why it could be genuinely right for them — grounded in what the world actually involves, specific about why they would enjoy it, and clear about why they would succeed in it.
Remember: a career world is a broad direction, not a specific role or a university subject.

Write 6 sentences per item.

Do not mention archetypes or profiles anywhere in this section except in the FIT CLOSE sentence. The GROUNDING and ENJOYMENT + SUCCESS sentences must be grounded in the supplied subdimension traits only.

There is no description field for career worlds. Draw on your own knowledge of this career direction — the kinds of work, organisations, problems, and outputs that define it.

Structure each paragraph around three things, woven naturally across 6 sentences:

1. GROUNDING (1–2 sentences): Open from inside the work — a specific type of decision, output, or moment that defines what the work actually feels like day to day. The opening should reveal something concrete that a school student who only knows this area by name wouldn't already know. Do not open with a dictionary definition or a sweeping statement about the field. Do not begin with "Professionals in this world" or "People in this field".

2. ENJOYMENT + SUCCESS (3–4 sentences): Cover both — why this work would be genuinely absorbing for this student, and why they would be effective in it. These do not need to be separate sentences; weave them together naturally. Ground every claim in the supplied subdimension traits. Draw on those most relevant to why this specific world would be absorbing and effective for this student — you do not need to feature every supplied trait. Give fuller treatment to primarySubdims; weave in supportingSubdims where they add something specific. Do not list traits sequentially as "your X means... your Y means...". Find combinations: two traits might together explain what makes the work absorbing, another might explain what makes the student effective. Vary which traits you foreground across career world items.

3. FIT CLOSE (1 sentence): Close by naming what kind of person actually thrives and builds a career in this world, expressed in terms of the student's archetype profiles (Creator, Thinker, Visionary, etc.). Connect the archetype(s) to what this specific career world demands — so the sentence explains why someone with this profile belongs here, not just that they do. This is the only sentence in this section where you may name archetypes. WRONG: "You are likely to find this direction rewarding if you want to create something new" — conditional, says nothing. WRONG: "This world suits your profile well" — verdict phrase with no substance. RIGHT: "This world is built for Thinkers and Creators — people who need both the rigour to interrogate a problem and the originality to imagine a solution no one has tried before." RIGHT: "Visionaries who also think like Thinkers tend to find this world particularly compelling, because it rewards people who can see where a field is going and then do the analytical work to get there." The sentence must feel specific to this career world — not interchangeable with another world's closer. Do not use "this world suits you", "this is why this could be right for you", "if you want to", or "if you enjoy".

Do not include a sentence about why this field "matters to the world" or "is important for society". Focus entirely on the work, the experience, and the fit.
Do not use the construction "The [demand] for X gives your [trait] a [Y]".` : ""}
${isUndergraduate ? `Purpose: Help a university student understand exactly what working in this professional pathway involves and why their specific profile makes it a direction worth pursuing.

These students are already studying a relevant subject. They know the field at a general level. Go deeper than an introduction. The opening should reveal something about the texture of the work that someone who has attended lectures and read about the field might not yet know from direct experience.

Write 6 sentences per item.

Do not mention archetypes or profiles (Creator, Thinker, Visionary, etc.) anywhere in this section. Every sentence must be grounded in the supplied subdimension traits only.

Structure each paragraph across three elements, woven naturally rather than in rigid blocks:

1. SPECIALIST GROUNDING (1-2 sentences): What do people in this pathway actually do, day to day? Draw on the supplied description and your knowledge of the field. Be specific: the kinds of decisions made, the outputs produced, the pressures involved, the skills exercised. Do not open with "Professionals in this pathway" or "People in this field". Make it feel like someone inside the field describing the reality of the work, not a course catalogue entry.

2. SUBDIMENSION FIT (3-4 sentences): You have been supplied with subdimensions for this pathway, split into primarySubdims and supportingSubdims. Draw on those most relevant to this pathway — you do not need to feature every one. Do not give each trait its own sentence in sequence. Find combinations that produce real observations: two traits might together explain what makes the intellectual work absorbing, another pair might explain what makes someone effective at the practical side. Primary subdimensions should receive fuller treatment; supporting subdimensions may be woven in where they add something specific. Weave traits as evidence for observations, not as a checklist. Vary which traits you foreground across pathway items.

3. FIT CLOSE (1 sentence): Close with an observation about what kind of thinker or worker this pathway rewards and why this student matches that. The sentence should feel specific to this pathway — not interchangeable with the closer of a different pathway. Do not name archetypes. Do not use verdict phrases like "this is why this could be the right direction for you" or "this pathway suits you". Do not open with "Your ability to..." — this is ability-framing, not trait-framing.

Do not include a sentence about why this field matters to the world or is important for society. Focus entirely on fit, specifics, and the experience of the work.
Do not use em-dashes, en-dashes, or hyphens used as dashes anywhere. Use a comma, a colon, or restructure the sentence instead.
Do not end with "This direction connects with you", "This direction suits you because", "This pathway connects with you", or similar verdict phrases.` : ""}

${isUndergraduate ? `4) CAREER PATHWAYS — ADJACENT
Purpose: Introduce the student to a broader-reach pathway worth considering — one that has genuine connections to their profile, but is less directly matched than the aligned pathways. The tone is curious and open, not a confident fit-verdict.

Write 3–4 sentences per item.

Cover all of the following — weave them naturally:
- What this pathway involves and what professionals in it actually do: at least one specific task, type of decision, or output. Make it real.
- At least one specific connection between the supplied profiles or traits and something concrete about this work: there is a genuine reason this pathway appears here, and the student should be able to see exactly what it is.
- Why this direction may be worth exploring given the student's profile: frame it honestly as a broader reach that has real merit, not a consolation option and not a confident fit-verdict.

Do not write as though this is a confirmed strong fit. Do not use "this pathway aligns with your profile", "your profile suits this well", "this is a natural extension", or similar verdict language. The tone is: here is a direction with real connections to who you are that is worth exploring with an open mind.

The closing sentence must name at least one specific trait and connect it directly to something concrete about this work. Do not open or close with "If you are interested in..." or "If you are curious about..." — these are passive hedges that say nothing specific about the student. Vary the closing construction across adjacent items.` : ""}

SECTION COUNTS
- Summary: 1 paragraph, 5 sentences, no bullet points.
- Strengths: one paragraph per item, every item provided.
- Ideal Environments: one paragraph per item, every item provided.
${isSchool ? `- Career Worlds: one paragraph per item, every item provided. Every career world paragraph must be exactly 6 sentences — the first world and the last world receive equal depth and detail. Do not compress or shorten later items in the list.` : ""}
${isSchoolInterest ? "- Keep Career Worlds Most Aligned With Your Interest Area and Other Career Worlds to Explore as distinct subsections with their own items." : ""}
${isUndergraduate ? `- Career Pathways: aligned pathways are 6 sentences each; adjacent pathways are 3-4 sentences each.
- Do not add a Career Worlds section for university users.
- If an Adjacent Career Pathways to Explore section is present in the skeleton, write it. If it is absent, do not create it.
- Use only META.items.pathways_aligned for the aligned section, and only META.items.pathways_adjacent for the adjacent section. Do not merge, rename, or move items between sections.` : ""}

FINAL QUALITY CHECK
Before finishing, read each item and ask: does this paragraph tell this specific student something true and useful about themselves in relation to this specific item? If it could be the opening paragraph of a Wikipedia article about the topic, or could apply to any student with a similar profile, it needs to be more specific.
- Strength paragraphs should describe patterns in how this person works well — behaviourally real, not motivational-poster language.
- Environment paragraphs should make a specific setting feel vivid and recognisable to someone who has never worked in it.
- Career world paragraphs should feel inspiring and grounded simultaneously — real enough to picture, interesting enough to want to know more.
- Aligned pathway paragraphs should feel like an adviser who knows this professional territory explaining why it fits this particular person, not a general introduction to the field.
- Adjacent pathway paragraphs should feel honest, curious, and specific — a genuine suggestion, not a hedge.
`;
}

// ─── selection narrative instructions ────────────────────────────────────────

function getSelectionNarrativeInstructions(status = "") {
  const isSchool = status === "school";

  const common = `
You are writing hidden CareerDNA drill-down narratives for the Discover More / Selection Insight Explorer section.
Write as an expert careers adviser giving a student a clear, specific, and honest picture of what a particular role or subject involves and why it may suit them.
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
- For each hidden item, use only that item's own archetypes and subdims arrays. Do not borrow evidence from the parent world or pathway or from the student's wider profile.
- Refer to archetypes as profiles: "your Thinker profile".
- Refer to subdims as traits, using the exact supplied names. Every trait name must be preceded by "your" — every time. WRONG: "Originality and Autonomy allow you", "Achievement drives". RIGHT: "your Originality and Autonomy allow you", "your Achievement drives". Never paraphrase trait names.
- Do not mention scoring, metadata, internal logic, relation labels, matchTier, primarySubdims, supportingSubdims, or any system terms.
- Never use the word "energy".
- Do not use em-dashes (—), en-dashes (–), or hyphens used as dashes anywhere in the prose. If you would use a dash, use a comma, a colon, or restructure the sentence instead.
- If an item has three supplied traits, mention all three exact trait names.
- If an item has two supplied traits, mention both.
- If an item has one supplied trait, mention it.
- Make the fullSummary specific to this item. It must not sound reusable across several subjects or roles.
- Hidden summaries must describe the specific item — not repeat the parent career world or pathway summary.
- Never attribute internal motivation: do not write "drives you to", "motivates you to", "pushes you to", "you are driven to", "you are motivated to".
- Do not open any fullSummary with "This role involves...", "This subject involves...", "This degree involves...", "This pathway involves...", or any generic category phrase.
- Do not write "Professionals in this role", "Professionals in this field", "People in this field", "People working in this area".
- Never use these phrases anywhere: "aligns well", "well-suited", "great fit", "perfect fit", "find joy", "find satisfaction", "impactful", "valuable outcomes", "shape the future", "may be drawn to this", "could be particularly rewarding", "connects to specific aspects", "Together, these traits", "These traits combine", "this combination of traits", "makes this a natural fit", "makes this a strong match".
`;

  if (isSchool) {
    return `${common}

SUBJECTS / UNIVERSITY DEGREES
Purpose: Explain what studying this undergraduate subject actually involves and why it may suit this student — concrete, specific, and honest. Not a prospectus summary.

Write one fullSummary per hidden subject. Write 5 sentences.

Cover all of the following — weave them naturally:
(a) What studying this subject is actually like: what students do, how they spend their time, what kinds of thinking or practical work it involves. Be concrete — modules, methods, types of projects, types of problems. Not "this subject explores a wide range of fascinating topics".
(b) What the subject builds and where graduates typically go — grounded in what the degree trains people to do, not a sales pitch for the field.
(c) How the supplied profiles connect to why this subject might suit this student — what about the nature of the profiles fits what this subject requires and rewards.
(d) How the supplied traits show up in the specific demands of studying and succeeding in this subject — trait by trait, specific to what this subject asks of you.
(e) One specific area of work, type of problem, or kind of contribution this subject prepares people for — concrete and real. Not "you will be able to make a difference in many exciting ways".

Each sentence must follow naturally from the previous one.
`;
  }

  return `${common}

ROLES
Purpose: Give the student a clear, honest picture of what this role involves day to day and why it may suit them — specific, real, and grounded. Not a job description. Not generic encouragement.

Write one fullSummary per hidden role. Write 5 sentences.

Cover all of the following — weave them naturally:
(a) What this role involves day to day: at least one specific task, decision, or output that defines it. Not "this role involves working across a variety of challenging areas".
(b) What the role demands in terms of skills, habits, or ways of thinking — what makes someone effective in it over time.
(c) How the supplied profiles connect to why this role might suit this student: specific to what these profiles are drawn to and what this role requires.
(d) How the supplied traits help this student operate effectively and potentially find this role engaging — specific to what the role actually demands.
(e) One concrete example of the kind of problem, project, output, or situation someone in this role regularly faces — something that makes the role feel real.

Each sentence must follow naturally from the previous one.
`;
}

// ─── prompt builders ──────────────────────────────────────────────────────────

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
${rolesAdjacentFixed.length ? `
## Adjacent Career Pathways to Explore
${skeletonList(rolesAdjacentFixed)}
` : ''}
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
