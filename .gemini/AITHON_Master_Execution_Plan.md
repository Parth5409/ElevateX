# AITHON Master Execution Plan

**Project:** AI-Powered Training, Placement, and Internship Management Platform  
**Tech Stack:** React.js (Frontend) | Python + FastAPI (Backend) | MongoDB (Database) | LangChain + Gemini/OpenAI (AI Layer)  
**Team Size:** 5 Members  
**Time Limit:** 3 Hours

---

## 1. The Core Concept & The "AI Pivot"

Instead of a standard CRUD application, this platform acts as a **two-way intelligence system**:

- **For the TPO (Placement):** An automated recruiter. The TPO pastes a Job Description (JD), and the AI instantly ranks the Top 10 perfect student matches and allows one-click application invites.
- **For the Student (Training):** A career mentor. If a student is a match, they get an invite. If they aren't, the AI explicitly tells them what skills they are missing for that specific JD and what to learn next.
- **For Internships:** A streamlined logging and verification system for active internships.

---

## 2. Frontend Architecture & Page Structure

The application is divided into two distinct layouts with a shared Authentication layer.

### A. Shared Routes

| Route | Description |
|-------|-------------|
| `/login` | Split-screen login page (Student Login vs. TPO/Faculty Login) using JWT authentication |

### B. Student Portal — The "Talent" View

| Route | Description |
|-------|-------------|
| `/student/dashboard` | Landing page. Shows Profile Completion %, Current Placement Status, and recent notification alerts |
| `/student/profile` | Data entry form with fields for Academic (CGPA), Tech Stack, Soft Skills, Domain Interests, and Project/GitHub Links |
| `/student/internships` | Management page for active/past internships. Includes a form (Company, Role, Duration) and certificate upload |
| `/student/ai-mentor` | The "Suggestion Box" inbox. Displays TPO invitations and LangChain-generated Skill-Gap Feedback for missed opportunities |

### C. TPO Faculty Portal — The "Admin" View

| Route | Description |
|-------|-------------|
| `/tpo/dashboard` | Analytics hub. Uses Recharts/Chart.js to show "Placed vs. Unplaced" pie charts and "Top College Skills" bar charts *(Satisfies Data Visualization rubric)* |
| `/tpo/jd-matchmaker` | **Flagship AI feature.** Text area for pasting a JD, an "Analyze" button, and a ranked table of top student cards with a "Send Invite" button |
| `/tpo/directory` | Data table listing all students with manual filters (Branch, CGPA, Status) |
| `/tpo/internship-approvals` | Kanban board or table to review student-submitted internship logs (Verify / Reject) |

---

## 3. MongoDB Database Schema

MongoDB is ideal for this 3-hour sprint due to its flexible document structure. The platform uses **4 main collections**.

### Collection 1: `Users`

Handles authentication and role-based access.

```json
{
  "_id": "ObjectId",
  "email": "student@college.edu",
  "password_hash": "hashed_string",
  "role": "student",
  "created_at": "ISODate"
}
```

> `role` can be `"student"` or `"tpo"`.

---

### Collection 2: `StudentProfiles`

Stores all data the AI will use to evaluate the student.

```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId (Ref: Users)",
  "full_name": "John Doe",
  "branch": "Computer Science",
  "cgpa": 8.5,
  "skills": ["React", "FastAPI", "MongoDB", "Tailwind"],
  "domain_interests": ["Full Stack", "AI/ML"],
  "projects": [
    {
      "title": "E-Commerce App",
      "tech_stack": ["React", "Node"],
      "description": "Built a scalable frontend..."
    }
  ],
  "placement_status": "Unplaced",
  "updated_at": "ISODate"
}
```

> `placement_status` can be `"Placed"` or `"Unplaced"`.

---

### Collection 3: `Internships`

Handles the internship tracking requirement.

```json
{
  "_id": "ObjectId",
  "student_id": "ObjectId (Ref: Users)",
  "company_name": "Tech Corp",
  "role": "Frontend Intern",
  "duration_months": 6,
  "certificate_url": "https://link-to-storage...",
  "status": "Pending",
  "submitted_at": "ISODate"
}
```

> `status` can be `"Pending"`, `"Approved"`, or `"Rejected"`.

---

### Collection 4: `Notifications`

Powers the "Suggestion Box" / AI Mentor feedback loop.

```json
{
  "_id": "ObjectId",
  "student_id": "ObjectId (Ref: Users)",
  "type": "Invite",
  "title": "Invitation to apply for Tech Corp",
  "message": "You are a 92% match for the Frontend role...",
  "missing_skills": [],
  "action_item": "Consider building a small caching project.",
  "is_read": false,
  "created_at": "ISODate"
}
```

> `type` can be `"Invite"` or `"Skill_Feedback"`. `missing_skills` and `action_item` are populated by AI when type is `"Skill_Feedback"`.

---

## 4. The AI Engine Logic (LangChain + FastAPI)

The FastAPI backend exposes two specific AI endpoints utilizing LangChain.

### Endpoint 1: `POST /api/ai/match-jd`

| Field | Details |
|-------|---------|
| **Input** | Raw Job Description text |
| **Action** | Fetches all `StudentProfiles`, passes the JD and profiles to the LLM |
| **Prompt** | *"Given this Job Description and these student profiles, return a JSON array of the top 10 matching students, including their ID and a match percentage (0–100)."* |
| **Output** | JSON list to populate the TPO's Matchmaker table |

### Endpoint 2: `POST /api/ai/generate-feedback`

| Field | Details |
|-------|---------|
| **Input** | Student Profile Data + the Job Description they missed |
| **Action** | Runs asynchronously when a TPO finalizes a job search |
| **Prompt** | *"Compare this student's profile to this Job Description. Identify the top 2 missing technical skills. Provide one encouraging, actionable sentence on what they should build to learn those skills."* |
| **Output** | Saves the result directly to the `Notifications` collection for the student |

---

## 5. Team Execution Strategy (3-Hour Sprint)

### Hour 1 — Infrastructure & Data Setup

| Member | Tasks |
|--------|-------|
| **Frontend Dev 1** | Scaffold React app (Vite), set up React Router for all 8 pages, build Login page and Navigation shells |
| **Frontend Dev 2** | Build Student Profile Builder form and Internship Upload form |
| **Backend Dev 1** | Initialize FastAPI, connect to MongoDB (Motor/PyMongo), create basic CRUD endpoints for Profiles and Internships |
| **Backend Dev 2** | Set up LangChain environment. Write and test LLM prompts in a notebook to ensure correct JSON output format |
| **Team Lead / Architect** | Manually populate MongoDB with 10–15 detailed dummy student profiles *(critical for demo)*. Draw the Architecture Diagram |

### Hour 2 — Core Feature Integration

| Member | Tasks |
|--------|-------|
| **Frontend Dev 1** | Build TPO JD Matchmaker interface (text area, loading spinners, results table) |
| **Frontend Dev 2** | Build Student AI-Mentor (Suggestion Box) UI and TPO Dashboard charts (Recharts) |
| **Backend Dev 1** | Build Notification endpoints and Internship Approval endpoints |
| **Backend Dev 2** | Integrate LangChain into FastAPI endpoints (`/match-jd` and `/generate-feedback`), connect to database |

### Hour 3 — Wiring, Polish & Deployment

| Member | Tasks |
|--------|-------|
| **Full Team** | Connect React frontend to FastAPI backend. Resolve CORS issues |
| **Backend** | Deploy FastAPI to Render or Railway |
| **Frontend** | Deploy React app to Vercel or Netlify |
| **Team Lead** | Ensure clean `README.md` on GitHub. Finalize presentation flow |

---

## 6. Presentation Strategy — The Winning Pitch

> **Do not just show code during the 3-minute pitch. Tell a story.**

### The Problem
> *"Placement is currently a database problem. We made it an intelligence solution."*

### Demo — TPO View
1. Log in as a TPO.
2. Paste a heavy JD (e.g., *"Looking for a React developer with cloud experience"*).
3. Show the AI instantly finding the needle in the haystack.
4. Click **"Invite"**.

### Demo — Student View
1. Log in as an unselected student.
2. Show the AI Mentor feedback:
   > *"You missed out on this role. Here is exactly why, and here is what you need to build next to get it."*

### The Mic Drop
Point out that this satisfies the **complete lifecycle**:

- 🎓 **Training** — AI Skill-Gap Feedback
- 💼 **Placement** — JD Matcher
- 📋 **Management** — Internship Logs

Show the architecture diagram and conclude.
