import NextAuth, { type Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";

import { routes } from "@/lib/routes";

const DEV_LOGIN = "dev-admin";

/** One-click login for local development only; never enabled in production builds */
export const devLoginEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.AUTH_DEV_LOGIN === "true";

function normalizeLogin(login: unknown) {
  return typeof login === "string" ? login.trim().toLowerCase() : "";
}

function isAllowedGithubLogin(login: unknown) {
  const normalized = normalizeLogin(login);
  return (
    normalized !== "" &&
    (process.env.ADMIN_GITHUB_LOGINS ?? "")
      .split(",")
      .map(normalizeLogin)
      .includes(normalized)
  );
}

export function isAdmin(session: Session | null) {
  const login = session?.user?.login;
  if (login === DEV_LOGIN) return devLoginEnabled;
  return isAllowedGithubLogin(login);
}

const providers: Provider[] = [GitHub];

if (devLoginEnabled) {
  providers.push(
    Credentials({
      id: "dev",
      name: "Dev",
      credentials: {},
      authorize: () => ({ id: DEV_LOGIN, name: "Developer" }),
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: { signIn: routes.adminLogin, error: routes.adminLogin },
  callbacks: {
    signIn({ account, profile }) {
      if (account?.provider === "dev") return devLoginEnabled;
      return isAllowedGithubLogin(profile?.login);
    },
    jwt({ token, account, profile }) {
      if (account) {
        token.login =
          account.provider === "dev"
            ? DEV_LOGIN
            : normalizeLogin(profile?.login);
      }
      return token;
    },
    session({ session, token }) {
      session.user.login = token.login as string | undefined;
      return session;
    },
  },
});

declare module "next-auth" {
  interface Session {
    user: { login?: string } & import("next-auth").DefaultSession["user"];
  }
}
