// components/ui/sidebar/SidebarExplorerLink.tsx

import Link from "next/link"; // Use next/link for client-side navigation
import { LucideIcon } from "lucide-react";
import React from "react"; // Explicit import React

interface ExplorerLinkProps {
  name: string;
  href: string;
  Icon: LucideIcon;
  isActive: boolean; // To highlight the active link
}

export default function ExplorerLink({
  name,
  href,
  Icon,
  isActive,
}: ExplorerLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-2 w-full px-2 py-2 rounded-md text-sm transition-colors duration-200 ${
          isActive
            ? "bg-sky-600/30 text-white"
            : "text-slate-300 hover:bg-slate-700/40 hover:text-white"
        }`}
      >
        <Icon size={16} strokeWidth={1.5} />
        {name}
      </Link>
    </li>
  );
}
