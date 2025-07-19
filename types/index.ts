// types/index.ts

// Define the types for file filtering
export type FileType =
  | "All"
  | "Folders"
  | "Documents"
  | "Spreadsheets"
  | "xlsx"
  | "Presentations"
  | "Forms"
  | "Photos & images"
  | "PDFs"
  | "Vids"
  | "Videos"
  | "Audio"
  | "Drawings"
  | "Archives (zip)"
  | "Sites"
  | "Shortcuts";

export type ModifiedFilterType =
  | "Any time"
  | "Today"
  | "Last 7 days"
  | "Last 30 days"
  | "This year (2025)"
  | "Last year (2024)"
  | "Custom date range";

// Define the type for filter categories
export type FilterCategory = "Type" | "Modified" | "People";

// Define the structure for a custom date range
export interface CustomDateRange {
  after: string | null;
  before: string | null;
}

// Define the main structure for a drive item
export interface DriveItem {
  id: string;
  name: string;
  type: FileType;
  owner: string;
  dateModified: string;
  fileSize?: string;
  parentId: string | null; // <-- NEW: To establish folder hierarchy
}

export type Account = {
  name: string;
  email: string;
  avatar: string;
};