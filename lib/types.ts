export type CustomerStatus = "active" | "inactive" | "lead";

export type CustomerPlan = "free" | "pro" | "enterprise";

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  company: string;
  status: CustomerStatus;
  plan: CustomerPlan;
  createdAt: string;
  totalSpend: number;
}

export type OrderStatus = "pending" | "completed" | "cancelled" | "refunded";

export interface Order {
  id: string;
  customerId: string;
  date: string;
  status: OrderStatus;
  amount: number;
  items: number;
}

export type KpiTrend = "up" | "down" | "neutral";

export interface Kpi {
  id: string;
  label: string;
  value: number;
  delta: number;
  trend: KpiTrend;
  format: "currency" | "number";
}

export type ActivityType =
  | "order_created"
  | "customer_created"
  | "plan_upgraded"
  | "payment_refunded"
  | "customer_reactivated";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  message: string;
  timestamp: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager";
}

export interface ChartData {
  date: string;
  revenue: number;
  customers: number;
}
