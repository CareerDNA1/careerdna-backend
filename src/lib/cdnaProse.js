// src/lib/cdnaProse.js
// Prompt builder for CareerDNA narrative — section-aware subs, last sentence only

const CDNA_DEFINITIONS = require("./cdnaDefinitions.js");

const SUMMARY_SENTENCES = Math.max(4, Number(process.env.CDNA_SUMMARY_SENTENCES || 7));
const BULLET_MIN = Math.max(1, Number(process.env.CDNA_BULLET_MIN || 2));
const BULLET_MAX = Math.max(BULLET_MIN, Number(process.env.CDNA_BULLET_MAX || 3));

function skeletonList(titles = []) {
  return titles.map((title, i) => `${i + 1}) **${title}**: `).join("\n");
}

function getReportInstructions(status = "") {
  const isSchool = status === "school";

  return `
You are writing a personal, item-by-item report. Each bullet must stand on its own. Do NOT refer to other bullets.

GENERAL LANGUAGE RULES
- Write in clear, natural English.
- Use 2–3 short sentences per bullet for strengths and environments.
- Use 2–3 sentences for career fit areas and subjects so the explanation is not too thin.
- No dashes to glue ideas; write full sentences.
- Do not invent activities or achievements; describe tendencies.
- ALWAYS ground the explanation in the archetypes passed for that item.
- NEVER use the word "energy". Use "blend", "traits", "profile", or "style".

VARIETY RULES
- Do NOT start two bullets in a row with the same word.
- Rotate between opener patterns:
  • "Your [Archetype] + [Archetype] blend means ..."
  • "One side of your profile is [Archetype], which ..."
  • "This fits you because your profile mixes [Archetype] and [Archetype] ..."
  • "With a strong [Archetype] strand, you tend to ..."
  • "People with this mix often ..."
- If the previous bullet started with "Your", the next one must not.

SUBDIMENSIONS
- Some items in META will include 0 or 1 subdimension hints (already filtered to what the user scored high on).
- If there IS a subdimension hint for that item, add EXACTLY ONE final sentence in this format:
  "This also suits your [subdimension in simple words] because it lets you use that preference."
- If there is NO hint, do NOT invent one.
- This sentence must always come LAST in the bullet.
- Vary the benefit slightly so every bullet does not sound identical.

LOGIC FOR EVERY ITEM
1. WHY: name 1–2 most relevant archetypes for that item and what they typically do (create, deliver, plan, connect, explore, think).
2. FIT: link that to the specific item (strength, environment, area, subject).
3. BENEFIT: show why this helps the user or why they will probably enjoy it.
4. (Optional, only if hint present) SUBDIM: add the final sentence above.

SUMMARY RULES
- Start: "Your profile blends" → allowed.archetypes in META, in the SAME order.
- Do NOT add or invent archetypes that are not in META → allowed.archetypes.
- Then unpack those 2–3 archetypes using the definitions in META:
  • Creator → makes, designs, expresses, turns ideas into visible output
  • Achiever → sets goals, works hard, wants progress to show
  • Visionary → looks ahead, cares about meaning, likes change
- Then say what kinds of projects this mix suits.
- End the summary by signalling that the next sections will show strengths, environments, and areas/subjects.

${isSchool
  ? `SECTION COUNTS
- Summary: 1 paragraph, ${SUMMARY_SENTENCES} sentences.
- Strengths: 5 bullets, ${BULLET_MIN}–${BULLET_MAX} sentences each.
- Ideal Environments: 6 bullets, 2–3 sentences each.
- Career Fit Areas: 6 bullets, 2–3 sentences each.
- University Subject Suggestions: 6 bullets, 2–3 sentences each. If the user provided current/liked subjects, start with up to 3 of those, then move to archetype-matched subjects.`
  : `SECTION COUNTS
- Summary: 1 paragraph, ${SUMMARY_SENTENCES} sentences.
- Strengths: 5 bullets, ${BULLET_MIN}–${BULLET_MAX} sentences each.
- Ideal Environments: 6 bullets, 2–3 sentences each.
- Career Fit Areas: 6 bullets, 2–3 sentences each.
- Classic Roles: 5 bullets, 2–3 sentences each.
- Emerging / Future Roles: 5 bullets, 2–3 sentences each.`}
`;
}

function buildReportPrompt({
  showSubdimScores = false,
  archetypes = {},
  age = "",
  status = "",
  subjects = [],
  allowedArchetypes = [],
  allowedSubdims = [],
  strengthsFixed = [],
  envsFixed = [],
  areasFixed = [],
  rolesClassicFixed = [],
  rolesEmergingFixed = [],
  subjectsFixed = [],
  itemArchetypes = {},
  itemSubdimHints = {},
  subdimScores = [],
}) {
  const instructions = getReportInstructions(status);

  const meta = {
    user: { status, age, archetypes, subjects },
    definitions: {
      archetypes: CDNA_DEFINITIONS.archetypes,
      subdimensions: CDNA_DEFINITIONS.subdimensions,
    },
    allowed: { archetypes: allowedArchetypes, subdims: allowedSubdims },
    items: {
      strengths: strengthsFixed.map((t) => ({
        title: t,
        archetypes: itemArchetypes?.strengths?.[t] || [],
        subdims: itemSubdimHints?.strengths?.[t] || [],
      })),
      environments: envsFixed.map((t) => ({
        title: t,
        archetypes: itemArchetypes?.environments?.[t] || [],
        subdims: itemSubdimHints?.environments?.[t] || [],
      })),
      fit_areas: areasFixed.map((t) => ({
        title: t,
        archetypes: itemArchetypes?.fit_areas?.[t] || [],
        subdims: itemSubdimHints?.fit_areas?.[t] || [],
      })),
      subjects: subjectsFixed.map((t) => ({
        title: t,
        archetypes: itemArchetypes?.subjects?.[t] || [],
        subdims: itemSubdimHints?.subjects?.[t] || [],
      })),
      roles_classic: rolesClassicFixed.map((t) => ({
        title: t,
        archetypes: itemArchetypes?.roles_classic?.[t] || [],
        subdims: itemSubdimHints?.roles_classic?.[t] || [],
      })),
      roles_emerging: rolesEmergingFixed.map((t) => ({
        title: t,
        archetypes: itemArchetypes?.roles_emerging?.[t] || [],
        subdims: itemSubdimHints?.roles_emerging?.[t] || [],
      })),
    },
    subdim_scores: showSubdimScores ? subdimScores : [],
  };

  // --- NEW: Build a fixed first summary line ---
  const blendLine =
    allowedArchetypes && allowedArchetypes.length
      ? `**Your profile blends ${allowedArchetypes.join(", ").replace(/, ([^,]*)$/, " and $1")} archetypes.**`
      : "**Your profile blends your top archetypes.**";

  const header = `
[META START]
${JSON.stringify(meta, null, 2)}
[META END]

${instructions}

# Your Personalized CareerDNA Summary

## Summary
${blendLine}
(Continue the summary with the remaining ${SUMMARY_SENTENCES - 1} sentences. Do NOT rewrite or reorder the first line.)
`;

  if (status === "school") {
    return `
${header}

## Strengths
${skeletonList(strengthsFixed)}

## Ideal Environments
${skeletonList(envsFixed)}

## Career Fit Areas
${skeletonList(areasFixed)}

## University Subject Suggestions
${skeletonList(subjectsFixed)}
`;
  }

  return `
${header}

## Strengths
${skeletonList(strengthsFixed)}

## Ideal Environments
${skeletonList(envsFixed)}

## Career Fit Areas
${skeletonList(areasFixed)}

## Classic Roles
${skeletonList(rolesClassicFixed)}

## Emerging / Future Roles
${skeletonList(rolesEmergingFixed)}
`;
}

module.exports = {
  buildReportPrompt,
};
