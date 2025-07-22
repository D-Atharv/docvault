import { useState, useRef, useEffect, useCallback } from "react";
import { DriveItem } from "@/types";
import {
  isEditableFile,
  getLanguageFromExtension,
} from "@/lib/file_viewer_utils";

/**
 * A custom hook to manage the state and logic for the FileViewer component.
 * @param file - The file item to be displayed.
 * @returns An object containing state and handlers for the viewer.
 */
export const useFileViewer = (file: DriveItem) => {
  // State for PDF rendering
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [scale, setScale] = useState(1.0);

  // State for the editor
  const [originalContent, setOriginalContent] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");

  // General viewer state
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const viewerRef = useRef<HTMLDivElement>(null);

  // Derived state
  const isPdf = file.type === "PDFs" && !!file.url;
  const isEditable = isEditableFile(file.name);
  const language = isEditable ? getLanguageFromExtension(file.name) : "";
  const hasChanges = originalContent !== editedContent;

  // Effect to fetch content for editable files
  useEffect(() => {
    if (isEditable && file.url) {
      setIsLoading(true);
      fetch(file.url)
        .then((res) => res.text())
        .then((text) => {
          setOriginalContent(text);
          setEditedContent(text);
        })
        .catch((err) => {
          console.error("Failed to fetch file content:", err);
          setOriginalContent("Error: Could not load file content.");
          setEditedContent("Error: Could not load file content.");
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [file.url, file.name, isEditable]);

  // Effect to handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Effect to sync page number input
  useEffect(() => {
    setPageInput(pageNumber.toString());
  }, [pageNumber]);

  // Callbacks for UI events
  const onDocumentLoadSuccess = useCallback((data: { numPages: number }) => {
    setNumPages(data.numPages);
    setPageNumber(1);
    setPageInput("1");
    setIsLoading(false);
  }, []);

  const handleSave = useCallback(() => {
    alert("Content Saved! (Check console for output)");
    console.log("Saving content...", editedContent);
    setOriginalContent(editedContent);
  }, [editedContent]);

  const handleContentChange = useCallback((value: string | undefined) => {
    setEditedContent(value || "");
  }, []);

  const goToPrevPage = useCallback(
    () => setPageNumber((prev) => Math.max(prev - 1, 1)),
    []
  );
  const goToNextPage = useCallback(
    () => setPageNumber((prev) => Math.min(prev + 1, numPages || 1)),
    [numPages]
  );

  const handlePageInputSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newPage = parseInt(pageInput, 10);
      if (numPages && !isNaN(newPage) && newPage >= 1 && newPage <= numPages) {
        setPageNumber(newPage);
      } else {
        setPageInput(pageNumber.toString());
      }
    },
    [pageInput, numPages, pageNumber]
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

  return {
    // State values
    viewerRef,
    isLoading,
    isPdf,
    isEditable,
    isFullscreen,
    language,
    content: editedContent,
    hasChanges,
    // PDF props
    numPages,
    pageNumber,
    pageInput,
    scale,
    // Handlers
    onDocumentLoadSuccess,
    handleSave,
    handleContentChange,
    handlePageInputChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setPageInput(e.target.value),
    handlePageInputSubmit,
    goToPrevPage,
    goToNextPage,
    zoomIn,
    zoomOut,
    toggleFullscreen,
  };
};
