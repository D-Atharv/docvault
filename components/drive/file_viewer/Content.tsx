// components/drive/Content.tsx

import { memo } from "react";
import { Loader2 } from "lucide-react";
import { Document, Page } from "react-pdf";
import Editor from "@monaco-editor/react";

// Memoized Content Component
export const FileViewerContent = memo(function FileViewerContent({
  isPdf,
  isEditable,
  isLoading,
  fileUrl,
  onDocumentLoadSuccess,
  pageNumber,
  scale,
  language,
  content,
  onContentChange,
}: {
  isPdf: boolean;
  isEditable: boolean;
  isLoading: boolean;
  fileUrl?: string;
  onDocumentLoadSuccess: (data: { numPages: number }) => void;
  pageNumber: number;
  scale: number;
  language: string;
  content: string;
  onContentChange: (value: string | undefined) => void;
}) {
  const editorLoading = (
    <div className="flex items-center gap-2 text-slate-300">
      <Loader2 className="animate-spin" /> Loading...
    </div>
  );

  return (
    <main
      className={`flex-1 bg-slate-900/50 flex justify-center scrollbar-custom
        ${/* ✨ FIX: Apply styles conditionally based on content type */ ""}
        ${ isPdf
            ? "overflow-auto p-4 md:p-8" // For PDFs: enable scrolling in all directions and add padding.
            : "overflow-y-auto" // For others: keep original vertical scroll.
        }
        ${
          !isPdf && !isEditable
            ? "items-center" // Vertically center only for the "no preview" message.
            : ""
        }
      `}
    >
      {isLoading ? (
        editorLoading
      ) : isPdf && fileUrl ? (
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={editorLoading}
          error="Failed to load PDF file."
          className="flex justify-center"
        >
          <Page pageNumber={pageNumber} scale={scale} renderTextLayer={true} />
        </Document>
      ) : isEditable ? (
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          language={language}
          value={content}
          onChange={onContentChange}
          loading={editorLoading}
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            wordWrap: "on",
            padding: { top: 16 },
          }}
        />
      ) : (
        <div className="text-center text-slate-400">
          <h2 className="text-xl font-semibold">No preview available</h2>
          <p>Preview for this file type is not supported yet.</p>
        </div>
      )}
    </main>
  );
});