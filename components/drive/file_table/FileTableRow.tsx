"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { DriveItem, FileType } from "@/types";
import {
  Folder,
  FileText,
  UserCircle,
  MoreVertical,
  FileSpreadsheet,
  FileBadge,
  FileVideo,
  Image as ImageIcon,
  FileArchive,
  Music,
  PencilRuler,
  Link as LinkIcon,
  LayoutList,
} from "lucide-react";

const getTypeIconForTable = (type: FileType) => {
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

interface FileTableRowProps {
  item: DriveItem;
}

export default function FileTableRow({ item }: FileTableRowProps) {
  const Icon = getTypeIconForTable(item.type);

  const [clientHref, setClientHref] = useState<string | null>(null);

  useEffect(() => {
    if (item.type === "Folders") {
      const params = new URLSearchParams(window.location.search);
      if (!params.get("view")) params.set("view", "grid");
      setClientHref(`/drive/${item.id}?${params.toString()}`);
    }
  }, [item]);

  return (
    <tr className="border-b border-slate-500/20 hover:bg-slate-700/30 group transition">
      <td className="p-3 text-slate-100">
        {item.type === "Folders" && clientHref ? (
          <Link
            href={clientHref}
            className="flex items-center gap-3 hover:underline"
          >
            <Icon className="text-blue-300" />
            <span>{item.name}</span>
          </Link>
        ) : (
          <div className="flex items-center gap-3">
            <Icon className="text-slate-400" />
            <span>{item.name}</span>
          </div>
        )}
      </td>
      <td className="p-3 text-slate-300">{item.type}</td>
      <td className="p-3">
        <div className="flex items-center gap-2 text-slate-200">
          <UserCircle className="h-6 w-6 text-pink-400" />
          <span>{item.owner}</span>
        </div>
      </td>
      <td className="p-3 text-slate-400">{item.dateModified}</td>
      <td className="p-3 text-slate-400">{item.fileSize || "—"}</td>
      <td className="p-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <MoreVertical className="text-slate-400 cursor-pointer" />
      </td>
    </tr>
  );
}
