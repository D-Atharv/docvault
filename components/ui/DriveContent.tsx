"use client";

import { useState, useMemo } from "react";
import { driveItems } from "@/lib/mock-data";
import FileTable from "./FileTable";
import FileGridView from "./FileGridView";
import { DriveItem } from "@/types";
import { ChevronDown, List, LayoutGrid, Info } from "lucide-react";
import Pagination from "./Pagination";
import FilterPill from "./FilterPill";

export default function DriveContent() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DriveItem;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  const sortedItems = useMemo(() => {
    let sortableItems = [...driveItems];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key]! < b[sortConfig.key]!) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key]! > b[sortConfig.key]!) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [sortConfig]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return sortedItems.slice(startIndex, endIndex);
  }, [sortedItems, currentPage]);

  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const requestSort = (key: keyof DriveItem) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  return (
    <main className="flex flex-1 flex-col text-slate-100 bg-slate-700/10">
      {/* --- Header --- */}
      <div className="px-6 pt-6 flex-shrink-0 relative z-10">
        <div className="flex justify-between items-center pb-4 border-b border-slate-600">
          <h1 className="text-2xl flex items-center gap-2 font-semibold">
            My Drive <ChevronDown size={20} />
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 bg-slate-400/5 backdrop-blur-md border border-slate-500/20 rounded-lg">
              <button
                onClick={() => setView("table")}
                className={`p-1.5 rounded-md transition-all ${
                  view === "table"
                    ? "bg-blue-500/60 text-white shadow-md"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setView("grid")}
                className={`p-1.5 rounded-md transition-all ${
                  view === "grid"
                    ? "bg-blue-500/60 text-white shadow-md"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <LayoutGrid size={20} />
              </button>
            </div>
            <button className="p-2 rounded-full text-slate-300 hover:bg-slate-700/40">
              <Info size={20} />
            </button>
          </div>
        </div>
        {view === "table" && (
          <div className="flex items-center gap-3 py-3">
            <FilterPill>Type</FilterPill>
            <FilterPill>People</FilterPill>
            <FilterPill>Modified</FilterPill>
          </div>
        )}
      </div>

      {/* --- Content --- */}
      <div
        className="flex-1 px-6 pt-0 overflow-y-auto
        [&::-webkit-scrollbar]:w-4
        [&::-webkit-scrollbar-track]:bg-slate-800
        [&::-webkit-scrollbar-thumb]:bg-slate-600
        [&::-webkit-scrollbar-thumb]:rounded-full
        hover:[&::-webkit-scrollbar-thumb]:bg-slate-500"
      >
        {view === "grid" ? (
          <FileGridView items={paginatedItems} />
        ) : (
          <FileTable
            items={paginatedItems}
            onSort={requestSort}
            sortConfig={sortConfig}
          />
        )}
      </div>

      {/* --- Pagination --- */}
      <div className="px-6 mb-4 flex-shrink-0 relative z-10 border-t border-slate-600/50 pt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </main>
  );
}
