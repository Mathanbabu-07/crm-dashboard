"use client";

import { useEffect, useState } from "react";
import { getCustomers } from "@/lib/mock-api";
import { Customer } from "@/lib/types";
import { ChartCard } from "./chart-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomerDrawer } from "@/components/customers/customer-drawer";

export function TopCustomers() {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customers = await getCustomers();
        const sorted = [...customers].sort((a, b) => b.totalSpend - a.totalSpend).slice(0, 5);
        setData(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const topSpend = data.length > 0 ? data[0].totalSpend : 1;

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  return (
    <>
      <ChartCard 
        title="Top Customers" 
        loading={loading} 
        isEmpty={data.length === 0}
        emptyMessage="No customers found."
      >
        <div className="flex flex-col justify-between h-full py-1">
          {data.map((customer, index) => {
            const widthPercent = Math.max((customer.totalSpend / topSpend) * 100, 2);
            
            return (
              <div 
                key={customer.id} 
                className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => handleRowClick(customer)}
              >
                <div className="flex items-center justify-center w-5 font-mono text-xs text-muted-foreground font-semibold">
                  {index + 1}
                </div>
                
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                  <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-medium truncate pr-2">{customer.name}</span>
                    <span className="text-xs font-semibold shrink-0">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0
                      }).format(customer.totalSpend)}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all" 
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ChartCard>

      <CustomerDrawer 
        customer={selectedCustomer} 
        open={drawerOpen} 
        onOpenChange={setDrawerOpen} 
      />
    </>
  );
}
