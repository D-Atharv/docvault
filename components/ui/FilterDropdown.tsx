"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Calendar,
  Folder,
  FileText,
  FileSpreadsheet,
  FileBadge,
  FileVideo,
  Image as ImageIcon,
  FileArchive,
  Music,
  PencilRuler,
  Link,
  LayoutList,
  Users,
} from "lucide-react";
import { FileType, ModifiedFilterType, FilterCategory } from "@/types"; // Import new types

interface FilterDropdownProps {
  category: FilterCategory; // e.g., "Type", "Modified"
  options: (FileType | ModifiedFilterType | string)[]; // Can be FileType options or ModifiedFilterType options
  selectedOption: FileType | ModifiedFilterType | string;
  onSelect: (option: FileType | ModifiedFilterType | string) => void;
}

// Helper to get the Lucide icon for the main button based on category
const getCategoryIcon = (category: FilterCategory) => {
  switch (category) {
    case "Type":
      return Folder; // A general icon for file types
    case "Modified":
      return Calendar;
    case "People":
      return Users; // Placeholder for People filter
    default:
      return FileText;
  }
};

// Helper to get the Lucide icon for individual type options
const getTypeOptionIcon = (type: FileType) => {
  switch (type) {
    case "Folders":
      return Folder;
    case "Documents":
      return FileText;
    case "Spreadsheets":
      return FileSpreadsheet;
    case "Presentations":
      return FileBadge;
    case "Vids":
    case "Videos":
      return FileVideo;
    case "Forms":
      return FileText;
    case "Photos & images":
      return ImageIcon;
    case "PDFs":
      return FileText;
    case "Archives (zip)":
      return FileArchive;
    case "Audio":
      return Music;
    case "Drawings":
      return PencilRuler;
    case "Sites":
      return LayoutList;
    case "Shortcuts":
      return Link;
    default:
      return FileText; // For 'All' or unknown
  }
};

export default function FilterDropdown({
  category,
  options,
  selectedOption,
  onSelect,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: FileType | ModifiedFilterType | string) => {
    onSelect(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
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
        <div className="absolute top-full left-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-lg py-2 z-20 max-h-80 overflow-y-auto custom-scrollbar">
          {options.map((option) => {
            const isSelected = selectedOption === option;
            const optionLabel = option; // In case option is not just a string, but the types are string unions

            let OptionIcon = null;
            if (category === "Type") {
              OptionIcon = getTypeOptionIcon(option as FileType);
            }
            // Add more icon logic for other categories if needed

            return (
              <button
                key={optionLabel}
                onClick={() => handleSelect(option)}
                className={`flex items-center w-full px-4 py-2 text-sm text-left gap-2 ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : "text-slate-200 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {OptionIcon && <OptionIcon size={16} />}
                {optionLabel}
                {category === "Modified" && option === "Custom date range" && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
