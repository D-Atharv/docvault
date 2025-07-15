import { ChevronDown } from "lucide-react";

export default function FilterPill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button className="flex items-center gap-2 px-4 py-1.5 bg-zinc-700/80 rounded-full hover:bg-zinc-600 text-sm text-zinc-200">
      {children}
      <ChevronDown size={16} className="text-zinc-400" />
    </button>
  );
}
