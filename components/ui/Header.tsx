"use client"; // Add this directive to enable state management

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  HelpCircle,
  Settings,
  UserCircle,
  AppWindow,
} from "lucide-react";
import ProfileCard from "./ProfileCard"; // Import the new component

export default function Header() {
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);

  return (
    <header
      className="flex items-center justify-between p-2 pl-6 pr-4 border-b border-zinc-800 bg-black  backdrop-blur-sm shadow-md
        transition-all hover:border-blue-500/40 hover:shadow-md hover:shadow-blue-800/30 rounded-r-xl relative z-20"
    >
      <div className="flex items-center">
        <img
          src="https://www.google.com/images/branding/product/2x/drive_2020q4_48dp.png"
          alt="Drive logo"
          className="h-10 w-10"
        />
        <span className="text-2xl text-zinc-300 ml-2">Drive</span>
      </div>
      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search in Drive"
            className="w-full bg-zinc-800 rounded-full py-3 pl-12 pr-12 text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5 cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-zinc-700 transition-colors">
          <HelpCircle className="h-6 w-6 text-zinc-300" />
        </button>
        <button className="p-2 rounded-full hover:bg-zinc-700 transition-colors">
          <Settings className="h-6 w-6 text-zinc-300" />
        </button>
        <button className="p-2 rounded-full hover:bg-zinc-700 transition-colors">
          <AppWindow className="h-6 w-6 text-zinc-300" />
        </button>
        <button
          onClick={() => setIsProfileCardOpen(!isProfileCardOpen)}
          className="p-1 rounded-full relative hover:bg-zinc-700 transition-colors"
        >
          <UserCircle className="h-8 w-8 text-orange-400" />
        </button>
      </div>

      {/* Conditionally render the ProfileCard */}
      {isProfileCardOpen && (
        <ProfileCard onClose={() => setIsProfileCardOpen(false)} />
      )}
    </header>
  );
}
