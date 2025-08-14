import DriveContent from "@/components/drive/drive_content/DriveContent";
import Header from "@/components/layout/Header";
import RightSidebar from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import MobileOnlyPlaceholder from "@/components/ui/MobileOnlyView";
import {
  findFolderAndGetBreadcrumbs,
  getFolderContents,
} from "@/lib/drive-utils";
import { notFound } from "next/navigation";

export default async function FolderPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams?: Promise<{ view?: string }>;
}) {
  // Await both promises to get the resolved values
  const [resolvedParams, resolvedSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);

  // Use the resolved values
  const slug = resolvedParams.slug || [];
  const viewParam = resolvedSearchParams?.view === "table" ? "table" : "grid";

  // Find the current folder and generate breadcrumbs from the full slug
  const { currentFolder, breadcrumbs } = findFolderAndGetBreadcrumbs(slug);

  // If the path is invalid, show a 404 page
  if (breadcrumbs.length === 0 && slug.length > 0) {
    // Check slug length to allow root drive
    notFound();
  }

  // The ID of the current folder is the ID of the last item found
  const currentFolderId = currentFolder?.id ?? null;

  // Get the contents of this specific folder
  const folderContents = getFolderContents(currentFolderId);

  return (
    <>
      {/* Mobile view */}
      <div className="flex lg:hidden h-screen overflow-hidden w-screen">
        <MobileOnlyPlaceholder />
      </div>

      {/* Desktop view */}
      <div className="hidden lg:flex flex-col h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <DriveContent
            initialItems={folderContents}
            initialView={viewParam}
            breadcrumbs={breadcrumbs}
          />
          <RightSidebar />
        </div>
      </div>
    </>
  );
}
