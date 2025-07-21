"use client";

import { CustomDateRange } from "@/types";
import FilterDropdown from "../filter_dropdown/FilterDropDown";

interface FilterBarProps {
  fileTypeOptions: string[];
  selectedType: string;
  onTypeChange: (option: string) => void;
  modifiedFilterOptions: string[];
  selectedModified: string;
  onModifiedChange: (option: string) => void;
  customDateRange: CustomDateRange;
  onApplyCustomDateRange: (range: CustomDateRange) => void;
  onClearAllFilters: () => void;
}

export default function FilterBar({
  fileTypeOptions,
  selectedType,
  onTypeChange,
  modifiedFilterOptions,
  selectedModified,
  onModifiedChange,
  customDateRange,
  onApplyCustomDateRange,
  onClearAllFilters,
}: FilterBarProps) {
  return (
    <div className="flex items-center flex-wrap gap-3 py-3">
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
  );
}
