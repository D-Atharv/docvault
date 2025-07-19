// lib/get_folder_href.ts

import { DriveItem } from "@/types";
import { ReadonlyURLSearchParams } from "next/navigation";

export type ViewParam = "grid" | "table";

export const getFolderHref = (
  item: DriveItem,
  searchParams: ReadonlyURLSearchParams
): string | null => {
  if (item.type !== "Folders") return null;

  const params = new URLSearchParams(searchParams.toString());
  const currentView = (params.get("view") as ViewParam) ?? "grid";
  params.set("view", currentView);

  return `/drive/${item.id}?${params.toString()}`;
};
