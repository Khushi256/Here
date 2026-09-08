# Frontend

React + TypeScript chat interface for the emotional companion app.

## Setup
\`\`\`bash
npm install
cp .env.example .env
npm run dev
\`\`\`

## Structure
- `components/` — UI building blocks (Chat, SupportMode, Mood, Navbar)
- `pages/` — Route-level views
- `store/` — App state (conversation, mood, selected support mode)
- `services/api.ts` — Calls to the backend
- `constants/` — Shared emotion/intent/support-mode labels (must match backend/ml)

## Env Vars
- `VITE_API_BASE_URL` — backend base URL