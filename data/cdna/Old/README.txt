CareerDNA report-compliant replacement files

This package updates the uploaded JSONs against the deep-research reports. It includes only replacement data files.

Key implemented changes:
- Added Dentistry pathway and Dentist role.
- Added Assistant Psychologist role.
- Renamed report-specified pathways while preserving IDs.
- Removed/demoted primary-display roles flagged by the report, including chartered psychology roles, Solicitor, SENCO, Education Consultant, MI Analyst, UX Engineer, scheme-specific management roles, Product Manager, and Diplomatic Service Officer.
- Renamed report-specified roles: Software Developer, Trading Analyst, Sales & Trading Analyst, Assistant Accountant, Healthcare Management Associate, Behavioural Insight Analyst.
- Updated subject-to-pathway routing for Dentistry, Psychology, Counselling, Education Studies, Social Work, Data Science, Statistics, Business Management, International Business Management, Law, Social/Public Policy, Medicine, Pharmacy, Finance, Modern Languages, International Relations, Architecture, and Construction Management.
- Updated career world metadata to match the career-world report, including archetypes, core/secondary subdimensions, and renamed worlds where recommended.
- Rebuilt role_routing.json directly from Roles2.json to keep role IDs, family titles, subjects, and world titles aligned.

Validation performed:
- All JSON files parse.
- No broken role-family references in university_subject_routing.json or university_pathway_matrix_v1.json.
- No broken subject references in role routing.
- role_routing.json contains exactly the same role IDs as Roles2.json.
- Removed primary-display role IDs are absent from Roles2.json and role_routing.json.
