import "server-only";

import { redirect } from "next/navigation";

import { auth, isAdmin } from "@/features/auth/auth";

/** Call at the top of every admin page and server action */
export async function requireAdmin() {
  const session = await auth();
  if (!isAdmin(session)) redirect("/admin/login/");
  return session!;
}
