// careerdna-backend/src/lib/cdnaDefinitions.js
// CareerDNA v2 — canonical definitions (backend)
// - 7 archetypes (unchanged from v1)
// - 25 behavioural dimensions using the exact label strings from questions.js / archetypeWeights.js

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
      "A Visionary is future-focused, bold, and full of ideas. They're passionate about making a difference and inspired by big-picture thinking. Visionaries thrive in spaces where they can lead change, innovate, and inspire others.",
  },

  // 25 behavioural dimensions — keys must match subdimension strings in questions.js and archetypeWeights.js
  subdimensions: {

    // WHO YOU ARE
    "Originality":
      "Shows a tendency to generate novel ideas and take unconventional approaches. Higher scores mean you naturally think of fresh ways to solve problems and enjoy combining ideas from different areas.",
    "Reliability":
      "Shows consistent follow-through and self-discipline. Higher scores mean you plan carefully, complete work on time, and deliver what you promise even when it gets difficult.",
    "Resilience":
      "Shows the capacity to recover from setbacks and keep going under sustained difficulty. Higher scores mean you stay steady and maintain progress even when things are slow or frustrating.",
    "Adaptability":
      "Shows comfort with change and shifting expectations. Higher scores mean you handle unexpected changes well and feel confident navigating uncertain situations.",
    "Social Confidence":
      "Shows comfort and energy in social and group settings. Higher scores mean you enjoy interacting with others, communicate easily, and feel at home in groups.",
    "Empathy":
      "Shows sensitivity to others' emotional states. Higher scores mean you naturally sense how people feel and tend to consider the emotional impact of your decisions on others.",

    // WHAT YOU LOVE
    "Analytical Curiosity":
      "Shows a drive to investigate and understand complex ideas. Higher scores mean you enjoy researching topics in depth, finding patterns, and making sense of how things really work.",
    "Creative Expression":
      "Shows motivation to make or design original work. Higher scores mean you care deeply about creating something of your own and take satisfaction in the quality and style of what you produce.",
    "Helping & Caring":
      "Shows intrinsic motivation to support or improve outcomes for others. Higher scores mean that helping people develop or overcome challenges is genuinely rewarding to you.",
    "Entrepreneurial Drive":
      "Shows energy from identifying opportunities and building something new. Higher scores mean you like taking charge, spotting possibilities, and making things happen rather than waiting.",
    "Technical Curiosity":
      "Shows interest in how tools, systems, and materials work. Higher scores mean you get real satisfaction from building, fixing, making, or operating things in the real world.",
    "Cultural & Global Curiosity":
      "Shows interest in diverse cultures, global affairs, and big social questions. Higher scores mean questions about how the world works and differs genuinely engage and energise you.",
    "Data Curiosity":
      "Shows intrinsic interest in working with numbers, data, and information. Higher scores mean you find genuine satisfaction in organising, analysing, and making sense of data.",

    // WHAT MATTERS
    "Purpose & Impact":
      "Shows motivation to contribute to something larger than personal success. Higher scores mean you care that your work makes a real positive difference to others or society.",
    "Autonomy":
      "Shows the need for freedom in how you work. Higher scores mean you prefer owning how things get done and feel constrained by close direction or step-by-step instructions.",
    "Belonging":
      "Shows the need for meaningful connection and team identity. Higher scores mean that feeling genuinely part of a group or community is an important source of motivation for you.",
    "Achievement":
      "Shows the drive for success and recognition. Higher scores mean you are strongly motivated by visible achievement, being acknowledged for your performance, and financial reward as a marker of success.",
    "Security":
      "Shows preference for career stability and predictable income. Higher scores mean that choosing a path that is stable and unlikely to change drastically matters a great deal to you.",
    "Mastery":
      "Shows the drive to develop deep expertise over time. Higher scores mean that becoming genuinely excellent at something you care about, and getting better continuously, motivates you more than external recognition.",

    // HOW YOU WORK BEST
    "Structure":
      "Shows preference for clear processes and organised environments. Higher scores mean you work best with a clear plan, defined expectations, and well-established ways of working.",
    "Collaboration":
      "Shows preference for working with others toward shared goals. Higher scores mean that working closely with a team energises you and produces better results than working alone.",
    "Independence":
      "Shows preference for working alone with minimal supervision. Higher scores mean you are significantly more productive when you can own a task and complete it independently.",
    "Precision":
      "Shows attention to accuracy and quality. Higher scores mean you naturally notice errors, check your work carefully, and take real pride in producing accurate, high-quality outputs.",
    "Pace":
      "Shows comfort with fast-paced, high-intensity environments. Higher scores mean you thrive under pressure and feel energised by urgency, deadlines, and dynamic working conditions.",
    "Variety":
      "Shows preference for diverse tasks and changing environments. Higher scores mean you work best when no two days look the same, and find repetitive routines very hard to sustain.",

  },
};

module.exports = CDNA_DEFINITIONS;
