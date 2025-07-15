import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const getPagesToShow = () => {
    const pages = new Set<number>();
    pages.add(1);
    pages.add(totalPages);
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) pages.add(i);
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  const pages = getPagesToShow();

  return (
    <div className="flex items-center justify-center gap-2 mt-6 flex-shrink-0">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-500/30 bg-slate-400/10 text-slate-100 backdrop-blur-md transition-all hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-800/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1.5 rounded-md text-sm font-mono border backdrop-blur-md transition-all ${
            currentPage === page
              ? "bg-blue-500/30 border-blue-500 text-white shadow shadow-blue-800/20"
              : "bg-slate-400/10 border-slate-500/30 text-slate-300 hover:border-blue-500/40 hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      {pages[pages.length - 1] < totalPages - 1 && (
        <span className="px-2 text-slate-400 font-mono">...</span>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-500/30 bg-slate-400/10 text-slate-100 backdrop-blur-md transition-all hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-800/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
