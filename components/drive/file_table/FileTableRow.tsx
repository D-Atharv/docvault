"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { DriveItem } from "@/types";
import { getFileIcon } from "@/lib/file_icon";
import { getFolderHref } from "@/lib/get_folder_href";
import { FileText, MoreVertical, UserCircle } from "lucide-react";

interface FileTableRowProps {
  item: DriveItem;
  onFileDoubleClick: (item: DriveItem) => void; // 👈 Add prop
}

export default function FileTableRow({ item ,onFileDoubleClick}: FileTableRowProps) {
  const Icon = getFileIcon(item.type) ?? FileText;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Dynamically build the nested href
  const clientHref = getFolderHref(pathname, item, searchParams);

  return (
    <tr
      className="border-b border-slate-500/20 hover:bg-slate-700/30 group transition"
      onDoubleClick={() => onFileDoubleClick(item)} // 👈 Add event handler
    >
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
