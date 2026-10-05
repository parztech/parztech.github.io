import NextAuth, { type Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import type { Provider } from "next-auth/providers";

const DEV_LOGIN = "dev-admin";

/** One-click login for local development only; never enabled in production builds */
export const devLoginEnabled =
  process.env.NODE_ENV === "development" &&
  process.env.AUTH_DEV_LOGIN === "true";

function adminLogins() {
  return (process.env.ADMIN_GITHUB_LOGINS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdmin(session: Session | null) {
  const login = session?.user?.login?.toLowerCase();
  if (!login) return false;
  if (login === DEV_LOGIN) return devLoginEnabled;
  return adminLogins().includes(login);
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
  pages: { signIn: "/admin/login/", error: "/admin/login/" },
  callbacks: {
    signIn({ account, profile }) {
      if (account?.provider === "dev") return devLoginEnabled;
      const login = String(profile?.login ?? "").toLowerCase();
      return adminLogins().includes(login);
    },
    jwt({ token, account, profile }) {
      if (account) {
        token.login =
          account.provider === "dev" ? DEV_LOGIN : String(profile?.login);
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
