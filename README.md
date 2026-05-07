# Riso Employer Portal (AG-Portal)

A web-based self-service portal for HR managers at companies using Riso's employee benefits platform.

## What this is

HR managers use this portal to:
- View and manage employees and their assigned benefits
- Manage company locations (branches and subsidiaries)
- Monitor benefit budgets and usage
- Generate and download reports
- Bulk-import employees via CSV
- Configure company settings and report exports

The UI is in **German** — see [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for a full English glossary and component map.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite 6 |
| Styling | Tailwind CSS 4 |
| Charts | Recharts |
| Icons | Lucide React |
| Backend | Laravel (REST API) |

## Running locally

```bash
# Install dependencies
pnpm install

# Start development server (runs at http://localhost:5173)
pnpm dev

# Build for production
pnpm build
```

## Architecture

```
React Frontend (this repo)
        ↓  HTTP requests with Bearer token
Laravel REST API (/api/v1/portal/...)
        ↓
Riso Database
```

All data in the frontend is currently **mocked** (hardcoded arrays). Each component that needs real data has a `// TODO` comment pointing to the correct API endpoint. See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md) for the full spec.

## For developers

→ **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** — Full English reference for backend integration:
- German → English glossary
- All data fields per entity (Employee, Location, Benefit, Report, etc.)
- All 21 API endpoints with request/response shapes
- How to replace mock data with real API calls
