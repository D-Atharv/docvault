import { useMemo } from "react";
import Fuse from "fuse.js";
import { DriveItem } from "@/types";

// Configuration for Fuse.js
const fuseOptions = {
  // We want to search by file name, type, and owner
  keys: ["name", "type", "owner"],
  // A threshold of 0.4 is a good balance of strict and lenient matching
  threshold: 0.4,
  includeScore: true,
};

/**
 * A custom hook to perform fuzzy search on drive items.
 * @param items - The array of DriveItem objects to search through.
 * @param query - The search string from the user.
 * @returns An object containing the filtered items.
 */
export const useDriveSearch = (items: DriveItem[], query: string) => {
  // Memoize the Fuse instance for performance
  const fuse = useMemo(() => new Fuse(items, fuseOptions), [items]);

  // Memoize the search results
  const searchedItems = useMemo(() => {
    // If there's no query, return all items
    if (!query) {
      return items;
    }
    // Otherwise, perform the search and return the results
    return fuse.search(query).map((result) => result.item);
  }, [query, items, fuse]);

  return { searchedItems };
};
