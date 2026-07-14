import activityData from "@/data/activity.json";
import customersData from "@/data/customers.json";
import kpisData from "@/data/kpis.json";
import ordersData from "@/data/orders.json";
import chartDataJson from "@/data/chart.json";
import type { ActivityItem, Customer, Kpi, Order, ChartData } from "@/lib/types";

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
