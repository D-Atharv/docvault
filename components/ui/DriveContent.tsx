"use client";

import { useState, useMemo } from "react";
import { driveItems } from "@/lib/mock-data";
import FileTable from "./FileTable";
import FileGridView from "./FileGridView";
import { DriveItem, FileType, ModifiedFilterType } from "@/types"; // Import types
import { ChevronDown, List, LayoutGrid, Info } from "lucide-react";
import Pagination from "./Pagination";
import FilterPill from "./FilterPill";
import FilterDropdown from "./FilterDropdown"; // Import the combined component

export default function DriveContent() {
  const [view, setView] = useState<"grid" | "table">("grid");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DriveItem;
    direction: "asc" | "desc";
  }>({ key: "name", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState<FileType>("All");
  const [selectedModified, setSelectedModified] =
    useState<ModifiedFilterType>("Any time");
  const ITEMS_PER_PAGE = 15;

  // Define filter options (can be moved to a constants file if preferred)
  const fileTypeOptions: FileType[] = [
    "All",
    "Folders",
    "Documents",
    "Spreadsheets",
    "Presentations",
    "Vids",
    "Forms",
    "Photos & images",
    "PDFs",
    "Videos",
    "Archives (zip)",
    "Audio",
    "Drawings",
    "Sites",
    "Shortcuts",
  ];

  const modifiedFilterOptions: ModifiedFilterType[] = [
    "Any time",
    "Today",
    "Last 7 days",
    "Last 30 days",
    "This year (2025)",
    "Last year (2024)",
    "Custom date range",
  ];

  const filteredItems = useMemo(() => {
    return driveItems.filter((item) => {
      // Type filter logic
      if (selectedType !== "All" && item.type !== selectedType) {
        return false;
      }

      // Modified filter logic
      if (selectedModified !== "Any time") {
        const itemDate = new Date(item.dateModified);
        const now = new Date();
        const todayStart = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate()
        );

        switch (selectedModified) {
          case "Today":
            const itemDayStart = new Date(
              itemDate.getFullYear(),
              itemDate.getMonth(),
              itemDate.getDate()
            );
            if (itemDayStart.getTime() !== todayStart.getTime()) {
              return false;
            }
            break;
          case "Last 7 days":
            const sevenDaysAgo = new Date(todayStart);
            sevenDaysAgo.setDate(todayStart.getDate() - 7);
            if (itemDate < sevenDaysAgo) {
              return false;
            }
            break;
          case "Last 30 days":
            const thirtyDaysAgo = new Date(todayStart);
            thirtyDaysAgo.setDate(todayStart.getDate() - 30);
            if (itemDate < thirtyDaysAgo) {
              return false;
            }
            break;
          case "This year (2025)":
            if (itemDate.getFullYear() !== 2025) {
              return false;
            }
            break;
          case "Last year (2024)":
            if (itemDate.getFullYear() !== 2024) {
              return false;
            }
            break;
          case "Custom date range":
            // Requires additional state and UI for custom date input
            break;
          default:
            break;
        }
      }
      return true;
    });
  }, [selectedType, selectedModified]);

  const sortedItems = useMemo(() => {
    const sortableItems = [...filteredItems];
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
  }, [filteredItems, sortConfig]);

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

  // Handlers for the GenericFilterDropdown
  const handleTypeChange = (type: FileType | ModifiedFilterType | string) => {
    setSelectedType(type as FileType); // Cast back to FileType
    setCurrentPage(1);
  };

  const handleModifiedChange = (
    modified: FileType | ModifiedFilterType | string
  ) => {
    setSelectedModified(modified as ModifiedFilterType); // Cast back to ModifiedFilterType
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
            {/* Using GenericFilterDropdown for Type */}
            <FilterDropdown
              category="Type"
              options={fileTypeOptions}
              selectedOption={selectedType}
              onSelect={handleTypeChange}
            />
            {/* FilterPill for People (as it's not a dropdown yet) */}
            {/* <FilterPill>People</FilterPill> */}
            {/* Using GenericFilterDropdown for Modified */}
            <FilterDropdown
              category="Modified"
              options={modifiedFilterOptions}
              selectedOption={selectedModified}
              onSelect={handleModifiedChange}
            />
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