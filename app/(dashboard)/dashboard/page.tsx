import { KPICardSkeleton, ChartBlockSkeleton, ActivityFeedItemSkeleton } from "@/components/shared/skeleton-variants";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICardSkeleton />
        <KPICardSkeleton />
        <KPICardSkeleton />
        <KPICardSkeleton />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <ChartBlockSkeleton />
        </div>
        <div className="col-span-3 space-y-4 bg-card p-6 rounded-xl border">
          <h3 className="font-semibold">Recent Activity</h3>
          <ActivityFeedItemSkeleton />
          <ActivityFeedItemSkeleton />
          <ActivityFeedItemSkeleton />
        </div>
      </div>
    </div>
  );
}
