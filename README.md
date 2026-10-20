# WanderAI ✳ — AI Travel Planner

A responsive travel discovery experience built with React, JavaScript and CSS. Explore destinations, save favorites, and create day-by-day itinerary ideas. The planner has a **demo mode** so the project can be presented without an API key, plus an optional server-side OpenAI integration for live AI-generated itineraries.

## ✨ Features

- Editorial, travel-inspired landing page with responsive layouts
- Search destinations by name, country or category
- Category filters and destination cards
- Save destinations with favorites persisted in `localStorage`
- Save up to 12 itineraries locally, reopen/delete plans and export an itinerary as `.txt` or copy JSON
- Interactive trip planner for destination, duration, budget, group size, travel style and interests
- Demo itinerary generation works without credentials
- Optional OpenAI-backed itinerary API using Express
- Loading and error states, copy itinerary action, reduced-motion support and keyboard focus styles
- Animated interface using Framer Motion and Lucide icons

## 🧰 Tech stack

**Frontend:** React 18, JavaScript (ES modules), HTML5, CSS3, Vite  
**Motion & icons:** Framer Motion, Lucide React  
**Optional AI backend:** Node.js, Express, OpenAI SDK

## Run locally

Requires Node.js 18+.

```bash
npm install
cp .env.example .env
npm run dev:full
```

Open http://localhost:5173. The API health endpoint is http://localhost:8787/api/health.

On Windows PowerShell, copy the environment example with:

```powershell
Copy-Item .env.example .env
```

### Demo mode

The planner works without an API key. If the API is unavailable, it creates a clearly labelled sample itinerary so you can demo the user flow and UI.

### Enable live AI generation

Add a valid API key to `.env`:

```env
OPENAI_API_KEY=your_key_here
PORT=8787
CLIENT_ORIGIN=http://localhost:5173
```

Restart the API after changing `.env`. Never put secret keys in frontend code or commit `.env`.

## API

`POST /api/plan`

Example request:

```json
{
  "destination": "Kyoto, Japan",
  "days": 5,
  "budget": "₹50,000 – ₹1,00,000",
  "travelers": 2,
  "style": "Slow & soulful",
  "interests": ["Food & cafés", "Culture"]
}
```

The API returns structured JSON containing an itinerary title, intro, estimated budget, day-by-day suggestions and practical tips. The model is instructed not to claim live availability or guaranteed prices.

## Final-year project documentation

The `docs/` folder includes an editable project report template, Software Requirements Specification, manual test checklist and viva preparation notes. Replace placeholders with your details and record your own test evidence before submission.

- `docs/PROJECT_REPORT.md` — abstract, objectives, scope, architecture, modules, API, limitations and conclusion
- `docs/SRS.md` — functional and non-functional requirements
- `docs/TEST_CASES.md` — manual test cases (fill in actual results)
- `docs/VIVA_QUESTIONS.md` — viva questions and model talking points

## Deployment

### Frontend on Vercel

1. Push the repository to GitHub.
2. Import the repo into Vercel.
3. Set build command to `npm run build` and output directory to `dist`.
4. For a separately hosted API, set `VITE_API_URL` to the deployed API base URL in the Vercel environment variables, then redeploy.

### API on Render or Railway

1. Deploy the Node project and use `npm run server` as the start command.
2. Add `OPENAI_API_KEY`, `CLIENT_ORIGIN` and `PORT` as environment variables.
3. Set `CLIENT_ORIGIN` to your frontend domain. Multiple origins can be comma-separated.
4. Add `VITE_API_URL` to the frontend deployment and redeploy.

## Project structure

```text
WanderAI/
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── server/
│   └── index.js
├── docs/
│   ├── PROJECT_REPORT.md
│   ├── SRS.md
│   ├── TEST_CASES.md
│   └── VIVA_QUESTIONS.md
└── src/
    ├── App.jsx
    ├── data.js
    ├── main.jsx
    └── styles.css
```

## Resume bullet — personalize before using

**WanderAI — AI-Powered Travel Planner | React, JavaScript, CSS, Vite, Express, OpenAI API**

- Built a responsive travel discovery interface with searchable destination cards, category filtering and persistent favourites.
- Developed an interactive itinerary planner with preferences for budget, duration, group size and travel interests, plus locally saved plans and text export.
- Integrated an optional server-side AI API with structured itinerary responses, loading/error handling and environment-based credential management.
- Added a demo fallback to keep the planning experience testable without external API credentials.

Only claim the live AI integration after you have configured and tested your own API key.

## Before you publish

- Run the app and test the planner on desktop and mobile.
- Add screenshots to this README so recruiters can see the interface before cloning.
- Test the deployed API URL, CORS settings and error states.
- Be ready to explain React state, `localStorage`, API calls, environment variables and responsive CSS in an interview.


## Beginner-friendly launch

If you are new to coding, start with **`docs/START_HERE_HINGLISH.md`**. On Windows, you can also double-click `start-windows.bat` after installing Node.js. On macOS/Linux, run `bash start-mac-linux.sh` from a terminal.

## Submission checklist

- [ ] Run `npm install` successfully
- [ ] Run `npm run build` successfully
- [ ] Run the app locally and test its key features
- [ ] Add your own screenshots to the report
- [ ] Fill in student/college/guide details in the report
- [ ] Never upload `.env` or API secrets
- [ ] Read and understand the code and viva notes before presenting

**Testing note:** Dependency installation could not be verified in the packaging environment because the install timed out. Run the commands above on your own computer and fix any environment-specific errors before submitting.
