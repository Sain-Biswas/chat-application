import type { Config } from "drizzle-kit";

export default {
  dialect: "sqlite",
  schema: "./src/database/schema",
  out: "./src/database/migration",
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
} satisfies Config;
