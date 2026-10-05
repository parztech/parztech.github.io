import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const postStatuses = ["draft", "published"] as const;
export type PostStatus = (typeof postStatuses)[number];

export const posts = sqliteTable("posts", {
  id: text()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  slug: text().notNull().unique(),
  title: text().notNull(),
  description: text().notNull(),
  content: text().notNull(),
  category: text().notNull(),
  tags: text({ mode: "json" })
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'`),
  status: text({ enum: postStatuses }).notNull().default("draft"),
  featured: integer({ mode: "boolean" }).notNull().default(false),
  /** Set the first time a post is published; drives ordering and the shown date */
  publishedAt: integer({ mode: "timestamp" }),
  createdAt: integer({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer({ mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdateFn(() => new Date()),
});

export type PostRow = typeof posts.$inferSelect;
