"use client";
import {
  DriveFilterSchema,
  FileTypeSchema,
  ModifiedFilterSchema,
} from "@/lib/drive_filter_validations";

import { useMemo } from "react";
import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "../../layout/Pagination";
import {
  useDriveFilters,
  useDriveSorting,
  useDrivePagination,
  useDriveSearch,
} from "@/hooks/drive_content";
import { DriveItem, FileType, ModifiedFilterType } from "@/types";
import { Breadcrumb } from "@/lib/drive-utils";

// Modular Components
import DriveContentHeader from "./DriveContentHeader";
import FilterBar from "./FilterBar";
import FileDisplay from "./FileDisplay";
import z from "zod";

import dynamic from "next/dynamic";

const FileViewer = dynamic(() => import("../file_viewer/FileViewer"), {
  ssr: false,
  loading: () => (
    // Optional: Add a loading state while the component loads
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <p className="text-white">Loading Viewer...</p>
    </div>
  ),
});

type ViewType = "grid" | "table";

interface DriveContentProps {
  initialItems: DriveItem[];
  initialView: ViewType;
  breadcrumbs: Breadcrumb[];
}

export default function DriveContent({
  initialItems,
  initialView,
  breadcrumbs,
}: DriveContentProps) {
  const ITEMS_PER_PAGE = 12;

  const searchParams = useSearchParams();

  const safeParams = useMemo(() => {
    const rawParams = Object.fromEntries(searchParams.entries());
    const parsed = DriveFilterSchema.safeParse(rawParams);
    return parsed.success ? parsed.data : {};
  }, [searchParams]);

  const searchQuery = safeParams.q || "";

  const defaultView = (searchParams.get("view") as ViewType) ?? initialView;

  const [view, setView] = useState<ViewType>(defaultView);
  const [viewingFile, setViewingFile] = useState<DriveItem | null>(null);

  // --- Data Processing ---
  const { searchedItems } = useDriveSearch(initialItems, searchQuery);

  const { filteredItems, ...filterProps } = useDriveFilters(searchedItems, {
    initialType: safeParams.type,
    initialModified: safeParams.modified,
    initialCustomRange: safeParams.range,
  });
  const { sortedItems, ...sortProps } = useDriveSorting(filteredItems);
  const { paginatedItems, ...paginationProps } = useDrivePagination(
    sortedItems,
    ITEMS_PER_PAGE
  );

  const handleOpenFile = useCallback((file: DriveItem) => {
    if (file.type !== "Folders") setViewingFile(file);
  }, []);

  const updateView = useCallback((newView: ViewType) => {
    setView(newView);
    const url = new URL(window.location.href);
    url.searchParams.set("view", newView);
    window.history.replaceState(null, "", url.toString());
  }, []);

  const onClearAllFilters = () => {
    paginationProps.setCurrentPage(1);
    filterProps.handleTypeChange("All");
    filterProps.handleModifiedChange("Any time");
  };

  const isValidType = (val: string): val is z.infer<typeof FileTypeSchema> =>
    FileTypeSchema.safeParse(val).success;

  const isValidModified = (
    val: string
  ): val is z.infer<typeof ModifiedFilterSchema> =>
    ModifiedFilterSchema.safeParse(val).success;

  return (
    <>
      <main className="flex flex-1 flex-col text-slate-100 bg-slate-700/10">
        <div className="px-6 pt-6 flex-shrink-0 relative z-10">
          <DriveContentHeader
            breadcrumbs={breadcrumbs}
            view={view}
            updateView={updateView}
          />
          {view === "table" && (
            <FilterBar
              {...filterProps}
              onTypeChange={(opt) => {
                if (isValidType(opt)) {
                  paginationProps.setCurrentPage(1);
                  filterProps.handleTypeChange(opt as FileType);
                }
              }}
              onModifiedChange={(opt) => {
                if (isValidModified(opt)) {
                  paginationProps.setCurrentPage(1);
                  filterProps.handleModifiedChange(opt as ModifiedFilterType);
                }
              }}
              onApplyCustomDateRange={(range) => {
                paginationProps.setCurrentPage(1);
                filterProps.setCustomDateRange(range);
              }}
              onClearAllFilters={onClearAllFilters}
            />
          )}
        </div>

        <FileDisplay
          view={view}
          items={paginatedItems}
          onFileDoubleClick={handleOpenFile}
          sortConfig={sortProps.sortConfig}
          onSort={(key) => {
            paginationProps.setCurrentPage(1);
            sortProps.requestSort(key);
          }}
        />

        <div className="px-6 mb-4 flex-shrink-0 relative z-10 border-t border-slate-600/50 pt-2">
          <Pagination
            currentPage={paginationProps.currentPage}
            totalPages={paginationProps.totalPages}
            onPageChange={paginationProps.handlePageChange}
          />
        </div>
      </main>

      {viewingFile && (
        <FileViewer file={viewingFile} onClose={() => setViewingFile(null)} />
      )}
    </>
  );
}
