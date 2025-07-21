// components/ui/sidebar/SidebarActivityButton.tsx
import { LucideIcon } from "lucide-react";
import React from "react"; // Explicit import React
import Tooltip from "../Tooltip";


interface ActivityButtonProps {
  name: string;
  Icon: LucideIcon;
  isActive: boolean;
  onClick: (name: string) => void;
  tooltipPosition?: "top" | "bottom" | "left" | "right"; // ✨ Add position prop
}

export default function ActivityButton({
  name,
  Icon,
  isActive,
  onClick,
  tooltipPosition = "right", // Sensible default for this component
}: ActivityButtonProps) {
  return (
    <Tooltip text={name} position={tooltipPosition}>
      {" "}
      {/* 👈 Use the prop */}
      <button
        onClick={() => onClick(name)}
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
    </Tooltip>
  );
}
