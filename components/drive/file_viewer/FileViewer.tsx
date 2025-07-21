// components/drive/FileViewer.tsx

"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { pdfjs } from "react-pdf";
import { LucideIcon } from "lucide-react";
import { DriveItem } from "@/types";
import { getFileIcon } from "@/lib/file_icon";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { FileViewerContent } from "./Content";
import { FileViewerHeader } from "./Header";
import { FileViewerFooter } from "./Footer";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.mjs`;

// Tiny helper to avoid repeating size prop
export const IconComponent = ({ Icon }: { Icon: LucideIcon }) => (
  <Icon size={20} />
);

// Main Component
interface FileViewerProps {
  file: DriveItem;
  onClose: () => void;
}

const FileViewer: React.FC<FileViewerProps> = ({ file, onClose }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1.0);
  const [pageInput, setPageInput] = useState("1"); // ✨ State for the input field
  const viewerRef = useRef<HTMLDivElement>(null);

  // Sync input field when pageNumber changes via buttons
  useEffect(() => {
    setPageInput(pageNumber.toString());
  }, [pageNumber]);

  const onDocumentLoadSuccess = useCallback((data: { numPages: number }) => {
    setNumPages(data.numPages);
    setPageNumber(1);
    setPageInput("1");
  }, []);

  // ✨ Handlers for the page number input
  const handlePageInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPageInput(e.target.value);
    },
    []
  );

  const handlePageInputSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newPage = parseInt(pageInput, 10);
      // Validate the input before jumping to the page
      if (numPages && !isNaN(newPage) && newPage >= 1 && newPage <= numPages) {
        setPageNumber(newPage);
      } else {
        // Reset input to current page if invalid
        setPageInput(pageNumber.toString());
      }
    },
    [pageInput, numPages, pageNumber]
  );

  const goToPrevPage = useCallback(
    () => setPageNumber((prev) => Math.max(prev - 1, 1)),
    []
  );
  const goToNextPage = useCallback(
    () => setPageNumber((prev) => Math.min(prev + 1, numPages || 1)),
    [numPages]
  );
  const zoomIn = useCallback(() => setScale((prev) => prev + 0.1), []);
  const zoomOut = useCallback(
    () => setScale((prev) => Math.max(0.2, prev - 0.1)),
    []
  );

  const toggleFullscreen = useCallback(() => {
    if (!viewerRef.current) return;
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const Icon = getFileIcon(file.type);
  const isPdf = file.type === "PDFs" && !!file.url;

  return (
    <div
      ref={viewerRef}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        className={`bg-[#1e293b] text-slate-100 shadow-2xl flex flex-col ${
          isFullscreen
            ? "w-full h-full"
            : "rounded-lg w-full max-w-4xl h-[90vh]"
        }`}
      >
        <FileViewerHeader
          Icon={Icon}
          file={file}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          onDownload={() => alert("Download clicked")}
          onInfo={() => alert("Info clicked")}
          onClose={onClose}
        />
        <FileViewerContent
          isPdf={isPdf}
          fileUrl={file.url}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
          pageNumber={pageNumber}
          scale={scale}
        />
        {isPdf && numPages && (
          <FileViewerFooter
            pageNumber={pageNumber}
            numPages={numPages}
            scale={scale}
            onGoToPrevPage={goToPrevPage}
            onGoToNextPage={goToNextPage}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            pageInput={pageInput}
            onPageInputChange={handlePageInputChange}
            onPageInputSubmit={handlePageInputSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default FileViewer;