"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { DriveItem } from "@/types";
import { getFileIcon } from "@/lib/file_icon";
import { getFolderHref } from "@/lib/get_folder_href";
import { FileText } from "lucide-react";

interface FileCardProps {
  item: DriveItem;
  view: "grid" | "table";
  onFileDoubleClick: (item: DriveItem) => void; // 👈 Add prop
}

export default function FileCard({ item, onFileDoubleClick }: FileCardProps) {
  const Icon = getFileIcon(item.type) ?? FileText;
  const itemTypeDisplay =
    item.type === "Folders" ? "FOLDER" : item.type.toUpperCase();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Dynamically build the nested href
  const clientHref = getFolderHref(pathname, item, searchParams);

  const CardContent = (
    <div
      className="group rounded-xl border border-slate-500/30 bg-slate-400/10 backdrop-blur-md text-gray-100 shadow-md transition-all hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-800/30 h-full flex flex-col"
      onDoubleClick={() => onFileDoubleClick(item)} // 👈 Add event handler
    >
      <div className="p-4">
        <p className="font-mono text-sm text-slate-300">{itemTypeDisplay}</p>
      </div>
      <hr className="border-slate-500/30" />
      <div className="p-4 h-40 flex flex-col justify-between flex-grow">
        <h3 className="font-semibold text-lg flex items-start gap-2">
          <Icon className="text-blue-300 mt-1 flex-shrink-0" />
          {item.name}
        </h3>
        <div className="text-sm text-slate-300 font-mono space-y-1">
          <p>👤 {item.owner}</p>
          <p>📅 {item.dateModified}</p>
          {item.fileSize && <p>📁 {item.fileSize}</p>}
        </div>
      </div>
    </div>
  );

  if (item.type === "Folders") {
    return clientHref ? (
      <Link href={clientHref} className="no-underline">
        {CardContent}
      </Link>
    ) : null;
  }

  return CardContent;
}
