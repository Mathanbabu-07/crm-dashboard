"use client";

import { KpiCards } from "@/components/dashboard/kpi-cards";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { CustomerGrowth } from "@/components/dashboard/customer-growth";
import { OrdersByStatus } from "@/components/dashboard/orders-by-status";
import { TopCustomers } from "@/components/dashboard/top-customers";
import { motion } from "framer-motion";
import { staggerChildren, listItem } from "@/lib/motion";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
      </div>
      
      <KpiCards />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-1 md:col-span-2 lg:col-span-4 h-[400px]">
          <RevenueChart />
        </div>
        
        <div className="col-span-1 md:col-span-2 lg:col-span-3 h-[400px]">
          <ActivityFeed />
        </div>
      </div>

      <motion.div 
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <motion.div variants={listItem} className="h-[350px]">
          <CustomerGrowth />
        </motion.div>
        <motion.div variants={listItem} className="h-[350px]">
          <OrdersByStatus />
        </motion.div>
        <motion.div variants={listItem} className="h-[350px]">
          <TopCustomers />
        </motion.div>
      </motion.div>
    </div>
  );
}
