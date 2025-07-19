// components/ui/Sidebar.tsx
"use client"; // Remains a Client Component due to useState and direct interaction

import { useState } from "react";
import {
  Home,
  HardDrive,
  Files,
  Search,
  GitBranch,
  PlayCircle,
  Puzzle,
  UserCircle,
  Settings,
  ChevronDown,
  LucideIcon,
} from "lucide-react";

// Import the new modular components
import ActivityButton from "./ActivityButton";
import ExplorerLink from "./ExplorerLink";

// Define these arrays outside the component if they are truly static and don't depend on props/state
// This is a minor optimization, but good practice for static data.
const activityBarLinks = [
  { name: "Explorer", icon: Files },
  { name: "Search", icon: Search },
  { name: "Source Control", icon: GitBranch },
  { name: "Run and Debug", icon: PlayCircle },
  { name: "Extensions", icon: Puzzle },
];

type SidebarLink = {
  name: string;
  href: string;
  icon: LucideIcon;
};

const explorerLinks: SidebarLink[] = [
  { name: "Home", href: "#", icon: Home },
  { name: "My Drive", href: "#", icon: HardDrive },
];

const usedStorage = 5.2; // in GB
const totalStorage = 15; // in GB
const usedPercentage = (usedStorage / totalStorage) * 100;

export default function Sidebar() {
  const [activeView, setActiveView] = useState("Explorer");

  const handleActivityButtonClick = (name: string) => {
    setActiveView(name);
  };

  return (
    <div className="flex h-screen bg-black text-gray-100 border-r-2 border-slate-500/50">
      {/* 1. Activity Bar */}
      <aside
        className="w-14 flex flex-col items-center justify-between py-2
        border border-slate-500/30 bg-slate-400/10 backdrop-blur-xl shadow-md
        transition-all hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-800/30 rounded-r-xl"
      >
        <div className="flex flex-col gap-2">
          {activityBarLinks.map((link) => (
            <ActivityButton
              key={link.name}
              name={link.name}
              Icon={link.icon}
              isActive={activeView === link.name}
              onClick={handleActivityButtonClick}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {/* These can also use SidebarActivityButton if their click logic is similar */}
          <ActivityButton
            name="User"
            Icon={UserCircle}
            isActive={false} // Adjust if this button can be "active"
            onClick={() => console.log("User Circle clicked")}
          />
          <ActivityButton
            name="Settings"
            Icon={Settings}
            isActive={false} // Adjust if this button can be "active"
            onClick={() => console.log("Settings clicked")}
          />
        </div>
      </aside>

      {/* 2. Explorer Panel */}
      <aside
        className="w-64 hidden md:flex md:flex-col p-3
        border-l border-slate-500/30 bg-slate-400/10 backdrop-blur-md shadow-md
        transition-all hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-800/30 rounded-l-xl"
      >
        <h2 className="text-xs font-semibold uppercase tracking-wider px-2 pb-2 text-slate-400">
          {activeView}
        </h2>

        {activeView === "Explorer" && (
          <details open className="group">
            <summary className="flex items-center gap-2 px-2 py-1.5 cursor-pointer text-xs font-bold uppercase list-none hover:bg-slate-700/30 rounded-md">
              <ChevronDown className="h-4 w-4 transition-transform duration-200 group-open:rotate-0 -rotate-90" />
              DOCSTORE
            </summary>
            <nav className="mt-1">
              <ul>
                {explorerLinks.map((link) => (
                  <ExplorerLink
                    key={link.name}
                    name={link.name}
                    href={link.href}
                    Icon={link.icon}
                    isActive={link.name === "My Drive"} // Example: 'My Drive' is active by default
                  />
                ))}
              </ul>
            </nav>
            {/* Storage Usage Section */}
            <div className="mt-auto px-2 pt-4 text-xs text-slate-400">
              <div className="mb-1 font-medium">
                {usedStorage.toFixed(1)} GB of {totalStorage} GB used
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-md overflow-hidden">
                <div
                  className="h-full bg-sky-600 transition-all duration-300"
                  style={{ width: `${usedPercentage}%` }}
                ></div>
              </div>
            </div>
          </details>
        )}
      </aside>
    </div>
  );
}
