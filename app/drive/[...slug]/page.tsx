// app/drive/[...slug]/page.tsx
import DriveContent from "@/components/drive/DriveContent";
import Header from "@/components/layout/Header";
import RightSidebar from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { driveItems } from "@/lib/mock-data";
import { DriveItem } from "@/types";

// Helper function to find items belonging to a specific folder
const getFolderContents = (folderId: string | null): DriveItem[] => {
  if (folderId === null) {
    // Return root items
    return driveItems.filter((item) => item.parentId === null);
  }
  return driveItems.filter((item) => item.parentId === folderId);
};

interface PageProps {
  searchParams?: {
    view?: string;
  };
  params: {
    slug: string[];
  };
}

// 1. Make the component an async function
export default async function FolderPage({ searchParams, params }: PageProps) {
  // 2. Await both props to get the resolved values
  // Using Promise.all is an efficient way to resolve multiple promises
  const [resolvedSearchParams, resolvedParams] = await Promise.all([
    searchParams,
    params,
  ]);

  // 3. Use the resolved values
  const viewParam = resolvedSearchParams?.view === "table" ? "table" : "grid";
  const folderId = resolvedParams.slug?.[0] || null;

  // You can now use your existing logic with the resolved folderId
  const folderContents = getFolderContents(folderId);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <DriveContent initialItems={folderContents} initialView={viewParam} />
        <RightSidebar />
      </div>
    </div>
  );
}
