// components/drive/Header.tsx

import { memo } from "react";
import { DriveItem } from "@/types";
import {
  LucideIcon,
  Minimize,
  Maximize,
  Download,
  X,
  Save, // ✨ Import Save Icon
} from "lucide-react";
import { IconComponent } from "./FileViewer";

// Memoized Header Component
export const FileViewerHeader = memo(function FileViewerHeader({
  Icon,
  file,
  isFullscreen,
  isEditable,       // ✨ New prop
  hasChanges,       // ✨ New prop
  onToggleFullscreen,
  onDownload,
  onClose,
  onSave,           // ✨ New prop
}: {
  Icon: LucideIcon | null;
  file: DriveItem;
  isFullscreen: boolean;
  isEditable: boolean;
  hasChanges: boolean;
  onToggleFullscreen: () => void;
  onDownload: () => void;
  onInfo: () => void;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <header className="flex items-center justify-between p-3 border-b border-slate-600 flex-shrink-0">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="text-blue-300" />}
        <span className="font-semibold">{file.name}</span>
      </div>
      <div className="flex items-center gap-2 text-slate-300">
        {/* ✨ Conditionally render the Save button */}
        {isEditable && (
          <button
            onClick={onSave}
            disabled={!hasChanges}
            className="p-2 rounded-full hover:bg-slate-700/60 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-green-400 disabled:text-slate-500"
          >
            <IconComponent Icon={Save} />
            <span className="text-sm font-semibold pr-2">Save</span>
          </button>
        )}
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-full hover:bg-slate-700/60"
        >
          <IconComponent Icon={isFullscreen ? Minimize : Maximize} />
        </button>
        <button
          onClick={onDownload}
          className="p-2 rounded-full hover:bg-slate-700/60"
        >
          <IconComponent Icon={Download} />
        </button>
        {/* ... rest of your icons */}
        <div className="w-px h-6 bg-slate-600 mx-2"></div>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-slate-700/60"
        >
          <IconComponent Icon={X} />
        </button>
      </div>
    </header>
  );
});