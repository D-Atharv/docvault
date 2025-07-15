import { DriveItem } from "@/types/index";
import { Folder, FileText } from "lucide-react";

// Single card in the grid
const FileCard = ({ item }: { item: DriveItem }) => {
  const itemCode = item.type === "folder" ? "FOLDER" : "FILE";

  return (
    <div className="group cursor-pointer rounded-xl border border-slate-500/30 bg-slate-400/10 backdrop-blur-md text-gray-100 shadow-md transition-all hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-800/30">
      {/* Top section with item code */}
      <div className="p-4">
        <p className="font-mono text-sm text-slate-300">{itemCode}</p>
      </div>

      {/* Divider */}
      <hr className="border-slate-500/30" />

      {/* Name and tags section */}
      <div className="p-4 h-40 flex flex-col justify-between">
        <h3 className="font-semibold text-lg flex items-start gap-2">
          <span>
            {item.type === "folder" ? (
              <Folder className="text-blue-300 mt-1 flex-shrink-0" />
            ) : (
              <FileText className="text-blue-300 mt-1 flex-shrink-0" />
            )}
          </span>
          {item.name}
        </h3>
        <div className="flex gap-2">
          <span className="text-xs font-semibold bg-blue-500/70 text-white px-3 py-1 rounded backdrop-blur">
            A
          </span>
          <span className="text-xs font-semibold bg-purple-500/70 text-white px-3 py-1 rounded backdrop-blur">
            B
          </span>
        </div>
      </div>
    </div>
  );
};

// Grid wrapper
type FileGridViewProps = {
  items: DriveItem[];
};

export default function FileGridView({ items }: FileGridViewProps) {
  return (
    <div className="mt-6 grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
      {items.map((item) => (
        <FileCard key={item.id} item={item} />
      ))}
    </div>
  );
}
