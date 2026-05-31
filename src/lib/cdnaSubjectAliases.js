// src/lib/cdnaSubjectAliases.js
// Declarative mapping layer that links broad user-facing subject labels
// to likely degree titles, subject families, clusters, and career worlds.

function normalizeSubjectAliasKey(input = "") {
  return String(input || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/&/g, " and ")
    .replace(/[^\w\s/-]/g, " ")
    .replace(/\b(tv)\b/g, "television")
    .replace(/\b(it)\b/g, "information technology")
    .replace(/\s+/g, " ")
    .trim();
}

const SUBJECT_ALIAS_TABLE = Object.freeze({

  "computer science and artificial intelligence": {
    subjectTitles: ["Computer Science"],
    careerWorldIds: ["cw_software_ai_digital_systems"],
  },
  "computer science with cyber security": {
    subjectTitles: ["Cyber Security"],
    careerWorldIds: ["cw_software_ai_digital_systems"],
  },
  "architecture and planning": {
    subjectTitles: ["Urban Planning"],
    careerWorldIds: ["cw_architecture_built_environment_spatial_design"],
  },
  "environmental and earth sciences": {
    subjectTitles: ["Earth Sciences"],
    careerWorldIds: ["cw_environment_sustainability_planetary_futures"],
  },
  "education studies": {
    subjectTitles: ["Education Studies", "Early Childhood Studies"],
    careerWorldIds: ["cw_education_coaching_people_development"],
  },

  "accounting and finance": {
    subjectTitles: ["Accounting and Finance", "Finance"],
    subjectFamilies: ["finance-economics"],
    careerWorldIds: ["cw_finance_economics_investment"],
  },
  "architecture and urban planning": {
    subjectTitles: ["Architecture", "Urban Planning", "Architectural Technology", "Construction Management"],
    subjectFamilies: ["architecture-spatial-design", "construction-delivery"],
    careerWorldIds: ["cw_architecture_built_environment_spatial_design"],
  },
  "art and design": {
    subjectTitles: ["Graphic Design", "Product Design", "Photography", "Fashion Design"],
    subjectClusters: ["design-creative"],
    careerWorldIds: ["cw_creative_arts_design_experience", "cw_architecture_built_environment_spatial_design"],
  },
  "biological sciences": {
    subjectTitles: ["Biology", "Biomedical Science", "Biotechnology"],
    subjectFamilies: ["laboratory-science"],
    subjectClusters: ["science-research"],
    careerWorldIds: ["cw_science_research_laboratory_innovation", "cw_health_care_clinical_practice"],
  },
  "business and management": {
    primarySubjectTitles: ["Business Management", "Business Analytics", "Entrepreneurship and Innovation", "Marketing"],
    secondarySubjectTitles: ["Finance", "Economics", "Accounting and Finance"],
    subjectTitles: [
      "Business Management",
      "Business Analytics",
      "Entrepreneurship and Innovation",
      "Marketing",
      "Finance",
      "Economics",
      "Accounting and Finance"
    ],
    subjectFamilies: ["business-management-services", "entrepreneurship-innovation", "finance-economics", "media-marketing-communication"],
    primaryCareerWorldIds: ["cw_business_strategy_commercial_leadership"],
    secondaryCareerWorldIds: [
      "cw_finance_economics_investment",
      "cw_entrepreneurship_innovation_venture_building",
      "cw_marketing_media_communication"
    ],
  },
  "chemistry": {
    subjectTitles: ["Chemistry", "Chemical Engineering"],
    subjectFamilies: ["laboratory-science", "engineering-systems"],
    careerWorldIds: ["cw_science_research_laboratory_innovation", "cw_engineering_manufacturing_infrastructure"],
  },
  "communication and media": {
    subjectTitles: ["Media and Communications", "Journalism", "Public Relations and Communications", "Marketing"],
    subjectFamilies: ["media-marketing-communication"],
    subjectClusters: ["communication-media"],
    careerWorldIds: ["cw_marketing_media_communication"],
  },
  "computer science and information technology": {
    subjectTitles: ["Computer Science", "Cyber Security", "Software Engineering", "Data Science and Analytics"],
    subjectFamilies: ["software-computing", "quantitative-analysis"],
    subjectClusters: ["technical-quant"],
    careerWorldIds: ["cw_software_ai_digital_systems", "cw_data_analytics_quantitative_insight"],
  },
  "computer science and it": {
    subjectTitles: ["Computer Science", "Cyber Security", "Software Engineering", "Data Science and Analytics"],
    subjectFamilies: ["software-computing", "quantitative-analysis"],
    subjectClusters: ["technical-quant"],
    careerWorldIds: ["cw_software_ai_digital_systems", "cw_data_analytics_quantitative_insight"],
  },
  "criminology": {
    subjectTitles: ["Criminology", "Psychology"],
    subjectFamilies: ["law-policy-public", "psychology"],
    careerWorldIds: ["cw_law_governance_public_impact", "cw_psychology_behaviour_human_insight"],
  },
  "data science and ai": {
    subjectTitles: ["Data Science and Analytics", "Computer Science and Artificial Intelligence", "Business Analytics"],
    subjectFamilies: ["quantitative-analysis", "software-computing", "business-management-services"],
    subjectClusters: ["technical-quant"],
    careerWorldIds: ["cw_data_analytics_quantitative_insight", "cw_software_ai_digital_systems"],
  },
  "drama and performing arts": {
    subjectTitles: ["Music", "Film Production"],
    subjectClusters: ["design-creative"],
    careerWorldIds: ["cw_creative_arts_design_experience"],
  },
  "economics": {
    subjectTitles: ["Economics", "Economics and Statistics", "Finance", "Business Analytics"],
    subjectFamilies: ["finance-economics", "quantitative-analysis", "business-management-services"],
    careerWorldIds: ["cw_finance_economics_investment", "cw_data_analytics_quantitative_insight"],
  },
  "education": {
    subjectTitles: ["Education Studies", "Early Childhood Studies", "Social Work"],
    subjectFamilies: ["education-learning", "social-support-development"],
    careerWorldIds: ["cw_education_coaching_people_development"],
  },
  "engineering": {
    subjectTitles: ["Mechanical Engineering", "Civil Engineering", "Electrical and Electronic Engineering", "Chemical Engineering", "Aeronautical and Aerospace Engineering", "Software Engineering"],
    subjectFamilies: ["engineering-systems", "civil-infrastructure", "software-computing"],
    subjectClusters: ["technical-quant"],
    careerWorldIds: ["cw_engineering_manufacturing_infrastructure", "cw_software_ai_digital_systems"],
  },
  "environmental science": {
    subjectTitles: ["Environmental Science", "Earth Sciences", "Geography", "Agriculture"],
    subjectFamilies: ["earth-environment", "geography-environment", "agriculture-rural-environment"],
    careerWorldIds: ["cw_environment_sustainability_planetary_futures"],
  },
  "fashion": {
    subjectTitles: ["Fashion Design"],
    subjectClusters: ["design-creative"],
    careerWorldIds: ["cw_creative_arts_design_experience"],
  },
  "film and television": {
    subjectTitles: ["Film Production", "Media and Communications"],
    subjectFamilies: ["screen-digital-creative", "media-marketing-communication"],
    careerWorldIds: ["cw_creative_arts_design_experience", "cw_marketing_media_communication"],
  },
  "film and tv": {
    subjectTitles: ["Film Production", "Media and Communications"],
    subjectFamilies: ["screen-digital-creative", "media-marketing-communication"],
    careerWorldIds: ["cw_creative_arts_design_experience", "cw_marketing_media_communication"],
  },
  "geography": {
    subjectTitles: ["Geography", "Environmental Science", "Environmental and Earth Sciences"],
    subjectFamilies: ["geography-environment", "earth-environment"],
    careerWorldIds: ["cw_environment_sustainability_planetary_futures", "cw_society_culture_languages_global_affairs"],
  },
  "history": {
    subjectTitles: ["History"],
    subjectFamilies: ["humanities-culture-society"],
    careerWorldIds: ["cw_society_culture_languages_global_affairs"],
  },
  "international relations": {
    subjectTitles: ["International Relations", "Politics"],
    subjectFamilies: ["law-policy-public"],
    careerWorldIds: ["cw_law_governance_public_impact", "cw_society_culture_languages_global_affairs"],
  },
  "languages and linguistics": {
    subjectTitles: ["Modern Languages", "Media and Communications"],
    subjectFamilies: ["languages-humanities", "media-marketing-communication"],
    careerWorldIds: ["cw_society_culture_languages_global_affairs", "cw_marketing_media_communication"],
  },
  "law": {
    subjectTitles: ["Law"],
    subjectFamilies: ["law-policy-public"],
    careerWorldIds: ["cw_law_governance_public_impact"],
  },
  "marketing and advertising": {
    subjectTitles: ["Marketing", "Public Relations and Communications", "Media and Communications"],
    subjectFamilies: ["media-marketing-communication"],
    careerWorldIds: ["cw_marketing_media_communication", "cw_business_strategy_commercial_leadership"],
  },
  "mathematics and statistics": {
    subjectTitles: ["Mathematics and Statistics", "Economics and Statistics", "Actuarial Science", "Data Science and Analytics"],
    subjectFamilies: ["quantitative-analysis"],
    subjectClusters: ["technical-quant"],
    careerWorldIds: ["cw_data_analytics_quantitative_insight", "cw_finance_economics_investment"],
  },
  "medicine and health sciences": {
    subjectTitles: ["Medicine", "Dentistry", "Pharmacy", "Paramedic Science", "Radiography", "Optometry", "Biomedical Science", "Nursing", "Physiotherapy", "Occupational Therapy"],
    subjectFamilies: ["clinical-practice", "laboratory-science"],
    subjectClusters: ["helping-care", "science-research"],
    careerWorldIds: ["cw_health_care_clinical_practice", "cw_science_research_laboratory_innovation"],
  },
  "music": {
    subjectTitles: ["Music"],
    subjectClusters: ["design-creative"],
    careerWorldIds: ["cw_creative_arts_design_experience"],
  },
  "nursing and midwifery": {
    subjectTitles: ["Nursing"],
    subjectFamilies: ["clinical-practice"],
    subjectClusters: ["helping-care"],
    careerWorldIds: ["cw_health_care_clinical_practice"],
  },
  "philosophy": {
    subjectTitles: ["Philosophy"],
    subjectFamilies: ["humanities-culture-society"],
    careerWorldIds: ["cw_society_culture_languages_global_affairs"],
  },
  "physics": {
    subjectTitles: ["Physics"],
    subjectFamilies: ["laboratory-science"],
    subjectClusters: ["science-research"],
    careerWorldIds: ["cw_science_research_laboratory_innovation", "cw_engineering_manufacturing_infrastructure"],
  },
  "politics": {
    subjectTitles: ["Politics", "International Relations"],
    subjectFamilies: ["law-policy-public"],
    careerWorldIds: ["cw_law_governance_public_impact", "cw_society_culture_languages_global_affairs"],
  },
  "psychology": {
    subjectTitles: ["Psychology"],
    subjectFamilies: ["psychology"],
    subjectClusters: ["psychology-behaviour"],
    careerWorldIds: ["cw_psychology_behaviour_human_insight"],
  },
  "social sciences": {
    subjectTitles: ["Psychology", "Sociology", "Anthropology", "Politics", "Criminology", "International Relations"],
    subjectFamilies: ["psychology", "law-policy-public", "humanities-culture-society"],
    careerWorldIds: [
      "cw_psychology_behaviour_human_insight",
      "cw_law_governance_public_impact",
      "cw_society_culture_languages_global_affairs",
    ],
  },
  "sociology": {
    subjectTitles: ["Sociology", "Anthropology"],
    subjectFamilies: ["humanities-culture-society"],
    careerWorldIds: ["cw_society_culture_languages_global_affairs"],
  },
  "sport science": {
    subjectClusters: ["helping-care"],
    careerWorldIds: ["cw_health_care_clinical_practice"],
  },
  "theology and religious studies": {
    subjectFamilies: ["humanities-culture-society"],
    careerWorldIds: ["cw_society_culture_languages_global_affairs"],
  },
  "travel tourism and hospitality": {
    subjectFamilies: ["business-management-services", "media-marketing-communication"],
    careerWorldIds: ["cw_business_strategy_commercial_leadership", "cw_marketing_media_communication"],
  },
  "veterinary science": {
    subjectClusters: ["helping-care", "science-research"],
    careerWorldIds: ["cw_health_care_clinical_practice", "cw_science_research_laboratory_innovation"],
  },
});

function getSubjectAliasConfig(label = "") {
  return SUBJECT_ALIAS_TABLE[normalizeSubjectAliasKey(label)] || null;
}

function resolveAliasCandidates(label = "", libSubjects = []) {
  const config = getSubjectAliasConfig(label);
  if (!config) return [];

  const primaryTitleNorms = (config.primarySubjectTitles || config.subjectTitles || [])
    .map(normalizeSubjectAliasKey)
    .filter(Boolean);
  const secondaryTitleNorms = (config.secondarySubjectTitles || [])
    .map(normalizeSubjectAliasKey)
    .filter(Boolean);
  const familySet = new Set((config.subjectFamilies || []).map((x) => String(x || "").toLowerCase()));
  const clusterSet = new Set((config.subjectClusters || []).map((x) => String(x || "").toLowerCase()));
  const primaryWorldSet = new Set((config.primaryCareerWorldIds || config.careerWorldIds || []).map(String));
  const secondaryWorldSet = new Set((config.secondaryCareerWorldIds || []).map(String));

  const scored = [];
  for (const subj of libSubjects || []) {
    if (!subj?.title) continue;

    let score = 0;
    const subjTitleNorm = normalizeSubjectAliasKey(subj.title);
    const primaryIdx = primaryTitleNorms.indexOf(subjTitleNorm);
    const secondaryIdx = secondaryTitleNorms.indexOf(subjTitleNorm);

    if (primaryIdx >= 0) score += Math.max(14, 22 - primaryIdx * 2);
    else if (secondaryIdx >= 0) score += Math.max(7, 11 - secondaryIdx);

    const family = String(subj.subjectFamily || subj.family || "").toLowerCase();
    if (family && familySet.has(family)) score += 3.5;

    const cluster = String(subj.subjectCluster || subj.cluster || "").toLowerCase();
    if (cluster && clusterSet.has(cluster)) score += 2.5;

    const worldId = String(subj.careerWorldId || "");
    if (worldId && primaryWorldSet.has(worldId)) score += 5.5;
    else if (worldId && secondaryWorldSet.has(worldId)) score += 2.5;

    for (const adj of subj.adjacentCareerWorldIds || []) {
      if (primaryWorldSet.has(String(adj || ""))) score += 0.9;
      else if (secondaryWorldSet.has(String(adj || ""))) score += 0.45;
    }

    if (score > 0) scored.push({ item: subj, score });
  }

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return String(a.item?.title || "").localeCompare(String(b.item?.title || ""));
  });

  const out = [];
  const seen = new Set();
  for (const row of scored) {
    const key = String(row.item?.title || "").toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(row.item);
  }

  return out;
}

module.exports = {
  SUBJECT_ALIAS_TABLE,
  normalizeSubjectAliasKey,
  getSubjectAliasConfig,
  resolveAliasCandidates,
};
