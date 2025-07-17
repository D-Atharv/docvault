// components/ui/sidebar/SidebarActivityButton.tsx
import { LucideIcon } from "lucide-react";
import React from "react"; // Explicit import React

interface ActivityButtonProps {
  name: string;
  Icon: LucideIcon;
  isActive: boolean;
  onClick: (name: string) => void;
}

export default function ActivityButton({
  name,
  Icon,
  isActive,
  onClick,
}: ActivityButtonProps) {
  return (
    <button
      key={name}
      onClick={() => onClick(name)} // Pass the name back to the parent handler
      className={`relative flex items-center justify-center p-3 rounded-lg transition-colors duration-200 ${
        isActive
          ? "text-white"
          : "text-slate-400 hover:text-white hover:bg-slate-700/40"
      }`}
      aria-label={name}
    >
      {isActive && (
        <span className="absolute left-0 h-6 w-0.5 bg-sky-500 rounded-r-full"></span>
      )}
      <Icon size={24} strokeWidth={1.5} />
    </button>
  );
}
