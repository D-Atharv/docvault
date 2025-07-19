// components/ui/file_table/FileTableHeader.tsx
import { ArrowUp, ArrowDown } from "lucide-react"; // Icons used in header

interface FileTableHeaderProps {
  children: React.ReactNode;
  onClick: () => void;
  sortDirection?: "asc" | "desc";
}

export default function FileTableHeader({
  children,
  onClick,
  sortDirection,
}: FileTableHeaderProps) {
  return (
    <th className="p-4 text-left font-medium text-sm text-slate-300 border-b border-slate-500/30 sticky top-0 bg-slate-400/10 backdrop-blur-md z-10">
      <button
        className="flex items-center gap-2 hover:text-blue-300 transition-colors"
        onClick={onClick}
      >
        {children}
        {sortDirection === "asc" && <ArrowUp size={16} />}
        {sortDirection === "desc" && <ArrowDown size={16} />}
      </button>
    </th>
  );
}
