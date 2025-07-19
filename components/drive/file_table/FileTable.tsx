import { DriveItem } from "@/types";
import FileTableHeader from "./FileTableHeader";
import FileTableRow from "./FileTableRow";

// MODIFIED: The props interface now accepts `view`
interface FileTableProps {
  items: DriveItem[];
  onSort: (key: keyof DriveItem) => void;
  sortConfig: { key: keyof DriveItem; direction: "asc" | "desc" };
  view: "grid" | "table";
}

export default function FileTable({
  items,
  onSort,
  sortConfig,
}: FileTableProps) {
  const getSortDirection = (key: keyof DriveItem) =>
    sortConfig.key === key ? sortConfig.direction : undefined;

  return (
    <div className="rounded-xl border border-slate-500/30 bg-slate-400/5 backdrop-blur-sm shadow-md overflow-x-auto transition-all hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-800/30 ">
      <table className="w-full text-sm text-slate-100">
        <thead>
          <tr>
            <FileTableHeader
              onClick={() => onSort("name")}
              sortDirection={getSortDirection("name")}
            >
              Name
            </FileTableHeader>
            <FileTableHeader
              onClick={() => onSort("type")}
              sortDirection={getSortDirection("type")}
            >
              Type
            </FileTableHeader>
            <FileTableHeader
              onClick={() => onSort("owner")}
              sortDirection={getSortDirection("owner")}
            >
              Owner
            </FileTableHeader>
            <FileTableHeader
              onClick={() => onSort("dateModified")}
              sortDirection={getSortDirection("dateModified")}
            >
              Date Modified
            </FileTableHeader>
            <FileTableHeader
              onClick={() => onSort("fileSize")}
              sortDirection={getSortDirection("fileSize")}
            >
              File Size
            </FileTableHeader>
            <th className="p-2 border-b border-slate-500/30 sticky top-0 bg-slate-400/10 backdrop-blur-md z-10 w-12"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            // MODIFIED: Pass the view prop down to each row
            <FileTableRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
