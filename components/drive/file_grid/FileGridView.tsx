// components/ui/FileGridView.tsx
"use client"; // IMPORTANT: FileGridView must be a Client Component

import React from "react"; // Explicitly import React
import { DriveItem } from "@/types"; // Only DriveItem type needed here
import FileCard from "./FileCard";

interface FileGridViewProps {
  items: DriveItem[];
  // If FileCard had an onClick, you might pass it down here:
  // onCardClick?: (item: DriveItem) => void;
}

export default function FileGridView({ items }: FileGridViewProps) {
  // Removed onCardClick for now
  return (
    <div className="mt-6 grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
      {items.map((item) => (
        <FileCard
          key={item.id}
          item={item}
          // If FileCard had an onClick, you'd pass it here:
          // onClick={onCardClick}
        />
      ))}
    </div>
  );
}
