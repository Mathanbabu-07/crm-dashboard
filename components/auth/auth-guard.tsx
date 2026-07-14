"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated && !pathname.startsWith("/login")) {
      router.replace("/login");
    }
  }, [isAuthenticated, pathname, router]);

  // If not authenticated, we return null to prevent a flash of the protected content
  if (!isAuthenticated && !pathname.startsWith("/login")) {
    return null;
  }

  return <>{children}</>;
}
