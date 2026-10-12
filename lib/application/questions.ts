import type { Question, Section } from './types';

export const SCHEMA_VERSION = 'v4';

export const BEFORE_YOU_START: string[] = [
  'Your active user count today, and your own definition of "active".',
  'The month and year the first person outside your organisation used what you built.',
  'Your three largest delivery sites or partners, with users today and start dates.',
  'Your primary outcome metric and how you measure it.',
  'Your single best outcome result: the number, the sample, who measured it and when.',
];

export const CONFIRMATION_TEXT =
  'Every number in this application is one I can show you the source for. I understand that shortlisted applicants have a 45-minute conversation with the Mulago and Taleemabad team, and that the conversation starts from these answers.';

const PROVINCES = ['Punjab', 'Sindh', 'KP', 'Balochistan', 'ICT', 'AJK', 'GB', 'Outside Pakistan'];

export const SECTIONS: Section[] = [
  {
    id: 'A',
    title: 'Organisation',
    questions: [
      { id: 'A1', kind: 'text', label: 'Organisation name', help: 'Legal registered name.', required: true, maxChars: 100 },
      { id: 'A2', kind: 'text', label: 'Name you operate under, if different', help: 'Leave blank if the same.', required: false, maxChars: 100 },
      { id: 'A3', kind: 'radio', label: 'Organisation type', required: true, options: ['For-profit', 'Non-profit', 'Hybrid (both entities)'] },
      {
        id: 'A4', kind: 'select', label: 'Legal registration', required: true,
        options: ['Pvt. Limited', 'Section 42', 'Trust', 'Society', 'SMC-Pvt Ltd', 'US 501(c)(3)', 'Other', 'Registration in progress'],
        specify: { options: ['Other'], maxChars: 60 },
      },
      { id: 'A5', kind: 'year', label: 'Year first registered', help: 'YYYY. The entity that runs the programme you are applying with.', required: true },
      { id: 'A6', kind: 'text', label: 'Headquarters city and country', required: true, maxChars: 60 },
      {
        id: 'A7', kind: 'multiselect', label: 'Where you currently operate',
        help: 'Only places where you have active users today. Not places you plan to enter.',
        required: true, options: PROVINCES, specify: { options: ['Outside Pakistan'], maxChars: 60 },
      },
      {
        id: 'A8', kind: 'select', label: 'Sector', help: 'Pick the one where your primary outcome sits.', required: true,
        options: ['Education & ECD', 'Health', 'Livelihoods & Employment', 'Financial Inclusion', 'Water & Sanitation', 'Agriculture & Food', 'Energy', 'Climate & Conservation', 'Other'],
      },
      { id: 'A9', kind: 'url', label: 'Website', help: 'Enter "none" if you do not have one.', required: true, acceptWords: ['none'] },
      { id: 'A10', kind: 'number', label: 'Total annual budget, most recent complete financial year, USD', help: 'Total expenditure, not income.', required: true, allowUntracked: true },
      { id: 'A11', kind: 'number', label: 'Full-time staff today', help: 'Full-time equivalents on your payroll. Exclude volunteers and government staff.', required: true },
      { id: 'A12', kind: 'number', label: 'Part-time, contract and field staff today', required: true },
    ],
  },
  {
    id: 'B',
    title: 'Applicant',
    questions: [
      { id: 'B1', kind: 'text', label: 'Full name', required: true, maxChars: 80 },
      { id: 'B2', kind: 'text', label: 'Role title', required: true, maxChars: 60 },
      { id: 'B3', kind: 'email', label: 'Email', required: true },
      { id: 'B4', kind: 'phone', label: 'Phone, with country code', required: true },
      { id: 'B5', kind: 'url', label: 'LinkedIn', help: 'Enter "none" if you do not have one.', required: true, acceptWords: ['none'] },
    ],
  },
  {
    id: 'C',
    title: 'Where you actually are today',
    questions: [
      {
        id: 'C1', kind: 'radio', label: 'Which single statement is true of your product or programme today?',
        help: 'Choose the highest statement that is fully true today, not the one you expect to be true in three months. If two feel true, choose the lower one.',
        required: true,
        options: [
          'We have designed it. Nothing has been built or delivered yet.',
          'We have built it. No one outside our own team has used it yet.',
          'It is in pilot: real users are using it, in a small number of sites, under our direct day-to-day supervision.',
          'It runs at steady state in one geography, without the founder involved day to day.',
          'It runs at steady state in more than one geography.',
          'Someone other than us — a government body or partner organisation — is delivering it using our tools or platform.',
        ],
      },
      {
        id: 'C2', kind: 'monthYear', label: 'The month and year the first person outside your organisation used what you built',
        help: 'Not the month you registered, not the month you started building. The first real user.', required: true,
      },
      {
        id: 'C3', kind: 'sentence', label: 'Complete this sentence',
        help: 'The number is people using it today — not a cumulative total and not a target. The user category is the person who touches it directly: if a teacher uses your tool and her students benefit, your category is teachers. Give the definition of "active" you really use, including the time window.',
        required: true,
        parts: [
          'As of today,',
          { id: 'count', hint: 'number', maxChars: 9, numeric: true },
          { id: 'category', hint: 'user category', maxChars: 25 },
          'are actively using',
          { id: 'what', hint: 'what they are using', maxChars: 60 },
          '. We count someone as active if',
          { id: 'definition', hint: 'your definition', maxChars: 150 },
          '.',
        ],
      },
      {
        id: 'C4', kind: 'table', label: 'Your three largest delivery sites or partners',
        help: 'Name them — "a government partner in Punjab" is not an answer we can use. Multiple countries: fill it country-wise. Pakistan only: site-wise.',
        required: true, minRows: 1, maxRows: 3,
        columns: [
          { id: 'name', label: 'Name of the site, district or partner', kind: 'text', maxChars: 80 },
          { id: 'users', label: 'Users there today', kind: 'number' },
          { id: 'since', label: 'Working with them since (MM/YYYY)', kind: 'monthYear' },
        ],
      },
      {
        id: 'C5', kind: 'multiselect', label: 'What does a user actually interact with?', required: true,
        options: ['A physical product', 'A mobile app', 'WhatsApp, SMS or voice', 'A web platform or dashboard', 'In-person training or a curriculum', 'A financial product', 'A service delivered face to face by a person', 'Other'],
        specify: { options: ['Other'], maxChars: 40 },
      },
    ],
  },
  {
    id: 'D',
    title: 'The problem',
    questions: [
      {
        id: 'D1', kind: 'text', multiline: true, label: 'Who are your users?',
        help: 'Demographics only — do not describe the problems they face here. Cover age range, gender split, income level, rural/peri-urban/urban, occupation, education, language.',
        placeholder: 'e.g. Government primary-school teachers, 70% women, aged 25–45, in peri-urban Rawalpindi; most hold a BA; Urdu-speaking; earn PKR 45,000–70,000 a month.',
        required: true, maxChars: 500,
      },
      {
        id: 'D2', kind: 'table', label: 'Name the problems you address',
        help: 'Only what you are addressing today. "Lack of empowerment" is not a problem a person experiences. "A mother walks 4km to the nearest clinic and is turned away twice out of three visits" is.',
        required: true, minRows: 1, maxRows: 3,
        columns: [
          { id: 'problem', label: 'The problem, as something a person experiences', kind: 'text', maxChars: 150 },
          { id: 'count', label: 'How many people in your country face it', kind: 'number', allowUntracked: true },
          { id: 'source', label: 'Where that number comes from', kind: 'text', maxChars: 80 },
        ],
      },
    ],
  },
  {
    id: 'E',
    title: 'The intervention and how it works',
    questions: [
      {
        id: 'E1', kind: 'text', multiline: true, label: 'Describe the intervention. What happens, in the order it happens.',
        help: 'Describe only what happens. If a sentence does not describe an action someone takes, delete it.',
        required: true, maxChars: 600,
      },
      { id: 'E2a', kind: 'text', multiline: true, label: 'Walk one user through it — first contact', help: 'How does a user find out about you and get started?', required: true, maxChars: 200 },
      { id: 'E2b', kind: 'text', multiline: true, label: 'Walk one user through it — the core interaction', help: 'What does the user do, how often, for how long each time?', required: true, maxChars: 200 },
      { id: 'E2c', kind: 'text', multiline: true, label: 'Walk one user through it — the end', help: 'What is different for that user when they are done?', required: true, maxChars: 200 },
      {
        id: 'E3', kind: 'sentence', label: 'Complete this chain',
        help: 'The last blank should name the same thing as your primary metric in Section F.', required: true,
        parts: [
          'We do', { id: 'action', hint: 'what you do', maxChars: 120 },
          '→ which causes', { id: 'user', hint: 'the user', maxChars: 120 },
          'to do', { id: 'behaviour', hint: 'what they do', maxChars: 120 },
          'differently → which produces', { id: 'outcome', hint: 'the outcome', maxChars: 120 },
          '→ which we measure as', { id: 'measure', hint: 'your measure', maxChars: 120 }, '.',
        ],
      },
    ],
  },
  {
    id: 'F',
    title: 'Evidence',
    questions: [
      {
        id: 'F1', kind: 'radio', numbered: true, label: 'Which statement describes your strongest evidence today?',
        help: 'A study in progress is not a study completed, and a study you are running yourself is not an independent one. We select organisations at every level on this list. What we cannot work with is a claim we cannot place on it.',
        required: true,
        options: [
          'User testimonials and anecdotes',
          'Usage or output data only — how much we delivered, and to whom',
          'Before-and-after outcome data on our own users, with no comparison group',
          'Outcome data with a non-randomised comparison group',
          'A randomised or quasi-experimental study we are running ourselves, in progress',
          'A randomised or quasi-experimental study we ran ourselves, completed, results in hand',
          'An independent third-party evaluation, completed — not an RCT',
          'An RCT by an independent third party, in progress',
          'An RCT by an independent third party, completed, results in hand',
        ],
      },
      {
        id: 'F2', kind: 'table', label: 'Your single best outcome result', help: 'One row. Every cell is required.',
        required: true, minRows: 1, maxRows: 1,
        columns: [
          { id: 'measured', label: 'What was measured', kind: 'text', maxChars: 120 },
          { id: 'result', label: 'The result (number and unit)', kind: 'text', maxChars: 60 },
          { id: 'sample', label: 'Sample size', kind: 'number' },
          { id: 'compared', label: 'What it was compared against', kind: 'text', maxChars: 120 },
          { id: 'who', label: 'Who measured it (organisation or person, by name)', kind: 'text', maxChars: 80 },
          { id: 'when', label: 'When (MM/YYYY)', kind: 'monthYear' },
          { id: 'link', label: 'Public link, or "not public"', kind: 'url', acceptWords: ['not public'] },
        ],
      },
      {
        id: 'F3', kind: 'text', label: 'What is your primary metric?',
        help: 'One number, not a list. An outcome, not an output — "teachers trained" is an output; "percentage of Grade 3 students reading at grade level" is an outcome. State the unit. If your primary metric is currently an output, say so plainly and give it anyway.',
        required: true, maxChars: 120,
      },
      {
        id: 'F4', kind: 'text', multiline: true, label: 'How do you measure it?',
        help: 'Instrument or method; frequency; who collects it, by name; the sample or population; whether you have a baseline.',
        placeholder: 'e.g. ASER-style one-to-one reading test, administered each March and October by our 6-person M&E team (led by Ayesha Khan) to a random 10% of Grade 3 students in every partner school; baseline taken March 2024.',
        required: true, maxChars: 500,
      },
    ],
  },
  {
    id: 'G',
    title: 'Scale: who does it, who pays for it',
    questions: [
      {
        id: 'G1', kind: 'sentence', label: 'Complete this sentence',
        help: 'The two blanks can be the same, and they can both be you — legitimate if you are a business. What they cannot be is "partners" or "the ecosystem".',
        required: true,
        parts: [
          'At scale,', { id: 'doer', hint: 'named entity or type of entity', maxChars: 80 },
          'delivers this, and', { id: 'payer', hint: 'named entity or type of entity', maxChars: 80 }, 'pays for it.',
        ],
      },
      {
        id: 'G2', kind: 'text', label: 'What will be your primary mechanism for reaching 1M+ users by 2030?',
        help: 'Examples: Digital Platform (App/SMS/Voice), Government Partnership/Adoption, Training of Trainers, Human Delivery, B2B Partnerships, Enterprise Sales.',
        required: true, maxChars: 40,
      },
      {
        id: 'G3', kind: 'text', multiline: true, label: 'Scale. What is your path or strategy to reach 1M users by 2030? Ideally, who would pay for user #1,000,001 — a government, a market, or a donor?',
        help: 'The longest answer we ask for anywhere. Spend it on specifics rather than ambition: the institutions you need by name and where each relationship actually stands today; what has to happen for the next one to say yes; the numbers you expect by 2027, 2028 and 2030; and who pays once donor money is out of the picture. "We will partner with government and scale nationally" tells us nothing.',
        required: true, maxChars: 1100,
      },
    ],
  },
  {
    id: 'H',
    title: 'How you found us',
    questions: [
      {
        id: 'H1', kind: 'select', label: 'How did you hear about the fellowship?', required: true,
        options: ['Website', 'Social media', 'Referred by another organisation', 'Email from Taleemabad', 'A funder', 'A previous fellow', 'Other'],
        specify: { options: ['Referred by another organisation', 'Other'], maxChars: 80 },
      },
      {
        id: 'H2', kind: 'text', multiline: true, label: 'Anything we should know that no question above let you tell us?',
        help: 'Optional. Not a place to restate your case; it is for context that has no home in the questions above.',
        required: false, maxChars: 400,
      },
    ],
  },
];

export const ALL_QUESTIONS: Question[] = SECTIONS.flatMap((s) => s.questions);
