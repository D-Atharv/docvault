// hooks/useDrivePagination.ts
import { useState, useMemo, useEffect } from "react";

export const useDrivePagination = <T,>(items: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage);
  }, [items.length, itemsPerPage]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Reset page to 1 when filtered/sorted items change
  useEffect(() => {
    setCurrentPage(1);
  }, [items]); // Dependency on the items array (which changes when filters/sorts apply)

  return {
    currentPage,
    paginatedItems,
    totalPages,
    handlePageChange,
    setCurrentPage, // Expose setCurrentPage if you need to reset from outside
  };
};
