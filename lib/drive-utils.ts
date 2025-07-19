import { driveItems } from "@/lib/mock-data";
import { DriveItem } from "@/types";

// Define a type for our breadcrumb objects
export interface Breadcrumb {
  name: string;
  href: string;
}

/**
 * Finds a folder by its slug path and returns the folder and its breadcrumb trail.
 * @param slug - The URL slug array, e.g., ['folder-1', 'folder-2']
 * @returns An object containing the final folder found and the breadcrumbs array.
 */
export const findFolderAndGetBreadcrumbs = (
  slug: string[]
): { currentFolder: DriveItem | null; breadcrumbs: Breadcrumb[] } => {
  // Start with the root breadcrumb
  const breadcrumbs: Breadcrumb[] = [{ name: "My Drive", href: "/drive" }];
  
  let currentParentId: string | null = null;
  let currentFolder: DriveItem | null = null;
  let currentPath = "/drive";

  // Iterate through each part of the URL slug
  for (const segment of slug) {
    const folder = driveItems.find(
      (item) => item.id === segment && item.parentId === currentParentId
    );

    if (folder && folder.type === "Folders") {
      currentFolder = folder;
      currentParentId = folder.id;
      currentPath += `/${folder.id}`;
      breadcrumbs.push({ name: folder.name, href: currentPath });
    } else {
      // If any part of the path is invalid, return empty breadcrumbs to signal an error
      return { currentFolder: null, breadcrumbs: [] };
    }
  }

  return { currentFolder, breadcrumbs };
};

/**
 * Gets the contents of a specific folder.
 * @param folderId - The ID of the folder. If null, returns root items.
 * @returns An array of DriveItem within that folder.
 */
export const getFolderContents = (folderId: string | null): DriveItem[] => {
  if (folderId === null) {
    // Root of 'My Drive'
    return driveItems.filter((item) => item.parentId === null);
  }
  return driveItems.filter((item) => item.parentId === folderId);
};