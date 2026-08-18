# CareerDNA title filters: subject TITLE -> keyword phrases (lowercased substrings).
# A university qualifies for the ranking only if one of its course titles contains
# a keyword. Scoring still uses the broad subject-area metrics. Categories NOT
# listed here use the whole area (their name already == the area).
TITLE_KEYWORDS = {
 # --- Business & management area (very broad) ---
 "Entrepreneurship and Innovation": ["entrepreneur","enterprise","innovation management"],
 "Business Management with Entrepreneurship": ["entrepreneur"],
 "Innovation and Technology Management": ["innovation management","innovation and technology","technology and innovation","business innovation","innovation and enterprise","enterprise and innovation","managing innovation"],
 "Operations and Supply Chain Management": ["operations management","supply chain","logistics"],
 "Social Enterprise and Community Development": ["social enterprise","community development","social entrepreneur"],
 "Business Analytics": ["business analytic","business intelligence","business data"],
 "International Business": ["international business","global business"],
 "Real Estate & Property": ["real estate","property","surveying"],
 "Investment Management": ["investment","asset management","wealth"],
 "Finance and Financial Technology": ["fintech","financial technology","finance and technology"],
 # --- Marketing / comms ---
 "Advertising and Brand Management": ["advertis","brand"],
 "Digital Marketing and Social Media": ["digital marketing","social media"],
 "Public Relations and Communications": ["public relations","communication studies","corporate communication","strategic communication","media and communication"],
 # --- Computing area ---
 "Cyber Security": ["cyber","information security"],
 "Computer Science with Cyber Security": ["cyber"],
 "Data Science": ["data science","data analytics"],
 "Computer Science and Artificial Intelligence": ["artificial intelligence","machine learning"],
 "Human-Computer Interaction": ["human-computer","human computer","interaction design","user experience"],
 # --- specialisations re-pointed to a generic, data-rich parent area + title filter ---
 "Artificial Intelligence": ["artificial intelligence","machine learning"],
 "Software Engineering": ["software engineer","software development"],
 "Operational Research": ["operational research","operations research"],
 "Statistics": ["statistics","statistical"],
 "Biotechnology": ["biotechnolog"],
 "Animation": ["animation"],
 # --- Design area (shared code) ---
 "Product Design": ["product design","industrial design"],
 "Graphic Design": ["graphic design","graphic communication"],
 "UX Design and Interaction Design": ["user experience","ux ","interaction design","interactive media"],
 "Game Design": ["game design","games design"],
 "Fashion Design": ["fashion"],
 # --- Maths area ---
 "Actuarial Science": ["actuarial"],
 "Financial Mathematics": ["financial mathematic","mathematics with finance","mathematics and finance"],
 # --- Psychology area (shared) ---
 "Forensic Psychology": ["forensic psycholog"],
 "Cognitive Science": ["cognitive"],
 "Behavioural Science": ["behavioural science","behavioral science","psychological and behavioural"],
 "Psychology with Neuroscience": ["neuroscience"],
 # --- Engineering area (shared) ---
 "Chemical Engineering": ["chemical engineer","process engineer"],
 "Biomedical Engineering": ["biomedical engineer","medical engineer","bioengineer"],
 "Manufacturing Engineering": ["manufacturing"],
 "Robotics and Mechatronic Engineering": ["robotic","mechatronic"],
 "Systems Engineering": ["systems engineer"],
 # --- Health (shared allied-health codes) ---
 "Paramedic Science": ["paramedic"],
 "Diagnostic Radiography": ["radiograph","diagnostic imaging","radiotherapy"],
 "Occupational Therapy": ["occupational therapy"],
 "Counselling and Psychotherapy": ["counselling","psychotherapy","counseling"],
 "Nursing": ["nursing","nurse"],
 "Midwifery": ["midwifery","midwife"],
 "Optometry": ["optometry","ophthalmic","optician"],
 # --- Education (shared code) ---
 "Early Years Education and Care": ["early years","early childhood"],
 "Primary Education (QTS)": ["primary education","primary teaching"],
 "Secondary Education (QTS)": ["secondary education","secondary teaching"],
 # --- Social sciences ---
 "International Relations": ["international relations","global politics","diplomacy","war studies"],
 "Global Development Studies": ["development studies","international development","global development"],
 "Sustainable Development": ["sustainab"],
 "Law with Criminology": ["criminolog"],
 "Criminology": ["criminolog"],
 "Social and Public Policy": ["social policy","public policy"],
 # --- Other niche within broad areas ---
 "Neuroscience": ["neuroscience"],
 "Climate Science and Sustainability": ["climate","sustainab","environmental"],
 "Sport and Exercise Science": ["sport and exercise","sport science","sports science","exercise science"],
 "Sports Coaching and Development": ["coaching","sports development"],
 "Illustration": ["illustration"],
 "Digital Media Production and Technology": ["digital media","media production","media technology"],
 "Games Technology": ["games technolog","game development","computer games","games programming"],
 "Philosophy, Politics and Economics (PPE)": ["philosophy, politics","politics and economics","ppe"],
 "Hospitality, Tourism & Events Management": ["hospitality","tourism","event"],
 "Architectural Technology": ["architectural technolog"],
 "Construction Management": ["construction"],
 "Urban Planning and Development": ["urban planning","town planning","urban studies","city planning"],
 "Interior Architecture and Design": ["interior"],
 "Landscape Architecture": ["landscape"],
}
