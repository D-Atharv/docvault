"use client";

import { useEffect, useState } from "react";
import { ChevronDown, List, LayoutGrid, Info } from "lucide-react";
import Pagination from "../layout/Pagination";
import { useDriveFilters } from "@/hooks/drive_content/useDriveFilters";
import { useDriveSorting } from "@/hooks/drive_content/useDriveSorting";
import { useDrivePagination } from "@/hooks/drive_content/useDrivePagination";
import {
  DriveItem,
  FileType,
  ModifiedFilterType,
  CustomDateRange,
} from "@/types";
import FilterDropdown from "./filter_dropdown/FilterDropDown";
import FileTable from "./file_table/FileTable";
import FileGridView from "./file_grid/FileGridView";

interface DriveContentProps {
  initialItems: DriveItem[];
  initialView: "grid" | "table";
}

export default function DriveContent({ initialItems,initialView }: DriveContentProps) {
  const ITEMS_PER_PAGE = 15;

  // Filtering
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
  } = useDriveFilters(initialItems);

  // Sorting
  const { sortedItems, sortConfig, requestSort } =
    useDriveSorting(filteredItems);

  // Pagination
  const {
    currentPage,
    paginatedItems,
    totalPages,
    handlePageChange,
    setCurrentPage,
  } = useDrivePagination(sortedItems, ITEMS_PER_PAGE);

  // === View mode state (Fixing the jerky behavior)
  //  const [view, setView] = useState<"grid" | "table">(initialView); // Start with SSR-matched view
    const [view, setView] = useState<"grid" | "table" | null>(initialView);


   const updateView = (newView: "grid" | "table") => {
     setView(newView);
     const url = new URL(window.location.href);
     url.searchParams.set("view", newView);
     window.history.replaceState(null, "", url.toString());
   };

  const onTypeChange = (option: FileType | ModifiedFilterType | string) => {
    handleTypeChange(option as FileType);
    setCurrentPage(1);
  };

  const onModifiedChange = (option: FileType | ModifiedFilterType | string) => {
    handleModifiedChange(option as ModifiedFilterType);
    setCurrentPage(1);
  };

  const onApplyCustomDateRange = (range: CustomDateRange) => {
    setCustomDateRange(range);
    setCurrentPage(1);
  };

  const onClearAllFilters = () => {
    onTypeChange("All");
    onModifiedChange("Any time");
    setCurrentPage(1);
  };

  const onRequestSort = (key: Parameters<typeof requestSort>[0]) => {
    requestSort(key);
    setCurrentPage(1);
  };

  // Don't render anything until view is determined (to avoid flicker)
  if (view === null) return null;

  return (
    <main className="flex flex-1 flex-col text-slate-100 bg-slate-700/10">
      {/* Header */}
      <div className="px-6 pt-6 flex-shrink-0 relative z-10">
        <div className="flex justify-between items-center pb-4 border-b border-slate-600">
          <h1 className="text-2xl flex items-center gap-2 font-semibold">
            My Drive <ChevronDown size={20} />
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 bg-slate-400/5 backdrop-blur-md border border-slate-500/20 rounded-lg">
              <button
                onClick={() => updateView("table")}
                className={`p-1.5 rounded-md transition-all ${
                  view === "table"
                    ? "bg-blue-500/60 text-white shadow-md"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <List size={20} />
              </button>
              <button
                onClick={() => updateView("grid")}
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
              customDateRange={customDateRange}
              onApplyCustomDateRange={onApplyCustomDateRange}
              onClearAll={onClearAllFilters}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-0 overflow-y-auto scrollbar-custom">
        {view === "grid" ? (
          <FileGridView items={paginatedItems} view={view} />
        ) : (
          <FileTable
            items={paginatedItems}
            onSort={onRequestSort}
            sortConfig={sortConfig}
            view={view}
          />
        )}
      </div>

      {/* Pagination */}
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
