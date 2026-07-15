"use client";

import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/motion";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 bg-muted/20">
          <motion.div
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
            className="mx-auto max-w-6xl w-full h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
