import { TableRowSkeleton } from "@/components/shared/skeleton-variants";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
      </div>
      <div className="bg-card border rounded-xl p-4">
        <div className="flex items-center space-x-2 mb-6">
          <div className="relative w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-full pl-9"
            />
          </div>
        </div>
        <div className="space-y-1">
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
          <TableRowSkeleton />
        </div>
      </div>
    </div>
  );
}
