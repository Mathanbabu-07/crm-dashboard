"use client";

import { useEffect, useState, useMemo } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { customerColumns } from "./customer-columns";
import { DataTable } from "@/components/shared/data-table";
import { getCustomers } from "@/lib/mock-api";
import { Customer } from "@/lib/types";
import { useUiStore } from "@/lib/store/ui-store";
import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { toast } from "sonner";

// Simple debounce hook for local use if we don't have one
function useLocalDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export function CustomersTable() {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { customerFilters, setCustomerFilters, resetTableFilters } = useUiStore();

  const [sorting, setSorting] = useState<SortingState>(
    customerFilters.sortBy ? [{ id: customerFilters.sortBy, desc: customerFilters.sortDesc || false }] : []
  );
  
  // Local state for immediate input feedback, synced to store via debounce
  const [localSearch, setLocalSearch] = useState(customerFilters.search);
  const debouncedSearch = useLocalDebounce(localSearch, 300);

  // Sync debounced search to store
  useEffect(() => {
    if (debouncedSearch !== customerFilters.search) {
      setCustomerFilters({ search: debouncedSearch, pageIndex: 0 });
    }
  }, [debouncedSearch, customerFilters.search, setCustomerFilters]);

  // Sync sorting to store
  useEffect(() => {
    if (sorting.length > 0) {
      setCustomerFilters({ sortBy: sorting[0].id, sortDesc: sorting[0].desc });
    } else {
      setCustomerFilters({ sortBy: undefined, sortDesc: undefined });
    }
  }, [sorting, setCustomerFilters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCustomers();
      setData(result);
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to load customers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // Status filter
      if (customerFilters.status !== "all" && item.status !== customerFilters.status) {
        return false;
      }
      // Plan filter
      if (customerFilters.plan && customerFilters.plan !== "all" && item.plan !== customerFilters.plan) {
        return false;
      }
      // Search filter (name, email, company)
      if (customerFilters.search) {
        const query = customerFilters.search.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          item.company.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [data, customerFilters]);

  const table = useReactTable({
    data: filteredData,
    columns: customerColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex: false,
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination: {
        pageIndex: customerFilters.pageIndex,
        pageSize: customerFilters.pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({
          pageIndex: customerFilters.pageIndex,
          pageSize: customerFilters.pageSize,
        });
        setCustomerFilters({ pageIndex: newState.pageIndex, pageSize: newState.pageSize });
      }
    },
  });

  const handleRowClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-card border rounded-xl space-y-4">
        <div className="text-destructive font-medium">Failed to load data</div>
        <Button onClick={fetchData} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-card p-4 rounded-xl border">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search name, email, or company..."
            className="w-full pl-9"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
          <Select
            value={customerFilters.status}
            onValueChange={(val) => setCustomerFilters({ status: val, pageIndex: 0 })}
          >
            <SelectTrigger className="w-[140px] shrink-0">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={customerFilters.plan || "all"}
            onValueChange={(val) => setCustomerFilters({ plan: val, pageIndex: 0 })}
          >
            <SelectTrigger className="w-[140px] shrink-0">
              <SelectValue placeholder="Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        table={table}
        columns={customerColumns}
        loading={loading}
        onRowClick={handleRowClick}
        emptyStateActionLabel="Clear Filters"
        onEmptyStateAction={() => {
          resetTableFilters();
          setLocalSearch("");
        }}
      />

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent>
          {selectedCustomer && (
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader className="text-center">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={selectedCustomer.avatarUrl} alt={selectedCustomer.name} />
                    <AvatarFallback className="text-2xl">{selectedCustomer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <DrawerTitle className="text-2xl">{selectedCustomer.name}</DrawerTitle>
                <DrawerDescription>{selectedCustomer.email}</DrawerDescription>
              </DrawerHeader>
              
              <div className="p-4 pb-0">
                <div className="flex justify-center gap-3 mb-6">
                  <StatusBadge status={selectedCustomer.status} />
                  <StatusBadge status={selectedCustomer.plan} />
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground">Company</span>
                    <span className="font-medium">{selectedCustomer.company}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground">Customer Since</span>
                    <span className="font-medium">
                      {new Date(selectedCustomer.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground">Total Spend</span>
                    <span className="font-medium">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(selectedCustomer.totalSpend)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-muted-foreground">Customer ID</span>
                    <span className="font-medium font-mono text-xs truncate" title={selectedCustomer.id}>
                      {selectedCustomer.id}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 mt-6">
                <Button className="w-full" onClick={() => setDrawerOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
