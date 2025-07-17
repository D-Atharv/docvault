// components/ui/file_grid/FileCard.tsx
"use client"; // This makes it a Client Component

import React from "react"; // Explicitly import React
import { DriveItem, FileType } from "@/types"; // Import types
import {
  Folder,
  FileText,
  FileSpreadsheet,
  FileBadge, // For Presentations/Forms (generic doc)
  FileVideo,
  Image as ImageIcon,
  FileArchive,
  Music,
  PencilRuler, // For Drawings
  LayoutList, // For Sites
  Link, // For Shortcuts
} from "lucide-react"; // Import all necessary icons here

// Helper to get the correct icon based on FileType (moved here)
const getFileIcon = (type: FileType) => {
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
      return FileText; // Fallback
  }
};

interface FileCardProps {
  item: DriveItem;
  // Add an onClick handler here if the card itself is clickable
  // onClick?: (item: DriveItem) => void;
}

export default function FileCard({ item }: FileCardProps) {
  // Removed onClick for now, but keep in mind for future
  const Icon = getFileIcon(item.type);
  const itemTypeDisplay =
    item.type === "Folders" ? "FOLDER" : item.type.toUpperCase();

  // If the card is clickable, you would add an onClick here:
  // const handleClick = () => {
  //   onClick?.(item);
  // };

  return (
    <div
      // onClick={handleClick} // Add this if you implement onClick prop
      className="group cursor-pointer rounded-xl border border-slate-500/30 bg-slate-400/10 backdrop-blur-md text-gray-100 shadow-md transition-all hover:border-blue-500/40 hover:shadow-2xl hover:hover:shadow-blue-800/30"
    >
      {/* Top section with item type */}
      <div className="p-4">
        <p className="font-mono text-sm text-slate-300">{itemTypeDisplay}</p>
      </div>

      {/* Divider */}
      <hr className="border-slate-500/30" />

      {/* Name and details */}
      <div className="p-4 h-40 flex flex-col justify-between">
        <h3 className="font-semibold text-lg flex items-start gap-2">
          <Icon className="text-blue-300 mt-1 flex-shrink-0" />
          {item.name}
        </h3>

        {/* Metadata section */}
        <div className="text-sm text-slate-300 font-mono space-y-1">
          <p>👤 {item.owner}</p>
          <p>📅 {item.dateModified}</p>
          {item.fileSize && <p>📁 {item.fileSize}</p>}
        </div>
      </div>
    </div>
  );
}
