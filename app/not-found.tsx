import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
        <FileQuestion className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-3xl font-bold tracking-tight mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Button size="lg" asChild>
        <Link href="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
