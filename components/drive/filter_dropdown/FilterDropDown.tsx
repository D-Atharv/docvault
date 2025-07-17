// components/ui/FilterDropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Calendar, Folder, FileText, Users } from "lucide-react"; // Only main icons needed now
import {
  FileType,
  ModifiedFilterType,
  FilterCategory,
  CustomDateRange,
} from "@/types";
import React from "react"; // Explicitly import React
import FilterCustomDatePanel from "./FilterCustomDataPanel";
import FilterOptionsList from "./FilterOptionList";


interface FilterDropdownProps {
  category: FilterCategory;
  options: (FileType | ModifiedFilterType | string)[];
  selectedOption: FileType | ModifiedFilterType | string;
  onSelect: (option: FileType | ModifiedFilterType | string) => void;
  customDateRange?: CustomDateRange; // Passed down to custom date panel
  onApplyCustomDateRange?: (range: CustomDateRange) => void; // Passed down
  onClearAll?: () => void; // This is a general 'clear all filters' from parent, not just custom dates
}

// Helper to get the Lucide icon for the main button based on category
const getCategoryIcon = (category: FilterCategory) => {
  switch (category) {
    case "Type":
      return Folder;
    case "Modified":
      return Calendar;
    case "People":
      return Users;
    default:
      return FileText;
  }
};

export default function FilterDropdown({
  category,
  options,
  selectedOption,
  onSelect,
  customDateRange,
  onApplyCustomDateRange,
}: // For custom date panel's "Clear all", we use its specific handler.
FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomDatePanel, setShowCustomDatePanel] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // When dropdown opens, if Modified category and 'Custom date range' is selected, show panel
  // OR if a custom date range is currently active, show panel by default when opening
  useEffect(() => {
    if (
      isOpen &&
      category === "Modified" &&
      (selectedOption === "Custom date range" ||
        customDateRange?.after ||
        customDateRange?.before)
    ) {
      setShowCustomDatePanel(true);
    } else {
      setShowCustomDatePanel(false); // Ensure it's hidden otherwise
    }
  }, [isOpen, category, selectedOption, customDateRange]);

  const handleOptionClick = (
    option: FileType | ModifiedFilterType | string
  ) => {
    if (category === "Modified" && option === "Custom date range") {
      setShowCustomDatePanel(true); // Switch to custom date input panel
    } else {
      setShowCustomDatePanel(false); // Hide custom date panel for other selections
      onSelect(option); // Pass selection to parent
      setIsOpen(false); // Close dropdown for non-custom date selections
    }
  };

  const handleApplyCustomDates = (range: CustomDateRange) => {
    onApplyCustomDateRange?.(range); // Notify parent hook
    onSelect("Custom date range"); // Update selected option in parent
    setIsOpen(false); // Close entire dropdown
  };

  const handleClearCustomDates = () => {
    onApplyCustomDateRange?.({ after: null, before: null }); // Clear custom range in parent hook
    onSelect("Any time"); // Set selected option to "Any time" in parent
    setIsOpen(false); // Close entire dropdown
  };

  const handleCancelCustomDates = () => {
    // Simply close the dropdown and revert panel state, don't change filters
    setIsOpen(false);
    // If you want to revert option back to what it was *before* clicking custom date range
    // you'd need another state variable or pass the previous selected option.
    // For now, it stays 'Custom date range' if that was chosen, or reverts to 'Any time' if it was a new selection.
    setShowCustomDatePanel(false); // Hide panel on cancel
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowCustomDatePanel(false); // Close custom panel too
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const CategoryIcon = getCategoryIcon(category);
  const displaySelectedOption =
    category === "Type" && selectedOption === "All"
      ? "Any"
      : category === "Modified" && selectedOption === "Any time"
      ? "Any time"
      : selectedOption;

  // Determine the width of the dropdown content based on whether custom date panel is shown
  const dropdownContentWidth = showCustomDatePanel ? "w-72" : "w-56";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-600 hover:bg-slate-500 text-slate-200 text-sm font-medium transition-colors"
      >
        <CategoryIcon size={16} />
        {category}: {displaySelectedOption} <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div
          className={`absolute top-full left-0 mt-2 bg-slate-800 rounded-lg shadow-lg py-2 z-20 overflow-hidden ${dropdownContentWidth}`}
        >
          {category === "Modified" && showCustomDatePanel ? (
            <FilterCustomDatePanel
              initialCustomDateRange={
                customDateRange || { after: null, before: null }
              }
              onApply={handleApplyCustomDates}
              onClear={handleClearCustomDates}
              onCancel={handleCancelCustomDates}
            />
          ) : (
            <FilterOptionsList
              category={category}
              options={options}
              selectedOption={selectedOption}
              onOptionClick={handleOptionClick}
            />
          )}
        </div>
      )}
    </div>
  );
}
