import activityData from "@/data/activity.json";
import customersData from "@/data/customers.json";
import kpisData from "@/data/kpis.json";
import ordersData from "@/data/orders.json";
import chartDataJson from "@/data/chart.json";
import type { ActivityItem, Customer, Kpi, Order, ChartData, OrderWithCustomer, OrderStatus } from "@/lib/types";

export interface MockApiOptions {
  shouldError?: boolean;
  errorRate?: number;
}

const customers = customersData as Customer[];
const orders = ordersData as Order[];
const kpis = kpisData as Kpi[];
const activity = activityData as ActivityItem[];
const chartData = chartDataJson as ChartData[];

function randomLatency() {
  return Math.floor(Math.random() * 301) + 500;
}

function shouldReject(options?: MockApiOptions) {
  return Boolean(options?.shouldError) || Math.random() < (options?.errorRate ?? 0);
}

async function withLatency<T>(data: T, options?: MockApiOptions): Promise<T> {
  await new Promise((resolve) => setTimeout(resolve, randomLatency()));

  if (shouldReject(options)) {
    throw new Error("Mock API request failed");
  }

  return data;
}

export async function getCustomers(options?: MockApiOptions): Promise<Customer[]> {
  return withLatency(
    customers.map((customer) => ({ ...customer })),
    options,
  );
}

export async function getOrders(options?: MockApiOptions): Promise<Order[]> {
  return withLatency(
    orders.map((order) => ({ ...order })),
    options,
  );
}

export async function getKpis(options?: MockApiOptions): Promise<Kpi[]> {
  return withLatency(
    kpis.map((kpi) => ({ ...kpi })),
    options,
  );
}

export async function getActivity(
  options?: MockApiOptions,
): Promise<ActivityItem[]> {
  return withLatency(
    activity.map((item) => ({ ...item })),
    options,
  );
}

export async function getChartData(
  options?: MockApiOptions,
): Promise<ChartData[]> {
  return withLatency(
    chartData.map((data) => ({ ...data })),
    options,
  );
}

export async function getOrdersWithCustomers(
  options?: MockApiOptions,
): Promise<OrderWithCustomer[]> {
  return withLatency(
    orders.map((order) => {
      const customer = customers.find((c) => c.id === order.customerId);
      return {
        ...order,
        customerName: customer?.name || "Unknown Customer",
        customerEmail: customer?.email || "unknown@example.com",
      };
    }),
    options,
  );
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  options?: MockApiOptions,
): Promise<{ success: boolean }> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, randomLatency()));
  if (shouldReject(options)) throw new Error("Failed to update status");
  
  // Note: Since this is a mock API using imported JSON, we don't actually mutate the JSON file here.
  // The UI is expected to do optimistic updates in its own state.
  return { success: true };
}

export async function deleteOrder(
  orderId: string,
  options?: MockApiOptions,
): Promise<{ success: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, randomLatency()));
  if (shouldReject(options)) throw new Error("Failed to delete order");
  return { success: true };
}
