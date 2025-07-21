"use client";

import { useState, useMemo, startTransition, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  HelpCircle,
  Settings,
  UserCircle,
  AppWindow,
} from "lucide-react";

import { useDebounce } from "use-debounce";
import Tooltip from "./Tooltip";
import ProfileCard from "../ProfileCard";

const ICONS = [
  { Icon: HelpCircle, label: "Help" },
  { Icon: Settings, label: "Settings" },
  { Icon: AppWindow, label: "Google apps" },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const [debouncedQuery] = useDebounce(searchValue.trim(), 300);

  // 🔄 Sync debounced query with URL (non-blocking)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedQuery) {
      params.set("q", debouncedQuery);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [debouncedQuery, pathname, searchParams, router]);

  const handleProfileToggle = () => setIsProfileCardOpen((prev) => !prev);

  const iconButtons = useMemo(
    () =>
      ICONS.map(({ Icon, label }) => (
        <Tooltip key={label} text={label} position="bottom">
          <button
            aria-label={label}
            className="p-2 rounded-full hover:bg-zinc-700 transition-colors"
          >
            <Icon className="h-6 w-6 text-zinc-300" />
          </button>
        </Tooltip>
      )),
    []
  );

  return (
    <header className="flex items-center justify-between p-2 md:pr-4 border-b border-zinc-800 bg-black backdrop-blur-sm shadow-md relative z-20">
      {/* Logo + Title */}
      <div className="flex items-center">
        <div className="p-2">
          <Image
            src="https://www.google.com/images/branding/product/2x/drive_2020q4_48dp.png"
            alt="Drive logo"
            width={40}
            height={40}
            className="h-8 w-8"
          />
        </div>
        <span className="text-2xl text-zinc-300 ml-2 hidden sm:block">
          QuillVault
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl mx-2 md:mx-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
          <input
            type="text"
            aria-label="Search files"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search in QuillVault"
            className="w-full bg-zinc-800 rounded-full py-2.5 pl-12 pr-12 text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
            <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5 cursor-pointer" />
        </div>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-1">
        <div className="hidden md:flex items-center gap-1">{iconButtons}</div>

        <Tooltip
          text="Google Account"
          position="left"
          disabled={isProfileCardOpen}
        >
          <button
            aria-label="Profile"
            onClick={handleProfileToggle}
            className="p-1 rounded-full relative hover:bg-zinc-700 transition-colors"
          >
            <UserCircle className="h-8 w-8 text-orange-400" />
          </button>
        </Tooltip>
      </div>

      {/* Profile dropdown */}
      {isProfileCardOpen && (
        <ProfileCard onClose={() => setIsProfileCardOpen(false)} />
      )}
    </header>
  );
}
