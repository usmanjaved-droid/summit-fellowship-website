# Summit Fellowship Website Design

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

## Vision & Purpose

The Summit Fellowship website serves as the **information hub for the inaugural Skardu Scale-Up Fellowship (June 7-14, 2026)** while providing the foundational structure for a **long-term community platform for Pakistani social entrepreneurs**. The site will host future cohorts, resource libraries, articles, and become a central hub for the fellowship ecosystem.

**Primary Audience:** Current fellows and organizing team (first cohort)  
**Secondary Vision:** Scalable platform for future cohorts and entrepreneur community

---

## Target Users & Use Cases

### Current Fellows (Primary)
- Need quick access to schedule, logistics, faculty bios, other fellows' info
- Want to prepare for the week ahead
- Need practical travel and accommodation information
- Will reference the site during and after the fellowship

### Organizing Team & Faculty
- Need to share information with fellows efficiently
- Want centralized reference for all fellowship data
- Need easy way to update content for future cohorts

### Future: Prospective Fellows & Entrepreneurs (Secondary)
- Will use site to learn about the fellowship and apply
- Will explore resources and community content

---

## Architecture Overview

**Type:** Multi-page information hub with scalable foundation  
**Tech Stack:** Next.js + React + Tailwind CSS  
**Design Style:** Modern, startup-inspired (similar to Figma/Notion aesthetic)  
**Data Structure:** JSON/CMS-ready for easy scaling to future cohorts

---

## Page Structure & Content Specifications

### **1. Home Page**

**Purpose:** Entry point; orient visitors and provide quick navigation

**Key Sections:**
- **Hero:** Fellowship branding, tagline, event dates (June 7-14, 2026)
- **Overview Block:** "What is the Skardu Scale-Up Fellowship?" with key stats (7 days, 11 fellows, 5 faculty, location)
- **Quick Navigation Cards:** 4-5 cards to main sections (Meet the Fellows, The Schedule, Logistics, About the Fellowship)
- **Event Status:** Visual indicator (e.g., "Happening June 7-14 | Skardu, Pakistan")
- **Featured Content:** Link to the 7-day Arc of the Week with key themes
- **Call-to-Action:** "Explore the program" or "View full itinerary"

**Interactive Elements:**
- Smooth scroll navigation
- Card hover effects
- Mobile-responsive layout

---

### **2. About the Fellowship**

**Purpose:** Deep dive into the fellowship's philosophy, framework, and methodology

**Key Sections:**
- **Mission & Philosophy:** Core statement about transforming organizations from project-driven survival to scale-ready impact machines
- **The Challenge:** Why Pakistan's social enterprises struggle with scale
- **The Solution:** Overview of the 7-day intensive retreat approach
- **The Scale Screen Framework:** 
  - Explanation of Mulago Foundation's framework
  - Visual breakdown of the "Four Enoughs" (Good Enough, Big Enough, Simple Enough, Cheap Enough)
  - The "Doer & Payer" concept
- **The Arc of the Week:** Day-by-day themes (Design for Impact, Scale Strategy, Evidence, Iterative Org, Communications, Demo Day)
- **Co-Hosts:** Information about Taleemabad and Mulago Foundation with links
- **Why Skardu?:** Brief context on the location and retreat format

**Content Tone:** Aspirational, clear, emphasizes rigor and transformation

---

### **3. Fellows Directory**

**Purpose:** Showcase the 11 fellows and their organizations

**Layout:**
- **Grid/Card View (default):** 11 fellow cards in a responsive grid (3-4 columns on desktop, 1-2 on mobile)
- **List View Option:** Sortable/filterable alternative view

**Fellow Card Content:**
- Organization logo or fellow photo
- Fellow name & title
- Organization name
- Sector/focus area (Health, Education, Agriculture, Legal, etc.)
- 2-3 sentence model overview
- Contact info: Email, phone, LinkedIn, organization website (as icons/links)

**Filtering/Search:**
- Filter by sector (Health, Education, Livelihoods, Legal, Special Ed, etc.)
- Search by name or organization
- Preserve filter state in URL for shareable links

**Future Enhancement:** Ability to add new cohorts with cohort selector dropdown

**Data Structure:** Each fellow as JSON object with: name, organization, sector, bio, contact, links

---

### **4. Faculty & Organizing Team**

**Purpose:** Introduce the mentors, faculty, and core organizing team

**Layout:**
- **Two sections:** Core Faculty & Mentors | Organizing Team

**Person Card Content:**
- Name & title
- Organization
- 3-4 sentence bio focusing on relevance to the fellowship
- Role/expertise area
- Links: LinkedIn, Organization website
- Optional: Photo/avatar

**Sections Breakdown:**

**Core Faculty & Guest Mentors:**
- Kevin Starr (CEO, Mulago Foundation)
- Dr. Ahson Rabbani (CEO, ChildLife Foundation)
- Dr. Sara Saeed Khurram (Co-Founder & CEO, Sehat Kahani)
- Sarah Farooq (Director, Acumen Fund)
- Nadir Shams (Founder, Friends of Pakistan Society & Fund)

**Organizing Team:**
- Haroon Yasin (Founder & CEO, Taleemabad)
- Sabeena Abbasi (Chief Sustainability & Impact Officer, Taleemabad)
- Abida Hassan (General Manager, ChildLife Foundation)
- Muhammad Usman Javed (Head of Business Strategy and Fundraising, Taleemabad)

**Data Structure:** Each person as JSON object with: name, title, organization, bio, role, links

---

### **5. Schedule / Itinerary**

**Purpose:** Provide clear, navigable view of the 7-day program

**Layout Options:**
- **Timeline View (Primary):** Visual day-by-day breakdown with expandable session details
- **List View (Alternative):** Chronological list of all sessions with times and descriptions

**Day Structure:**
Each day shows:
- Date and day of week
- Key theme/focus
- Expandable sessions with:
  - Time (HH:MM - HH:MM format)
  - Session name
  - Description (1-3 sentences)
  - Key topics covered (bullet points)
  - Location/special notes (e.g., "Outdoor session", "Shigar Fort")

**Interactive Features:**
- Click to expand/collapse days
- Filter by session type (e.g., "Show only plenary sessions", "Show only outdoor activities")
- Downloadable itinerary as PDF

**Data Structure:** Days array → sessions array with time, title, description, topics, location

**Note:** Data is comprehensive and can be reused/modified for future cohorts

---

### **6. Logistics & Venue**

**Purpose:** Practical information fellows need for travel, accommodation, and preparation

**Key Sections:**

**Venue Information:**
- Venue name: Khoj Resort, Skardu
- Address and map (embedded Google Map)
- Basic amenities overview
- Check-in/check-out details
- Contact info for venue

**Getting to Skardu:**
- Flight options (which airports to fly to, typical routes)
- Ground transportation from airport
- Travel tips and timing recommendations

**Accommodation & Meals:**
- What's included in the fellowship package
- Room types/setup
- Meal schedule and dietary considerations
- Special accommodations process

**What to Pack & Prepare:**
- Climate and weather info (summer in Skardu)
- Packing list suggestions
- Activity recommendations (hiking, sightseeing)
- Timezone and connectivity info

**FAQ:**
- Common questions about logistics, travel, safety, etc.
- Contact info for logistics team

**Data Structure:** Sections with markdown-formatted content for easy updates

---

### **7. Resources** (Foundation for Future Growth)

**Purpose:** Share useful frameworks, documents, and eventually articles for fellows

**Current Content:**
- Links to key frameworks (Mulago Scale Screen, etc.)
- Fellowship documents (if applicable)
- Downloadable guides

**Future Content:**
- Articles and blog posts on scale strategy, impact measurement, etc.
- Resource library organized by topic
- Tool kits and templates fellows can use

**Layout:** Card-based or list view with categories/tags

**Data Structure:** Flexible to accommodate future articles, documents, tools

---

## Navigation & UX

### **Primary Navigation**
- Top navbar (sticky on scroll) with:
  - Summit Fellowship logo (links to home)
  - Menu items: About | Fellows | Faculty | Schedule | Logistics | Resources
  - Mobile hamburger menu (collapses to sidebar)

### **Footer**
- Quick links to main pages
- Social links (LinkedIn, etc.)
- Contact info / feedback form
- Copyright and link to Taleemabad

### **Mobile Responsive**
- Mobile-first design
- Hamburger menu on screens < 768px
- Stack layouts vertically
- Thumb-friendly touch targets (44px+ minimum)

### **Accessibility**
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance (WCAG AA)

### **Search & Discovery**
- Search functionality across fellows, faculty, and schedule
- URL-based filtering (e.g., `/fellows?sector=health`)
- Breadcrumb navigation on sub-pages

---

## Design Language

### **Visual Style**
- **Aesthetic:** Modern, startup-inspired (like Figma, Notion)
- **Color Palette:** 
  - Primary: Modern blue or teal (inspiration: Skardu/mountain theme)
  - Accent: Warm orange or green (inspiration: hope, growth)
  - Neutral: Clean grays for backgrounds and text
- **Typography:** 
  - Sans-serif font (e.g., Inter, Poppins) for modern feel
  - Clear hierarchy with bold headings
- **Spacing:** Generous whitespace, consistent padding/margins
- **Components:** Cards, buttons, badges for sectors, status indicators

### **Tone**
- Aspirational and empowering
- Clear and direct
- Professional yet approachable
- Celebrates the fellows and their impact

---

## Data & Scalability

### **Data Structure for Multi-Cohort Support**
Each cohort stored as a distinct collection:
- `cohorts/2026-skardu/` containing:
  - `fellows.json` - array of fellow objects
  - `faculty.json` - array of faculty objects
  - `schedule.json` - itinerary data
  - `logistics.json` - venue and travel info

### **Future Enhancements**
- Cohort selector dropdown on pages (e.g., "Viewing: 2026 Skardu Cohort | View 2027 →")
- Resource library grows over time
- Articles tagged by cohort and topic
- User accounts for fellows (future feature)

---

## Content Inventory

### **Currently in Scope (Use Existing Data)**
- Fellows: 11 profiles from `Final_Summit_Fellowship_participants.md`
- Faculty: 5 core faculty from `Summit_Fellowship_Faculty_And_Organizers.md`
- Organizing Team: 4 team members from same file
- Schedule: 7-day itinerary from `Updated_Summit_Fellowship_2026_Master_Itinerary.md`

### **To Be Sourced**
- Fellow photos/avatars (from participants or use placeholder avatars with initials)
- Faculty and team photos (request from LinkedIn or use placeholders)
- Venue photos (from Khoj Resort website or request from organizers)
- Branding assets: Taleemabad and Mulago Foundation logos (from existing brand assets)
- Color palette: Define based on Skardu/mountain theme inspiration (blues, teals, warm accents)
- Additional copy for About section (based on fellowship philosophy from existing docs)

---

## Technical Implementation Notes

**Framework:** Next.js App Router  
**Styling:** Tailwind CSS  
**Data Management:** JSON files (migration to CMS like Supabase/Sanity in future)  
**Hosting:** Vercel (pairs well with Next.js)  
**SEO:** Next.js built-in SEO optimization  

---

## Success Criteria

1. ✅ All fellowship information easily accessible to fellows
2. ✅ Mobile-responsive and fast loading
3. ✅ Clean, professional design reflecting modern startup aesthetic
4. ✅ Scalable structure supports future cohorts without major refactoring
5. ✅ Easy content updates (JSON-based data)
6. ✅ Accessible to all users (WCAG AA compliance)

---

## Next Steps

1. Gather missing assets (photos, branding, copy)
2. Set up Next.js project structure
3. Build pages following TDD approach
4. Deploy to Vercel
5. Plan future enhancements (CMS integration, community features, article platform)
