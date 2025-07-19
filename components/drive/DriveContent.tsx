"use client";

import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import { List, LayoutGrid, Info } from "lucide-react";
import Pagination from "../layout/Pagination";
import {
  useDriveFilters,
  useDriveSorting,
  useDrivePagination,
} from "@/hooks/drive_content";
import {
  DriveItem,
  FileType,
  ModifiedFilterType,
  CustomDateRange,
} from "@/types";
import FilterDropdown from "./filter_dropdown/FilterDropDown";
import FileTable from "./file_table/FileTable";
import FileGridView from "./file_grid/FileGridView";
import { Breadcrumb } from "@/lib/drive-utils";
import Breadcrumbs from "../layout/BreadCrumbs";
import FileViewer from "./FileViewer";

type ViewType = "grid" | "table";

interface DriveContentProps {
  initialItems: DriveItem[];
  initialView: ViewType;
  breadcrumbs: Breadcrumb[]; // Add breadcrumbs prop
}

export default function DriveContent({
  initialItems,
  initialView,
  breadcrumbs, // Destructure breadcrumbs
}: DriveContentProps) {
  const ITEMS_PER_PAGE = 15;

  const searchParams = useSearchParams();
  const defaultView = (searchParams.get("view") as ViewType) ?? initialView;

  const [view, setView] = useState<ViewType>(defaultView);

  // ✨ --- START: New state and handler for file viewer --- ✨
  const [viewingFile, setViewingFile] = useState<DriveItem | null>(null);

  const handleOpenFile = useCallback((file: DriveItem) => {
    // We only want to open previews for files, not navigate folders
    if (file.type !== "Folders") {
      setViewingFile(file);
    }
  }, []);

  //  Function to update view & sync URL param
  const updateView = useCallback((newView: ViewType) => {
    setView(newView);
    const url = new URL(window.location.href);
    url.searchParams.set("view", newView);
    window.history.replaceState(null, "", url.toString());
  }, []);

  //  Filters
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

  //  Sorting
  const { sortedItems, sortConfig, requestSort } =
    useDriveSorting(filteredItems);

  //  Pagination
  const {
    currentPage,
    paginatedItems,
    totalPages,
    handlePageChange,
    setCurrentPage,
  } = useDrivePagination(sortedItems, ITEMS_PER_PAGE);

  //  Clear page + update filters/sorting helpers
  const resetPageAnd = (action: () => void) => {
    action();
    setCurrentPage(1);
  };

  const onTypeChange = (option: FileType | ModifiedFilterType | string) =>
    resetPageAnd(() => handleTypeChange(option as FileType));

  const onModifiedChange = (option: FileType | ModifiedFilterType | string) =>
    resetPageAnd(() => handleModifiedChange(option as ModifiedFilterType));

  const onApplyCustomDateRange = (range: CustomDateRange) =>
    resetPageAnd(() => setCustomDateRange(range));

  const onClearAllFilters = () => {
    resetPageAnd(() => {
      handleTypeChange("All");
      handleModifiedChange("Any time");
    });
  };

  const onRequestSort = (key: Parameters<typeof requestSort>[0]) =>
    resetPageAnd(() => requestSort(key));

  return (
    <>
      <main className="flex flex-1 flex-col text-slate-100 bg-slate-700/10">
        {/* Header */}
        <div className="px-6 pt-6 flex-shrink-0 relative z-10">
          <div className="flex justify-between items-center pb-4 border-b border-slate-600">
            {/* <h1 className="text-2xl flex items-center gap-2 font-semibold">
            My Drive <ChevronDown size={20} />
          </h1> */}
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            {/* View switcher + Info button */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 bg-slate-400/5 backdrop-blur-md border border-slate-500/20 rounded-lg">
                {(["table", "grid"] as ViewType[]).map((v) => {
                  const Icon = v === "table" ? List : LayoutGrid;
                  const isActive = view === v;
                  return (
                    <button
                      key={v}
                      onClick={() => updateView(v)}
                      className={`p-1.5 rounded-md transition-all ${
                        isActive
                          ? "bg-blue-500/60 text-white shadow-md"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      <Icon size={20} />
                    </button>
                  );
                })}
              </div>
              <button className="p-2 rounded-full text-slate-300 hover:bg-slate-700/40">
                <Info size={20} />
              </button>
            </div>
          </div>

          {/* Filters (table view only) */}
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
            <FileGridView
              items={paginatedItems}
              view={view}
              onFileDoubleClick={handleOpenFile} // 👈 Pass handler
            />
          ) : (
            <FileTable
              items={paginatedItems}
              onSort={onRequestSort}
              sortConfig={sortConfig}
              view={view}
              onFileDoubleClick={handleOpenFile} // 👈 Pass handler
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
      {viewingFile && (
        <FileViewer file={viewingFile} onClose={() => setViewingFile(null)} />
      )}
    </>
  );
}

