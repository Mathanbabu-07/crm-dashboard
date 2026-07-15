"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBlockSkeleton } from "@/components/shared/skeleton-variants";
import { EmptyState } from "@/components/shared/empty-state";
import { BarChart3 } from "lucide-react";

interface ChartCardProps {
  title: string;
  loading?: boolean;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: ReactNode;
  className?: string;
}

export function ChartCard({ 
  title, 
  loading, 
  isEmpty, 
  emptyMessage = "No data available.", 
  children,
  className = ""
}: ChartCardProps) {
  return (
    <Card className={`h-full flex flex-col ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-[250px] flex flex-col">
        {loading ? (
          <div className="flex-1 -m-6">
            <ChartBlockSkeleton />
          </div>
        ) : isEmpty ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState 
              icon={BarChart3} 
              title="No data" 
              description={emptyMessage} 
            />
          </div>
        ) : (
          <div className="flex-1 relative w-full h-full min-h-[200px]">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
