import React from "react";

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  position?: "top" | "bottom" | "left" | "right";
  disabled?: boolean; // ✨ New disabled prop
}

export default function Tooltip({
  children,
  text,
  position = "top",
  disabled = false, // Default to false
}: TooltipProps) {
  // If the tooltip is disabled, just render the children without any wrapper
  if (disabled) {
    return <>{children}</>;
  }

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2 origin-bottom",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2 origin-top",
    left: "right-full top-1/2 -translate-y-1/2 mr-2 origin-right",
    right: "left-full top-1/2 -translate-y-1/2 ml-2 origin-left",
  };

  return (
    <div className="relative group flex items-center">
      {children}
      <div
        className={`absolute w-max px-3 py-1.5 bg-zinc-800 text-white text-xs font-semibold rounded-md shadow-lg
                   scale-0 group-hover:scale-100 transition-all duration-200 pointer-events-none
                   ${positionClasses[position]}`}
      >
        {text}
      </div>
    </div>
  );
}
