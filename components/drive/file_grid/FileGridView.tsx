import React from "react";
import { DriveItem } from "@/types";
import FileCard from "./FileCard";

// MODIFIED: The props interface now accepts `view`
interface FileGridViewProps {
  items: DriveItem[];
  view: "grid" | "table";
  onFileDoubleClick: (item: DriveItem) => void; // 👈 Add prop
}

export default function FileGridView({ items, view,onFileDoubleClick }: FileGridViewProps) {
  return (
    <div className="mt-6 grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
      {items.map((item) => (
        // MODIFIED: Pass the view prop down to each card
        <FileCard
          key={item.id}
          item={item}
          view={view}
          onFileDoubleClick={() => onFileDoubleClick(item)}
        />
      ))}
    </div>
  );
}
