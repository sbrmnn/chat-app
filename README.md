# chat-app

A character chat app with VRM avatars, voice, and Japanese-aesthetic UI.

## Stack

- **Frontend**: Vite + React 19 + TypeScript + Tailwind v4 + react-router
- **Backend**: Rails 8 (API-only) + SQLite
- **Future**: Three.js + @pixiv/three-vrm for avatars, Anthropic Claude for chat, ElevenLabs for TTS

## Layout

```
chat-app/
├── frontend/          ← Vite + React SPA (dev: :5173)
├── backend/           ← Rails 8 API (dev: :3000)
├── Procfile.dev       ← runs both at once via foreman
└── bin/dev            ← entrypoint
```

Frontend talks to backend via Vite's `/api` proxy in dev — no CORS pain. In production they deploy independently (Vercel/Netlify for frontend, Fly/Kamal for backend) and CORS is enforced by the `FRONTEND_ORIGIN` env var.

## Running locally

```bash
# one-time
cd backend && bundle install
cd ../frontend && npm install
gem install foreman   # if not already

# every time
bin/dev               # starts both
```

Frontend: http://localhost:5173
Backend: http://localhost:3001 (3000 is commonly taken; we use 3001)

## API

| Endpoint | Purpose |
|---|---|
| `GET /api/v1/characters` | list all characters |
| `GET /api/v1/characters/:id` | character details |
| `POST /api/v1/chat/stream` | SSE chat stream (stubbed) |
| `GET /up` | health check |

## Design system

Color tokens, typography, and decorative utilities live in `frontend/src/index.css` under `@theme`. Japanese text always uses the `<JP>` component (`frontend/src/components/JP.tsx`) which wraps content in `<span translate="no" lang="ja">` to prevent Chrome auto-translation.
