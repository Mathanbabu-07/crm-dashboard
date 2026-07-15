"use client";

import { Customer } from "@/lib/types";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatusBadge } from "@/components/shared/status-badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface CustomerDrawerProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerDrawer({ customer, open, onOpenChange }: CustomerDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        {customer && (
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                  <AvatarFallback className="text-2xl">{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <DrawerTitle className="text-2xl">{customer.name}</DrawerTitle>
              <DrawerDescription>{customer.email}</DrawerDescription>
            </DrawerHeader>
            
            <div className="p-4 pb-0">
              <div className="flex justify-center gap-3 mb-6">
                <StatusBadge status={customer.status} />
                <StatusBadge status={customer.plan} />
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Company</span>
                  <span className="font-medium">{customer.company}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Customer Since</span>
                  <span className="font-medium">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Total Spend</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(customer.totalSpend)}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-muted-foreground">Customer ID</span>
                  <span className="font-medium font-mono text-xs truncate" title={customer.id}>
                    {customer.id}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 mt-6">
              <Button className="w-full" onClick={() => onOpenChange(false)}>Close</Button>
            </div>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
