import { memo } from "react";
import { Loader2 } from "lucide-react";
import { Document, Page } from "react-pdf";

// Memoized Content Component
export const FileViewerContent = memo(function FileViewerContent({
  isPdf,
  fileUrl,
  onDocumentLoadSuccess,
  pageNumber,
  scale,
}: {
  isPdf: boolean;
  fileUrl?: string;
  onDocumentLoadSuccess: (data: { numPages: number }) => void;
  pageNumber: number;
  scale: number;
}) {
  return (
    <main className="flex-1 overflow-y-auto bg-slate-900/50 flex justify-center p-4 scrollbar-custom">
      {isPdf && fileUrl ? (
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center gap-2 text-slate-300">
              <Loader2 className="animate-spin" /> Loading PDF...
            </div>
          }
          error="Failed to load PDF file."
          className="flex justify-center"
        >
          <Page pageNumber={pageNumber} scale={scale} renderTextLayer={true} />
        </Document>
      ) : (
        <div className="text-center text-slate-400">
          <h2 className="text-xl font-semibold">No preview available</h2>
          <p>Preview for this file type is not supported.</p>
        </div>
      )}
    </main>
  );
});
