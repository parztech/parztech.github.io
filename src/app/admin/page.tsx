import { ExternalLink, FileText, PenLine, Plus } from "lucide-react";
import Link from "next/link";

import { getAllPostsForAdmin } from "@/features/admin/queries";
import { StatusBadge } from "@/features/admin/components/StatusBadge";
import { DeletePostButton } from "@/features/admin/components/DeletePostButton";
import { CategoryBadge } from "@/features/blog/components/CategoryBadge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireAdmin } from "@/features/auth/require-admin";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export default async function AdminPage() {
  await requireAdmin();
  const rows = await getAllPostsForAdmin();
  const published = rows.filter((p) => p.status === "published").length;

  const stats = [
    { label: "Ընդամենը", value: rows.length },
    { label: "Հրապարակված", value: published },
    { label: "Սևագրեր", value: rows.length - published },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Հոդվածներ</h1>
          <p className="mt-1 text-muted-foreground">
            Գրիր, խմբագրիր և հրապարակիր բլոգի հոդվածները։
          </p>
        </div>
        <Link
          href="/admin/posts/new/"
          className={cn(
            buttonVariants({ size: "lg" }),
            "h-11 rounded-full px-5 shadow-lg shadow-primary/25",
          )}
        >
          <Plus />
          Նոր հոդված
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="gap-1 px-5">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="text-3xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      {rows.length === 0 ? (
        <Card className="items-center gap-4 py-16 text-center">
          <div className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="size-6" />
          </div>
          <div>
            <p className="text-lg font-semibold">Դեռ հոդվածներ չկան</p>
            <p className="text-sm text-muted-foreground">
              Սկսիր քո առաջին հոդվածից։
            </p>
          </div>
          <Link
            href="/admin/posts/new/"
            className={cn(buttonVariants(), "rounded-full")}
          >
            <PenLine />
            Գրել առաջին հոդվածը
          </Link>
        </Card>
      ) : (
        <Card className="py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Վերնագիր</TableHead>
                <TableHead className="hidden md:table-cell">Թեմա</TableHead>
                <TableHead>Կարգավիճակ</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Թարմացվել է
                </TableHead>
                <TableHead className="pr-5 text-right">
                  Գործողություններ
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="max-w-xs pl-5">
                    <Link
                      href={`/admin/posts/${post.id}/`}
                      className="block truncate font-medium hover:text-primary"
                    >
                      {post.title}
                    </Link>
                    <span className="block truncate text-xs text-muted-foreground">
                      /blog/{post.slug}/
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <CategoryBadge slug={post.category} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={post.status} />
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                    {formatDate(post.updatedAt.toISOString())}
                  </TableCell>
                  <TableCell className="pr-5">
                    <div className="flex justify-end gap-1">
                      {post.status === "published" && (
                        <Link
                          href={`/blog/${post.slug}/`}
                          target="_blank"
                          aria-label="Դիտել կայքում"
                          className={buttonVariants({
                            variant: "ghost",
                            size: "icon",
                          })}
                        >
                          <ExternalLink />
                        </Link>
                      )}
                      <Link
                        href={`/admin/posts/${post.id}/`}
                        aria-label="Խմբագրել"
                        className={buttonVariants({
                          variant: "ghost",
                          size: "icon",
                        })}
                      >
                        <PenLine />
                      </Link>
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
