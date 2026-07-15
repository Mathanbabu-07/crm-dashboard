"use client";

import { useEffect, useState } from "react";
import { getCustomers } from "@/lib/mock-api";
import { ChartCard } from "./chart-card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useTheme } from "next-themes";

export function CustomerGrowth() {
  const [data, setData] = useState<{ month: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customers = await getCustomers();
        
        const counts = new Map<string, number>();
        const now = new Date();
        
        // Initialize last 6 months
        for (let i = 5; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const monthStr = d.toLocaleString('default', { month: 'short' });
          counts.set(monthStr, 0);
        }

        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);
        sixMonthsAgo.setHours(0, 0, 0, 0);

        customers.forEach(customer => {
          const createdAt = new Date(customer.createdAt);
          if (createdAt >= sixMonthsAgo) {
             const monthStr = createdAt.toLocaleString('default', { month: 'short' });
             if (counts.has(monthStr)) {
               counts.set(monthStr, (counts.get(monthStr) || 0) + 1);
             }
          }
        });

        const formattedData = Array.from(counts.entries()).map(([month, count]) => ({
          month,
          count
        }));

        setData(formattedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isDark = theme === "dark";
  const color = isDark ? "#818cf8" : "#4f46e5";

  return (
    <ChartCard 
      title="Customer Growth" 
      loading={loading} 
      isEmpty={data.every(d => d.count === 0)}
      emptyMessage="No new customers in the last 6 months."
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#333" : "#e5e7eb"} />
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 12 }}
            allowDecimals={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? "#1f2937" : "#ffffff",
              borderColor: isDark ? "#374151" : "#e5e7eb",
              borderRadius: "8px",
              color: isDark ? "#f3f4f6" : "#111827"
            }}
            itemStyle={{ color: color }}
            cursor={{ fill: isDark ? "#374151" : "#f3f4f6", opacity: 0.4 }}
            formatter={(value: any) => [value, "New Customers"]}
          />
          <Bar dataKey="count" fill={color} radius={[4, 4, 0, 0]} maxBarSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
