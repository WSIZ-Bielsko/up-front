# Uploader MVP — frontend

Next.js 16 + Mantine 9 + TanStack Query, talking to the FastAPI backend in `storage_api.py`.

## Run

```bash
# backend (from the folder with storage.py / storage_api.py)
uv add fastapi python-multipart uvicorn
uv run storage_api.py                 # http://localhost:8000

# frontend
cd frontend
fnm use --install-if-missing          # reads .node-version (Node 22)
npm install
npm run dev                           # http://localhost:3000
```

The API address is read from `NEXT_PUBLIC_API_URL` (default `http://localhost:8000`).
If the frontend runs on another origin than `http://localhost:3000`, add it to the backend's
`CORS_ORIGINS` env var (comma-separated).

## Structure

- `lib/api.ts` — typed API client; upload uses XHR so the progress bar shows real upload progress
- `lib/queries.ts` — TanStack Query hooks (`useFiles`, `useUpload`, `useDeleteFile`)
- `app/providers.tsx` — Mantine theme, notifications, QueryClient
- `components/` — header with live API status, upload form with dropzone, progress card, files table, schema card
