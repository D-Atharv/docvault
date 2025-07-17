// components/ui/filter_dropdown/FilterOptionsList.tsx
"use client";
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
  LucideIcon,
} from "lucide-react";
import { FileType, ModifiedFilterType, FilterCategory } from "@/types";
import React from "react"; // Explicitly import React

interface FilterOptionsListProps {
  category: FilterCategory;
  options: (FileType | ModifiedFilterType | string)[];
  selectedOption: FileType | ModifiedFilterType | string;
  onOptionClick: (option: FileType | ModifiedFilterType | string) => void;
}

// Helper to get the Lucide icon for individual type options (copied from FilterDropdown)
const getTypeOptionIcon = (type: FileType) => {
  switch (type) {
    case "Folders": return Folder;
    case "Documents": return FileText;
    case "Spreadsheets": return FileSpreadsheet;
    case "Presentations": return FileBadge;
    case "Vids": case "Videos": return FileVideo;
    case "Forms": return FileText;
    case "Photos & images": return ImageIcon;
    case "PDFs": return FileText;
    case "Archives (zip)": return FileArchive;
    case "Audio": return Music;
    case "Drawings": return PencilRuler;
    case "Sites": return LayoutList;
    case "Shortcuts": return Link;
    default: return FileText;
  }
};

export default function FilterOptionsList({
  category,
  options,
  selectedOption,
  onOptionClick,
}: FilterOptionsListProps) {
  return (
    <div className="max-h-80 overflow-y-auto custom-scrollbar">
      {options.map((option) => {
        const isSelected = selectedOption === option;
        const optionLabel = option; // Already a string or string literal type

        let OptionIconComponent: LucideIcon | null = null;
        if (category === "Type") {
          OptionIconComponent = getTypeOptionIcon(option as FileType);
        }

        return (
          <button
            key={optionLabel}
            onClick={() => onOptionClick(option)}
            className={`flex items-center w-full px-4 py-2 text-sm text-left gap-2 ${
              isSelected
                ? "bg-blue-600 text-white"
                : "text-slate-200 hover:bg-slate-700 hover:text-white"
            }`}
          >
            {OptionIconComponent && <OptionIconComponent size={16} />}
            {optionLabel}
            {category === "Modified" && option === "Custom date range" && (
              <ChevronRight size={16} className="ml-auto" />
            )}
          </button>
        );
      })}
    </div>
  );
}