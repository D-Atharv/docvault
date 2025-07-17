// components/ui/file_table/FileTableRow.tsx
"use client";

import React from "react"; // Explicitly import React
import { DriveItem, FileType } from "@/types"; // Import types
import {
  Folder,
  FileText,
  UserCircle,
  MoreVertical,
  FileSpreadsheet,
  FileBadge,
  FileVideo,
  Image as ImageIcon,
  FileArchive,
  Music,
  PencilRuler,
  Link,
  LayoutList,
} from "lucide-react";

// Helper function to get the Lucide icon for each file type (moved here)
const getTypeIconForTable = (type: FileType) => {
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

interface FileTableRowProps {
  item: DriveItem;
}

export default function FileTableRow({ item }: FileTableRowProps) {
  const Icon = getTypeIconForTable(item.type);

  return (
    <tr className="border-b border-slate-500/20 hover:bg-slate-700/30 group transition">
      {/* Ensure no extra whitespace between <td> tags on the same line */}
      <td className="p-3 flex items-center gap-3 text-slate-100">
        <Icon className="text-blue-300" />
        <span>{item.name}</span>
      </td>
      <td className="p-3 text-slate-300">{item.type}</td>
      <td className="p-3">
        <div className="flex items-center gap-2 text-slate-200">
          <UserCircle className="h-6 w-6 text-pink-400" />
          <span>{item.owner}</span>
        </div>
      </td>
      <td className="p-3 text-slate-400">{item.dateModified}</td>
      <td className="p-3 text-slate-400">{item.fileSize || "—"}</td>
      <td className="p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreVertical className="text-slate-400 cursor-pointer" />
      </td>
    </tr>
  );
}
