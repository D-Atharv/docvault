// components/drive/Footer.tsx

import { ChevronLeft, ChevronRight, ZoomOut, ZoomIn } from "lucide-react";
import { memo } from "react";
import { IconComponent } from "./FileViewer";

// Memoized Footer Component
export const FileViewerFooter = memo(function FileViewerFooter({
  pageNumber,
  numPages,
  scale,
  onGoToPrevPage,
  onGoToNextPage,
  onZoomIn,
  onZoomOut,
  pageInput,
  onPageInputChange,
  onPageInputSubmit,
}: {
  pageNumber: number;
  numPages: number;
  scale: number;
  onGoToPrevPage: () => void;
  onGoToNextPage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  pageInput: string;
  onPageInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPageInputSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <footer className="flex items-center justify-center gap-4 p-2 border-t border-slate-600 flex-shrink-0">
      <button
        onClick={onGoToPrevPage}
        disabled={pageNumber <= 1}
        className="p-2 rounded-full disabled:opacity-50 hover:bg-slate-700/60"
      >
        <IconComponent Icon={ChevronLeft} />
      </button>
      
      {/* ✨ Page number input form */}
      <form onSubmit={onPageInputSubmit} className="flex items-center gap-1.5">
        <span className="text-sm font-mono">Page</span>
        <input
          type="text"
          value={pageInput}
          onChange={onPageInputChange}
          className="bg-slate-900/80 rounded-md w-12 text-center text-sm font-mono p-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <span className="text-sm font-mono">of {numPages}</span>
      </form>
      
      <button
        onClick={onGoToNextPage}
        disabled={pageNumber >= numPages}
        className="p-2 rounded-full disabled:opacity-50 hover:bg-slate-700/60"
      >
        <IconComponent Icon={ChevronRight} />
      </button>
      <div className="w-px h-5 bg-slate-600 mx-2"></div>
      <button
        onClick={onZoomOut}
        className="p-2 rounded-full hover:bg-slate-700/60"
      >
        <IconComponent Icon={ZoomOut} />
      </button>
      <span className="text-sm font-mono w-16 text-center">
        {Math.round(scale * 100)}%
      </span>
      <button
        onClick={onZoomIn}
        className="p-2 rounded-full hover:bg-slate-700/60"
      >
        <IconComponent Icon={ZoomIn} />
      </button>
    </footer>
  );
});