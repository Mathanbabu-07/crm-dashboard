"use client";

import { useEffect, useState } from "react";
import { getKpis } from "@/lib/mock-api";
import { Kpi } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICardSkeleton } from "@/components/shared/skeleton-variants";
import { ArrowDownIcon, ArrowUpIcon, MinusIcon, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { staggerChildren, listItem } from "@/lib/motion";
import { Button } from "@/components/ui/button";

export function KpiCards() {
  const [kpis, setKpis] = useState<Kpi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    try {
      // Intentionally simulating an error case for demonstration 
      // by passing errorRate of 0.3 (30% chance to fail)
      const data = await getKpis({ errorRate: 0.3 });
      setKpis(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICardSkeleton />
        <KPICardSkeleton />
        <KPICardSkeleton />
        <KPICardSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 border rounded-xl border-destructive/50 bg-destructive/10 text-destructive flex flex-col items-center justify-center text-center space-y-4">
        <p>Failed to load KPI metrics.</p>
        <Button onClick={fetchData} variant="outline" className="border-destructive text-destructive hover:bg-destructive/20">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerChildren}
      initial="initial"
      animate="animate"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      {kpis.map((kpi) => {
        const isUp = kpi.trend === "up";
        const isDown = kpi.trend === "down";
        return (
          <motion.div key={kpi.id} variants={listItem}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {kpi.format === "currency" ? "$" : ""}
                  {kpi.value.toLocaleString()}
                </div>
                <p className={`text-xs mt-1 flex items-center font-medium ${isUp ? "text-emerald-500" : isDown ? "text-rose-500" : "text-muted-foreground"}`}>
                  {isUp && <ArrowUpIcon className="mr-1 h-3 w-3" />}
                  {isDown && <ArrowDownIcon className="mr-1 h-3 w-3" />}
                  {!isUp && !isDown && <MinusIcon className="mr-1 h-3 w-3" />}
                  {Math.abs(kpi.delta)}% from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
