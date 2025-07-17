"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DriveItem, FileType } from "@/types";
import {
  Folder,
  FileText,
  FileSpreadsheet,
  FileBadge,
  FileVideo,
  Image as ImageIcon,
  FileArchive,
  Music,
  PencilRuler,
  LayoutList,
  Link as LinkIcon,
} from "lucide-react";

const getFileIcon = (type: FileType) => {
  switch (type) {
    case "Folders":
      return Folder;
    case "Documents":
      return FileText;
    case "Spreadsheets":
      return FileSpreadsheet;
    case "Presentations":
      return FileBadge;
    case "Videos":
      return FileVideo;
    case "Forms":
      return FileText;
    case "Photos & images":
      return ImageIcon;
    case "PDFs":
      return FileText;
    case "Archives (zip)":
      return FileArchive;
    case "Audio":
      return Music;
    case "Drawings":
      return PencilRuler;
    case "Sites":
      return LayoutList;
    case "Shortcuts":
      return LinkIcon;
    default:
      return FileText;
  }
};

interface FileCardProps {
  item: DriveItem;
  view: "grid" | "table";
}

export default function FileCard({ item }: FileCardProps) {
  const Icon = getFileIcon(item.type);
  const itemTypeDisplay =
    item.type === "Folders" ? "FOLDER" : item.type.toUpperCase();

  const [clientHref, setClientHref] = useState<string | null>(null);

  useEffect(() => {
    if (item.type === "Folders") {
      const params = new URLSearchParams(window.location.search);
      if (!params.get("view")) {
        params.set("view", "grid");
      }
      setClientHref(`/drive/${item.id}?${params.toString()}`);
    }
  }, [item]);

  const CardContent = (
    <div className="group rounded-xl border border-slate-500/30 bg-slate-400/10 backdrop-blur-md text-gray-100 shadow-md transition-all hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-800/30 h-full flex flex-col">
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
    // Prevent mismatch: render nothing until clientHref is ready
    return clientHref ? (
      <Link href={clientHref} className="no-underline">
        {CardContent}
      </Link>
    ) : null;
  }

  return CardContent;
}
