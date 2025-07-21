// hooks/useDriveFilters.ts
import { useState, useMemo } from "react";
import {
  DriveItem,
  FileType,
  ModifiedFilterType,
  CustomDateRange,
} from "@/types"; // Import CustomDateRange

export type FilterState = {
  selectedType: FileType;
  selectedModified: ModifiedFilterType;
  customDateRange: CustomDateRange; // Add custom date range to state
};

export type FilterHandlers = {
  handleTypeChange: (type: FileType) => void;
  handleModifiedChange: (modified: ModifiedFilterType) => void;
  setCustomDateRange: (range: CustomDateRange) => void; // Handler to update custom date range
};

export type FilterOptions = {
  fileTypeOptions: FileType[];
  modifiedFilterOptions: ModifiedFilterType[];
};

export const useDriveFilters = (items: DriveItem[], p0: { initialType: "All" | "Folders" | "Images" | "Videos" | "Documents" | "Audio" | "PDFs" | undefined; initialModified: "Any time" | "Today" | "Last 7 days" | "Last 30 days" | "Last year" | "Custom range" | undefined; initialCustomRange: { start?: string | undefined; end?: string | undefined; } | undefined; }) => {
  const [selectedType, setSelectedType] = useState<FileType>("All");
  const [selectedModified, setSelectedModified] =
    useState<ModifiedFilterType>("Any time");
  const [customDateRange, setCustomDateRange] = useState<CustomDateRange>({
    // State for custom dates
    after: null,
    before: null,
  });

  const fileTypeOptions: FileType[] = useMemo(
    () => [
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
    ],
    []
  );

  const modifiedFilterOptions: ModifiedFilterType[] = useMemo(
    () => [
      "Any time",
      "Today",
      "Last 7 days",
      "Last 30 days",
      "This year (2025)",
      "Last year (2024)",
      "Custom date range",
    ],
    []
  );

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
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
            // Apply custom date range filter
            if (customDateRange.after) {
              const afterDate = new Date(customDateRange.after);
              if (itemDate < afterDate) {
                return false;
              }
            }
            if (customDateRange.before) {
              // Set the time to end of day for 'before' date to include the whole day
              const beforeDate = new Date(customDateRange.before);
              beforeDate.setHours(23, 59, 59, 999);
              if (itemDate > beforeDate) {
                return false;
              }
            }
            // If neither after nor before is set for custom range, it means no filter for custom range is applied.
            if (!customDateRange.after && !customDateRange.before) {
              // If custom range is selected but no dates are set, treat it as no filter for now
              // or you could choose to return false here if an "empty" custom range implies no matches.
              // For this example, we'll let it pass if no dates are specified in the custom range.
            }
            break;
          default:
            break;
        }
      }
      return true;
    });
  }, [items, selectedType, selectedModified, customDateRange]); // Add customDateRange to dependencies

  const handleTypeChange = (type: FileType) => {
    setSelectedType(type);
  };

  const handleModifiedChange = (modified: ModifiedFilterType) => {
    setSelectedModified(modified);
    // When switching from custom date range, clear the custom dates
    if (modified !== "Custom date range") {
      setCustomDateRange({ after: null, before: null });
    }
  };

  return {
    selectedType,
    selectedModified,
    customDateRange, // Expose custom date range state
    fileTypeOptions,
    modifiedFilterOptions,
    filteredItems,
    handleTypeChange,
    handleModifiedChange,
    setCustomDateRange, // Expose handler to update custom date range
  };
};
