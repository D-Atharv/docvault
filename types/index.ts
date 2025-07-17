import { LucideIcon } from "lucide-react";

export type FileType =
  | "All"
  | "Folders"
  | "Documents"
  | "Spreadsheets"
  | "Presentations"
  | "Vids"
  | "Forms"
  | "Photos & images"
  | "PDFs"
  | "Videos"
  | "Archives (zip)"
  | "Audio"
  | "Drawings"
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

// New type to categorize the filter
export type FilterCategory = "Type" | "Modified" | "People"; // 'People' is also a potential category

// Existing DriveItem definition (copy from previous response)
export type DriveItem = {
  id: string;
  name: string;
  type: FileType;
  owner: string;
  dateModified: string;
  fileSize?: string;
};

// Existing SidebarLink and Account definitions (copy from previous response)
export type SidebarLink = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export type Account = {
  name: string;
  email: string;
  avatar: string;
};