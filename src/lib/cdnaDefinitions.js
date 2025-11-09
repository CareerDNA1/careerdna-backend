// careerdna-backend/src/lib/cdnaDefinitions.js
// Canonical CareerDNA definitions (backend)
// - 7 archetypes
// - 24 subdimensions using the labels in your matrix / DIMENSIONS.js

const CDNA_DEFINITIONS = {
  archetypes: {
    Achiever:
      "An Achiever is ambitious, driven, and focused on results. They set high standards, work hard to meet goals, and take pride in pushing their limits. Achievers thrive in fast-paced environments where performance is recognised and rewarded.",
    Connector:
      "A Connector is people-focused, empathetic, and great at building relationships. They feel energised by collaboration, love supporting others, and are often the glue that holds a team or community together.",
    Creator:
      "A Creator is imaginative, hands-on, and expressive. They enjoy turning ideas into reality through art, design, technology, or storytelling. Creators thrive when given freedom to innovate and explore new forms.",
    Explorer:
      "An Explorer is curious, adventurous, and driven by discovery. They love trying new things, asking big questions, and learning through real-world experiences. Explorers get bored with routine and crave variety and challenge.",
    Organizer:
      "An Organizer is structured, dependable, and detail-oriented. They bring order to chaos, love planning and systems, and thrive in environments where reliability and accuracy are essential.",
    Thinker:
      "A Thinker is analytical, logical, and reflective. They enjoy solving complex problems, diving deep into topics, and making sense of patterns. Thinkers are most comfortable in roles that reward independence and intellectual depth.",
    Visionary:
      "A Visionary is future-focused, bold, and full of ideas. They’re passionate about making a difference and inspired by big-picture thinking. Visionaries thrive in spaces where they can lead change, innovate, and inspire others.",
  },

  // 24 subdimensions – names must match what the frontend/matrix uses
  subdimensions: {
    // WHO YOU ARE
    "Curiosity & Openness":
      "Shows imagination and curiosity about new ideas and experiences. Higher scores mean you enjoy exploring and thinking creatively.",
    "Reliability & Focus":
      "Shows organisation, persistence, and reliability. Higher scores mean you plan carefully, stay on task, and deliver what you promise.",
    "Emotional Stability":
      "Shows calmness and ability to handle pressure. Higher scores mean you stay steady and adapt well when things change.",
    "Uncertainty Tolerance":
      "Shows comfort with unpredictability and change. Higher scores mean you handle ambiguity well and can take considered risks.",
    "Perseverance":
      "Shows determination and sustained effort toward goals. Higher scores mean you keep going even when things get tough.",
    "Sociability & Extroversion":
      "Shows comfort around people and enthusiasm for social interaction. Higher scores mean you enjoy teamwork, communication, and visibility.",

    // WHAT YOU LOVE
    "Investigative Curiosity":
      "Shows a drive to question, analyse, and understand how things work. Higher scores mean you like exploring complex ideas and patterns.",
    "Creative Expression":
      "Shows enjoyment of creating or designing things. Higher scores mean you like bringing ideas to life visually, practically, or conceptually.",
    "Helping Orientation":
      "Shows motivation to support or teach others. Higher scores mean you care about people’s wellbeing and like making a difference.",
    "Entrepreneurial Drive":
      "Shows initiative, leadership, and opportunity-seeking. Higher scores mean you like to start things, improve systems, and make ideas real.",
    "Hands-On Engagement":
      "Shows preference for practical, tangible work. Higher scores mean you like learning by doing, building, or experimenting.",
    "Novelty & Variety Seeking":
      "Shows enjoyment of change and new experiences. Higher scores mean you get energy from variety and dislike too much routine.",

    // WHAT MATTERS
    "Purpose & Impact":
      "Shows motivation to make a meaningful difference. Higher scores mean you care that your work contributes to a bigger purpose.",
    "Independence & Autonomy":
      "Shows desire for freedom and control over your own approach. Higher scores mean you like self-direction and ownership.",
    "Stability & Predictability":
      "Shows preference for structure, clarity, and consistency. Higher scores mean you value routine and clear expectations.",
    "Recognition & Visibility":
      "Shows motivation from acknowledgment and success. Higher scores mean you like your efforts to be noticed and valued.",
    "Financial Ambition":
      "Shows motivation from reward and achievement. Higher scores mean you focus on results, success, and long-term goals.",
    "Belonging & Connection":
      "Shows value placed on inclusion, teamwork, and belonging. Higher scores mean you enjoy shared goals and collaboration.",

    // HOW YOU WORK BEST
    "Pace & Intensity Preference":
      "Shows how well you handle busy, fast-moving work. Higher scores mean you stay motivated and focused under pressure.",
    "Organisation & Systems Orientation":
      "Shows comfort with structured systems and processes. Higher scores mean you like order, routines, and efficiency.",
    "Clarity & Structure Preference":
      "Shows need for clear expectations and defined tasks. Higher scores mean you like knowing what good performance looks like.",
    "Team Collaboration":
      "Shows comfort working with others toward shared goals. Higher scores mean you enjoy cooperation and open communication.",
    "Independent Working Approach":
      "Shows comfort working autonomously. Higher scores mean you like to set your own direction and make progress independently.",
    "Attention to Detail":
      "Shows precision, accuracy, and thoroughness. Higher scores mean you take care to complete work properly and to a high standard.",
  },
};

module.exports = CDNA_DEFINITIONS;
