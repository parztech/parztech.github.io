import { sql } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

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

export const reactionTypes = [
  "love",
  "fire",
  "clap",
  "mindblown",
  "idea",
] as const;
export type ReactionType = (typeof reactionTypes)[number];

export const reactions = sqliteTable(
  "reactions",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    postId: text()
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    /** SHA-256 of the anonymous visitor cookie; the raw cookie is never stored */
    visitorHash: text().notNull(),
    type: text({ enum: reactionTypes }).notNull(),
    createdAt: integer({ mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (t) => [
    // One reaction of each type per visitor per post
    uniqueIndex("reactions_post_visitor_type_unique").on(
      t.postId,
      t.visitorHash,
      t.type,
    ),
    index("reactions_post_idx").on(t.postId),
  ],
);
