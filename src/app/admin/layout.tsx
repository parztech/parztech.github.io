import type { Metadata } from "next";

import { AdminHeader } from "@/features/admin/components/AdminHeader";

export const metadata: Metadata = {
  title: "Ադմին",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <>
      <AdminHeader />
      <main className="flex-1 bg-muted/30">{children}</main>
    </>
  );
}
