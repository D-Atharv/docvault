// lib/get_folder_href.ts

import { DriveItem } from "@/types";
import { ReadonlyURLSearchParams } from "next/navigation";

export type ViewParam = "grid" | "table";

/**
 * Generates a URL to the folder by appending the folder ID to the current pathname
 * and preserving the view query param.
 */
export const getFolderHref = (
  pathname: string,
  item: DriveItem,
  searchParams: ReadonlyURLSearchParams
): string | null => {
  if (item.type !== "Folders") return null;

  const params = new URLSearchParams(searchParams.toString());
  const currentView = (params.get("view") as ViewParam) ?? "grid";
  params.set("view", currentView);

  return `${pathname}/${item.id}?${params.toString()}`;
};
