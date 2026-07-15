import { Badge } from "@/components/ui/badge";
import { CustomerStatus, CustomerPlan, OrderStatus } from "@/lib/types";

interface StatusBadgeProps {
  status?: CustomerStatus | OrderStatus | CustomerPlan;
  className?: string;
}

export const STATUS_COLORS = {
  active: "#10b981", // emerald-500
  completed: "#10b981",
  pending: "#f59e0b", // amber-500
  lead: "#f59e0b",
  inactive: "#f43f5e", // rose-500
  cancelled: "#f43f5e",
  refunded: "#f43f5e",
  pro: "#3b82f6", // blue-500
  enterprise: "#a855f7", // purple-500
  free: "#64748b", // slate-500
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  if (!status) return null;

  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  let classes = "";

  switch (status) {
    case "active":
    case "completed":
      variant = "default";
      classes = "bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/25 border-emerald-500/20";
      break;
    case "pending":
    case "lead":
      variant = "secondary";
      classes = "bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border-amber-500/20";
      break;
    case "inactive":
    case "cancelled":
    case "refunded":
      variant = "destructive";
      classes = "bg-rose-500/15 text-rose-600 hover:bg-rose-500/25 border-rose-500/20";
      break;
    case "pro":
      variant = "default";
      classes = "bg-blue-500/15 text-blue-600 hover:bg-blue-500/25 border-blue-500/20";
      break;
    case "enterprise":
      variant = "default";
      classes = "bg-purple-500/15 text-purple-600 hover:bg-purple-500/25 border-purple-500/20";
      break;
    case "free":
      variant = "secondary";
      classes = "bg-slate-500/15 text-slate-600 hover:bg-slate-500/25 border-slate-500/20 dark:text-slate-400";
      break;
    default:
      variant = "outline";
      classes = "text-muted-foreground";
  }

  return (
    <Badge variant={variant} className={`border capitalize font-medium ${classes} ${className || ""}`}>
      {status}
    </Badge>
  );
}
