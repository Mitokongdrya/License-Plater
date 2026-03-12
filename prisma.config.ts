import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// Load .env.local for local development; on Vercel, env vars are
// injected automatically so the file won't exist (and that's fine).
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
