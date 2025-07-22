"use client";

import React from "react";
import { pdfjs } from "react-pdf";
import { DriveItem } from "@/types";
import { getFileIcon } from "@/lib/file_icon";
import { useFileViewer } from "@/hooks/file_viewer/useFileViewer";

import { FileViewerContent } from "./Content";
import { FileViewerHeader } from "./Header";
import { FileViewerFooter } from "./Footer";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { LucideIcon } from "lucide-react";

// Initialize PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

interface FileViewerProps {
  file: DriveItem;
  onClose: () => void;
}
// Tiny helper to avoid repeating size prop
export const IconComponent = ({ Icon }: { Icon: LucideIcon }) => (
  <Icon size={20} />
);

const FileViewer: React.FC<FileViewerProps> = ({ file, onClose }) => {
  // All logic is now neatly encapsulated in the custom hook.
  const {
    viewerRef,
    isLoading,
    isPdf,
    isEditable,
    isFullscreen,
    language,
    content,
    hasChanges,
    numPages,
    pageNumber,
    pageInput,
    scale,
    onDocumentLoadSuccess,
    handleSave,
    handleContentChange,
    handlePageInputChange,
    handlePageInputSubmit,
    goToPrevPage,
    goToNextPage,
    zoomIn,
    zoomOut,
    toggleFullscreen,
  } = useFileViewer(file);

  const Icon = getFileIcon(file.type);
  

  return (
    <div
      ref={viewerRef}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        className={`bg-[#1e293b] text-slate-100 shadow-2xl flex flex-col ${
          isFullscreen
            ? "w-full h-full"
            : "rounded-lg w-full max-w-6xl h-[90vh]"
        }`}
      >
        <FileViewerHeader
          Icon={Icon}
          file={file}
          isFullscreen={isFullscreen}
          isEditable={isEditable}
          hasChanges={hasChanges}
          onClose={onClose}
          onSave={handleSave}
          onToggleFullscreen={toggleFullscreen}
          onDownload={() => alert("Download clicked")}
          onInfo={() => alert("Info clicked")}
        />

        <FileViewerContent
          isPdf={isPdf}
          isEditable={isEditable}
          isLoading={isLoading}
          fileUrl={file.url}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
          pageNumber={pageNumber}
          scale={scale}
          language={language}
          content={content}
          onContentChange={handleContentChange}
        />

        {isPdf && !isLoading && numPages && (
          <FileViewerFooter
            pageNumber={pageNumber}
            numPages={numPages}
            scale={scale}
            pageInput={pageInput}
            onGoToPrevPage={goToPrevPage}
            onGoToNextPage={goToNextPage}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onPageInputChange={handlePageInputChange}
            onPageInputSubmit={handlePageInputSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default FileViewer;