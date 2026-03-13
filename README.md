# License Plater

A web app for tracking U.S. license plates you spot in the wild. Check off states as you find them, view your progress on an interactive map, and identify plates with the built-in finder tool.

## Features

- **Plate Index** — Browse all 50 states and their specialty plate designs. Check off plates as you find them.
- **Progress Map** — Interactive Leaflet choropleth map that highlights the states you've found in green.
- **Plate Finder** — Search and identify plates by state and design.
- **User Accounts** — Sign up / sign in with Supabase Auth. Your progress is saved to the cloud.
- **Real-time Sync** — Check a plate on the Plate Index and it's instantly reflected on the Map (centralized Redux state).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org) (App Router, Turbopack) |
| Language | TypeScript |
| Auth | [Supabase Auth](https://supabase.com/docs/guides/auth) |
| Database | PostgreSQL on [Supabase](https://supabase.com) |
| ORM | [Prisma 6](https://www.prisma.io) |
| State | [Redux Toolkit](https://redux-toolkit.js.org) + React-Redux |
| Map | [Leaflet](https://leafletjs.com) via react-leaflet |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Hosting | [Vercel](https://vercel.com) |

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (for auth & database)

### Setup

```bash
# Clone the repo
git clone https://github.com/Mitokongdrya/License-Plater.git
cd License-Plater

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Fill in your Supabase and database credentials

# Generate Prisma client & push schema
npx prisma generate
npx prisma db push

# Seed the database with all 50 states and plates
npx prisma db seed

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Project Structure

```
app/              → Next.js App Router pages & API routes
components/       → Reusable UI components (PlateCard, Map, Navbar, etc.)
store/            → Redux store, slices, and typed hooks
context/          → Auth context (Supabase)
data/             → Static state/plate data and GeoJSON
lib/              → Prisma client, Supabase clients, utilities
prisma/           → Schema and seed script
public/           → State outline SVGs and plate images
```

## Roadmap

- [x] User authentication (sign in / sign up / sign out)
- [x] Plate index with checkbox progress tracking
- [x] Interactive progress map
- [x] Centralized state management with Redux
- [ ] Plate finder / search tool
- [ ] User dashboard with stats
- [ ] Head-to-head competition features
- [ ] Social sharing

## License

MIT
