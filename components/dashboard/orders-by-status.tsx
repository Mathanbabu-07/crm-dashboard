"use client";

import { useEffect, useState } from "react";
import { getOrders } from "@/lib/mock-api";
import { ChartCard } from "./chart-card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useTheme } from "next-themes";
import { STATUS_COLORS } from "@/components/shared/status-badge";
import { OrderStatus } from "@/lib/types";
import { useUiStore } from "@/lib/store/ui-store";
import { useRouter } from "next/navigation";

interface StatusData {
  name: string;
  value: number;
  color: string;
  id: OrderStatus;
}

export function OrdersByStatus() {
  const [data, setData] = useState<StatusData[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const router = useRouter();
  const setOrderFilters = useUiStore((state) => state.setOrderFilters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await getOrders();
        
        const counts: Record<string, number> = {
          pending: 0,
          completed: 0,
          cancelled: 0,
          refunded: 0,
        };

        orders.forEach((order) => {
          if (counts[order.status] !== undefined) {
            counts[order.status]++;
          }
        });

        const formattedData: StatusData[] = [
          { name: "Completed", value: counts.completed, color: STATUS_COLORS.completed, id: "completed" as OrderStatus },
          { name: "Pending", value: counts.pending, color: STATUS_COLORS.pending, id: "pending" as OrderStatus },
          { name: "Cancelled", value: counts.cancelled, color: STATUS_COLORS.cancelled, id: "cancelled" as OrderStatus },
          { name: "Refunded", value: counts.refunded, color: STATUS_COLORS.refunded, id: "refunded" as OrderStatus },
        ].filter(d => d.value > 0);

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

  const onPieClick = (_: any, index: number) => {
    const dataItem = data[index];
    if (!dataItem || !dataItem.id) return;
    setOrderFilters({ status: dataItem.id, pageIndex: 0 });
    router.push("/orders");
  };

  const renderTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value, color } = payload[0].payload;
      const total = data.reduce((acc, curr) => acc + curr.value, 0);
      const percent = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
      
      return (
        <div 
          className="px-3 py-2 border rounded-lg shadow-sm text-sm"
          style={{ 
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            borderColor: isDark ? "#374151" : "#e5e7eb",
            color: isDark ? "#f3f4f6" : "#111827"
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="font-medium">{name}</span>
          </div>
          <div className="text-muted-foreground flex justify-between gap-4">
            <span>Count:</span>
            <span className="font-medium text-foreground">{value}</span>
          </div>
          <div className="text-muted-foreground flex justify-between gap-4">
            <span>Share:</span>
            <span className="font-medium text-foreground">{percent}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard 
      title="Orders by Status" 
      loading={loading} 
      isEmpty={data.length === 0}
      emptyMessage="No orders found."
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            onClick={onPieClick}
            className="cursor-pointer focus:outline-none"
            stroke={isDark ? "#1e293b" : "#ffffff"}
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                className="hover:opacity-80 transition-opacity outline-none" 
              />
            ))}
          </Pie>
          <Tooltip content={renderTooltip} />
          <Legend 
            verticalAlign="bottom" 
            height={60}
            wrapperStyle={{ paddingTop: "10px" }}
            formatter={(value, entry: any) => {
              const item = data.find(d => d.name === value);
              return <span style={{ color: isDark ? "#9ca3af" : "#4b5563" }}>{value} ({item?.value})</span>;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
