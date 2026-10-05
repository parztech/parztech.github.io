import { redirect } from "next/navigation";

import { auth, devLoginEnabled, isAdmin, signIn } from "@/features/auth/auth";
import { GitHubIcon } from "@/components/GitHubIcon";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { routes } from "@/lib/routes";

export default async function LoginPage(props: PageProps<"/admin/login">) {
  if (isAdmin(await auth())) redirect(routes.admin);
  const { error } = await props.searchParams;

  return (
    <div className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
      <div className="absolute top-1/3 left-1/2 -z-10 h-72 w-160 -translate-x-1/2 rounded-full bg-linear-to-r from-brand-violet/25 via-brand-pink/20 to-brand-apricot/25 blur-3xl" />
      <Card className="w-full max-w-sm gap-6 p-8 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Մուտք ադմին</h1>
          <p className="text-sm text-muted-foreground">
            Մուտք գործիր հոդվածներ գրելու և կառավարելու համար։
          </p>
        </div>

        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            Մուտքը մերժված է։ Այս հաշիվը ադմինի իրավունք չունի։
          </p>
        )}

        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: routes.admin });
          }}
        >
          <Button type="submit" size="lg" className="h-11 w-full rounded-full">
            <GitHubIcon />
            Մուտք GitHub-ով
          </Button>
        </form>

        {devLoginEnabled && (
          <form
            action={async () => {
              "use server";
              await signIn("dev", { redirectTo: routes.admin });
            }}
          >
            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="h-11 w-full rounded-full"
            >
              Արագ մուտք (միայն լոկալ)
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}
