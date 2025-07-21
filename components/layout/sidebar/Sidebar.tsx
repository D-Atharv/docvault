"use client";

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
import ActivityButton from "./ActivityButton";
import ExplorerLink from "./ExplorerLink";

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

const usedStorage = 5.2;
const totalStorage = 15;
const usedPercentage = (usedStorage / totalStorage) * 100;

export default function Sidebar() {
  const [activeView, setActiveView] = useState("Explorer");

  const handleActivityButtonClick = (name: string) => {
    setActiveView(name);
  };

  return (
    <div className="flex h-screen bg-black text-gray-100 border-r-2 border-slate-800">
      {/* 1. Activity Bar */}
      <aside className="w-16 flex flex-col items-center justify-between py-4 bg-zinc-900/50">
        <div className="flex flex-col gap-3">
          {activityBarLinks.map((link) => (
            <ActivityButton
              key={link.name}
              name={link.name}
              Icon={link.icon}
              isActive={activeView === link.name}
              onClick={handleActivityButtonClick}
              tooltipPosition="right"
            />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <ActivityButton
            name="Manage Account"
            Icon={UserCircle}
            isActive={false}
            onClick={() => console.log("User Circle clicked")}
            tooltipPosition="right"
          />
          <ActivityButton
            name="Settings"
            Icon={Settings}
            isActive={false}
            onClick={() => console.log("Settings clicked")}
            tooltipPosition="right"
          />
        </div>
      </aside>

      {/* 2. Explorer Panel */}
      <aside className="w-64 flex flex-col p-3 bg-zinc-900/70 border-l border-slate-800">
        <h2 className="text-xs font-semibold uppercase tracking-wider px-2 pb-2 text-slate-400">
          {activeView}
        </h2>

        {activeView === "Explorer" && (
          <div className="flex flex-col h-full">
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
                      isActive={link.name === "My Drive"}
                    />
                  ))}
                </ul>
              </nav>
            </details>

            {/* Storage Usage Section - Placed at the bottom */}
            <div className="mt-auto px-2 pt-4 text-xs text-slate-400">
              <div className="mb-1 font-medium">
                {usedStorage.toFixed(1)} GB of {totalStorage} GB used
              </div>
              <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500"
                  style={{ width: `${usedPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}