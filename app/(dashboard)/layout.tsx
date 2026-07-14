import { PageShell } from "@/components/layout/page-shell";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <PageShell>{children}</PageShell>;
}
