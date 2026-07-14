"use client";

import { useEffect, useState, useMemo } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { getOrderColumns } from "./order-columns";
import { DataTable } from "@/components/shared/data-table";
import { getOrdersWithCustomers, updateOrderStatus, deleteOrder } from "@/lib/mock-api";
import { OrderWithCustomer, OrderStatus } from "@/lib/types";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

function useLocalDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

export function OrdersTable() {
  const [data, setData] = useState<OrderWithCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Delete Dialog state
  const [orderToDelete, setOrderToDelete] = useState<OrderWithCustomer | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { orderFilters, setOrderFilters, resetTableFilters } = useUiStore();

  const [sorting, setSorting] = useState<SortingState>(
    orderFilters.sortBy ? [{ id: orderFilters.sortBy, desc: orderFilters.sortDesc || false }] : []
  );
  
  const [localSearch, setLocalSearch] = useState(orderFilters.search);
  const debouncedSearch = useLocalDebounce(localSearch, 300);

  useEffect(() => {
    if (debouncedSearch !== orderFilters.search) {
      setOrderFilters({ search: debouncedSearch, pageIndex: 0 });
    }
  }, [debouncedSearch, orderFilters.search, setOrderFilters]);

  useEffect(() => {
    if (sorting.length > 0) {
      setOrderFilters({ sortBy: sorting[0].id, sortDesc: sorting[0].desc });
    } else {
      setOrderFilters({ sortBy: undefined, sortDesc: undefined });
    }
  }, [sorting, setOrderFilters]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getOrdersWithCustomers();
      setData(result);
    } catch (err) {
      setError(err as Error);
      toast.error("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    // Optimistic UI update
    const previousData = [...data];
    setData(data.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    
    toast.promise(updateOrderStatus(orderId, newStatus), {
      loading: "Updating status...",
      success: `Order ${orderId} marked as ${newStatus}`,
      error: () => {
        // Revert on error
        setData(previousData);
        return "Failed to update status";
      },
    });
  };

  const confirmDelete = async () => {
    if (!orderToDelete) return;
    setIsDeleting(true);
    try {
      await deleteOrder(orderToDelete.id);
      setData(data.filter(order => order.id !== orderToDelete.id));
      toast.success(`Order ${orderToDelete.id} deleted`);
      setOrderToDelete(null);
    } catch (err) {
      toast.error("Failed to delete order");
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (orderFilters.status !== "all" && item.status !== orderFilters.status) {
        return false;
      }
      if (orderFilters.search) {
        const query = orderFilters.search.toLowerCase();
        return (
          item.id.toLowerCase().includes(query) ||
          item.customerName.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [data, orderFilters]);

  const columns = useMemo(() => getOrderColumns({
    onStatusChange: handleStatusChange,
    onDelete: (order) => setOrderToDelete(order),
  }), [data]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination: {
        pageIndex: orderFilters.pageIndex,
        pageSize: orderFilters.pageSize,
      },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({
          pageIndex: orderFilters.pageIndex,
          pageSize: orderFilters.pageSize,
        });
        setOrderFilters({ pageIndex: newState.pageIndex, pageSize: newState.pageSize });
      }
    },
  });

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
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-card p-4 rounded-xl border">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Order ID or Customer..."
            className="w-full pl-9"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select
            value={orderFilters.status}
            onValueChange={(val) => setOrderFilters({ status: val, pageIndex: 0 })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable
        table={table}
        columns={columns}
        loading={loading}
        emptyStateActionLabel="Clear Filters"
        onEmptyStateAction={() => {
          resetTableFilters();
          setLocalSearch("");
        }}
      />

      <Dialog open={!!orderToDelete} onOpenChange={(open) => !open && setOrderToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete order{" "}
              <span className="font-mono font-medium">{orderToDelete?.id}</span> and remove the data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOrderToDelete(null)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
