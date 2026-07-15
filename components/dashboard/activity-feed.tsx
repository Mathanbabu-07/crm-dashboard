"use client";

import { useEffect, useState } from "react";
import { getActivity } from "@/lib/mock-api";
import { ActivityItem } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityFeedItemSkeleton } from "@/components/shared/skeleton-variants";
import { ShoppingCart, UserPlus, ArrowUpCircle, RefreshCcw, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { staggerChildren, listItem } from "@/lib/motion";

const getActivityIcon = (type: string) => {
  switch (type) {
    case "order_created":
      return <ShoppingCart className="h-5 w-5 text-blue-500" />;
    case "customer_created":
      return <UserPlus className="h-5 w-5 text-emerald-500" />;
    case "plan_upgraded":
      return <ArrowUpCircle className="h-5 w-5 text-purple-500" />;
    case "payment_refunded":
      return <RefreshCcw className="h-5 w-5 text-rose-500" />;
    case "customer_reactivated":
      return <Activity className="h-5 w-5 text-amber-500" />;
    default:
      return <Activity className="h-5 w-5 text-muted-foreground" />;
  }
};

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date("2026-07-14T15:00:00.000Z"); // Hardcoded relative to mock current time for consistency
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  return `${Math.floor(diffInHours / 24)}d ago`;
};

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getActivity();
        setActivities(data.slice(0, 6)); // Just show top 6
      } catch (err) {
        // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ActivityFeedItemSkeleton />
          <ActivityFeedItemSkeleton />
          <ActivityFeedItemSkeleton />
          <ActivityFeedItemSkeleton />
          <ActivityFeedItemSkeleton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="shrink-0">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto pr-2">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          animate="animate"
          className="space-y-6"
        >
          {activities.map((item) => (
            <motion.div key={item.id} variants={listItem} className="flex gap-4">
              <div className="mt-0.5 bg-muted rounded-full p-2 h-9 w-9 flex items-center justify-center shrink-0">
                {getActivityIcon(item.type)}
              </div>
              <div className="space-y-1 flex-1">
                <p className="text-sm font-medium leading-none">{item.message}</p>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeTime(item.timestamp)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
}
