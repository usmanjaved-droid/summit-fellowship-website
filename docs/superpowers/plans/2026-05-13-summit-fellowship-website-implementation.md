# Summit Fellowship Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page Next.js website for the Summit Fellowship with pages for fellows, faculty, schedule, logistics, and resources.

**Architecture:** Next.js App Router with component-based UI, static JSON data files, Tailwind CSS for styling. Data files structured to support multiple cohorts in the future.

**Tech Stack:** Next.js 15+, React 19+, Tailwind CSS 3.4+, TypeScript

---

## File Structure

```
summit-fellowship-website/
├── app/
│   ├── layout.tsx                 # Root layout with Header, Footer, Navigation
│   ├── page.tsx                   # Home page
│   ├── about/
│   │   └── page.tsx               # About Fellowship page
│   ├── fellows/
│   │   └── page.tsx               # Fellows Directory page
│   ├── faculty/
│   │   └── page.tsx               # Faculty & Team page
│   ├── schedule/
│   │   └── page.tsx               # Schedule/Itinerary page
│   ├── logistics/
│   │   └── page.tsx               # Logistics & Venue page
│   ├── resources/
│   │   └── page.tsx               # Resources page
│   ├── components/
│   │   ├── Header.tsx             # Top navigation bar
│   │   ├── Footer.tsx             # Footer component
│   │   ├── Navigation.tsx         # Main navigation menu
│   │   ├── FellowCard.tsx         # Fellow profile card
│   │   ├── FacultyCard.tsx        # Faculty profile card
│   │   ├── ScheduleDay.tsx        # Schedule day block with sessions
│   │   ├── ResourceCard.tsx       # Resource card
│   │   └── HeroSection.tsx        # Reusable hero banner
│   └── globals.css                # Global styles and Tailwind imports
├── data/
│   ├── fellows.json               # 11 fellow profiles
│   ├── faculty.json               # Faculty and organizing team
│   ├── schedule.json              # 7-day itinerary
│   ├── logistics.json             # Venue, travel, accommodation info
│   └── resources.json             # Resource library data
├── public/
│   ├── images/
│   │   ├── logo.png               # Summit Fellowship logo
│   │   ├── fellows/               # Fellow photos/avatars
│   │   ├── faculty/               # Faculty photos
│   │   └── venue/                 # Venue images
│   └── favicons/
├── lib/
│   ├── types.ts                   # TypeScript type definitions
│   └── utils.ts                   # Utility functions
├── next.config.ts                 # Next.js configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies and scripts
└── README.md                       # Project documentation
```

---

## Task 1: Initialize Next.js Project & Set Up Project Structure

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tailwind.config.ts`
- Create: `tsconfig.json`
- Create: `app/layout.tsx`
- Create: `app/globals.css`

- [ ] **Step 1: Initialize Next.js project with create-next-app**

```bash
cd d:\Summit Fellowship Website
npx create-next-app@latest . --typescript --tailwind --app
```

When prompted:
- Use TypeScript? **Yes**
- Use ESLint? **Yes**
- Use Tailwind CSS? **Yes**
- Use `src/` directory? **No**
- Use App Router? **Yes** (default)
- Customize import alias? **No**

- [ ] **Step 2: Verify installation**

Run:
```bash
npm run build
```

Expected: Build completes without errors, creates `.next/` directory

- [ ] **Step 3: Create necessary directories**

```bash
mkdir -p app/components app/about app/fellows app/faculty app/schedule app/logistics app/resources data public/images/{fellows,faculty,venue}
```

- [ ] **Step 4: Create TypeScript types file**

Create `lib/types.ts`:

```typescript
export interface Fellow {
  id: string;
  name: string;
  organization: string;
  sector: string;
  bio: string;
  email: string;
  phone: string;
  linkedin?: string;
  website?: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  title: string;
  organization: string;
  bio: string;
  role: "faculty" | "organizing";
  linkedin?: string;
  website?: string;
}

export interface ScheduleSession {
  time: string;
  title: string;
  description: string;
  topics: string[];
  location?: string;
}

export interface ScheduleDay {
  date: string;
  day: string;
  theme: string;
  sessions: ScheduleSession[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  link?: string;
  type: "document" | "article" | "toolkit";
}
```

- [ ] **Step 5: Create utility functions**

Create `lib/utils.ts`:

```typescript
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatTime(timeString: string): string {
  // Input format: "HH:MM"
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function filterBySearch(items: any[], searchTerm: string, searchFields: string[]): any[] {
  if (!searchTerm) return items;
  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    searchFields.some(field => 
      String(item[field]).toLowerCase().includes(term)
    )
  );
}

export function filterByCategory(items: any[], category: string, categoryField: string): any[] {
  if (!category) return items;
  return items.filter(item => item[categoryField] === category);
}
```

- [ ] **Step 6: Verify directory structure**

Run:
```bash
dir /B /S app data public lib
```

Expected: All directories created, no errors

- [ ] **Step 7: Commit initial setup**

```bash
git add -A
git commit -m "init: initialize next.js project with tailwind and typescript"
```

---

## Task 2: Create Data Files (JSON) with Fellowship Content

**Files:**
- Create: `data/fellows.json`
- Create: `data/faculty.json`
- Create: `data/schedule.json`
- Create: `data/logistics.json`
- Create: `data/resources.json`

- [ ] **Step 1: Create fellows.json**

Create `data/fellows.json`:

```json
{
  "cohort": "2026-skardu",
  "fellows": [
    {
      "id": "rubeena-kidwai",
      "name": "Dr. Rubeena Kidwai",
      "organization": "Taskeen Health Initiative",
      "sector": "Mental Health",
      "bio": "Provides mental health support through helplines and counseling services to reduce stigma and increase awareness in Pakistan. Played a key role in decriminalizing suicide.",
      "email": "rubeena@taskeen.org",
      "phone": "+923002126284",
      "linkedin": "https://pk.linkedin.com/in/rubeena-kidwai-63768634",
      "website": "https://taskeen.org/"
    },
    {
      "id": "azima-dhanjee",
      "name": "Azima Dhanjee",
      "organization": "ConnectHear",
      "sector": "Disability",
      "bio": "Makes hearing aids affordable and accessible to low-income hearing-impaired people through innovative design and financing options.",
      "email": "azima@connecthear.org",
      "phone": "+923312610146",
      "linkedin": "https://www.linkedin.com/in/azimadhanjee",
      "website": "https://www.connecthear.org/"
    },
    {
      "id": "habiba-banu",
      "name": "Habiba Banu",
      "organization": "Spiro",
      "sector": "Health",
      "bio": "Provides affordable respiratory care and asthma management tools for low-income patients, addressing the gap in diagnostic capabilities in Pakistan's healthcare system.",
      "email": "habiba.banu@spiro.ngo",
      "phone": "+44 (0)7703 563 810",
      "linkedin": "https://uk.linkedin.com/in/habiba-banu",
      "website": "https://www.spiro.ngo/"
    },
    {
      "id": "saad-hussain",
      "name": "Saad Hussain",
      "organization": "Awaaz-e-Sehat Foundation",
      "sector": "Health",
      "bio": "Uses AI-powered voice-activated technology in Urdu to help health workers detect maternal health risks early. Improved risk detection from 7% to 40% in pilot testing.",
      "email": "saad.hussain@awaazesehat.com",
      "phone": "+923334217251",
      "linkedin": "https://www.linkedin.com/in/saad-h",
      "website": "https://www.awaazesehat.com/"
    },
    {
      "id": "lala-rukh",
      "name": "Lala Rukh Fazal-Ur-Rahman",
      "organization": "Science Fuse",
      "sector": "Science Education",
      "bio": "Brings STEM education to underserved students through hands-on activities and shows. Has impacted 45,000 children and trained 650 teachers across 250 schools in Pakistan.",
      "email": "lalah_rukh@hotmail.com",
      "phone": "+923211288701",
      "linkedin": "https://pk.linkedin.com/in/lala-rukh-fazal-ur-rahman-73735a95",
      "website": "https://sciencefuse.com/"
    },
    {
      "id": "khushbakht-shah",
      "name": "Khushbakht Shah Jillani",
      "organization": "Mehfooz AI",
      "sector": "Legal",
      "bio": "Uses AI to support domestic violence survivors in Pakistan by analyzing evidence, detecting bias, and generating legal briefs to help accelerate protection orders.",
      "email": "khushbakhtlaw@gmail.com",
      "phone": "+92 335 2350668",
      "linkedin": "https://www.linkedin.com/in/khushbakhtshahjillani/",
      "website": "https://mehfooz.ai/"
    },
    {
      "id": "maira-siddiqui",
      "name": "Maira Siddiqui",
      "organization": "Chiragh Education Technologies",
      "sector": "Education",
      "bio": "Turns Pakistan's school curriculum into gamified cartoons in local languages (Urdu, Punjabi, Pashto). Makes learning accessible via smartphone for grades nursery to 5.",
      "email": "maira@chiraghtech.com",
      "phone": "+923453083194",
      "linkedin": "https://www.linkedin.com/in/maira-siddiqui-chiragh-edtech",
      "website": "https://chiraghtech.com/"
    },
    {
      "id": "adnan-qureshi",
      "name": "Adnan Qureshi",
      "organization": "Teach the World Foundation",
      "sector": "Education",
      "bio": "Brings digital learning to underserved communities through MicroSchools and smartphone apps. Currently serves 14,317 students across 141 schools with plans to expand significantly.",
      "email": "adnan.ahmed@teachtheworld.org",
      "phone": "+923400853633",
      "linkedin": "https://www.linkedin.com/in/adnanahmedqureshi/",
      "website": "https://www.teachtheworldfoundation.com/"
    },
    {
      "id": "muhammad-waqas",
      "name": "Muhammad Waqas",
      "organization": "WonderTree",
      "sector": "Special Education",
      "bio": "Creates augmented reality games to help children with special needs (autism, cerebral palsy, ADHD) develop physical, cognitive, and social skills. Operating in 45 Pakistani schools.",
      "email": "mwaqas@wondertree.co",
      "phone": "+923333228386",
      "linkedin": "https://www.linkedin.com/in/mwwaqas/",
      "website": "https://wondertree.co/"
    },
    {
      "id": "ali-siddiq",
      "name": "Ali Siddiq",
      "organization": "Amal Academy",
      "sector": "Livelihoods",
      "bio": "Bridges the gap between university education and job market through a 3-month fellowship teaching critical thinking and professional skills. 81% of graduates are employed within 3 months.",
      "email": "ali@amalacademy.org",
      "phone": "+923008443979",
      "linkedin": "https://www.linkedin.com/in/alisiddiq/",
      "website": "https://www.amalacademy.org/"
    },
    {
      "id": "osama-shahid",
      "name": "Osama Shahid",
      "organization": "Soby Trading Co",
      "sector": "Agriculture",
      "bio": "Empowers marginalized communities through fair trade practices and direct market linkages, ensuring farmers and artisans receive fair prices for their products.",
      "email": "sobyagengineers@gmail.com",
      "phone": "+92 321 8626068",
      "linkedin": "https://www.linkedin.com/in/osama-shahid-059b381a5/",
      "website": "https://www.sobyagro.co/"
    }
  ]
}
```

- [ ] **Step 2: Create faculty.json**

Create `data/faculty.json`:

```json
{
  "faculty": [
    {
      "id": "kevin-starr",
      "name": "Kevin Starr",
      "title": "CEO, Mulago Foundation",
      "organization": "Mulago Foundation",
      "bio": "The architect of the Scale Screen and Doer & Payer frameworks, Kevin brings decades of expertise in helping founders reconstruct their models to be Good Enough, Big Enough, Simple Enough, and Cheap Enough to achieve national impact.",
      "role": "faculty",
      "linkedin": "https://www.linkedin.com/in/kevin-starr",
      "website": "https://www.mulagofoundation.org/"
    },
    {
      "id": "ahson-rabbani",
      "name": "Dr. Ahson Rabbani",
      "title": "CEO, ChildLife Foundation",
      "organization": "ChildLife Foundation",
      "bio": "Under his leadership, ChildLife has massively scaled its operations from a few hospitals to a nationwide footprint. He provides fellows with a real-world, localized blueprint for scaling life-saving operations and securing government partnerships.",
      "role": "faculty",
      "linkedin": "https://www.linkedin.com/in/ahson-rabbani/",
      "website": "https://childlifefoundation.org/"
    },
    {
      "id": "sara-khurram",
      "name": "Dr. Sara Saeed Khurram",
      "title": "Co-Founder & CEO, Sehat Kahani",
      "organization": "Sehat Kahani",
      "bio": "As a Mulago Rainer Arnhold Fellow, Sara successfully applied the design-for-scale frameworks to Sehat Kahani, scaling it to millions of consultations. She bridges theoretical frameworks with practical realities of scaling a digital health enterprise in Pakistan.",
      "role": "faculty",
      "linkedin": "https://www.linkedin.com/in/dr-sara-saeed-khurram/",
      "website": "https://sehatkahani.com/"
    },
    {
      "id": "sarah-farooq",
      "name": "Sarah Farooq",
      "title": "Director, Acumen Fund",
      "organization": "Acumen Fund",
      "bio": "With experience at Acumen investing patient capital and her previous operational background as COO at Taleemabad, Sarah provides deep insights into how funders evaluate investability, scale strategy, and operational readiness.",
      "role": "faculty",
      "linkedin": "https://www.linkedin.com/in/sarah-farooq/",
      "website": "https://acumen.org/"
    },
    {
      "id": "nadir-shams",
      "name": "Nadir Shams",
      "title": "Founder, Friends of Pakistan Society & Fund",
      "organization": "Friends of Pakistan Society",
      "bio": "Formerly a Managing Director at the Skoll Foundation, Nadir brings world-class philanthropic and investment expertise, guiding fellows on what global and diaspora capital requires to fund systemic change in Pakistan.",
      "role": "faculty",
      "linkedin": "https://www.linkedin.com/in/nadirshams/",
      "website": "https://fopk.org/"
    }
  ],
  "organizingTeam": [
    {
      "id": "haroon-yasin",
      "name": "Haroon Yasin",
      "title": "Founder & CEO, Taleemabad",
      "organization": "Taleemabad",
      "bio": "As the co-host of the fellowship, Haroon shares his firsthand experience of evolving Taleemabad from an evening school in the slums to a national enterprise partnering with the government and international agencies.",
      "role": "organizing",
      "linkedin": "https://www.linkedin.com/in/haroon-yasin/",
      "website": "https://taleemabad.com/"
    },
    {
      "id": "sabeena-abbasi",
      "name": "Sabeena Abbasi",
      "title": "Chief Sustainability & Impact Officer, Taleemabad",
      "organization": "Taleemabad",
      "bio": "Sabeena drives the sustainability, impact strategy, and community-of-practice initiatives. She helps fellows connect their programmatic models to measurable, long-term impact metrics and inclusive learning design.",
      "role": "organizing",
      "linkedin": "https://www.linkedin.com/in/sabeena-abbasi/",
      "website": "https://taleemabad.com/"
    },
    {
      "id": "abida-hassan",
      "name": "Abida Hassan",
      "title": "General Manager, ChildLife Foundation",
      "organization": "ChildLife Foundation",
      "bio": "Abida plays a crucial role in the on-the-ground operational execution of ChildLife's scale strategy. She mentors fellows on the intricate logistics, team management, and operational resilience required to sustain growth.",
      "role": "organizing",
      "linkedin": "https://www.linkedin.com/in/abida-hassan-clf/",
      "website": "https://childlifefoundation.org/"
    },
    {
      "id": "usman-javed",
      "name": "Muhammad Usman Javed",
      "title": "Head of Business Strategy and Fundraising, Taleemabad",
      "organization": "Taleemabad",
      "bio": "As the architect of the Taleemabad 2026 Strategic Goals and core organizer of the Skardu Scale-Up Fellowship, Usman ensures the cohort receives actionable, high-leverage frameworks while orchestrating strategic partnerships.",
      "role": "organizing",
      "linkedin": "https://www.linkedin.com/in/usman-javed/",
      "website": "https://taleemabad.com/"
    }
  ]
}
```

- [ ] **Step 3: Create schedule.json**

Create `data/schedule.json`:

```json
{
  "cohort": "2026-skardu",
  "startDate": "2026-06-07",
  "endDate": "2026-06-14",
  "location": "Khoj Resort, Skardu",
  "days": [
    {
      "date": "2026-06-07",
      "dayNumber": 0,
      "dayName": "Sunday",
      "theme": "Arrivals & Welcome",
      "sessions": [
        {
          "time": "07:00",
          "title": "Arrivals & Check-in",
          "description": "Staggered arrivals into Skardu. Airport pickups and transfers to venue. Check-in and room settle-in.",
          "topics": ["Check-in", "Welcome tea", "Rest"],
          "location": "Khoj Resort"
        },
        {
          "time": "18:30",
          "title": "Welcome Dinner",
          "description": "Relaxed seated dinner. Informal introductions as fellows arrive.",
          "topics": ["Networking", "Dinner"],
          "location": "Khoj Resort"
        },
        {
          "time": "19:30",
          "title": "Orientation",
          "description": "Introductions (fellows + faculty). Welcome note from Mulago & Taleemabad. Norm setting (presence, feedback, ground rules). What to expect in the coming week.",
          "topics": ["Introductions", "Ground rules", "Program overview"],
          "location": "Main Hall"
        }
      ]
    },
    {
      "date": "2026-06-08",
      "dayNumber": 1,
      "dayName": "Monday",
      "theme": "Design for Impact at Scale",
      "sessions": [
        {
          "time": "07:30",
          "title": "Welcome Breakfast",
          "description": "Mulago-style icebreaker",
          "topics": ["Breakfast", "Icebreaker"],
          "location": "Dining Hall"
        },
        {
          "time": "09:00",
          "title": "Design for Impact at Scale",
          "description": "Core Block covering Mission, Big Idea, Theory, Model, and Behavior Drivers.",
          "topics": ["Mission", "Big Idea", "Theory of Change", "Model Design", "Behavior Drivers"],
          "location": "Main Hall"
        },
        {
          "time": "14:00",
          "title": "Doer & Payer at Scale + Scalability",
          "description": "Ultimate doer-at-scale, Ultimate payer-at-scale, Four Enoughs, Progression of Evidence.",
          "topics": ["Doer & Payer", "Four Enoughs", "Evidence Framework"],
          "location": "Main Hall"
        },
        {
          "time": "18:00",
          "title": "Integration + Synthesis",
          "description": "Reflection, peer feedback pairs, open Q&A with faculty. One-pager draft due.",
          "topics": ["Reflection", "Peer feedback", "Q&A"],
          "location": "Main Hall"
        },
        {
          "time": "19:30",
          "title": "Seated Dinner",
          "description": "Free time / open networking",
          "topics": ["Dinner", "Networking"],
          "location": "Dining Hall"
        }
      ]
    },
    {
      "date": "2026-06-09",
      "dayNumber": 2,
      "dayName": "Tuesday",
      "theme": "Scale Strategy & Impact Evidence",
      "sessions": [
        {
          "time": "07:30",
          "title": "Breakfast",
          "description": "",
          "topics": ["Breakfast"],
          "location": "Dining Hall"
        },
        {
          "time": "09:00",
          "title": "Scale Strategy — Part 1",
          "description": "Scale Screen Framework introduction",
          "topics": ["Scale Screen", "Framework overview"],
          "location": "Main Hall"
        },
        {
          "time": "11:00",
          "title": "Scale Strategy — Part 2",
          "description": "Applying the framework to your organization",
          "topics": ["Application", "Org-specific strategy"],
          "location": "Main Hall"
        },
        {
          "time": "14:00",
          "title": "Impact Evidence — Part 1",
          "description": "Levels of Evidence, Metrics Hierarchy",
          "topics": ["Evidence levels", "Metrics design"],
          "location": "Main Hall"
        },
        {
          "time": "15:00",
          "title": "Impact Evidence — Part 2",
          "description": "Designing Your Evidence Plan",
          "topics": ["Evidence planning", "Impact measurement"],
          "location": "Main Hall"
        },
        {
          "time": "17:30",
          "title": "Fellows Lightning Talks",
          "description": "5 × 8-min talks + Q&A (at Shigar Fort)",
          "topics": ["Pitching", "Presentation"],
          "location": "Shigar Fort"
        },
        {
          "time": "20:30",
          "title": "Fireside Chat with Kevin Starr",
          "description": "Kevin's Story + Q&A",
          "topics": ["Mentorship", "Scale stories"],
          "location": "Shigar Fort"
        }
      ]
    },
    {
      "date": "2026-06-10",
      "dayNumber": 3,
      "dayName": "Wednesday",
      "theme": "1-on-1 Clinics & Outdoor Learning",
      "sessions": [
        {
          "time": "07:30",
          "title": "Breakfast",
          "description": "",
          "topics": ["Breakfast"],
          "location": "Khoj Resort"
        },
        {
          "time": "08:30",
          "title": "Travel to Outdoor Location",
          "description": "Including arrival & setup (1.5 hours)",
          "topics": ["Travel", "Setup"],
          "location": "En route"
        },
        {
          "time": "10:30",
          "title": "Structured 1-on-1s with Faculty (Block A)",
          "description": "45-min rotations with Pakistani faculty: scaling strategy, impact measurement, iterative improvement, Design for Impact @ Scale",
          "topics": ["Mentoring", "1-on-1 coaching", "Feedback"],
          "location": "Outdoor location"
        },
        {
          "time": "14:00",
          "title": "Structured 1-on-1s with Faculty (Block B)",
          "description": "Continued rotations with faculty",
          "topics": ["Mentoring", "Coaching"],
          "location": "Outdoor location"
        },
        {
          "time": "16:00",
          "title": "Sightseeing + Activities",
          "description": "Explore Skardu landscape",
          "topics": ["Recreation", "Team bonding"],
          "location": "Skardu"
        },
        {
          "time": "18:30",
          "title": "Dinner at a Local's House",
          "description": "Cultural experience and networking",
          "topics": ["Cultural experience", "Networking"],
          "location": "Local home"
        },
        {
          "time": "20:00",
          "title": "Pit Stop at Skardu Bazar",
          "description": "Local market exploration",
          "topics": ["Shopping", "Local exploration"],
          "location": "Skardu Bazar"
        }
      ]
    },
    {
      "date": "2026-06-11",
      "dayNumber": 4,
      "dayName": "Thursday",
      "theme": "Iterative Organization & Culture",
      "sessions": [
        {
          "time": "07:30",
          "title": "Breakfast",
          "description": "",
          "topics": ["Breakfast"],
          "location": "Dining Hall"
        },
        {
          "time": "09:00",
          "title": "The Iterative Organization",
          "description": "Theory, Methods & Data Flows. What it means, why it matters, iteration methods, data flows.",
          "topics": ["Iteration frameworks", "Org design", "Data systems"],
          "location": "Main Hall"
        },
        {
          "time": "14:00",
          "title": "Iterative Org Workshop + People / Culture Deep Dive",
          "description": "Apply theory to your own org. Includes People / Culture module.",
          "topics": ["Org application", "Culture", "People"],
          "location": "Workshop rooms"
        },
        {
          "time": "17:00",
          "title": "TCF & CLF Session (Moderator: Haroon)",
          "description": "Parallel: Kevin/Nadir with Funders discussion",
          "topics": ["Fundraising", "Funder insights"],
          "location": "Multiple rooms"
        },
        {
          "time": "19:00",
          "title": "Dinner",
          "description": "Open networking",
          "topics": ["Dinner", "Networking"],
          "location": "Dining Hall"
        },
        {
          "time": "20:00",
          "title": "Fireside Chat with Dr. Asyia",
          "description": "Leadership and scaling insights",
          "topics": ["Leadership", "Scale stories"],
          "location": "Main Hall"
        }
      ]
    },
    {
      "date": "2026-06-12",
      "dayNumber": 5,
      "dayName": "Friday",
      "theme": "Communications & Pitch Coaching",
      "sessions": [
        {
          "time": "07:30",
          "title": "Breakfast",
          "description": "",
          "topics": ["Breakfast"],
          "location": "Dining Hall"
        },
        {
          "time": "09:00",
          "title": "Communications — Theory",
          "description": "Clear Language & Banned Words. Narrative Structure. 10-Minute Pitch Structure. The pitch is dead, long live the conversation.",
          "topics": ["Communication", "Storytelling", "Pitching"],
          "location": "Main Hall"
        },
        {
          "time": "14:00",
          "title": "Capacity Clinic",
          "description": "Building YOUR Presentation | 1:1 Pitch Coaching. Small group, facilitator-led. Participants draft Demo Day pitch.",
          "topics": ["Pitch coaching", "Presentation skills"],
          "location": "Workshop rooms"
        },
        {
          "time": "17:30",
          "title": "CEO Spotlight | Sara Saeed",
          "description": "Insights from a scaled founder",
          "topics": ["Founder story", "Scaling lessons"],
          "location": "Main Hall"
        },
        {
          "time": "18:30",
          "title": "CEO Spotlight | Aleem Walji",
          "description": "Leadership and impact insights",
          "topics": ["Leadership", "Impact"],
          "location": "Main Hall"
        },
        {
          "time": "19:30",
          "title": "Cultural Night",
          "description": "Local musicians + live BBQ + open networking",
          "topics": ["Music", "BBQ", "Celebration"],
          "location": "Venue"
        }
      ]
    },
    {
      "date": "2026-06-13",
      "dayNumber": 6,
      "dayName": "Saturday",
      "theme": "Demo Day & Celebration",
      "sessions": [
        {
          "time": "07:30",
          "title": "Breakfast",
          "description": "",
          "topics": ["Breakfast"],
          "location": "Dining Hall"
        },
        {
          "time": "09:00",
          "title": "Final Prep + Dress Rehearsal",
          "description": "Demo Day rehearsal and final preparations",
          "topics": ["Rehearsal", "Feedback"],
          "location": "Main Hall"
        },
        {
          "time": "10:30",
          "title": "Demo Day — Block 1",
          "description": "First set of participant presentations",
          "topics": ["Presentations", "Pitches"],
          "location": "Main Hall"
        },
        {
          "time": "14:00",
          "title": "Demo Day — Block 2",
          "description": "Remaining participant presentations",
          "topics": ["Presentations", "Pitches"],
          "location": "Main Hall"
        },
        {
          "time": "16:00",
          "title": "Interactive Session with the Funders",
          "description": "Q&A and discussion with funders",
          "topics": ["Funder engagement", "Fundraising"],
          "location": "Main Hall"
        },
        {
          "time": "17:00",
          "title": "What's Next? Wrap",
          "description": "Closing remarks and next steps",
          "topics": ["Next steps", "Closing"],
          "location": "Main Hall"
        },
        {
          "time": "18:00",
          "title": "Open Networking",
          "description": "Informal networking time",
          "topics": ["Networking"],
          "location": "Venue"
        },
        {
          "time": "19:00",
          "title": "Closing Celebration Dinner",
          "description": "Celebration + Open Networking",
          "topics": ["Celebration", "Networking"],
          "location": "Dining Hall"
        }
      ]
    },
    {
      "date": "2026-06-14",
      "dayNumber": 7,
      "dayName": "Sunday",
      "theme": "Departures",
      "sessions": [
        {
          "time": "07:00",
          "title": "Breakfast",
          "description": "Final breakfast",
          "topics": ["Breakfast"],
          "location": "Dining Hall"
        },
        {
          "time": "08:00",
          "title": "Departures",
          "description": "Staggered checkouts and transfers (from 8:00 AM onwards). No programming scheduled.",
          "topics": ["Checkout", "Goodbyes"],
          "location": "Khoj Resort"
        }
      ]
    }
  ]
}
```

- [ ] **Step 4: Create logistics.json**

Create `data/logistics.json`:

```json
{
  "cohort": "2026-skardu",
  "venue": {
    "name": "Khoj Resort",
    "city": "Skardu",
    "region": "Gilgit-Baltistan",
    "country": "Pakistan",
    "address": "Khoj Resort, Skardu",
    "coordinates": {
      "latitude": 35.2981,
      "longitude": 75.5597
    },
    "amenities": [
      "Comfortable rooms",
      "Restaurant & dining facilities",
      "Meeting halls",
      "Outdoor spaces for activities",
      "WiFi connectivity"
    ],
    "checkinTime": "Afternoon (Day 0)",
    "checkoutTime": "Morning (Day 7)"
  },
  "travel": {
    "flights": {
      "description": "Fly to Islamabad (Benazir Bhutto International Airport - ISD) or Peshawar (Peshawar International Airport - PEW), then connecting flight to Skardu.",
      "airlines": ["Pakistan International Airlines (PIA)", "Serene Air"],
      "notes": "Skardu airport has limited flights. Book early. Flight time from Islamabad to Skardu: ~1.5 hours."
    },
    "groundTransport": {
      "airportPickup": "Arranged by organizers from Skardu airport",
      "journeyTime": "30 minutes from airport to Khoj Resort",
      "notes": "Fellowship covers transportation to/from airport in Skardu"
    }
  },
  "accommodation": {
    "included": [
      "Double/single rooms based on preference",
      "All meals (breakfast, lunch, dinner)",
      "Tea/coffee and snacks throughout the day",
      "Airport transfers in Skardu"
    ],
    "roomSetup": "Comfortable, private rooms with basic amenities",
    "meals": "Pakistani cuisine with vegetarian and dietary accommodations available",
    "dietary": "Please inform organizers of dietary restrictions in advance"
  },
  "climate": {
    "season": "Summer",
    "temperature": "15-25°C (59-77°F)",
    "conditions": "Pleasant summer weather, occasional rain",
    "altitude": "2,226 meters (7,300 feet) above sea level",
    "notes": "Skardu is in the mountains. Bring layers. Sun protection is important."
  },
  "packingList": [
    "Light summer clothing and layers",
    "Comfortable walking shoes",
    "Sunscreen and hat",
    "Light sweater or jacket for evenings",
    "Personal medications and toiletries",
    "Passport and visa (if applicable)",
    "Laptop/tablet for note-taking",
    "Power adapters (Pakistani standard: 220V, 50Hz, Type C plugs)"
  ],
  "connectivity": {
    "timezone": "Pakistan Standard Time (PKT) — UTC+5",
    "internet": "WiFi available at venue. Mobile networks: Jazz, Zong, Telenor have coverage in Skardu",
    "notes": "Internet may be intermittent due to remote location"
  },
  "faq": [
    {
      "question": "Is travel to/from the airport included?",
      "answer": "Yes, airport transfers to/from Skardu airport are arranged and covered by the fellowship."
    },
    {
      "question": "What about meals and accommodation?",
      "answer": "All meals (breakfast, lunch, dinner) and accommodation at Khoj Resort are included in the fellowship."
    },
    {
      "question": "Is there WiFi at the venue?",
      "answer": "Yes, but internet connectivity may be intermittent due to the remote location."
    },
    {
      "question": "What if I have dietary restrictions?",
      "answer": "Please inform the organizing team in advance. Vegetarian, vegan, and other dietary accommodations can be arranged."
    },
    {
      "question": "What's the weather like in Skardu in June?",
      "answer": "Pleasant summer weather with temperatures 15-25°C. Bring layers and sun protection."
    }
  ]
}
```

- [ ] **Step 5: Create resources.json**

Create `data/resources.json`:

```json
{
  "cohort": "2026-skardu",
  "resources": [
    {
      "id": "scale-screen-framework",
      "title": "Mulago Scale Screen Framework",
      "description": "The rigorous framework used throughout the fellowship to evaluate organizational scalability across four dimensions: Good Enough, Big Enough, Simple Enough, and Cheap Enough.",
      "category": "Framework",
      "type": "document",
      "link": "#"
    },
    {
      "id": "doer-payer-framework",
      "title": "Doer & Payer at Scale",
      "description": "Deep dive into identifying your ultimate doer (the entity that implements at scale) and ultimate payer (who funds it) — critical for designing scalable models.",
      "category": "Framework",
      "type": "document",
      "link": "#"
    },
    {
      "id": "impact-measurement-guide",
      "title": "Impact Measurement & Evidence Planning",
      "description": "A toolkit for designing credible evidence plans and measuring impact at scale. Includes metrics hierarchy and evaluation frameworks.",
      "category": "Tools",
      "type": "toolkit",
      "link": "#"
    },
    {
      "id": "iterative-org-guide",
      "title": "Building an Iterative Organization",
      "description": "Guide to creating organizational systems, data flows, and culture that enable continuous learning and improvement as you scale.",
      "category": "Framework",
      "type": "document",
      "link": "#"
    },
    {
      "id": "pitch-guide",
      "title": "10-Minute Pitch Framework",
      "description": "Structure for crafting clear, compelling narratives about your organization and its scale strategy. Includes storytelling principles and examples.",
      "category": "Communication",
      "type": "toolkit",
      "link": "#"
    }
  ]
}
```

- [ ] **Step 6: Verify JSON files are valid**

Run:
```bash
npm install jsonschema
node -e "const fs = require('fs'); const files = ['fellows.json', 'faculty.json', 'schedule.json', 'logistics.json', 'resources.json']; files.forEach(f => { try { JSON.parse(fs.readFileSync(`data/${f}`)); console.log(`✓ ${f} is valid`); } catch(e) { console.log(`✗ ${f} error: ${e.message}`); } });"
```

Expected: All 5 files show as valid

- [ ] **Step 7: Commit data files**

```bash
git add data/
git commit -m "data: add fellow, faculty, schedule, logistics, and resources data"
```

---

## Task 3: Create Shared Layout & Navigation Components

**Files:**
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/components/Header.tsx`
- Create: `app/components/Navigation.tsx`
- Create: `app/components/Footer.tsx`

- [ ] **Step 1: Update globals.css with Tailwind and custom styles**

Update `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Root variables */
:root {
  --primary: #1e40af;
  --primary-light: #3b82f6;
  --primary-dark: #1e3a8a;
  --accent: #ea580c;
  --accent-light: #fb923c;
  --text-dark: #1f2937;
  --text-light: #6b7280;
  --bg-light: #f9fafb;
  --border: #e5e7eb;
}

/* Typography */
body {
  @apply bg-white text-gray-900 antialiased;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

h1 {
  @apply text-4xl font-bold tracking-tight;
}

h2 {
  @apply text-3xl font-bold tracking-tight;
}

h3 {
  @apply text-2xl font-bold;
}

h4 {
  @apply text-xl font-bold;
}

/* Links */
a {
  @apply text-blue-600 hover:text-blue-800 transition-colors;
}

/* Buttons */
.btn-primary {
  @apply bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors;
}

/* Cards */
.card {
  @apply bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow;
}

/* Section spacing */
.section {
  @apply py-16 px-4 sm:px-6 lg:px-8;
}

.container-max {
  @apply max-w-7xl mx-auto;
}
```

- [ ] **Step 2: Create Header component**

Create `app/components/Header.tsx`:

```typescript
'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-blue-600">
            Summit
          </div>
          <span className="text-sm font-medium text-gray-600">Fellowship</span>
        </Link>

        {/* Navigation - will be handled by Navigation component */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            About
          </Link>
          <Link href="/fellows" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Fellows
          </Link>
          <Link href="/faculty" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Faculty
          </Link>
          <Link href="/schedule" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Schedule
          </Link>
          <Link href="/logistics" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Logistics
          </Link>
          <Link href="/resources" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
            Resources
          </Link>
        </nav>

        {/* Mobile menu button will go here in future */}
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Create Footer component**

Create `app/components/Footer.tsx`:

```typescript
'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold mb-4">Summit Fellowship</h3>
            <p className="text-gray-400 text-sm">
              A 7-day intensive retreat transforming social entrepreneurs from project-driven organizations to scale-ready impact machines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Pages</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/fellows" className="text-gray-400 hover:text-white transition-colors">Fellows</Link></li>
              <li><Link href="/faculty" className="text-gray-400 hover:text-white transition-colors">Faculty</Link></li>
              <li><Link href="/schedule" className="text-gray-400 hover:text-white transition-colors">Schedule</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: <a href="mailto:summit@taleemabad.com" className="text-white hover:text-blue-400">summit@taleemabad.com</a></li>
              <li>Organizing Team: Muhammad Usman Javed</li>
            </ul>
          </div>

          {/* Co-hosts */}
          <div>
            <h4 className="font-bold mb-4">Co-Hosts</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://taleemabad.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Taleemabad</a></li>
              <li><a href="https://mulagofoundation.org" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Mulago Foundation</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {currentYear} Summit Fellowship. All rights reserved. | Co-hosted by Taleemabad & Mulago Foundation
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Update root layout**

Update `app/layout.tsx`:

```typescript
import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Summit Fellowship | Skardu Scale-Up Fellowship',
  description: 'A 7-day intensive retreat for Pakistani social entrepreneurs to design scale-ready impact solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verify components render**

Run:
```bash
npm run dev
```

Expected: Dev server starts on localhost:3000 without errors

- [ ] **Step 6: Commit layout & components**

```bash
git add app/layout.tsx app/globals.css app/components/
git commit -m "feat: create shared layout, header, and footer components"
```

---

## Task 4: Create FellowCard and FacultyCard Components

**Files:**
- Create: `app/components/FellowCard.tsx`
- Create: `app/components/FacultyCard.tsx`

- [ ] **Step 1: Create FellowCard component**

Create `app/components/FellowCard.tsx`:

```typescript
import { Fellow } from '@/lib/types';
import Link from 'next/link';

interface FellowCardProps {
  fellow: Fellow;
}

export default function FellowCard({ fellow }: FellowCardProps) {
  return (
    <div className="card">
      {/* Avatar placeholder */}
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-xl font-bold text-blue-600">
          {fellow.name.charAt(0)}
        </span>
      </div>

      <h3 className="font-bold text-lg mb-1">{fellow.name}</h3>
      <p className="text-sm font-medium text-orange-600 mb-2">{fellow.organization}</p>
      <p className="text-xs bg-blue-50 text-blue-700 inline-block px-2 py-1 rounded mb-3">
        {fellow.sector}
      </p>

      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {fellow.bio}
      </p>

      <div className="flex gap-3 flex-wrap">
        {fellow.email && (
          <a href={`mailto:${fellow.email}`} className="text-xs text-blue-600 hover:text-blue-800">
            Email
          </a>
        )}
        {fellow.linkedin && (
          <a href={fellow.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-800">
            LinkedIn
          </a>
        )}
        {fellow.website && (
          <a href={fellow.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-800">
            Website
          </a>
        )}
        {fellow.phone && (
          <a href={`tel:${fellow.phone}`} className="text-xs text-blue-600 hover:text-blue-800">
            Call
          </a>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create FacultyCard component**

Create `app/components/FacultyCard.tsx`:

```typescript
import { FacultyMember } from '@/lib/types';

interface FacultyCardProps {
  member: FacultyMember;
}

export default function FacultyCard({ member }: FacultyCardProps) {
  const roleColor = member.role === 'faculty' ? 'bg-purple-50 text-purple-700' : 'bg-green-50 text-green-700';

  return (
    <div className="card">
      {/* Avatar placeholder */}
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
        <span className="text-xl font-bold text-purple-600">
          {member.name.charAt(0)}
        </span>
      </div>

      <h3 className="font-bold text-lg mb-1">{member.name}</h3>
      <p className="text-sm font-medium text-gray-700 mb-2">{member.title}</p>
      <p className="text-xs font-medium text-gray-600 mb-2">{member.organization}</p>
      <p className={`text-xs inline-block px-2 py-1 rounded mb-3 ${roleColor}`}>
        {member.role === 'faculty' ? 'Core Faculty' : 'Organizing Team'}
      </p>

      <p className="text-sm text-gray-600 mb-4 line-clamp-4">
        {member.bio}
      </p>

      <div className="flex gap-3 flex-wrap">
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-800">
            LinkedIn
          </a>
        )}
        {member.website && (
          <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-800">
            Website
          </a>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit card components**

```bash
git add app/components/FellowCard.tsx app/components/FacultyCard.tsx
git commit -m "feat: create FellowCard and FacultyCard components"
```

---

## Task 5: Build Home Page

**Files:**
- Create: `app/page.tsx`
- Create: `app/components/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection component**

Create `app/components/HeroSection.tsx`:

```typescript
interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
}

export default function HeroSection({ title, subtitle, description }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-2xl md:text-3xl text-blue-100 mb-6">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-lg text-blue-50 max-w-2xl">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Home page**

Create `app/page.tsx`:

```typescript
'use client';

import Link from 'next/link';
import HeroSection from './components/HeroSection';

export default function Home() {
  return (
    <>
      <HeroSection
        title="Skardu Scale-Up Fellowship"
        subtitle="Transform from project-driven to scale-ready"
        description="A 7-day intensive retreat for Pakistani social entrepreneurs. June 7-14, 2026 | Khoj Resort, Skardu"
      />

      {/* Overview Section */}
      <section className="section bg-gray-50">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">7</div>
              <p className="text-gray-700 font-medium">Days of Intensive Learning</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">11</div>
              <p className="text-gray-700 font-medium">Social Entrepreneurs</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">5</div>
              <p className="text-gray-700 font-medium">World-Class Faculty</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">What is the Skardu Scale-Up Fellowship?</h2>
            <p className="text-lg text-gray-700 mb-4">
              Pakistan is home to dozens of promising social enterprises, but few achieve true national scale. Most remain trapped in "project-driven survival mode"—securing incremental grants and reaching thousands when their models possess the potential to reach millions.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Over this 7-day intensive retreat, our curated cohort of founders steps away from daily operations to answer the defining strategic questions of scale: <strong>Who is your ultimate doer (the entity that implements at scale)?</strong> And <strong>who is your ultimate payer (who funds it)?</strong>
            </p>

            <div className="flex gap-4 flex-wrap justify-center">
              <Link href="/about" className="btn-primary">
                Learn More
              </Link>
              <Link href="/schedule" className="btn-secondary">
                View Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Cards */}
      <section className="section">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-center mb-12">Explore the Fellowship</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/fellows" className="card hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">11</h3>
              <p className="font-bold text-lg mb-2">Meet the Fellows</p>
              <p className="text-gray-600 text-sm">Discover the entrepreneurs transforming Pakistan</p>
            </Link>

            <Link href="/faculty" className="card hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold text-purple-600 mb-2">5</h3>
              <p className="font-bold text-lg mb-2">Faculty & Team</p>
              <p className="text-gray-600 text-sm">Learn from world-class mentors and organizers</p>
            </Link>

            <Link href="/schedule" className="card hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold text-green-600 mb-2">7</h3>
              <p className="font-bold text-lg mb-2">The Schedule</p>
              <p className="text-gray-600 text-sm">Explore the arc of the week and key themes</p>
            </Link>

            <Link href="/logistics" className="card hover:shadow-lg transition-all">
              <h3 className="text-2xl font-bold text-orange-600 mb-2">📍</h3>
              <p className="font-bold text-lg mb-2">Logistics</p>
              <p className="text-gray-600 text-sm">Practical info: travel, accommodation, and more</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Arc of the Week */}
      <section className="section bg-blue-50">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-4">The Arc of the Week</h2>
          <p className="text-gray-700 mb-8 max-w-2xl">
            Each day builds on the previous, taking fellows through rigorous frameworks and peer learning to transform their organizations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <span className="text-sm font-bold text-blue-600">Day 1</span>
              <p className="font-bold">Design for Impact</p>
              <p className="text-sm text-gray-600">Mission, Big Idea, Theory, Model</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-sm font-bold text-blue-600">Day 2</span>
              <p className="font-bold">Scale Strategy</p>
              <p className="text-sm text-gray-600">Evidence, Impact Measurement</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-sm font-bold text-blue-600">Day 3</span>
              <p className="font-bold">1-on-1 Clinics</p>
              <p className="text-sm text-gray-600">Outdoor capacity sessions</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <span className="text-sm font-bold text-blue-600">Day 4-6</span>
              <p className="font-bold">Iteration & Demo</p>
              <p className="text-sm text-gray-600">Communications, Pitching, Celebration</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/schedule" className="btn-primary">
              View Full Schedule
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Verify home page renders**

Run dev server if not already running:
```bash
npm run dev
```

Navigate to `localhost:3000` in browser.

Expected: Home page displays with hero section, stats, cards, and arc of week

- [ ] **Step 4: Commit home page**

```bash
git add app/page.tsx app/components/HeroSection.tsx
git commit -m "feat: create home page with hero, stats, and navigation cards"
```

---

## Task 6: Build Fellows Page

**Files:**
- Modify: `app/fellows/page.tsx`

- [ ] **Step 1: Create Fellows page**

Create `app/fellows/page.tsx`:

```typescript
'use client';

import { useState, useMemo } from 'react';
import HeroSection from '../components/HeroSection';
import FellowCard from '../components/FellowCard';
import { Fellow } from '@/lib/types';
import fellowsData from '@/data/fellows.json';

export default function FellowsPage() {
  const fellows: Fellow[] = fellowsData.fellows;
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Get unique sectors
  const sectors = Array.from(new Set(fellows.map(f => f.sector))).sort();

  // Filter fellows
  const filteredFellows = useMemo(() => {
    return fellows.filter(fellow => {
      const matchesSector = !selectedSector || fellow.sector === selectedSector;
      const matchesSearch = !searchTerm || 
        fellow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fellow.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fellow.sector.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSector && matchesSearch;
    });
  }, [selectedSector, searchTerm]);

  return (
    <>
      <HeroSection
        title="Meet the Fellows"
        subtitle="11 Social Entrepreneurs Transforming Pakistan"
      />

      <section className="section">
        <div className="container-max">
          <div className="mb-8">
            <p className="text-gray-700 mb-6 max-w-2xl">
              Our cohort represents diverse sectors and impact models—from mental health to agriculture, education to legal tech. Each fellow is committed to scaling their solution to reach millions.
            </p>

            {/* Search and Filter */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Name, organization, or sector..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Sector
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSector('')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      !selectedSector
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    All ({fellows.length})
                  </button>
                  {sectors.map(sector => {
                    const count = fellows.filter(f => f.sector === sector).length;
                    return (
                      <button
                        key={sector}
                        onClick={() => setSelectedSector(sector)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          selectedSector === sector
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                      >
                        {sector} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-600 mb-6">
              Showing {filteredFellows.length} of {fellows.length} fellows
            </p>
          </div>

          {/* Fellows Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFellows.map(fellow => (
              <FellowCard key={fellow.id} fellow={fellow} />
            ))}
          </div>

          {filteredFellows.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No fellows match your search. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Test Fellows page**

Navigate to `localhost:3000/fellows`

Expected: Page shows all 11 fellows in a grid, with working search and sector filters

- [ ] **Step 3: Commit Fellows page**

```bash
git add app/fellows/page.tsx
git commit -m "feat: create fellows directory page with search and filters"
```

---

## Task 7: Build Faculty Page

**Files:**
- Create: `app/faculty/page.tsx`

- [ ] **Step 1: Create Faculty page**

Create `app/faculty/page.tsx`:

```typescript
'use client';

import HeroSection from '../components/HeroSection';
import FacultyCard from '../components/FacultyCard';
import { FacultyMember } from '@/lib/types';
import facultyData from '@/data/faculty.json';

export default function FacultyPage() {
  const faculty: FacultyMember[] = facultyData.faculty;
  const team: FacultyMember[] = facultyData.organizingTeam;

  return (
    <>
      <HeroSection
        title="Faculty & Organizing Team"
        subtitle="World-Class Mentors & Leaders"
      />

      <section className="section">
        <div className="container-max">
          <p className="text-lg text-gray-700 mb-12 max-w-2xl">
            The fellowship is guided by a curated group of founders, funders, and system-level operators who bring scale frameworks, patient capital, and real-world expertise from decades of transforming social enterprises.
          </p>

          {/* Core Faculty Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-2">Core Faculty & Guest Mentors</h2>
            <p className="text-gray-600 mb-8">
              Leading voices in social enterprise scaling, impact investing, and organizational design
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {faculty.map(member => (
                <FacultyCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          {/* Organizing Team Section */}
          <div>
            <h2 className="text-3xl font-bold mb-2">Organizing Team</h2>
            <p className="text-gray-600 mb-8">
              Taleemabad & ChildLife Foundation leaders orchestrating the retreat
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.map(member => (
                <FacultyCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Test Faculty page**

Navigate to `localhost:3000/faculty`

Expected: Page displays faculty and organizing team in separate sections with cards

- [ ] **Step 3: Commit Faculty page**

```bash
git add app/faculty/page.tsx
git commit -m "feat: create faculty and organizing team page"
```

---

## Task 8: Build About Page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create About page**

Create `app/about/page.tsx`:

```typescript
'use client';

import HeroSection from '../components/HeroSection';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="About the Fellowship"
        subtitle="Transforming Project-Driven Organizations to Scale-Ready Impact Machines"
      />

      <section className="section">
        <div className="container-max max-w-3xl">
          {/* The Challenge */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">The Challenge</h2>
            <p className="text-lg text-gray-700 mb-4">
              Pakistan is home to dozens of promising social enterprises, but few achieve true national scale. Most remain trapped in "project-driven survival mode"—securing incremental grants and reaching thousands when their models possess the potential to reach millions.
            </p>
            <p className="text-lg text-gray-700">
              The barrier is rarely a lack of commitment or competence; it is a lack of a definitive scale strategy.
            </p>
          </div>

          {/* The Solution */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">The Solution</h2>
            <p className="text-lg text-gray-700 mb-4">
              Over this 7-day intensive retreat in Skardu, our curated cohort of founders steps away from daily operations to answer the defining strategic questions of scale:
            </p>
            <ul className="text-lg text-gray-700 space-y-3 mb-6">
              <li className="flex gap-4">
                <span className="text-blue-600 font-bold">1.</span>
                <span><strong>Who is your ultimate doer?</strong> The entity that implements at scale</span>
              </li>
              <li className="flex gap-4">
                <span className="text-blue-600 font-bold">2.</span>
                <span><strong>Who is your ultimate payer?</strong> Who funds it at scale</span>
              </li>
            </ul>
            <p className="text-lg text-gray-700">
              Guided by the Mulago Foundation's rigorous <strong>Scale Screen framework</strong>, alongside 1-on-1 capacity clinics with leading Pakistani faculty, fellows relentlessly refine their Big Idea and reconstruct their models.
            </p>
          </div>

          {/* The Curriculum */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">The Curriculum & Methodology</h2>
            <p className="text-lg text-gray-700 mb-6">
              Fellows are evaluated across the <strong>Four Enoughs</strong> framework:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-blue-600 mb-2">Good Enough</h3>
                <p className="text-gray-700">Does the solution actually work, with credible evidence?</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-blue-600 mb-2">Big Enough</h3>
                <p className="text-gray-700">Is the problem large enough to matter at scale?</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-blue-600 mb-2">Simple Enough</h3>
                <p className="text-gray-700">Can others replicate it without the founder?</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-lg text-blue-600 mb-2">Cheap Enough</h3>
                <p className="text-gray-700">Can the ultimate payer afford to reach everyone who needs it?</p>
              </div>
            </div>
          </div>

          {/* The Arc */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">The Arc of the Week</h2>
            <p className="text-gray-700 mb-6">Each day builds on the last, taking fellows through rigorous frameworks:</p>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h3 className="font-bold text-lg">Day 1: Design for Impact at Scale</h3>
                <p className="text-gray-600">Mission, Big Idea, Theory, Model, Behaviors, Doer & Payer</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h3 className="font-bold text-lg">Day 2: Scale Strategy + Impact Evidence</h3>
                <p className="text-gray-600">Scale Screen framework, Evidence planning, Lightning talks</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h3 className="font-bold text-lg">Day 3: 1-on-1 Clinics</h3>
                <p className="text-gray-600">Outdoor capacity sessions with Pakistani faculty, Sightseeing</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h3 className="font-bold text-lg">Day 4: Iterative Organization</h3>
                <p className="text-gray-600">Org design, Culture, People systems</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h3 className="font-bold text-lg">Day 5: Communications & Pitch Coaching</h3>
                <p className="text-gray-600">Clear language, Narrative, 10-min pitches, Cultural night</p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6 py-2">
                <h3 className="font-bold text-lg">Day 6: Demo Day & Celebration</h3>
                <p className="text-gray-600">Participant presentations, Funder engagement, Closing dinner</p>
              </div>
            </div>
          </div>

          {/* Co-Hosts */}
          <div className="mb-12 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-3xl font-bold mb-6">Co-Hosts</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg"><a href="https://taleemabad.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Taleemabad</a></h3>
                <p className="text-gray-700">Pakistan's largest ed-tech organization transforming learning for millions of children through digital platforms and government integration.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg"><a href="https://mulagofoundation.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">Mulago Foundation</a></h3>
                <p className="text-gray-700">Operates like venture capital for impact, providing unrestricted funding and frameworks to social entrepreneurs designed for massive scale.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/schedule" className="btn-primary">
              View the Full Schedule
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Test About page**

Navigate to `localhost:3000/about`

Expected: Page displays fellowship vision, challenge, solution, curriculum, and arc of week

- [ ] **Step 3: Commit About page**

```bash
git add app/about/page.tsx
git commit -m "feat: create about page with fellowship mission and curriculum"
```

---

## Task 9: Build Schedule Page (Part 1)

**Files:**
- Create: `app/schedule/page.tsx`
- Create: `app/components/ScheduleDay.tsx`

- [ ] **Step 1: Create ScheduleDay component**

Create `app/components/ScheduleDay.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { ScheduleDay as ScheduleDayType } from '@/lib/types';
import { formatTime } from '@/lib/utils';

interface ScheduleDayProps {
  day: ScheduleDayType;
}

export default function ScheduleDay({ day }: ScheduleDayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-4">
      {/* Day Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-blue-50 hover:bg-blue-100 transition-colors px-6 py-4 flex items-center justify-between"
      >
        <div className="text-left">
          <div className="flex items-center gap-4">
            <div>
              <p className="font-bold text-lg text-gray-900">{day.day}, {day.date}</p>
              <p className="text-sm text-blue-600 font-medium">{day.theme}</p>
            </div>
          </div>
        </div>
        <span className="text-2xl font-light text-gray-400">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      {/* Sessions */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          {day.sessions.map((session, idx) => (
            <div
              key={idx}
              className={`px-6 py-4 ${
                idx !== day.sessions.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex gap-6">
                <div className="w-20 flex-shrink-0">
                  <p className="font-bold text-gray-900">
                    {formatTime(session.time)}
                  </p>
                </div>
                <div className="flex-grow">
                  <h4 className="font-bold text-gray-900 mb-2">{session.title}</h4>
                  <p className="text-gray-700 mb-3">{session.description}</p>
                  {session.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {session.topics.map((topic, topicIdx) => (
                        <span
                          key={topicIdx}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                  {session.location && (
                    <p className="text-sm text-gray-600 mt-3">
                      📍 <strong>{session.location}</strong>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create Schedule page (continued in next task)**

This completes the ScheduleDay component. The main Schedule page will be created in Task 10.

- [ ] **Step 3: Commit ScheduleDay component**

```bash
git add app/components/ScheduleDay.tsx
git commit -m "feat: create ScheduleDay component for expandable schedule display"
```

---

## Task 10: Build Schedule Page (Part 2)

**Files:**
- Create: `app/schedule/page.tsx`

- [ ] **Step 1: Create Schedule page**

Create `app/schedule/page.tsx`:

```typescript
'use client';

import HeroSection from '../components/HeroSection';
import ScheduleDay from '../components/ScheduleDay';
import { ScheduleDay as ScheduleDayType } from '@/lib/types';
import scheduleData from '@/data/schedule.json';

export default function SchedulePage() {
  const days: ScheduleDayType[] = scheduleData.days;

  return (
    <>
      <HeroSection
        title="Schedule & Itinerary"
        subtitle="7 Days of Intensive Learning & Transformation"
      />

      <section className="section">
        <div className="container-max max-w-3xl">
          <div className="mb-8">
            <p className="text-lg text-gray-700 mb-6">
              <strong>Dates:</strong> June 7-14, 2026<br />
              <strong>Location:</strong> Khoj Resort, Skardu, Pakistan
            </p>

            <p className="text-gray-700 mb-6">
              Click on each day to view the full schedule of sessions, topics, and activities. The itinerary is designed to build sequentially, moving from design frameworks through evidence planning, into organizational design, communications, and culminating in Demo Day.
            </p>
          </div>

          {/* Schedule Timeline */}
          <div>
            {days.map((day) => (
              <ScheduleDay key={day.date} day={day} />
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Time blocks denote the start and flow of sessions. Refer to the organizing team for exact real-time adjustments. All times are in Pakistan Standard Time (PKT — UTC+5).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Test Schedule page**

Navigate to `localhost:3000/schedule`

Expected: Page displays all 7 days with expandable/collapsible sessions

- [ ] **Step 3: Commit Schedule page**

```bash
git add app/schedule/page.tsx
git commit -m "feat: create schedule page with expandable daily itinerary"
```

---

## Task 11: Build Logistics Page

**Files:**
- Create: `app/logistics/page.tsx`

- [ ] **Step 1: Create Logistics page**

Create `app/logistics/page.tsx`:

```typescript
'use client';

import HeroSection from '../components/HeroSection';
import logisticsData from '@/data/logistics.json';

export default function LogisticsPage() {
  const { venue, travel, accommodation, climate, packingList, connectivity, faq } = logisticsData;

  return (
    <>
      <HeroSection
        title="Logistics & Venue"
        subtitle="Everything You Need to Know"
      />

      <section className="section">
        <div className="container-max max-w-3xl">
          {/* Venue Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">The Venue</h2>
            <div className="card mb-6">
              <h3 className="font-bold text-xl mb-2">{venue.name}</h3>
              <p className="text-gray-700 mb-4">
                {venue.city}, {venue.region}, {venue.country}
              </p>
              <p className="text-gray-600 mb-4">{venue.address}</p>
              <div className="mb-6">
                <p className="font-medium text-gray-900 mb-2">Amenities:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {venue.amenities.map((amenity, idx) => (
                    <li key={idx}>{amenity}</li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-gray-600">
                <strong>Check-in:</strong> {venue.checkinTime}<br />
                <strong>Check-out:</strong> {venue.checkoutTime}
              </p>
            </div>
          </div>

          {/* Travel Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Getting to Skardu</h2>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Flights</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">{travel.flights.description}</p>
                <p className="text-gray-700 mb-2"><strong>Airlines:</strong> {travel.flights.airlines.join(', ')}</p>
                <p className="text-gray-700 text-sm">{travel.flights.notes}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Ground Transportation</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>Airport Pickup:</strong> {travel.groundTransport.airportPickup}</p>
                <p className="text-gray-700 mb-2"><strong>Journey Time:</strong> {travel.groundTransport.journeyTime}</p>
                <p className="text-gray-700 text-sm">{travel.groundTransport.notes}</p>
              </div>
            </div>
          </div>

          {/* Accommodation Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Accommodation & Meals</h2>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">What's Included</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {accommodation.included.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Rooms & Meals</h3>
              <p className="text-gray-700 mb-3"><strong>Room Setup:</strong> {accommodation.roomSetup}</p>
              <p className="text-gray-700 mb-3"><strong>Meals:</strong> {accommodation.meals}</p>
              <p className="text-gray-700"><strong>Dietary Accommodations:</strong> {accommodation.dietary}</p>
            </div>
          </div>

          {/* Climate & Packing */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">What to Pack</h2>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Skardu Climate</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="font-bold text-lg text-blue-600">{climate.temperature}</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Altitude</p>
                  <p className="font-bold text-lg text-blue-600">{climate.altitude}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{climate.notes}</p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Packing List</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {packingList.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Connectivity */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Connectivity</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Timezone:</strong> {connectivity.timezone}</p>
              <p className="text-gray-700 mb-2"><strong>Internet:</strong> {connectivity.internet}</p>
              <p className="text-gray-700 text-sm">{connectivity.notes}</p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faq.map((item, idx) => (
                <details key={idx} className="border border-gray-200 rounded-lg p-4">
                  <summary className="font-bold text-gray-900 cursor-pointer">
                    {item.question}
                  </summary>
                  <p className="text-gray-700 mt-3">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-bold text-lg mb-2">Have More Questions?</h3>
            <p className="text-gray-700">
              Contact the organizing team at <a href="mailto:summit@taleemabad.com" className="text-blue-600 hover:text-blue-800">summit@taleemabad.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Test Logistics page**

Navigate to `localhost:3000/logistics`

Expected: Page displays venue info, travel details, accommodation, climate, packing list, and FAQ

- [ ] **Step 3: Commit Logistics page**

```bash
git add app/logistics/page.tsx
git commit -m "feat: create logistics page with travel, accommodation, and FAQ"
```

---

## Task 12: Build Resources Page

**Files:**
- Create: `app/resources/page.tsx`
- Create: `app/components/ResourceCard.tsx`

- [ ] **Step 1: Create ResourceCard component**

Create `app/components/ResourceCard.tsx`:

```typescript
import { Resource } from '@/lib/types';

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const typeColor = {
    document: 'bg-blue-100 text-blue-700',
    article: 'bg-purple-100 text-purple-700',
    toolkit: 'bg-green-100 text-green-700',
  };

  const typeEmoji = {
    document: '📄',
    article: '📝',
    toolkit: '🛠️',
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <span className={`text-2xl ${typeEmoji[resource.type]}`}></span>
        <span className={`text-xs font-bold px-2 py-1 rounded ${typeColor[resource.type]}`}>
          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
        </span>
      </div>

      <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
      <p className="text-sm text-gray-700 mb-4">{resource.description}</p>

      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {resource.category}
        </span>
        {resource.link && (
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Access →
          </a>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Resources page**

Create `app/resources/page.tsx`:

```typescript
'use client';

import { useState, useMemo } from 'react';
import HeroSection from '../components/HeroSection';
import ResourceCard from '../components/ResourceCard';
import { Resource } from '@/lib/types';
import resourcesData from '@/data/resources.json';

export default function ResourcesPage() {
  const resources: Resource[] = resourcesData.resources;
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Get unique categories
  const categories = Array.from(new Set(resources.map(r => r.category))).sort();

  // Filter resources
  const filteredResources = useMemo(() => {
    return resources.filter(resource => 
      !selectedCategory || resource.category === selectedCategory
    );
  }, [selectedCategory]);

  return (
    <>
      <HeroSection
        title="Resources"
        subtitle="Tools, Frameworks & Guides for Scale"
      />

      <section className="section">
        <div className="container-max">
          <div className="mb-12">
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
              A curated collection of frameworks, tools, and resources to support fellows in their scaling journey. More content will be added over time as the fellowship community grows.
            </p>

            {/* Filter by Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Filter by Category
              </label>
              <div className="flex flex-wrap gap-2 mb-8">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    !selectedCategory
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  All ({resources.length})
                </button>
                {categories.map(category => {
                  const count = resources.filter(r => r.category === category).length;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {category} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results count */}
            <p className="text-sm text-gray-600 mb-8">
              Showing {filteredResources.length} of {resources.length} resources
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No resources found. Try adjusting your filters.
              </p>
            </div>
          )}

          {/* Future Content Note */}
          <div className="mt-16 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg mb-2">More Coming Soon</h3>
            <p className="text-gray-700">
              As the fellowship evolves, we'll be adding articles on scale strategy, impact measurement, organizational design, and more. Stay tuned for updates from faculty and fellow experiences.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Test Resources page**

Navigate to `localhost:3000/resources`

Expected: Page displays resources with category filtering

- [ ] **Step 4: Commit Resources pages**

```bash
git add app/resources/page.tsx app/components/ResourceCard.tsx
git commit -m "feat: create resources page with filterable content library"
```

---

## Task 13: Add Mobile Responsive Navigation & Final Polish

**Files:**
- Modify: `app/components/Header.tsx`
- Modify: `app/components/Navigation.tsx`

- [ ] **Step 1: Update Header with mobile menu**

Update `app/components/Header.tsx`:

```typescript
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/fellows', label: 'Fellows' },
    { href: '/faculty', label: 'Faculty' },
    { href: '/schedule', label: 'Schedule' },
    { href: '/logistics', label: 'Logistics' },
    { href: '/resources', label: 'Resources' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container-max flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="text-2xl font-bold text-blue-600">
            Summit
          </div>
          <span className="text-sm font-medium text-gray-600 hidden sm:inline">Fellowship</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Test mobile responsiveness**

Run dev server:
```bash
npm run dev
```

Test on mobile viewport (DevTools):
- Hamburger menu appears on small screens
- Mobile menu opens/closes properly
- All links are accessible

Expected: Mobile menu works, navigation is responsive

- [ ] **Step 3: Build production bundle**

Run:
```bash
npm run build
```

Expected: Build completes without errors

- [ ] **Step 4: Commit mobile navigation**

```bash
git add app/components/Header.tsx
git commit -m "feat: add mobile responsive navigation menu"
```

---

## Task 14: Deploy to Vercel

**Files:**
- No new files, deployment only

- [ ] **Step 1: Initialize git repository (if not already done)**

Run:
```bash
git status
```

If not a git repo:
```bash
git init
git add .
git commit -m "init: complete summit fellowship website implementation"
```

- [ ] **Step 2: Create .gitignore**

Ensure `.gitignore` exists with:
```
node_modules
.next
.env.local
.env.*.local
out
dist
```

- [ ] **Step 3: Push to GitHub (optional but recommended for Vercel)**

Create a GitHub repository and push:

```bash
git remote add origin https://github.com/your-username/summit-fellowship-website.git
git branch -M main
git push -u origin main
```

- [ ] **Step 4: Deploy to Vercel**

Option A (via CLI):
```bash
npm i -g vercel
vercel
```

Follow prompts to deploy.

Option B (via Vercel Dashboard):
- Go to https://vercel.com/import
- Connect GitHub repository
- Deploy

Expected: Site deployed at `https://summit-fellowship.vercel.app` (or custom domain)

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "deploy: initial deployment to vercel"
```

---

## Summary

You now have a fully functional, multi-page website for the Summit Fellowship with:

✅ Home page with overview and navigation cards  
✅ About page with fellowship mission and curriculum  
✅ Fellows directory with search and filtering  
✅ Faculty & organizing team page  
✅ 7-day schedule with expandable sessions  
✅ Logistics & venue information page  
✅ Resources library with categorization  
✅ Responsive mobile navigation  
✅ Modern design (Tailwind CSS + Next.js)  
✅ Scalable JSON data structure for future cohorts  
✅ Deployed to Vercel  

**Next Steps for Future Development:**
- Add photos/avatars for fellows and faculty
- Connect to CMS for easier content management
- Add user authentication for exclusive resources
- Build community features (forums, resource sharing)
- Add articles and blog section
- Implement analytics and tracking
