import { ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";

import { auth, isAdmin, signOut } from "@/features/auth/auth";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default async function AdminHeader() {
  const session = await auth();
  const user = isAdmin(session) ? session!.user : null;

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Logo />
          <Badge variant="secondary" className="rounded-full">
            Ադմին
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/"
            target="_blank"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "hidden sm:inline-flex",
            )}
          >
            Դիտել կայքը
            <ExternalLink />
          </Link>
          <ThemeToggle />
          {user && (
            <div className="ml-2 flex items-center gap-2 border-l pl-3">
              <Avatar size="sm">
                {user.image && <AvatarImage src={user.image} alt="" />}
                <AvatarFallback>{user.name?.[0] ?? "Ա"}</AvatarFallback>
              </Avatar>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/admin/login/" });
                }}
              >
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  aria-label="Դուրս գալ"
                >
                  <LogOut />
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
