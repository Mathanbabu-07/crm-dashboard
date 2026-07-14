import { PageShell } from "@/components/layout/page-shell";
import { AuthGuard } from "@/components/auth/auth-guard";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <PageShell>{children}</PageShell>
    </AuthGuard>
  );
}
