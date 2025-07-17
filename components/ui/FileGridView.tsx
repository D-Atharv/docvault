//server component
import { DriveItem, FileType } from "@/types"; // Import FileType
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
} from "lucide-react";

// Helper to get the correct icon based on FileType
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
      return FileText; // Using generic FileText for forms
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

const FileCard = ({ item }: { item: DriveItem }) => {
  const Icon = getFileIcon(item.type);
  // Display the type directly, or "FOLDER" if it's a folder type
  const itemTypeDisplay =
    item.type === "Folders" ? "FOLDER" : item.type.toUpperCase();

  return (
    <div className="group cursor-pointer rounded-xl border border-slate-500/30 bg-slate-400/10 backdrop-blur-md text-gray-100 shadow-md transition-all hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-800/30">
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
};

type FileGridViewProps = {
  items: DriveItem[];
};

export default function FileGridView({ items }: FileGridViewProps) {
  return (
    <div className="mt-6 grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
      {items.map((item) => (
        <FileCard key={item.id} item={item} />
      ))}
    </div>
  );
}
