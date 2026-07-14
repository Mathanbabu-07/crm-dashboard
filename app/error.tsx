"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 mb-6">
        <AlertTriangle className="h-10 w-10 text-destructive" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight mb-2">Something went wrong!</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        An unexpected error has occurred. We've been notified and are looking into it.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => reset()} size="lg">
          Try again
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
