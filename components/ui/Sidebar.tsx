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
} from "lucide-react";
import { SidebarLink } from "@/types";

const activityBarLinks = [
  { name: "Explorer", icon: Files },
  { name: "Search", icon: Search },
  { name: "Source Control", icon: GitBranch },
  { name: "Run and Debug", icon: PlayCircle },
  { name: "Extensions", icon: Puzzle },
];

const explorerLinks: SidebarLink[] = [
  { name: "Home", href: "#", icon: Home },
  { name: "My Drive", href: "#", icon: HardDrive },
];

export default function Sidebar() {
  const [activeView, setActiveView] = useState("Explorer");

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
            <button
              key={link.name}
              onClick={() => setActiveView(link.name)}
              className={`relative flex items-center justify-center p-3 rounded-lg transition-colors duration-200 ${
                activeView === link.name
                  ? "text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-700/40"
              }`}
              aria-label={link.name}
            >
              {activeView === link.name && (
                <span className="absolute left-0 h-6 w-0.5 bg-sky-500 rounded-r-full"></span>
              )}
              <link.icon size={24} strokeWidth={1.5} />
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <button className="p-3 text-slate-400 hover:text-blue-300 transition-colors duration-200">
            <UserCircle size={24} strokeWidth={1.5} />
          </button>
          <button className="p-3 text-slate-400 hover:text-blue-300 transition-colors duration-200">
            <Settings size={24} strokeWidth={1.5} />
          </button>
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
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`flex items-center gap-2 w-full px-2 py-2 rounded-md text-sm transition-colors duration-200 ${
                        link.name === "My Drive"
                          ? "bg-sky-600/30 text-white"
                          : "text-slate-300 hover:bg-slate-700/40 hover:text-white"
                      }`}
                    >
                      <link.icon size={16} strokeWidth={1.5} />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        )}
      </aside>
    </div>
  );
}
