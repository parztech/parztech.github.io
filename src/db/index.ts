import "server-only";

import { drizzle } from "drizzle-orm/libsql";

import { getDatabaseConfig } from "./env";
import * as schema from "./schema";

export const db = drizzle({
  connection: getDatabaseConfig(),
  schema,
  casing: "snake_case",
});
