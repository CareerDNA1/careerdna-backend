// Long-form definitions for individual roles, keyed by role id (see Roles2.json).
// Written for students exploring the Role Explorer. Each value is a six-paragraph
// string (paragraphs separated by a blank line), in this fixed order:
//   1. What it is        - what the role is and the value it creates
//   2. What you'd do      - the day to day: tasks, tools, who you work with
//   3. How you get in     - the real routes into it at graduate level (internships,
//                           schemes, apprenticeships, side doors, how competitive),
//                           plus where it progresses to. Not a list of skills.
//   4. Who it suits       - traits and motivations that fit, grounded in the
//                           role's behavioural profile; honest about poor fit
//   5. How it's changing  - how the role is evolving: technology and automation,
//                           demand and competition, where it is heading
//   6. The practical side - setting, typical UK pay (as bands), and demand
// No short definitions by design. No dashes in the prose. Pay figures are UK
// ranges and date over time; refresh paragraphs five and six periodically.

const ROLE_DESCRIPTIONS = {
  // ── Finance, Economics & Investment (pilot) ─────────────────────────────
  investment_banking_analyst: `An Investment Banking Analyst helps companies raise money and carry out major deals, such as mergers, acquisitions and stock market listings. You sit at the junior end of a deal team, building the financial analysis and materials that senior bankers use to advise clients. It is one of the most demanding entry points in finance, and one of the most respected, because the training is intense and the work is high stakes.

Most of your time goes on building financial models, valuing companies, and preparing pitch books and presentations that explain a deal to a client or investor. You gather and check data, run the numbers behind different scenarios, and make sure every figure in a document holds up. You work as part of a team on live transactions, so the days are long and deadline driven, and precision matters more than almost anything else.

The main way in is early and planned. Most analysts start with a first year insight or spring week, then a summer internship in their penultimate year that, if it goes well, turns into a graduate offer, so the internship is really the front door. You can apply directly to graduate schemes too, and a growing number of banks run school leaver and degree apprenticeship routes that skip university altogether. Competition is intense and applications open far in advance, so starting early matters more than which university you attend. From analyst you typically move up to associate after about three years, then vice president and beyond, or step across into private equity, corporate finance or investment management.

It fits people with strong analytical curiosity, real drive and ambition, and the resilience to keep standards high under pressure and long hours. You need to be precise, well organised and comfortable with fast pace and last minute changes. It suits those motivated by challenge, achievement and steep learning, and is a poor fit if you want predictable hours or a slow, steady rhythm early in your career.

The role is being reshaped by automation and AI, which increasingly handle routine model building and slide work, so analysts are expected to move faster and add more judgement rather than just crunch numbers. Some banks are trimming junior headcount and reforming the punishing hours culture, while more of the action shifts towards private capital. The prestige and training remain, but the day to day job is evolving.

The work is office based and city centred, overwhelmingly in London for UK roles, with long and unpredictable hours. Graduate analysts at major London banks typically start on around a £60k base salary, with a bonus usually adding 30 to 50 percent on top, so realistic first year total pay lands roughly between £78k and £90k, and boutiques can pay more. Demand is competitive rather than large: entry is hard and places are limited, but the skills you build open doors right across finance.`,

  equity_research_analyst: `An Equity Research Analyst studies companies and their shares, then forms a view on whether they are worth buying, holding or selling. You become an expert on a set of companies or a sector, and your job is to understand them well enough to have an opinion the market takes seriously. It sits at the thinking end of finance, where the value you add is judgement, not just numbers.

You spend your time modelling company finances, reading results and industry news, meeting management teams, and writing research notes that lay out your investment case. You build forecasts, set price targets, and explain your reasoning to fund managers and clients who rely on it to make decisions. The work is analytical and independent, and a large part of it is writing clearly and defending a view.

Most people get in through a graduate scheme at a bank, asset manager or independent research house, usually after a summer internship in the same area. A common side door is to join in a broader finance or analyst role and move across into research once you have shown your analysis is strong, and many candidates take the CFA exams as a recognised step into the field. Places are limited and competitive, though less brutally so than deal making banking. From analyst you progress to senior analyst covering your own stocks, and many move on into investment management or hedge funds.

It suits people with strong analytical curiosity and a drive for mastery, who enjoy going deep on a subject and forming their own independent, original view. You need precision, comfort with data, and the confidence to back a conclusion others may disagree with. It is a poor fit for those who prefer clear right answers or dislike putting an opinion on the line.

Traditional sell side research has been squeezed for years by the rise of passive investing and by rules that made clients pay separately for research, which shrank budgets and teams. At the same time AI tools now handle much of the data gathering, pushing the value towards genuinely differentiated, specialist insight, and more of the growth is on the buy side. The field is smaller and more selective than it once was, but deep expertise is still prized.

The work is mostly office based in financial centres, with earlier and steadier hours than deal making banking. Graduates typically start somewhere around £45k to £65k, and experienced analysts in London often earn well into six figures once bonuses are included. Demand is steady but selective, and the sector expertise you build transfers well across the investment world.`,

  wealth_management_associate: `A Wealth Management Associate helps individuals and families look after and grow their money over the long term. You support advisers who guide clients on investments, pensions, tax and planning for the future, and increasingly take on your own client relationships. It is a role where finance meets people, and trust matters as much as technical skill.

Day to day you prepare financial plans and investment proposals, research products and markets, keep client portfolios and paperwork in order, and sit in on or lead client meetings. You answer client questions, handle the administrative side of advice, and make sure everything meets strict regulatory standards. The work blends analysis with relationship building and careful, reliable follow through.

Entry is fairly open. Many join a graduate scheme at a wealth manager, private bank or advice firm, but just as many start in a support role such as administrator or paraplanner and work up as they pass the professional advice exams. Apprenticeships in financial advice are increasingly common and let you earn while you qualify, so a specific degree is rarely essential. Competition is real but the field is less of a bottleneck than banking. From associate you typically progress to financial adviser or planner managing your own clients, then towards senior or private client roles.

It fits sociable, analytical people who combine social confidence with genuine care for others and a head for numbers. You need to be reliable, discreet and precise, and to enjoy building long relationships rather than chasing quick wins. It is less suited to those who want a purely technical role with little client contact.

Demand is being lifted by an ageing population passing on significant wealth, which means more people needing advice over the coming years. At the same time digital tools and robo advice are automating the simpler end, pushing human advisers towards more complex, higher value clients, while smaller firms consolidate into larger ones. The role is growing but tilting towards those who can handle complexity and relationships.

The work is office based with regular client meetings, and hours are generally steady and predictable. Entry level roles typically pay around £30k to £45k, rising to £50k to £65k and beyond as you qualify and build a client base, with bonuses linked to performance. Demand is solid and growing as more people need long term financial advice.`,

  corporate_banking_analyst: `A Corporate Banking Analyst helps banks support and lend to established companies. You assess whether a business is a safe and sensible client to lend to, and help structure the loans and services it needs. It is a steadier, relationship led corner of banking, focused on the financial health of real trading companies.

You spend your time analysing company accounts, building credit assessments, monitoring the financial health of clients, and preparing proposals for loans and banking facilities. You work closely with relationship managers and risk teams, and much of the job is judging whether a company can comfortably repay what it borrows. The work is analytical and detailed, with a strong emphasis on getting the risk right.

Most analysts join through a bank graduate scheme, often after a summer internship, and many banks also run well regarded school leaver and degree apprenticeship programmes that are a direct route in without a full degree. Internal moves are common too, with people stepping across from branch, operations or other analyst roles. Entry is competitive but far less of a scramble than front office trading or deal making. From analyst you typically move up to relationship manager, owning your own client relationships, or into credit risk and corporate finance.

It suits driven, analytical people who like structure and want their conclusions to be reliable and well evidenced. You need precision, sound judgement and enough social confidence to deal with clients and colleagues. It is a poor fit for those who want fast paced trading floor intensity or dislike detailed credit work.

Credit analysis is being steadily digitised, with more data and automation feeding the decisions that analysts used to assemble by hand, which shifts the job towards judgement and client work. Sustainability linked lending is also growing fast, adding new things to assess. The role is stable rather than shrinking, but the process around it keeps modernising.

The work is office based with client visits, and hours are generally reasonable and predictable. Graduate salaries typically sit around £30k to £45k, rising to £50k to £70k and higher as you take on client responsibility, with bonuses on top. Demand is stable, and the credit and relationship skills you build are valued across banking.`,

  trading_analyst: `A Trading Analyst supports the buying and selling of financial products such as shares, bonds and currencies. You help traders make and execute decisions in fast moving markets, watching prices and flows in real time. It is one of the most immediate, high tempo roles in finance, where the market gives you feedback within seconds.

Day to day you monitor markets and positions, analyse price movements and data, help price trades, and manage the risk on the desk. You build and run models, spot opportunities and problems quickly, and keep accurate track of what has been traded. The work is intense and reactive, demanding sharp focus and fast, sound decisions under pressure.

Entry is through highly competitive graduate schemes on bank trading floors, almost always following a summer internship, with first year insight days as the first step. A distinct alternative route is the specialist trading firms and market makers, which hire straight from university through numerical and problem solving tests rather than traditional applications. Places are few and the bar is high, so early preparation and strong numerical ability count for a lot. From analyst you progress towards trader, running your own book, or into quantitative and risk roles.

It fits quick, analytical people who thrive on pace and enjoy variety and independent decision making. You need to stay calm when things move fast, back your judgement, and cope with wins and losses in real time. It is a poor fit for those who prefer slow, reflective work or dislike pressure and risk.

Trading has already been transformed by electronic and algorithmic systems that handle much of what people once did by hand, so the surviving roles are increasingly quantitative and code heavy. Demand for traditional voice traders has fallen, while demand for those who can combine market sense with programming and data skills has risen. The floor is smaller and more technical than it used to be.

The work is office and trading floor based in financial centres, with early starts tied to market hours and high intensity during the day. Graduate pay typically starts around £45k to £60k base, with bonuses that can be large and closely linked to performance. Demand is selective and competitive, with fewer seats than applicants.`,

  risk_analyst: `A Risk Analyst helps an organisation understand and control the things that could go wrong. In finance that means measuring exposure to losses from markets, borrowers or day to day operations, and helping the business stay within safe limits. It is a role built on caution and clear thinking, and it has grown steadily more important since the financial crisis.

You spend your time gathering and analysing data, building models that estimate potential losses, monitoring risk limits, and writing reports that flag concerns to decision makers. You test what happens under stressed conditions, track exposures over time, and help design controls that keep risk in check. The work is analytical, methodical and detail driven.

Most people enter through a graduate scheme at a bank, insurer or consultancy, usually after an internship, and apprenticeship routes into risk are becoming more common. A frequent side door is to start in another analyst or operations role and move into risk once you know the business, since understanding the wider organisation is an advantage. Entry is competitive but nothing like as narrow as front office banking. From analyst you progress to senior risk roles and risk management, and the skills transfer across banking, insurance and consulting.

It suits careful, analytical people who value security and stability and like bringing structure to uncertainty. You need precision, comfort with data and the mastery to understand your models deeply rather than just run them. It is a poor fit for those who want fast, opportunistic work or find detailed monitoring tedious.

Risk keeps expanding as new threats appear, from climate and cyber risk to the model risk created by AI itself, and each wave of regulation adds more work. Automation now handles much of the routine data crunching, which pushes analysts towards judgement and interpretation rather than manual reporting. The outlook is strong and the field is widening rather than narrowing.

The work is office based with generally steady and predictable hours. Graduate risk roles typically pay around £30k to £45k, rising to £50k to £75k and beyond as you specialise, with bonuses on top. Demand is strong and resilient, as regulation and complexity keep risk skills in constant need.`,

  actuarial_analyst: `An Actuarial Analyst uses maths and statistics to measure and price risk, mainly in insurance and pensions. You work out how likely future events are, such as accidents, illness or how long people will live, and what they are worth in money terms today. It is one of the most rigorous and respected quantitative careers, built on turning uncertainty into numbers a business can act on.

Day to day you build and run models, analyse large datasets, calculate reserves and premiums, and prepare reports for actuaries and managers. You test assumptions, check results carefully, and help make sure an insurer or pension scheme stays financially sound. The work is deeply analytical and precise, and much of it revolves around getting complex calculations exactly right.

You get in through a trainee or graduate scheme at an insurer, consultancy or pension firm, usually applying directly, sometimes after an internship, and there are now actuarial apprenticeships that let you qualify without a degree. Whichever route you take, the defining feature is that you join and then sit the professional actuarial exams over several years while working, with employers giving study time and exam leave. Entry is competitive and the exams are demanding, so persistence matters as much as getting the offer. Once qualified you become an actuary, with paths into pricing, risk, investment and senior leadership.

It suits patient, analytical people who value security and stability and enjoy mastering difficult material over time. You need real precision, comfort with data and the persistence to combine full time work with hard exams. It is a poor fit for those who want fast results or dislike sustained, detailed study.

The profession is broadening well beyond its traditional home in insurance and pensions into data science, climate risk, banking and health, as the same modelling skills apply to new kinds of uncertainty. Automation handles more of the routine calculation, which raises the value of judgement and programming, so trainees increasingly work in code as well as spreadsheets. Demand stays strong and the qualification travels further than ever.

The work is office based with steady, predictable hours and a strong study support culture. Trainee analysts typically start around £30k to £40k, and pay rises quickly with each exam passed, reaching well into six figures for qualified actuaries. Demand is consistently strong, and qualified actuaries are among the most secure professionals in finance.`,

  assistant_accountant: `An Assistant Accountant keeps the financial records of an organisation accurate and up to date. You support qualified accountants with the day to day numbers that show how a business is performing, from invoices and payments to monthly reports. It is a widely available, practical entry point into accounting and finance, and a common first step towards professional qualification.

Day to day you process transactions, reconcile accounts, prepare parts of the monthly and year end figures, and help produce reports and budgets. You chase and check information, keep ledgers tidy, and make sure numbers add up and deadlines are met. The work is structured and detailed, with a steady rhythm of regular tasks.

This is one of the most accessible finance roles to get into. Many people start through an apprenticeship, often studying towards the AAT qualification while working, and school leaver programmes and direct entry from an administrative or part qualified role are all common. Graduates enter too, but a degree is genuinely optional here, which is part of the appeal. From this base you study towards a professional qualification such as ACCA, ACA or CIMA and progress to accountant, then towards management accountant, financial accountant or finance manager.

It fits organised, dependable people who like structure and take pride in accurate, reliable work. You need precision, steadiness and a methodical approach, and enough curiosity to understand what the numbers mean. It is a poor fit for those who want fast paced, unstructured work or dislike routine and detail.

Cloud accounting software and AI bookkeeping are automating much of the routine processing that once filled these roles, which is steadily shifting the job away from data entry and towards checking, analysis and oversight. There are still a large number of jobs, but the nature of the work is changing and the value increasingly sits in understanding the numbers rather than just recording them. The professional qualifications remain a reliable route to secure, well paid work.

The work is office based, often with hybrid working, and hours are generally regular and predictable. Trainee and assistant roles typically pay around £22k to £32k, rising steadily as you qualify towards £40k to £55k and beyond. Demand is broad and stable, as almost every organisation needs people who can keep its accounts in order.`,

  esg_analyst: `An ESG Analyst assesses how companies and investments perform on environmental, social and governance issues. You look beyond profit to how a business treats the planet, people and its own conduct, and help investors and firms act on what you find. It is a fast growing field where finance meets purpose, driven by climate concern, regulation and changing expectations.

Day to day you gather and analyse data on things like carbon emissions, working conditions and board governance, score companies against ESG standards, and write reports that inform investment or strategy decisions. You keep up with evolving regulation and frameworks, and help translate broad goals into measurable analysis. The work combines financial thinking with research across a wide range of real world issues.

Because the field is young, the routes in are still forming. A growing number of asset managers, banks and consultancies run graduate schemes with an ESG or sustainability track, but many analysts arrive by starting in a general finance or research role and specialising, or by taking a sustainability focused master's. Internships and specialist ESG certificates are common stepping stones. Demand is rising and the door is opening wider, though roles vary a lot in what they actually involve. From analyst you progress to senior ESG and sustainable investment roles, and into strategy and advisory work as the field matures.

It suits thoughtful, analytical people driven by purpose and impact, with curiosity about global and social issues as well as numbers. You need precision, a genuine interest in the subject and some originality, since standards are still taking shape. It is a poor fit for those who want narrow, purely quantitative work or are sceptical of the field's aims.

This is one of the fastest moving and least settled areas in finance. It has grown very quickly, but has also met scrutiny over greenwashing and political backlash in some markets, so demand can be bumpy even as regulation in the UK and Europe keeps tightening. The role is professionalising and standardising as it matures, which should make it more stable over time, but expect the ground to keep shifting.

The work is mostly office based with generally reasonable hours. Entry level roles typically pay around £30k to £45k, rising to £50k to £70k and beyond with experience, with bonuses in investment settings. Demand is rising quickly, though the field is still young and roles vary widely in focus.`,

  financial_analyst: `A Financial Analyst helps an organisation understand its own performance and plan ahead. You turn financial data into insight, showing how the business is doing, where money is being made or lost, and what the numbers say about the future. It is a core commercial role that exists in almost every company, not just in finance firms.

Day to day you build models and forecasts, analyse results against budgets, prepare reports for managers, and help with planning and decisions such as pricing, investment or cost control. You dig into data to explain why numbers moved, and present findings clearly to people who are not finance specialists. The work blends detailed analysis with a practical, commercial focus on helping the business act.

This is a broad and reachable role, because almost every sector hires financial analysts, not just banks. Most people enter through a graduate scheme, an internship that converts, or by moving up from a finance assistant or accounting role, and apprenticeships are increasingly available. Professional qualifications such as CIMA or ACCA are often started on the job and are commonly supported by employers. Entry is competitive but far more open than specialist finance roles, and from analyst you progress to senior analyst and finance business partner, then towards finance manager and leadership.

It suits analytical, curious people who like working with data and enjoy turning it into useful answers. You need precision, some structure and the drive to make your analysis genuinely useful rather than just correct. It is a broad, flexible role that fits many profiles, and is less suited to those who dislike numbers or detailed work.

Routine reporting is increasingly automated by business intelligence tools and AI, which is moving the role away from producing numbers and towards interpreting them and advising the business. That makes data and communication skills more central and the work more interesting, while keeping demand broad and resilient across every sector. The job is evolving into more of a partnering role than a number crunching one.

The work is office based, commonly hybrid, with generally steady hours busier around reporting periods. Graduate and early roles typically pay around £30k to £42k, rising to £50k to £70k and beyond as you specialise, with bonuses on top. Demand is broad and stable across every sector, which makes it one of the most transferable roles in finance.`,

  corporate_finance_analyst: `A Corporate Finance Analyst helps companies make big financial decisions, such as raising money, buying or selling businesses, and valuing deals. You do similar analysis to an investment banker, but often from inside a company or an advisory firm rather than a large bank. It is a role focused on the numbers behind a company's strategy and growth.

Day to day you build financial models, value businesses and projects, analyse funding options, and prepare the analysis and documents behind a deal or investment case. You work with senior finance staff and advisers, and much of the job is making sure the figures behind a major decision are sound. The work is analytical, detailed and deadline driven around live transactions.

Most analysts get in through a graduate scheme at an accountancy or advisory firm, a bank, or a large company's finance function, usually after an internship. A very common route is to qualify as an accountant first, often through the ACA, and then move into a corporate finance team, so training contracts are a reliable side door. Entry is competitive but broader than front office investment banking. From analyst you progress to manager and senior corporate finance roles, or move across into private equity, in house strategy or investment banking.

It suits driven, analytical people who want their work to matter and enjoy the detail of a deal. You need precision, structure and the ambition to handle high stakes analysis under time pressure. It is a poor fit for those who dislike intense periods of work or want to avoid financial modelling.

As with investment banking, automation and AI now handle more of the routine modelling and document work, so the value is shifting towards judgement and advice. Private capital and mid market deals are a growing source of work, and more corporate finance happens outside the big banks than it used to. The core skills stay in demand even as the tools change.

The work is office based, often with busy deal periods and quieter spells, and hours are demanding but usually less extreme than a bulge bracket bank. Graduate and early roles typically pay around £30k to £45k, rising to £55k to £85k and beyond with experience and bonuses. Demand is steady, and the deal skills you build transfer widely across finance.`,

  investment_analyst: `An Investment Analyst researches where money should be invested to earn the best return for an acceptable level of risk. You study companies, funds, sectors or whole markets and recommend what a fund or client should buy, hold or sell. It sits on the buy side of investing, where your analysis directly shapes real investment decisions.

Day to day you analyse financial data and markets, build models and forecasts, meet companies and read widely, then set out your investment views in notes and recommendations. You track how investments are performing and feed ideas to the portfolio managers who make the final calls. The work is analytical, independent and driven by forming a well reasoned opinion about the future.

Most people enter through a graduate scheme at an asset manager, investment house or pension fund, usually after a summer internship in the same area. Many take the CFA exams as a recognised route into the profession, and some move across from sell side research or another finance role once they have proven their analysis. Places are limited and competitive. From analyst you progress towards senior analyst and then portfolio manager, running money yourself.

It suits curious, analytical people with a drive for mastery who enjoy going deep, thinking independently and forming their own original view. You need comfort with data, precision, and the confidence to back a judgement over time. It is a poor fit for those who want quick certainty or dislike being measured on their calls.

The rise of low cost passive investing has put pressure on traditional active management, so firms increasingly need analysts who can add genuinely differentiated insight rather than follow the crowd. AI and data tools now handle much of the routine number gathering, raising the value of judgement and unusual angles. The industry is leaner and more selective, but strong investors remain sought after.

The work is mostly office based in financial centres, with steadier hours than deal making finance. Graduates typically start around £35k to £55k, and experienced analysts and portfolio managers earn well into six figures with bonuses. Demand is selective, and the investment judgement you build is highly valued across the asset management world.`,

  portfolio_analyst: `A Portfolio Analyst supports the people who manage investment portfolios, helping keep them well constructed, well understood and on track. You monitor how a set of investments is performing, analyse risk and returns, and give portfolio managers the information they need to make decisions. It is a role at the heart of how money is actually managed day to day.

Day to day you track portfolios against their targets, analyse performance and risk, run data and models, and prepare reports for managers and clients. You check that holdings fit the strategy and rules, and flag anything that needs attention. The work is analytical, precise and structured, with a strong focus on accuracy.

Most analysts enter through a graduate scheme at an asset manager, wealth manager or investment firm, often after an internship, and many study the CFA alongside work. A common route is to start in a support or operations role and move up as you show strong analytical skills. Entry is competitive but more open than front office investing. From analyst you can progress towards portfolio manager, taking on investment decisions, or specialise in performance and risk.

It suits analytical, organised people who enjoy working with data and like structure and accuracy. You need precision, comfort with numbers and the mastery to understand what the figures really mean. It is a poor fit for those who dislike detailed monitoring or want a highly client facing role.

Portfolio work is becoming more data and technology driven, with automation handling routine monitoring and reporting, which shifts the value towards analysis and insight. Passive and rules based investing is growing, and quantitative skills are increasingly useful. The role is stable but tilting towards those comfortable with data and tools.

The work is office based with generally steady hours. Graduates typically start around £35k to £50k, rising to £60k to £90k and beyond as you take on investment responsibility, with bonuses on top. Demand is steady across the investment industry, and the skills transfer well into portfolio management.`,

  commercial_banking_associate: `A Commercial Banking Associate helps banks look after their business customers, from small firms to larger companies. You build relationships with these clients and help them get the lending, accounts and services they need to run and grow. It is a people focused, relationship led role where understanding a business matters as much as the numbers.

Day to day you meet and support business clients, understand their needs, prepare lending and service proposals, and work with credit and product teams to put deals together. You keep relationships healthy, spot new opportunities to help, and make sure clients get good, compliant service. The work blends commercial conversation with financial analysis and reliable follow through.

Most associates enter through a bank graduate scheme, and banks also run strong school leaver and apprenticeship routes that lead into commercial banking without a degree. Progression from a branch, business support or analyst role into a relationship team is very common. Entry is competitive but accessible, with people skills counting for a lot. From associate you progress to relationship manager owning your own portfolio of clients, and then to senior and director level relationship roles.

It suits outgoing, driven people who combine social confidence with genuine interest in helping businesses succeed. You need reliability, commercial awareness and enough comfort with numbers to understand a client's finances. It is a poor fit for those who prefer purely technical, behind the scenes work.

Business banking is being reshaped by digital tools and fintech competitors that automate simpler lending and services, which pushes human associates towards more complex needs and stronger relationships. Sustainability linked finance is also growing. The role remains people centred, but the routine parts are increasingly handled by technology.

The work is office based with regular client visits, and hours are generally reasonable and predictable. Graduate and early roles typically pay around £28k to £42k, rising to £50k to £75k and beyond as you build a client portfolio, with bonuses linked to performance. Demand is stable, and relationship banking skills are valued across the sector.`,

  sales_trading_analyst: `A Sales and Trading Analyst connects a bank's clients with the financial markets. You help sell trade ideas and financial products to investors, and support the trading desk in pricing and executing their orders. It is a fast, people driven corner of the markets, where building trust with clients matters as much as knowing the numbers.

Day to day you talk to clients about market opportunities, relay their orders to traders, help price products, and keep on top of market news and moves. You act as the link between investors and the trading floor, so you need to think quickly and communicate clearly under pressure. The work is high tempo, sociable and closely tied to live markets.

Entry is through highly competitive graduate schemes on bank trading floors, almost always after a summer internship, with first year insight days as the starting point. As with trading, early preparation, strong numerical ability and confident communication matter more than a specific degree. Places are few and the bar is high. From analyst you progress towards a full sales or trading role owning client relationships or a book, or move into other markets roles.

It suits energetic, sociable people who thrive on pace and enjoy building relationships while staying on top of fast moving information. You need social confidence, quick analytical thinking and the resilience to handle pressure and setbacks. It is a poor fit for those who prefer quiet, reflective work or dislike constant client contact.

Electronic trading has automated much of the simple execution that sales traders once handled, so the surviving roles focus on complex products, big relationships and genuine market insight. Clients increasingly trade straightforward products themselves through platforms. The floor is smaller and more specialised, rewarding those who add real value beyond execution.

The work is office and trading floor based in financial centres, with early starts tied to market hours and high intensity through the day. Graduate pay typically starts around £45k to £60k base, with bonuses that can be significant and linked to performance. Demand is selective and competitive, with far more applicants than seats.`,

  treasury_analyst: `A Treasury Analyst helps an organisation manage its money so it always has enough cash, at the right time, at the lowest sensible cost and risk. You look after the flow of funds, borrowing, and exposure to things like interest rates and currencies. It is a role that keeps the financial engine of a company or bank running smoothly.

Day to day you monitor cash positions, forecast what money will be needed, manage funding and short term investments, and help handle risks from currencies and interest rates. You work with banks and internal teams, keep accurate records, and make sure obligations are always met. The work is analytical, structured and detail focused, with a strong emphasis on reliability.

Most people enter through a graduate scheme at a large company or bank, or by moving into treasury from an accounting or finance role, and apprenticeships into finance can lead here too. Many study the Association of Corporate Treasurers qualifications while working, which is the recognised professional route. Entry is competitive but less of a bottleneck than front office finance. From analyst you progress to treasury manager and then head of treasury, or into risk and corporate finance.

It suits careful, analytical people who value security and stability and like structure and accuracy. You need precision, reliability and comfort with data. It is a poor fit for those who want fast paced dealing or dislike detailed, process driven work.

Treasury is being modernised by technology that automates cash management and gives a real time view of money across an organisation, which frees analysts to focus on forecasting and strategy. As markets and rates become less predictable, good treasury judgement is increasingly valued. The role is growing more strategic even as the routine work is automated.

The work is office based, often hybrid, with generally steady and predictable hours. Graduate and early roles typically pay around £30k to £45k, rising to £55k to £80k and beyond as you qualify and take on responsibility, with bonuses on top. Demand is steady, and treasury skills are needed across companies and banks alike.`,

  liquidity_analyst: `A Liquidity Analyst makes sure a bank always has enough ready money to meet its obligations, even under stress. You measure and monitor the bank's ability to pay what it owes when it falls due, a lesson hard learned in the financial crisis. It is a specialised, closely watched role at the intersection of treasury and risk.

Day to day you track the bank's cash and funding, model what would happen under stressed conditions, monitor regulatory liquidity measures, and prepare reports for managers and regulators. You keep a close eye on limits and rules, and flag anything that could threaten the bank's ability to pay. The work is analytical, precise and heavily governed by regulation.

Most analysts enter through a bank graduate scheme, often after an internship, or move in from treasury, risk or finance roles. A strong numerate degree helps, and professional risk or treasury qualifications are usually gained on the job. Entry is competitive but accessible to those with solid analytical skills. From analyst you progress into senior liquidity, treasury and risk management roles.

It suits careful, analytical people who value security and stability and like bringing structure to complex rules. You need precision, comfort with data and reliability. It is a poor fit for those who want fast, opportunistic work or dislike heavy regulation and detail.

Since the financial crisis, liquidity rules have grown steadily more demanding, which keeps this a well supported and expanding specialism. Automation now handles much of the routine reporting, moving analysts towards analysis, stress testing and interpretation. The outlook is strong, as regulators keep liquidity firmly in focus.

The work is office based with generally steady hours. Graduate and early roles typically pay around £35k to £50k, rising to £60k to £90k and beyond as you specialise, with bonuses on top. Demand is strong and resilient, driven by regulation and the lasting lessons of past crises.`,

  compliance_analyst: `A Compliance Analyst helps a financial firm follow the rules and stay on the right side of regulators. You check that the business behaves properly, treats customers fairly and avoids financial crime, and you help fix things when it does not. It is a role built on integrity and clear thinking, and it has grown steadily more important and better respected.

Day to day you monitor activity for anything that breaks the rules, review policies and transactions, investigate concerns, and help train colleagues on what they must do. You keep up with changing regulation, prepare reports, and work with many parts of the business. The work is detailed, methodical and centred on doing the right thing.

Compliance is one of the more open finance careers to enter. Many join through a graduate scheme, but just as many move across from operations, customer service, legal or audit roles, and apprenticeships into compliance and financial crime are increasingly common. A specific degree is rarely essential, and professional qualifications are usually gained on the job. From analyst you progress to compliance manager and then senior compliance and financial crime leadership.

It suits principled, organised people who value security and reliability and like getting things right. You need precision, sound judgement and the confidence to raise concerns. It is a poor fit for those who dislike rules and detail or want a purely commercial role.

Regulation keeps expanding, so demand for compliance staff stays strong, while regtech and AI now automate much of the routine monitoring and screening. That shifts analysts towards judgement, investigation and interpreting grey areas rather than manual checking. Financial crime and fraud are a particular growth area. The field is expanding and professionalising.

The work is office based, often hybrid, with generally steady and predictable hours. Graduate and early roles typically pay around £28k to £42k, rising to £50k to £80k and beyond as you specialise, with bonuses on top. Demand is strong and resilient, as every regulated firm needs people who keep it compliant.`,

  middle_office_analyst: `A Middle Office Analyst sits between the traders who make deals and the back office that settles them, making sure trades are correct, understood and properly controlled. You check that what was traded is accurately recorded, valued and within risk limits. It is a role that keeps a bank's trading activity accurate and safe.

Day to day you confirm and validate trades, calculate profit and loss and risk on positions, resolve discrepancies, and act as a link between the trading desk and support teams. You keep a close eye on limits and exposures, and make sure problems are caught early. The work is analytical, structured and detail driven, with a steady daily rhythm around the markets.

Most analysts enter through a bank graduate scheme, or by moving up from a back office or operations role, and internal moves are very common. A numerate degree helps but is not always essential, and much is learned on the job. Entry is competitive but more accessible than front office trading. From analyst you can progress into risk, product control or trading support management, and the markets knowledge you gain can open other desks.

It suits analytical, organised people who like structure and accuracy and enjoy understanding how trading works. You need precision, reliability and comfort with data. It is a poor fit for those who want front line dealing or dislike detailed checking.

Automation is steadily taking over the routine reconciliation and validation that filled these roles, which moves analysts towards handling exceptions, controls and analysis. The middle office is becoming leaner and more focused on judgement and oversight. The knowledge you build remains a strong stepping stone into risk and other markets roles.

The work is office based with hours tied to market activity, generally steadier than the trading desk. Graduate and early roles typically pay around £30k to £45k, rising to £50k to £70k and beyond as you specialise, with bonuses on top. Demand is stable, and the role is a well trodden route into wider markets and risk careers.`,

  banking_operations_officer: `A Banking Operations Officer keeps the machinery of a bank running behind the scenes, making sure payments, trades and transactions are processed accurately and on time. You handle the essential processing that customers and markets rely on without ever seeing it. It is a dependable, organised role at the operational heart of a bank.

Day to day you process transactions and settlements, check and reconcile records, resolve errors and queries, and make sure everything meets the bank's rules and deadlines. You work closely with other teams to keep processes flowing smoothly. The work is structured, detailed and steady, built on accuracy and reliability.

This is one of the most accessible ways into banking. Many people enter through apprenticeships or school leaver programmes, and direct entry, temporary roles that become permanent, and graduate schemes are all common. A degree is genuinely optional. From here you can progress into team leadership, or move across into middle office, risk, compliance or other analytical roles as you learn the business.

It suits organised, dependable people who like structure and take pride in getting things right. You need reliability, accuracy and a methodical approach. It is a poor fit for those who want fast paced, front line work or dislike routine and process.

Banking operations are being heavily automated, with software and, increasingly, AI handling much of the routine processing that once needed large teams, and some work has moved to lower cost locations. The number of purely processing roles is falling, and the surviving work is shifting towards oversight, control and handling exceptions. Using the role as a stepping stone into analytical careers is a smart move.

The work is office based, sometimes hybrid, with generally regular hours. Entry and early roles typically pay around £24k to £35k, rising to £40k to £55k and beyond as you take on responsibility. Demand still exists across every bank, though the nature of the work is steadily changing.`,

  impact_investment_analyst: `An Impact Investment Analyst helps invest money in a way that aims to do measurable good as well as earn a return. You assess businesses and projects for their social or environmental impact, in areas like clean energy, healthcare, education or financial inclusion. It is a role for people who want their finance career to serve a wider purpose.

Day to day you research and analyse potential investments, measure and model both their financial returns and their real world impact, and prepare recommendations for investors. You track how investments are performing against both goals, and help prove that the impact is genuine. The work combines financial analysis with a broad curiosity about how change actually happens.

The routes in are still forming, since the field is young. Many analysts arrive through a graduate scheme at an impact fund, development finance body or mainstream investor with an impact arm, and just as many specialise sideways from a general finance, consulting or research role. A sustainability or development focused master's is a common route, and internships help. Demand is rising and the door is widening. From analyst you progress to senior impact investment and fund roles, and into strategy and advisory work.

It suits purpose driven, analytical people with an entrepreneurial streak and curiosity about global and social issues. You need financial rigour, precision and genuine belief in the mission, plus some originality since the measurement standards are still developing. It is a poor fit for those who want narrow, purely financial work or are sceptical of the aims.

Impact and sustainable investing has grown quickly, but faces real scrutiny over whether the impact is genuine, and political mood varies by market, so the field can be bumpy even as regulation tightens. It is professionalising and standardising as it matures, which should steady it over time. Expect a fast moving field that is still finding its shape.

The work is mostly office based with generally reasonable hours. Entry level roles typically pay around £35k to £50k, rising to £60k to £90k and beyond with experience, with bonuses in investment settings. Demand is growing, though roles vary widely and the field is still young.`,

  private_equity_analyst: `A Private Equity Analyst helps invest in whole companies rather than shares on a market, buying, improving and later selling businesses for a profit. You analyse potential deals, help fund managers decide what to buy, and support the companies the fund owns. It is one of the most sought after and highly paid corners of finance.

Day to day you build detailed financial models, research industries and companies, carry out due diligence on possible deals, and help monitor businesses the fund already owns. You work in small, high performing teams on a handful of significant deals, so the analysis has to be deep and precise. The work is intense, commercial and focused on making good long term investment bets.

Traditionally you get in after two or three years as an investment banking or strategy consulting analyst, and that remains the most common route, though a growing number of firms now run their own graduate and analyst programmes that hire directly. Internships exist but are extremely competitive, and networking matters. Entry is among the hardest in finance. From analyst you progress to associate and then investment professional, with a path towards partner and a share of the profits.

It suits ambitious, analytical people with an entrepreneurial streak who want to own the outcome of their investment decisions. You need precision, commercial judgement and the drive to work hard on high stakes deals. It is a poor fit for those who want predictable hours or dislike intense, competitive environments.

Private capital has grown enormously, so there is more money and more roles than ever, and firms are increasingly willing to hire and train people directly rather than only poaching from banks. AI is speeding up parts of research and due diligence. The field is expanding, but entry stays fiercely competitive.

The work is office based with demanding hours, though often more sustainable than deal making banking. Pay is high, with analysts frequently earning six figures once bonuses are included, and long term earnings boosted by a share of investment profits. Demand is strong overall, but the number of seats is small relative to the number who want them.`,

  venture_capital_analyst: `A Venture Capital Analyst helps invest in young, high growth companies, betting on startups that could become the big businesses of the future. You find and assess promising early stage companies and help decide which ones the fund should back. It is a forward looking, ideas driven role at the meeting point of finance and innovation.

Day to day you research markets and trends, meet founders, analyse startups and their potential, and help evaluate possible investments. You support the companies the fund has backed, and keep a finger on the pulse of new technology and ideas. The work is varied, curious and centred on spotting potential before it is obvious.

Venture capital has unusually open and unusual routes in, because it is a small industry with few formal graduate schemes. Analysts often arrive from startups, technology, consulting or banking, or through founder and investor networks, and some funds do run analyst programmes. Internships are scarce and networking matters enormously, so building relationships and showing genuine interest in startups counts for a lot. From analyst you progress towards associate and investor roles, with a long term path to partner.

It suits curious, visionary people with an entrepreneurial streak who love ideas, technology and spotting what could grow. You need analytical judgement, comfort with uncertainty and a genuine feel for founders and markets. It is a poor fit for those who want structure and certainty or dislike high failure rates.

Venture capital rises and falls with the funding cycle, so hiring can be feast or famine, but the long term trend is growth as more money flows into startups. AI is changing both what gets funded and how funds find deals. It remains a small, relationship driven field where getting in is as much about network as credentials.

The work is office based and often flexible, with a mix of research, meetings and events. Pay varies widely, with analysts typically earning around £40k to £70k plus bonuses, and much larger long term rewards tied to the fund's success. Demand is limited by the small size of the industry, even as interest in it is high.`,

  fp_a_analyst: `An FP and A Analyst, working in financial planning and analysis, helps a company understand its performance and plan its financial future. You turn the numbers into forecasts, budgets and insight that guide business decisions. It is a core commercial finance role that sits close to how a company actually runs.

Day to day you build budgets and forecasts, analyse results against plan, model different scenarios, and prepare reports and recommendations for managers. You explain why the numbers moved and what they mean, and help the business plan spending and investment. The work blends detailed analysis with a practical focus on helping leaders decide.

Most people enter through a graduate scheme, an internship that converts, or by moving up from an accounting or finance assistant role, and apprenticeships are increasingly available. Professional qualifications such as CIMA are often studied on the job and supported by employers. This is a broad, reachable role that exists in almost every sector. From analyst you progress to senior analyst and finance business partner, then towards FP and A manager and finance leadership.

It suits analytical, driven people who enjoy turning data into useful answers and like working close to business decisions. You need precision, some structure and the drive to make your analysis genuinely useful. It is a poor fit for those who dislike numbers or detailed work.

Routine reporting is increasingly automated by planning and business intelligence tools and AI, which moves the role away from building spreadsheets towards interpreting them and advising the business. That makes analysis, storytelling and business partnering more central, and keeps demand strong across sectors. The job is becoming more strategic and less mechanical.

The work is office based, commonly hybrid, with generally steady hours busier around planning and reporting periods. Graduate and early roles typically pay around £32k to £45k, rising to £55k to £80k and beyond as you specialise, with bonuses on top. Demand is broad and stable, making FP and A one of the most transferable roles in finance.`,

  fintech_analyst: `A Fintech Analyst works at the meeting point of finance and technology, helping companies that use software to make financial services faster, cheaper or fairer. You analyse products, markets, data and customers for firms building things like digital banking, payments or lending. It is a fast moving role for people who like both money and technology.

Day to day you analyse data on products and customers, research markets and competitors, help shape and improve digital financial products, and support decisions on strategy and growth. You often work across finance, technology and product teams, so you need to speak more than one language. The work is varied, commercial and quick to change.

You can get in through a graduate role at an established fintech, a bank's innovation arm, or a startup, and many analysts arrive from a broader finance or technology background and specialise. Startups often hire directly and value genuine interest and initiative over a specific degree, and internships are a good way in. Entry is competitive but the sector is growing. From analyst you progress into product, strategy, data or leadership roles as the company scales.

It suits curious, inventive people with an entrepreneurial streak and real interest in technology. You need analytical skill, adaptability and an appetite for variety and change. It is a poor fit for those who want stability, clear structure or a narrow, unchanging role.

Fintech moves fast and is being reshaped again by AI, embedded finance and open banking, so the products and the skills keep evolving. Funding for the sector rises and falls, which makes some roles less secure, but the long term shift of finance towards technology is structural. Expect a dynamic field where staying current matters.

The work is office based or hybrid, often in a startup style environment, with hours that vary with the company. Graduate and early roles typically pay around £30k to £50k, rising to £55k to £85k and beyond as you specialise, with equity sometimes on offer at smaller firms. Demand is growing overall, though it moves with the funding cycle.`,

  product_manager: `A Product Manager decides what a digital product should do and guides the team that builds it, in this case usually a financial or fintech product. You sit between customers, business goals and the engineers and designers who make the product, and you own whether it succeeds. It is a role about turning an idea into something people actually use and value.

Day to day you research what customers need, decide what to build and in what order, write down the requirements, and coordinate designers, engineers and business teams to deliver it. You track how the product performs, learn from data and feedback, and keep improving it. The work is varied and collaborative, mixing strategy, analysis and communication.

There is no single route in. Some enter through associate product manager graduate schemes, which are competitive, while many move into product from analyst, engineering, design or business roles once they know the product and the customer. Building things, showing initiative and understanding users matter more than a specific degree. From product manager you progress to senior and lead product roles, and towards head of product and beyond.

It suits visionary, inventive people who like solving problems and bringing others together around an idea. You need analytical judgement, originality, and the communication skills to align a team. It is a poor fit for those who want narrow, purely technical work or dislike ambiguity and shifting priorities.

Product management is being reshaped by AI, both in the products themselves and in how product teams work, so data and AI literacy are increasingly expected. Demand for good product managers remains strong as more of finance becomes software. The role keeps growing in importance, but the bar for staying current is rising.

The work is office based or hybrid, collaborative and varied, with generally reasonable hours. Early and associate roles typically pay around £40k to £60k, rising to £70k to £110k and beyond for senior product managers, with equity common at startups. Demand is strong, as almost every financial firm now builds digital products.`,

  digital_payments_analyst: `A Digital Payments Analyst helps make the movement of money, from card taps to instant transfers, work smoothly, safely and quickly. You analyse how payment systems and products perform and help improve them, in one of the fastest growing parts of finance. It is a role for people fascinated by the invisible plumbing that lets money move.

Day to day you analyse payments data, monitor how systems and transactions are performing, investigate problems and fraud patterns, and help design better payment products. You work across technology, finance and risk teams, and keep up with fast changing rules and technology. The work is analytical, technical and closely tied to real time systems.

Most people enter through a graduate scheme at a bank, payments company or fintech, or by moving in from an operations, data or analyst role. A numerate or technical background helps, and much is learned on the job as the field evolves. Entry points are growing as the sector expands. From analyst you progress into payments product, data, risk or strategy roles.

It suits curious, analytical people with a real interest in technology and how systems work. You need comfort with data, precision and adaptability, since the field changes quickly. It is a poor fit for those who dislike technical detail or want a slow, unchanging role.

Digital payments is booming, driven by real time payments, open banking, digital wallets and the decline of cash, which makes it one of the more secure growth areas in finance. AI is increasingly used to detect fraud and personalise services. The field is expanding fast and the skills are in rising demand.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £32k to £48k, rising to £55k to £80k and beyond as you specialise, with bonuses on top. Demand is strong and growing, as the world keeps shifting away from cash.`,

  underwriter: `An Underwriter decides whether an insurer should take on a risk, and if so at what price. You assess things people and businesses want to insure, from homes and cars to ships and factories, and judge how likely a claim is and what to charge. It is a role of careful judgement that sits at the commercial heart of insurance.

Day to day you review applications and information, assess the level of risk, set premiums and conditions, and decide what to accept or decline. You work with brokers and clients, negotiate terms, and balance winning business against taking on sensible risk. The work is analytical and decision focused, blending data with experience and judgement.

Insurance is a welcoming field to enter. Many underwriters join through an insurer graduate scheme or a well established apprenticeship, and plenty move across from broking, claims or administrative roles. A degree helps but is often not required, and the Chartered Insurance Institute qualifications are usually studied while working. From underwriter you progress to senior and specialist underwriting, and towards underwriting management.

It suits analytical, level headed people who value security and stability and enjoy making well judged decisions. You need precision, sound judgement and the confidence to say yes or no. It is a poor fit for those who want fast paced dealing or dislike detailed risk assessment.

Underwriting is being transformed by data and AI, which increasingly price and even decide routine risks automatically, so human underwriters focus more on complex, unusual and large risks where judgement is essential. The routine end of the job is shrinking while the specialist end grows. Comfort with data and models is becoming part of the role.

The work is office based, often hybrid, with generally steady and predictable hours. Graduate and early roles typically pay around £25k to £38k, rising to £45k to £70k and beyond as you qualify and specialise, with bonuses on top. Demand is steady, and specialist underwriting judgement remains valued even as automation grows.`,

  claims_analyst: `A Claims Analyst handles what happens when an insurance customer makes a claim, making sure it is assessed fairly, accurately and in line with the policy. You investigate what happened, decide what is covered, and help get the customer paid what they are owed. It is a role where careful analysis meets real help for people at difficult moments.

Day to day you review claims and evidence, check them against policy terms, investigate anything unclear or suspicious, and decide what should be paid. You deal with customers, brokers and sometimes experts, and keep accurate records throughout. The work is analytical and detailed, with a strong sense of fairness and reliability.

This is an accessible entry point into insurance. Many people join through apprenticeships, school leaver programmes or direct entry, and graduates enter too, with a degree usually optional. The Chartered Insurance Institute qualifications are commonly studied on the job. From analyst you progress into senior and technical claims roles, complex claims handling, or across into underwriting and other insurance careers.

It suits organised, analytical people who are reliable and fair minded and take care over the detail. You need precision, sound judgement and enough empathy to deal well with customers. It is a poor fit for those who want fast paced commercial work or dislike careful, rules based assessment.

Automation and AI now handle many simple, high volume claims and help spot fraud, which shifts human analysts towards the complex, disputed and sensitive cases where judgement matters. The routine end of the work is shrinking while the skilled end remains. Comfort with the new tools is becoming part of the job.

The work is office based, often hybrid, with generally steady hours. Entry and early roles typically pay around £24k to £35k, rising to £40k to £55k and beyond as you specialise, with progression into technical claims. Demand is steady, as every insurer needs people to handle claims well.`,

  quantitative_risk_analyst: `A Quantitative Risk Analyst uses advanced mathematics and programming to measure and manage financial risk. You build the models that estimate how much a bank or fund could lose, and how likely that is, under all sorts of conditions. It is one of the most technical and intellectually demanding roles in finance.

Day to day you design and build mathematical models, write code to run them, analyse large datasets, and test how portfolios behave under stress. You explain complex results to risk managers and check that the models are sound and well understood. The work is deeply analytical, technical and focused on getting difficult modelling right.

Most quantitative risk analysts get in with a strong numerate master's or PhD in a subject such as mathematics, physics, engineering, statistics or financial mathematics, often through a bank's quant graduate scheme after an internship. Strong programming and mathematical ability are the defining requirements, and entry is competitive and technical. From analyst you progress into senior quant and risk modelling roles, and the skills open doors across trading, data science and beyond.

It suits deeply analytical, inventive people with a drive for mastery who enjoy hard mathematics and building things in code. You need real technical strength, precision and the independence to work through difficult problems. It is a poor fit for those who dislike heavy maths or want a people facing role.

Machine learning and AI are increasingly part of risk modelling, and the risks created by AI models themselves are a fast growing area of work. Regulation keeps demand for skilled quants high, and the tools keep advancing. The field is strong and increasingly technical, rewarding those who keep their skills current.

The work is office based with generally steady hours. Graduate and early roles typically pay around £40k to £60k, often higher given the advanced qualifications, rising to £80k to £120k and beyond as you specialise, with bonuses on top. Demand is strong for genuinely skilled quants across banking and beyond.`,

  pricing_analyst: `A Pricing Analyst works out the right price to charge for a product or service, using data to balance winning business against making a profit. In finance and insurance this often means pricing policies, loans or services so they are competitive but still sound. It is an analytical role with a direct impact on how a business performs.

Day to day you analyse data on customers, costs and markets, build and refine pricing models, test how different prices would perform, and recommend what to charge. You work with commercial, risk and data teams, and monitor how prices play out in practice. The work is analytical, data heavy and closely tied to business results.

Most people enter through a graduate scheme at an insurer, bank or data driven company, or by moving in from an actuarial, data or analyst role, and apprenticeships into these areas can lead here. A numerate degree helps, and modelling skills are often built on the job. Entry is competitive but reachable for strong analytical candidates. From analyst you progress to senior pricing and towards pricing manager and leadership.

It suits analytical, curious people who enjoy working with data and like seeing their analysis affect real outcomes. You need comfort with numbers, precision and some structure. It is a poor fit for those who dislike detailed data work or want a mainly people facing role.

Pricing is being transformed by machine learning and AI, which power more sophisticated and dynamic pricing across insurance, lending and retail finance. That raises the value of analysts who can build and understand these models, and makes data skills central. Demand is growing as pricing becomes ever more data driven.

The work is office based, often hybrid, with generally steady hours. Graduate and early roles typically pay around £30k to £45k, rising to £50k to £75k and beyond as you specialise, with bonuses on top. Demand is strong and growing across insurance, banking and beyond.`,

  // ── Data, Analytics & Quantitative Insight ──────────────────────────────
  operational_research_analyst: `An Operational Research Analyst uses maths and modelling to help organisations make better decisions and run more efficiently. You take real problems, such as how to schedule staff, route deliveries or plan a hospital, and find the best solution within the constraints. It is analytical work aimed squarely at practical impact.

Day to day you turn a messy real world problem into a model, gather and analyse data, run optimisation and simulation techniques, and recommend the best course of action. You explain your findings to managers who are not specialists, and often help put the solution into practice. The work is deeply analytical and creative, since much of the skill is framing the problem well.

Most analysts enter through a graduate scheme, often in government, consulting, logistics or defence, or by moving in from another analytical role, and a numerate degree helps. In government the Operational Research and analytical fast streams are a well known route, and internships and apprenticeships into analysis exist too. Entry is competitive but reachable for strong problem solvers. From analyst you progress to senior analyst and consultant roles, and the modelling skills transfer widely.

It suits inventive, analytical people with a drive for mastery who enjoy solving hard, practical problems and like working independently. You need comfort with data, precision and the creativity to model a problem clearly. It is a poor fit for those who dislike maths or want a purely people facing role.

As organisations gather more data and automate more decisions, the ability to model a problem and optimise it is in growing demand, increasingly alongside data science and machine learning. AI tools help build and run models faster, raising the value of clear problem framing. The field is steady and widening rather than shrinking.

The work is office based or hybrid, with generally steady hours. Graduate and early roles typically pay around £30k to £45k, rising to £50k to £70k and beyond as you specialise, with higher pay in consulting and finance. Demand is steady across government, industry and consultancy.`,

  business_intelligence_analyst: `A Business Intelligence Analyst helps an organisation see itself clearly through data, turning raw numbers into dashboards and reports that show how the business is doing. You make information easy to understand so leaders can make better decisions. It is a practical, widely needed role at the meeting point of data and business.

Day to day you gather data from different systems, build dashboards and reports, analyse trends, and answer questions from teams across the business. You work with databases and visualisation tools, and much of the job is making complex data simple and reliable. The work is analytical, structured and focused on giving people the information they need.

Most people enter through a graduate scheme, a data analyst apprenticeship, or by moving up from a reporting or analyst role, and a numerate or technical background helps. Data analytics apprenticeships are now a very common and accessible route, so a degree is not always required. Entry is reachable for those who can work with data. From analyst you progress to senior BI analyst, analytics lead, or across into data science and engineering.

It suits curious, organised people who enjoy working with data and like bringing structure and clarity. You need comfort with numbers and tools, precision, and the independence to dig into a question. It is a poor fit for those who dislike detail or want a role away from data.

Self service tools and AI are automating much of the routine dashboard building, which shifts BI analysts towards deeper analysis, data storytelling and helping the business ask better questions. Demand for people who can turn data into clear insight stays strong across every sector. The role is becoming more about insight than reporting.

The work is office based or hybrid, with generally steady hours. Graduate and early roles typically pay around £30k to £45k, rising to £50k to £70k and beyond as you specialise, with bonuses in some sectors. Demand is broad and stable, as almost every organisation now runs on data.`,

  reporting_analyst: `A Reporting Analyst produces the regular reports an organisation relies on to track its performance and meet its obligations. You gather data, check it carefully, and turn it into clear, accurate reports for managers, regulators or clients. It is a dependable, detail focused role that keeps a business informed.

Day to day you pull data from systems, build and run reports, check figures for accuracy, and present results in a clear and consistent way. You keep to tight reporting deadlines and make sure the numbers can be trusted. The work is structured, precise and steady, with a regular rhythm of reporting cycles.

This is an accessible entry point into data work. Many people join through a data or business apprenticeship, direct entry, or by moving from an administrative role, and graduates enter too, with a degree often optional. Skills in spreadsheets and reporting tools are usually built on the job. From analyst you progress into business intelligence, data analysis and wider analytics roles as you grow your skills.

It suits organised, reliable people who take pride in accurate work and like a clear structure. You need precision, comfort with data and a methodical approach. It is a poor fit for those who want open ended, unstructured work or dislike routine.

Automation and self service reporting tools are steadily taking over routine report production, which is shifting the role towards analysis, quality control and helping people use the reports well. Purely manual reporting jobs are declining, so building broader analytics skills is a smart move. The role is a solid stepping stone into richer data careers.

The work is office based or hybrid, with generally regular hours busier at reporting times. Entry and early roles typically pay around £26k to £38k, rising to £45k to £60k and beyond as you move into broader analytics. Demand is steady, though the work is shifting towards analysis and away from manual reporting.`,

  insight_analyst: `An Insight Analyst digs into data to answer the questions a business really cares about, such as why sales changed or what customers want next. You go beyond reporting the numbers to explaining what they mean and what to do about it. It is a role for curious people who like turning data into decisions.

Day to day you analyse data from many sources, look for patterns and explanations, test ideas, and present clear findings and recommendations to teams across the business. You frame the questions as well as answer them, and much of the value is in the story you tell with the data. The work is analytical, investigative and closely tied to real decisions.

Most people enter through a graduate scheme, a data apprenticeship, or by moving up from a reporting or junior analyst role, and a numerate background helps. Analytics apprenticeships make this reachable without a degree, and internships are a good way in. Entry is competitive but accessible for strong analytical thinkers. From analyst you progress to senior insight analyst and analytics lead, or specialise in customer, product or market insight.

It suits curious, analytical people who enjoy solving puzzles and like working independently to get to an answer. You need comfort with data, precision and the ability to explain findings clearly. It is a poor fit for those who dislike numbers or want a role away from analysis.

AI and automation increasingly handle the routine data preparation, which frees insight analysts to focus on the harder questions and on communicating what the data means. Demand for people who can turn data into decisions stays strong across sectors. The role is becoming more about judgement and storytelling than number crunching.

The work is office based or hybrid, with generally steady hours. Graduate and early roles typically pay around £28k to £42k, rising to £50k to £70k and beyond as you specialise, with bonuses in some sectors. Demand is broad and growing as organisations lean more on data.`,

  customer_insight_analyst: `A Customer Insight Analyst helps a business understand its customers deeply, using data to learn who they are, what they do and what they want. You turn that understanding into insight that shapes products, marketing and service. It is a role where data meets real human behaviour.

Day to day you analyse customer data, spot patterns in behaviour, segment different types of customer, and present findings that help the business serve them better. You combine numbers with an understanding of people, and work closely with marketing, product and commercial teams. The work is analytical and investigative, with a strong focus on the customer.

Most people enter through a graduate scheme, a data apprenticeship, or by moving up from an analyst or marketing role, and a numerate or social science background helps. Analytics apprenticeships and internships make this accessible without a specific degree. Entry is competitive but reachable. From analyst you progress to senior customer insight roles and analytics leadership, or across into product and marketing analytics.

It suits curious, analytical people who are genuinely interested in people as well as numbers. You need comfort with data, precision and the ability to translate findings into action. It is a poor fit for those who dislike detailed analysis or have little interest in customers.

Richer data and AI now make it possible to understand customers in far more detail, while automation handles more of the routine analysis, raising the value of interpretation and ideas. Privacy rules also shape what is possible, adding a layer of care. Demand is strong as businesses compete on customer understanding.

The work is office based or hybrid, with generally steady hours. Graduate and early roles typically pay around £28k to £42k, rising to £50k to £70k and beyond as you specialise, with bonuses in some sectors. Demand is broad and growing across consumer facing industries.`,

  data_scientist: `A Data Scientist uses statistics, coding and machine learning to find patterns in data and build models that predict, classify or recommend. You tackle problems that ordinary analysis cannot, and turn large, messy datasets into something useful. It is one of the most in demand technical roles across almost every industry.

Day to day you collect and clean data, explore it, build and test models, and explain what you find to people who are not specialists. You write a lot of code, run experiments, and often put your models into real products or decisions. The work is analytical and creative, mixing deep theory with hands on building.

Most data scientists enter with a strong numerate or computing degree, often a master's, through a graduate scheme or by moving up from an analyst role, and data science apprenticeships and conversion courses are a growing route. Strong programming, statistics and problem solving matter, and a portfolio of real projects helps. Entry is competitive but the field is large. From data scientist you progress to senior and lead roles, or specialise in machine learning, AI or data engineering.

It suits inventive, analytical people with a drive for mastery who enjoy going deep, building things and working independently. You need strong technical skills, curiosity and originality. It is a poor fit for those who dislike coding or want a non technical role.

The field moves quickly as models, tools and computing power keep advancing, and generative AI is reshaping both what data scientists build and how they work. Routine modelling is increasingly automated, raising the value of judgement, problem framing and putting models to real use. Demand stays strong, but keeping skills current matters.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £35k to £55k, rising to £65k to £95k and beyond as you specialise, with more at large technology firms. Demand is strong across almost every sector.`,

  statistician: `A Statistician designs how data is collected and analysed so that conclusions drawn from it are reliable. You help separate real signal from random noise, and make sure decisions in science, government, medicine and business rest on sound evidence. It is a rigorous role built on careful thinking about uncertainty.

Day to day you design studies and experiments, choose and apply statistical methods, analyse data, and interpret what the results really mean. You advise others on what the evidence supports, and communicate findings clearly and honestly. The work is precise, analytical and centred on getting the reasoning right.

Most statisticians enter with a strong degree in statistics, mathematics or a related field, often a master's, through a graduate scheme in government, healthcare, research or industry. The Government Statistical Service and health research bodies are well known routes, and apprenticeships in data are emerging. Entry is competitive but demand is steady. From statistician you progress to senior and principal roles, and into data science, research or leadership.

It suits careful, analytical people with a drive for mastery who value precision and enjoy working through problems rigorously. You need strong statistical skill, comfort with data and honesty about what the evidence shows. It is a poor fit for those who dislike maths or want quick, rough answers.

As data grows and machine learning spreads, demand is rising for people who understand not just how to run a method but whether its assumptions hold. Automation handles more of the routine work, raising the value of sound judgement about evidence. The field is steady and increasingly overlaps with data science.

The work is office based or hybrid, with generally steady hours. Graduate and early roles typically pay around £30k to £45k, with government roles at the lower end and industry higher, rising to £55k to £80k and beyond with experience. Demand is steady across government, health, research and business.`,

  product_analyst: `A Product Analyst helps the team building a digital product understand how people actually use it and what to improve. You turn data on user behaviour into insight that guides what gets built next. It is a role at the heart of how modern software products are developed.

Day to day you analyse how users move through a product, measure what is working, help design and read experiments, and share findings with product and engineering teams. You help decide what to build and prove whether changes made a difference. The work is analytical and fast moving, closely tied to product decisions.

Most people enter through a graduate scheme at a technology or product company, or by moving in from a data, analyst or product support role, and a numerate background helps. Analytics apprenticeships and internships are good routes, and a portfolio of real analysis helps you stand out. Entry is competitive but the sector is growing. From analyst you progress to senior product analyst, analytics lead, or across into product management and data science.

It suits curious, analytical people who enjoy variety and like seeing their work shape a product. You need comfort with data, precision and the ability to work at pace. It is a poor fit for those who want a slow, highly structured role or dislike ambiguity.

As products become more data driven, demand for product analysts has grown, and AI now speeds up much of the routine analysis, raising the value of good questions and clear insight. Experimentation and measurement are increasingly central to how products are built. The role is expanding as software eats more of the economy.

The work is office based or hybrid, often in a fast paced environment, with generally reasonable hours. Graduate and early roles typically pay around £35k to £50k, rising to £60k to £85k and beyond as you specialise, with more at large technology firms. Demand is strong across the technology sector and beyond.`,

  growth_analyst: `A Growth Analyst uses data to help a business attract, keep and get more value from its customers. You find where growth is coming from, spot what is holding it back, and test ideas to improve it. It is an entrepreneurial, data driven role focused on making a business grow faster.

Day to day you analyse how customers are acquired and retained, run experiments on marketing and product changes, measure what works, and recommend where to invest for growth. You work across marketing, product and data teams at pace, chasing measurable improvement. The work is analytical, experimental and closely tied to results.

Most people enter through a graduate role at a startup, scaleup or technology company, or by moving in from a marketing, data or analyst role, and a numerate background helps. Startups often hire directly and value initiative and real results over a specific degree, and internships are a good way in. Entry is competitive but reachable for those who can show impact. From analyst you progress into senior growth, growth leadership, or product and marketing roles.

It suits curious, driven people with an entrepreneurial streak who enjoy variety, pace and seeing their ideas tested quickly. You need comfort with data, initiative and resilience when experiments fail. It is a poor fit for those who want stability and structure or dislike fast change.

Growth work keeps evolving as new channels, tools and AI change how businesses find and keep customers, so staying current matters. Demand is strong at startups and scaleups, though it moves with the funding cycle. The role rewards people who combine data skills with commercial creativity.

The work is office based or hybrid, often in a startup style environment, with hours that vary with the company. Graduate and early roles typically pay around £35k to £50k, rising to £55k to £80k and beyond as you specialise, sometimes with equity. Demand is strong in the technology sector, tracking the funding cycle.`,

  experimentation_analyst: `An Experimentation Analyst helps a business learn what really works by running careful tests, such as trying two versions of a product feature to see which performs better. You design experiments and analyse the results so decisions rest on evidence rather than opinion. It is a rigorous, scientific role inside modern product and marketing teams.

Day to day you design and set up experiments, make sure they are fair and statistically sound, analyse the results, and explain clearly what they show. You help teams avoid being fooled by noise or bias, and turn results into confident decisions. The work is precise, analytical and built on statistical thinking.

Most people enter through a graduate role at a technology or data driven company, or by moving in from a data, product or statistics background, and a numerate degree helps. A solid grasp of statistics is important, and internships or a portfolio of real analysis help you get in. Entry is competitive and skewed towards larger tech firms. From analyst you progress to senior experimentation and analytics roles, or into data science and product.

It suits inventive, analytical people who value getting the reasoning right and enjoy working independently on hard problems. You need strong statistical skill, precision and originality. It is a poor fit for those who dislike maths or want a role away from detailed analysis.

As more companies build a culture of testing, demand for people who can run experiments properly has grown, and AI tools now help design and analyse tests, raising the value of sound judgement about what the results mean. Getting experimentation right is increasingly seen as a competitive advantage. The role is expanding at data mature companies.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £38k to £55k, rising to £60k to £90k and beyond as you specialise, with more at large technology firms. Demand is growing, concentrated in data driven technology companies.`,

  // ── Software, AI & Digital Systems ──────────────────────────────────────
  software_engineer: `A Software Engineer designs and builds the programs and systems that run everything from apps and websites to banks and hospitals. You solve problems with code, turning ideas and requirements into working, reliable software. It is one of the most in demand and flexible careers in the modern economy.

Day to day you write and test code, design how software should work, fix problems, and collaborate with other engineers, designers and product people. You break big problems into smaller ones, and much of the craft is building things that are correct, efficient and easy to maintain. The work is analytical and creative, with a lot of hands on building.

There are many routes in. A computing or related degree is common, but so are degree apprenticeships, coding bootcamps and self taught paths backed by a strong portfolio of projects. Employers increasingly care about what you can build as much as your qualifications, so personal projects and internships count for a lot. Entry is competitive but the field is huge. From engineer you progress to senior and lead engineer, or into architecture, management or specialist areas.

It suits inventive, analytical people with real technical curiosity who enjoy solving problems and like working with a good degree of independence. You need logical thinking, persistence and a drive to keep learning. It is a poor fit for those who dislike sitting with hard problems or have little interest in how things work.

AI coding assistants are changing how software is written, handling more of the routine code and shifting the value towards design, judgement and solving harder problems, with real debate about what this means for junior roles. The tools keep advancing, so continuous learning is part of the job. Demand remains strong across nearly every industry.

The work is office based or hybrid, generally with reasonable hours, though they vary by company. Graduate and early roles typically pay around £30k to £45k, rising to £55k to £90k and beyond as you specialise, with more at large technology firms. Demand is strong and broad across the whole economy.`,


  systems_analyst: `A Systems Analyst works out how technology can solve a business problem, bridging the gap between what an organisation needs and what its software should do. You study how things work now, design better systems, and help make sure technology actually meets the need. It is a role that connects business and technology.

Day to day you gather requirements from users, analyse existing systems, design improvements, and work with developers to build and test them. You translate business needs into technical terms and back again, and much of the value is in understanding both sides. The work is analytical, structured and collaborative.

Most people enter through a graduate scheme, a degree apprenticeship, or by moving in from a technical or business role, and a computing or business degree helps but is not always required. Understanding both technology and how organisations work is the key, and this is often built on the job. Entry is reachable for those with the right mix. From analyst you progress into senior analyst, business analysis, solution design or project management.

It suits analytical, organised people with technical curiosity who like understanding how things fit together and enjoy working with others. You need clear thinking, good communication and comfort with both detail and the bigger picture. It is a poor fit for those who want purely hands on coding or dislike working with people.

As organisations adopt more complex and connected systems, the need to design them well and align them with the business stays strong, while AI tools help with analysis and documentation. The role increasingly overlaps with business analysis and solution design. Demand is steady across sectors.

The work is office based or hybrid, with generally steady hours. Graduate and early roles typically pay around £30k to £45k, rising to £50k to £70k and beyond as you specialise. Demand is steady wherever organisations rely on complex systems.`,

  backend_developer: `A Backend Developer builds the hidden engine of software, the servers, databases and logic that power apps and websites behind the scenes. You make sure data is stored, processed and delivered quickly and reliably, even when millions of people are using a system. It is a technical, problem solving role at the core of how software works.

Day to day you design and build the parts of software users never see, write and test code, work with databases, and make sure systems are fast, secure and reliable. You solve tricky problems of scale and performance, and collaborate with frontend, data and product colleagues. The work is deeply technical and analytical.

Routes in include a computing degree, a degree apprenticeship, a bootcamp, or a self taught path with a strong portfolio, and many backend developers start as general developers and specialise. What you can build matters most, so real projects help. Entry is competitive but demand is high. From developer you progress to senior and lead engineer, or into architecture and platform work.

It suits logical, inventive people with strong technical curiosity and a drive for mastery who enjoy solving hard problems and working independently. You need persistence, precision and a real interest in how systems work under the hood. It is a poor fit for those who prefer visual, front end work or dislike deep technical detail.

AI tools handle more routine backend code, moving the value towards system design, performance and reliability at scale. Cloud computing keeps reshaping how backends are built, so skills evolve quickly. Demand stays strong, especially for those who can build robust, scalable systems.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £32k to £48k, rising to £60k to £95k and beyond as you specialise, with more at large technology firms. Demand is strong across the technology sector and beyond.`,

  platform_engineer: `A Platform Engineer builds and maintains the underlying systems and tools that other engineers use to build and run software. You create the reliable foundations, the infrastructure, pipelines and services, that let a company ship software quickly and safely. It is a technical, behind the scenes role that makes everyone else more effective.

Day to day you design and manage cloud infrastructure, build tools and automation, keep systems running reliably, and help other teams deploy their software smoothly. You solve problems of scale, reliability and security, and much of the job is making complex systems simple to use. The work is deeply technical and focused on reliability.

Most platform engineers get here after gaining experience in software development or operations rather than straight from university, though graduate and apprenticeship routes into engineering lead this way. Strong technical skills, especially in cloud and automation, matter most and are often built on the job. Entry usually means starting broader in engineering first. From here you progress to senior and lead platform roles, and into architecture.

It suits logical, inventive people with strong technical curiosity and a drive for mastery who enjoy building reliable systems and working independently. You need deep technical skill, care for reliability and a problem solving mindset. It is a poor fit for those new to technology or who dislike infrastructure work.

Cloud computing and automation have made platform engineering one of the fastest growing technical specialisms, and AI is increasingly used to manage and monitor systems. The tools change constantly, so continuous learning is essential. Demand is strong for skilled platform engineers.

The work is office based or hybrid, with generally reasonable hours, sometimes with on call duties. Pay tends to be higher than general development given the experience needed, typically £40k to £55k earlier on and £70k to £110k and beyond as you specialise. Demand is strong across technology driven organisations.`,

  devops_engineer: `A DevOps Engineer helps teams build, test and release software faster and more reliably by joining up development and operations. You automate the path from writing code to running it live, so releases are smooth, frequent and safe. It is a technical role focused on speed, reliability and good engineering practice.

Day to day you build and maintain automated pipelines, manage cloud infrastructure, monitor systems, and help development teams deploy their work smoothly. You solve problems across the whole software lifecycle, and much of the job is removing friction and preventing failures. The work is technical, varied and centred on making delivery reliable.

Most DevOps engineers arrive after experience in development or systems administration rather than straight from a degree, though engineering graduate and apprenticeship routes lead here. Skills in automation, cloud and scripting matter most and are usually built on the job, supported by industry certifications. Entry generally means starting broader in technology first. From here you progress to senior DevOps, platform and site reliability roles.

It suits adaptable, inventive people with strong technical curiosity who enjoy automating things and solving problems across systems. You need broad technical skill, flexibility and a calm approach when things break. It is a poor fit for those new to technology or who dislike operational responsibility.

DevOps has become a core part of how modern software is delivered, and AI is increasingly used to automate and monitor systems, raising the value of judgement and design. Cloud and tooling keep evolving fast. Demand is strong for engineers who can make delivery reliable.

The work is office based or hybrid, with generally reasonable hours, often including some on call. Pay typically starts around £35k to £55k and rises to £65k to £100k and beyond as you specialise. Demand is strong across technology driven organisations.`,

  frontend_developer: `A Frontend Developer builds the parts of websites and apps that people see and use, turning designs into interfaces that look good and work smoothly. You bring products to life on the screen, balancing appearance, usability and performance. It is a creative, technical role where design meets code.

Day to day you build user interfaces, write code that runs in the browser or app, work closely with designers, and make sure everything looks right and works across devices. You care about how things feel to use, and much of the craft is in the detail of a smooth, accessible experience. The work is creative and technical in equal measure.

Routes in include a computing or design related degree, a degree apprenticeship, a bootcamp, or a self taught path with a portfolio of real work, which matters a lot here since employers can see what you make. Internships and side projects help you stand out. Entry is competitive but accessible to those who can build. From developer you progress to senior and lead frontend roles, or into design, full stack or management.

It suits creative, inventive people with technical curiosity who enjoy making things that look and feel good and like a mix of art and logic. You need an eye for detail, originality and comfort with code. It is a poor fit for those who dislike visual work or want purely behind the scenes engineering.

Frontend tools and frameworks change quickly, and AI now generates more routine interface code, shifting the value towards design judgement, accessibility and performance. Expectations for polished, inclusive experiences keep rising. Demand stays strong across the web and app world.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £28k to £45k, rising to £55k to £85k and beyond as you specialise. Demand is broad across every business with a digital presence.`,


  data_engineer: `A Data Engineer builds the systems that collect, store and move data so it is ready for others to use. You create the pipelines and infrastructure that turn scattered, messy data into clean, reliable sources that analysts and data scientists depend on. It is a technical role that underpins everything data driven.

Day to day you design and build data pipelines, manage databases and data platforms, make sure data flows reliably and is good quality, and work with analysts and scientists who use it. You solve problems of scale and reliability, and much of the job is making data trustworthy and accessible. The work is deeply technical and analytical.

Most data engineers arrive with a computing, engineering or numerate degree, a degree apprenticeship, or by moving from software development or analytics, and strong coding and database skills matter most. Real projects and cloud experience help you stand out. Entry is competitive but demand is high. From engineer you progress to senior and lead data engineer, or into architecture and platform roles.

It suits logical, inventive people with strong technical and data curiosity who enjoy building reliable systems and working independently. You need coding skill, care for accuracy and an interest in how data systems work. It is a poor fit for those who dislike deep technical work or prefer analysis to building.

As organisations rely ever more on data and AI, demand for the engineers who make data usable has grown sharply, and cloud tools keep reshaping the work. Good data foundations are now seen as essential for analytics and AI to work at all. Demand is strong and rising.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £35k to £55k, rising to £65k to £100k and beyond as you specialise, with more at large technology firms. Demand is strong across every data driven sector.`,

  database_developer: `A Database Developer designs, builds and looks after the databases that store an organisation's information. You make sure data is organised well, easy to retrieve and kept safe, so the systems that depend on it run smoothly. It is a specialised, detail focused role at the foundation of most software.

Day to day you design database structures, write queries and code to manage data, tune performance, and make sure information is accurate and secure. You work with developers and analysts who rely on the data, and much of the job is keeping it fast and reliable. The work is technical, structured and precise.

Most people enter with a computing degree, a degree apprenticeship, or by moving from a development or IT role, and strong skills in databases and query languages matter most. Much is learned on the job, supported by certifications. Entry is reachable for those with the right technical grounding. From here you progress into senior database roles, data engineering or architecture.

It suits logical, organised people with technical and data curiosity who like structure, precision and working independently. You need care for detail, comfort with data and a methodical approach. It is a poor fit for those who dislike detailed technical work or want a highly visual role.

Cloud databases and automation are changing how data is stored and managed, moving the role towards design, performance and integration with modern data platforms. The skills increasingly overlap with data engineering. Demand is steady for those who keep their skills current.

The work is office based or hybrid, with generally steady hours. Graduate and early roles typically pay around £30k to £48k, rising to £55k to £80k and beyond as you specialise. Demand is steady wherever organisations depend on well managed data.`,

  software_tester: `A Software Tester checks that software works properly before it reaches users, finding problems so they can be fixed. You put programs through their paces, thinking of everything that could go wrong, to make sure what ships is reliable. It is a careful, inquisitive role that protects the quality of software.

Day to day you plan and run tests, try to break software in useful ways, report the bugs you find, and increasingly write automated tests that check software as it changes. You work closely with developers, and much of the skill is imagining how things might fail. The work is analytical, detailed and methodical.

This is an accessible way into technology. Many testers enter through apprenticeships, direct entry or a move from another role, and a degree is often optional, though testing certifications help. As the role becomes more technical, coding skills for automation are increasingly useful and can be built on the job. From tester you progress into test automation, QA leadership or development.

It suits curious, precise people who enjoy finding flaws and take satisfaction in getting things right. You need attention to detail, patience and a methodical, questioning mind. It is a poor fit for those who dislike detail or find repetitive checking tedious.

Testing is shifting from manual checking towards automation, and AI now helps generate and run tests, so coding and automation skills are increasingly important. The routine manual end is shrinking while the technical end grows. Building automation skills keeps the role secure and rewarding.

The work is office based or hybrid, with generally reasonable hours. Entry and early roles typically pay around £25k to £40k, rising to £45k to £70k and beyond as you move into automation. Demand is steady, especially for testers who can automate.`,


  cyber_security_analyst: `A Cyber Security Analyst protects an organisation's systems and data from attack, spotting threats and defending against them. You work to keep hackers out, respond when something goes wrong, and help the business stay safe in a world of constant digital threats. It is a fast growing, high stakes role that matters more every year.

Day to day you monitor systems for threats, investigate suspicious activity, respond to incidents, and help strengthen defences and educate colleagues. You keep up with the latest attacks and vulnerabilities, and much of the job is staying one step ahead. The work is analytical, investigative and sometimes urgent.

There are many routes in. Degrees in cyber security or computing, degree apprenticeships, and industry certifications all lead here, and many analysts move across from IT or networking roles. Apprenticeships are a strong and growing route, so a degree is not always essential. Entry is competitive but demand is high. From analyst you progress into specialist security, incident response, or security leadership.

It suits sharp, adaptable people with technical curiosity who enjoy solving puzzles and staying ahead of a moving target. You need analytical skill, a questioning mind and the composure to handle incidents. It is a poor fit for those who dislike constant change or high pressure moments.

Cyber threats keep growing as more of life moves online, so demand for skilled defenders is strong and rising, and AI is now used by both attackers and defenders. The field evolves constantly, so continuous learning is essential. There is a well known shortage of skilled people, which keeps prospects good.

The work is office based or hybrid, sometimes with on call duties, and hours are generally reasonable outside incidents. Graduate and early roles typically pay around £30k to £45k, rising to £55k to £85k and beyond as you specialise. Demand is strong and growing across every sector.`,

  soc_analyst: `A SOC Analyst works in a security operations centre, the front line that watches an organisation's systems for cyber attacks around the clock. You monitor alerts, spot real threats among the noise, and respond quickly when something looks wrong. It is a fast paced, vigilant role at the sharp end of cyber defence.

Day to day you watch security systems, investigate alerts, decide which are genuine threats, and take action or escalate when needed. You keep detailed records, spot patterns, and help improve how threats are detected. The work is analytical, alert and sometimes urgent, often organised in shifts.

This is a common entry point into cyber security. Many SOC analysts enter through apprenticeships, certifications, or a move from IT, and a degree is helpful but not always required. Employers value practical skills and a genuine interest in security, which you can show through home labs and certifications. Entry is accessible for keen, capable people. From SOC analyst you progress into incident response, threat analysis and wider security roles.

It suits sharp, adaptable people with technical curiosity who stay calm under pressure and enjoy investigating. You need attention to detail, quick thinking and persistence. It is a poor fit for those who dislike shift work, repetition or high pressure moments.

As cyber attacks grow, security operations keep expanding, and AI increasingly helps sift alerts, moving analysts towards investigation and judgement rather than routine monitoring. The role is a proven springboard into the wider, well paid security field. Demand is strong and growing.

The work is office based or remote, often on shifts including nights, with the SOC running around the clock. Entry and early roles typically pay around £28k to £42k, rising to £50k to £75k and beyond as you move into specialist security. Demand is strong across every sector that needs defending.`,

  machine_learning_engineer: `A Machine Learning Engineer builds systems that learn from data and put them to work in real products, from recommendations to voice assistants. You take models that data scientists design and turn them into reliable, scalable software that runs in the real world. It is one of the most advanced and sought after technical roles today.

Day to day you build, train and deploy machine learning models, write production code, work with large datasets, and make sure models run efficiently and reliably at scale. You sit between data science and software engineering, and much of the job is bridging research and real products. The work is deeply technical, analytical and creative.

Most machine learning engineers enter with a strong computing, engineering or numerate degree, often a master's, and solid software plus machine learning skills. Some come through data science or software engineering and specialise, and a portfolio of real projects matters a lot. Entry is competitive and technical. From engineer you progress into senior and lead ML roles, research engineering or AI leadership.

It suits inventive, analytical people with strong technical curiosity and a drive for mastery who enjoy building intelligent systems and working independently. You need strong coding and maths, originality and persistence. It is a poor fit for those who dislike heavy technical work or want a non coding role.

This is one of the fastest moving fields in technology, transformed again by the rise of large AI models, so the tools and techniques change rapidly. Demand is very strong, but staying current is essential and expectations are high. The field keeps expanding as more products build in machine learning.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £40k to £60k, often more given the skills needed, rising to £80k to £130k and beyond at leading firms. Demand is strong and growing across technology and beyond.`,


  applied_ai_analyst: `An Applied AI Analyst helps organisations use artificial intelligence and machine learning to solve real problems, focusing on putting AI to practical use rather than building it from scratch. You identify where AI can help, apply existing models and tools, and make sense of the results. It is a role that brings AI down to earth for everyday business.

Day to day you explore where AI could add value, apply and test models on real data, analyse how well they work, and help teams understand and act on the results. You bridge technical AI and practical needs, and much of the job is judging what is genuinely useful. The work is analytical, hands on and business focused.

Most people enter with a numerate, computing or analytics degree, through a graduate scheme or by moving from a data or analyst role, and a growing number arrive via conversion courses and apprenticeships. Practical skills with data and AI tools matter most, and real projects help. Entry is competitive but the field is growing fast. From analyst you progress into senior applied AI, data science or AI product roles.

It suits curious, analytical people with technical curiosity and a drive for mastery who enjoy applying new tools to real problems and working independently. You need comfort with data, good judgement and an interest in AI. It is a poor fit for those who dislike technical work or want a role away from data.

As AI tools become more powerful and accessible, demand for people who can apply them well is growing quickly, even as the underlying technology keeps changing. The value increasingly lies in knowing where AI helps and where it does not. The field is young and expanding, so staying current matters.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £35k to £55k, rising to £65k to £95k and beyond as you specialise. Demand is strong and rising as organisations adopt AI.`,

  // ── Entrepreneurship, Innovation & Venture Building ─────────────────────
  founder: `A Founder starts and builds a business from an idea, taking on the risk and the responsibility of turning it into something real. You spot an opportunity or a problem worth solving and set out to build a product, team and company around it. It is the most independent and uncertain path in the working world, and for some the most rewarding.

Day to day, especially early on, you do a bit of everything: shaping the product, finding customers, raising money, hiring people and making countless decisions. As the business grows your role shifts towards leading, setting direction and building a team. The work is varied, relentless and entirely yours to drive.

There is no application or graduate scheme for becoming a founder, you simply start, though most successful founders build experience, skills and networks first. Many begin with a side project, join a startup to learn, or go through an accelerator that offers funding, mentoring and connections. What matters is having an idea worth pursuing, the drive to begin, and often a co founder to share the load. From founder, success can lead to growing and leading a larger company, selling the business, or starting again with what you have learned.

It suits visionary, inventive people with strong entrepreneurial drive who want independence and are willing to take real risks. You need resilience, self belief, originality and the energy to keep going through setbacks. It is a poor fit for those who want security, a steady income or clear structure, at least in the early years.

Starting a business is easier than ever in some ways, with cheaper tools, AI and global reach lowering the barriers, but competition is fierce and most startups still fail. Access to funding rises and falls with the wider economy. The upside is that new tools let very small teams build things that once took many people.

There is no set workplace or hours, and both are whatever the business demands, often long and unpredictable. Pay is highly uncertain: many founders earn little or nothing early on, funding themselves or living off investment, with the potential, never guaranteed, of significant reward if the business succeeds. It is a path defined by risk and ownership rather than a salary.`,

  operations_associate: `An Operations Associate keeps a young, fast growing company running smoothly, making sure the everyday machinery of the business works so others can focus on building and selling. You take on whatever needs doing to keep things moving, from processes and tools to logistics and problem solving. It is a broad, hands on role at the heart of a startup.

Day to day you set up and improve how the business runs, solve practical problems, coordinate across teams, and keep projects and processes on track. In a small company the job can span many areas at once, and much of the value is bringing order to a fast moving environment. The work is varied, practical and fast paced.

Most people enter by joining a startup directly, often from a graduate role, an internship, or a move from a more structured company, and a specific degree is rarely required. Startups value initiative, reliability and a willingness to turn your hand to anything, which you can show through real experience and projects. Entry is competitive at well known startups but accessible more widely. From here you progress into operations management, a specialist function, or broader leadership as the company grows.

It suits driven, organised people who enjoy collaboration and getting things done, and who thrive on variety and pace. You need reliability, adaptability and a practical, can do attitude. It is a poor fit for those who want a narrow, highly defined role or a slow, predictable environment.

Startups increasingly use software and AI to automate routine operations, which raises the value of people who can set up smart systems and handle the non routine. The role remains broad and shifting, tracking the ups and downs of the startup world. It rewards people who like building order out of chaos.

The work is office based or hybrid, usually in a startup style environment, with hours that vary with the company's demands. Pay typically starts around £28k to £40k, rising to £45k to £65k and beyond as you take on more, often with equity in the company. Demand tracks the health of the startup sector.`,

  growth_executive: `A Growth Executive helps a young company grow by finding and winning customers and opening up new opportunities. You combine marketing, sales and analysis to drive the growth a startup depends on to survive and scale. It is an entrepreneurial, results focused role for people who like making things happen.

Day to day you run campaigns and experiments to attract customers, chase new business and partnerships, analyse what is working, and double down on what drives growth. You work across marketing, sales and product at pace, measuring everything you do. The work is varied, commercial and closely tied to results.

Most people enter by joining a startup directly, from a graduate role, an internship, or a move from a marketing or sales role, and initiative and results matter more than a specific degree. Startups hire people who can show they can drive growth, so real experience and a track record help. Entry is competitive at top startups but accessible more broadly. From here you progress into senior growth, marketing or commercial leadership.

It suits driven, entrepreneurial people who enjoy variety, pace and seeing their efforts pay off in numbers. You need commercial creativity, analytical skill and resilience when things do not work. It is a poor fit for those who want stability and structure or dislike being measured on results.

Growth work keeps changing as new channels, tools and AI reshape how companies find customers, so staying current is essential. Demand is strong at startups and scaleups but rises and falls with the funding cycle. The role rewards those who combine creativity with a head for data.

The work is office based or hybrid, often in a fast paced startup setting, with hours that vary with the company. Pay typically starts around £30k to £45k, rising to £50k to £75k and beyond as you specialise, often with equity. Demand tracks the health of the startup and technology sector.`,

  // ── Marketing, Media & Communication ────────────────────────────────────
  brand_executive: `A Brand Executive helps shape how a company or product is seen, building a clear, appealing identity that people recognise and trust. You look after the look, feel and message of a brand and help make sure it comes across consistently everywhere. It is a creative, strategic role at the heart of marketing.

Day to day you help develop brand campaigns, keep the brand consistent across channels, work with designers and agencies, and analyse how the brand is performing. You balance creativity with commercial goals, and much of the job is protecting and strengthening how the brand feels. The work is imaginative, collaborative and varied.

Most people enter through a graduate scheme, a marketing apprenticeship, or an entry role such as marketing assistant, and a marketing, business or creative degree helps but is not essential. A portfolio of projects, internships and genuine interest in brands count for a lot. Entry is competitive but accessible. From executive you progress to brand manager and towards senior brand and marketing leadership.

It suits imaginative, sociable people with originality who enjoy shaping how things are seen and working with others. You need creative flair, commercial awareness and good communication. It is a poor fit for those who dislike creative ambiguity or want a purely analytical role.

Branding is being reshaped by digital channels and AI tools that speed up content and design, so the value is shifting towards strategy, originality and genuine understanding of audiences. Brands increasingly live across many platforms at once. Demand is steady, favouring those who combine creativity with data awareness.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £24k to £34k, rising to £40k to £60k and beyond as you move into management, with more at large firms. Demand is steady across consumer and business brands.`,

  marketing_executive: `A Marketing Executive helps plan and run the activity that promotes a company's products or services, from campaigns and emails to events and social media. You help get the right message to the right people and support the wider marketing effort. It is a broad, hands on entry point into the marketing world.

Day to day you help create and run campaigns, produce content, manage channels, and track how well things are working. You juggle several projects and work with designers, agencies and other teams, and much of the job is turning plans into activity that reaches customers. The work is varied, creative and increasingly data aware.

Most people enter through a graduate scheme, a marketing apprenticeship, or an assistant role, and a marketing, business or communications degree helps but is not required. Apprenticeships make marketing genuinely accessible without a degree, and internships and real projects help. Entry is competitive but reachable. From executive you progress to marketing manager and specialist or leadership roles.

It suits creative, analytical people who enjoy variety and like a mix of ideas and measurement. You need creativity, organisation and comfort with data. It is a poor fit for those who dislike deadlines and multitasking or want a narrow role.

Marketing is increasingly digital and data driven, and AI tools now help create content and target audiences, so skills in analytics and digital channels matter more than ever. Routine content work is being automated, raising the value of strategy and creativity. Demand is broad across every sector.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £24k to £32k, rising to £40k to £55k and beyond as you specialise or manage, with more at larger firms. Demand is broad and stable across the economy.`,

  performance_marketing_executive: `A Performance Marketing Executive runs the data driven side of marketing, using paid advertising and analytics to bring in customers at a measurable cost. You spend budgets on channels like search and social and track exactly what each pound returns. It is an analytical, results focused corner of marketing.

Day to day you set up and manage online ad campaigns, analyse their performance, test different approaches, and adjust spending to get the best return. You work closely with data and creative teams, and much of the job is optimising towards clear targets. The work is analytical, fast moving and closely tied to numbers.

Most people enter through a graduate role, a digital marketing apprenticeship, or a move from a broader marketing role, and comfort with data matters more than a specific degree. Hands on experience with advertising platforms, sometimes from personal or freelance projects, helps you stand out. Entry is competitive but accessible for numerate, digital minded people. From executive you progress to performance marketing manager and growth leadership.

It suits analytical, driven people who enjoy working with data and like seeing their decisions produce clear results. You need comfort with numbers, attention to detail and a test and learn mindset. It is a poor fit for those who dislike data or want a purely creative role.

The advertising platforms are increasingly automated and AI driven, which shifts the role towards strategy, creativity within the data, and understanding customers rather than manual bid tweaking. Privacy changes also keep reshaping what is possible. Demand is strong as businesses chase measurable growth.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £26k to £36k, rising to £45k to £65k and beyond as you specialise, with more at agencies and large firms. Demand is strong across digital businesses.`,

  crm_executive: `A CRM Executive looks after how a business communicates with its existing customers to keep them engaged and loyal, mainly through channels like email and app messages. You use customer data to send the right message at the right time and build lasting relationships. It is a data driven role focused on keeping and growing customer value.

Day to day you plan and run customer communication campaigns, segment audiences using data, test what works, and analyse how customers respond. You work with data, marketing and product teams, and much of the job is turning customer information into well timed, relevant messages. The work is analytical, structured and creative in equal measure.

Most people enter through a graduate role, a digital marketing apprenticeship, or a move from a marketing or data role, and comfort with data and marketing tools matters most. Real experience with campaigns and analytics helps you stand out. Entry is accessible for numerate, organised people. From executive you progress to CRM manager and customer or lifecycle marketing leadership.

It suits analytical, organised people who enjoy working with data and like building customer relationships. You need comfort with numbers, precision and creativity in messaging. It is a poor fit for those who dislike detail and data or want a purely creative role.

Customer messaging is becoming more automated and personalised through data and AI, which raises the value of strategy, good judgement and genuine customer understanding over manual sending. Privacy rules shape what is allowed. Demand is strong as businesses focus on keeping the customers they have.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £26k to £36k, rising to £45k to £60k and beyond as you specialise, with more at larger firms. Demand is strong across customer focused businesses.`,

  pr_executive: `A PR Executive helps manage a company's reputation and how it is talked about in the media and beyond. You help shape the story an organisation tells, build relationships with journalists, and get positive coverage while handling issues carefully. It is a people focused, creative role centred on reputation.

Day to day you write press releases and pitches, build relationships with journalists and influencers, organise events, and monitor coverage and public opinion. You help craft messages and respond when problems arise, and much of the job is storytelling and relationship building. The work is varied, sociable and fast moving.

Most people enter through a graduate scheme, a PR or communications apprenticeship, or an assistant role, and a communications, marketing or humanities degree helps but is not essential. Strong writing, confidence and genuine interest in media matter, and internships and work experience are important. Entry is competitive but accessible. From executive you progress to PR manager and communications leadership.

It suits confident, imaginative people with a sense of purpose who enjoy building relationships and telling stories. You need excellent communication, creativity and composure under pressure. It is a poor fit for those who dislike writing, networking or high pressure moments.

PR is increasingly digital, spanning social media and online influence as well as traditional press, and AI tools now help draft and monitor content. The value is shifting towards strategy, judgement and genuine relationships. Demand is steady, favouring those who understand the whole modern media landscape.

The work is office based or hybrid, with generally reasonable hours that can spike around events or issues. Graduate and early roles typically pay around £24k to £32k, rising to £40k to £60k and beyond as you move into management, with more in agencies and big firms. Demand is steady across sectors.`,

  communications_officer: `A Communications Officer helps an organisation communicate clearly with the people who matter to it, from staff and customers to the public. You craft and share messages that inform, engage and build trust, often for a company, charity or public body. It is a role centred on clear, purposeful communication.

Day to day you write and edit content, manage channels such as websites, newsletters and social media, support campaigns, and help make sure messages are consistent and effective. You often work across many teams, and much of the job is turning complex information into clear, engaging communication. The work is varied, creative and collaborative.

Most people enter through a graduate scheme, a communications apprenticeship, or an assistant role, and a communications, marketing or humanities degree helps but is not essential. Strong writing and genuine interest in communication matter most, and work experience helps. Entry is competitive but accessible. From officer you progress to communications manager and towards head of communications.

It suits confident, purposeful people who write well and enjoy working with others to get a message across. You need excellent communication, organisation and creativity. It is a poor fit for those who dislike writing or want a purely analytical role.

Communication is increasingly digital and multi channel, and AI tools now help produce and manage content, so the value is moving towards strategy, judgement and authentic engagement. Organisations care more than ever about how they are seen. Demand is steady across the public, charity and private sectors.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £25k to £35k, rising to £45k to £65k and beyond as you move into management, with variation by sector. Demand is steady wherever organisations need to communicate well.`,

  market_research_analyst: `A Market Research Analyst helps businesses understand their markets, customers and competitors by gathering and analysing information. You find out what people think and do, and turn it into insight that guides decisions about products, marketing and strategy. It is an analytical role that puts evidence behind business choices.

Day to day you design and run surveys and studies, analyse data, spot trends, and present findings and recommendations. You combine numbers with an understanding of people and markets, and much of the value is in explaining clearly what the research means. The work is analytical, curious and varied.

Most people enter through a graduate scheme, a research apprenticeship, or a junior research role, and a numerate, marketing or social science degree helps. Skills in data and an interest in people and markets matter, and internships help. Entry is competitive but reachable. From analyst you progress to senior research and insight roles, and into strategy.

It suits curious, analytical people who enjoy understanding markets and people and like turning research into insight. You need comfort with data, precision and clear communication. It is a poor fit for those who dislike detailed analysis or have little interest in markets.

Research is increasingly powered by big datasets and AI, which automate more of the routine analysis and raise the value of good questions and interpretation. New sources of data keep expanding what is possible. Demand is steady as businesses compete on understanding their customers.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £26k to £36k, rising to £45k to £60k and beyond as you specialise, with more in agencies and large firms. Demand is steady across consumer and business sectors.`,

  audience_insight_analyst: `An Audience Insight Analyst helps media, marketing and content organisations understand their audiences, using data to learn who is watching, reading or listening and what they want. You turn audience behaviour into insight that shapes content and strategy. It is a role where data meets media and culture.

Day to day you analyse audience data, spot patterns in behaviour and preferences, and present findings that help teams create and target content better. You combine numbers with an understanding of media and culture, and much of the job is explaining what audiences really want. The work is analytical, curious and closely tied to content decisions.

Most people enter through a graduate role, a data or research apprenticeship, or a move from an analyst role, and comfort with data plus interest in media matter most. Real analytical experience helps you stand out. Entry is competitive but accessible for data minded people. From analyst you progress to senior insight roles and analytics leadership.

It suits curious, analytical people who are interested in media and audiences as well as numbers. You need comfort with data, precision and the ability to turn findings into ideas. It is a poor fit for those who dislike detailed analysis or have little interest in content.

Streaming, social media and digital platforms have hugely increased the data available about audiences, and AI helps analyse it, raising the value of interpretation and insight. Understanding audiences is now central to how content succeeds. Demand is growing across media and content businesses.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £28k to £38k, rising to £50k to £65k and beyond as you specialise. Demand is growing across media, streaming and content driven businesses.`,

  content_creator: `A Content Creator makes the videos, images, articles and posts that engage audiences online, whether for a brand, a publisher or their own channels. You come up with ideas and produce content that people want to watch, read and share. It is a creative, fast moving role built around originality and audience connection.

Day to day you plan, create and edit content, keep up with trends, and engage with audiences across platforms. You often handle the whole process from idea to finished post, and much of the job is producing a steady stream of fresh, engaging material. The work is creative, varied and closely tied to what audiences respond to.

There is no fixed route in. Many content creators are self taught and build a portfolio or following by simply making and sharing work, while others enter through a marketing or media role, an apprenticeship, or a relevant degree. What you can make and the audience you can reach matter most, so a body of real work is essential. Entry is accessible but standing out is competitive. From here you progress into senior creative, content strategy or building your own brand.

It suits imaginative, driven people with strong originality and creative expression who enjoy making things and connecting with audiences. You need creativity, initiative and resilience, since attention is hard to win. It is a poor fit for those who dislike being visible or want a highly structured role.

AI tools now help generate and edit content quickly, which lowers barriers but also raises the bar for originality and genuine connection. Platforms and trends change constantly, so adaptability is essential. Demand is high but crowded, rewarding those with a distinctive voice.

The work is flexible in setting and hours, whether in house, freelance or self employed, and often does not follow a nine to five. Pay varies widely, with employed roles typically around £24k to £38k and freelance or independent earnings ranging from little to a great deal depending on reach. Demand is strong but competitive across brands and media.`,

  social_media_executive: `A Social Media Executive manages how a brand shows up on social platforms, creating posts, running channels and building a community of followers. You keep a brand active, engaging and current across the fast moving world of social media. It is a creative, always on role at the front line of digital marketing.

Day to day you plan and create posts, manage social channels, respond to comments and messages, keep up with trends, and track how content performs. You balance creativity with strategy, and much of the job is keeping a brand's presence fresh and responsive. The work is creative, fast paced and closely tied to what is happening online.

Most people enter through a graduate role, a digital marketing apprenticeship, or by building experience running channels, sometimes their own, and a portfolio of real social work helps a lot. A specific degree is rarely essential. Entry is accessible but competitive at well known brands. From executive you progress to social media manager and broader digital or content leadership.

It suits imaginative, sociable people with originality who enjoy being online, spotting trends and engaging audiences. You need creativity, quick thinking and comfort with fast change. It is a poor fit for those who dislike social media or want a slow, structured role.

Social platforms and trends change constantly, and AI now helps create and schedule content, so the value is shifting towards creativity, strategy and genuine community building. The pace and reach of social keep growing. Demand is strong, favouring those who understand each platform deeply.

The work is office based or hybrid, with generally reasonable hours, though social never fully sleeps. Graduate and early roles typically pay around £24k to £32k, rising to £40k to £55k and beyond as you move into management. Demand is strong across brands and media.`,

  journalist: `A Journalist finds, checks and tells stories that inform the public, from news and politics to sport, culture and business. You dig out what is happening, verify it, and report it clearly and fairly. It is a role with real purpose, holding power to account and helping people understand the world.

Day to day you research stories, interview people, verify facts, and write or produce reports for print, online or broadcast. You work to deadlines, often on several stories at once, and much of the job is finding the truth and telling it well. The work is varied, fast moving and driven by curiosity and integrity.

Most journalists enter through a journalism degree or postgraduate course, often gaining an industry recognised qualification such as the NCTJ, alongside work experience and a portfolio of published work. Building clips through internships, student media and freelancing is essential, since the field is competitive. Entry is hard and often starts with low paid or freelance work. From journalist you progress to senior reporter, specialist correspondent or editor.

It suits curious, principled people with originality who love finding things out and telling stories, and who can handle pressure. You need strong writing, determination and a nose for a story. It is a poor fit for those who want security and predictable hours or dislike constant deadlines.

Journalism has been reshaped by the internet, which cut traditional revenues and shrank many newsrooms while creating new digital and independent outlets. AI now assists with some routine reporting, raising the value of original, investigative and trusted work. The field is smaller and more precarious, but good journalism is still needed.

The work spans newsrooms, remote and on location, with irregular and sometimes long hours tied to the news. Pay is modest, especially early on, typically around £23k to £30k to start and rising to £35k to £55k and beyond for experienced or specialist journalists. Demand is competitive, with fewer stable roles than before.`,

  reporter: `A Reporter gathers and delivers the news, covering events and stories as they happen for newspapers, websites, radio or television. You are often first on the scene, talking to people, finding out what is going on, and telling audiences quickly and accurately. It is a fast paced, people focused role at the heart of the news.

Day to day you chase stories, interview witnesses and sources, verify facts, and file reports to tight deadlines. You often cover a patch or a beat, building contacts and local knowledge, and much of the job is being where the story is. The work is fast, sociable and driven by curiosity.

Most reporters enter through a journalism course and an industry qualification such as the NCTJ, plus work experience and published clips, often starting in local news. Building contacts, confidence and a portfolio matters, and the first roles are competitive and modestly paid. Entry is hard but local journalism remains a training ground. From reporter you progress to senior reporter, correspondent or editor.

It suits outgoing, curious people with confidence and purpose who enjoy talking to people and working at pace. You need strong communication, determination and quick, accurate writing. It is a poor fit for those who want quiet, predictable work or dislike deadlines and unpredictability.

Local and traditional news has been squeezed financially, reducing the number of staff roles, while digital and video reporting have grown. AI assists with some routine coverage, raising the value of on the ground reporting and trusted sources. The field is competitive and changing, but reporters remain essential to the news.

The work is on location and in newsrooms, with irregular hours tied to events. Pay is modest, typically around £22k to £30k to start and rising to £35k to £50k and beyond with experience. Demand is competitive, concentrated in digital and broadcast news.`,

  editorial_assistant: `An Editorial Assistant supports the team that produces books, magazines, websites or other publications, helping turn raw material into polished, published content. You take on the many practical tasks that keep the editorial process running. It is a common first step into publishing and editorial careers.

Day to day you proofread and edit text, check facts, prepare content for publication, liaise with writers and contributors, and handle administrative tasks. You help maintain quality and keep projects on schedule, and much of the job is careful, detailed support. The work is varied, precise and collaborative.

Most people enter with a degree, often in English, humanities or a relevant subject, plus work experience such as internships, and a genuine love of words and reading helps a lot. Publishing is competitive and entry roles are modestly paid, so persistence and relevant experience matter. Apprenticeships in publishing are slowly emerging. From assistant you progress to editor and towards senior editorial roles.

It suits creative, precise people who love language and take care over detail, and who enjoy supporting good work. You need strong writing and editing skills, accuracy and organisation. It is a poor fit for those who dislike detail or want a highly paid, fast moving role early on.

Publishing is increasingly digital, and AI tools now assist with editing and production, so the value is shifting towards judgement, curation and working with authors. The industry is competitive but enduring. Demand is steady but modest, concentrated in publishing hubs.

The work is office based or hybrid, with generally reasonable hours. Entry and early roles typically pay around £22k to £28k, rising to £32k to £45k and beyond as you become an editor. Demand is steady but competitive across publishing.`,

  // ── Creative Arts, Design & Experience ──────────────────────────────────
  product_designer: `A Product Designer shapes the things people use, whether physical objects or digital products, so they work well, look good and feel right. You combine creativity with an understanding of users and how things are made. It is a role where imagination meets practical problem solving.

Day to day you research what users need, sketch and prototype ideas, refine designs, and work with engineers or developers to bring them to life. You test and improve your designs, balancing beauty, usability and what is practical to build. The work is creative, analytical and hands on.

Most people enter with a design degree and, above all, a strong portfolio of real work, which matters more than anything else, though some come through apprenticeships or self directed learning. Internships and live projects help you build that portfolio. Entry is competitive but based on what you can show. From designer you progress to senior and lead design roles, or into design management.

It suits imaginative, inventive people with strong originality and technical curiosity who enjoy solving problems and making things that work well. You need creative skill, an eye for detail and empathy for users. It is a poor fit for those who dislike iteration and feedback or want a purely technical role.

Design tools, including AI, are speeding up parts of the process, which raises the value of original thinking, user understanding and judgement over routine production. Digital product design in particular is in strong demand. The field rewards designers who keep their skills and tools current.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £28k to £40k, rising to £50k to £80k and beyond as you specialise, with digital product design at the higher end. Demand is strong, especially in technology and digital products.`,

  industrial_designer: `An Industrial Designer designs the physical products we use every day, from appliances and furniture to tools and vehicles, balancing how they look, work and are made. You turn ideas into objects that are useful, appealing and possible to manufacture. It is a creative, technical role that shapes the material world.

Day to day you research and sketch ideas, create models and prototypes, refine designs using specialist software, and work with engineers and manufacturers. You balance form, function, cost and production, and much of the job is solving practical problems creatively. The work is imaginative, hands on and technical.

Most people enter with a degree in industrial or product design and a strong portfolio of real work, which is essential, plus internships and live projects. Skills in design software and an understanding of manufacturing matter. Entry is competitive and portfolio based. From designer you progress to senior and lead design roles or design management.

It suits imaginative, practical people with originality and technical curiosity who enjoy making real things and solving how they work. You need creative and technical skill, an eye for detail and persistence. It is a poor fit for those who dislike technical constraints or want a purely digital role.

Design tools including AI and advances like 3D printing are changing how products are designed and prototyped, speeding up the work and raising the value of original ideas and sustainability. Demand is steady in manufacturing and consumer products. The field rewards designers who keep pace with new tools and materials.

The work is office and studio based, sometimes with factory visits, and hours are generally reasonable. Graduate and early roles typically pay around £26k to £36k, rising to £45k to £65k and beyond as you specialise. Demand is steady across manufacturing and consumer goods.`,

  visual_designer: `A Visual Designer creates the graphics and visual identity that communicate a message, from logos and layouts to adverts and digital graphics. You use images, type and colour to make things look good and get a message across clearly. It is a creative role at the heart of visual communication.

Day to day you design graphics for print and screen, develop visual styles, work to briefs from clients or teams, and refine your work through feedback. You balance creativity with the need to communicate clearly, and much of the job is making information both attractive and effective. The work is creative, varied and detail focused.

Most people enter with a design degree or a strong portfolio built through study, self teaching or short courses, and the portfolio matters most. Internships, freelance work and live briefs help you build it. Entry is accessible but competitive, based on your work. From designer you progress to senior and art director roles, or specialise in areas like branding or digital.

It suits imaginative people with strong originality and creative expression who enjoy making things look good and communicating visually. You need creative skill, an eye for detail and the ability to take feedback. It is a poor fit for those who dislike creative critique or want a purely analytical role.

AI design tools now generate and edit visuals quickly, which raises the bar for original thinking and craft while automating routine production. Demand is steady across marketing, media and digital, especially for designers who can work across print and screen. The field rewards those who keep their skills fresh.

The work is office based, hybrid or freelance, with generally reasonable hours. Graduate and early roles typically pay around £24k to £34k, rising to £40k to £60k and beyond as you specialise, with freelance earnings varying. Demand is steady across creative and marketing sectors.`,

  animator: `An Animator brings characters, objects and stories to life through movement, creating the animation seen in films, games, adverts and online content. You make drawings or digital models move in ways that feel alive and tell a story. It is a highly creative, skilled craft that blends art and technology.

Day to day you design and create animated sequences, work with specialist software, refine timing and movement, and collaborate with directors, designers and other artists. You bring imagination and technical skill together, and much of the job is the patient craft of making movement convincing. The work is creative, detailed and technical.

Most people enter with a degree in animation or a related art subject and a strong showreel of their work, which is what employers judge, plus internships and personal projects. Skills in animation software and a distinctive style matter. Entry is competitive and portfolio based, often starting with junior or studio roles. From animator you progress to senior animator, lead or director roles.

It suits imaginative, patient people with strong originality and technical curiosity who love bringing things to life and enjoy detailed craft. You need creative and technical skill, patience and persistence. It is a poor fit for those who dislike painstaking detail or want fast, unstructured work.

Animation tools including AI are changing how animation is produced, speeding up some tasks and raising the value of creativity, storytelling and craft. Demand comes from film, games, streaming and online content, though the field is competitive. Staying current with tools and styles matters.

The work is studio based or remote, sometimes with intense periods around deadlines, and freelance work is common. Graduate and early roles typically pay around £24k to £35k, rising to £40k to £65k and beyond as you specialise, with variation between studios and freelance work. Demand is steady but competitive across screen industries.`,

  motion_designer: `A Motion Designer creates animated graphics that bring design and information to life, from title sequences and adverts to explainer videos and social content. You combine graphic design with movement to make visuals dynamic and engaging. It is a creative, technical role in growing demand across digital media.

Day to day you design and animate graphics, work with specialist software, develop visual styles, and collaborate with designers, editors and clients. You balance strong design with smooth, purposeful movement, and much of the job is making information and brands feel alive. The work is creative, technical and varied.

Most people enter with a design or animation degree, or a self built portfolio and showreel, which is what matters most, plus internships and freelance work. Skills in motion and design software are essential and often built through practice. Entry is accessible but competitive, based on your reel. From designer you progress to senior motion and creative roles or art direction.

It suits imaginative people with strong originality and technical curiosity who enjoy combining design and movement. You need creative and technical skill, an eye for timing and detail, and the ability to take feedback. It is a poor fit for those who dislike technical software or want a static, non visual role.

Motion design is in growing demand as video and animated content spread across digital platforms, while AI tools speed up some production and raise the value of original ideas and craft. The field keeps expanding with online and social media. Staying current with tools and trends matters.

The work is studio based, hybrid or freelance, with generally reasonable hours that can spike around deadlines. Graduate and early roles typically pay around £26k to £38k, rising to £45k to £65k and beyond as you specialise, with freelance earnings varying. Demand is growing across digital media and marketing.`,


  digital_designer: `A Digital Designer creates the visual design of digital products and content, from websites and apps to online campaigns and social graphics. You make digital experiences look good and work well, combining strong visuals with an understanding of screens and users. It is a creative role at the centre of the digital world.

Day to day you design interfaces, graphics and layouts for digital products, develop visual styles, and work with developers and marketers to bring designs to life. You balance appearance, usability and brand, and much of the job is making digital experiences clear and appealing. The work is creative, technical and detail focused.

Most people enter with a design degree or a strong portfolio built through study, courses or self teaching, which matters most, plus internships and live projects. Skills in design software and an understanding of digital design matter. Entry is accessible but competitive, based on your work. From designer you progress to senior digital design, UI or art direction roles.

It suits imaginative people with strong originality and technical curiosity who enjoy designing for screens and combining art with usability. You need creative skill, an eye for detail and comfort with digital tools. It is a poor fit for those who dislike technical constraints or want a print only role.

Digital design keeps growing as more of life moves online, while AI tools speed up routine production and raise the value of original thinking and user understanding. Demand is strong across technology, marketing and media. The field rewards designers who keep their tools and skills current.

The work is office based, hybrid or freelance, with generally reasonable hours. Graduate and early roles typically pay around £26k to £36k, rising to £45k to £65k and beyond as you specialise. Demand is strong across digital businesses.`,

  ux_designer: `A UX Designer, working in user experience, shapes how easy, useful and enjoyable a digital product is to use. You study what users need and design products that work the way people expect, so an app or website feels effortless. It is a role where creativity, psychology and problem solving meet.

Day to day you research how people use a product, map out their journeys, create wireframes and prototypes, and test designs with real users. You work closely with product, design and engineering teams, and much of the job is making complex things simple. The work is creative, analytical and user focused.

Most people enter through a design or related degree, a conversion course or bootcamp, or by moving from a related field, and a strong portfolio showing your process matters most. Internships and real projects help you build it. Entry is competitive but based on demonstrated skill. From designer you progress to senior and lead UX roles or design management.

It suits imaginative, analytical people with originality and empathy who enjoy understanding users and solving design problems. You need creative and research skills, an eye for detail and genuine care for users. It is a poor fit for those who dislike research and iteration or want a purely visual role.

UX is well established and in steady demand as digital products multiply, and AI tools now assist with parts of research and design, raising the value of judgement, empathy and strategy. Good user experience is seen as a real competitive advantage. The field rewards designers who keep learning.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £30k to £45k, rising to £55k to £85k and beyond as you specialise, with more at large technology firms. Demand is strong across the technology sector and beyond.`,

  ui_designer: `A UI Designer, working in user interface design, crafts the look and feel of the screens people interact with in apps and websites. You design the buttons, layouts, colours and typography that make a product both attractive and easy to use. It is a creative, detail focused role closely tied to how digital products work.

Day to day you design interface elements and screens, build design systems, create prototypes, and work with UX designers and developers to deliver polished, consistent products. You balance beauty with clarity and function, and much of the job is the careful detail that makes an interface feel right. The work is creative, precise and technical.

Most people enter with a design degree, a conversion course, or a self built portfolio, which matters most, plus internships and real projects. Skills in design software and an understanding of how interfaces work are essential. Entry is competitive but based on your work. From designer you progress to senior UI, product design or art direction roles.

It suits imaginative, precise people with strong originality and technical curiosity who enjoy crafting how things look and work on screen. You need creative skill, attention to detail and comfort with digital tools. It is a poor fit for those who dislike detail or want a purely research focused role.

UI design tools including AI are speeding up production and making design systems more powerful, which raises the value of craft, consistency and original thinking. Demand is strong as digital products multiply, often blended with UX and product design. The field rewards designers who keep their skills current.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £28k to £42k, rising to £50k to £75k and beyond as you specialise. Demand is strong across digital products and technology.`,

  ux_researcher: `A UX Researcher studies how people use products so that design decisions are based on real understanding rather than guesswork. You find out what users need, struggle with and want, and share those insights with the teams building the product. It is a role that puts real people at the centre of design.

Day to day you plan and run research such as interviews, usability tests and surveys, analyse what you learn, and present clear insights and recommendations. You work closely with designers, product managers and engineers, and much of the job is turning what users do and say into better decisions. The work is analytical, curious and people focused.

Most people enter with a degree in psychology, social science, design or a related field, sometimes a master's, and a portfolio or experience of real research helps. Some move in from UX design, market research or academia. Entry is competitive but based on demonstrated skill. From researcher you progress to senior and lead research roles or research leadership.

It suits curious, empathetic people with analytical skill who genuinely want to understand people and enjoy uncovering insight. You need research and analytical ability, empathy and clear communication. It is a poor fit for those who dislike talking to people or want a purely visual or technical role.

As products compete on experience, demand for solid user research has grown, and AI tools now help analyse research data, raising the value of well designed studies and sound interpretation. Good research is increasingly seen as essential to good products. The field rewards researchers who combine rigour with empathy.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £32k to £45k, rising to £55k to £80k and beyond as you specialise, with more at large technology firms. Demand is growing across the technology sector.`,

  // ── Environment, Sustainability & Planetary Futures ─────────────────────
  environmental_consultant: `An Environmental Consultant advises organisations on how to reduce their impact on the environment and meet environmental rules. You assess how projects and businesses affect nature, air, water and land, and recommend how to do better. It is a role for people who want to protect the environment through practical, evidence based advice.

Day to day you carry out site assessments and surveys, analyse environmental data, write reports, and advise clients on how to comply with regulations and reduce harm. You often combine desk work with fieldwork, and much of the job is turning science into practical recommendations. The work is analytical, varied and purpose driven.

Most people enter with an environmental science, geography or related degree, through a graduate scheme at a consultancy or by moving from a technical role, and working towards chartered status through a body such as IEMA is common. Fieldwork experience and internships help. Entry is competitive but the sector is growing. From consultant you progress to senior and principal consultant and towards leading projects and teams.

It suits purposeful, analytical people who care about the environment and enjoy combining science with practical advice. You need analytical skill, technical curiosity and clear communication. It is a poor fit for those who want purely office based work or have little interest in the environment.

Environmental work is expanding fast as climate rules, net zero targets and sustainability expectations grow, which makes this one of the stronger green career areas. Data and technology increasingly support assessments. Demand is rising, favouring those who combine environmental knowledge with commercial awareness.

The work mixes office and site, sometimes outdoors in varied conditions, with generally reasonable hours. Graduate and early roles typically pay around £24k to £32k, rising to £40k to £60k and beyond as you gain chartership and experience. Demand is strong and growing as environmental rules tighten.`,

  environmental_monitoring_officer: `An Environmental Monitoring Officer measures and tracks the condition of the environment, checking things like air, water, soil and noise to spot problems and make sure rules are followed. You gather the real world data that tells us whether the environment is healthy or under threat. It is a practical, science based role often spent partly outdoors.

Day to day you collect samples and take measurements in the field, run tests, record and analyse data, and report on environmental conditions. You use specialist equipment and follow careful procedures, and much of the job is producing accurate, reliable data. The work is technical, precise and often hands on outdoors.

Most people enter with an environmental science, geography or related degree, or through an apprenticeship or technical role, and fieldwork experience helps. Employers value accuracy, practical skills and genuine interest in the environment. Entry is accessible for those with the right background. From officer you progress into senior monitoring, environmental consultancy or specialist roles.

It suits practical, purposeful people with technical curiosity who care about the environment and enjoy fieldwork and precise measurement. You need care for detail, comfort with data and a willingness to work outdoors. It is a poor fit for those who want purely office work or dislike fieldwork.

Environmental monitoring is growing as regulation and concern about pollution and climate increase, and sensors, automation and data tools are changing how monitoring is done. The value is shifting towards interpreting data as much as collecting it. Demand is steady and rising with environmental rules.

The work mixes fieldwork and lab or office, often outdoors in varied weather, with generally reasonable hours. Entry and early roles typically pay around £22k to £30k, rising to £35k to £50k and beyond as you specialise. Demand is steady across regulators, consultancies and utilities.`,

  sustainability_consultant: `A Sustainability Consultant helps organisations become more environmentally and socially responsible, and to meet growing expectations and rules on sustainability. You advise on how to cut carbon, use resources better and operate more responsibly. It is a fast growing role for people who want to drive change through business.

Day to day you assess an organisation's sustainability performance, develop strategies and targets, help implement changes, and report on progress. You work with many parts of a business and often with senior leaders, and much of the job is turning ambition into practical action. The work is analytical, strategic and purpose driven.

Most people enter with a sustainability, business, science or related degree, through a graduate scheme at a consultancy or by specialising from another role, and specialist qualifications help. Internships and genuine knowledge of the field matter. Entry is competitive but the sector is expanding quickly. From consultant you progress to senior and principal roles and towards leading sustainability practices.

It suits purposeful, analytical people with an entrepreneurial streak who want to make organisations more responsible and enjoy working across a business. You need analytical skill, commercial awareness and persuasion. It is a poor fit for those who want narrow technical work or are sceptical of the field.

Sustainability advice is booming as regulation, net zero targets and investor pressure grow, though the field faces scrutiny over greenwashing and must show real results. It is professionalising and standardising as it matures. Demand is strong and rising, favouring those who can link sustainability to genuine business value.

The work is office based or hybrid with client visits, and hours are generally reasonable. Graduate and early roles typically pay around £28k to £40k, rising to £50k to £75k and beyond as you specialise, with more at large consultancies. Demand is strong and growing across sectors.`,

  sustainability_reporting_analyst: `A Sustainability Reporting Analyst measures and reports how an organisation is performing on environmental and social issues, so it can be transparent and meet reporting rules. You gather the data behind sustainability claims and turn it into clear, credible reports. It is a role where data meets purpose and accountability.

Day to day you collect and check sustainability data such as emissions and resource use, analyse it against standards, and prepare reports for management, investors and regulators. You keep up with evolving reporting frameworks, and much of the job is making sure the numbers are accurate and comparable. The work is analytical, precise and structured.

Most people enter with a sustainability, business, science or numerate degree, through a graduate scheme or by moving from a finance, data or sustainability role, and knowledge of reporting standards helps. Real experience with data and reporting matters. Entry is competitive but the field is growing. From analyst you progress to senior reporting and sustainability roles.

It suits purposeful, analytical people who care about sustainability and like working with data and detail. You need comfort with numbers, precision and an interest in the field. It is a poor fit for those who dislike detailed data work or want a purely strategic role.

Sustainability reporting is expanding fast as regulation makes it mandatory for more organisations, which is driving strong demand for people who can produce credible data. Standards are tightening and converging, and technology helps gather data. Demand is rising quickly as reporting rules spread.

The work is office based or hybrid, with generally reasonable hours busier around reporting periods. Graduate and early roles typically pay around £30k to £42k, rising to £50k to £70k and beyond as you specialise. Demand is strong and growing as sustainability reporting becomes required.`,

  supply_chain_sustainability_analyst: `A Supply Chain Sustainability Analyst helps make the way companies source and move goods more responsible, reducing the environmental and social harm in their supply chains. You look at where products and materials come from and help make those chains cleaner and fairer. It is a role that tackles sustainability where much of the real impact lies.

Day to day you analyse supply chain data, assess suppliers on environmental and social measures, identify risks and improvements, and help put more sustainable practices in place. You work across procurement, operations and sustainability teams, and much of the job is turning complex supply chains into clearer, better choices. The work is analytical, practical and purpose driven.

Most people enter with a supply chain, business, sustainability or numerate degree, through a graduate scheme or by moving from an operations or sustainability role, and comfort with data helps. Real knowledge of supply chains and sustainability matters. Entry is competitive but the field is growing. From analyst you progress into senior supply chain sustainability and strategy roles.

It suits purposeful, analytical people who care about sustainability and enjoy working with data and complex systems. You need analytical skill, attention to detail and an interest in how goods are made and moved. It is a poor fit for those who dislike data or have little interest in supply chains.

As regulation and customers demand cleaner supply chains, and rules on issues like emissions and labour tighten, demand for this specialism is growing. Data and technology increasingly help trace and assess supply chains. Demand is rising as companies take responsibility for their whole footprint.

The work is office based or hybrid, sometimes with supplier visits, and hours are generally reasonable. Graduate and early roles typically pay around £30k to £42k, rising to £50k to £70k and beyond as you specialise. Demand is growing across manufacturing, retail and consumer goods.`,

  circular_economy_analyst: `A Circular Economy Analyst helps organisations design out waste by keeping materials and products in use for longer, rather than making, using and throwing away. You find ways to reuse, repair, recycle and rethink how things are produced and consumed. It is a forward looking role at the heart of a more sustainable economy.

Day to day you analyse how materials and products flow through a business, identify opportunities to reduce waste and reuse resources, and help design more circular systems and models. You combine data with creative thinking, and much of the job is finding smarter ways to use what we already have. The work is analytical, inventive and purpose driven.

Most people enter with a sustainability, environmental, engineering or business degree, through a graduate scheme or by specialising from another role, and knowledge of circular economy ideas helps. Real projects and genuine interest matter. Entry is competitive and the field is young but growing. From analyst you progress into senior circular economy and sustainability roles.

It suits purposeful, inventive people with originality who care about sustainability and enjoy rethinking how things are done. You need analytical skill, creativity and an interest in systems and materials. It is a poor fit for those who want narrow, routine work or are sceptical of the field.

The circular economy is gaining momentum as resource pressures, regulation and waste concerns grow, making this an emerging area with rising demand. New business models and technologies keep expanding what is possible. Demand is growing, though the field is still developing and roles vary.

The work is office based or hybrid, sometimes with site visits, and hours are generally reasonable. Graduate and early roles typically pay around £28k to £40k, rising to £45k to £65k and beyond as you specialise. Demand is growing as circular thinking spreads across industries.`,

  environmental_policy_officer: `An Environmental Policy Officer helps develop and shape the rules and strategies that protect the environment, working for government, charities or other organisations. You research issues, weigh up options, and help design policies that balance environmental, economic and social needs. It is a role for people who want to drive change at the level of rules and systems.

Day to day you research environmental issues, analyse evidence and options, write briefings and policy proposals, and work with stakeholders and decision makers. You help turn environmental goals into workable policy, and much of the job is clear analysis and persuasion. The work is analytical, collaborative and purpose driven.

Most people enter with a degree in environmental science, geography, politics or a related field, through a government or NGO graduate scheme, an internship, or a research role, and the civil service fast stream is a well known route. Genuine knowledge and relevant experience matter. Entry is competitive. From officer you progress to senior policy roles and towards shaping strategy.

It suits purposeful, analytical people with curiosity about the wider world who want to influence how society tackles environmental problems. You need strong analysis, clear writing and the ability to work with others. It is a poor fit for those who want hands on technical work or dislike bureaucracy.

Environmental policy is a growing and high profile area as climate change and nature loss rise up the agenda, which sustains steady demand. The work is shaped by politics and public priorities, which can shift. Demand is steady across government, charities and advocacy bodies.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £26k to £36k, rising to £40k to £60k and beyond as you specialise, with variation by sector. Demand is steady as environmental issues stay prominent.`,

  environmental_impact_assessment_consultant: `An Environmental Impact Assessment Consultant works out how proposed developments, such as roads, housing or energy projects, will affect the environment, so decisions can be made responsibly. You assess likely impacts and recommend how to avoid or reduce harm. It is a role that sits between development and environmental protection.

Day to day you study proposed projects, carry out surveys and assessments, analyse potential impacts on things like wildlife, water and air, and write detailed assessment reports. You work with planners, engineers and ecologists, and much of the job is producing thorough, credible evidence. The work is analytical, technical and often combines desk and fieldwork.

Most people enter with an environmental science, ecology or geography degree, through a graduate scheme at a consultancy or by moving from a technical role, and chartership is often worked towards. Fieldwork and internships help. Entry is competitive but the sector is growing. From consultant you progress to senior and principal roles leading assessments.

It suits analytical, purposeful people with technical curiosity who care about the environment and enjoy detailed, evidence based work. You need analytical and technical skill, precision and clear writing. It is a poor fit for those who want purely office work or dislike detail.

As development continues and environmental rules tighten, demand for impact assessment stays strong, and requirements such as protecting biodiversity are growing. Data and technology increasingly support assessments. Demand is steady and rising with development and regulation.

The work mixes office and site, sometimes outdoors, with generally reasonable hours. Graduate and early roles typically pay around £25k to £35k, rising to £45k to £65k and beyond as you gain chartership and experience. Demand is steady across environmental consultancies.`,

  climate_strategy_analyst: `A Climate Strategy Analyst helps organisations understand and respond to climate change, developing plans to cut emissions and adapt to a changing world. You analyse climate risks and opportunities and help shape the strategy for reaching goals like net zero. It is a role at the sharp end of the response to climate change.

Day to day you analyse emissions and climate data, model scenarios, research policy and technology, and help develop and track climate strategies. You work with leaders and teams across an organisation, and much of the job is turning climate science and targets into practical plans. The work is analytical, strategic and deeply purpose driven.

Most people enter with a science, economics, sustainability or numerate degree, through a graduate scheme at a consultancy or organisation, or by specialising from another role, and knowledge of climate issues helps. Real experience and genuine expertise matter. Entry is competitive but the field is expanding fast. From analyst you progress into senior climate strategy and leadership roles.

It suits purposeful, analytical people with originality who care deeply about climate and enjoy combining data with strategy. You need strong analysis, an interest in climate and the ability to think ahead. It is a poor fit for those who want hands on technical work or are disengaged from the issue.

Climate strategy is a fast growing field as net zero commitments, regulation and investor pressure spread across business and government. The science, policy and technology keep evolving quickly. Demand is strong and rising, favouring those who combine climate knowledge with strategic thinking.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £30k to £45k, rising to £55k to £80k and beyond as you specialise. Demand is strong and growing as climate rises up every agenda.`,

  net_zero_consultant: `A Net Zero Consultant helps organisations plan and deliver the journey to cutting their greenhouse gas emissions to net zero. You advise on how to measure emissions, set credible targets, and make the changes needed to reach them. It is a role right at the centre of the practical response to climate change.

Day to day you measure an organisation's carbon footprint, develop net zero plans, advise on cutting emissions across operations and supply chains, and track progress. You work with clients and teams to turn commitments into action, and much of the job is making an ambitious goal achievable. The work is analytical, strategic and purpose driven.

Most people enter with a sustainability, science, engineering or business degree, through a graduate scheme at a consultancy or by specialising from another role, and knowledge of carbon and climate matters. Real expertise and genuine commitment help. Entry is competitive but the field is expanding quickly. From consultant you progress to senior and principal roles leading net zero work.

It suits purposeful, inventive people with an entrepreneurial streak who want to help tackle climate change and enjoy turning targets into plans. You need analytical skill, persuasion and real knowledge of the field. It is a poor fit for those who want narrow technical work or are sceptical of the goals.

Net zero consulting is booming as more organisations commit to targets and face regulation and scrutiny, so demand is strong, though the field must guard against empty claims and show real cuts. Standards and methods are maturing. Demand is rising fast, favouring those who deliver genuine results.

The work is office based or hybrid with client contact, and hours are generally reasonable. Graduate and early roles typically pay around £30k to £45k, rising to £55k to £85k and beyond as you specialise, with more at large consultancies. Demand is strong and growing as net zero targets spread.`,

  conservation_officer: `A Conservation Officer works to protect and restore nature, looking after habitats, wildlife and natural places so they thrive for the future. You help manage land, run conservation projects, and connect people with the natural world. It is a role driven by a love of nature and a desire to protect it.

Day to day you carry out practical conservation work, manage habitats and species, run projects, and often work with volunteers and communities. You combine hands on outdoor work with planning, surveys and engagement, and much of the job is caring for particular places and species. The work is practical, varied and deeply purpose driven.

Most people enter with an ecology, conservation or environmental degree, and crucially with volunteering and practical experience, which is often essential to break in. Entry is competitive and the field is underfunded, so persistence and a strong track record of experience matter. From officer you progress into senior conservation, project management and reserve management roles.

It suits purposeful, practical people who love nature and enjoy outdoor work and bringing people together for a cause. You need genuine commitment, resilience and practical and people skills. It is a poor fit for those who want high pay, office comfort or a fast paced commercial role.

Conservation is more important than ever as biodiversity declines, and new rules requiring nature protection are creating some fresh demand, but funding remains tight and roles competitive. Data and technology increasingly support the work. Demand is real but constrained, so passion and experience matter most.

The work is largely outdoors in varied weather, with practical tasks and some office work, and hours can include weekends. Pay is modest, typically around £22k to £30k to start and rising to £32k to £45k and beyond with experience and seniority. Demand is steady but competitive and funding dependent.`,

  ecologist: `An Ecologist studies living things and their environments, and uses that knowledge to protect nature and guide responsible development. You survey wildlife and habitats, assess how projects affect them, and advise on how to protect and enhance biodiversity. It is a science based role for people fascinated by the natural world.

Day to day you carry out species and habitat surveys, often outdoors, analyse ecological data, write reports, and advise developers and planners on protecting wildlife. You combine fieldwork with desk analysis, and much of the job is producing sound evidence about nature. The work is scientific, precise and often seasonal and outdoors.

Most people enter with an ecology, biology, zoology or environmental degree, plus vital survey and volunteering experience, and working towards chartership through CIEEM is common. Fieldwork skills, such as identifying species, matter a great deal. Entry is competitive but demand is rising. From ecologist you progress to senior and principal ecologist roles leading surveys and teams.

It suits curious, analytical people with technical curiosity who love nature and enjoy combining fieldwork with science. You need scientific skill, care for detail and a willingness to work outdoors in all conditions. It is a poor fit for those who want purely office work or dislike fieldwork.

Demand for ecologists is growing strongly in the UK, driven by new rules that require developments to leave nature in a better state, which has created a shortage of qualified ecologists. Data and technology increasingly support surveys. The outlook is good, especially for those with strong field skills.

The work mixes fieldwork, often seasonal and outdoors, with office analysis, and hours can vary with survey seasons. Graduate and early roles typically pay around £22k to £32k, rising to £40k to £55k and beyond as you gain chartership and experience. Demand is strong and growing thanks to nature protection rules.`,

  countryside_officer: `A Countryside Officer looks after the countryside and green spaces so people can enjoy them and nature can thrive, balancing access, recreation and conservation. You manage sites such as parks, reserves and trails, and help the public connect with the outdoors responsibly. It is a practical, outdoor role for people who love the natural environment.

Day to day you manage and maintain countryside sites, carry out practical conservation and access work, engage with visitors and communities, and often coordinate volunteers. You balance protecting nature with welcoming people, and much of the job is caring for places on the ground. The work is practical, varied and often outdoors.

Most people enter with an environmental, conservation or countryside management degree, plus practical and volunteering experience, and seasonal or ranger roles are common ways in. Entry is competitive and the field is not highly paid, so relevant experience and commitment matter. From officer you progress into senior countryside, ranger and site management roles.

It suits purposeful, practical people who love the outdoors and enjoy both nature and working with people. You need practical skills, resilience and good communication. It is a poor fit for those who want office comfort, high pay or a fast paced commercial role.

Interest in access to nature and its benefits for wellbeing is growing, which supports these roles, though public funding is often tight and jobs competitive. Managing the balance between visitors and conservation is an ongoing challenge. Demand is steady but funding dependent.

The work is largely outdoors in all weather, with practical tasks and some office work, and hours can include weekends and holidays. Pay is modest, typically around £22k to £30k to start and rising to £32k to £45k and beyond with experience. Demand is steady but competitive and dependent on public funding.`,

  // ── Society, Culture, Languages & Global Affairs ────────────────────────
  policy_analyst: `A Policy Analyst researches issues and helps develop the policies that governments and organisations use to address them. You gather evidence, weigh up options, and advise on what course of action makes sense. It is a role for people who want to shape how society tackles its challenges.

Day to day you research a policy area, analyse data and evidence, weigh different options, and write briefings and recommendations for decision makers. You often consult experts and stakeholders, and much of the job is turning complex issues into clear, workable advice. The work is analytical, evidence based and purpose driven.

Most people enter with a degree in politics, economics, social science or a related field, through a government graduate scheme such as the civil service fast stream, a think tank role, or an internship. Strong analysis and writing matter, and relevant experience helps. Entry is competitive. From analyst you progress to senior policy roles and towards shaping strategy.

It suits curious, analytical people with a sense of purpose who want to influence decisions and enjoy getting to grips with complex issues. You need strong analysis, clear writing and the ability to work with others. It is a poor fit for those who want hands on delivery or dislike research and debate.

Policy work is shaped by data and evidence more than ever, and AI tools now help with research and analysis, raising the value of judgement and clear thinking. Political priorities shift, which shapes the work. Demand is steady across government, think tanks and large organisations.

The work is office based or hybrid, with generally reasonable hours that can spike around key decisions. Graduate and early roles typically pay around £28k to £40k, rising to £45k to £70k and beyond as you specialise, with variation by sector. Demand is steady wherever decisions need evidence.`,

  political_risk_analyst: `A Political Risk Analyst helps organisations understand how political events around the world could affect them, from elections and conflicts to policy changes. You assess what might happen and what it could mean for businesses or investors. It is a role for people fascinated by global affairs and their real world consequences.

Day to day you monitor political developments, analyse risks in particular countries or regions, write reports and forecasts, and advise clients on how events could affect them. You combine deep knowledge of politics with clear analysis, and much of the job is anticipating and explaining what lies ahead. The work is analytical, global and fast moving.

Most people enter with a degree in international relations, politics, economics or a related field, often a master's, through a graduate role at a consultancy, bank or research firm. Regional expertise, languages and strong analysis help you stand out. Entry is competitive. From analyst you progress to senior and specialist analyst roles and advisory positions.

It suits curious, analytical people with deep interest in global affairs who enjoy making sense of complex, uncertain situations. You need strong analysis, regional knowledge and clear communication. It is a poor fit for those who want certainty or little to do with world events.

Growing geopolitical instability has increased demand for political risk analysis, as organisations seek to navigate a more uncertain world. Data tools and AI now support monitoring, raising the value of expert judgement. Demand is growing, favouring those with genuine regional and analytical depth.

The work is office based or hybrid, with generally reasonable hours that can spike around events. Graduate and early roles typically pay around £30k to £45k, rising to £55k to £85k and beyond as you specialise, with more in finance and consulting. Demand is growing amid global uncertainty.`,

  translator: `A Translator converts written material from one language into another, keeping the meaning, tone and intent intact. You help people, businesses and organisations communicate across languages, from documents and books to websites and legal texts. It is a skilled role for people with a deep love of languages.

Day to day you translate texts accurately and naturally, research terminology, and often specialise in fields like legal, technical or literary translation. Increasingly you also review and refine machine translated text. Much of the job is capturing not just the words but the meaning and style. The work is precise, independent and language focused.

Most people enter with a degree in languages and often a postgraduate qualification in translation, plus experience built through internships and freelancing, and professional membership of bodies like the CIOL or ITI helps. Much translation work is freelance, so building clients matters. Entry is competitive and often starts freelance. From here you progress to specialist, senior or in house roles, or build a freelance practice.

It suits precise, curious people with a love of languages and cultures who enjoy working independently on detailed material. You need excellent language skills, accuracy and cultural understanding. It is a poor fit for those who want highly social, fast paced work or lack patience for detail.

Machine translation and AI have transformed the field, handling much routine translation, so human translators increasingly focus on specialist, creative, legal or sensitive work and on refining machine output. Demand for straightforward translation has fallen, while skilled and specialist work endures. Adapting to work alongside the technology is now essential.

The work is often freelance or remote, with flexible but self directed hours, and some in house roles exist. Pay varies widely, with employed roles typically around £24k to £35k and freelance earnings depending on specialism and clients. Demand is shifting towards specialist and high value work as routine translation is automated.`,

  international_development_officer: `An International Development Officer works to reduce poverty and improve lives in developing countries, helping deliver projects in areas like health, education, water and livelihoods. You help plan, run and support programmes that make a real difference. It is a role for people driven to tackle global inequality.

Day to day you support the design and delivery of development projects, coordinate with partners and communities, monitor progress, and help manage budgets and reporting. You may work in the field or from a headquarters, and much of the job is turning good intentions into effective, well run programmes. The work is varied, collaborative and deeply purpose driven.

Most people enter with a degree in development studies, international relations or a related field, often a master's, plus experience through volunteering or internships, which is usually essential. Languages and overseas experience help. Entry is competitive and funding dependent. From officer you progress into programme management and senior development roles.

It suits purposeful, adaptable people with curiosity about the wider world who want to help and enjoy working across cultures. You need commitment, flexibility and good organisation and people skills. It is a poor fit for those who want high pay, stability or a predictable environment.

The sector is shaped by aid budgets and politics, and recent cuts to funding in some countries have made roles more competitive. There is a growing emphasis on local leadership and on measuring real impact. Demand is real but constrained by funding, so experience and commitment matter most.

The work spans offices and sometimes challenging field locations, with hours and conditions that vary widely. Pay is modest, typically around £26k to £35k to start and rising to £40k to £60k and beyond with experience and seniority. Demand is steady but competitive and dependent on funding.`,

  programme_officer: `A Programme Officer helps plan, run and support the projects and programmes that charities, NGOs and similar organisations deliver. You keep programmes organised, on track and well managed so they achieve their goals. It is a role for people who want to turn good causes into effective action.

Day to day you coordinate programme activities, support planning and budgets, monitor progress, liaise with partners, and help with reporting to funders. You keep many moving parts running smoothly, and much of the job is practical organisation in service of a mission. The work is collaborative, organised and purpose driven.

Most people enter with a degree in a relevant field, plus volunteering or internship experience, which helps a great deal, and a specific subject is less important than commitment and skills. Entry is competitive and often funding dependent. From officer you progress into programme management and senior roles overseeing larger programmes.

It suits purposeful, organised people who enjoy working with others and want their work to serve a cause. You need good organisation, collaboration and adaptability. It is a poor fit for those who want high pay or a fast paced commercial environment.

The charity and NGO sector is shaped by funding, which can be uncertain, and there is growing emphasis on demonstrating impact and on local partnership. Digital tools increasingly support programme management. Demand is steady but competitive and dependent on funding.

The work is office based or hybrid, sometimes with travel, and hours are generally reasonable. Pay is modest, typically around £26k to £35k to start and rising to £40k to £60k and beyond with experience. Demand is steady across the charity and NGO sector.`,

  social_researcher: `A Social Researcher studies how people live, behave and experience society, producing evidence that informs policy, services and understanding. You design studies, gather data from people, and turn it into insight about social issues. It is a role for people who want to understand society and improve it through evidence.

Day to day you design research, run surveys, interviews or focus groups, analyse the results, and write reports and recommendations. You combine numbers and human insight, and much of the job is producing rigorous, useful evidence about real social questions. The work is analytical, methodical and purpose driven.

Most people enter with a social science degree, often a master's, through a government research scheme such as the Government Social Research service, a research agency, or a think tank. Skills in research methods and data matter, and relevant experience helps. Entry is competitive. From researcher you progress to senior and principal research roles.

It suits curious, analytical people with a sense of purpose who want to understand people and society and enjoy rigorous research. You need strong research and analytical skills and clear communication. It is a poor fit for those who dislike detailed analysis or want hands on delivery.

Social research increasingly uses large datasets and new digital methods alongside traditional approaches, and AI helps analyse data, raising the value of good design and interpretation. Demand is steady across government, research bodies and charities. The field rewards those who combine rigour with real world relevance.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £28k to £38k, rising to £45k to £65k and beyond as you specialise, with variation by sector. Demand is steady wherever social evidence is needed.`,

  cultural_researcher: `A Cultural Researcher studies culture and society, exploring how people create meaning through things like art, media, traditions and everyday life. You investigate cultural questions and produce insight for organisations, media, academia or the public. It is a role for people fascinated by how culture works.

Day to day you research cultural topics, gather and analyse material and data, and write reports, articles or studies that explain what you find. You combine curiosity about culture with rigorous analysis, and much of the job is making sense of complex cultural patterns. The work is investigative, thoughtful and often varied.

Most people enter with a degree in a humanities or social science field, often a postgraduate qualification, and experience through research, writing or relevant work. Roles exist in academia, cultural organisations, media and research agencies. Entry is competitive and varied. From researcher you progress into senior research, academic or specialist cultural roles.

It suits curious, analytical people with wide cultural interests and originality who enjoy exploring ideas and explaining them. You need strong research and writing skills and genuine cultural curiosity. It is a poor fit for those who want commercial, fast paced work or dislike open ended enquiry.

Cultural research increasingly draws on digital methods and data alongside traditional analysis, and interest in understanding diverse cultures and audiences is growing. Funding, especially in academia, can be uncertain and competitive. Demand is modest but steady across culture, media and research.

The work is office, home or institution based, with generally flexible hours. Pay varies by setting, typically around £25k to £35k earlier on and rising to £40k to £60k and beyond in senior or specialist roles. Demand is modest but steady across cultural and research organisations.`,

  intelligence_analyst: `An Intelligence Analyst gathers and makes sense of information to help protect national security or support decisions, spotting threats and explaining what they mean. You piece together evidence from many sources to build a clear picture and advise those who act on it. It is a role of careful analysis with real consequences.

Day to day you collect and assess information, analyse patterns and threats, write clear assessments, and brief decision makers. You work with large amounts of data and varied sources, and much of the job is turning fragments into reliable, useful insight. The work is analytical, meticulous and often confidential.

Most people enter through a government graduate scheme, such as those in the security and intelligence agencies, or from analytical, military or research backgrounds, and roles require security vetting. Strong analysis, discretion and clear writing matter, and some roles value languages or technical skills. Entry is competitive and involves thorough checks. From analyst you progress into senior and specialist intelligence roles.

It suits sharp, analytical people with curiosity about the world who enjoy solving puzzles and can handle sensitive work discreetly. You need strong analysis, sound judgement and integrity. It is a poor fit for those who want a public facing role or dislike detailed, confidential work.

Intelligence work increasingly involves large volumes of digital data and open sources, and AI tools help sift information, raising the value of judgement and interpretation. Cyber and technological threats are a growing focus. Demand is steady and skills in data and technology are increasingly valued.

The work is office based, often in secure settings, with generally reasonable hours that can vary with events. Graduate and early roles typically pay around £28k to £40k, rising to £45k to £70k and beyond as you specialise, on government pay scales. Demand is steady across government and security bodies.`,

  // ── Architecture, Built Environment & Spatial Design ────────────────────
  architect: `An Architect designs buildings and the spaces around them, balancing how they look, how they work and how they are built. You take a client's needs and a site's constraints and turn them into designs that are functional, safe and inspiring. It is a creative profession with real responsibility for the places people live and work.

Day to day you develop designs, produce drawings and models, work with clients, engineers and builders, and guide projects from first idea through to construction. You balance creativity with practicality, regulations and budgets, and much of the job is solving how a vision can actually be built. The work is creative, technical and collaborative.

Becoming an architect is a long, structured path: an accredited degree, a period of practical experience, a further qualification and a final professional exam, typically around seven years in total, leading to registration. Degree apprenticeships now offer an earn while you learn route, and a strong portfolio matters throughout. Entry is competitive and the training demanding. From qualified architect you progress to senior architect, associate and running projects or your own practice.

It suits imaginative, thoughtful people with strong originality and technical curiosity who want independence and enjoy solving complex design problems. You need creative and technical skill, patience and resilience through a long training. It is a poor fit for those who want quick qualification, high early pay or purely technical work.

Architecture is being reshaped by digital design, modelling tools and AI, and by growing demands for sustainability and retrofitting existing buildings. Work is affected by economic cycles in construction. Demand is steady, favouring architects who embrace new tools and green design.

The work is studio based with site visits, and hours can be long around deadlines. Pay is modest during training, roughly £24k to £35k, rising to £35k to £55k once qualified and higher for senior and lead architects. Demand is steady, tied to construction and shaped by sustainability.`,

  architectural_assistant: `An Architectural Assistant works within an architecture practice while training to become an architect, supporting projects and gaining the experience needed to qualify. You take on real design and technical work under the guidance of qualified architects. It is a key stage on the path to becoming an architect.

Day to day you produce drawings and models, develop parts of designs, prepare documents, and help with the practical side of projects. You learn how a practice really works, and much of the job is building skills and experience across live projects. The work is creative, technical and hands on.

You become an architectural assistant after completing the first accredited architecture degree, working in practice to gain experience before returning to study and completing qualification. A strong portfolio and good practical skills matter. Entry is competitive, tied to the wider architecture path. From assistant you progress by qualifying as an architect and moving into more senior design roles.

It suits imaginative, technically curious people with originality who want to become architects and enjoy learning through real work. You need design and technical skill, precision and a willingness to keep studying. It is a poor fit for those who want a quick route to qualification or high early pay.

Like the wider profession, the role is shaped by digital design tools, AI and a growing focus on sustainability, so building these skills early helps. Opportunities move with the construction economy. Demand is steady, following the broader architecture field.

The work is studio based with some site visits, and hours can be long around deadlines. Pay is modest during this training stage, typically around £22k to £30k, rising as you qualify. Demand is steady, tied to the health of architecture practices.`,

  town_planner: `A Town Planner shapes how places develop, deciding how land is used and helping design communities that work well for people and the environment. You balance the need for homes, jobs and infrastructure with protecting the character and sustainability of places. It is a role with real influence over the future of towns and cities.

Day to day you assess planning applications, develop plans and policies, consult communities and stakeholders, and advise on how land should be used. You weigh many competing interests, and much of the job is balancing development with quality of life and the environment. The work is analytical, collaborative and purpose driven.

Most people enter with an accredited planning degree or a conversion master's, through a graduate scheme in local government or a consultancy, or increasingly a degree apprenticeship, and work towards chartered status with the RTPI. Relevant experience helps. Entry is competitive but demand is solid. From planner you progress to senior and principal planning roles.

It suits thoughtful, analytical people with a sense of purpose who want to improve places and enjoy balancing different needs. You need analysis, communication and the patience to work through complex decisions. It is a poor fit for those who want fast results or dislike bureaucracy and consultation.

Planning is shaped by housing pressures, reform of the planning system and a push for digital and greener development, which keeps demand steady, and there is a shortage of qualified planners. Technology increasingly supports the work. Demand is solid across the public and private sectors.

The work is office based or hybrid with site visits and meetings, and hours are generally reasonable. Graduate and early roles typically pay around £24k to £32k, rising to £40k to £60k and beyond as you gain chartership and seniority. Demand is steady, supported by a shortage of planners.`,

  planning_consultant: `A Planning Consultant advises clients, such as developers and businesses, on how to get planning permission and navigate the planning system. You help shape and steer projects through planning, giving expert advice to get the best result. It is a commercial, advisory side of town planning.

Day to day you prepare and manage planning applications, advise clients on planning strategy, negotiate with planning authorities, and produce supporting reports. You combine planning knowledge with commercial awareness, and much of the job is helping projects succeed within the rules. The work is analytical, client focused and often deadline driven.

Most people enter with an accredited planning degree or conversion master's, through a graduate scheme at a consultancy, and work towards RTPI chartership. Some move across from public sector planning. Entry is competitive but demand is good. From consultant you progress to senior and associate roles and towards leading planning teams.

It suits driven, analytical people who enjoy advising clients and navigating complex systems to achieve results. You need planning knowledge, commercial awareness and negotiation skills. It is a poor fit for those who dislike client pressure or want purely public interest work.

Consultancy is shaped by development activity, planning reform and pressure for housing and infrastructure, and technology increasingly supports applications. Demand tracks the construction economy but is supported by a shortage of planners. Demand is good for skilled consultants.

The work is office based or hybrid with client and site visits, and hours can be demanding around deadlines. Graduate and early roles typically pay around £26k to £38k, rising to £45k to £70k and beyond as you gain chartership and seniority. Demand is good, tied to development activity.`,

  architectural_technologist: `An Architectural Technologist focuses on the technical side of building design, making sure buildings are designed to work, perform well and be built successfully. You bridge design and construction, turning architectural ideas into detailed, buildable technical solutions. It is a role for people who love the how of buildings as much as the look.

Day to day you develop detailed technical designs and drawings, specify materials and systems, ensure designs meet regulations, and coordinate with architects, engineers and builders. You solve the practical problems of how a building goes together, and much of the job is technical detail and performance. The work is technical, precise and collaborative.

Most people enter with an accredited architectural technology degree, or a degree apprenticeship, and work towards chartered status with CIAT. Practical skills and technical understanding matter. Entry is accessible for the technically minded, and the qualification is quicker than becoming an architect. From technologist you progress to senior technologist and technical lead roles.

It suits practical, technically curious people with a drive for mastery who enjoy detailed problem solving and how things are built. You need technical skill, precision and good coordination. It is a poor fit for those who want purely creative design or dislike technical detail.

The role is increasingly central as building information modelling, digital tools and sustainability standards make technical design more complex and important. Technologists who master these tools are in demand. Demand is steady and rising with the technical and green demands of modern building.

The work is studio based with site visits, and hours are generally reasonable. Graduate and early roles typically pay around £24k to £32k, rising to £40k to £55k and beyond as you gain chartership and seniority. Demand is steady across architecture and construction.`,

  bim_coordinator: `A BIM Coordinator manages the digital models that modern building projects are designed and built from, using building information modelling to keep everyone working from accurate, shared information. You make sure the digital model is coordinated, consistent and useful across the whole project team. It is a technical, organising role at the heart of modern construction.

Day to day you manage and coordinate digital building models, check for clashes and errors, set standards, and help architects, engineers and contractors work together through the model. You solve problems of coordination and data, and much of the job is keeping the digital backbone of a project reliable. The work is technical, structured and collaborative.

Most people arrive after experience in architectural technology, design or construction, having built strong BIM skills, rather than straight from a degree, though technology degrees and apprenticeships lead here. Skills in BIM software and coordination matter most. Entry usually means gaining technical experience first. From coordinator you progress to BIM manager and digital construction leadership.

It suits organised, technically curious people with data curiosity who enjoy managing information and helping teams work together. You need strong technical and coordination skills and attention to detail. It is a poor fit for those new to construction technology or who dislike detail and process.

BIM is now central to how major projects are delivered, and digital construction, data and increasingly AI keep expanding the role, making these skills highly valued. Government and industry increasingly require BIM. Demand is strong for skilled coordinators.

The work is office based or hybrid with some site contact, and hours are generally reasonable. Pay typically starts around £30k to £42k and rises to £50k to £70k and beyond as you move into BIM management. Demand is strong as construction goes digital.`,

  architectural_technician: `An Architectural Technician produces the detailed technical drawings and documents that turn building designs into something that can be built. You provide the technical drafting and support that architects and technologists rely on. It is a practical, detail focused entry into the technical side of building design.

Day to day you create technical drawings, prepare documents, use design and drafting software, and support the technical development of projects. You work carefully to standards and details, and much of the job is accurate, reliable technical production. The work is technical, precise and structured.

Most people enter through an apprenticeship, a technical qualification such as an HNC, or a related course, and a degree is often not required. Skills in drafting and design software are key and often built on the job. Entry is accessible for the technically minded. From technician you progress into architectural technology, BIM and more senior technical roles.

It suits practical, organised people with technical curiosity and precision who enjoy detailed drawing and how buildings are put together. You need care for detail, comfort with software and a methodical approach. It is a poor fit for those who want creative design or dislike detailed technical work.

Digital tools and BIM are changing technical drawing, so building software and modelling skills keeps the role secure and opens progression. The work is increasingly digital and model based. Demand is steady, tilting towards those with strong digital skills.

The work is studio or office based with occasional site contact, and hours are generally reasonable. Entry and early roles typically pay around £22k to £30k, rising to £35k to £50k and beyond as you specialise. Demand is steady across architecture and construction.`,

  site_manager: `A Site Manager runs the day to day work on a construction site, making sure building work is done safely, on time, to standard and within budget. You are the person on the ground who keeps a project moving and coordinates everyone involved. It is a hands on leadership role at the sharp end of construction.

Day to day you plan and oversee site work, manage workers and subcontractors, ensure health and safety, check quality, and keep the project on schedule. You solve problems as they arise and keep many people and tasks coordinated, and much of the job is practical leadership under pressure. The work is active, demanding and people focused.

Most people enter through a construction management degree, a degree apprenticeship, or by working up from a trade or site role, and practical experience is highly valued. Site based qualifications and safety certificates are gained along the way. Entry is accessible by several routes and demand is strong. From site manager you progress to senior site and project management and construction leadership.

It suits driven, resilient people who thrive on pace and enjoy leading and solving practical problems. You need leadership, adaptability and the ability to stay calm under pressure. It is a poor fit for those who want a quiet office role or dislike responsibility and unpredictability.

Construction faces skills shortages, which keeps demand for good site managers strong, and modern methods such as offsite building and digital tools are changing how sites run. Safety and efficiency are ever more important. Demand is strong across the construction sector.

The work is site based and outdoors in all conditions, often with early starts and long days. Graduate and early roles typically pay around £30k to £45k, rising to £50k to £75k and beyond as you take on larger projects. Demand is strong, supported by construction skills shortages.`,

  quantity_surveyor: `A Quantity Surveyor manages the money on construction projects, making sure they are financially sound and deliver value from start to finish. You estimate and control costs, handle contracts and payments, and help keep projects on budget. It is a commercial, numbers focused role central to how building projects work.

Day to day you prepare cost estimates and budgets, manage contracts and payments, track spending, and advise on the financial and contractual side of projects. You work with clients, contractors and designers, and much of the job is controlling cost and value across a project. The work is analytical, commercial and detail focused.

Most people enter through an accredited surveying degree or, very commonly, a degree apprenticeship that lets you earn while you qualify, and work towards chartered status with the RICS. Numeracy and commercial awareness matter. Entry is accessible and demand is strong. From surveyor you progress to senior and chartered surveyor and commercial management roles.

It suits analytical, driven people who enjoy working with numbers and contracts and like seeing projects delivered. You need comfort with data, precision and commercial judgement. It is a poor fit for those who dislike numbers or want purely creative work.

Quantity surveying is in strong demand with a shortage of qualified surveyors, and digital tools, BIM and data are changing how costs are managed. Chartership is highly valued. Demand is strong and the profession offers good security.

The work mixes office and site, with generally reasonable hours. Graduate and early roles typically pay around £25k to £35k, rising to £45k to £70k and beyond as you gain chartership and seniority. Demand is strong, supported by a shortage of surveyors.`,

  building_surveyor: `A Building Surveyor assesses the condition of buildings, advises on their care and improvement, and helps solve problems with how they are built or maintained. You inspect properties, diagnose issues, and recommend repairs, alterations or maintenance. It is a technical, varied role for people who like understanding how buildings work and last.

Day to day you inspect buildings, identify defects and problems, prepare reports, advise clients, and oversee repair and improvement work. You combine technical knowledge with practical judgement, and much of the job is understanding and looking after buildings. The work is technical, investigative and varied.

Most people enter through an accredited surveying degree or a degree apprenticeship, and work towards chartered status with the RICS. Technical understanding and attention to detail matter. Entry is accessible and demand is good. From surveyor you progress to senior and chartered surveyor and specialist roles.

It suits practical, analytical people with technical curiosity who enjoy understanding buildings and solving problems. You need technical knowledge, precision and good judgement. It is a poor fit for those who want purely office work or dislike technical detail.

Demand is supported by a shortage of surveyors and by growing needs around building safety, energy efficiency and retrofitting older buildings. Digital tools and drones increasingly support surveys. Demand is good, with building safety and sustainability adding to it.

The work mixes site inspections and office work, sometimes outdoors and at height, with generally reasonable hours. Graduate and early roles typically pay around £24k to £35k, rising to £45k to £65k and beyond as you gain chartership and seniority. Demand is good across property and construction.`,

  estimator: `An Estimator works out how much a construction project or piece of work will cost, pricing up the materials, labour and time needed. You produce the estimates that help contractors bid for work and plan projects. It is a commercial, detail focused role central to winning and delivering construction work.

Day to day you analyse project plans, price up materials and labour, prepare detailed cost estimates and tenders, and work with suppliers and project teams. You make sure bids are competitive but realistic, and much of the job is careful, accurate costing. The work is analytical, precise and commercial.

Most people enter through a construction, surveying or related qualification, an apprenticeship, or by moving from a site or surveying role, and practical experience is highly valued. Numeracy and attention to detail matter. Entry is accessible by several routes. From estimator you progress to senior estimator and commercial management roles.

It suits analytical, driven people who enjoy working with numbers and detail and like the commercial side of construction. You need comfort with data, precision and commercial awareness. It is a poor fit for those who dislike detailed numerical work or want site based or creative roles.

Estimating is supported by strong construction activity and skills shortages, and digital tools and data increasingly speed up and sharpen the work. Accurate estimating is highly valued. Demand is steady across the construction sector.

The work is mostly office based with some site contact, and hours are generally reasonable. Graduate and early roles typically pay around £26k to £38k, rising to £45k to £65k and beyond as you specialise. Demand is steady, supported by construction activity.`,

  building_sustainability_consultant: `A Building Sustainability Consultant helps make buildings greener and more efficient, advising on how to reduce their energy use, carbon and environmental impact. You assess how buildings perform and recommend ways to make them more sustainable. It is a role at the meeting point of construction and the drive to net zero.

Day to day you assess building performance, model energy use, advise on sustainable design and materials, and help projects meet environmental standards and certifications. You work with architects, engineers and clients, and much of the job is turning sustainability goals into practical building improvements. The work is technical, analytical and purpose driven.

Most people enter with a degree in building services, environmental or sustainability engineering, or a related field, through a graduate scheme or by specialising from a technical role, and relevant certifications help. Technical knowledge and interest in sustainability matter. Entry is competitive but the field is growing. From consultant you progress to senior and principal sustainability roles.

It suits purposeful, analytical people with technical curiosity who care about sustainability and enjoy improving how buildings perform. You need technical and analytical skill and an interest in green building. It is a poor fit for those who want purely design work or have little interest in sustainability.

This is a fast growing field as net zero targets, energy costs and regulation push buildings to perform better, and retrofitting existing buildings is a major and expanding area. New standards and technology keep raising the bar. Demand is strong and rising.

The work mixes office and site, with generally reasonable hours. Graduate and early roles typically pay around £28k to £40k, rising to £50k to £70k and beyond as you specialise. Demand is strong and growing with the push for greener buildings.`,

  // ── Scientific Discovery & Innovation ───────────────────────────────────
  laboratory_technician: `A Laboratory Technician keeps a science lab running and carries out the practical work behind experiments and testing. You prepare equipment and samples, run tests, and make sure the lab works safely and smoothly. It is a hands on, practical entry point into science.

Day to day you set up and run experiments and tests, prepare and handle samples, maintain equipment, record results, and keep the lab clean, safe and stocked. You follow careful procedures, and much of the job is accurate, reliable practical work. The work is precise, methodical and hands on.

This is an accessible way into science. Many technicians enter through an apprenticeship, a college qualification such as a BTEC, or a science degree, and a degree is often not required. Practical skills and care are valued. Entry is accessible for the scientifically minded. From technician you progress to senior technician and specialist roles, or study further into scientific careers.

It suits practical, careful people with technical curiosity and a drive for mastery who enjoy hands on lab work and precision. You need care for detail, reliability and good practical skills. It is a poor fit for those who want office based or highly theoretical work.

Automation and new instruments are changing lab work, taking over some routine tasks and raising the value of skilled technical judgement. Good technicians remain essential to research and testing. Demand is steady across research, industry and healthcare.

The work is lab based, with generally regular hours. Entry and early roles typically pay around £20k to £28k, rising to £30k to £40k and beyond as you specialise. Demand is steady across scientific and industrial labs.`,

  research_assistant: `A Research Assistant supports scientific research, helping investigate questions and produce new knowledge in universities, institutes or industry. You carry out experiments, gather and analyse data, and support the wider research team. It is a common early step into a research career.

Day to day you run experiments, collect and analyse data, review literature, and help prepare results for reports and publications. You work under the direction of senior researchers, and much of the job is careful, hands on contribution to a research project. The work is analytical, methodical and curiosity driven.

Most people enter with a science degree, often while considering or beginning postgraduate study, and relevant lab or research experience helps. Research assistant roles are frequently a stepping stone towards a PhD or a research career. Entry is competitive. From assistant you progress into PhD study, research scientist roles or specialist positions.

It suits curious, analytical people with a drive for mastery who enjoy investigation and want to contribute to discovery. You need good scientific and analytical skills, care for detail and reliability. It is a poor fit for those who want highly applied or commercial work or dislike detailed research.

Research is increasingly data intensive and shaped by automation and AI, raising the value of data and analytical skills alongside lab work. Funding shapes opportunities, especially in academia. Demand is steady but competitive, often tied to research funding.

The work is lab or office based, with generally reasonable hours that can vary with experiments. Pay is modest, typically around £24k to £32k, rising as you progress into research roles. Demand is steady but competitive and funding dependent.`,

  research_scientist: `A Research Scientist investigates scientific questions to create new knowledge, designing and running studies that push the boundaries of understanding. You lead research, from forming questions to publishing findings, in academia, government or industry. It is a role for those driven to discover and understand.

Day to day you design and run experiments, analyse and interpret results, write papers and proposals, and often lead projects and mentor junior staff. You work at the frontier of a field, and much of the job is rigorous, original investigation. The work is deeply analytical, independent and curiosity driven.

Most research scientists hold a PhD in their field, reached through a science degree and doctoral study, and build expertise through postdoctoral and research roles. Publications and specialist knowledge matter. Entry is competitive and the path long. From research scientist you progress to senior and principal scientist and towards leading research.

It suits deeply curious, analytical people with a strong drive for mastery who enjoy independent investigation and original thinking. You need rigorous scientific skill, persistence and originality. It is a poor fit for those who want quick results, commercial pace or structured, applied work.

Research is increasingly collaborative and data driven, with AI and automation transforming how discoveries are made, and funding strongly shapes careers, especially in academia. Interdisciplinary and applied research is growing. Demand is steady but competitive, tied to funding.

The work is lab or office based, with hours that can be long and flexible around projects. Pay is modest relative to the training, typically around £28k to £38k early on and rising to £45k to £65k and beyond in senior roles, higher in industry. Demand is steady but competitive across academia and industry.`,

  r_d_scientist: `An R and D Scientist works in research and development, creating and improving products, materials or technologies for industry. You apply science to real world problems, turning ideas into new or better products. It is a role that connects scientific discovery with practical, commercial innovation.

Day to day you design and run experiments, develop and test new products or processes, analyse results, and work with wider teams to bring innovations towards market. You balance scientific rigour with practical goals, and much of the job is solving problems to make something work better. The work is analytical, inventive and applied.

Most people enter with a science degree, often a master's or PhD depending on the field, through an industry graduate scheme or research role. Technical expertise and problem solving matter, and industry experience helps. Entry is competitive but industry demand is solid. From R and D scientist you progress to senior scientist, project leader and R and D management.

It suits inventive, analytical people with technical curiosity who enjoy applying science to real problems and creating new things. You need scientific and problem solving skills and some originality. It is a poor fit for those who want pure theory or dislike commercial goals.

Industrial R and D is increasingly powered by data, automation and AI, which speed up discovery and raise the value of combining science with these tools. Innovation is central to competitiveness, supporting demand. Demand is solid across sectors that innovate, from pharmaceuticals to materials.

The work is lab and office based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £40k, rising to £50k to £70k and beyond as you specialise, higher with advanced qualifications. Demand is solid across research intensive industries.`,

  analytical_chemist: `An Analytical Chemist works out what substances are made of and measures them precisely, testing materials to identify and quantify what they contain. You provide the accurate chemical analysis that industries rely on for quality, safety and research. It is a precise, technical role at the heart of many scientific and industrial processes.

Day to day you prepare and test samples, run analyses using specialist instruments, interpret and record results, and make sure testing is accurate and reliable. You follow careful procedures and quality standards, and much of the job is exact measurement and analysis. The work is precise, methodical and technical.

Most people enter with a chemistry or related degree, through a graduate scheme or laboratory role, and some come through apprenticeships and technical routes. Practical lab skills and precision matter. Entry is accessible for chemistry graduates. From analytical chemist you progress to senior and specialist analyst and laboratory management roles.

It suits precise, analytical people with a drive for mastery who enjoy detailed lab work and getting exact answers. You need care for detail, technical skill and reliability. It is a poor fit for those who want theoretical or non lab work or dislike routine precision.

Analytical chemistry is being changed by more automated and sophisticated instruments, which handle routine testing and raise the value of interpretation and method development. It remains essential across pharmaceuticals, environment, food and materials. Demand is steady across industry.

The work is lab based, with generally regular hours. Graduate and early roles typically pay around £24k to £32k, rising to £40k to £55k and beyond as you specialise. Demand is steady across pharmaceutical, environmental and industrial sectors.`,

  materials_scientist: `A Materials Scientist studies materials, from metals and plastics to advanced and novel substances, to understand them and develop better ones. You explore how materials behave and design new ones for uses from electronics to medicine to sustainability. It is a role at the frontier of what things can be made from.

Day to day you research and test materials, analyse their properties, develop and improve materials, and work with engineers and other scientists. You combine deep science with practical development, and much of the job is understanding and creating materials for real uses. The work is analytical, inventive and technical.

Most people enter with a materials science, physics, chemistry or engineering degree, often a master's or PhD for research roles, through a graduate scheme or research position. Technical expertise and problem solving matter. Entry is competitive. From materials scientist you progress to senior scientist and research and development leadership.

It suits inventive, analytical people with technical curiosity who enjoy understanding and creating materials and solving problems. You need scientific and analytical skills and originality. It is a poor fit for those who want non technical work or dislike detailed research.

Materials science is central to many innovations, from clean energy and electronics to sustainable materials, and data, simulation and AI increasingly speed up discovery. Demand is driven by the push for new and greener materials. Demand is steady and growing in advanced industries.

The work is lab and office based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £38k, rising to £45k to £65k and beyond as you specialise, higher in industry. Demand is steady across advanced manufacturing, energy and technology.`,

  biomedical_scientist: `A Biomedical Scientist carries out the laboratory tests that help diagnose and treat disease, analysing samples such as blood and tissue in healthcare labs. Your work underpins much of modern medicine, giving doctors the results they need to care for patients. It is a vital, behind the scenes role in healthcare.

Day to day you analyse patient samples, run and interpret tests, operate and maintain lab equipment, and make sure results are accurate and delivered on time. You follow strict quality and safety standards, and much of the job is precise, reliable testing that patients depend on. The work is technical, precise and purpose driven.

Most people enter with an accredited biomedical science degree and gain registration with the HCPC through supervised training in an approved laboratory, often the NHS. Placements and registration are essential. Entry is structured and competitive. From biomedical scientist you progress to senior and specialist scientist and laboratory management roles.

It suits careful, analytical people with technical curiosity who want their work to help patients and enjoy precise lab science. You need care for detail, technical skill and reliability. It is a poor fit for those who want patient facing roles or dislike lab work.

Laboratory medicine is being transformed by automation, genomics and data, which handle more routine testing and raise the value of skilled interpretation and specialist work. Demand in healthcare is steady and there are recognised staff shortages. Demand is strong, especially in the NHS.

The work is lab based, often with shift and on call work in hospitals, and pay follows NHS scales. Early roles typically pay around £28k to £35k, rising to £40k to £55k and beyond as you specialise. Demand is strong across healthcare laboratories.`,

  clinical_research_associate: `A Clinical Research Associate helps run the clinical trials that test whether new medicines and treatments are safe and effective. You monitor trials to make sure they are conducted properly, ethically and to the required standards. It is a role that helps bring new treatments to patients safely.

Day to day you monitor trial sites, check that data is accurate and rules are followed, support hospital and research staff, and help ensure trials meet strict regulations. You travel between sites and work closely with medical teams, and much of the job is safeguarding the quality and integrity of trials. The work is detailed, organised and purpose driven.

Most people enter with a life science, nursing or related degree, through a graduate scheme at a contract research organisation or pharmaceutical company, sometimes after a lab or clinical role. Attention to detail and organisation matter. Entry is competitive but demand is good. From associate you progress to senior monitoring and clinical research management roles.

It suits organised, analytical people who want to help improve healthcare and enjoy detailed, well regulated work. You need care for detail, good organisation and strong communication. It is a poor fit for those who dislike travel, paperwork or strict procedures.

Clinical research is growing with advances in medicine, and technology, remote monitoring and data are changing how trials are run. Demand for skilled research staff is strong. Demand is good across pharmaceuticals and research organisations.

The work involves travel to trial sites plus office or home working, with generally reasonable hours. Graduate and early roles typically pay around £28k to £38k, rising to £45k to £65k and beyond as you specialise. Demand is strong across the clinical research sector.`,

  clinical_scientist: `A Clinical Scientist applies science directly to patient care, working in areas like genetics, physiology or medical physics to help diagnose and treat illness. You bring scientific expertise into healthcare, often developing or running specialist tests and technologies. It is a role that combines deep science with direct benefit to patients.

Day to day you carry out and interpret specialist scientific tests, develop and improve methods, advise clinical colleagues, and often work with patients or their samples. You apply advanced science to real medical problems, and much of the job is expert analysis that guides care. The work is analytical, technical and purpose driven.

Most people enter through a structured training programme such as the NHS Scientist Training Programme, after a relevant science degree, which combines work and further study towards registration. Entry is highly competitive and structured. From clinical scientist you progress to senior and consultant scientist roles and leadership.

It suits analytical, curious people with technical curiosity who want their science to help patients and enjoy specialist, applied work. You need strong scientific skills, precision and a desire to help. It is a poor fit for those who want commercial pace or purely research based work.

Healthcare science is being transformed by genomics, data and new technologies, which expand what clinical scientists can do and raise the value of specialist expertise. Demand in healthcare is steady with recognised shortages in some specialisms. Demand is strong, especially in the NHS.

The work is lab, clinical or hospital based, with generally reasonable hours that can include on call. Pay follows NHS scales, typically around £30k to £40k during and after training and rising to £50k to £75k and beyond in senior roles. Demand is strong across healthcare science.`,

  bioinformatics_scientist: `A Bioinformatics Scientist uses computing and data science to make sense of biological data, especially the huge datasets produced by genetics and molecular biology. You write code and build tools to analyse data like DNA sequences, turning it into biological insight. It is a role at the fast growing meeting point of biology and computing.

Day to day you analyse large biological datasets, develop software and pipelines, apply statistics and machine learning, and work with biologists and clinicians to answer research or medical questions. You combine coding with biological understanding, and much of the job is extracting meaning from complex data. The work is analytical, technical and curiosity driven.

Most people enter with a degree in bioinformatics, computational biology, or a biology or computing subject plus data skills, often a master's or PhD. Strong programming and analytical skills matter. Entry is competitive but demand is strong. From bioinformatics scientist you progress to senior and lead roles in research, healthcare or biotech.

It suits analytical, inventive people with strong data curiosity who enjoy combining biology with coding and working independently. You need programming, statistics and biological understanding. It is a poor fit for those who dislike coding or want purely lab based work.

Bioinformatics is booming as genomics, personalised medicine and biological data grow explosively, and AI is increasingly central to the work, making these skills highly sought after. The field sits at the heart of modern biology and medicine. Demand is strong and rising.

The work is office or lab based, with generally reasonable hours. Graduate and early roles typically pay around £30k to £42k, rising to £55k to £80k and beyond as you specialise, higher in biotech. Demand is strong across research, healthcare and biotech.`,

  scientific_data_analyst: `A Scientific Data Analyst analyses the data produced by scientific research and testing, helping turn experiments and measurements into clear findings. You apply data skills to scientific questions, supporting research and decisions across science and healthcare. It is a role for people who enjoy both science and working with data.

Day to day you clean, analyse and visualise scientific data, apply statistics, build reports and tools, and help researchers interpret their results. You bridge science and data analysis, and much of the job is making complex scientific data understandable and useful. The work is analytical, precise and curiosity driven.

Most people enter with a science or numerate degree plus data skills, through a graduate scheme or research role, and experience with data tools matters. Some come from a science background and build analytical skills, others from data and learn the science. Entry is competitive but demand is growing. From analyst you progress to senior data roles in science, healthcare or industry.

It suits curious, analytical people with strong data curiosity who enjoy applying data skills to scientific questions and working independently. You need comfort with data and statistics, precision and scientific understanding. It is a poor fit for those who dislike data work or want purely hands on lab science.

Science is increasingly data intensive, and automation and AI raise the value of people who can analyse and interpret scientific data well. The role is growing as research and healthcare generate ever more data. Demand is growing across scientific and health sectors.

The work is office or lab based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £40k, rising to £50k to £70k and beyond as you specialise. Demand is growing across research, healthcare and industry.`,

  clinical_data_manager: `A Clinical Data Manager looks after the data gathered in clinical trials, making sure it is accurate, complete and secure so it can be trusted. You manage the information that shows whether new treatments work, a crucial part of medical research. It is a role where careful data management meets the development of new medicines.

Day to day you design and manage how trial data is collected and stored, check it for accuracy and completeness, resolve queries, and make sure it meets regulations. You work with research and IT teams, and much of the job is safeguarding the quality of trial data. The work is analytical, structured and detail driven.

Most people enter with a life science, data or numerate degree, through a graduate role at a contract research organisation or pharmaceutical company, sometimes from a research or data background. Attention to detail and comfort with data systems matter. Entry is competitive but demand is good. From data manager you progress to senior and lead data management roles.

It suits organised, analytical people who value accuracy and want to support medical research through careful data work. You need precision, comfort with data and good organisation. It is a poor fit for those who dislike detail and process or want hands on lab or patient work.

Clinical trials are increasingly data heavy and digital, with new tools and regulations shaping how data is managed, and technology and AI are changing the work. Demand for skilled data managers is strong. Demand is good across the clinical research sector.

The work is office or home based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £40k, rising to £50k to £70k and beyond as you specialise. Demand is good across pharmaceuticals and research organisations.`,

  regulatory_affairs_scientist: `A Regulatory Affairs Scientist helps get medicines, medical devices and other regulated products approved and keeps them compliant with the rules. You guide products through the strict approval processes that make sure they are safe and effective. It is a role that connects science, regulation and getting treatments to patients.

Day to day you prepare and submit regulatory documents, interpret and apply regulations, liaise with regulators, and advise development teams on what is required. You keep up with changing rules across different countries, and much of the job is making sure products meet exacting standards. The work is analytical, detailed and highly regulated.

Most people enter with a life science, pharmacy or related degree, through a graduate scheme or by moving from a research, quality or clinical role, and knowledge of regulations is built on the job. Attention to detail and clear communication matter. Entry is competitive but demand is strong. From regulatory scientist you progress to senior and management regulatory roles.

It suits organised, analytical people who value accuracy and rules and want to help bring safe treatments to patients. You need care for detail, scientific understanding and clear writing. It is a poor fit for those who dislike regulation and paperwork or want hands on lab work.

Regulation keeps growing more complex as science advances, which sustains strong demand for regulatory expertise, and digital submissions and data are changing the work. Skilled regulatory professionals are highly valued. Demand is strong across pharmaceuticals and medical devices.

The work is office or home based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £40k, rising to £50k to £80k and beyond as you specialise. Demand is strong across the life sciences sector.`,

  forensic_scientist: `A Forensic Scientist applies science to help solve crimes, analysing evidence such as DNA, fibres or substances to support investigations and the justice system. You examine what the evidence can tell us and present findings that may be used in court. It is a precise, high responsibility role where science meets justice.

Day to day you analyse physical evidence in the lab, interpret results, write reports, and sometimes give evidence in court. You follow rigorous procedures to keep evidence reliable and untainted, and much of the job is careful, exact analysis whose conclusions really matter. The work is precise, methodical and purpose driven.

Most people enter with a forensic science or related science degree, and roles are with a small number of forensic providers or police, so entry is very competitive. Relevant lab experience and specialism help. Entry is hard and the field is small. From forensic scientist you progress to senior and specialist forensic roles.

It suits precise, analytical people who value accuracy and want their science to serve justice, and who can handle sometimes difficult material. You need meticulous care, technical skill and integrity. It is a poor fit for those who want fast paced or highly social work or are squeamish about evidence.

Forensic science has become more centralised and commercial in the UK, with fewer, larger providers, and advances in DNA, digital forensics and analysis keep changing the field. Digital evidence is a growing area. Demand is limited and competitive, concentrated among a few employers.

The work is lab based with occasional court appearances, and hours are generally regular. Pay is modest, typically around £20k to £30k to start and rising to £35k to £50k and beyond with experience. Demand is limited and competitive across a small field.`,

  crime_scene_investigator: `A Crime Scene Investigator recovers and records the physical evidence found at crime scenes, providing the material that forensic analysis and investigations rely on. You examine scenes carefully, collecting and documenting evidence without contaminating it. It is a meticulous, real world role at the front line of forensic work.

Day to day you attend and examine crime scenes, photograph and record them, recover evidence such as fingerprints and samples, and maintain careful documentation. You follow strict procedures to keep evidence sound, and much of the job is thorough, careful recovery and recording. The work is precise, methodical and sometimes confronting.

Most people enter as police staff, sometimes with a forensic or science background and sometimes trained on the job, and roles are competitive. Attention to detail and composure matter. Entry is competitive and usually through police forces. From investigator you progress to senior CSI and specialist forensic roles.

It suits precise, methodical people who value accuracy and can stay composed in difficult situations. You need care for detail, reliability and resilience. It is a poor fit for those who are squeamish, want predictable office work, or dislike shift and callout work.

Forensic investigation is shaped by advances in DNA, digital evidence and analysis, and by how police and forensic services are organised and funded. Digital and technological evidence is a growing part of the work. Demand is steady but competitive within police forces.

The work is at crime scenes and in the office, often on shifts and callouts in all conditions, which can be distressing. Pay is modest, typically around £20k to £28k to start and rising to £30k to £45k and beyond with experience, on police staff scales. Demand is steady but competitive.`,

  forensic_toxicologist: `A Forensic Toxicologist analyses samples for drugs, alcohol and poisons to help investigations and legal cases, working out what substances were present and what they mean. You provide the scientific evidence about substances in the body that can be crucial in court. It is a specialist, precise role where chemistry meets justice.

Day to day you test biological samples for drugs and toxins, interpret the results, write reports, and sometimes give evidence in court. You use sensitive instruments and follow rigorous procedures, and much of the job is exact analysis and careful interpretation. The work is precise, analytical and purpose driven.

Most people enter with a chemistry, forensic science, pharmacology or toxicology degree, sometimes a postgraduate qualification, into a small number of specialist laboratories, so entry is competitive. Lab skills and specialism matter. Entry is hard and the field is small. From toxicologist you progress to senior and specialist toxicology roles.

It suits precise, analytical people who value accuracy and want their science to serve justice, and who work well independently. You need meticulous care, technical skill and integrity. It is a poor fit for those who want fast paced or highly social work or dislike detailed lab analysis.

Forensic toxicology is shaped by new substances, improving analytical techniques and how forensic services are organised, and demand is limited to specialist providers. New drugs and detection methods keep the field evolving. Demand is limited and competitive.

The work is lab based with occasional court appearances, and hours are generally regular. Pay is modest, typically around £22k to £32k to start and rising to £40k to £55k and beyond with experience. Demand is limited and competitive across specialist laboratories.`,

  // ── Psychology, Behaviour & Human Insight ───────────────────────────────
  assistant_psychologist: `An Assistant Psychologist supports qualified psychologists in helping people with their mental health, often in the NHS or similar settings. You gain hands on experience while providing valuable support to services and the people who use them. It is a key stepping stone towards becoming a qualified psychologist.

Day to day you support assessments and interventions, run activities or sessions under supervision, gather and analyse data, and help with research and administration. You work closely with psychologists and other staff, and much of the job is practical support that also builds your experience. The work is caring, analytical and developmental.

Most people enter with an accredited psychology degree, and these roles are highly competitive because so many use them to gain experience towards clinical training. Relevant experience and genuine commitment matter. Entry is hard and often follows other support roles. From assistant psychologist you progress by gaining the experience needed for doctoral training and a qualified psychology career.

It suits caring, analytical people with empathy who want to help others and are working towards a psychology career. You need good people skills, analytical ability and resilience. It is a poor fit for those seeking a final destination role or quick qualification.

Demand for mental health support is high, which sustains these roles, but competition for them remains intense because they are a gateway to clinical training. Services are stretched and evolving. Demand is strong but places are contested.

The work is clinical or community based, with generally regular hours, on NHS pay scales. Roles typically pay around £24k to £30k, with progression tied to further training. Demand is strong but highly competitive.`,

  psychological_wellbeing_practitioner: `A Psychological Wellbeing Practitioner helps people with common mental health problems like anxiety and depression, offering practical, evidence based support. You provide early, accessible help, often through the NHS Talking Therapies programme. It is a frontline role that makes a real difference to many people's lives.

Day to day you assess people's needs, deliver guided self help and low intensity therapy, support people one to one or in groups, and help them manage their difficulties. You work with a caseload and follow structured approaches, and much of the job is supporting people to feel and cope better. The work is caring, structured and rewarding.

Most people enter with a psychology or related degree and train through a funded trainee PWP post that combines work and study, leading to qualification. Relevant experience and strong people skills help. Entry is competitive but the training route is well defined. From PWP you can progress to senior practitioner, or train further towards high intensity therapy or clinical psychology.

It suits caring, empathetic people who want to help others and are comfortable with structured, evidence based support. You need warmth, good communication and resilience. It is a poor fit for those who want highly independent or non clinical work.

Demand is strong as mental health services expand and awareness grows, and PWP roles have multiplied with the Talking Therapies programme. Services increasingly use digital tools alongside human support. Demand is strong and the role is well established.

The work is clinical or community based, sometimes with remote sessions, on NHS pay scales. Trainee and qualified roles typically pay around £28k to £34k, with progression through further training. Demand is strong across mental health services.`,

  clinical_psychologist: `A Clinical Psychologist helps people with a wide range of mental health and psychological difficulties, from anxiety and depression to serious and complex conditions. You assess, understand and treat psychological problems, often for those who need more specialist help. It is a highly skilled, deeply rewarding profession at the heart of mental health care.

Day to day you carry out psychological assessments, plan and deliver therapy, work with other health professionals, and often contribute to research and service development. You draw on a deep understanding of the mind to help people change and heal, and much of the job is skilled, one to one clinical work. The work is analytical, caring and demanding.

Becoming a clinical psychologist requires an accredited psychology degree, substantial relevant experience, and then a competitive doctorate in clinical psychology, which is funded and takes three years. The path is long and entry to the doctorate is very competitive. Once qualified you register and progress to senior, consultant and leadership roles.

It suits caring, analytical people with empathy and resilience who want to help people through serious difficulties and enjoy deep clinical work. You need strong analytical and people skills, emotional resilience and commitment. It is a poor fit for those who want a quick route in or dislike emotionally demanding work.

Demand for mental health care is high and growing, so qualified clinical psychologists are in strong demand, though training places are limited and fiercely contested. Services are stretched and evolving with new approaches and technology. Demand for qualified psychologists is strong.

The work is clinical based, with generally regular hours, on NHS pay scales. Qualified roles typically pay around £40k to £55k, rising higher for consultant and lead roles. Demand is strong, though the training route is highly competitive.`,

  counselling_psychologist: `A Counselling Psychologist helps people work through emotional and psychological difficulties, combining psychological science with a focus on the therapeutic relationship. You support people to understand themselves and cope with life's challenges. It is a caring, skilled profession centred on helping people through talking and understanding.

Day to day you provide therapy and psychological support, assess people's needs, work with individuals and sometimes groups, and often contribute to research. You build strong, trusting relationships, and much of the job is skilled therapeutic work grounded in psychology. The work is caring, reflective and demanding.

Becoming a counselling psychologist requires an accredited psychology degree, relevant experience, and a professional doctorate in counselling psychology, which is often partly self funded and takes several years. The path is long and demanding. Once qualified you register and progress to senior and specialist roles, in the NHS, private practice or beyond.

It suits caring, empathetic people who want to help others through difficulty and enjoy deep, relationship based work. You need warmth, self awareness, analytical skill and resilience. It is a poor fit for those who want a quick route in or dislike emotionally intense work.

Demand for therapy and mental health support is strong and growing, supporting the profession, though training is long and can be costly. Services and approaches keep evolving. Demand for qualified practitioners is good across the NHS and private practice.

The work is clinical or practice based, with hours that vary between employed and private work. Qualified roles typically pay around £40k to £55k in the NHS, with private practice varying. Demand is good, though training is long and demanding.`,

  counsellor: `A Counsellor helps people talk through and cope with emotional difficulties, life challenges and distress, offering a safe, supportive space to be heard. You listen, build trust, and help people understand themselves and find their own way forward. It is a caring role centred on human connection and support.

Day to day you meet clients for counselling sessions, listen and respond with empathy, help people explore their feelings and options, and keep careful, confidential records. You build trusting relationships, and much of the job is skilled, compassionate listening and support. The work is caring, reflective and often emotionally demanding.

Most people enter by training through a recognised counselling qualification, often a diploma, and working towards accreditation with a body such as the BACP, frequently while gaining supervised experience. Training is often self funded and part time, and many counsellors work in a mix of settings. Entry is by qualification and experience rather than a single route. From counsellor you can specialise, work privately, or move towards psychotherapy.

It suits caring, empathetic people who want to help others and are comfortable sitting with difficult emotions. You need warmth, strong listening skills, self awareness and resilience. It is a poor fit for those who want fast paced or highly analytical work or find emotional intensity draining.

Demand for counselling is strong as awareness of mental health grows, though many roles are part time, voluntary early on, or self employed, so building a career takes persistence. Digital and remote counselling are growing. Demand is strong but the path to paid work can be gradual.

The work is in practice, community or online settings, often part time or self employed, with flexible hours. Pay varies widely, typically around £24k to £35k employed and variable in private practice. Demand is strong, though building paid work takes time.`,

  psychotherapist: `A Psychotherapist helps people with deeper or longer standing emotional and psychological difficulties through in depth talking therapy. You work with people over time to understand and change patterns that cause distress. It is a skilled, in depth caring role focused on lasting psychological change.

Day to day you provide therapy sessions, build long term therapeutic relationships, help people explore and work through their difficulties, and keep confidential records. You draw on a particular therapeutic approach, and much of the job is patient, skilled work over weeks or months. The work is caring, reflective and emotionally demanding.

Most people enter through substantial postgraduate psychotherapy training, often after a related background and their own therapy, and work towards accreditation with a professional body. The training is long, in depth and often self funded. Entry is by qualification and experience. From psychotherapist you can specialise, work privately, supervise or train others.

It suits caring, self aware people with empathy who want to help others deeply and are comfortable with intense, long term work. You need warmth, resilience, patience and psychological insight. It is a poor fit for those who want quick results or dislike emotionally demanding work.

Demand for therapy is strong as mental health awareness grows, though much work is self employed and building a practice takes time. Approaches continue to develop and remote therapy is common. Demand is strong, especially for experienced, accredited therapists.

The work is in practice, clinical or online settings, often self employed, with flexible hours. Pay varies widely, typically around £30k to £45k employed and variable in private practice, higher for established practitioners. Demand is strong, though building a practice takes time.`,

  cbt_therapist: `A CBT Therapist uses cognitive behavioural therapy, a structured, evidence based approach, to help people overcome problems like anxiety, depression and phobias by changing unhelpful thoughts and behaviours. You deliver a practical, goal focused form of therapy with a strong evidence base. It is a skilled, structured role widely used in mental health care.

Day to day you assess people's difficulties, deliver structured CBT sessions, set and review practical goals and tasks, and track progress. You work with a caseload, often in the NHS, and much of the job is applying proven techniques to help people change. The work is caring, structured and analytical.

Most people enter through a psychology or related background and specialist postgraduate CBT training, often via the NHS Talking Therapies high intensity route that combines work and study. Relevant experience helps. Entry is competitive but the training route is well defined. From CBT therapist you progress to senior therapist, supervisor or specialist roles.

It suits caring, analytical people who like structure and evidence and want to help others change. You need good people skills, discipline and resilience. It is a poor fit for those who prefer open ended, exploratory therapy or dislike structured approaches.

Demand is strong as CBT is a mainstay of mental health services and the Talking Therapies programme keeps expanding. Digital and remote CBT are growing. Demand is strong and the role is well established.

The work is clinical or community based, sometimes remote, on NHS pay scales. Qualified roles typically pay around £35k to £48k, with progression to senior roles. Demand is strong across mental health services.`,

  learning_mentor: `A Learning Mentor supports young people, often in schools, to overcome barriers to learning and get the most from their education. You help pupils who are struggling, whether with confidence, behaviour, attendance or personal difficulties, to succeed. It is a caring, people focused role that can change young lives.

Day to day you work one to one and in small groups with pupils, offer guidance and encouragement, help remove barriers to learning, and work with teachers, families and other staff. You build supportive relationships, and much of the job is helping young people believe in themselves and engage with school. The work is caring, practical and relationship based.

Most people enter through relevant experience with young people rather than a specific degree, and roles are often in schools or community settings. Skills, patience and a genuine desire to help matter most. Entry is accessible for the right people. From learning mentor you can progress into pastoral leadership, teaching support or related roles.

It suits caring, confident people who want to help young people and enjoy building supportive relationships. You need warmth, patience, resilience and good communication. It is a poor fit for those who want academic or highly analytical work or find challenging behaviour draining.

Demand is shaped by school budgets and the growing needs of young people, especially around wellbeing and engagement, though funding can be tight. Support for struggling pupils is increasingly recognised as important. Demand is steady but budget dependent.

The work is school or community based, with hours often tied to the school day and term. Pay is modest, typically around £20k to £28k, varying by setting. Demand is steady but dependent on school funding.`,

  people_analyst: `A People Analyst uses data to help organisations understand and improve their workforce, from hiring and performance to wellbeing and retention. You turn information about employees into insight that guides better decisions about people. It is a growing role where data meets human resources.

Day to day you analyse workforce data, spot patterns and trends, build reports and dashboards, and advise HR and leaders on people related decisions. You combine data skills with an understanding of workplaces, and much of the job is making people decisions more evidence based. The work is analytical, practical and people focused.

Most people enter with a degree in psychology, HR, business or a numerate subject, through an HR, analytics or graduate role, and comfort with data matters. Real experience with people data helps. Entry is competitive but the field is growing. From analyst you progress to senior people analytics and leadership roles.

It suits analytical, curious people who are interested in people and organisations as well as data. You need comfort with data, analytical skill and an interest in workplaces. It is a poor fit for those who dislike data or have little interest in how organisations work.

People analytics is growing as organisations use data more to manage and support their workforce, and AI increasingly helps analyse people data, raising both opportunity and questions about ethics and privacy. Demand is rising as HR becomes more data driven. Demand is growing across larger organisations.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £35k to £50k, rising to £60k to £80k and beyond as you specialise. Demand is growing as organisations invest in people data.`,

  behavioural_insight_analyst: `A Behavioural Insight Analyst uses the science of how people actually think and behave to help organisations design better policies, services and products. You apply behavioural science to real problems, finding practical ways to encourage helpful behaviour. It is a role where psychology meets policy and design.

Day to day you research behaviour, design and run experiments and trials, analyse results, and recommend changes based on what really influences people. You combine psychology with data and testing, and much of the job is turning behavioural science into practical improvements. The work is analytical, inventive and evidence based.

Most people enter with a degree in psychology, behavioural science, economics or a related field, through a graduate role at a consultancy, government body or research team, and knowledge of behavioural science matters. Real experience and analytical skills help. Entry is competitive but the field is growing. From analyst you progress to senior behavioural insight and specialist roles.

It suits curious, analytical people with originality who are fascinated by human behaviour and enjoy testing ideas. You need analytical skill, an interest in behaviour and a rigorous, experimental mindset. It is a poor fit for those who dislike data and testing or prefer purely creative work.

Behavioural science has become influential in government, business and beyond, sustaining demand, and data and testing tools keep expanding what is possible. The field is well established but still growing. Demand is steady across policy, consultancy and business.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £30k to £45k, rising to £55k to £75k and beyond as you specialise. Demand is steady across government, consulting and industry.`,

  probation_officer: `A Probation Officer supervises and supports people who have committed offences, helping them change their behaviour and reintegrate into society while protecting the public. You work with offenders in the community or leaving prison to reduce the risk of reoffending. It is a demanding, purposeful role at the heart of justice and rehabilitation.

Day to day you assess offenders' risks and needs, supervise them, help them access support like housing or treatment, write reports for courts, and enforce the conditions of their sentences. You balance support with public protection, and much of the job is helping people turn their lives around. The work is caring, structured and often challenging.

Most people enter through a recognised professional probation qualification, such as a work based training programme that combines study with practice, sometimes after a related degree or experience. Resilience and people skills matter. Entry is structured and competitive. From probation officer you progress to senior and specialist probation roles.

It suits caring, purposeful people with resilience who want to help others change and can handle challenging situations. You need strong people skills, sound judgement and emotional resilience. It is a poor fit for those who want low pressure work or find difficult behaviour and risk hard to manage.

Demand is shaped by justice policy and funding, and the probation service has been through significant reorganisation, with ongoing needs for skilled officers. Reducing reoffending is a continuing priority. Demand is steady, driven by the needs of the justice system.

The work is community and office based, sometimes in prisons, with generally regular hours that can include challenging situations. Pay typically starts around £28k to £35k, rising to £40k and beyond with experience and seniority. Demand is steady across the probation service.`,

  occupational_psychologist: `An Occupational Psychologist applies psychology to the workplace, helping organisations and their people work better, more happily and more effectively. You use the science of behaviour to improve things like performance, wellbeing, leadership and how teams work. It is a role that brings psychology into working life.

Day to day you assess and advise on workplace issues, design and run programmes on things like selection, development or wellbeing, analyse data, and coach or train people. You apply psychological science to real organisational problems, and much of the job is helping workplaces and people thrive. The work is analytical, people focused and varied.

Most people enter with an accredited psychology degree, a master's in occupational psychology, and supervised experience towards chartered status with the BPS. The path is structured and specialist. Entry is competitive. From occupational psychologist you progress to senior consultant and specialist roles, in consultancy, business or independently.

It suits analytical, caring people who are interested in both people and organisations and enjoy applying psychology practically. You need analytical and people skills and an interest in work and behaviour. It is a poor fit for those who want clinical work or dislike organisational settings.

Interest in workplace wellbeing, effective leadership and getting the best from people has grown, supporting demand, and data increasingly informs the work. The field is well established and expanding into new areas. Demand is steady across consultancy and business.

The work is office based or hybrid with client contact, and hours are generally reasonable. Qualified roles typically pay around £35k to £50k, rising to £60k to £80k and beyond as you specialise. Demand is steady across business and consultancy.`,

  talent_assessment_consultant: `A Talent Assessment Consultant helps organisations choose and develop the right people using fair, evidence based methods, from psychological tests to structured interviews and exercises. You design and run the assessments that help employers make better people decisions. It is a role grounded in psychology and applied to hiring and development.

Day to day you design assessment processes, run and interpret psychological tests and exercises, advise employers on selection and development, and analyse how well assessments work. You apply psychological science to real decisions about people, and much of the job is making those decisions fairer and more effective. The work is analytical, people focused and practical.

Most people enter with a psychology or related degree, often a master's in occupational psychology, through a graduate role at an assessment or consultancy firm. Knowledge of assessment and data matters. Entry is competitive but demand is good. From consultant you progress to senior and specialist assessment and organisational roles.

It suits analytical, people oriented people who enjoy combining psychology with practical decisions and like variety. You need analytical and people skills and an interest in assessment. It is a poor fit for those who want clinical work or dislike structured, evidence based methods.

Assessment is increasingly shaped by data, technology and AI, which change how people are evaluated and raise important questions about fairness. Organisations value robust, fair selection, supporting demand. Demand is steady across consultancy and business.

The work is office based or hybrid with client contact, and hours are generally reasonable. Graduate and early roles typically pay around £30k to £45k, rising to £55k to £75k and beyond as you specialise. Demand is steady across assessment and consultancy firms.`,

  people_scientist: `A People Scientist combines psychology, data and research to help organisations understand and improve the experience of their employees. You bring scientific rigour to questions about work, culture and how people feel and perform, often in technology companies. It is a modern, data rich role at the meeting point of psychology and analytics.

Day to day you design and run research and surveys, analyse workforce and behavioural data, and turn findings into recommendations that improve the workplace. You combine the science of behaviour with strong data skills, and much of the job is producing credible insight about people at work. The work is analytical, research based and people focused.

Most people enter with a degree in psychology, social science or a numerate subject, often a master's or PhD, and strong research and data skills, sometimes moving from academia or people analytics. Real analytical experience matters. Entry is competitive but the field is growing. From people scientist you progress to senior and lead roles in people research and analytics.

It suits analytical, curious people with strong data skills who are fascinated by people and work and enjoy rigorous research. You need research and analytical ability and an interest in organisations. It is a poor fit for those who dislike data or want purely clinical or hands on work.

People science has grown, especially in technology firms, as organisations use rigorous research and data to shape the employee experience, and AI increasingly supports the work. Interest in workplace culture and wellbeing keeps demand rising. Demand is growing, concentrated in larger and technology companies.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £40k to £55k, rising to £65k to £90k and beyond as you specialise, with more at large technology firms. Demand is growing as organisations invest in people research.`,

  // ── Education, Coaching & People Development ─────────────────────────────
  primary_school_teacher: `A Primary School Teacher educates and nurtures young children, usually aged four to eleven, laying the foundations for their learning and development. You teach across many subjects and help children grow in confidence, skills and understanding. It is a hugely important and rewarding role that shapes children's futures.

Day to day you plan and deliver lessons across the curriculum, manage a class, assess children's progress, and support their social and emotional development. You work with parents and colleagues, and much of the job is inspiring and guiding a class of young children each day. The work is caring, creative and demanding.

Most people become teachers by gaining qualified teacher status, usually through a teaching degree or a postgraduate course such as a PGCE, or a school based or apprenticeship route, often with bursaries available. Experience with children helps. Entry is well defined and supported. From teacher you progress to senior teacher, subject or phase leader, and towards school leadership.

It suits caring, energetic people with empathy and a sense of purpose who love working with children and enjoy variety and creativity. You need warmth, patience, resilience and strong communication. It is a poor fit for those who want quiet, predictable work or find managing children draining.

Teaching faces recruitment and retention challenges, with concerns about workload, so there is steady demand for good teachers, and technology and AI are starting to change classrooms. Support for teachers is a continuing focus. Demand is steady and often strong in shortage areas.

The work is school based, with teaching hours plus significant planning and marking, and follows the school terms. Pay in England starts around £31k to £33k and rises to the mid forties and beyond, higher in London and for leadership. Demand is steady, with a persistent need for teachers.`,

  early_years_teacher: `An Early Years Teacher supports the learning and development of very young children, from babies to age five, during the most formative years of life. You help children develop through play, care and early learning, giving them the best possible start. It is a caring, foundational role in a child's education.

Day to day you plan and lead play based learning, care for children's needs, observe and support their development, and work closely with parents and colleagues. You create a safe, stimulating environment, and much of the job is nurturing young children's early growth. The work is caring, creative and hands on.

Most people enter through an early years degree or early years teacher status, or related qualifications, and experience with young children matters. Routes include university and work based training. Entry is accessible for those committed to young children. From early years teacher you progress to lead practitioner, nursery management and related roles.

It suits caring, patient people with empathy and a sense of belonging who love young children and enjoy nurturing their development. You need warmth, patience, creativity and energy. It is a poor fit for those who want academic teaching or find caring for very young children tiring.

Early years is recognised as vital for children's development, which supports demand, though pay and funding in the sector can be challenging. Awareness of the importance of early education is growing. Demand is steady, especially for qualified staff.

The work is nursery or school based, often with full days, and can be physically demanding. Pay is modest, typically around £25k to £32k, varying by setting and qualification. Demand is steady across early years settings.`,

  family_support_worker: `A Family Support Worker helps families facing difficulties to cope and thrive, offering practical and emotional support in the home and community. You work alongside parents and children to build skills, confidence and stability. It is a caring, hands on role that supports families through challenging times.

Day to day you visit and support families, offer guidance on parenting, routines and daily life, help them access services, and work with schools, social workers and other professionals. You build trusting relationships, and much of the job is practical, compassionate help that strengthens family life. The work is caring, practical and often challenging.

Most people enter through relevant experience in childcare, social care or support work, and qualifications in these areas help, though a degree is often not required. Genuine care and people skills matter most. Entry is accessible for the right people. From family support worker you progress into senior support, social work training or related roles.

It suits caring, purposeful people with empathy who want to help families and can handle difficult situations. You need warmth, resilience, patience and good communication. It is a poor fit for those who want office based or highly analytical work or find emotional situations draining.

Demand is shaped by the needs of families and by funding for early help and support services, which can be stretched, but the value of supporting families early is well recognised. Needs remain high. Demand is steady but dependent on funding.

The work is in homes and the community, with hours that can vary and include some evenings. Pay is modest, typically around £22k to £30k, varying by setting. Demand is steady but dependent on funding.`,

  sen_teacher: `A SEN Teacher, working in special educational needs, teaches and supports children and young people with additional needs, from learning difficulties to disabilities. You adapt teaching to help every pupil learn and thrive in a way that suits them. It is a deeply rewarding, specialist role that changes lives.

Day to day you plan and deliver adapted lessons, support pupils with a wide range of needs, work closely with families and other professionals, and help each pupil make progress in their own way. You show great patience and creativity, and much of the job is unlocking learning for pupils who need extra support. The work is caring, adaptable and demanding.

Most people become SEN teachers by gaining qualified teacher status and then developing SEN expertise and experience, sometimes with additional specialist qualifications. Experience with additional needs matters. Entry is through the teaching route plus specialism. From SEN teacher you progress to SEN coordination, specialist leadership and related roles.

It suits caring, patient people with empathy, resilience and a strong sense of purpose who want to support pupils with additional needs. You need warmth, adaptability, creativity and resilience. It is a poor fit for those who want a fast paced or purely academic role or find challenging needs draining.

Demand for SEN teaching is rising sharply as more pupils are identified with additional needs, creating strong need for skilled staff, though services and funding are under pressure. Support for inclusion is a continuing priority. Demand is strong and growing.

The work is school based, often in special or mainstream settings, following the school terms, and can be demanding. Pay follows teacher scales, often with additional SEN allowances, typically from around £31k upwards. Demand is strong, with rising need for SEN expertise.`,

  learning_support_assistant: `A Learning Support Assistant helps pupils who need extra support to access their education and make progress, working alongside teachers in the classroom. You give individual or small group help to pupils, often those with additional needs. It is a caring, hands on role that helps every child take part and learn.

Day to day you support pupils in lessons, help them understand and complete their work, assist with their needs, and work closely with teachers and families. You give patient, encouraging help, and much of the job is enabling pupils to engage and succeed. The work is caring, practical and relationship based.

This is an accessible way into education. Many people enter without a degree, through experience with children or an apprenticeship, and relevant qualifications help. Genuine care and patience matter most. Entry is accessible for the right people. From learning support assistant you can progress into higher level teaching assistant, SEN support or teacher training.

It suits caring, patient people with empathy and a sense of belonging who enjoy helping children and want to make a difference. You need warmth, patience and adaptability. It is a poor fit for those who want highly paid or academic roles or find supporting children with additional needs tiring.

Demand is shaped by school budgets and by the rising number of pupils needing support, especially those with additional needs, though funding can be tight. The role is increasingly important for inclusion. Demand is steady but dependent on school funding.

The work is school based, with hours tied to the school day and terms, and is often part time. Pay is modest, typically around £18k to £24k, varying by setting and hours. Demand is steady but dependent on school funding.`,

  learning_designer: `A Learning Designer creates effective, engaging learning experiences, from online courses to training programmes, designing how people learn rather than just what they learn. You use an understanding of how people take in information to build learning that works. It is a creative, thoughtful role at the meeting point of education and design.

Day to day you design courses and learning materials, structure content for clarity and engagement, work with subject experts and technology, and test and improve how well learning works. You combine creativity with an understanding of learning, and much of the job is making complex things easy and engaging to learn. The work is creative, analytical and varied.

Most people enter from a background in education, design, or a related field, and build a portfolio of learning design work, sometimes through courses in instructional design. Skills in design and learning tools matter. Entry is competitive but the field is growing. From learning designer you progress to senior and lead design roles or learning leadership.

It suits creative, analytical people with originality who care about how people learn and enjoy designing experiences. You need creativity, an understanding of learning and comfort with technology. It is a poor fit for those who want classroom teaching or dislike design and detail.

Learning design is growing fast as organisations and educators move learning online, and AI and new tools are transforming how learning is created, raising the value of good design judgement. Digital learning keeps expanding. Demand is growing across education and business.

The work is office based or remote, with generally reasonable hours. Graduate and early roles typically pay around £30k to £45k, rising to £50k to £65k and beyond as you specialise. Demand is growing as learning moves online.`,

  edtech_specialist: `An EdTech Specialist helps bring technology into education, supporting how digital tools are used to improve teaching and learning. You help schools, colleges or companies choose, implement and get the best from educational technology. It is a forward looking role at the meeting point of education and technology.

Day to day you advise on and support educational technology, train staff to use it, help solve problems, and evaluate how well tools support learning. You bridge education and technology, and much of the job is helping people teach and learn better with digital tools. The work is technical, practical and people focused.

Most people enter from a background in teaching, technology, or a related field, and build knowledge of educational technology, sometimes through relevant roles or qualifications. A mix of tech and education understanding matters. Entry is accessible for those with the right blend. From specialist you progress into edtech leadership, product or consultancy roles.

It suits inventive people with technical curiosity and an entrepreneurial streak who care about education and enjoy working with technology and people. You need technical understanding, adaptability and communication. It is a poor fit for those who dislike technology or want traditional classroom teaching.

Educational technology is growing quickly, accelerated by online learning and now by AI, which is reshaping how education is delivered, so the field is dynamic and expanding. Schools and businesses invest more in learning technology. Demand is growing across education and edtech companies.

The work is office, school or remote based, with generally reasonable hours. Graduate and early roles typically pay around £30k to £45k, rising to £55k to £75k and beyond as you specialise, higher in edtech firms. Demand is growing as education digitises.`,

  training_and_development_officer: `A Training and Development Officer helps people in an organisation build the skills they need to do their jobs well and grow their careers. You plan and deliver training and development that improves how people and organisations perform. It is a people focused role centred on helping others learn and grow.

Day to day you identify training needs, design and deliver training sessions, organise development programmes, and evaluate how well they work. You work across an organisation, and much of the job is helping people build skills and confidence. The work is people focused, creative and practical.

Most people enter from a background in HR, teaching, or a related field, and qualifications such as those from the CIPD help, though a specific degree is not always required. People and communication skills matter. Entry is accessible for the right people. From officer you progress to training manager and learning and development leadership.

It suits caring, confident people with a sense of purpose who enjoy helping others develop and like a mix of design and delivery. You need good communication, creativity and organisation. It is a poor fit for those who dislike presenting or want highly technical or solitary work.

Demand is supported by organisations investing in their people, and digital learning and AI are changing how training is delivered, raising the value of good design and facilitation. Skills development is increasingly important. Demand is steady across sectors.

The work is office based or hybrid with some delivery, and hours are generally reasonable. Graduate and early roles typically pay around £26k to £38k, rising to £45k to £60k and beyond as you specialise. Demand is steady across organisations that invest in their people.`,

  learning_and_development_coordinator: `A Learning and Development Coordinator organises and supports the training and development activities that help people in an organisation grow. You keep learning programmes running smoothly, handling the practical coordination behind them. It is a supportive, organised role in people development.

Day to day you arrange training sessions and programmes, manage bookings and records, support trainers and learners, and help track and report on learning. You keep the many practical details in order, and much of the job is making sure development activities run well. The work is organised, collaborative and people focused.

Most people enter from an administrative, HR or support background, and a specific degree is often not required, with relevant qualifications helping. Organisation and people skills matter. Entry is accessible for the right people. From coordinator you progress into training and development officer and wider learning roles.

It suits caring, organised people with a sense of belonging who enjoy supporting others' development and like keeping things running smoothly. You need organisation, reliability and good communication. It is a poor fit for those who want highly analytical or creative lead roles or dislike administration.

Demand is supported by organisations investing in learning, and digital tools increasingly handle the administration, shifting the role towards coordination and support. Skills development stays important. Demand is steady across organisations with learning functions.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £25k to £35k, rising to £40k to £55k and beyond as you progress. Demand is steady across organisations that invest in development.`,

  student_services_officer: `A Student Services Officer supports students at a college or university, helping them with the practical and personal side of student life so they can succeed. You provide advice, guidance and support on a wide range of issues, from wellbeing to finance to study. It is a caring, helpful role at the heart of student support.

Day to day you advise and support students, help them access services and resources, handle queries, and work with academic and support teams. You are often a first point of contact for students who need help, and much of the job is guiding and supporting them through their studies. The work is caring, practical and people focused.

Most people enter from an administrative, education or support background, and a specific degree is often not required, with relevant experience helping. Care and people skills matter. Entry is accessible for the right people. From officer you progress into senior student support and services roles.

It suits caring, approachable people with empathy and a sense of belonging who enjoy helping others and solving practical problems. You need warmth, good communication and organisation. It is a poor fit for those who want academic or highly analytical work or dislike frontline support.

Demand is shaped by student numbers and by growing attention to student wellbeing and support, though it depends on institutional funding. Support for students is increasingly valued. Demand is steady across colleges and universities.

The work is campus based, with generally regular hours busier at key times of year. Pay is modest, typically around £22k to £30k, rising to £35k to £45k and beyond in senior roles. Demand is steady across further and higher education.`,

  secondary_school_teacher: `A Secondary School Teacher teaches a specialist subject to pupils aged roughly eleven to eighteen, helping them gain knowledge, skills and qualifications. You share your expertise and inspire young people in your subject while supporting their wider development. It is an important, rewarding role that shapes young people's futures.

Day to day you plan and deliver lessons in your subject, manage classes, assess and support pupils' progress, and contribute to the wider life of the school. You combine subject expertise with the skill of engaging teenagers, and much of the job is inspiring and guiding pupils through their studies. The work is intellectual, caring and demanding.

Most people become teachers by gaining qualified teacher status, usually through a postgraduate course such as a PGCE, or a school based or apprenticeship route, often with bursaries in shortage subjects. Subject knowledge and a desire to teach matter. Entry is well defined and supported. From teacher you progress to subject leader, head of department, and towards school leadership.

It suits knowledgeable, caring people with a sense of purpose who love their subject and enjoy working with young people. You need subject expertise, communication skills, resilience and patience. It is a poor fit for those who dislike managing teenagers or want quiet, predictable work.

Teaching faces recruitment and retention challenges, especially in subjects like maths and science, so demand for good teachers is steady to strong, and technology and AI are starting to change classrooms. Support for teachers is a continuing focus. Demand is steady, often strong in shortage subjects.

The work is school based, with teaching plus significant planning and marking, following the school terms. Pay in England starts around £31k to £33k and rises to the mid forties and beyond, higher in London and for leadership. Demand is steady, with strong need in shortage subjects.`,

  postdoctoral_researcher: `A Postdoctoral Researcher carries out advanced research after completing a PhD, deepening their expertise and building an academic or research career. You lead and contribute to research projects, producing new knowledge and publications. It is a demanding, intellectual stage on the path towards senior research or academia.

Day to day you design and conduct research, analyse results, write papers and grant applications, and often supervise students and collaborate with others. You work at the frontier of your field, and much of the job is rigorous, original investigation and publishing. The work is deeply analytical, independent and curiosity driven.

You enter this role after completing a PhD in your field, and postdoctoral posts are the usual next step for those pursuing research careers. Strong publications and expertise matter. Entry is competitive and posts are often fixed term. From postdoc you progress towards lecturer, fellowship or senior research roles, or move into industry research.

It suits deeply curious, analytical people with a strong drive for mastery who love research and independent thinking. You need rigorous research skills, originality and persistence. It is a poor fit for those who want stability, commercial pace or applied, structured work.

Academic research is highly competitive, with many postdocs and fewer permanent positions, and funding strongly shapes careers, so the path can be uncertain. Research is increasingly collaborative and data driven. Demand exists but permanent academic roles are scarce.

The work is university or institute based, with flexible but often long hours around projects and deadlines. Pay is modest relative to the qualification, typically around £36k to £45k, on academic scales. Demand exists but competition for permanent roles is intense.`,

  university_lecturer: `A University Lecturer teaches students and carries out research at a university, combining educating the next generation with advancing knowledge in their field. You share your expertise through teaching while contributing original research. It is a role for those who love both their subject and helping others learn it.

Day to day you prepare and deliver lectures and seminars, supervise and assess students, conduct research, publish papers, and take on academic administration. You balance teaching, research and other duties, and much of the job is being an expert who both discovers and shares knowledge. The work is intellectual, varied and demanding.

Most people become lecturers after a PhD and usually postdoctoral or research experience, building a record of publications and teaching. Academic posts are highly competitive. Entry is difficult and follows a long research path. From lecturer you progress to senior lecturer, reader and professor, or into academic leadership.

It suits knowledgeable, curious people with a drive for mastery and purpose who love their subject and enjoy both research and teaching. You need deep expertise, communication skills and self motivation. It is a poor fit for those who want a quick route in, high early pay or purely applied work.

Academia is competitive, with pressure on funding and many candidates for permanent posts, and universities face financial and workload challenges. Teaching and research are being changed by technology and AI. Demand exists but permanent academic positions are limited and hard won.

The work is university based, with flexible but often long hours spanning teaching terms and research. Pay typically starts around £40k to £55k, rising higher for senior academics and professors. Demand exists but competition for posts is strong.`,

  // ── Law, Governance & Public Impact ─────────────────────────────────────
  paralegal: `A Paralegal carries out legal work to support solicitors and lawyers, handling many of the practical tasks involved in legal cases and transactions. You do real legal work without being a qualified solicitor, and increasingly it is a career in its own right as well as a route into law. It is a detailed, professional role at the heart of legal practice.

Day to day you research law, prepare legal documents, manage case files, communicate with clients, and support cases and transactions. You handle a lot of detail and paperwork, and much of the job is accurate, reliable legal support. The work is analytical, precise and structured.

Most people enter with a law degree, a paralegal qualification, or relevant experience, and a full solicitor qualification is not required, making it more accessible than qualifying as a lawyer. Some use it as a stepping stone towards becoming a solicitor. Entry is competitive but reachable. From paralegal you progress to senior paralegal, or towards qualifying as a solicitor.

It suits analytical, organised people who value reliability and enjoy detailed legal work. You need care for detail, strong organisation and comfort with legal material. It is a poor fit for those who want courtroom advocacy or dislike paperwork and detail.

Legal technology and AI are automating much routine legal work such as document review, which is reshaping paralegal roles towards higher value tasks. At the same time paralegals are increasingly valued as a cost effective part of legal teams. Demand is steady, with the nature of the work shifting.

The work is office based or hybrid, with generally reasonable hours. Entry and early roles typically pay around £22k to £30k, rising to £35k to £45k and beyond as you specialise. Demand is steady across legal practices and in house teams.`,

  compliance_officer: `A Compliance Officer makes sure an organisation follows the laws, rules and standards that apply to it, helping it operate properly and avoid trouble. You monitor conduct, advise on the rules, and help fix problems, protecting both the organisation and its customers. It is a role built on integrity and increasingly important across many sectors.

Day to day you monitor activities for compliance, review policies and processes, advise colleagues on the rules, investigate concerns, and help train staff. You keep up with changing regulation, and much of the job is making sure the organisation does the right thing. The work is analytical, detailed and principled.

Compliance is a relatively open career to enter. Many join through a graduate scheme, but just as many move across from operations, legal, audit or customer roles, and a specific degree is rarely essential. Professional qualifications are usually gained on the job. Entry is accessible from several directions. From officer you progress to compliance manager and senior compliance and governance leadership.

It suits principled, organised people who value security and reliability and like getting things right. You need sound judgement, attention to detail and the confidence to raise issues. It is a poor fit for those who dislike rules and detail or want a purely commercial role.

Regulation keeps expanding across sectors, sustaining strong demand for compliance staff, while regtech and AI automate routine monitoring and shift the role towards judgement and interpretation. Compliance is increasingly valued and well established. Demand is strong and resilient.

The work is office based or hybrid, with generally steady hours. Graduate and early roles typically pay around £28k to £40k, rising to £50k to £75k and beyond as you specialise. Demand is strong across regulated industries.`,

  governance_officer: `A Governance Officer helps an organisation be run properly, supporting the boards and committees that make its most important decisions. You make sure the organisation follows good governance, meets its legal duties, and keeps clear records of decisions. It is a role at the heart of how organisations are steered and held accountable.

Day to day you support board and committee meetings, prepare papers and record decisions, advise on governance rules and duties, and help ensure the organisation is well run. You keep careful records and processes, and much of the job is enabling sound, accountable decision making. The work is organised, detailed and trusted.

Most people enter from an administrative, legal or company secretarial background, and professional qualifications from bodies such as the Chartered Governance Institute help. A specific degree is not always required. Entry is accessible for organised, capable people. From officer you progress to company secretary and senior governance roles.

It suits organised, reliable people who value security and take care over process and accuracy. You need strong organisation, attention to detail and discretion. It is a poor fit for those who want fast paced commercial work or dislike detail and procedure.

Governance is increasingly important as expectations around accountability, ethics and environmental and social responsibility grow, which supports demand. Technology helps manage governance processes. Demand is steady and rising with the focus on good governance.

The work is office based or hybrid, with generally reasonable hours busier around meetings. Graduate and early roles typically pay around £28k to £38k, rising to £45k to £65k and beyond as you qualify and progress. Demand is steady across organisations of all kinds.`,

  public_affairs_officer: `A Public Affairs Officer helps an organisation build relationships with government and influence policy and public debate in its area. You represent an organisation's interests to decision makers and help shape the political and public environment it operates in. It is a role for people fascinated by politics, policy and persuasion.

Day to day you monitor political and policy developments, build relationships with policymakers, prepare briefings and position papers, and help develop and deliver influencing strategies. You combine political understanding with communication, and much of the job is representing interests and shaping debate. The work is strategic, sociable and purpose driven.

Most people enter with a degree in politics, public policy or a related field, through a graduate role, an internship, or a move from political, campaigning or communications work. Political knowledge and networking matter, and relevant experience helps. Entry is competitive. From officer you progress to public affairs manager and senior influencing roles.

It suits confident, purposeful people with social confidence who are interested in politics and enjoy building relationships and shaping debate. You need political understanding, communication skills and strategic thinking. It is a poor fit for those who dislike politics or want purely analytical or technical work.

Public affairs is increasingly shaped by digital communication and by a fast moving, unpredictable political environment, which keeps the work dynamic. Organisations across sectors invest in influencing policy. Demand is steady across business, charities and consultancies.

The work is office based or hybrid with meetings and events, and hours can vary around political activity. Graduate and early roles typically pay around £26k to £38k, rising to £45k to £70k and beyond as you specialise. Demand is steady across sectors that engage with government.`,

  campaigns_officer: `A Campaigns Officer plans and runs campaigns to change opinions, behaviour or policy, often for charities, causes or membership organisations. You help build public support and pressure for a cause and turn it into real change. It is a purposeful, creative role for people who want to make a difference.

Day to day you plan and deliver campaigns, create content and messages, mobilise supporters, work with media and partners, and track how campaigns are performing. You combine creativity with strategy, and much of the job is inspiring people to act for a cause. The work is creative, energetic and purpose driven.

Most people enter through a background in campaigning, politics, communications or the charity sector, often starting with volunteering or internships, and a specific degree is less important than commitment and skills. Passion for causes and communication skills matter. Entry is competitive and often funding dependent. From officer you progress to campaigns manager and advocacy leadership.

It suits purposeful, creative people with social confidence and originality who care about causes and enjoy rallying support. You need creativity, communication skills, resilience and adaptability. It is a poor fit for those who want commercial, high paying or purely analytical work.

Campaigning is increasingly digital, with social media and data central to reaching and mobilising people, so digital skills are valuable. Funding for causes can be uncertain. Demand is steady but often dependent on charity and campaign funding.

The work is office based or hybrid with events and some unsocial hours around campaigns. Pay is modest, typically around £24k to £34k, rising to £40k to £55k and beyond as you move into management. Demand is steady but funding dependent.`,

  financial_crime_analyst: `A Financial Crime Analyst helps stop crimes like money laundering, fraud and terrorist financing by spotting and investigating suspicious activity. You protect organisations and the financial system from being misused by criminals. It is an investigative, high stakes role that has grown rapidly in importance.

Day to day you monitor transactions and activity for suspicious patterns, investigate alerts, gather and analyse evidence, and report concerns to the right authorities. You keep up with criminal methods and regulations, and much of the job is detecting and unpicking financial crime. The work is analytical, investigative and detailed.

Most people enter through a graduate scheme, or by moving from banking, compliance or operations, and a specific degree is often not required, with professional qualifications gained on the job. Analytical skill and attention to detail matter. Entry is accessible and demand is strong. From analyst you progress to senior and specialist financial crime and investigation roles.

It suits analytical, principled people who value security and enjoy investigation and detail. You need analytical skill, care for detail and sound judgement. It is a poor fit for those who dislike detailed investigation or want a purely commercial role.

Financial crime is a fast growing field as regulation tightens and criminals use new methods, and AI and data tools increasingly help detect suspicious activity, raising the value of investigative judgement. Demand is strong and rising. The field offers good security and progression.

The work is office based or hybrid, with generally steady hours. Graduate and early roles typically pay around £28k to £40k, rising to £50k to £75k and beyond as you specialise. Demand is strong and growing across banking and beyond.`,

  investigation_officer: `An Investigation Officer looks into wrongdoing, complaints or breaches of rules for organisations such as regulators, public bodies or companies. You gather evidence, establish what happened, and help ensure the right action is taken. It is a purposeful, analytical role focused on getting to the truth.

Day to day you plan and carry out investigations, gather and analyse evidence, interview people, and write clear, well evidenced reports. You follow careful procedures to make findings fair and reliable, and much of the job is uncovering and documenting the facts. The work is analytical, methodical and purpose driven.

Most people enter through experience in a relevant field, a public body graduate scheme, or a move from a related role, and a specific degree is often less important than analytical and investigative skills. Relevant experience matters. Entry is competitive. From officer you progress to senior and specialist investigation roles.

It suits analytical, principled people with a sense of purpose who enjoy investigation and can handle difficult situations. You need analytical skill, attention to detail, resilience and integrity. It is a poor fit for those who want fast commercial work or dislike detailed, sometimes confrontational, enquiry.

Investigation work is shaped by growing regulation and by more digital evidence, and data tools increasingly support investigations, raising the value of analytical judgement. Demand exists across regulators, public bodies and companies. Demand is steady, driven by the need to uphold rules and standards.

The work is office and field based, with generally reasonable hours that can vary. Graduate and early roles typically pay around £28k to £40k, rising to £45k to £65k and beyond as you specialise. Demand is steady across regulators and organisations.`,

  policy_officer: `A Policy Officer helps develop and deliver the policies of government bodies, charities or other organisations, turning goals and evidence into practical action. You research issues, weigh options and help shape and implement policy. It is a purposeful role for people who want to influence how things are done.

Day to day you research policy areas, analyse evidence, write briefings and proposals, consult stakeholders, and support the development and delivery of policy. You turn complex issues into clear advice and action, and much of the job is thoughtful analysis in service of good decisions. The work is analytical, collaborative and purpose driven.

Most people enter with a degree in politics, social science, economics or a related field, through a government graduate scheme such as the civil service fast stream, a charity, or an internship. Analytical and writing skills matter. Entry is competitive. From officer you progress to senior policy roles and towards shaping strategy.

It suits analytical, purposeful people who want to improve how society works and enjoy getting to grips with complex issues. You need strong analysis, clear writing and the ability to work with others. It is a poor fit for those who want hands on delivery or dislike research and process.

Policy work increasingly draws on data and evidence, and digital tools and AI support research, raising the value of clear thinking and judgement. Political priorities shape the work. Demand is steady across government, charities and public bodies.

The work is office based or hybrid, with generally reasonable hours that can spike around decisions. Graduate and early roles typically pay around £28k to £38k, rising to £45k to £65k and beyond as you specialise. Demand is steady across the public and charity sectors.`,

  government_social_research_officer: `A Government Social Research Officer produces and uses research about society to help government make well informed policy and deliver better services. You gather and analyse evidence about how people live and how policies affect them. It is a role that puts rigorous research at the heart of public decisions.

Day to day you design and commission research, analyse data and findings, and advise policy colleagues on what the evidence shows. You combine social science methods with the needs of policy, and much of the job is producing reliable evidence that informs real decisions. The work is analytical, rigorous and purpose driven.

Most people enter with a social science degree, often a master's, through the Government Social Research profession, a recognised route into public sector research. Research methods and analytical skills matter. Entry is competitive but well defined. From officer you progress to senior and principal social research roles.

It suits curious, analytical people with a sense of purpose who want their research to improve public decisions and enjoy rigorous evidence. You need strong research and analytical skills and clear communication. It is a poor fit for those who dislike detailed analysis or want hands on delivery.

Social research increasingly uses large datasets and new digital methods alongside traditional approaches, and AI supports analysis, raising the value of good design and interpretation. Government values evidence based policy, supporting demand. Demand is steady across the public sector.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £30k to £38k, rising to £45k to £60k and beyond as you specialise, on government scales. Demand is steady across government.`,

  trainee_solicitor: `A Trainee Solicitor is learning to become a qualified solicitor, gaining practical legal experience while completing the final stages of qualification. You work on real legal matters under supervision, building the skills and experience needed to qualify. It is the crucial training stage on the path to becoming a solicitor.

Day to day you research law, draft documents, assist on cases and transactions, meet clients, and rotate through different areas of law to gain broad experience. You learn how legal practice really works, and much of the job is developing skills across varied legal work. The work is analytical, detailed and developmental.

You become a trainee after a law degree or a non law degree plus a conversion course, and by securing a training contract or qualifying work experience, and passing the required assessments, now usually the SQE. Securing a training place is very competitive, especially at leading firms. From trainee you qualify as a solicitor and progress within your chosen area of law.

It suits analytical, driven people with a drive for mastery who enjoy detailed legal work and want to qualify as a lawyer. You need strong analysis, attention to detail and resilience. It is a poor fit for those who want quick qualification or dislike detailed, demanding work.

The route to qualifying has changed with the introduction of the SQE, which is opening up new and more flexible paths into the profession. Legal technology and AI are also reshaping junior legal work. Competition for training places remains intense, though routes are broadening.

The work is office based or hybrid, with hours that can be long, especially at commercial firms. Pay varies widely, from around £25k at regional firms to £45k or more at large City firms. Demand for training places is high and competitive.`,

  solicitor: `A Solicitor is a qualified lawyer who advises clients on the law and handles legal matters, from property and business deals to disputes, family and criminal issues. You guide people and organisations through legal problems and help them achieve their goals within the law. It is a respected profession with many specialisms and paths.

Day to day you advise clients, research and apply the law, draft legal documents, negotiate, and manage cases or transactions. You often specialise in an area of law, and much of the job is expert advice and careful legal work. The work is analytical, detailed and client focused.

You qualify as a solicitor after a law degree or conversion, practical training such as a training contract or qualifying work experience, and passing the required assessments, now usually the SQE. The path is demanding and competitive. From qualification you progress to senior solicitor, associate and partner, or move in house or into other legal roles.

It suits analytical, driven people with a drive for mastery who enjoy detailed legal work and advising clients. You need strong analysis, attention to detail and good communication. It is a poor fit for those who want courtroom advocacy as their main role or dislike detailed work.

Legal technology and AI are automating routine legal tasks, reshaping how solicitors work and adding value to judgement and client relationships. Commercial law is well paid, while publicly funded areas like legal aid face funding pressures. Demand is steady, with strong rewards in commercial fields.

The work is office based or hybrid, with hours that vary from reasonable to long depending on the field. Pay varies widely, with newly qualified solicitors earning from around £45k regionally to over £100k at top City firms, rising with seniority. Demand is steady, strongest in commercial law.`,

  in_house_legal_counsel: `An In house Legal Counsel is a qualified lawyer who works within a company or organisation rather than a law firm, advising the business on legal matters. You are the organisation's own lawyer, helping it operate legally and manage risk. It is a role that combines legal expertise with close involvement in a business.

Day to day you advise colleagues on legal issues, review and draft contracts, manage legal risk, handle disputes, and work with external law firms when needed. You know the business well and give practical, commercial legal advice, and much of the job is helping the organisation achieve its goals safely. The work is analytical, commercial and collaborative.

Most people become in house counsel after qualifying as a solicitor and gaining experience, often in a law firm first, then moving in house. Legal qualification and commercial understanding matter. Entry is by qualifying as a lawyer and then moving into industry. From counsel you progress to senior counsel, general counsel and legal leadership.

It suits analytical, organised people who value security and enjoy applying law within a business and working closely with colleagues. You need legal expertise, commercial awareness and good communication. It is a poor fit for those new to law or who want purely private practice or courtroom work.

In house legal teams have grown as organisations bring more legal work inside, and legal technology and AI are changing how the work is done, raising the value of commercial judgement. Businesses increasingly value practical, embedded legal advice. Demand is steady and the in house route is popular.

The work is office based or hybrid, with generally more predictable hours than private practice. Pay is strong, typically around £50k to £80k earlier on and rising well above that for senior and general counsel roles. Demand is steady as organisations build in house teams.`,

  barrister: `A Barrister is a specialist legal advocate who argues cases in court and gives expert legal opinions, often instructed by solicitors. You represent clients in court and provide deep expertise on points of law. It is a demanding, prestigious branch of the legal profession centred on advocacy and expertise.

Day to day you prepare and argue cases in court, advise on complex legal questions, draft legal documents, and research the law in depth. Much of your work is self employed and case based, and much of the job is persuasive advocacy and rigorous legal analysis. The work is intellectual, high pressure and independent.

Becoming a barrister requires a law degree or conversion, a specialist bar course, and a pupillage, a period of training in chambers that is extremely competitive to secure. You join one of the Inns of Court along the way. Entry is among the hardest in the professions. Once established you build a practice and can progress to senior positions and, in time, potentially the judiciary.

It suits ambitious, analytical people with a drive for achievement who enjoy argument, deep legal thinking and performing under pressure. You need sharp analysis, confidence, resilience and independence. It is a poor fit for those who want security, teamwork based work or dislike public performance.

Legal technology and AI are changing legal research and preparation, while commercial areas of the bar are well rewarded and publicly funded areas such as criminal work face serious funding pressures. Competition for pupillage remains fierce. Demand is limited by the small number of training places.

The work is court and chambers based, often self employed, with hours that can be long and unpredictable. Earnings vary enormously, from modest in publicly funded work to very high in commercial fields, after a low paid pupillage. Demand is constrained by very limited pupillage places.`,

  judicial_clerk: `A Judicial Clerk, often called a judicial assistant, supports judges by researching law and helping prepare for cases and judgments. You provide the legal research and support that helps judges reach and explain their decisions. It is a prestigious, intellectually rich role close to the heart of the legal system.

Day to day you research points of law, summarise cases and arguments, help prepare for hearings, and assist judges with drafting and analysis. You work closely with the judiciary, and much of the job is rigorous legal research and clear written analysis. The work is analytical, precise and independent.

Most people enter as law graduates or junior lawyers, and these roles are competitive and often held for a fixed period as a valuable early career experience. Strong legal knowledge and research skills matter. Entry is competitive. From judicial clerk people typically move on into practice as solicitors or barristers, or other legal careers, enriched by the experience.

It suits analytical, curious people with a drive for mastery who enjoy deep legal research and precise written work. You need excellent legal analysis, attention to detail and the ability to work independently. It is a poor fit for those who want advocacy, client work or fast commercial pace.

Legal research is increasingly supported by technology and AI, which change how research is done and raise the value of judgement and clear analysis. The role remains a sought after and enriching step in a legal career. Demand is limited by the small number of positions.

The work is court based, with generally regular hours. Pay typically ranges around £30k to £45k, on relevant legal or court scales. Demand is limited but the experience is highly valued.`,

  // ── Business Strategy, Commercial & Leadership ──────────────────────────
  management_trainee: `A Management Trainee is developing towards a management or leadership role, usually through a structured programme that rotates them across different parts of a business. You learn how an organisation works from several angles while building the skills to lead. It is a broad, ambitious start to a business career.

Day to day you take on projects and responsibilities across different departments, learn the business, support teams, and develop management skills. You gain a wide view of how the organisation runs, and much of the job is learning by doing across varied areas. The work is varied, fast paced and developmental.

Most people enter through a graduate management scheme, and increasingly through management degree apprenticeships, and a broad range of degrees is accepted. Employers look for potential, drive and people skills more than a specific subject. Entry to good schemes is competitive. From trainee you progress into management roles and towards senior leadership.

It suits driven, sociable people who are adaptable and enjoy variety and a challenge. You need ambition, people skills and the flexibility to learn across areas. It is a poor fit for those who want to specialise deeply early or dislike change and responsibility.

Business is being reshaped by data and technology, so future managers increasingly need to be comfortable with both, while the core of leading people endures. Organisations keep investing in developing talent. Demand is steady for capable, well rounded future leaders.

The work is office based or hybrid, often with rotations, and hours are generally reasonable. Graduate and early roles typically pay around £25k to £35k, rising to £45k to £60k and beyond as you move into management. Demand is steady across sectors.`,

  business_operations_analyst: `A Business Operations Analyst helps a company run more smoothly and efficiently by analysing how it works and finding ways to improve. You look at processes, data and performance and recommend better ways of doing things. It is a practical, analytical role focused on making a business work better.

Day to day you analyse business processes and data, identify problems and improvements, support projects, and help implement changes. You work across teams, and much of the job is turning analysis into practical improvements that help the business run better. The work is analytical, practical and collaborative.

Most people enter through a graduate scheme, a business apprenticeship, or a move from an analyst or operational role, and comfort with data helps. A broad range of backgrounds is accepted. Entry is accessible for analytically minded people. From analyst you progress to senior operations and business improvement roles, or into management.

It suits analytical, organised people who enjoy solving problems and improving how things work. You need comfort with data, structure and good communication. It is a poor fit for those who dislike detail or want a purely creative role.

Automation and data tools increasingly handle routine analysis, shifting the role towards interpretation, improvement and change. Businesses value people who can make operations more efficient. Demand is steady across sectors.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £28k to £40k, rising to £45k to £65k and beyond as you specialise. Demand is steady across organisations.`,

  operations_analyst: `An Operations Analyst studies how an organisation delivers its products or services and finds ways to make it faster, cheaper and better. You use data to understand and improve day to day operations. It is a practical, analytical role at the heart of how things get done.

Day to day you analyse operational data and processes, identify inefficiencies, model improvements, and support changes that make operations run better. You work with operational teams, and much of the job is using analysis to improve performance. The work is analytical, practical and detail focused.

Most people enter through a graduate scheme, a business or data apprenticeship, or a move from an operational role, and comfort with data matters. A range of backgrounds is accepted. Entry is accessible for analytically minded people. From analyst you progress to senior operations and improvement roles or management.

It suits analytical, organised people who enjoy improving how things work and like working with data. You need comfort with numbers, structure and problem solving. It is a poor fit for those who dislike detail or want a purely creative or people facing role.

Automation, data and AI increasingly support operations, raising the value of analysis and improvement over routine work. Efficient operations are vital to competitiveness, supporting demand. Demand is steady across industries.

The work is office based or hybrid, sometimes with site contact, and hours are generally reasonable. Graduate and early roles typically pay around £28k to £38k, rising to £45k to £60k and beyond as you specialise. Demand is steady across sectors.`,

  supply_chain_analyst: `A Supply Chain Analyst helps manage the flow of goods from suppliers to customers, using data to make supply chains efficient, reliable and cost effective. You analyse how products are sourced, moved and delivered and find ways to improve. It is a practical, analytical role central to how businesses deliver.

Day to day you analyse supply chain data, forecast demand, monitor performance, identify improvements, and help solve problems in sourcing, logistics and inventory. You work with suppliers and internal teams, and much of the job is keeping the supply chain running smoothly and efficiently. The work is analytical, practical and fast moving.

Most people enter through a graduate scheme, a supply chain or logistics apprenticeship, or a move from an operational role, and a business, logistics or numerate background helps. Comfort with data matters. Entry is accessible for analytically minded people. From analyst you progress to senior supply chain and management roles.

It suits analytical, organised people who enjoy solving problems and like working with data and logistics. You need comfort with numbers, structure and adaptability. It is a poor fit for those who dislike detail or want a purely creative role.

Supply chains are being transformed by data, automation and AI, and recent global disruptions have raised the importance of resilient, well managed supply chains. Sustainability is also growing in importance. Demand is strong across manufacturing, retail and logistics.

The work is office based or hybrid, sometimes with site visits, and hours are generally reasonable. Graduate and early roles typically pay around £28k to £40k, rising to £48k to £65k and beyond as you specialise. Demand is strong across sectors that move goods.`,

  business_analyst: `A Business Analyst helps organisations solve problems and improve by understanding what they need and how to achieve it, often bridging the gap between business and technology. You work out what a business requires and help design solutions, frequently involving new systems or processes. It is a versatile, in demand role at the meeting point of business and change.

Day to day you gather and analyse requirements, map processes, propose solutions, and work with business and technical teams to deliver improvements. You translate between what the business needs and how it can be delivered, and much of the job is understanding problems and shaping solutions. The work is analytical, collaborative and varied.

Most people enter through a graduate scheme, a business analysis apprenticeship, or a move from an operational, technical or analyst role, and a range of backgrounds is accepted. Analytical and communication skills matter more than a specific degree. Entry is accessible and demand is strong. From analyst you progress to senior and lead business analyst, and into product, project or consulting roles.

It suits analytical, curious people who enjoy solving problems and working with others to improve things. You need strong analysis, communication and adaptability. It is a poor fit for those who want purely technical or purely creative work.

Business analysis is in strong demand as organisations keep changing and adopting new technology, and AI is changing both the tools analysts use and the problems they solve. The role is central to delivering change well. Demand is strong across sectors.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £30k to £45k, rising to £55k to £75k and beyond as you specialise. Demand is strong across industries.`,

  process_analyst: `A Process Analyst examines how work gets done in an organisation and finds ways to make processes simpler, faster and better. You map out how things are done and redesign them to work more efficiently. It is a practical, analytical role focused on improving how organisations operate.

Day to day you map and analyse business processes, identify inefficiencies and problems, design improved processes, and support their implementation. You work with teams across the business, and much of the job is turning messy, inefficient ways of working into clear, effective ones. The work is analytical, structured and detail focused.

Most people enter through a graduate scheme, a business apprenticeship, or a move from an operational or analyst role, and a range of backgrounds is accepted. Analytical and problem solving skills matter. Entry is accessible for analytically minded people. From analyst you progress to senior process and improvement roles, or into business analysis and management.

It suits analytical, organised people who enjoy improving how things work and like structure and detail. You need analytical skill, attention to detail and good communication. It is a poor fit for those who dislike detail or want a purely creative role.

Process improvement is increasingly supported by automation and AI, which both change processes and raise the value of analysing and redesigning them well. Efficiency remains a priority for organisations. Demand is steady across sectors.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £30k to £42k, rising to £50k to £70k and beyond as you specialise. Demand is steady across organisations.`,

  pmo_analyst: `A PMO Analyst works in a project or programme management office, supporting how an organisation runs its projects so they stay on track and deliver. You help plan, monitor and report on projects, keeping them organised and well governed. It is an organised, analytical role that keeps important work moving.

Day to day you track project progress, budgets and risks, prepare reports, maintain plans and standards, and support project managers and teams. You keep projects governed and visible, and much of the job is bringing order and clarity to complex work. The work is analytical, structured and collaborative.

Most people enter through a graduate scheme, a project management apprenticeship, or a move from a coordination or analyst role, and a range of backgrounds is accepted. Organisation and analytical skills matter. Entry is accessible for organised people. From analyst you progress to PMO management, project management and delivery leadership.

It suits organised, analytical people who enjoy bringing structure to complex work and like detail and coordination. You need organisation, analytical skill and attention to detail. It is a poor fit for those who dislike process or want a purely creative role.

As organisations run more projects and transformation, good project governance stays important, and digital tools increasingly support the work. Demand is steady for those who keep projects on track. The role is a solid route into project and delivery management.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £30k to £42k, rising to £50k to £70k and beyond as you specialise. Demand is steady across sectors that run projects.`,

  project_coordinator: `A Project Coordinator helps keep projects running smoothly by organising the many practical details involved in getting work done on time. You support project managers and teams, coordinating tasks, schedules and communication. It is an organised, people focused role and a common way into project management.

Day to day you organise project tasks and schedules, arrange meetings, track progress, handle documentation, and keep everyone informed and coordinated. You keep the many moving parts aligned, and much of the job is practical organisation that keeps projects on track. The work is organised, collaborative and fast paced.

Most people enter through a graduate role, a project apprenticeship, or a move from an administrative or support role, and a range of backgrounds is accepted. Organisation and people skills matter more than a specific degree. Entry is accessible for organised people. From coordinator you progress to project manager and delivery roles.

It suits organised, sociable people who enjoy keeping things on track and working with others. You need organisation, reliability and good communication. It is a poor fit for those who dislike detail and coordination or want highly analytical or creative work.

As organisations run more projects, coordination stays in demand, and digital tools increasingly support the work, shifting it towards coordination and communication. The role is a solid stepping stone into project management. Demand is steady across sectors.

The work is office based or hybrid, with generally reasonable hours that can be busy near deadlines. Graduate and early roles typically pay around £26k to £36k, rising to £45k to £60k and beyond as you move into project management. Demand is steady across sectors.`,

  management_consultant: `A Management Consultant advises organisations on how to solve their biggest problems and improve their performance. You are brought in to tackle challenges, from strategy to operations, bringing analysis, ideas and fresh perspective. It is a demanding, prestigious career known for variety, steep learning and strong rewards.

Day to day you analyse client problems, gather and interpret data, develop recommendations, and present them to clients, often working in teams on intense projects. You move between clients and challenges, and much of the job is solving hard problems and persuading clients to act. The work is analytical, fast paced and varied.

Most people enter through a highly competitive graduate scheme, usually after internships, and a range of strong degrees is accepted, with top academic results and problem solving valued. Some join later from industry expertise. Entry is very competitive. From consultant you progress through consultant grades towards manager and partner, or move into senior industry roles.

It suits driven, analytical and sociable people who enjoy variety, problem solving and a challenge. You need strong analysis, communication and adaptability, and the resilience for intense work. It is a poor fit for those who want predictable hours, deep specialisation or a settled routine.

Consulting is being changed by data, AI and automation, which handle more routine analysis and raise the value of judgement, relationships and complex problem solving. Demand moves with the economy but the profession remains strong. Demand is good, especially for those who combine analysis with people skills.

The work is office, client site and hybrid based, often with travel and long hours. Graduate and early roles typically pay around £35k to £50k, rising to £70k to £100k and beyond as you progress, higher at leading firms. Demand is good, tied to the economy.`,

  strategy_analyst: `A Strategy Analyst helps an organisation work out where it should go and how to get there, analysing markets, competitors and options to inform big decisions. You provide the analysis behind an organisation's strategy. It is an analytical, high level role close to how important decisions are made.

Day to day you research markets and competitors, analyse data and trends, model options, and prepare recommendations for senior leaders. You help frame the choices an organisation faces, and much of the job is turning analysis into clear strategic advice. The work is analytical, high level and varied.

Most people enter through a graduate scheme in a company's strategy team or a consultancy, usually after internships, and strong analytical degrees are valued. Some move in from consulting or analysis roles. Entry is competitive. From analyst you progress to senior strategy roles and towards strategy leadership.

It suits analytical, ambitious people who enjoy big picture thinking and solving complex problems. You need strong analysis, comfort with data and clear communication. It is a poor fit for those who want hands on delivery or dislike ambiguity and high level thinking.

Strategy work increasingly draws on data and AI, which handle more analysis and raise the value of judgement and insight. Organisations always need direction, supporting demand. Demand is steady, concentrated in larger firms and consultancies.

The work is office based or hybrid, with generally reasonable hours that can intensify around key decisions. Graduate and early roles typically pay around £35k to £50k, rising to £60k to £90k and beyond as you specialise. Demand is steady, concentrated in larger organisations.`,

  account_executive: `An Account Executive manages relationships with a company's clients and works to win and grow business with them. You are a key point of contact for customers, helping meet their needs while driving sales. It is a commercial, people focused role central to how businesses grow.

Day to day you build and manage client relationships, understand their needs, present products or services, negotiate deals, and work to hit sales targets. You combine relationship building with commercial drive, and much of the job is winning and keeping business. The work is sociable, target driven and fast paced.

Most people enter through a graduate role, a sales apprenticeship, or a move from a customer facing role, and a range of backgrounds is accepted, with drive and people skills mattering most. Entry is accessible for confident, motivated people. From account executive you progress to senior account and sales management roles.

It suits confident, driven people with an entrepreneurial streak who enjoy building relationships and hitting targets. You need social confidence, resilience and commercial drive. It is a poor fit for those who dislike targets and rejection or want a purely analytical role.

Sales is being changed by data and technology that help find and manage customers, raising the value of relationships and consultative selling over pure pitching. Good salespeople remain in strong demand. Demand is strong across sectors that sell products and services.

The work is office based, hybrid or on the road, with hours that can extend around targets. Pay typically combines a base of around £28k to £40k with commission, giving realistic total earnings of around £50k to £80k and more for strong performers. Demand is strong across sales driven businesses.`,


  business_development_executive: `A Business Development Executive helps a company grow by finding and winning new business opportunities, from new customers to new markets. You open doors and create the opportunities that drive growth. It is an entrepreneurial, commercial role at the front line of business growth.

Day to day you research and find potential opportunities, reach out to prospects, build relationships, and help win new business. You combine initiative with relationship building, and much of the job is generating and pursuing opportunities for growth. The work is proactive, sociable and target driven.

Most people enter through a graduate role, a sales apprenticeship, or a move from a customer facing role, and a range of backgrounds is accepted, with drive and people skills mattering most. Entry is accessible for confident, motivated people. From executive you progress to business development manager and commercial leadership.

It suits driven, confident people with an entrepreneurial streak who enjoy finding opportunities and building relationships. You need initiative, resilience and social confidence. It is a poor fit for those who dislike rejection and targets or want a purely analytical role.

Business development is being changed by data and digital tools that help find and reach prospects, raising the value of relationships and consultative approaches. Growth is always a priority, supporting demand. Demand is strong across sectors seeking to grow.

The work is office based, hybrid or on the road, with hours that can extend around targets. Pay typically combines a base of around £28k to £40k with commission, giving realistic total earnings of around £50k to £75k and more for strong performers. Demand is strong across growth focused businesses.`,

  partnerships_executive: `A Partnerships Executive builds and manages relationships with other organisations that help a business reach its goals, from collaborations to sponsorships. You create and look after the partnerships that add value and open opportunities. It is a relationship driven, commercial role focused on working with others.

Day to day you identify and approach potential partners, build and maintain relationships, help negotiate agreements, and manage partnerships so they deliver for both sides. You combine people skills with commercial thinking, and much of the job is nurturing valuable relationships. The work is sociable, collaborative and varied.

Most people enter through a graduate role, or a move from a sales, marketing or business development role, and a range of backgrounds is accepted, with people and commercial skills mattering most. Entry is accessible for confident, driven people. From executive you progress to partnerships manager and commercial leadership.

It suits confident, sociable people with an entrepreneurial streak who enjoy building relationships and creating opportunities. You need social confidence, collaboration and adaptability. It is a poor fit for those who dislike networking or want a purely analytical role.

Partnerships are increasingly central as organisations collaborate and build networks, and digital platforms create new opportunities to partner. Skilled relationship builders are valued. Demand is steady across sectors.

The work is office based or hybrid with meetings and events, and hours are generally reasonable. Graduate and early roles typically pay around £30k to £45k, rising to £55k to £80k and beyond as you specialise, sometimes with bonuses. Demand is steady across commercial organisations.`,

  business_development_manager: `A Business Development Manager leads efforts to grow a business, developing and delivering strategies to win new customers, markets and opportunities. You take ownership of growth, often managing relationships, deals and sometimes a team. It is a senior commercial role central to how businesses expand.

Day to day you develop growth strategies, build and manage key relationships, negotiate significant deals, and drive new business, often leading or mentoring others. You combine strategy with hands on relationship building, and much of the job is delivering growth. The work is strategic, sociable and target driven.

Most people reach this role after experience in business development, sales or account management, having shown they can win business. A range of backgrounds is accepted, with a track record mattering most. Entry usually follows earlier commercial roles. From manager you progress to senior commercial and sales leadership.

It suits driven, confident people with an entrepreneurial streak who enjoy leading growth and building relationships. You need commercial drive, strong people skills and resilience. It is a poor fit for those who dislike targets and pressure or want a purely analytical role.

Business development is shaped by data and digital tools that support finding and winning business, raising the value of strategy and relationships. Growth is always a priority, supporting demand. Demand is strong for people who can deliver it.

The work is office based, hybrid or on the road, with hours that can extend around targets. Pay typically combines a base of around £35k to £55k with commission, giving realistic total earnings of around £60k to £100k and more for strong performers. Demand is strong across growth focused businesses.`,

  hr_officer: `An HR Officer supports the people side of an organisation, helping with everything from recruitment and staff relations to wellbeing and development. You help make sure employees are supported and the organisation treats its people well. It is a people focused role at the heart of how organisations look after their staff.

Day to day you support recruitment, help with employee queries and relations, assist with policies and wellbeing, and keep people processes running. You work with staff at all levels, and much of the job is caring for people and supporting a good workplace. The work is caring, organised and people focused.

Most people enter through a graduate role, an HR apprenticeship, or a move from an administrative or support role, and qualifications from bodies such as the CIPD help. People skills matter more than a specific degree. Entry is accessible for the right people. From officer you progress to HR advisor, manager and people leadership.

It suits caring, organised people with empathy and a sense of belonging who enjoy supporting others and helping workplaces work well. You need people skills, organisation and discretion. It is a poor fit for those who want purely analytical or technical work or dislike dealing with people issues.

HR is being changed by data and technology, which automate routine tasks and raise the value of the human, advisory side of the work. Attention to wellbeing and culture is growing. Demand is steady across organisations of all kinds.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £25k to £35k, rising to £40k to £55k and beyond as you specialise. Demand is steady wherever organisations employ people.`,

  people_operations_associate: `A People Operations Associate keeps the practical side of human resources running smoothly, handling the systems and processes that support employees throughout their time with an organisation. You make sure people related processes work well, from joining to everyday support. It is an organised, supportive role in the people function.

Day to day you manage HR systems and records, support processes like onboarding and payroll queries, answer employee questions, and help improve how people processes work. You keep the people operations running reliably, and much of the job is accurate, supportive administration. The work is organised, reliable and people focused.

Most people enter through a graduate role, an HR apprenticeship, or a move from an administrative role, and a specific degree is often not required, with organisation and people skills mattering most. Entry is accessible for the right people. From associate you progress into HR and people operations roles and management.

It suits caring, organised people with a sense of belonging who enjoy supporting others and keeping things running smoothly. You need organisation, reliability and good communication. It is a poor fit for those who want highly analytical or strategic roles or dislike administration.

People operations is increasingly supported by technology that automates routine tasks, shifting the role towards improving processes and supporting people. Good, efficient people operations are valued. Demand is steady across organisations.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £26k to £36k, rising to £40k to £55k and beyond as you specialise. Demand is steady across organisations that employ people.`,

  real_estate_investment_analyst: `A Real Estate Investment Analyst analyses property investments to help decide which buildings, developments or property funds are worth investing in. You assess the financial potential and risks of real estate deals. It is an analytical, commercial role where finance meets property.

Day to day you build financial models, analyse property markets and deals, assess returns and risks, and prepare recommendations for investors. You combine financial analysis with knowledge of property, and much of the job is judging whether a real estate investment makes sense. The work is analytical, commercial and detailed.

Most people enter with a degree in real estate, finance, economics or a related field, through a graduate scheme at a property investment firm, bank or advisor, and knowledge of both finance and property helps. Internships and relevant qualifications matter. Entry is competitive. From analyst you progress to senior investment and fund management roles.

It suits analytical, driven people who enjoy combining finance with property and like working with numbers. You need financial analysis skills, precision and commercial awareness. It is a poor fit for those who dislike numbers or want a purely people facing role.

Real estate investment is shaped by economic and interest rate cycles, and property technology and data increasingly support analysis, while sustainability is a growing factor in property value. Demand moves with the market but skilled analysts are valued. Demand is steady, tied to the property cycle.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £30k to £45k, rising to £60k to £90k and beyond as you specialise, with bonuses. Demand is steady, tied to real estate markets.`,

  real_estate_finance_associate: `A Real Estate Finance Associate helps arrange and manage the funding behind property deals, from loans for developments to financing large property purchases. You work on the financial side of real estate, structuring and supporting property finance. It is a commercial, analytical role connecting property and lending.

Day to day you analyse property finance deals, build financial models, prepare proposals and documents, and support the arranging and managing of property loans and investments. You work with lenders, investors and advisors, and much of the job is the detailed financial work behind property funding. The work is analytical, commercial and detailed.

Most people enter with a degree in finance, real estate or a related field, through a graduate scheme at a bank, property lender or advisor, and knowledge of finance and property helps. Internships and relevant qualifications matter. Entry is competitive. From associate you progress to senior real estate finance roles.

It suits analytical, driven people who value reliability and enjoy the financial side of property. You need financial analysis skills, precision and commercial awareness. It is a poor fit for those who dislike numbers and detail or want a purely people facing role.

Real estate finance moves with economic and interest rate cycles, and data and technology increasingly support the work, while sustainability affects how property is financed. Demand tracks the market but skilled people are valued. Demand is steady, tied to property finance activity.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £32k to £45k, rising to £55k to £80k and beyond as you specialise, with bonuses. Demand is steady, tied to real estate finance markets.`,

  property_fund_analyst: `A Property Fund Analyst supports the management of funds that invest in property, monitoring their performance and helping guide investment decisions. You analyse the properties and finances within a fund to help it perform well. It is an analytical role at the meeting point of investment management and real estate.

Day to day you analyse fund and property performance, monitor markets, build reports and models, and support decisions about buying, holding or selling properties. You keep a close eye on how the fund and its assets are doing, and much of the job is analysis that guides investment. The work is analytical, precise and detail focused.

Most people enter with a degree in real estate, finance or a numerate subject, through a graduate scheme at a property investment or fund management firm, and knowledge of finance and property helps. Internships and relevant qualifications matter. Entry is competitive. From analyst you progress to senior fund analyst and fund management roles.

It suits analytical, organised people who value reliability and enjoy working with data and property. You need analytical skills, precision and comfort with numbers. It is a poor fit for those who dislike detailed analysis or want a purely people facing role.

Property fund management is shaped by economic cycles and increasingly by data, technology and sustainability considerations. Demand moves with the market but skilled analysts are valued. Demand is steady, tied to property investment activity.

The work is office based or hybrid, with generally reasonable hours. Graduate and early roles typically pay around £32k to £45k, rising to £55k to £80k and beyond as you specialise, with bonuses. Demand is steady, tied to real estate investment.`,

  property_development_manager: `A Property Development Manager leads the creation of new buildings and places, guiding property development projects from idea to completion. You bring together the land, finance, design and construction needed to make a development happen. It is an ambitious, commercial role that shapes the built environment.

Day to day you plan and manage development projects, coordinate with designers, contractors, planners and investors, manage budgets and risks, and drive projects to completion. You juggle many parties and challenges, and much of the job is making complex developments actually happen. The work is commercial, practical and demanding.

Most people reach this role with a degree in real estate, construction, surveying or a related field, often after experience in property, surveying or construction. Commercial and project skills matter. Entry usually follows earlier property roles. From development manager you progress to senior development and director roles.

It suits driven, enterprising people with an entrepreneurial streak who enjoy making ambitious projects happen and managing many moving parts. You need commercial judgement, organisation and resilience. It is a poor fit for those who want purely analytical or low pressure roles.

Property development is shaped by economic cycles, planning and rising demands around sustainability and building standards, and technology increasingly supports the work. Demand moves with the market but skilled developers are valued. Demand is steady, tied to the development cycle.

The work is office and site based, with hours that can be demanding around projects. Pay typically starts around £35k to £50k and rises to £60k to £90k and beyond as you take on larger developments, sometimes with bonuses. Demand is steady, tied to property development activity.`,

  real_estate_asset_manager: `A Real Estate Asset Manager looks after property investments to get the best performance from them over time, deciding how to improve, let, manage or sell buildings. You maximise the value and returns of property assets. It is a commercial, strategic role focused on making property investments work hard.

Day to day you develop strategies for individual properties or portfolios, oversee their management and improvement, analyse performance, and make decisions to enhance value. You combine analysis with hands on management, and much of the job is actively improving how property assets perform. The work is commercial, analytical and varied.

Most people reach this role with a degree in real estate, finance or a related field, often after experience in property investment, management or surveying. Commercial and analytical skills matter. Entry usually follows earlier property roles. From asset manager you progress to senior asset management and portfolio leadership.

It suits driven, analytical people who enjoy actively improving investments and combining strategy with hands on management. You need commercial judgement, analytical skill and organisation. It is a poor fit for those who want purely analytical or passive roles.

Real estate asset management is shaped by economic cycles and increasingly by sustainability, which affects property value and demand, and data and technology support the work. Demand moves with the market but skilled managers are valued. Demand is steady, tied to property investment.

The work is office based with property visits, and hours are generally reasonable. Pay typically starts around £35k to £50k and rises to £60k to £90k and beyond as you specialise, with bonuses. Demand is steady, tied to real estate investment.`,

  commercial_valuation_surveyor: `A Commercial Valuation Surveyor works out how much commercial properties like offices, shops and warehouses are worth. You provide the expert valuations that underpin property deals, lending and investment. It is a technical, professional role central to how property markets work.

Day to day you inspect properties, analyse markets and comparable deals, apply valuation methods, and produce valuation reports. You combine detailed analysis with professional judgement, and much of the job is arriving at accurate, defensible valuations. The work is analytical, precise and professional.

Most people enter with an accredited real estate or surveying degree, or a degree apprenticeship, and work towards chartered status with the RICS. Numeracy, attention to detail and professional training matter. Entry is accessible through the surveying route. From valuation surveyor you progress to senior and chartered roles and specialisms.

It suits precise, analytical people who value accuracy and enjoy combining analysis with property knowledge. You need attention to detail, analytical skill and sound judgement. It is a poor fit for those who dislike detail and numbers or want a purely people facing role.

Valuation is increasingly supported by data and technology, which speed up analysis and raise the value of professional judgement, while sustainability is a growing factor in value. Chartered surveyors are in steady demand with recognised shortages. Demand is steady across property markets.

The work is office based with property inspections, and hours are generally reasonable. Graduate and early roles typically pay around £25k to £35k, rising to £45k to £70k and beyond as you gain chartership and seniority. Demand is steady, supported by a shortage of surveyors.`,


  property_manager: `A Property Manager looks after buildings and their tenants on behalf of owners, making sure properties are well run, maintained and profitable. You handle the day to day running of properties and keep tenants and owners happy. It is a practical, people focused role in the property world.

Day to day you manage tenancies and relationships, arrange maintenance and repairs, handle rent and budgets, and make sure properties meet legal and safety standards. You balance the needs of owners and tenants, and much of the job is keeping properties running smoothly. The work is organised, people focused and varied.

Most people enter through a property or lettings role, a graduate scheme, or an apprenticeship, and professional qualifications such as those from the RICS or ARLA help, though a specific degree is often not required. Organisation and people skills matter. Entry is accessible for the right people. From property manager you progress to senior property and portfolio management roles.

It suits organised, sociable people who enjoy managing things and dealing with people and problems. You need organisation, reliability and good communication. It is a poor fit for those who want purely analytical work or dislike handling people and problems.

Property management is increasingly supported by technology that handles administration and communication, and standards around safety and sustainability are rising. Well managed property is always needed. Demand is steady across the property sector.

The work is office based with property visits, and hours are generally reasonable but can include dealing with issues as they arise. Graduate and early roles typically pay around £24k to £35k, rising to £40k to £60k and beyond as you specialise. Demand is steady across property.`,

  facilities_manager: `A Facilities Manager makes sure buildings and workplaces run well, safely and efficiently, looking after everything that keeps a building working for the people who use it. You manage the services and systems that make a workplace function, from maintenance to security to cleaning. It is a practical, organised role central to how buildings serve their users.

Day to day you oversee building services and maintenance, manage contractors and budgets, ensure health and safety, and solve the practical problems that keep a building running. You balance many services and needs, and much of the job is keeping a workplace safe, comfortable and efficient. The work is organised, practical and people focused.

Most people enter through a facilities, business or building related route, a graduate scheme, or by working up from a support role, and professional qualifications help, though a specific degree is often not required. Organisation and practical skills matter. Entry is accessible for the right people. From facilities manager you progress to senior facilities and workplace leadership.

It suits organised, practical people who enjoy managing services and solving problems and like working with people. You need organisation, reliability and good problem solving. It is a poor fit for those who want purely analytical or desk bound roles.

Facilities management is increasingly shaped by technology, energy efficiency and sustainability, and by changing ways of working, which raise the value of smart, sustainable workplace management. Well run buildings are always needed. Demand is steady across sectors.

The work is building based, with generally reasonable hours that can include responding to issues. Graduate and early roles typically pay around £28k to £40k, rising to £45k to £65k and beyond as you specialise. Demand is steady across organisations with buildings.`,

  commercial_real_estate_agent: `A Commercial Real Estate Agent helps businesses buy, sell, let or rent commercial properties like offices, shops and industrial space. You bring together buyers, sellers, landlords and tenants and help them do deals. It is a commercial, people driven role at the sharp end of the property market.

Day to day you find and market properties, meet clients, arrange viewings, negotiate deals, and build relationships with businesses and investors. You combine market knowledge with sales skills, and much of the job is winning and closing property deals. The work is sociable, commercial and target driven.

Most people enter through a property or sales role, a graduate scheme, or an apprenticeship, and a real estate qualification helps, though drive and people skills matter most. Entry is accessible for confident, motivated people. From agent you progress to senior agent and towards running teams or specialising.

It suits confident, driven people with an entrepreneurial streak who enjoy dealing with people and closing deals. You need social confidence, resilience and commercial drive. It is a poor fit for those who dislike targets and rejection or want a purely analytical role.

Commercial property is shaped by economic cycles and by changing demand for space, such as shifts in office and retail use, and technology increasingly supports how property is marketed and matched. Demand moves with the market but good agents are valued. Demand is steady to cyclical, tied to the property market.

The work is office based and out meeting clients and viewing properties, with hours that can extend around deals. Pay typically combines a base of around £25k to £35k with commission, giving realistic total earnings of around £50k to £90k and more for strong performers. Demand is tied to commercial property activity.`,


  hotel_manager: `A Hotel Manager runs a hotel, making sure guests have a great stay while the business performs well. You oversee everything from the front desk to housekeeping, food and finances, leading a team to deliver excellent service. It is a busy, people focused leadership role at the heart of hospitality.

Day to day you oversee hotel operations, lead and support staff, ensure high standards of service, manage budgets and bookings, and handle guests and problems. You keep many parts of the hotel running together, and much of the job is leading a team to delight guests and run a profitable business. The work is fast paced, people focused and varied.

Most people enter through a hospitality management degree, an apprenticeship, or by working up through hotel roles, and practical experience is highly valued. A specific degree is not always required. Entry is accessible through several routes. From hotel manager you progress to general manager, multi site and senior hospitality leadership.

It suits sociable, driven people who enjoy leading teams, serving guests and managing a busy operation. You need people skills, organisation and resilience. It is a poor fit for those who want quiet, predictable work or dislike long, varied hours.

Hospitality has recovered strongly and faces staff shortages, which supports demand for good managers, while technology increasingly shapes bookings and the guest experience. Sustainability and changing traveller expectations also shape the work. Demand is steady to strong.

The work is hotel based, often including evenings, weekends and long hours. Pay typically starts around £28k to £40k, rising to £45k to £70k and beyond for larger hotels and senior roles, sometimes with accommodation or bonuses. Demand is steady to strong across hospitality.`,

  guest_experience_manager: `A Guest Experience Manager makes sure guests have an excellent, memorable experience, focusing on service, satisfaction and the little details that make a stay or visit special. You champion the guest's point of view and lead efforts to delight them. It is a people focused role centred on hospitality and care.

Day to day you oversee and improve the guest experience, handle feedback and problems, lead and support service staff, and find ways to exceed guests' expectations. You keep the focus firmly on guests, and much of the job is caring about and improving how they feel. The work is sociable, caring and detail focused.

Most people enter through hospitality roles, a hospitality degree, or an apprenticeship, and experience in service matters most, with a specific degree often not required. Entry is accessible through hospitality experience. From guest experience manager you progress to senior hospitality and operations leadership.

It suits warm, sociable people with empathy who love looking after others and take pride in great service. You need people skills, attention to detail and a genuine care for guests. It is a poor fit for those who dislike frontline service or want a purely analytical role.

Hospitality is recovering and competing hard on experience, so those who can deliver excellent, personalised service are valued, and technology increasingly supports understanding and serving guests. Expectations keep rising. Demand is steady to strong.

The work is venue based, often including evenings and weekends. Pay typically starts around £26k to £36k, rising to £40k to £55k and beyond in senior roles, sometimes with benefits. Demand is steady to strong across hospitality.`,

  events_manager: `An Events Manager plans and delivers events, from conferences and weddings to festivals and corporate functions, making sure they run smoothly and leave people impressed. You bring together all the pieces of an event and make it happen. It is a creative, high energy role for people who love bringing experiences to life.

Day to day you plan events, manage budgets and suppliers, coordinate logistics, and run events on the day, solving problems as they arise. You juggle many details and people, and much of the job is turning a vision into a well run, memorable event. The work is creative, organised and fast paced.

Most people enter through an events, hospitality or marketing route, a degree, an apprenticeship, or by working up from event support roles, and practical experience is highly valued. A specific degree is not always required. Entry is accessible through experience. From events manager you progress to senior events and leadership roles or running your own events business.

It suits creative, sociable people who enjoy organising, thrive under pressure and love bringing people together. You need creativity, organisation, adaptability and calm under pressure. It is a poor fit for those who want predictable, low pressure work or dislike last minute problem solving.

Events have rebounded strongly, and hybrid and technology enhanced events have grown, expanding what events managers do. Sustainability is increasingly important too. Demand is steady to strong as in person experiences remain valued.

The work is office and venue based, with irregular hours including evenings and weekends around events. Pay typically starts around £25k to £35k, rising to £40k to £60k and beyond in senior roles. Demand is steady to strong across the events industry.`,

  experience_producer: `An Experience Producer creates immersive, memorable experiences, from branded activations and installations to shows and interactive events. You design and deliver experiences that engage people in creative, often innovative ways. It is a highly creative role at the cutting edge of events and experiences.

Day to day you develop creative concepts, plan and produce experiences, coordinate creative and technical teams, and bring ambitious ideas to life. You combine imagination with production skills, and much of the job is turning bold concepts into real, engaging experiences. The work is creative, varied and fast paced.

Most people enter through events, production, creative or marketing backgrounds, building a portfolio of work, and practical experience and creativity matter most. A specific degree is not always required. Entry is competitive and portfolio driven. From producer you progress to senior producer and creative leadership roles.

It suits imaginative, sociable people with strong creative expression who love variety and bringing bold ideas to life. You need creativity, organisation and the ability to deliver under pressure. It is a poor fit for those who want predictable, structured work or dislike creative risk.

Experiences are a growing part of marketing and culture, and technology such as immersive and digital elements keeps expanding what is possible, raising demand for creative producers. Brands and audiences want memorable experiences. Demand is growing in this creative field.

The work is office, studio and venue based, with irregular hours around productions. Pay typically starts around £28k to £40k, rising to £45k to £65k and beyond in senior roles, with freelance work common. Demand is growing across experiential events and marketing.`,

  destination_manager: `A Destination Manager helps develop and promote a place, such as a city, region or resort, as somewhere to visit, working to attract tourists and support the local visitor economy. You help make a destination successful and appealing. It is a strategic, people focused role in tourism.

Day to day you develop and promote a destination, work with local businesses and partners, plan tourism activity, and help improve what the place offers visitors. You combine marketing with development and partnership, and much of the job is making a place thrive as a destination. The work is varied, sociable and purpose driven.

Most people enter through a tourism, marketing or related degree, or by working up from tourism roles, and knowledge of the sector and people skills matter. A range of backgrounds is accepted. Entry is competitive. From destination manager you progress to senior tourism and destination leadership.

It suits outgoing, curious people with a love of places and cultures who enjoy promotion, partnership and development. You need people skills, creativity and organisation. It is a poor fit for those who want purely analytical or desk bound roles.

Tourism is shaped by economic conditions, travel trends and a growing focus on sustainable and responsible tourism, and digital marketing increasingly drives how destinations attract visitors. Demand moves with the sector but skilled people are valued. Demand is steady, tied to the visitor economy.

The work is office based with travel and events, and hours can vary with the tourism calendar. Pay typically starts around £28k to £38k, rising to £42k to £60k and beyond in senior roles. Demand is steady across the tourism sector.`,

  tourism_development_officer: `A Tourism Development Officer helps grow and improve tourism in an area, developing attractions, experiences and strategies that bring visitors and benefit the local community. You work to build a thriving, sustainable visitor economy. It is a purposeful role that blends tourism, development and community.

Day to day you develop tourism projects and strategies, work with businesses, communities and partners, promote the area, and help improve what it offers visitors. You balance attracting visitors with benefiting local people and places, and much of the job is building tourism that works for everyone. The work is varied, collaborative and purpose driven.

Most people enter through a tourism, geography or related degree, or by working up from tourism or development roles, and knowledge of the sector and people skills matter. A range of backgrounds is accepted. Entry is competitive and sometimes funding dependent. From officer you progress to senior tourism development and management roles.

It suits outgoing, purposeful people with a love of places and cultures who enjoy development, partnership and promotion. You need people skills, creativity and organisation. It is a poor fit for those who want purely commercial or desk bound roles.

Tourism development is increasingly focused on sustainability and on spreading the benefits of tourism to communities, and digital tools shape how areas attract and manage visitors. Demand moves with the sector and public funding. Demand is steady but can depend on funding.

The work is office based with travel and community engagement, and hours can vary. Pay typically starts around £26k to £35k, rising to £40k to £55k and beyond in senior roles. Demand is steady, tied to tourism and public funding.`,

  food_beverage_manager: `A Food and Beverage Manager runs the food and drink side of a hotel, restaurant or venue, making sure it delivers great quality and service while running profitably. You oversee kitchens, bars, restaurants and service to keep guests happy and the business healthy. It is a busy, hands on management role in hospitality.

Day to day you oversee food and drink operations, lead and support staff, manage stock, budgets and standards, and ensure great service and quality. You keep the operation running smoothly through busy service, and much of the job is leading a team to deliver good food, drink and experience profitably. The work is fast paced, people focused and demanding.

Most people enter through hospitality roles, a hospitality degree, or an apprenticeship, and practical experience is highly valued, with a specific degree not always required. Entry is accessible through hospitality experience. From food and beverage manager you progress to senior hospitality and operations leadership.

It suits organised, driven people who thrive on pace and enjoy leading teams and delivering great service. You need organisation, people skills and resilience. It is a poor fit for those who want quiet, predictable work or dislike evenings and busy service.

Hospitality has recovered but faces staff shortages, supporting demand for good managers, and technology increasingly supports ordering, service and operations. Changing tastes and sustainability also shape the work. Demand is steady to strong.

The work is venue based, often including evenings, weekends and busy shifts. Pay typically starts around £26k to £36k, rising to £40k to £55k and beyond in senior roles, sometimes with benefits. Demand is steady to strong across hospitality.`,

  restaurant_operations_manager: `A Restaurant Operations Manager makes sure a restaurant, or several, runs smoothly, efficiently and profitably, overseeing the day to day operation and standards. You keep service, quality, staff and finances working well together. It is an organised, hands on management role in food and hospitality.

Day to day you oversee restaurant operations, lead and support staff, manage stock, budgets and standards, and make sure service runs smoothly and guests are happy. You keep the operation efficient and consistent, and much of the job is running a tight, well organised restaurant that performs well. The work is fast paced, organised and people focused.

Most people enter through restaurant and hospitality roles, a hospitality degree, or an apprenticeship, and practical experience is highly valued, with a specific degree not always required. Entry is accessible through experience. From restaurant operations manager you progress to multi site and senior operations leadership.

It suits organised, driven people who thrive on pace and enjoy leading teams and running efficient operations. You need organisation, reliability and resilience. It is a poor fit for those who want quiet, predictable work or dislike evenings and busy service.

Hospitality has recovered but faces staff shortages, supporting demand for good operators, and technology increasingly supports ordering, delivery and operations. Efficiency and consistency are ever more important. Demand is steady to strong.

The work is restaurant based, often including evenings, weekends and busy shifts. Pay typically starts around £28k to £40k, rising to £45k to £65k and beyond for multi site and senior roles, sometimes with bonuses. Demand is steady to strong across hospitality.`,

  // ── Engineering, Manufacturing & Infrastructure ─────────────────────────
  mechanical_engineer: `A Mechanical Engineer designs, develops and improves machines and mechanical systems, from engines and vehicles to tools and manufacturing equipment. You apply the science of how things move and work to create and improve physical products. It is a broad, foundational engineering career found across almost every industry.

Day to day you design and analyse mechanical systems, create and test prototypes, solve technical problems, and work with other engineers and manufacturers. You use design and simulation software, and much of the job is turning ideas into working, reliable machines. The work is technical, analytical and hands on.

Most people enter with an accredited mechanical engineering degree or a degree apprenticeship that lets you earn while you learn, and work towards chartered status with the IMechE. Practical experience and internships help. Entry is accessible through several routes and demand is strong. From engineer you progress to senior and chartered engineer and towards technical or management leadership.

It suits inventive, analytical people with strong technical curiosity who enjoy understanding how things work and solving practical problems. You need technical and analytical skills, precision and problem solving. It is a poor fit for those who dislike maths and detail or want non technical work.

Mechanical engineering is being reshaped by automation, simulation, sustainability and new technologies like electric vehicles, and there is a recognised shortage of engineers in the UK. Digital tools increasingly support design. Demand is strong across many industries.

The work is office, workshop and site based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £35k, rising to £45k to £65k and beyond as you gain chartership and experience. Demand is strong across engineering sectors.`,

  design_engineer: `A Design Engineer creates the designs for products, components and systems, turning ideas and requirements into detailed plans that can be made. You combine creativity with engineering to design things that work well and can be built. It is a creative, technical role at the start of how products come to life.

Day to day you develop designs using specialist software, analyse and test concepts, refine designs, and work with other engineers and manufacturers. You balance creativity with technical constraints, and much of the job is designing things that are both innovative and practical to make. The work is creative, analytical and technical.

Most people enter with an accredited engineering degree or a degree apprenticeship, and work towards chartered status. Skills in design software and creativity matter, and experience helps. Entry is accessible through several routes. From design engineer you progress to senior and lead design roles and technical leadership.

It suits inventive, imaginative people with strong technical curiosity and originality who enjoy designing and solving problems. You need design and analytical skills, creativity and precision. It is a poor fit for those who dislike detail or want non technical work.

Design engineering is being transformed by advanced software, simulation and increasingly AI, which speed up design and raise the value of creativity and judgement. Sustainability shapes what gets designed. Demand is strong, supported by an engineering skills shortage.

The work is office and workshop based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £35k, rising to £45k to £65k and beyond as you specialise. Demand is strong across engineering sectors.`,

  product_engineer: `A Product Engineer develops and improves physical products, making sure they work well, can be made efficiently and meet customers' needs. You bridge design and manufacturing, taking products from concept through development to production. It is a practical, technical role focused on turning designs into successful products.

Day to day you develop and refine products, solve technical and manufacturing problems, test and improve designs, and work with design, manufacturing and quality teams. You keep products both good and buildable, and much of the job is making sure a product works and can be made reliably. The work is technical, practical and collaborative.

Most people enter with an accredited engineering degree or a degree apprenticeship, and work towards chartered status. Technical and problem solving skills matter, and experience helps. Entry is accessible through several routes. From product engineer you progress to senior and lead engineering and management roles.

It suits inventive, analytical people with strong technical curiosity who enjoy improving products and solving practical problems. You need technical and analytical skills, precision and creativity. It is a poor fit for those who dislike detail or want non technical work.

Product engineering is shaped by automation, digital design and sustainability, which change how products are developed and made, and there is strong demand for skilled engineers. Digital tools increasingly support the work. Demand is strong across manufacturing industries.

The work is office and workshop based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £36k, rising to £45k to £65k and beyond as you specialise. Demand is strong across product industries.`,

  electrical_engineer: `An Electrical Engineer designs and develops the electrical systems that power everything from buildings and vehicles to power grids and machines. You work with electricity and electrical systems to make things work safely and efficiently. It is a vital engineering career at the heart of a world that runs on electricity.

Day to day you design electrical systems, analyse and test them, solve technical problems, and work with other engineers and technicians. You use specialist software and follow strict safety standards, and much of the job is designing systems that deliver power reliably and safely. The work is technical, analytical and precise.

Most people enter with an accredited electrical engineering degree or a degree apprenticeship, and work towards chartered status with the IET. Technical skills and experience matter. Entry is accessible through several routes and demand is strong. From engineer you progress to senior and chartered engineer and towards leadership.

It suits inventive, analytical people with strong technical curiosity who enjoy understanding electrical systems and solving problems. You need technical and analytical skills, precision and care for safety. It is a poor fit for those who dislike maths and detail or want non technical work.

Electrical engineering is in strong demand, driven by the shift to renewable energy, electric vehicles and electrification, and there is a recognised shortage of engineers. New technologies keep expanding the field. Demand is strong and growing with the energy transition.

The work is office, site and workshop based, with generally reasonable hours. Graduate and early roles typically pay around £30k to £38k, rising to £50k to £70k and beyond as you gain chartership and experience. Demand is strong, boosted by the move to clean energy.`,

  electronics_engineer: `An Electronics Engineer designs and develops the electronic circuits and devices found in everything from phones and computers to medical equipment and cars. You work with the small scale electronics that make modern technology function. It is a precise, innovative engineering career behind much of today's technology.

Day to day you design electronic circuits and systems, build and test prototypes, solve technical problems, and work with other engineers. You use specialist design and test tools, and much of the job is creating electronics that work reliably. The work is technical, analytical and detailed.

Most people enter with an accredited electronic engineering degree or a degree apprenticeship, and work towards chartered status with the IET. Technical skills and experience matter. Entry is accessible through several routes. From engineer you progress to senior and chartered engineer and specialist or leadership roles.

It suits inventive, analytical people with strong technical curiosity who enjoy detailed technical work and understanding how electronics function. You need technical and analytical skills and precision. It is a poor fit for those who dislike detail and maths or want non technical work.

Electronics is central to modern technology, from smart devices to electric vehicles and AI hardware, sustaining strong demand, and the field keeps advancing quickly. There is a recognised shortage of engineers. Demand is strong across technology and manufacturing.

The work is office and lab based, with generally reasonable hours. Graduate and early roles typically pay around £30k to £38k, rising to £50k to £70k and beyond as you specialise. Demand is strong across the technology sector.`,

  control_engineer: `A Control Engineer designs the systems that automatically control machines and processes, making sure they run smoothly, safely and precisely. You create the control systems behind everything from factory production lines to power plants and vehicles. It is a technical, analytical role central to automation and modern industry.

Day to day you design and program control systems, analyse how processes behave, tune systems for performance, and solve technical problems. You combine engineering with data and software, and much of the job is making systems behave exactly as needed. The work is technical, analytical and precise.

Most people enter with an accredited engineering degree, often electrical, or a degree apprenticeship, and work towards chartered status. Skills in control systems and software matter, and experience helps. Entry is accessible through several routes. From control engineer you progress to senior and specialist control and automation roles.

It suits inventive, analytical people with strong technical curiosity who enjoy making systems work precisely and combining engineering with data. You need technical and analytical skills and precision. It is a poor fit for those who dislike maths and detail or want non technical work.

Control engineering is central to the growth of automation and smart industry, and data, AI and connected systems keep expanding the field, supporting strong demand. Industry 4.0 raises the value of these skills. Demand is strong across industry.

The work is office, site and factory based, with generally reasonable hours. Graduate and early roles typically pay around £30k to £40k, rising to £50k to £70k and beyond as you specialise. Demand is strong across automated industries.`,

  manufacturing_engineer: `A Manufacturing Engineer designs and improves the processes and systems used to make products, making sure things are manufactured efficiently, reliably and to a high standard. You focus on how products are made rather than the products themselves. It is a practical, technical role at the heart of production.

Day to day you design and improve manufacturing processes, solve production problems, introduce new equipment and methods, and work with production teams. You use engineering and data to make manufacturing better, and much of the job is making production efficient and reliable. The work is technical, practical and analytical.

Most people enter with an accredited engineering degree or a degree apprenticeship, and work towards chartered status. Technical and problem solving skills matter, and experience helps. Entry is accessible through several routes and demand is strong. From engineer you progress to senior and lead manufacturing and management roles.

It suits inventive, analytical people with strong technical curiosity who enjoy improving how things are made and solving practical problems. You need technical and analytical skills and precision. It is a poor fit for those who dislike detail or want non technical work.

Manufacturing is being transformed by automation, robotics and digital technology, and there is renewed focus on advanced and reshored manufacturing, supporting strong demand for skilled engineers. Sustainability also shapes the field. Demand is strong across manufacturing.

The work is factory and office based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £36k, rising to £45k to £65k and beyond as you specialise. Demand is strong across manufacturing industries.`,

  production_engineer: `A Production Engineer keeps manufacturing running smoothly and efficiently, making sure products are made on time, to standard and at the right cost. You focus on the day to day running and improvement of production. It is a practical, hands on engineering role in manufacturing.

Day to day you oversee and improve production processes, solve problems on the line, support production teams, and work to improve efficiency, quality and output. You keep production running well, and much of the job is solving practical problems and improving how things are made. The work is technical, practical and fast paced.

Most people enter with an accredited engineering degree or a degree apprenticeship, and work towards chartered status. Technical and problem solving skills matter, and experience helps. Entry is accessible through several routes. From engineer you progress to senior production and management roles.

It suits practical, analytical people with strong technical curiosity who enjoy solving problems and improving production. You need technical skills, problem solving and the ability to work at pace. It is a poor fit for those who want desk based or purely theoretical work.

Production is being reshaped by automation, robotics and digital technology, and advanced manufacturing supports demand for skilled engineers. Efficiency and quality are ever more important. Demand is strong across manufacturing.

The work is factory based, with generally reasonable hours that can include shifts. Graduate and early roles typically pay around £28k to £36k, rising to £45k to £60k and beyond as you specialise. Demand is strong across manufacturing.`,

  quality_engineer: `A Quality Engineer makes sure products are made to the right standard, designing and running the checks and systems that keep quality high. You protect quality across manufacturing, finding and preventing problems before products reach customers. It is a precise, analytical role central to reliable manufacturing.

Day to day you develop quality standards and checks, test and inspect products and processes, investigate problems, and work with production teams to prevent defects. You use data and analysis to keep quality high, and much of the job is making sure products are consistently good. The work is analytical, precise and methodical.

Most people enter with an accredited engineering degree or a degree apprenticeship, and work towards chartered status, with quality qualifications valued. Technical and analytical skills matter. Entry is accessible through several routes. From quality engineer you progress to senior quality and management roles.

It suits analytical, organised people with precision who enjoy finding and preventing problems and take pride in getting things right. You need analytical skills, attention to detail and technical understanding. It is a poor fit for those who dislike detail or want fast, unstructured work.

Quality is increasingly supported by data, automation and AI, which help detect and prevent problems, raising the value of analysis and improvement. Reliable quality is essential to competitiveness. Demand is steady across manufacturing.

The work is factory and office based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £38k, rising to £45k to £60k and beyond as you specialise. Demand is steady across manufacturing.`,

  process_engineer: `A Process Engineer designs, runs and improves the processes used to make products or materials, especially in industries like chemicals, food, pharmaceuticals and energy. You make sure processes are efficient, safe and produce consistent results. It is a technical, analytical role central to industrial production.

Day to day you design and optimise processes, analyse performance and data, solve technical problems, and work to improve safety, efficiency and quality. You combine engineering science with hands on problem solving, and much of the job is making processes work better. The work is technical, analytical and practical.

Most people enter with an accredited engineering degree, often chemical or process engineering, or a degree apprenticeship, and work towards chartered status. Technical and analytical skills matter, and experience helps. Entry is accessible through several routes. From process engineer you progress to senior and lead process and management roles.

It suits inventive, analytical people with strong technical curiosity who enjoy understanding and improving how processes work. You need technical and analytical skills and precision. It is a poor fit for those who dislike maths and detail or want non technical work.

Process engineering is being shaped by automation, data and the shift towards cleaner, more sustainable production, including areas like hydrogen and green chemistry, supporting demand. Digital tools increasingly support the work. Demand is strong across process industries.

The work is site, plant and office based, with generally reasonable hours. Graduate and early roles typically pay around £30k to £40k, rising to £50k to £70k and beyond as you specialise. Demand is strong across process industries.`,

  industrial_engineer: `An Industrial Engineer improves how organisations work by making their systems, processes and operations more efficient and effective. You look at how people, machines, materials and information come together and find ways to make the whole system work better. It is an analytical role that combines engineering with a big picture view of operations.

Day to day you analyse and improve systems and processes, use data and modelling to find efficiencies, design better ways of working, and support their implementation. You look at the whole operation, and much of the job is making complex systems run more smoothly and cost effectively. The work is analytical, systematic and practical.

Most people enter with an accredited engineering degree or a degree apprenticeship, and work towards chartered status. Analytical and problem solving skills matter, and experience helps. Entry is accessible through several routes. From industrial engineer you progress to senior and management roles in operations and improvement.

It suits inventive, analytical people with technical curiosity who enjoy improving whole systems and solving problems with data. You need analytical skills, a systematic mind and good communication. It is a poor fit for those who dislike data and detail or want a narrow technical role.

Industrial engineering is increasingly powered by data, automation and AI, which raise the value of analysing and improving complex operations. Efficiency remains central to competitiveness. Demand is steady across manufacturing, logistics and services.

The work is office, factory and site based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £38k, rising to £45k to £65k and beyond as you specialise. Demand is steady across sectors that value efficiency.`,

  continuous_improvement_engineer: `A Continuous Improvement Engineer helps an organisation get steadily better at what it does, using proven methods to cut waste, raise quality and improve efficiency. You lead efforts to make processes leaner and more effective over time. It is a practical, results focused role dedicated to making things work better.

Day to day you analyse processes, identify waste and problems, lead improvement projects, and help teams adopt better ways of working using methods like lean. You combine analysis with change management, and much of the job is driving real, lasting improvement. The work is analytical, practical and collaborative.

Most people enter with an engineering or related degree, or a degree apprenticeship, and often gain qualifications in improvement methods like lean and six sigma. Analytical and people skills matter. Entry is accessible for the analytically minded. From improvement engineer you progress to senior improvement and operational excellence leadership.

It suits driven, analytical people who enjoy solving problems, improving things and working with others to make change happen. You need analytical skills, structure and good communication. It is a poor fit for those who dislike detail or resist change.

Continuous improvement is increasingly supported by data and digital tools, and the drive for efficiency and quality keeps demand steady. The methods apply across manufacturing and services alike. Demand is steady across sectors.

The work is factory, office and site based, with generally reasonable hours. Graduate and early roles typically pay around £30k to £40k, rising to £48k to £65k and beyond as you specialise. Demand is steady across sectors that pursue efficiency.`,

  systems_engineer: `A Systems Engineer takes a whole system view of complex projects, making sure all the parts, from hardware and software to processes and people, work together to meet the overall goal. You bring together many engineering disciplines to deliver complex systems that work as a whole. It is a coordinating, technical role central to big engineering projects.

Day to day you define requirements, design how a system fits together, coordinate different engineering teams, and make sure the parts integrate and the whole meets its goals. You keep the big picture in view, and much of the job is managing complexity so that everything works together. The work is technical, analytical and collaborative.

Most people enter with an engineering degree or a degree apprenticeship, often after experience in a specific engineering discipline, and work towards chartered status. Technical breadth and coordination skills matter. Entry usually follows some engineering experience. From systems engineer you progress to senior and lead systems and technical leadership roles.

It suits analytical, big picture people with strong technical curiosity who enjoy understanding whole systems and coordinating complex work. You need technical breadth, analytical skill and good communication. It is a poor fit for those who want narrow specialist work or dislike coordination.

Systems engineering is increasingly important as products and infrastructure grow more complex and connected, and digital tools like model based engineering support the work. Complex projects need skilled systems thinkers. Demand is strong in sectors like aerospace, defence and technology.

The work is office and site based, with generally reasonable hours. Graduate and early roles typically pay around £32k to £42k, rising to £55k to £80k and beyond as you specialise. Demand is strong in complex engineering sectors.`,

  integration_engineer: `An Integration Engineer makes sure the different parts of a complex system, such as hardware, software and subsystems, connect and work together properly. You bring the pieces together and get them functioning as one, then test that the whole system works. It is a technical, problem solving role essential to delivering complex systems.

Day to day you plan and carry out the integration of system components, test how they work together, find and fix problems, and work with the teams who built each part. You solve the tricky problems that arise when parts meet, and much of the job is making a whole system work reliably. The work is technical, analytical and collaborative.

Most people enter with an engineering degree or a degree apprenticeship, often after experience in a specific discipline, and work towards chartered status. Technical skills and problem solving matter. Entry usually follows some engineering experience. From integration engineer you progress to senior integration and systems roles.

It suits analytical, methodical people with strong technical curiosity who enjoy solving problems and getting complex things to work together. You need technical skills, problem solving and good collaboration. It is a poor fit for those who want narrow or purely theoretical work.

As systems grow more complex and connected, integration becomes ever more important, and digital tools support the work. Complex projects rely on skilled integration engineers. Demand is strong in sectors like aerospace, defence and technology.

The work is office, lab and site based, with generally reasonable hours. Graduate and early roles typically pay around £32k to £42k, rising to £55k to £75k and beyond as you specialise. Demand is strong in complex engineering sectors.`,

  robotics_engineer: `A Robotics Engineer designs and builds robots and robotic systems that can sense, move and carry out tasks, from factory robots to autonomous machines. You combine mechanical, electrical and software engineering to create machines that act in the world. It is a cutting edge, multidisciplinary engineering career.

Day to day you design robotic hardware and systems, program how robots behave, build and test prototypes, and solve complex technical problems across engineering and software. You bring together several disciplines, and much of the job is creating machines that work intelligently and reliably. The work is technical, inventive and challenging.

Most people enter with an engineering degree, often in robotics, mechanical, electrical or computing, sometimes a master's, or a degree apprenticeship. Skills across engineering and software matter, and projects help. Entry is competitive but the field is growing. From robotics engineer you progress to senior and specialist robotics and automation roles.

It suits inventive, analytical people with strong technical curiosity and originality who enjoy building intelligent machines and working across disciplines. You need broad technical skills, creativity and problem solving. It is a poor fit for those who dislike complexity or want narrow, non technical work.

Robotics is a fast growing field, driven by automation, AI and advances in hardware, with strong and rising demand across manufacturing, logistics and beyond. The technology keeps advancing quickly. Demand is strong and growing.

The work is lab, office and workshop based, with generally reasonable hours. Graduate and early roles typically pay around £32k to £42k, rising to £55k to £80k and beyond as you specialise. Demand is strong and growing across automated industries.`,

  automation_engineer: `An Automation Engineer designs and builds systems that automate tasks and processes, so machines and software can do work that people once did manually. You help organisations run faster, more reliably and more efficiently through automation. It is a technical role at the heart of modern, automated industry.

Day to day you design and program automated systems, integrate machinery and software, test and improve automation, and solve technical problems. You combine engineering with control and software skills, and much of the job is making processes run automatically and reliably. The work is technical, analytical and practical.

Most people enter with an engineering degree, often electrical, control or mechatronics, or a degree apprenticeship, and work towards chartered status. Skills in control systems and software matter, and experience helps. Entry is accessible through several routes. From automation engineer you progress to senior and specialist automation roles.

It suits inventive, analytical people with strong technical curiosity who enjoy building systems that work automatically and solving problems. You need technical skills across engineering and software and precision. It is a poor fit for those who dislike detail or want non technical work.

Automation is central to modern industry and growing fast, driven by the push for efficiency, robotics and AI, which supports strong demand. Industry 4.0 keeps expanding the field. Demand is strong and growing across industries.

The work is factory, site and office based, with generally reasonable hours. Graduate and early roles typically pay around £32k to £42k, rising to £55k to £75k and beyond as you specialise. Demand is strong and growing across automated industries.`,

  civil_engineer: `A Civil Engineer designs and helps build the infrastructure society depends on, from roads and bridges to railways, water systems and buildings. You help create the structures and systems that make modern life possible. It is a foundational engineering career with real, visible impact on the world.

Day to day you design infrastructure, analyse and plan projects, produce technical drawings and calculations, and work with construction teams, sometimes on site. You balance engineering, safety, cost and the environment, and much of the job is making sure infrastructure is safe, sound and well built. The work is technical, analytical and purpose driven.

Most people enter with an accredited civil engineering degree or a degree apprenticeship, and work towards chartered status with the ICE. Technical skills and experience matter. Entry is accessible through several routes and demand is strong. From civil engineer you progress to senior and chartered engineer and towards leading projects.

It suits analytical, purposeful people with strong technical curiosity who want to shape the built world and enjoy solving practical problems. You need technical and analytical skills, precision and collaboration. It is a poor fit for those who dislike maths and detail or want purely office based creative work.

Civil engineering is in strong demand, driven by infrastructure investment, and increasingly shaped by sustainability, climate resilience and digital tools. There is a recognised shortage of engineers. Demand is strong, supported by infrastructure needs.

The work mixes office and site, sometimes outdoors, with generally reasonable hours. Graduate and early roles typically pay around £28k to £35k, rising to £45k to £65k and beyond as you gain chartership and experience. Demand is strong across infrastructure.`,

  structural_engineer: `A Structural Engineer makes sure buildings and structures can safely bear the loads placed on them and stand up to the forces they face. You work out how structures should be built so they are safe, strong and stable. It is a precise, high responsibility engineering role central to safe construction.

Day to day you design and analyse structures, perform calculations, produce technical drawings, and work with architects and construction teams. You ensure structures are safe and sound, and much of the job is the careful analysis and design that keeps buildings standing safely. The work is technical, analytical and precise.

Most people enter with an accredited engineering degree or a degree apprenticeship, and work towards chartered status with the IStructE or ICE. Strong analytical skills and precision matter. Entry is accessible through several routes. From structural engineer you progress to senior and chartered engineer and leadership roles.

It suits inventive, analytical people with strong technical curiosity and precision who enjoy solving how structures work and take responsibility seriously. You need strong analytical skills, precision and attention to detail. It is a poor fit for those who dislike maths and detail or want low responsibility work.

Structural engineering is shaped by infrastructure and construction demand, and increasingly by sustainability, new materials and digital design tools. There is a recognised shortage of engineers. Demand is strong, supported by construction needs.

The work mixes office and site, with generally reasonable hours. Graduate and early roles typically pay around £28k to £36k, rising to £45k to £65k and beyond as you gain chartership and experience. Demand is strong across construction and infrastructure.`,

  site_engineer: `A Site Engineer provides the technical expertise on a construction site, making sure work is built correctly, safely and to the design. You are the engineer on the ground, setting out the work and solving technical problems as building happens. It is a hands on, practical engineering role at the heart of construction.

Day to day you set out and check construction work, interpret designs and drawings, solve technical problems on site, and ensure quality and safety. You work closely with site teams and designers, and much of the job is making sure what gets built matches the design and standards. The work is technical, practical and outdoors.

Most people enter with a civil or construction engineering degree or a degree apprenticeship, and work towards chartered status. Technical skills and a willingness to work on site matter. Entry is accessible through several routes and demand is strong. From site engineer you progress to senior site and project engineering and management roles.

It suits practical, resilient people with technical curiosity who enjoy hands on work and solving problems on site. You need technical skills, adaptability and the ability to work outdoors under pressure. It is a poor fit for those who want desk based work or dislike site conditions.

Construction faces skills shortages, keeping demand for site engineers strong, and digital tools increasingly support work on site. Sustainability and modern methods also shape the field. Demand is strong across construction.

The work is site based and outdoors in all conditions, often with early starts and long days. Graduate and early roles typically pay around £30k to £38k, rising to £45k to £65k and beyond as you progress. Demand is strong, supported by construction skills shortages.`,

  asset_engineer: `An Asset Engineer looks after physical assets like infrastructure, plant and equipment over their whole life, making sure they perform well, last long and are maintained cost effectively. You manage the engineering side of valuable assets so they keep working reliably. It is a technical, strategic role in infrastructure and industry.

Day to day you monitor and analyse how assets are performing, plan maintenance and improvements, use data to predict problems, and help decide when to repair, replace or upgrade. You take a long term view of assets, and much of the job is keeping them reliable and getting the best value from them. The work is technical, analytical and strategic.

Most people enter with an engineering degree or a degree apprenticeship, often after experience in maintenance or engineering, and work towards chartered status. Technical and analytical skills matter. Entry usually follows some engineering experience. From asset engineer you progress to senior asset management and engineering leadership.

It suits analytical, technically curious people who enjoy taking a long term, data informed view of engineering and solving problems. You need technical and analytical skills and good judgement. It is a poor fit for those who want hands on only or short term focused work.

Asset management is increasingly powered by data, sensors and predictive analytics, which help get more from infrastructure and equipment, supporting demand. Ageing infrastructure raises the need for skilled asset engineers. Demand is steady across infrastructure and industry.

The work mixes office and site, with generally reasonable hours. Graduate and early roles typically pay around £32k to £42k, rising to £50k to £70k and beyond as you specialise. Demand is steady across infrastructure and industry.`,

  maintenance_engineer: `A Maintenance Engineer keeps machinery, equipment and systems working, fixing problems and carrying out maintenance to prevent breakdowns. You make sure the equipment an organisation relies on keeps running reliably. It is a practical, hands on engineering role essential to keeping things working.

Day to day you inspect, service and repair equipment, diagnose and fix faults, carry out planned maintenance, and respond to breakdowns. You solve problems quickly to keep things running, and much of the job is keeping machinery and systems reliable and safe. The work is technical, practical and hands on.

Most people enter with an engineering qualification, an apprenticeship, or by working up from a technician role, and practical skills matter more than a specific degree. Entry is accessible, especially through apprenticeships. From maintenance engineer you progress to senior maintenance, reliability and management roles.

It suits practical, resilient people with technical curiosity who enjoy fixing things and solving problems hands on. You need practical technical skills, problem solving and reliability. It is a poor fit for those who want desk based or purely theoretical work.

Maintenance is being changed by data, sensors and predictive techniques that help prevent breakdowns before they happen, raising the value of skilled engineers who can work with these tools. Reliable equipment is always needed. Demand is steady across industry.

The work is site and factory based, sometimes on shifts or call out, in varied conditions. Graduate and early roles typically pay around £30k to £40k, rising to £45k to £60k and beyond as you specialise. Demand is steady across industry.`,

  reliability_engineer: `A Reliability Engineer works to make sure equipment and systems are as dependable as possible, analysing why things fail and finding ways to prevent it. You use data and engineering to improve reliability and reduce breakdowns. It is an analytical, preventative role focused on keeping things running.

Day to day you analyse equipment performance and failures, identify causes of unreliability, design improvements and maintenance strategies, and use data to predict and prevent problems. You take a systematic, data driven approach, and much of the job is improving reliability over time. The work is analytical, technical and strategic.

Most people enter with an engineering degree or a degree apprenticeship, often after experience in maintenance or engineering, and work towards chartered status. Analytical and technical skills matter. Entry usually follows some engineering experience. From reliability engineer you progress to senior reliability and asset management roles.

It suits analytical, technically curious people who enjoy solving problems with data and improving how things work over time. You need analytical and technical skills and attention to detail. It is a poor fit for those who want purely hands on or short term focused work.

Reliability engineering is increasingly powered by data, sensors and predictive analytics, which are transforming how failures are prevented, supporting strong demand. Industry increasingly values preventing problems over fixing them. Demand is strong across industry.

The work mixes office and site, with generally reasonable hours. Graduate and early roles typically pay around £35k to £45k, rising to £55k to £75k and beyond as you specialise. Demand is strong across industry.`,

  aerospace_engineer: `An Aerospace Engineer designs and develops aircraft, spacecraft and their systems, working at the cutting edge of engineering where performance and safety are critical. You help create machines that fly, from airliners to satellites and defence systems. It is a demanding, high technology engineering career.

Day to day you design and analyse aerospace systems and components, run simulations and tests, solve complex technical problems, and work with specialist teams. You work to exacting standards where safety is paramount, and much of the job is precise, advanced engineering. The work is technical, analytical and rigorous.

Most people enter with an accredited aerospace or mechanical engineering degree, sometimes a master's, or a degree apprenticeship, and work towards chartered status. Strong technical skills matter, and internships help. Entry is competitive. From engineer you progress to senior and specialist aerospace and leadership roles.

It suits inventive, analytical people with strong technical curiosity and originality who are drawn to flight and advanced engineering. You need strong technical and analytical skills and precision. It is a poor fit for those who dislike maths and detail or want less demanding work.

Aerospace is shaped by advances in materials, electric and sustainable flight, space and defence, keeping the field innovative, and there is steady demand for skilled engineers. New technologies keep expanding the field. Demand is steady across aerospace and defence.

The work is office, lab and site based, with generally reasonable hours. Graduate and early roles typically pay around £30k to £38k, rising to £50k to £75k and beyond as you specialise. Demand is steady across aerospace and defence.`,

  chemical_engineer: `A Chemical Engineer designs and runs the processes that turn raw materials into useful products, from fuels and medicines to food and materials. You work out how to make things at scale, safely, efficiently and cleanly. It is a demanding, well rewarded engineering career central to many industries.

Day to day you design and optimise chemical processes and plant, analyse performance and data, solve technical problems, and ensure processes are safe and efficient. You combine chemistry with engineering, and much of the job is making industrial processes work well at scale. The work is technical, analytical and rigorous.

Most people enter with an accredited chemical engineering degree, sometimes a master's, or a degree apprenticeship, and work towards chartered status with the IChemE. Strong technical skills matter, and internships help. Entry is competitive but demand is strong. From engineer you progress to senior and specialist process and leadership roles.

It suits inventive, analytical people with strong technical curiosity who enjoy understanding and improving processes and solving complex problems. You need strong technical and analytical skills and precision. It is a poor fit for those who dislike maths and detail or want non technical work.

Chemical engineering is being reshaped by the shift to sustainable and clean production, including hydrogen, renewables and green chemistry, creating strong demand for skilled engineers. The field is central to the energy transition. Demand is strong and evolving.

The work is site, plant and office based, with generally reasonable hours. Graduate and early roles typically pay around £32k to £42k, rising to £55k to £80k and beyond as you specialise. Demand is strong across process and energy industries.`,

  process_safety_engineer: `A Process Safety Engineer works to prevent major accidents in industries that handle hazardous materials or processes, making sure plants and processes are designed and run safely. You protect people, the environment and communities from serious industrial hazards. It is a high responsibility engineering role where safety is everything.

Day to day you assess process hazards and risks, design and check safety systems, investigate incidents, and make sure processes meet strict safety standards and regulations. You combine engineering with rigorous risk analysis, and much of the job is preventing rare but serious accidents. The work is analytical, rigorous and high stakes.

Most people enter with a chemical or process engineering degree, often after experience in process engineering, and work towards chartered status with specialist safety knowledge. Strong technical and analytical skills matter. Entry usually follows some engineering experience. From process safety engineer you progress to senior and lead safety roles.

It suits analytical, responsible people with resilience who take safety seriously and enjoy rigorous problem solving. You need strong analytical skills, attention to detail and sound judgement. It is a poor fit for those who dislike responsibility and detail or want fast, unstructured work.

Process safety is essential in hazardous industries and shaped by tightening regulation and by the growth of new processes like hydrogen and clean energy, which support strong demand. Skilled safety engineers are highly valued. Demand is strong across process and energy industries.

The work is site, plant and office based, with generally reasonable hours. Graduate and early roles typically pay around £35k to £48k, rising to £60k to £90k and beyond as you specialise. Demand is strong across hazardous and process industries.`,

  // ── Health Care & Clinical Practice ─────────────────────────────────────
  foundation_doctor: `A Foundation Doctor is a newly qualified doctor in their first two years of practice, working in hospitals under supervision while building their skills. You put your medical training into practice, caring for patients across different specialties. It is the crucial first stage of a doctor's career.

Day to day you assess and treat patients, order and interpret tests, carry out procedures, and work as part of a medical team, rotating through different areas of medicine. You learn on the job under supervision, and much of the job is hands on patient care while developing as a doctor. The work is demanding, varied and deeply purposeful.

You reach this stage after a medical degree, which takes around five to six years and is very competitive to get into, followed by entry to the two year Foundation Programme. Medical school and foundation places are limited and sought after. From foundation training you progress into specialty training towards becoming a GP, hospital doctor or specialist.

It suits caring, resilient people with a drive for mastery who want to help patients and can cope with pressure and long hours. You need strong knowledge, resilience, teamwork and compassion. It is a poor fit for those who want predictable hours or dislike high pressure, high responsibility work.

Medicine faces workforce shortages and rising demand, so doctors are in strong demand, while technology and AI increasingly support diagnosis and care. Pressures on the health service are significant. Demand for doctors is strong and enduring.

The work is hospital based, including nights, weekends and long shifts, on NHS pay scales. Foundation doctors typically earn around £32k to £37k, rising as they progress through training. Demand for doctors is strong across the health service.`,

  general_practitioner: `A General Practitioner, or GP, is a family doctor who is often the first point of contact for people's health concerns, treating a huge range of conditions in the community. You care for patients of all ages, from minor illnesses to long term conditions, and coordinate their wider care. It is a varied, people centred branch of medicine at the heart of the community.

Day to day you see patients in appointments, diagnose and treat a wide range of conditions, manage long term illnesses, and refer to specialists when needed. You build ongoing relationships with patients and families, and much of the job is caring for whole people over time. The work is varied, sociable and demanding.

You become a GP after a medical degree, foundation training, and specialty training in general practice, several years of training in total. Entry to medicine and training is competitive. Once qualified you work as a GP, and can move into partnership, leadership, teaching or special interests.

It suits caring, sociable people with strong people skills who enjoy variety and building relationships with patients. You need broad knowledge, good communication, resilience and empathy. It is a poor fit for those who want to specialise narrowly or dislike constant patient contact.

General practice faces significant workforce shortages and rising demand, so GPs are in strong demand, while technology increasingly supports consultations and care. Pressures on the profession are considerable. Demand for GPs is strong and enduring.

The work is practice based, with generally more predictable hours than hospital medicine, on GP pay arrangements. GPs typically earn from around £70k, rising well above that for partners and experienced doctors. Demand for GPs is strong across the country.`,

  hospital_doctor: `A Hospital Doctor cares for patients in hospital, diagnosing and treating illness while training towards a specialty. You work within a hospital team to look after patients who need investigation, treatment or ongoing care. It is a demanding, varied stage of a doctor's career on the way to becoming a specialist.

Day to day you assess and treat patients, order and interpret investigations, carry out procedures, and work with senior doctors and the wider team. You often work in a particular area of medicine as you train, and much of the job is hands on patient care and clinical decision making. The work is intellectual, caring and demanding.

You reach this stage after a medical degree and foundation training, then enter specialty training in a chosen area. Entry to medicine and to competitive specialties is demanding. From here you progress through specialty training towards becoming a consultant or specialist doctor.

It suits caring, analytical people with a drive for mastery who enjoy solving clinical problems and want to help patients. You need strong knowledge, resilience, teamwork and compassion. It is a poor fit for those who want predictable hours or dislike high pressure work.

Medicine faces workforce shortages and rising demand, so doctors are in strong demand, and technology and AI increasingly support diagnosis and treatment. Pressures on the health service are significant. Demand for doctors is strong and enduring.

The work is hospital based, including nights, weekends and long shifts, on NHS pay scales. Doctors in training typically earn from around £37k, rising to £50k and beyond as they progress. Demand for doctors is strong across the health service.`,

  consultant_physician: `A Consultant Physician is a senior hospital doctor and expert in a particular area of medicine, leading the care of patients and the medical team. You have completed full specialty training and take ultimate responsibility for patients in your field. It is the senior, expert level of hospital medicine.

Day to day you lead patient care, make complex diagnostic and treatment decisions, supervise and teach junior doctors, and often contribute to research and service development. You are the expert others turn to, and much of the job is leading care and applying deep specialist knowledge. The work is intellectual, responsible and rewarding.

You become a consultant after a medical degree, foundation training and full specialty training, often more than a decade in total. The path is long and demanding. As a consultant you can further specialise, lead services, teach and research, and take on senior leadership.

It suits analytical, expert minded people with a strong drive for mastery who enjoy leading care and complex decision making. You need deep knowledge, sound judgement, leadership and compassion. It is a poor fit for those who want a quick route or dislike responsibility.

Medicine faces workforce shortages and rising demand, so consultants are in strong demand, and technology and AI increasingly support specialist care. Pressures on the health service are significant. Demand for consultants is strong.

The work is hospital based, with senior responsibilities that can include on call, on consultant pay scales. Consultants typically earn from around £93k, rising above £120k with experience, plus possible additional roles. Demand for consultants is strong.`,

  surgeon: `A Surgeon treats illness, injury and disease through operations, using precise technical skill to repair, remove or improve parts of the body. You combine deep medical knowledge with hands on operative skill to help patients, often dramatically. It is one of the most demanding and respected branches of medicine.

Day to day you assess patients, plan and perform operations, provide care before and after surgery, and work within a surgical team. You combine judgement with fine technical skill, and much of the job is the operations themselves plus the care around them. The work is precise, high pressure and deeply rewarding.

You become a surgeon after a medical degree, foundation training and lengthy surgical specialty training, well over a decade in total. Entry and progression are highly competitive. From training you become a consultant surgeon, and can further specialise, lead and teach.

It suits precise, driven people with a strong drive for mastery and achievement who enjoy technical skill and can handle pressure and responsibility. You need dexterity, resilience, sound judgement and stamina. It is a poor fit for those who want predictable hours or dislike high stakes work.

Surgery is advancing with minimally invasive, robotic and image guided techniques, and there is strong demand amid workforce pressures and long waiting lists. Technology keeps changing how surgery is done. Demand for surgeons is strong.

The work is hospital and theatre based, including on call and long hours, on NHS and consultant pay scales. Surgeons in training earn from around £37k, rising to consultant pay above £93k. Demand for surgeons is strong.`,

  surgical_trainee: `A Surgical Trainee is a doctor training to become a surgeon, learning operative skills and surgical care under the supervision of experienced surgeons. You develop the knowledge and technical skill needed to operate independently. It is a demanding, ambitious stage on the path to becoming a surgeon.

Day to day you assist in and perform operations under supervision, care for surgical patients, carry out procedures, and learn the craft of surgery within a team. You build technical skill over years of practice, and much of the job is hands on surgical training alongside patient care. The work is precise, demanding and rewarding.

You reach this stage after a medical degree and foundation training, then enter competitive surgical specialty training. Progression depends on skill, exams and experience. From surgical training you become a consultant surgeon.

It suits precise, driven people with a strong drive for mastery and achievement who enjoy technical work and can handle pressure. You need dexterity, resilience, determination and sound judgement. It is a poor fit for those who want predictable hours or dislike high stakes, competitive work.

Surgery is advancing with new techniques and technology, and there is strong demand amid workforce pressures. Training is competitive and demanding. Demand for surgeons is strong.

The work is hospital and theatre based, including on call and long hours, on NHS pay scales. Surgical trainees earn from around £37k, rising as they progress towards consultant pay. Demand for surgeons is strong.`,

  consultant_surgeon: `A Consultant Surgeon is a senior, fully trained surgeon who leads surgical care and takes ultimate responsibility for patients undergoing surgery. You bring expert operative skill and judgement to the most complex cases and lead the surgical team. It is the senior, expert level of surgical practice.

Day to day you perform complex operations, make key decisions about surgical care, lead and teach the surgical team, and often contribute to research and service development. You are the expert others rely on, and much of the job is leading and delivering surgical care at the highest level. The work is precise, high responsibility and rewarding.

You become a consultant surgeon after a medical degree, foundation training and full surgical specialty training, well over a decade in total. The path is long and highly competitive. As a consultant you can further specialise, lead services, teach and research.

It suits precise, driven people with a strong drive for mastery and achievement who enjoy leading and can handle high responsibility. You need excellent technical skill, judgement, leadership and resilience. It is a poor fit for those who want a quick route or dislike pressure.

Surgery is advancing with robotic and minimally invasive techniques, and there is strong demand amid workforce pressures and waiting lists. Technology keeps changing surgical practice. Demand for consultant surgeons is strong.

The work is hospital and theatre based, with senior responsibilities including on call, on consultant pay scales. Consultant surgeons typically earn from around £93k, rising above £120k with experience. Demand is strong.`,

  emergency_medicine_doctor: `An Emergency Medicine Doctor cares for patients with urgent and life threatening conditions in the emergency department, making fast decisions when it matters most. You assess and treat whatever comes through the door, from minor injuries to major emergencies. It is a fast paced, high pressure branch of medicine for those who thrive on variety and urgency.

Day to day you rapidly assess and treat patients, make quick decisions, carry out procedures, and coordinate care with many teams. You never know what will come next, and much of the job is thinking and acting fast to stabilise and treat patients. The work is intense, varied and deeply purposeful.

You become an emergency doctor after a medical degree, foundation training and specialty training in emergency medicine. Entry to medicine and training is competitive. From training you become a consultant in emergency medicine, and can lead, teach and specialise.

It suits energetic, resilient people who thrive on pace and variety and want to help people in crisis. You need quick thinking, calm under pressure, resilience and compassion. It is a poor fit for those who want predictable, slow paced work or dislike uncertainty.

Emergency departments face high demand and pressure, so emergency doctors are in strong demand, and technology increasingly supports urgent care. The work is intense but vital. Demand for emergency doctors is strong.

The work is hospital based, including nights, weekends and shifts, on NHS pay scales. Doctors in training earn from around £37k, rising to consultant pay above £93k. Demand is strong amid pressure on emergency services.`,

  anaesthetist: `An Anaesthetist keeps patients safe, pain free and stable during operations and other procedures, carefully managing their body's vital functions. You put patients to sleep or numb them for surgery and watch over them closely throughout. It is a precise, high responsibility branch of medicine where vigilance is everything.

Day to day you assess patients before procedures, plan and give anaesthesia, monitor and adjust their condition during surgery, and manage pain and recovery. You keep patients safe through critical moments, and much of the job is careful, expert control of the body under anaesthesia. The work is precise, vigilant and vital.

You become an anaesthetist after a medical degree, foundation training and specialty training in anaesthesia. Entry to medicine and training is competitive. From training you become a consultant anaesthetist, and can specialise in areas like intensive care or pain.

It suits calm, precise people with a drive for mastery who enjoy careful monitoring and can handle high responsibility. You need vigilance, technical skill, sound judgement and calm under pressure. It is a poor fit for those who want a highly social role or dislike sustained concentration.

Anaesthesia is essential to surgery and advancing with new techniques and monitoring, and there is strong demand amid workforce pressures. Technology increasingly supports the work. Demand for anaesthetists is strong.

The work is hospital and theatre based, including on call, on NHS pay scales. Doctors in training earn from around £37k, rising to consultant pay above £93k. Demand for anaesthetists is strong.`,

  intensive_care_doctor: `An Intensive Care Doctor looks after the most seriously ill patients, whose lives depend on constant support and monitoring. You care for people who are critically unwell, managing complex problems across the whole body. It is one of the most demanding and vital areas of medicine.

Day to day you assess and treat critically ill patients, manage life support and complex treatments, make urgent decisions, and lead and coordinate the intensive care team. You care for people at their most vulnerable, and much of the job is intensive, high stakes management of critical illness. The work is intense, complex and deeply purposeful.

You become an intensive care doctor after a medical degree, foundation training and specialty training, often combined with anaesthesia or medicine. Entry and training are competitive. From training you become a consultant in intensive care.

It suits caring, resilient people with strong analytical skills who can handle pressure and want to help the sickest patients. You need deep knowledge, resilience, teamwork and sound judgement. It is a poor fit for those who want predictable, low pressure work or find critical illness distressing.

Intensive care faces high demand and pressure, highlighted in recent years, so these doctors are in strong demand, and technology increasingly supports critical care. The work is demanding but vital. Demand is strong.

The work is hospital based, including nights, weekends and long shifts, on NHS pay scales. Doctors in training earn from around £37k, rising to consultant pay above £93k. Demand is strong.`,

  acute_medicine_doctor: `An Acute Medicine Doctor looks after patients who become suddenly and seriously unwell and are admitted to hospital, providing rapid assessment and treatment in the crucial early stages. You care for a wide range of urgent medical problems at the point of admission. It is a fast paced, varied branch of hospital medicine.

Day to day you rapidly assess newly admitted patients, diagnose and start treatment, make decisions about their care, and work with many teams. You handle a broad range of conditions at pace, and much of the job is sorting out and stabilising acutely unwell patients. The work is varied, fast paced and purposeful.

You become an acute medicine doctor after a medical degree, foundation training and specialty training. Entry to medicine and training is competitive. From training you become a consultant in acute medicine, and can lead and specialise.

It suits caring, quick thinking people who enjoy variety and pace and want to help acutely unwell patients. You need broad knowledge, quick decision making, resilience and teamwork. It is a poor fit for those who want a narrow specialty or a slow, predictable pace.

Acute medicine faces high demand as hospital admissions rise, so these doctors are in strong demand, and technology increasingly supports acute care. The work is busy but vital. Demand is strong.

The work is hospital based, including nights, weekends and shifts, on NHS pay scales. Doctors in training earn from around £37k, rising to consultant pay above £93k. Demand is strong.`,

  psychiatrist: `A Psychiatrist is a doctor who specialises in mental health, diagnosing and treating conditions like depression, anxiety, psychosis and more. You help people with mental illness through a combination of medical understanding, therapy and care. It is a deeply human branch of medicine focused on the mind.

Day to day you assess patients' mental health, diagnose conditions, plan and provide treatment including medication and therapy, and work with mental health teams. You build understanding of each person, and much of the job is caring for people through mental illness. The work is analytical, caring and demanding.

You become a psychiatrist after a medical degree, foundation training and specialty training in psychiatry. Entry to medicine is competitive, and psychiatry offers a valued, growing path. From training you become a consultant psychiatrist, and can specialise in areas like child, forensic or old age psychiatry.

It suits caring, analytical people with empathy who want to help people with mental illness and are comfortable with complex, human problems. You need strong knowledge, empathy, resilience and good communication. It is a poor fit for those who want purely physical medicine or find mental distress hard to sit with.

Mental health need is high and rising, and psychiatry faces workforce shortages, so psychiatrists are in strong demand, with growing recognition of mental health. New treatments and approaches keep developing. Demand is strong.

The work is hospital and community based, with generally more predictable hours than some specialties, on NHS pay scales. Doctors in training earn from around £37k, rising to consultant pay above £93k. Demand is strong.`,

  child_adolescent_psychiatrist: `A Child and Adolescent Psychiatrist is a doctor who specialises in the mental health of children and young people, helping them and their families through emotional and psychological difficulties. You support young people with conditions from anxiety and depression to more complex disorders. It is a caring, specialist branch of medicine focused on young minds.

Day to day you assess children and young people's mental health, diagnose and treat conditions, work with families, schools and other services, and provide therapy and medication as needed. You care for young people at a crucial stage of life, and much of the job is understanding and helping them and their families. The work is caring, complex and rewarding.

You become a child and adolescent psychiatrist after a medical degree, foundation training and psychiatry specialty training with a focus on young people. Entry to medicine is competitive. From training you become a consultant in this field.

It suits caring, empathetic people who want to help young people and are comfortable with complex family and developmental issues. You need empathy, strong knowledge, resilience and good communication. It is a poor fit for those who find young people's distress hard to manage or want purely physical medicine.

Children's mental health need has risen sharply, and services face shortages, so these specialists are in strong demand. Awareness of young people's mental health is growing. Demand is strong and rising.

The work is clinic and community based, with generally reasonable hours, on NHS pay scales. Doctors in training earn from around £37k, rising to consultant pay above £93k. Demand is strong and growing.`,

  forensic_psychiatrist: `A Forensic Psychiatrist is a doctor who works at the meeting point of mental health and the law, assessing and treating people with mental illness who are involved with the justice system. You care for patients in secure settings and advise courts on mental health. It is a specialist, high responsibility branch of psychiatry.

Day to day you assess and treat patients, often in secure hospitals or prisons, manage risk, prepare reports for courts, and work with legal and mental health teams. You combine clinical care with careful risk assessment, and much of the job is treating mental illness while managing safety and legal issues. The work is analytical, caring and high stakes.

You become a forensic psychiatrist after a medical degree, foundation training and psychiatry specialty training with a forensic focus. Entry to medicine is competitive. From training you become a consultant forensic psychiatrist.

It suits analytical, caring people with resilience who are interested in mental health and the law and can handle challenging situations. You need strong knowledge, sound judgement, resilience and empathy. It is a poor fit for those who find risk and challenging behaviour hard or want a low pressure role.

Forensic psychiatry is a specialist field with steady demand, shaped by mental health and justice policy, and there are workforce pressures across psychiatry. The work is demanding but valued. Demand is steady to strong.

The work is in secure hospitals, prisons and clinics, with generally reasonable hours that can include on call, on NHS pay scales. Doctors in training earn from around £37k, rising to consultant pay above £93k. Demand is steady to strong.`,

  clinical_radiologist: `A Clinical Radiologist is a doctor who uses medical images, such as X rays, scans and ultrasound, to diagnose disease and guide treatment. You interpret images to find out what is wrong inside the body and sometimes carry out image guided procedures. It is a highly analytical, technology rich branch of medicine.

Day to day you interpret medical images, produce reports for other doctors, carry out and oversee scans, and sometimes perform minimally invasive procedures guided by imaging. You solve diagnostic puzzles from images, and much of the job is careful, expert interpretation that guides care. The work is analytical, precise and technical.

You become a radiologist after a medical degree, foundation training and specialty training in radiology. Entry to medicine and to radiology is competitive. From training you become a consultant radiologist, and can specialise in areas like interventional radiology.

It suits analytical, precise people with a drive for mastery who enjoy solving diagnostic problems and working with technology. You need strong analytical skills, attention to detail and sound judgement. It is a poor fit for those who want lots of direct patient contact or dislike detailed image work.

Radiology is being transformed by AI, which increasingly helps analyse images, while demand for imaging keeps rising and there are workforce shortages. The role is evolving to work alongside these tools. Demand for radiologists is strong.

The work is hospital based, often at a workstation, with generally reasonable hours that can include on call, on NHS pay scales. Doctors in training earn from around £37k, rising to consultant pay above £93k. Demand is strong.`,

  pathologist: `A Pathologist is a doctor who studies disease in the laboratory, examining tissues, cells and samples to diagnose illness and guide treatment. You are the detective behind many diagnoses, working out what is wrong from samples taken from patients. It is an analytical, behind the scenes branch of medicine essential to diagnosis.

Day to day you examine tissue and cell samples under the microscope and with lab tests, diagnose diseases including cancer, produce reports, and advise other doctors. You provide the diagnoses that guide treatment, and much of the job is careful, expert analysis of samples. The work is analytical, precise and vital.

You become a pathologist after a medical degree, foundation training and specialty training in a branch of pathology. Entry to medicine is competitive. From training you become a consultant pathologist, and can specialise in areas like histopathology.

It suits analytical, precise people with a drive for mastery who enjoy detailed diagnostic work and solving problems. You need strong analytical skills, precision and sound judgement. It is a poor fit for those who want lots of direct patient contact or dislike lab based work.

Pathology is central to diagnosis and being changed by digital pathology and AI, which help analyse samples, while demand rises and there are workforce shortages. The field is evolving with technology. Demand for pathologists is strong.

The work is laboratory based, with generally reasonable hours, on NHS pay scales. Doctors in training earn from around £37k, rising to consultant pay above £93k. Demand is strong.`,

  clinical_geneticist: `A Clinical Geneticist is a doctor who specialises in conditions caused by genes and inheritance, helping patients and families understand and manage genetic conditions. You diagnose genetic disorders, advise families, and guide care as genetic medicine transforms healthcare. It is a cutting edge, deeply human branch of medicine.

Day to day you assess patients and families, interpret genetic tests, diagnose genetic conditions, and counsel families about risks and options. You combine advanced science with sensitive family care, and much of the job is understanding and explaining complex genetic information. The work is analytical, caring and increasingly high tech.

You become a clinical geneticist after a medical degree, foundation training and specialty training in genetics. Entry to medicine is competitive. From training you become a consultant clinical geneticist.

It suits analytical, caring people with a drive for mastery who are fascinated by genetics and enjoy combining science with patient care. You need strong knowledge, analytical skill, precision and empathy. It is a poor fit for those who dislike complex science or want fast paced acute work.

Genomics is transforming medicine, making clinical genetics a fast growing and exciting field, with rising demand and new possibilities as genetic testing expands. The science advances rapidly. Demand is strong and growing.

The work is clinic and lab based, with generally reasonable hours, on NHS pay scales. Doctors in training earn from around £37k, rising to consultant pay above £93k. Demand is strong and growing.`,

  medical_microbiologist: `A Medical Microbiologist is a doctor who specialises in infections, identifying the microbes that cause disease and advising on how to treat and prevent them. You help diagnose infections and guide the right use of antibiotics and infection control. It is a vital branch of medicine, especially important in an age of new and resistant infections.

Day to day you oversee tests that identify infections, advise doctors on treatment and antibiotics, help control the spread of infection, and work with laboratory and clinical teams. You guide the fight against infection, and much of the job is expert advice on diagnosing and treating it. The work is analytical, collaborative and vital.

You become a medical microbiologist after a medical degree, foundation training and specialty training in microbiology. Entry to medicine is competitive. From training you become a consultant medical microbiologist.

It suits analytical, curious people with a drive for mastery who are interested in infection and enjoy combining lab science with clinical advice. You need strong knowledge, analytical skill and good communication. It is a poor fit for those who want lots of hands on patient care or dislike lab based work.

Concern about antibiotic resistance and new infections, underlined by recent pandemics, keeps this field important, with steady demand and workforce pressures. The work is increasingly vital. Demand is strong.

The work is laboratory and hospital based, with generally reasonable hours that can include on call, on NHS pay scales. Doctors in training earn from around £37k, rising to consultant pay above £93k. Demand is strong.`,

  public_health_doctor: `A Public Health Doctor works to protect and improve the health of whole populations rather than treating individual patients, tackling the causes of ill health across communities. You use medicine, data and policy to prevent disease and reduce health inequalities. It is a strategic, purpose driven branch of medicine focused on the bigger picture.

Day to day you analyse health data, plan and lead programmes to improve health, advise on policy, and respond to health threats. You look at what makes populations healthy or unwell, and much of the job is preventing illness and improving health at scale. The work is analytical, strategic and deeply purposeful.

You become a public health doctor after a medical degree, foundation training and specialty training in public health, though the field is also open to non medical specialists. Entry to medicine is competitive. From training you become a consultant in public health, and can lead services and shape policy.

It suits analytical, purposeful people who want to improve health at a population level and enjoy combining data, medicine and policy. You need strong analytical skills, a big picture view and good communication. It is a poor fit for those who want hands on patient care or dislike policy and data.

Public health has been highlighted by recent pandemics and by challenges like inequality and chronic disease, keeping demand steady and the field visible. Data increasingly drives the work. Demand is steady and valued.

The work is office and community based, with generally reasonable hours, on NHS or public sector pay scales. Doctors in training earn from around £37k, rising to consultant pay above £93k. Demand is steady across public health.`,

  health_protection_specialist: `A Health Protection Specialist works to protect communities from threats to their health, such as infectious diseases, environmental hazards and emergencies. You help prevent, detect and respond to dangers that could harm public health. It is a vital, sometimes urgent role focused on keeping populations safe.

Day to day you monitor and investigate health threats, coordinate responses to outbreaks and hazards, advise on prevention and control, and work with many agencies. You act to stop threats spreading, and much of the job is preventing and managing risks to public health. The work is analytical, collaborative and sometimes urgent.

Most people enter through a public health or scientific background, sometimes as doctors and sometimes as specialists from other fields, with relevant training in health protection. Analytical and coordination skills matter. Entry is competitive and varied. From specialist you progress to senior and consultant level health protection roles.

It suits analytical, purposeful people who can stay calm under pressure and want to protect communities. You need analytical skills, sound judgement, resilience and good communication. It is a poor fit for those who want hands on clinical care or dislike coordination and data.

Recent pandemics and ongoing threats from infections, climate and the environment have raised the profile and importance of health protection, supporting demand. The field is increasingly vital. Demand is steady to strong.

The work is office and field based, with hours that can spike during incidents, on public sector pay scales. Pay varies with background and level, typically from around £40k rising well above with seniority. Demand is steady to strong.`,

  health_policy_doctor: `A Health Policy Doctor uses medical knowledge to shape the policies and decisions that affect health and healthcare, working at the level of systems and government rather than individual patients. You help design better health policy grounded in medical understanding. It is a strategic, influential role at the meeting point of medicine and policy.

Day to day you research and analyse health issues, advise on policy, develop proposals, and work with policymakers, clinicians and others. You bring clinical insight to big decisions, and much of the job is shaping how healthcare and health are organised and improved. The work is analytical, strategic and purpose driven.

Most people reach this role as doctors who develop an interest and expertise in policy, sometimes through additional study, or via public health training. Clinical credibility and analytical skills matter. Entry usually builds on a medical background. From here you progress into senior policy and leadership roles.

It suits analytical, visionary people who want to improve health at a system level and enjoy combining medicine with policy and ideas. You need analytical skills, clear thinking and good communication. It is a poor fit for those who want hands on care or dislike policy and politics.

Health systems face big challenges around funding, ageing populations and technology, keeping health policy important and in need of clinical insight. The field is influential but shaped by politics. Demand is steady in this specialist area.

The work is office based, with generally reasonable hours, on relevant pay scales. Pay varies with background, typically strong given the medical qualification and seniority. Demand is steady in a specialist niche.`,

  clinical_research_fellow: `A Clinical Research Fellow is a doctor who dedicates a period to research, investigating diseases and treatments to advance medical knowledge, usually alongside or within their clinical training. You help discover new understanding that can improve care. It is a role for doctors with a passion for research and discovery.

Day to day you design and carry out research, run studies and trials, analyse results, and write papers, often working towards a research degree. You contribute to advancing medicine, and much of the job is rigorous investigation alongside some clinical work. The work is analytical, independent and curiosity driven.

You become a research fellow as a doctor, after gaining clinical experience, often taking time within specialty training to research, frequently towards a PhD. Entry is competitive and depends on academic interest. From here you may pursue an academic medical career or return to clinical practice enriched by research.

It suits curious, analytical doctors with a drive for mastery who love research and discovery. You need strong analytical skills, curiosity and persistence, alongside clinical ability. It is a poor fit for those who want purely clinical work or dislike research.

Medical research is vital and advancing rapidly with data, genomics and AI, and there is ongoing need for doctors who can bridge research and practice, though funding shapes opportunities. The field is competitive. Demand exists for research active doctors.

The work is university and hospital based, with flexible but often long hours, on relevant pay scales. Research fellows earn on doctor pay scales, typically from around £43k depending on stage. Demand exists but is shaped by research funding.`,

  academic_doctor: `An Academic Doctor combines caring for patients with research and teaching, working at the frontier of medicine while training the next generation. You split your time between clinical practice, discovery and education. It is a demanding, prestigious path for doctors who want to advance and share knowledge.

Day to day you see patients, carry out research, publish findings, and teach medical students and junior doctors. You balance several demanding roles, and much of the job is combining excellent clinical care with research and education. The work is intellectual, varied and demanding.

You become an academic doctor through a medical degree, clinical training, and academic training that combines practice with research, usually including a PhD. The path is long and competitive. From here you progress towards senior academic and clinical roles, such as professor and consultant.

It suits curious, analytical, driven people with a strong drive for mastery who love research, teaching and clinical work. You need excellent clinical and research skills, self motivation and the ability to juggle roles. It is a poor fit for those who want a single focus or a quick route.

Academic medicine is vital to progress but competitive, with funding pressures and heavy demands, though it remains highly rewarding for those suited to it. Research advances rapidly. Demand exists but the path is competitive.

The work is university and hospital based, with long and flexible hours, on relevant clinical academic pay scales. Pay reflects both clinical and academic roles, typically strong at senior levels. Demand exists but competition is significant.`,

  clinical_trials_doctor: `A Clinical Trials Doctor helps run the studies that test whether new treatments are safe and effective, overseeing the medical side of clinical trials. You ensure trials are conducted safely and to high standards, helping bring new medicines to patients. It is a role where medicine meets research and industry.

Day to day you oversee the medical aspects of trials, ensure patient safety, review data, and work with research and regulatory teams. You safeguard participants and the quality of trials, and much of the job is medical oversight of research. The work is analytical, careful and purpose driven.

Most people reach this role as doctors who move into clinical research, often working for pharmaceutical companies or research organisations. Clinical experience and interest in research matter. Entry builds on a medical background. From here you progress into senior clinical research and medical roles in industry.

It suits analytical, careful doctors who are interested in research and enjoy detailed, well regulated work. You need clinical knowledge, analytical skills and attention to detail. It is a poor fit for those who want hands on patient care or dislike process and paperwork.

Clinical research is growing with advances in medicine, and doctors who can guide trials are valued, with steady demand across the pharmaceutical and research sector. Technology is changing how trials run. Demand is steady.

The work is office and sometimes clinical based, with generally reasonable hours, often in industry. Pay is strong given the medical qualification, typically well above general clinical scales. Demand is steady across clinical research.`,

  medical_educator: `A Medical Educator teaches and trains doctors and other healthcare professionals, helping develop the skills and knowledge of those who care for patients. You shape how medicine is taught and support learners to become excellent practitioners. It is a role for those who love both medicine and helping others learn.

Day to day you teach and supervise students and trainees, design and deliver training, assess learners, and help improve medical education. You pass on knowledge and skills, and much of the job is developing the healthcare professionals of the future. The work is caring, intellectual and rewarding.

Most people are doctors or health professionals who develop expertise in education, often through additional qualifications, alongside or after clinical work. Clinical credibility and teaching skills matter. Entry builds on a clinical background. From here you progress into senior education and leadership roles.

It suits caring, knowledgeable people with a drive for mastery who enjoy teaching and helping others develop. You need expertise, communication skills and patience. It is a poor fit for those who dislike teaching or want purely clinical work.

Medical education is essential to a well trained workforce, and it is being changed by technology, simulation and new ways of learning, supporting steady demand. Good educators are always needed. Demand is steady.

The work is university, hospital and clinical based, with generally reasonable hours, on relevant pay scales. Pay reflects clinical and education roles, typically strong for experienced educators. Demand is steady across medical education.`,

  clinical_leadership_fellow: `A Clinical Leadership Fellow is a health professional, often a doctor, who takes time to develop leadership skills and work on improving healthcare services. You step beyond frontline care to help lead change and improvement. It is a development role for those who want to shape and improve healthcare.

Day to day you work on service improvement and leadership projects, learn leadership skills, work with senior leaders, and help make healthcare better. You gain a broader view of how healthcare works, and much of the job is leading improvement and developing as a leader. The work is strategic, collaborative and purpose driven.

Most people are clinicians who take a leadership fellowship, often within or alongside their training, to build these skills. Clinical experience and leadership potential matter. Entry is competitive and usually mid career. From here you progress towards senior clinical leadership and management roles.

It suits driven, purposeful people who want to improve healthcare and enjoy leading change and working with others. You need leadership potential, analytical skills and good communication. It is a poor fit for those who want to stay purely clinical or dislike organisational work.

Healthcare needs strong clinical leaders to drive improvement amid major pressures, so developing leadership is increasingly valued. The field is growing in importance. Demand for clinical leaders is strong.

The work is office and clinical based, with generally reasonable hours, on relevant pay scales. Pay reflects the clinician's background, typically on their existing scale. Demand for clinical leadership is strong.`,

  medical_manager: `A Medical Manager helps run healthcare services, bringing clinical understanding to the management and organisation of care. You bridge medicine and management, helping services work well for patients and staff. It is a role for those who want to improve healthcare through leadership and organisation.

Day to day you manage healthcare services or teams, plan and organise care, manage budgets and performance, and work with clinical and management colleagues. You help services run smoothly, and much of the job is leading and organising healthcare delivery. The work is organised, collaborative and purpose driven.

Most people reach this role as clinicians who move into management, or as managers who specialise in healthcare, sometimes with management qualifications. Leadership and organisational skills matter. Entry builds on healthcare or management experience. From here you progress to senior healthcare management and leadership.

It suits driven, organised people who want to improve healthcare and enjoy leading and organising. You need leadership, organisation and good communication. It is a poor fit for those who want purely clinical work or dislike management.

Healthcare faces major operational and financial pressures, so skilled managers who understand care are valued, supporting demand. The role is central to running services well. Demand is steady.

The work is office and clinical based, with generally reasonable hours, on NHS management or clinical pay scales. Pay varies with background and level, typically from around £40k rising well above with seniority. Demand is steady across healthcare management.`,

  quality_improvement_lead: `A Quality Improvement Lead helps healthcare services get better at what they do, using structured methods to improve care, safety and efficiency. You lead efforts to make healthcare safer, better and more effective. It is a purposeful role focused on improving care for patients.

Day to day you analyse how services perform, identify improvements, lead improvement projects, and help teams adopt better ways of working. You use data and proven methods, and much of the job is driving real, lasting improvement in care. The work is analytical, collaborative and purpose driven.

Most people reach this role from a clinical, management or analytical background, often with training in improvement methods. Analytical and people skills matter. Entry builds on healthcare experience. From here you progress into senior improvement and leadership roles.

It suits analytical, purposeful people who want to improve care and enjoy solving problems and leading change. You need analytical skills, structure and good communication. It is a poor fit for those who dislike data and change or want purely clinical work.

Healthcare faces pressure to improve quality and efficiency, so improvement skills are increasingly valued, supporting demand. Data and methods keep advancing. Demand is steady to strong.

The work is office and clinical based, with generally reasonable hours, on relevant pay scales. Pay varies with background and level, typically from around £40k rising with seniority. Demand is steady to strong.`,

  healthcare_strategy_consultant: `A Healthcare Strategy Consultant advises healthcare organisations on their biggest challenges and how to improve, bringing analysis and fresh thinking to complex problems. You help hospitals, systems and companies plan and change for the better. It is a demanding, high level role where consulting meets healthcare.

Day to day you analyse healthcare challenges, develop strategies and recommendations, and work with clients to plan and deliver change. You tackle complex problems, and much of the job is solving them and advising leaders. The work is analytical, strategic and varied.

Most people enter through a consultancy graduate scheme or by moving in with healthcare or consulting experience, and strong analytical skills matter. A healthcare or business background helps. Entry is competitive. From consultant you progress towards senior consulting and leadership roles.

It suits analytical, driven people with an entrepreneurial streak who want to improve healthcare and enjoy solving complex problems. You need strong analysis, communication and adaptability. It is a poor fit for those who want hands on care or dislike fast paced, varied work.

Healthcare systems face huge challenges and change, so demand for strategic advice is strong, and technology and data increasingly shape the work. The field is dynamic. Demand is strong.

The work is office, client and hybrid based, sometimes with travel, and hours can be demanding. Pay is strong, typically from around £40k early on and rising well above with experience. Demand is strong across healthcare consulting.`,

  digital_health_doctor: `A Digital Health Doctor works at the meeting point of medicine and technology, helping design and use digital tools, apps and systems that improve healthcare. You bring clinical insight to health technology, making sure it really helps patients and clinicians. It is a forward looking role at the frontier of modern healthcare.

Day to day you advise on and help develop digital health tools, bridge clinical and technical teams, evaluate technology, and help bring it safely into care. You combine medicine with technology, and much of the job is making sure digital health genuinely improves care. The work is inventive, analytical and purpose driven.

Most people are doctors who develop an interest and expertise in technology, sometimes moving into digital health roles in the health service, industry or startups. Clinical credibility and tech understanding matter. Entry builds on a medical background. From here you progress into digital health leadership and innovation roles.

It suits inventive, analytical doctors with an entrepreneurial streak who are excited by technology and want to improve care. You need clinical knowledge, tech understanding and creativity. It is a poor fit for those who want purely traditional clinical work or dislike technology.

Digital health is growing fast, accelerated by AI and new technology, and clinicians who understand both medicine and tech are in rising demand. The field is dynamic and expanding. Demand is growing.

The work is office, clinical and hybrid based, with generally reasonable hours. Pay varies with setting, typically strong given the medical background, higher in industry. Demand is growing across digital health.`,

  clinical_ai_advisor: `A Clinical AI Advisor helps healthcare make good use of artificial intelligence, bringing clinical understanding to how AI tools are developed, tested and used in care. You make sure AI in healthcare is safe, useful and trustworthy. It is a cutting edge role at the meeting point of medicine and AI.

Day to day you advise on clinical AI tools, help evaluate whether they are safe and effective, bridge clinical and technical teams, and guide how AI is used in care. You bring medical judgement to AI, and much of the job is making sure these powerful tools genuinely help patients. The work is analytical, technical and purpose driven.

Most people are doctors or health professionals who develop expertise in AI and data, sometimes with additional study. Clinical credibility and understanding of AI matter. Entry builds on a clinical background. From here you progress into senior clinical AI and digital health roles.

It suits analytical, curious clinicians with technical curiosity who are excited by AI and want to improve care safely. You need clinical knowledge, understanding of AI and sound judgement. It is a poor fit for those who dislike technology or want purely traditional clinical work.

AI is rapidly entering healthcare, from diagnosis to administration, creating strong and rising demand for clinicians who can guide its safe use. The field is new and fast moving. Demand is growing quickly.

The work is office, clinical and hybrid based, with generally reasonable hours. Pay varies with setting, typically strong given the clinical background. Demand is growing as AI spreads in healthcare.`,

  healthtech_founder: `A Healthtech Founder starts and builds a company that uses technology to improve health and healthcare, turning an idea into a product that helps patients or clinicians. You take on the risk and challenge of building a health technology business. It is an entrepreneurial, high risk, high purpose path at the frontier of healthcare.

Day to day, especially early on, you do everything from developing the product and understanding clinical needs to raising money, building a team and finding customers. As the company grows your role shifts to leading and setting direction. The work is varied, relentless and driven by a mission to improve health.

There is no set route to becoming a founder, but many come from clinical, technical or business backgrounds, often after spotting a problem worth solving, and accelerators and health innovation programmes can help. What matters is a strong idea and the drive to build. From founder, success can lead to growing the company, selling it, or starting again.

It suits visionary, inventive people with strong entrepreneurial drive and purpose who want to improve health and are willing to take real risks. You need resilience, originality, drive and the ability to bring people together. It is a poor fit for those who want security, steady income or clear structure.

Healthtech is a growing field, driven by AI, digital health and the pressures on healthcare, but it is demanding, competitive and regulated, and most startups fail. Funding varies with the economy. The opportunity is significant but risky.

There is no set workplace or hours, and both are whatever the business demands, often long. Pay is highly uncertain, often little early on with the potential, never guaranteed, of significant reward if the company succeeds. It is a path defined by risk and purpose.`,

  medical_innovation_lead: `A Medical Innovation Lead helps healthcare organisations develop and adopt new ideas, technologies and ways of working that improve care. You champion and drive innovation, helping good ideas become real improvements. It is a creative, strategic role focused on making healthcare better through change.

Day to day you identify and develop innovations, run projects to test and adopt new approaches, work with clinical, technical and business teams, and help spread what works. You turn ideas into practice, and much of the job is driving and supporting innovation in care. The work is inventive, collaborative and purpose driven.

Most people reach this role from a clinical, technical or management background, having shown a talent for innovation and change. Creativity, people skills and healthcare understanding matter. Entry builds on healthcare experience. From here you progress into senior innovation and leadership roles.

It suits visionary, inventive people with an entrepreneurial streak and purpose who want to improve care and enjoy driving change. You need creativity, people skills and persistence. It is a poor fit for those who want routine work or dislike uncertainty and change.

Healthcare faces pressure to innovate amid rising demand and new technology, so those who can drive innovation are increasingly valued. The field is growing. Demand is growing.

The work is office and clinical based, with generally reasonable hours. Pay varies with background and level, typically from around £40k rising with seniority. Demand is growing for innovation skills in healthcare.`,

  adult_nurse: `An Adult Nurse cares for adult patients across a huge range of conditions and settings, from hospitals to the community, supporting people through illness and recovery. You provide skilled, compassionate care that is central to how patients are treated and supported. It is a demanding, deeply rewarding profession at the heart of healthcare.

Day to day you assess and care for patients, give treatments and medication, monitor conditions, support recovery, and work as part of a healthcare team. You are often the constant presence for patients, and much of the job is skilled, hands on care and support. The work is caring, practical and demanding.

Most people enter through a nursing degree leading to registration with the NMC, and nursing degree apprenticeships offer an earn while you learn route. Placements and a caring, capable nature matter. Entry is accessible through several routes and demand is strong. From adult nurse you progress to senior nurse, specialist, advanced practice and leadership roles.

It suits caring, organised people who want to help others and can cope with the demands of hands on care. You need compassion, resilience, good communication and practical skills. It is a poor fit for those who want desk based work or find caring for the unwell draining.

Nursing faces significant workforce shortages and rising demand, so nurses are in strong demand, and technology increasingly supports care. The profession is under pressure but vital. Demand is strong and enduring.

The work is hospital and community based, often on shifts including nights and weekends, on NHS pay scales. Newly qualified nurses typically earn from around £29k, rising to £35k to £50k and beyond with experience and seniority. Demand is strong across healthcare.`,

  children_s_nurse: `A Children's Nurse cares for babies, children and young people who are unwell, supporting them and their families through illness and recovery. You provide skilled, gentle care tailored to young patients and work closely with their families. It is a caring, specialist branch of nursing focused on children.

Day to day you assess and care for young patients, give treatments and medication, comfort and reassure children and families, and work as part of a healthcare team. You adapt care to children's needs, and much of the job is skilled, compassionate care for young people and support for their families. The work is caring, sensitive and demanding.

Most people enter through a children's nursing degree leading to NMC registration, or an apprenticeship route. Placements and a caring nature matter. Entry is accessible through several routes and demand is strong. From children's nurse you progress to senior, specialist and advanced practice roles.

It suits caring, patient people with empathy who love working with children and can support families through difficult times. You need compassion, resilience, good communication and the ability to relate to children. It is a poor fit for those who find children's illness hard or want non clinical work.

Nursing faces workforce shortages and rising demand, so children's nurses are in strong demand, and technology increasingly supports care. The profession is vital. Demand is strong.

The work is hospital and community based, often on shifts, on NHS pay scales. Newly qualified nurses typically earn from around £29k, rising to £35k to £50k and beyond with experience. Demand is strong.`,

  mental_health_nurse: `A Mental Health Nurse cares for people experiencing mental illness, supporting them through crises and towards recovery. You build trusting relationships and provide skilled care for people's mental and emotional wellbeing. It is a caring, deeply human branch of nursing focused on the mind.

Day to day you assess and support people's mental health, build therapeutic relationships, help manage medication and treatment, and work with mental health teams. You care for people at difficult times, and much of the job is compassionate, skilled support for mental wellbeing. The work is caring, relational and demanding.

Most people enter through a mental health nursing degree leading to NMC registration, or an apprenticeship route. Placements, empathy and resilience matter. Entry is accessible through several routes and demand is strong. From mental health nurse you progress to senior, specialist and advanced practice roles.

It suits caring, empathetic people who want to help people with mental illness and can cope with challenging situations. You need compassion, resilience, good communication and emotional strength. It is a poor fit for those who find mental distress hard to manage or want non clinical work.

Mental health need is high and rising, and services face shortages, so mental health nurses are in strong demand, with growing recognition of mental health. The profession is vital. Demand is strong and growing.

The work is hospital and community based, often on shifts, on NHS pay scales. Newly qualified nurses typically earn from around £29k, rising to £35k to £50k and beyond with experience. Demand is strong and growing.`,

  learning_disability_nurse: `A Learning Disability Nurse supports people with learning disabilities to live healthy, fulfilling lives and to get the care they need. You help people who may struggle to access or communicate about healthcare, championing their needs and wellbeing. It is a caring, specialist branch of nursing focused on a group who need dedicated support.

Day to day you assess and support people's health and wellbeing, help them access care and services, support independence, and work with families, carers and other professionals. You advocate for and support people who are often overlooked, and much of the job is enabling them to live well and get good care. The work is caring, empowering and rewarding.

Most people enter through a learning disability nursing degree leading to NMC registration, or an apprenticeship route. Placements, empathy and patience matter. Entry is accessible through several routes and demand is strong. From learning disability nurse you progress to senior and specialist roles.

It suits caring, patient people with empathy who want to support people with learning disabilities and enjoy building relationships. You need compassion, patience, good communication and advocacy skills. It is a poor fit for those who want fast paced acute work or lack patience.

There is a recognised shortage of learning disability nurses and growing awareness of the need for good care for this group, so demand is strong. The profession is vital and valued. Demand is strong.

The work is community and hospital based, with hours that vary, on NHS pay scales. Newly qualified nurses typically earn from around £29k, rising to £35k to £50k and beyond with experience. Demand is strong.`,

  health_visitor: `A Health Visitor is a specialist nurse or midwife who supports families with young children, helping give children a healthy start and supporting parents through the early years. You work in the community, promoting health and spotting problems early. It is a preventative, family focused role in public health nursing.

Day to day you visit and support families, check on children's development and health, offer guidance to parents, and help families access services. You focus on prevention and early support, and much of the job is helping children and families stay healthy and thrive. The work is caring, preventative and community based.

You become a health visitor as a registered nurse or midwife who takes further specialist training in health visiting. Nursing or midwifery registration and additional study are required. Entry builds on a nursing or midwifery background. From health visitor you progress to senior and leadership roles in community and public health nursing.

It suits caring, purposeful people who want to support families and prevent problems and enjoy community work. You need compassion, good communication and the ability to build trust. It is a poor fit for those who want acute hospital work or dislike home visiting.

Early support for children is recognised as vital, though services face funding pressures and workforce shortages, keeping demand steady. The role is valued for prevention. Demand is steady.

The work is community and home based, with generally regular hours, on NHS pay scales. Health visitors earn on nursing scales, typically from around £35k rising with experience. Demand is steady, supported by the value of early years support.`,

  clinical_research_nurse: `A Clinical Research Nurse supports the clinical trials that test new treatments, caring for participants and making sure studies are run safely and well. You combine nursing care with research, looking after patients taking part in trials. It is a role where nursing meets medical research.

Day to day you care for research participants, carry out study procedures, collect data, and make sure trials follow strict standards and keep patients safe. You bring nursing skills to research, and much of the job is caring for participants while supporting rigorous studies. The work is caring, precise and detail focused.

You become a clinical research nurse as a registered nurse who moves into research, often with additional training. Nursing registration and interest in research matter. Entry builds on a nursing background. From here you progress to senior research nursing and management roles.

It suits caring, meticulous nurses who are interested in research and enjoy combining patient care with detailed, well regulated work. You need nursing skills, attention to detail and reliability. It is a poor fit for those who want purely hands on acute nursing or dislike paperwork.

Clinical research is growing with advances in medicine, and skilled research nurses are valued, with steady demand across the health service and industry. Technology is changing how trials run. Demand is steady.

The work is hospital and research based, with generally reasonable hours, on NHS pay scales. Research nurses earn on nursing scales, typically from around £35k rising with experience. Demand is steady across clinical research.`,


  nurse_educator: `A Nurse Educator teaches and trains nurses and nursing students, helping develop the skills and knowledge of the nursing workforce. You shape how nurses learn and support them to provide excellent care. It is a role for experienced nurses who love teaching and developing others.

Day to day you teach and mentor nursing students and staff, design and deliver training, assess learners, and help improve nursing education. You pass on skills and knowledge, and much of the job is developing capable, confident nurses. The work is caring, intellectual and rewarding.

You become a nurse educator as an experienced registered nurse who develops expertise in education, often with further qualifications. Nursing experience and teaching skills matter. Entry builds on a nursing background. From here you progress to senior education and leadership roles.

It suits caring, knowledgeable nurses with a drive for mastery who enjoy teaching and helping others develop. You need nursing expertise, communication skills and patience. It is a poor fit for those who dislike teaching or want purely hands on care.

With nursing shortages and the need to train more nurses, educators are valued, and education is being changed by technology and simulation. Good educators are always needed. Demand is steady.

The work is university and clinical based, with generally reasonable hours, on NHS or academic pay scales. Nurse educators earn on relevant scales, typically from around £37k rising with experience. Demand is steady.`,

  nurse_manager: `A Nurse Manager leads and organises nursing teams and services, making sure patients get good care and staff are well supported. You combine nursing knowledge with management to run wards, units or services well. It is a leadership role for experienced nurses who want to shape and improve care.

Day to day you lead nursing teams, manage staffing, budgets and standards, support and develop staff, and make sure care is safe and high quality. You keep services running well, and much of the job is leading people and organising care. The work is organised, people focused and demanding.

You become a nurse manager as an experienced registered nurse who moves into leadership, often with management development. Nursing experience and leadership skills matter. Entry builds on a nursing background. From here you progress to senior nursing and healthcare leadership.

It suits caring, organised people with leadership ability who want to improve care and enjoy leading teams. You need nursing knowledge, leadership, organisation and resilience. It is a poor fit for those who want purely hands on care or dislike management.

Nursing shortages and pressures on services make good nurse leaders vital, supporting demand. Strong leadership is key to good care. Demand is strong.

The work is hospital and community based, with generally reasonable hours that can extend, on NHS pay scales. Nurse managers earn on senior nursing scales, typically from around £40k rising with seniority. Demand is strong.`,

  advanced_clinical_practitioner: `An Advanced Clinical Practitioner is a senior health professional, often a nurse or allied health professional, who has trained to take on advanced responsibilities once done only by doctors. You assess, diagnose and treat patients with a high level of skill and autonomy. It is a senior, expert level clinical role that expands what non doctors can do.

Day to day you assess, diagnose and treat patients, order and interpret tests, prescribe, and make complex clinical decisions, often leading care. You work with a high degree of autonomy, and much of the job is advanced, independent clinical practice. The work is skilled, responsible and rewarding.

You become an advanced clinical practitioner as an experienced nurse or allied health professional who completes advanced training, usually a master's level qualification. Clinical experience and further study are required. Entry builds on a clinical background. From here you progress to consultant level practice and leadership.

It suits skilled, autonomous clinicians with a drive for mastery who want to take on advanced responsibility and enjoy complex clinical work. You need strong clinical skills, judgement and confidence. It is a poor fit for those early in their careers or who prefer supervised roles.

Advanced practice is expanding to help meet demand and workforce shortages, so these roles are growing and valued across healthcare. The role stretches what skilled clinicians can do. Demand is strong and growing.

The work is hospital and community based, with hours that vary, on NHS pay scales. Advanced practitioners earn on senior scales, typically from around £45k rising with experience. Demand is strong and growing.`,

  midwife: `A Midwife cares for women and birthing people through pregnancy, birth and the early days of parenthood, supporting them and their babies at one of life's most important moments. You provide skilled, personal care and help bring new life safely into the world. It is a profound, deeply rewarding profession.

Day to day you care for women through pregnancy, support them during labour and birth, care for mothers and babies afterwards, and provide advice and reassurance. You are with people at a life changing time, and much of the job is skilled, compassionate care through pregnancy and birth. The work is caring, skilled and demanding.

Most people enter through a midwifery degree leading to registration with the NMC, and some routes exist for registered nurses. Placements and a caring, capable nature matter. Entry is competitive and demand is strong. From midwife you progress to senior, specialist and leadership roles.

It suits caring, calm people with strong people skills who want to support women and families and can handle intense, sometimes unpredictable moments. You need compassion, resilience, good judgement and communication. It is a poor fit for those who want predictable, low pressure work or find birth stressful.

Midwifery faces workforce shortages and rising demand, so midwives are in strong demand, and the profession is central to maternity care. Pressures on services are significant. Demand is strong.

The work is hospital and community based, often on shifts including nights, on NHS pay scales. Newly qualified midwives typically earn from around £29k, rising to £35k to £50k and beyond with experience. Demand is strong.`,

  physiotherapist: `A Physiotherapist helps people move better and recover from injury, illness or disability through exercise, hands on treatment and advice. You help people regain movement, manage pain and improve their physical function. It is a hands on, rewarding healthcare profession focused on movement and recovery.

Day to day you assess patients' physical problems, plan and deliver treatment, guide exercises and rehabilitation, and support people to recover and stay active. You combine knowledge with hands on care, and much of the job is helping people move and function better. The work is caring, practical and analytical.

Most people enter through a physiotherapy degree leading to registration with the HCPC, and degree apprenticeships offer another route. Placements and a caring, practical nature matter. Entry is competitive and demand is strong. From physiotherapist you progress to senior, specialist and advanced practice roles.

It suits caring, practical people with a drive for mastery who enjoy helping people recover and combining knowledge with hands on care. You need good people skills, physical and analytical ability and patience. It is a poor fit for those who want desk based work or dislike hands on care.

Demand for physiotherapy is strong, driven by an ageing population and focus on rehabilitation, and there are workforce pressures. Technology increasingly supports care. Demand is strong.

The work is hospital, clinic and community based, with generally reasonable hours, on NHS pay scales. Newly qualified physiotherapists typically earn from around £29k, rising to £35k to £50k and beyond with experience. Demand is strong.`,

  occupational_therapist: `An Occupational Therapist helps people do the everyday activities that matter to them when illness, injury or disability gets in the way. You find practical ways for people to live as fully and independently as possible. It is a caring, problem solving healthcare profession focused on daily life.

Day to day you assess what people need to do and where they struggle, develop practical solutions, provide equipment and adaptations, and support people to regain independence. You focus on real life activities, and much of the job is helping people do what matters to them. The work is caring, creative and practical.

Most people enter through an occupational therapy degree leading to registration with the HCPC, and degree apprenticeships offer another route. Placements and a caring, practical nature matter. Entry is competitive and demand is strong. From occupational therapist you progress to senior, specialist and advanced practice roles.

It suits caring, inventive people who enjoy solving practical problems and helping people live fuller lives. You need good people skills, creativity, analytical ability and empathy. It is a poor fit for those who want purely clinical or desk based work.

Demand is strong, driven by an ageing population and focus on independence and rehabilitation, with workforce pressures. The role is increasingly valued. Demand is strong.

The work is hospital, community and home based, with generally reasonable hours, on NHS pay scales. Newly qualified occupational therapists typically earn from around £29k, rising to £35k to £50k and beyond with experience. Demand is strong.`,

  healthcare_scientist: `A Healthcare Scientist applies science to patient care, working in areas from genetics and physiology to medical physics and laboratory science. You use scientific expertise to help diagnose, treat and monitor illness. It is a role that brings deep science directly into healthcare.

Day to day you carry out scientific tests and analysis, develop and improve methods, interpret results, and advise clinical colleagues. You apply advanced science to real medical problems, and much of the job is expert scientific work that guides care. The work is analytical, technical and purpose driven.

Most people enter through a science degree and a structured training programme such as the NHS Scientist Training Programme, leading to registration. Entry is competitive and structured. From healthcare scientist you progress to senior and consultant scientist roles.

It suits analytical, curious people with technical curiosity who want their science to help patients and enjoy specialist work. You need strong scientific skills, precision and an interest in healthcare. It is a poor fit for those who want lots of direct patient contact or dislike technical work.

Healthcare science is being transformed by genomics, data and new technology, expanding what scientists can do, with steady demand and shortages in some areas. The field is advancing quickly. Demand is strong.

The work is laboratory, clinical and hospital based, with generally reasonable hours, on NHS pay scales. Healthcare scientists earn on relevant scales, typically from around £30k to £40k rising with seniority. Demand is strong.`,

  clinical_diagnostic_scientist: `A Clinical Diagnostic Scientist carries out and oversees the tests that help diagnose disease, providing the accurate results that guide treatment. You work in the laboratory to analyse samples and produce reliable diagnostic information. It is a precise, behind the scenes role essential to diagnosis.

Day to day you run and interpret diagnostic tests, ensure accuracy and quality, develop and improve methods, and work with clinical teams. You provide the results doctors rely on, and much of the job is careful, precise diagnostic science. The work is analytical, precise and methodical.

Most people enter through a science degree and structured training, leading to registration, often through NHS science routes. Entry is competitive and structured. From diagnostic scientist you progress to senior and specialist laboratory roles.

It suits analytical, precise people who value accuracy and enjoy detailed laboratory work that helps patients. You need scientific and analytical skills, precision and reliability. It is a poor fit for those who want direct patient contact or dislike lab work.

Diagnostics is being transformed by automation, genomics and data, which handle more routine testing and raise the value of expertise, with steady demand and shortages in some areas. The field is advancing. Demand is strong.

The work is laboratory based, with generally reasonable hours, on NHS pay scales. Diagnostic scientists earn on relevant scales, typically from around £30k to £40k rising with seniority. Demand is strong.`,

  clinical_physiologist: `A Clinical Physiologist carries out tests and measurements to see how the body's systems are working, such as the heart, lungs or nervous system, helping diagnose and monitor conditions. You use specialist equipment to assess how the body functions. It is a technical, patient facing role in diagnostics.

Day to day you carry out physiological tests on patients, operate specialist equipment, analyse and interpret results, and work with clinical teams. You often work directly with patients, and much of the job is skilled testing and analysis that guides care. The work is technical, analytical and caring.

Most people enter through a healthcare science degree with a physiology focus and structured training, leading to registration. Entry is competitive and structured. From clinical physiologist you progress to senior and specialist roles.

It suits analytical, technically curious people who enjoy combining hands on patient work with science and technology. You need technical and analytical skills, precision and good people skills. It is a poor fit for those who dislike technology or want purely lab based work.

Demand is driven by an ageing population and the need for diagnostic tests, with workforce shortages in some areas, and technology keeps advancing. The role is increasingly important. Demand is strong.

The work is hospital and clinic based, with generally reasonable hours, on NHS pay scales. Clinical physiologists earn on relevant scales, typically from around £29k to £38k rising with experience. Demand is strong.`,

  medical_laboratory_scientist: `A Medical Laboratory Scientist carries out the laboratory analysis behind medical diagnosis, testing samples to help identify and monitor disease. You work in the lab to produce the results that guide patient care. It is a precise, science based role central to diagnosis and treatment.

Day to day you analyse patient samples, run and interpret tests, maintain equipment and quality, and make sure results are accurate and reliable. You provide essential diagnostic information, and much of the job is careful, precise laboratory work. The work is analytical, precise and methodical.

Most people enter through an accredited biomedical or laboratory science degree and training, leading to registration with the HCPC, often through the NHS. Entry is structured and competitive. From here you progress to senior and specialist laboratory roles.

It suits analytical, precise people with technical curiosity who enjoy detailed lab work that helps patients. You need scientific and analytical skills, precision and reliability. It is a poor fit for those who want patient contact or dislike lab work.

Laboratory medicine is being changed by automation, genomics and data, which handle more routine work and raise the value of expertise, with steady demand and shortages. The field is advancing. Demand is strong.

The work is laboratory based, often with shifts in hospitals, on NHS pay scales. Laboratory scientists earn on relevant scales, typically from around £29k to £38k rising with experience. Demand is strong.`,

  diagnostic_radiographer: `A Diagnostic Radiographer produces the medical images, such as X rays and scans, that doctors use to diagnose illness and injury. You operate imaging equipment and work directly with patients to capture clear, accurate images. It is a technical, patient facing role at the heart of diagnosis.

Day to day you carry out imaging examinations, position and care for patients, operate specialist equipment, and ensure images are of good quality. You combine technical skill with patient care, and much of the job is producing the images that guide diagnosis. The work is technical, caring and precise.

Most people enter through a diagnostic radiography degree leading to registration with the HCPC, and degree apprenticeships offer another route. Placements and a mix of technical and caring skills matter. Entry is competitive and demand is strong. From radiographer you progress to senior, specialist and advanced practice roles.

It suits organised, caring people with technical curiosity who enjoy combining technology with patient care. You need technical skills, precision and good people skills. It is a poor fit for those who dislike technology or want purely lab based or desk work.

Demand for imaging keeps rising, and there are workforce shortages, so radiographers are in strong demand, while AI increasingly supports image analysis. The role is evolving with technology. Demand is strong.

The work is hospital based, often with shifts, on NHS pay scales. Newly qualified radiographers typically earn from around £29k, rising to £35k to £50k and beyond with experience. Demand is strong.`,

  paramedic: `A Paramedic provides urgent medical care to people in emergencies, often being the first skilled help to arrive at the scene. You assess and treat patients in all kinds of situations, from accidents to sudden illness, and get them the care they need. It is a fast paced, high responsibility role at the front line of emergency care.

Day to day you respond to emergency calls, assess and treat patients on the scene and on the way to hospital, make quick decisions, and work under pressure in unpredictable situations. You bring calm and skill to emergencies, and much of the job is urgent, hands on care wherever it is needed. The work is intense, varied and deeply purposeful.

Most people enter through a paramedic science degree leading to registration with the HCPC, and degree apprenticeships offer another route. Placements and the ability to handle pressure matter. Entry is competitive and demand is strong. From paramedic you progress to advanced and specialist paramedic and leadership roles.

It suits calm, resilient people who thrive under pressure and want to help people in emergencies. You need quick thinking, practical skills, resilience and compassion. It is a poor fit for those who want predictable, low pressure work or find emergencies overwhelming.

Demand for paramedics is strong amid pressure on emergency services, and their role is expanding into new areas of care. The work is demanding but vital. Demand is strong.

The work is on the road and at emergencies, in all conditions, often on shifts including nights, on NHS pay scales. Newly qualified paramedics typically earn from around £29k, rising to £35k to £48k and beyond with experience. Demand is strong.`,

  ambulance_service_lead: `An Ambulance Service Lead manages and leads ambulance and emergency response services, making sure they run well and reach people who need urgent help. You take responsibility for how emergency care is organised and delivered. It is a demanding leadership role in emergency healthcare.

Day to day you lead teams and operations, manage resources and performance, plan for demand and emergencies, and work to improve emergency response. You keep vital services running under pressure, and much of the job is leading and organising urgent care at scale. The work is organised, high pressure and purpose driven.

Most people reach this role from a paramedic or emergency care background, moving into leadership, often with management development. Frontline experience and leadership skills matter. Entry builds on emergency care experience. From here you progress to senior ambulance and healthcare leadership.

It suits driven, calm people who want to improve emergency care and can lead under pressure. You need leadership, organisation, resilience and good judgement. It is a poor fit for those who want frontline only roles or dislike management pressure.

Pressure on emergency services keeps strong leadership in demand, and services face significant challenges. Good leaders are vital. Demand is steady to strong.

The work is office and operational based, with hours that can extend during pressures, on NHS pay scales. Pay is on management or senior clinical scales, typically from around £45k rising with seniority. Demand is steady to strong.`,

  emergency_planning_officer: `An Emergency Planning Officer prepares organisations and communities to respond to emergencies and major incidents, from floods and pandemics to accidents. You help make sure that when something goes wrong, there is a plan and people are ready. It is a purposeful role focused on preparedness and resilience.

Day to day you develop and test emergency plans, assess risks, train and coordinate responders, and help manage responses when incidents happen. You prepare for the worst so it can be handled well, and much of the job is planning, testing and coordinating for emergencies. The work is analytical, collaborative and sometimes urgent.

Most people enter through a relevant degree or background in emergency planning, public health or a related field, sometimes moving from other roles. Analytical and coordination skills matter. Entry is competitive and varied. From officer you progress to senior emergency planning and resilience roles.

It suits analytical, calm people with a sense of purpose who want to protect communities and can coordinate under pressure. You need analytical skills, organisation, good communication and composure. It is a poor fit for those who dislike planning and coordination or want hands on clinical work.

Recent emergencies, from pandemics to extreme weather, have raised the importance of emergency planning, supporting steady demand. Preparedness is increasingly valued. Demand is steady.

The work is office and field based, with hours that can spike during incidents, on public sector pay scales. Pay varies with level, typically from around £30k rising well above with seniority. Demand is steady.`,

  public_health_practitioner: `A Public Health Practitioner works to improve the health of communities and reduce health inequalities, through programmes, advice and action beyond individual medical care. You help people and communities become healthier and prevent illness. It is a purposeful role focused on health at a population level.

Day to day you plan and deliver health improvement programmes, analyse health data and needs, work with communities and partners, and help shape services and policy. You focus on prevention and wellbeing, and much of the job is improving health across groups of people. The work is analytical, collaborative and purpose driven.

Most people enter with a public health, health or social science background, through a graduate role or by moving from a related field, and further study helps. Analytical and people skills matter. Entry is competitive. From practitioner you progress to senior and specialist public health roles.

It suits analytical, purposeful people who want to improve community health and enjoy combining data, programmes and partnership. You need analytical skills, good communication and commitment. It is a poor fit for those who want hands on clinical care or dislike data and policy.

Public health has been highlighted by recent challenges and remains vital for prevention and tackling inequality, with steady demand though funding can be tight. The field is valued. Demand is steady.

The work is office and community based, with generally reasonable hours, on public sector pay scales. Pay varies with level, typically from around £30k rising with seniority. Demand is steady.`,

  health_improvement_practitioner: `A Health Improvement Practitioner helps people live healthier lives, running programmes and giving support on things like healthy eating, exercise, stopping smoking and wellbeing. You work with individuals and communities to encourage and enable healthier choices. It is a caring, purposeful role focused on prevention and wellbeing.

Day to day you deliver health improvement programmes, support people to change their behaviour, work with communities and partners, and help promote healthy living. You focus on helping people be well, and much of the job is supporting and enabling healthier choices. The work is caring, practical and purpose driven.

Most people enter with a health, social science or related background, through a graduate role or by moving from a related field, and relevant experience helps. People and communication skills matter. Entry is accessible for the right people. From practitioner you progress to senior health improvement and public health roles.

It suits caring, purposeful people with good people skills who want to help others be healthier and enjoy working with communities. You need communication, empathy and organisation. It is a poor fit for those who want clinical or purely analytical work.

Focus on prevention and tackling issues like obesity and inactivity keeps this work important, though funding can be tight. Prevention is increasingly valued. Demand is steady.

The work is community and office based, with generally reasonable hours, on public sector pay scales. Pay varies with level, typically from around £26k rising with seniority. Demand is steady.`,

  healthcare_management_associate: `A Healthcare Management Associate helps run healthcare services, supporting the organisation and delivery of care, often as an early step in a healthcare management career. You help make sure services work well for patients and staff. It is a broad, developmental role in healthcare leadership.

Day to day you support the running of services, work on projects, analyse performance, and help improve how care is organised and delivered. You learn how healthcare works, and much of the job is supporting and improving the organisation of care. The work is organised, analytical and purpose driven.

Most people enter through a graduate management scheme, such as the NHS Graduate Management Training Scheme, or by moving from a support role, and a range of backgrounds is accepted. Potential and people skills matter. Entry to good schemes is competitive. From associate you progress into healthcare management and leadership.

It suits driven, organised people who want to improve healthcare and enjoy leading and organising. You need analytical and people skills and commitment. It is a poor fit for those who want hands on clinical work or dislike organisational challenges.

Healthcare faces major operational and financial pressures, so capable managers are valued, supporting demand. Good management is central to good services. Demand is steady.

The work is office and clinical based, with generally reasonable hours, on NHS pay scales. Graduate and early roles typically pay from around £28k, rising with seniority. Demand is steady across healthcare management.`,

  service_improvement_analyst: `A Service Improvement Analyst uses data and analysis to help healthcare services work better, finding ways to improve care, efficiency and patient experience. You turn information about services into insight that drives improvement. It is an analytical, purposeful role focused on making healthcare better.

Day to day you analyse service data and performance, identify problems and opportunities, support improvement projects, and help teams make changes. You use evidence to guide improvement, and much of the job is analysis that helps services improve. The work is analytical, collaborative and purpose driven.

Most people enter with an analytical or healthcare background, through a graduate role or by moving from a related field, and comfort with data matters. Analytical and communication skills matter. Entry is accessible for analytically minded people. From analyst you progress to senior improvement and analytics roles.

It suits analytical, purposeful people who want to improve healthcare and enjoy working with data. You need comfort with data, analytical skills and good communication. It is a poor fit for those who dislike data or want hands on clinical work.

Healthcare faces pressure to improve and use resources well, so analysts who can drive improvement are valued, and data increasingly guides services. The role is growing. Demand is steady to strong.

The work is office based or hybrid, with generally reasonable hours, on NHS pay scales. Graduate and early roles typically pay from around £28k, rising with seniority. Demand is steady to strong.`,

  social_worker: `A Social Worker supports people facing difficulties in their lives, from children at risk to adults needing care, helping them stay safe and live as well as possible. You work with individuals and families through some of their hardest times. It is a demanding, deeply purposeful profession focused on protecting and supporting people.

Day to day you assess people's needs and risks, provide support and advice, help people access services, and protect those who are vulnerable, working with families and other professionals. You make difficult decisions and support people through crises, and much of the job is helping and safeguarding people in need. The work is caring, challenging and purpose driven.

Most people enter through a social work degree leading to registration, or a postgraduate or apprenticeship route, and placements are essential. A caring, resilient nature matters. Entry is structured and demand is strong. From social worker you progress to senior and specialist social work and management roles.

It suits caring, purposeful people with resilience who want to help vulnerable people and can handle difficult situations. You need empathy, sound judgement, resilience and good communication. It is a poor fit for those who want low pressure work or find difficult situations overwhelming.

There are recognised shortages of social workers and high demand, driven by social needs, though the work is demanding and services are stretched. The profession is vital. Demand is strong.

The work is community, office and home based, with generally regular hours that can include difficult situations, on local authority or NHS scales. Social workers typically earn from around £30k, rising to £40k and beyond with experience. Demand is strong.`,

  safeguarding_officer: `A Safeguarding Officer helps protect children or vulnerable adults from harm, abuse and neglect, making sure concerns are recognised and acted on. You help keep people safe and ensure organisations meet their duty to protect. It is a purposeful, responsible role focused on protecting people.

Day to day you handle safeguarding concerns, assess risks, coordinate responses, advise and train colleagues, and work with social services, police and other agencies. You make sure worries are taken seriously and acted on, and much of the job is protecting people and upholding safeguarding standards. The work is careful, purposeful and sometimes difficult.

Most people enter from a background in social work, education, health or a related field, with safeguarding experience and training. Relevant experience and sound judgement matter. Entry builds on related experience. From officer you progress to senior and lead safeguarding roles.

It suits caring, principled people with resilience who want to protect others and can handle difficult, sensitive situations. You need sound judgement, attention to detail, resilience and good communication. It is a poor fit for those who find distressing situations hard or want low responsibility work.

Awareness of safeguarding has grown across many sectors, and organisations increasingly need dedicated safeguarding expertise, supporting demand. Protecting people is a continuing priority. Demand is steady to strong.

The work is office and community based, with generally regular hours that can involve difficult situations, on relevant pay scales. Pay varies with background and level, typically from around £30k rising with seniority. Demand is steady to strong.`,

  dentist: `A Dentist looks after people's teeth, gums and mouths, preventing, diagnosing and treating dental problems to keep patients healthy and pain free. You carry out check ups, treatments and procedures that protect and restore oral health. It is a skilled, hands on healthcare profession combining science, precision and patient care.

Day to day you examine patients, diagnose problems, carry out treatments like fillings, extractions and other procedures, and advise on oral health. You combine technical skill with patient care, and much of the job is precise, hands on treatment that keeps mouths healthy. The work is technical, caring and precise.

You become a dentist through a dental degree, which takes around five years and is very competitive to get into, followed by foundation training. Dental school places are limited and sought after. Once qualified you can work in general practice, hospitals or specialise, and can own or lead a practice.

It suits precise, practical people with a drive for mastery who enjoy detailed hands on work and helping patients. You need dexterity, precision, good people skills and stamina. It is a poor fit for those who dislike close detailed work or find hands on treatment uncomfortable.

Dentistry is shaped by a mix of NHS and private care, with pressures on NHS provision, and technology increasingly supports treatment. There is demand for dentists, especially in some areas. Demand is steady, with good earning potential in private practice.

The work is practice or hospital based, with generally regular hours. Pay varies widely between NHS and private work, typically from around £40k rising well above £80k for experienced and private dentists. Demand is steady, with strong earning potential.`,

  orthodontist: `An Orthodontist is a specialist dentist who straightens teeth and corrects how the jaws and teeth fit together, using braces and other appliances. You help people achieve healthy, well aligned teeth and confident smiles. It is a precise, specialist branch of dentistry focused on alignment.

Day to day you assess patients' teeth and jaws, plan treatments, fit and adjust braces and appliances, and guide teeth into better positions over time. You combine careful planning with precise, hands on work, and much of the job is the skilled, gradual correction of teeth and bites. The work is precise, technical and rewarding.

You become an orthodontist by first qualifying as a dentist, then completing further specialist training in orthodontics. The path is long and competitive. Once qualified you work as a specialist, often in practice or hospital settings.

It suits precise, patient people with a drive for mastery who enjoy detailed, planned work and helping patients. You need dexterity, precision, planning skills and good people skills. It is a poor fit for those who want variety over specialism or dislike detailed work.

Orthodontics is in steady demand, with growing interest in both health and appearance of teeth, and technology like clear aligners and digital planning is changing the field. The work has strong private potential. Demand is steady, with good earning potential.

The work is practice or hospital based, with generally regular hours. Pay is strong, typically well above general dentistry given the specialism, especially in private practice. Demand is steady, with strong earning potential.`,

  oral_surgeon: `An Oral Surgeon carries out surgery on the mouth, teeth and jaws, from complex extractions to treating injuries, disease and abnormalities. You combine dental and surgical skill to treat problems that need an operation. It is a demanding, specialist branch at the meeting point of dentistry and surgery.

Day to day you assess patients, plan and perform surgical procedures on the mouth and jaws, provide care before and after surgery, and work within a team. You combine precision with surgical skill, and much of the job is skilled operations plus the care around them. The work is precise, high responsibility and rewarding.

You become an oral surgeon by qualifying in dentistry, and often medicine, then completing lengthy surgical specialty training. The path is long and highly competitive. Once qualified you work as a specialist surgeon in hospital or specialist settings.

It suits precise, driven people with a strong drive for mastery and achievement who enjoy technical, surgical work and can handle responsibility. You need dexterity, precision, resilience and sound judgement. It is a poor fit for those who want a quick route or dislike high stakes work.

Oral and maxillofacial surgery is a specialist field with steady demand, advancing with new techniques and technology. The training is long but leads to a respected role. Demand is steady.

The work is hospital based, including on call, on NHS and consultant pay scales. Trainees earn on relevant scales, rising to consultant pay above £93k. Demand is steady in this specialist field.`,

  dental_researcher: `A Dental Researcher investigates oral health, dental diseases and treatments, working to improve understanding and develop better dental care. You carry out research that advances dentistry and oral health. It is a role for those with a passion for discovery in dental science.

Day to day you design and carry out research, run studies and experiments, analyse results, and publish findings. You add to knowledge in dental science, and much of the job is rigorous investigation. The work is analytical, independent and curiosity driven.

Most people are dentists or scientists who move into research, often through postgraduate study and a research degree. A dental or science background and research skills matter. Entry builds on relevant qualifications. From researcher you progress into senior research and academic roles.

It suits curious, analytical people with a drive for mastery who enjoy research and discovery in dental science. You need strong analytical skills, curiosity and persistence. It is a poor fit for those who want purely clinical work or dislike research.

Dental research is advancing with new science and technology, though funding shapes opportunities, and it underpins better oral health care. The field is specialist. Demand exists for research active dental scientists.

The work is university and lab based, with flexible but often long hours, on academic or clinical pay scales. Pay varies with background, typically strong for qualified dentists in research. Demand exists but is shaped by funding.`,

  academic_dentist: `An Academic Dentist combines treating patients with research and teaching, advancing dental science while training future dentists. You split your time between clinical dentistry, discovery and education. It is a varied, prestigious path for dentists who want to advance and share knowledge.

Day to day you treat patients, carry out research, publish findings, and teach dental students. You balance several roles, and much of the job is combining excellent clinical care with research and teaching. The work is intellectual, varied and demanding.

You become an academic dentist through a dental degree, clinical experience, and academic training that combines practice with research, usually including a research degree. The path is long and competitive. From here you progress towards senior academic and clinical roles.

It suits curious, driven people with a strong drive for mastery who love clinical work, research and teaching. You need excellent clinical and research skills, self motivation and the ability to juggle roles. It is a poor fit for those who want a single focus or a quick route.

Academic dentistry is vital to progress and training but competitive, with funding pressures, though rewarding for those suited to it. Dental science advances steadily. Demand exists but the path is competitive.

The work is university, hospital and clinical based, with long and flexible hours, on relevant pay scales. Pay reflects clinical and academic roles, typically strong at senior levels. Demand exists but competition is significant.`,

  dental_public_health_specialist: `A Dental Public Health Specialist works to improve the oral health of whole communities rather than treating individual patients, tackling the causes of dental disease and inequality. You use data, programmes and policy to prevent dental problems across populations. It is a strategic, preventative branch of dentistry.

Day to day you analyse oral health data, plan and lead programmes to improve oral health, advise on policy, and work to reduce dental inequalities. You focus on prevention at scale, and much of the job is improving oral health across communities. The work is analytical, strategic and purpose driven.

You become a dental public health specialist by qualifying in dentistry, then training in dental public health. The path involves further specialist training. Once qualified you work as a specialist, shaping oral health services and policy.

It suits analytical, purposeful people who want to improve oral health at a population level and enjoy combining data, dentistry and policy. You need analytical skills, a big picture view and good communication. It is a poor fit for those who want hands on clinical dentistry or dislike data and policy.

Oral health inequalities and prevention are recognised priorities, keeping this specialist field relevant, though it is a small niche. Prevention is increasingly valued. Demand is steady in a specialist area.

The work is office and community based, with generally reasonable hours, on relevant pay scales. Pay is strong given the dental qualification and specialism. Demand is steady in a specialist niche.`,

  oral_health_policy_lead: `An Oral Health Policy Lead shapes the policies and strategies that affect oral health and dental services, working at the level of systems and government. You help design better oral health policy grounded in dental and public health understanding. It is a strategic, influential role at the meeting point of dentistry and policy.

Day to day you research and analyse oral health issues, develop policy and strategy, advise decision makers, and work with dental, public health and government colleagues. You help shape how oral health is improved and services organised, and much of the job is turning evidence into policy. The work is analytical, strategic and purpose driven.

Most people reach this role from a dental, public health or policy background, with expertise in oral health and policy. Relevant knowledge and analytical skills matter. Entry builds on a relevant background. From here you progress into senior policy and leadership roles.

It suits analytical, visionary people who want to improve oral health at a system level and enjoy combining evidence with policy. You need analytical skills, clear thinking and good communication. It is a poor fit for those who want hands on care or dislike policy work.

Oral health inequalities and pressures on dental services keep this policy area relevant, though it is a specialist niche shaped by politics. The field is influential. Demand is steady in a specialist area.

The work is office based, with generally reasonable hours, on relevant pay scales. Pay varies with background, typically strong given expertise and seniority. Demand is steady in a specialist niche.`,

  pharmacist: `A Pharmacist is an expert in medicines, making sure people get the right medicines and use them safely and effectively. You advise patients and other health professionals on medicines and increasingly provide clinical care directly. It is a trusted, science based healthcare profession central to safe medicine use.

Day to day you check and dispense prescriptions, advise patients on their medicines, answer health questions, and increasingly assess and treat minor conditions. You are a highly accessible source of health advice, and much of the job is making sure medicines are used safely and well. The work is scientific, caring and precise.

You become a pharmacist through a pharmacy degree, foundation training and registration with the GPhC. Entry to the degree is competitive. Once qualified you can work in community, hospital or other settings, and take on more clinical roles.

It suits caring, precise people with a drive for mastery who are interested in medicines and enjoy helping and advising people. You need scientific knowledge, precision, good people skills and reliability. It is a poor fit for those who dislike detail and science or want purely hands on physical care.

Pharmacy is changing as pharmacists take on more clinical and prescribing roles, and technology and automation change dispensing, raising the value of clinical work. Demand is steady across settings. The profession is evolving towards more patient care.

The work is community, hospital or clinical based, with hours that vary by setting, on relevant pay scales. Pharmacists typically earn from around £35k, rising to £45k to £60k and beyond with experience and seniority. Demand is steady across healthcare.`,

  clinical_pharmacist: `A Clinical Pharmacist works closely with patients and healthcare teams to make sure medicines are used in the best possible way, often as part of a clinical team in hospitals or GP practices. You bring expert medicines knowledge directly into patient care. It is a patient facing, clinical branch of pharmacy.

Day to day you review patients' medicines, advise doctors and patients, adjust and increasingly prescribe treatments, and help manage conditions. You apply expert medicines knowledge to individual care, and much of the job is optimising treatment for patients. The work is clinical, analytical and caring.

You become a clinical pharmacist as a qualified pharmacist who develops clinical expertise, often with further training and prescribing qualifications. Pharmacy registration and clinical development are required. Entry builds on a pharmacy background. From here you progress to senior and advanced clinical pharmacy roles.

It suits caring, analytical people with a drive for mastery who want to work closely with patients and teams and enjoy applying medicines expertise. You need clinical knowledge, analytical skills and good communication. It is a poor fit for those who want purely dispensing roles or dislike patient contact.

Clinical pharmacy is expanding as pharmacists take on more clinical and prescribing responsibility, especially in GP practices and hospitals, so demand is growing. The role is increasingly central to care. Demand is strong and growing.

The work is hospital and clinical based, with generally reasonable hours, on relevant pay scales. Clinical pharmacists typically earn from around £40k, rising with experience and advanced roles. Demand is strong and growing.`,

  hospital_pharmacist: `A Hospital Pharmacist manages medicines within a hospital, making sure patients get the right treatments safely and advising the medical team on their use. You oversee complex medicines for very ill patients and support their care. It is a clinical, science based branch of pharmacy in the hospital setting.

Day to day you prepare and check medicines, review patients' treatments, advise doctors and nurses, and help manage complex and specialist medicines. You ensure safe, effective medicine use in a demanding setting, and much of the job is expert medicines management for hospital patients. The work is scientific, clinical and precise.

You become a hospital pharmacist as a qualified pharmacist who works in and specialises within hospitals, often with further clinical training. Pharmacy registration is required. Entry builds on a pharmacy background. From here you progress to senior and specialist hospital pharmacy roles.

It suits precise, analytical people with a drive for mastery who enjoy complex medicines work and being part of a clinical team. You need scientific and clinical knowledge, precision and good communication. It is a poor fit for those who want community retail settings or dislike detail.

Hospital pharmacy is expanding as pharmacists take on more clinical roles, and technology changes how medicines are managed, supporting demand. The role is increasingly clinical. Demand is steady to strong.

The work is hospital based, sometimes with on call, on NHS pay scales. Hospital pharmacists typically earn from around £37k, rising to £45k to £60k and beyond with experience and seniority. Demand is steady to strong.`,

  community_pharmacist: `A Community Pharmacist works in a local pharmacy, providing accessible health advice and medicines to the public and increasingly offering clinical services. You are often the most accessible healthcare professional, helping people with medicines and minor conditions. It is a trusted, people focused branch of pharmacy at the heart of the community.

Day to day you dispense and check prescriptions, advise patients on medicines and health, treat minor conditions, and increasingly provide services like vaccinations. You are a first port of call for health advice, and much of the job is helping people use medicines safely and stay well. The work is caring, scientific and people focused.

You become a community pharmacist through a pharmacy degree, foundation training and GPhC registration. Entry to the degree is competitive. Once qualified you work in community pharmacy and can progress to management or ownership.

It suits caring, sociable people with a drive for mastery who enjoy advising and helping people and have a head for medicines. You need scientific knowledge, good people skills, precision and reliability. It is a poor fit for those who want hospital only roles or dislike public contact.

Community pharmacy is changing as pharmacists take on more clinical services and prescribing, while dispensing is increasingly automated, shifting the role towards patient care. Demand is steady and the role is evolving. Demand is steady.

The work is pharmacy based, often including some weekends, on relevant pay scales. Community pharmacists typically earn from around £40k, rising with experience and management roles. Demand is steady across community pharmacy.`,

  pharmacy_manager: `A Pharmacy Manager runs a pharmacy, leading the team and business while making sure patients get safe, high quality care and advice. You combine pharmacy expertise with management to run the pharmacy well. It is a leadership role for pharmacists or experienced pharmacy staff.

Day to day you lead the pharmacy team, oversee dispensing and services, manage stock, budgets and standards, and make sure patients get good care. You keep the pharmacy running well, and much of the job is leading people and running the business alongside patient care. The work is organised, people focused and commercial.

Most pharmacy managers are qualified pharmacists who move into management, or experienced pharmacy staff, with leadership skills. Pharmacy experience and management ability matter. Entry builds on pharmacy experience. From here you progress to area and senior pharmacy management.

It suits driven, organised people who enjoy leading teams and running a business while caring about patients. You need leadership, organisation, pharmacy knowledge and people skills. It is a poor fit for those who want purely clinical work or dislike management.

Pharmacy is changing with more clinical services and automation, and good managers who can lead this are valued, supporting demand. The role blends care and business. Demand is steady.

The work is pharmacy based, with hours that can include weekends, on relevant pay scales. Pharmacy managers typically earn from around £45k, rising with experience and seniority. Demand is steady across pharmacy.`,

  pharmaceutical_scientist: `A Pharmaceutical Scientist researches and develops medicines, working to discover, design and improve the drugs that treat disease. You apply science to create and refine medicines, from early research to production. It is a science based role central to developing the treatments of the future.

Day to day you carry out research and experiments, develop and test drug formulations, analyse results, and work with research and development teams. You apply deep science to creating medicines, and much of the job is rigorous research and development. The work is analytical, technical and purpose driven.

Most people enter with a pharmacy, pharmacology, chemistry or related degree, often a master's or PhD, through a graduate scheme or research role in industry. Scientific expertise matters, and advanced study helps. Entry is competitive. From scientist you progress to senior and specialist research and development roles.

It suits analytical, inventive people with technical curiosity who enjoy research and want to help create medicines. You need strong scientific skills, precision and persistence. It is a poor fit for those who want patient contact or dislike lab research.

Drug development is advancing with new science, data and AI, which are changing how medicines are discovered, supporting demand for skilled scientists. The field is innovative. Demand is steady to strong in the pharmaceutical industry.

The work is lab and office based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £40k, rising to £50k to £70k and beyond as you specialise, higher with advanced qualifications. Demand is steady to strong.`,

  drug_development_associate: `A Drug Development Associate supports the process of turning promising compounds into approved medicines, helping run the studies and processes that develop new drugs. You contribute to the complex journey of getting a medicine from the lab to patients. It is a role at the heart of pharmaceutical innovation.

Day to day you support drug development activities, help run studies and trials, analyse and manage data, and work with scientific and regulatory teams. You help move medicines through development, and much of the job is careful, detailed support for the drug development process. The work is analytical, detailed and collaborative.

Most people enter with a life science or related degree, through a graduate scheme or research role in the pharmaceutical industry. Scientific knowledge and attention to detail matter. Entry is competitive but industry demand is solid. From associate you progress into senior drug development and specialist roles.

It suits analytical, careful people with a drive for mastery who are interested in medicines and enjoy detailed, well regulated work. You need scientific knowledge, attention to detail and reliability. It is a poor fit for those who want patient contact or dislike process and detail.

Drug development is growing with advances in medicine and technology, and skilled people are valued, with steady demand across the industry. New science keeps expanding the field. Demand is steady to strong.

The work is office and lab based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £40k, rising to £50k to £70k and beyond as you specialise. Demand is steady to strong.`,

  medical_affairs_associate: `A Medical Affairs Associate acts as a bridge between a pharmaceutical company and the medical world, sharing accurate scientific and medical information about medicines. You help make sure doctors and others understand medicines correctly and that the company acts on medical evidence. It is a role combining science, communication and healthcare.

Day to day you provide scientific and medical information, support the development of medical materials, engage with healthcare professionals, and help ensure medical accuracy. You combine medical knowledge with communication, and much of the job is sharing and applying accurate medical information. The work is analytical, communicative and purpose driven.

Most people enter with a life science, pharmacy or related degree, sometimes a higher qualification, through a graduate or specialist role in industry. Scientific knowledge and communication skills matter. Entry is competitive. From associate you progress into senior medical affairs roles.

It suits caring, analytical people who are interested in medicine and enjoy combining science with communication and engagement. You need scientific knowledge, good communication and integrity. It is a poor fit for those who want hands on clinical care or dislike detail and rules.

Medical affairs is growing in importance as companies focus on accurate, ethical medical engagement, supporting demand. The role bridges science and healthcare. Demand is steady across the pharmaceutical industry.

The work is office based with some travel, and hours are generally reasonable. Graduate and early roles typically pay around £30k to £42k, rising to £50k to £75k and beyond as you specialise. Demand is steady across the industry.`,

  regulatory_affairs_associate: `A Regulatory Affairs Associate helps get medicines and healthcare products approved and keeps them compliant with regulations, guiding them through the strict processes that ensure they are safe and effective. You handle the regulatory side of bringing treatments to patients. It is a detailed, important role connecting science, regulation and healthcare.

Day to day you prepare and submit regulatory documents, interpret and apply regulations, liaise with regulators, and advise teams on requirements. You keep up with changing rules, and much of the job is making sure products meet exacting standards. The work is analytical, detailed and highly regulated.

Most people enter with a life science, pharmacy or related degree, through a graduate scheme or by moving from research, quality or a related role. Attention to detail and clear communication matter. Entry is competitive but demand is solid. From associate you progress to senior and management regulatory roles.

It suits organised, analytical people who value accuracy and rules and want to help bring safe treatments to patients. You need care for detail, scientific understanding and clear writing. It is a poor fit for those who dislike regulation and paperwork or want lab work.

Regulation keeps growing more complex as science advances, sustaining strong demand for regulatory expertise, and digital submissions change the work. Skilled people are valued. Demand is strong across the industry.

The work is office or home based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £40k, rising to £50k to £80k and beyond as you specialise. Demand is strong.`,

  pharmacovigilance_associate: `A Pharmacovigilance Associate helps keep medicines safe after they reach patients, monitoring and assessing their side effects and safety in real world use. You watch over the safety of medicines to protect patients. It is a detailed, purposeful role focused on medicine safety.

Day to day you collect and assess reports of side effects, analyse safety data, prepare safety reports, and help ensure medicines remain safe to use. You keep a close eye on medicine safety, and much of the job is careful monitoring and analysis to protect patients. The work is analytical, detailed and purpose driven.

Most people enter with a life science, pharmacy or related degree, through a graduate or specialist role in the pharmaceutical industry or regulators. Attention to detail and analytical skills matter. Entry is competitive but demand is solid. From associate you progress to senior and management pharmacovigilance roles.

It suits analytical, careful people with a sense of purpose who value accuracy and want to protect patients. You need attention to detail, analytical skills and reliability. It is a poor fit for those who want patient contact or dislike detailed data work.

Medicine safety is a growing priority as regulation tightens and data grows, and technology and AI increasingly support monitoring, supporting demand. The field is important and expanding. Demand is strong.

The work is office or home based, with generally reasonable hours. Graduate and early roles typically pay around £28k to £40k, rising to £50k to £75k and beyond as you specialise. Demand is strong.`,

  medicines_safety_officer: `A Medicines Safety Officer works to make sure medicines are used safely within healthcare, reducing the risk of errors and harm from medication. You help improve how medicines are prescribed, handled and used to keep patients safe. It is a purposeful role focused on safe medicine use in practice.

Day to day you monitor and investigate medication safety issues, analyse incidents, develop safety improvements, and advise and train colleagues. You help prevent medication errors, and much of the job is making the use of medicines safer across a service. The work is analytical, preventative and purpose driven.

Most people enter from a pharmacy, nursing or healthcare background, with knowledge of medicines and safety, sometimes with further training. Relevant experience and analytical skills matter. Entry builds on a healthcare background. From officer you progress to senior medicines safety and quality roles.

It suits careful, purposeful people who want to protect patients and enjoy improving safety through analysis and change. You need attention to detail, analytical skills and good communication. It is a poor fit for those who dislike detail and process or want purely hands on care.

Medicine safety is an increasing focus in healthcare, and dedicated safety roles are valued, supporting demand. Reducing harm from medicines is a continuing priority. Demand is steady.

The work is office and clinical based, with generally reasonable hours, on relevant pay scales. Pay varies with background, typically from around £40k rising with seniority. Demand is steady.`,

  medicines_policy_officer: `A Medicines Policy Officer helps shape the policies and decisions that affect how medicines are approved, funded and used across the health system. You work at the level of systems and policy to improve how medicines benefit patients and society. It is a strategic role at the meeting point of medicines and policy.

Day to day you research and analyse issues around medicines, develop policy and advice, and work with clinical, regulatory and government colleagues. You help shape how medicines are managed and funded, and much of the job is turning evidence into medicines policy. The work is analytical, strategic and purpose driven.

Most people reach this role from a pharmacy, science, health or policy background, with expertise in medicines and policy. Relevant knowledge and analytical skills matter. Entry builds on a relevant background. From officer you progress into senior policy and leadership roles.

It suits analytical, visionary people who want to improve how medicines serve society and enjoy combining evidence with policy. You need analytical skills, clear thinking and good communication. It is a poor fit for those who want hands on care or dislike policy work.

Medicines policy is important amid pressures on funding, access and new expensive treatments, keeping the field relevant, though it is a specialist niche shaped by politics. The work is influential. Demand is steady in a specialist area.

The work is office based, with generally reasonable hours, on relevant pay scales. Pay varies with background and seniority, typically strong given expertise. Demand is steady in a specialist niche.`,

  public_health_pharmacist: `A Public Health Pharmacist uses expertise in medicines to improve the health of whole communities, from promoting healthy living to improving how medicines are used across populations. You bring a medicines perspective to public health. It is a role that combines pharmacy with population health.

Day to day you develop and support public health programmes involving medicines, advise on medicines use across services, analyse health data, and work with public health and healthcare teams. You focus on health at a population level, and much of the job is improving community health through better medicines use and prevention. The work is analytical, collaborative and purpose driven.

Most people are pharmacists who develop public health expertise, sometimes with further study. Pharmacy registration and public health interest matter. Entry builds on a pharmacy background. From here you progress to senior public health and pharmacy leadership roles.

It suits caring, purposeful people who want to improve community health and enjoy combining medicines expertise with public health. You need pharmacy knowledge, analytical skills and good communication. It is a poor fit for those who want individual patient dispensing or dislike data and policy.

Prevention and the effective use of medicines across populations are recognised priorities, keeping this specialist role relevant, though it is a niche. The field is valued. Demand is steady in a specialist area.

The work is office and community based, with generally reasonable hours, on relevant pay scales. Pay is strong given the pharmacy qualification and specialism. Demand is steady in a specialist niche.`,
};

module.exports = { ROLE_DESCRIPTIONS };
