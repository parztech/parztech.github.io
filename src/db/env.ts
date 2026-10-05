// Shared by the app and drizzle.config.ts (no server-only import here)
export function getDatabaseConfig() {
  const url = process.env.TURSO_DATABASE_URL;
  // On Vercel a local file would be wiped between requests, so posts would vanish
  if (!url && process.env.VERCEL) {
    throw new Error(
      "TURSO_DATABASE_URL is not set. Add TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in Vercel → Project Settings → Environment Variables, then redeploy.",
    );
  }
  return {
    url: url ?? "file:local.db",
    authToken: process.env.TURSO_AUTH_TOKEN,
  };
}
