"use client";

import { DriveItem } from "@/types";
import FileGridView from "../file_grid/FileGridView";
import FileTable from "../file_table/FileTable";

type ViewType = "grid" | "table";

interface FileDisplayProps {
  view: ViewType;
  items: DriveItem[];
  onFileDoubleClick: (file: DriveItem) => void;
  sortConfig: { key: keyof DriveItem; direction: "asc" | "desc" };
  onSort: (key: keyof DriveItem) => void;
}

export default function FileDisplay({
  view,
  items,
  onFileDoubleClick,
  sortConfig,
  onSort,
}: FileDisplayProps) {
  return (
    <div className="flex-1 px-6 pt-0 overflow-y-auto scrollbar-custom">
      {view === "grid" ? (
        <FileGridView
          items={items}
          view={view}
          onFileDoubleClick={onFileDoubleClick}
        />
      ) : (
        <FileTable
          items={items}
          onSort={onSort}
          sortConfig={sortConfig}
          view={view}
          onFileDoubleClick={onFileDoubleClick}
        />
      )}
    </div>
  );
}
