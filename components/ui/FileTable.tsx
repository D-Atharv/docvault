// components/ui/FileTable.tsx

import { DriveItem, FileType } from "@/types";
import {
  Folder,
  FileText,
  UserCircle,
  MoreVertical,
  ArrowUp,
  ArrowDown,
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

type FileTableProps = {
  items: DriveItem[];
  onSort: (key: keyof DriveItem) => void;
  sortConfig: { key: keyof DriveItem; direction: "asc" | "desc" };
};

// Helper function to get the Lucide icon for each file type (reused from TypeDropdown)
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

const TableHeader = ({
  children,
  onClick,
  sortDirection,
}: {
  children: React.ReactNode;
  onClick: () => void;
  sortDirection?: "asc" | "desc";
}) => (
  <th className="p-4 text-left font-medium text-sm text-slate-300 border-b border-slate-500/30 sticky top-0 bg-slate-400/10 backdrop-blur-md z-10">
    <button
      className="flex items-center gap-2 hover:text-blue-300 transition-colors"
      onClick={onClick}
    >
      {children}
      {sortDirection === "asc" && <ArrowUp size={16} />}
      {sortDirection === "desc" && <ArrowDown size={16} />}
    </button>
  </th>
);

// FIX: Ensure no whitespace text nodes inside <tr> and <td>
const TableRow = ({ item }: { item: DriveItem }) => {
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
};

export default function FileTable({
  items,
  onSort,
  sortConfig,
}: FileTableProps) {
  const getSortDirection = (key: keyof DriveItem) =>
    sortConfig.key === key ? sortConfig.direction : undefined;

  return (
    <div className="rounded-xl border border-slate-500/30 bg-slate-400/5 backdrop-blur-sm shadow-md overflow-x-auto transition-all hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-800/30 ">
      <table className="w-full text-sm text-slate-100">
        <thead>
          <tr>
            <TableHeader
              onClick={() => onSort("name")}
              sortDirection={getSortDirection("name")}
            >
              Name
            </TableHeader>
            <TableHeader
              onClick={() => onSort("type")}
              sortDirection={getSortDirection("type")}
            >
              Type
            </TableHeader>
            <TableHeader
              onClick={() => onSort("owner")}
              sortDirection={getSortDirection("owner")}
            >
              Owner
            </TableHeader>
            <TableHeader
              onClick={() => onSort("dateModified")}
              sortDirection={getSortDirection("dateModified")}
            >
              Date Modified
            </TableHeader>
            <TableHeader
              onClick={() => onSort("fileSize")}
              sortDirection={getSortDirection("fileSize")}
            >
              File Size
            </TableHeader>
            {/* Ensure no whitespace between <th> and </th> */}
            <th className="p-2 border-b border-slate-500/30 sticky top-0 bg-slate-400/10 backdrop-blur-md z-10 w-12"></th>
          </tr>
        </thead>
        <tbody>
          {/* Ensure no whitespace between <tbody> and <tr> or </tr> and <tr> */}
          {items.map((item) => (
            <TableRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
