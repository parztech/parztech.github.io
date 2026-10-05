import "server-only";

import { createHash } from "node:crypto";

import { cookies } from "next/headers";

import { VISITOR_COOKIE, VISITOR_COOKIE_MAX_AGE } from "../constants";

function hashVisitor(id: string) {
  // Salted with AUTH_SECRET so stored hashes can't be matched to cookies elsewhere
  return createHash("sha256")
    .update(`${process.env.AUTH_SECRET ?? ""}:${id}`)
    .digest("hex");
}

/** Hash of the visitor's anonymous ID, or null if they have never reacted */
export async function getVisitorHash() {
  const id = (await cookies()).get(VISITOR_COOKIE)?.value;
  return id ? hashVisitor(id) : null;
}

/** Like getVisitorHash, but creates the cookie if needed (server actions only) */
export async function getOrCreateVisitorHash() {
  const store = await cookies();
  let id = store.get(VISITOR_COOKIE)?.value;
  if (!id) {
    id = crypto.randomUUID();
    store.set(VISITOR_COOKIE, id, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: VISITOR_COOKIE_MAX_AGE,
      path: "/",
    });
  }
  return hashVisitor(id);
}
