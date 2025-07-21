import { memo } from "react";
import { DriveItem } from "@/types";
import {
  LucideIcon,
  Minimize,
  Maximize,
  Download,
  Info,
  X,
} from "lucide-react";
import { IconComponent } from "./FileViewer";

// Memoized Header Component
export const FileViewerHeader = memo(function FileViewerHeader({
  Icon,
  file,
  isFullscreen,
  onToggleFullscreen,
  onDownload,
  onInfo,
  onClose,
}: {
  Icon: LucideIcon | null;
  file: DriveItem;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onDownload: () => void;
  onInfo: () => void;
  onClose: () => void;
}) {
  return (
    <header className="flex items-center justify-between p-3 border-b border-slate-600 flex-shrink-0">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="text-blue-300" />}
        <span className="font-semibold">{file.name}</span>
      </div>
      <div className="flex items-center gap-2 text-slate-300">
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
        <button
          onClick={onInfo}
          className="p-2 rounded-full hover:bg-slate-700/60"
        >
          <IconComponent Icon={Info} />
        </button>
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

