import "server-only";

import { redirect } from "next/navigation";

import { auth, isAdmin } from "@/features/auth/auth";
import { routes } from "@/lib/routes";

/** Call at the top of every admin page and server action */
export async function requireAdmin() {
  const session = await auth();
  if (!isAdmin(session)) redirect(routes.adminLogin);
  return session!;
}
