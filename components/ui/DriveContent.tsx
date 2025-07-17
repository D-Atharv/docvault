"use client";

import { useState } from "react";
import { driveItems } from "@/lib/mock-data";
import FileTable from "./FileTable";
import FileGridView from "./FileGridView";
import { ChevronDown, List, LayoutGrid, Info } from "lucide-react";
import Pagination from "./Pagination";
import { useDriveFilters } from "@/hooks/drive_content/useDriveFilters";
import { useDriveSorting } from "@/hooks/drive_content/useDriveSorting";
import { useDrivePagination } from "@/hooks/drive_content/useDrivePagination";
import { FileType, ModifiedFilterType, CustomDateRange } from "@/types"; 
import FilterDropdown from "./filter_dropdown/FilterDropDown";

export default function DriveContent() {
  const ITEMS_PER_PAGE = 15;

  // 1. Use Filtering Hook
  const {
    selectedType,
    selectedModified,
    customDateRange, 
    fileTypeOptions,
    modifiedFilterOptions,
    filteredItems,
    handleTypeChange,
    handleModifiedChange,
    setCustomDateRange, 
  } = useDriveFilters(driveItems);

  // 2. Use Sorting Hook 
  const { sortedItems, sortConfig, requestSort } =
    useDriveSorting(filteredItems);

  // 3. Use Pagination Hook 
  const {
    currentPage,
    paginatedItems,
    totalPages,
    handlePageChange,
    setCurrentPage,
  } = useDrivePagination(sortedItems, ITEMS_PER_PAGE);

  // Adjust handlers to also reset pagination when filter/sort changes
  const onTypeChange = (option: FileType | ModifiedFilterType | string) => {
    handleTypeChange(option as FileType);
    setCurrentPage(1);
  };

  const onModifiedChange = (option: FileType | ModifiedFilterType | string) => {
    handleModifiedChange(option as ModifiedFilterType);
    setCurrentPage(1);
  };

  // NEW: Handler for when "Apply" is clicked in the custom date range within FilterDropdown
  const onApplyCustomDateRange = (range: CustomDateRange) => {
    setCustomDateRange(range); // Update the custom date range state in the hook
    // The handleModifiedChange will be called internally by FilterDropdown's handleApplyCustomDates
    // to set selectedModified to "Custom date range", which then triggers filteredItems update.
    setCurrentPage(1); // Reset pagination
  };

  // NEW: Handler for "Clear all" button in custom date range
  const onClearAllFilters = () => {
    // Reset all filters
    onTypeChange("All"); // Reset type filter
    onModifiedChange("Any time"); // Reset modified filter (this also clears customDateRange in useDriveFilters)
    // Add logic to clear other filters like "People" if they existed
    setCurrentPage(1); // Reset pagination
  };

  const onRequestSort = (key: Parameters<typeof requestSort>[0]) => {
    requestSort(key);
    setCurrentPage(1);
  };

  const [view, setView] = useState<"grid" | "table">("grid");

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
            <FilterDropdown
              category="Type"
              options={fileTypeOptions}
              selectedOption={selectedType}
              onSelect={onTypeChange}
            />
            <FilterDropdown
              category="Modified"
              options={modifiedFilterOptions}
              selectedOption={selectedModified}
              onSelect={onModifiedChange}
              customDateRange={customDateRange} // NEW: Pass custom date range state
              onApplyCustomDateRange={onApplyCustomDateRange} // NEW: Pass apply handler
              onClearAll={onClearAllFilters} // NEW: Pass clear all handler
            />
          </div>
        )}
      </div>

      <div className="flex-1 px-6 pt-0 overflow-y-auto scrollbar-custom">
        {view === "grid" ? (
          <FileGridView items={paginatedItems} />
        ) : (
          <FileTable
            items={paginatedItems}
            onSort={onRequestSort}
            sortConfig={sortConfig}
          />
        )}
      </div>

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
