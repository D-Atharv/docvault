// hooks/useDriveSorting.ts
import { useState, useMemo } from "react";
import { DriveItem } from "@/types";

export type SortConfig = {
  key: keyof DriveItem;
  direction: "asc" | "desc";
};

export const useDriveSorting = (items: DriveItem[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "name",
    direction: "asc",
  });

  const sortedItems = useMemo(() => {
    const sortableItems = [...items];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === "dateModified") {
          const dateA = new Date(a.dateModified).getTime();
          const dateB = new Date(b.dateModified).getTime();
          if (dateA < dateB) {
            return sortConfig.direction === "asc" ? -1 : 1;
          }
          if (dateA > dateB) {
            return sortConfig.direction === "asc" ? 1 : -1;
          }
          return 0;
        }

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (aValue! < bValue!) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue! > bValue!) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]); // Dependency on filtered items (passed as 'items') and sort config

  const requestSort = (key: keyof DriveItem) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return { sortedItems, sortConfig, requestSort };
};
