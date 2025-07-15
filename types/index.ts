import { LucideIcon } from "lucide-react";

export type DriveItem = {
  id: string;
  name: string;
  type: "folder" | "file";
  owner: string;
  dateModified: string;
  fileSize?: string; // Optional, as folders don't have a size
};

export type SidebarLink = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export type Account = {
  name: string;
  email: string;
  avatar: string; // Could be a URL or an initial
};
