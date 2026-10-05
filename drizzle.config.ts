import { defineConfig } from "drizzle-kit";

import { getDatabaseConfig } from "./src/db/env";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  casing: "snake_case",
  dbCredentials: getDatabaseConfig(),
});
