// app/page.tsx
import DriveContent from "@/components/drive/DriveContent";
import Header from "@/components/layout/Header";
import RightSidebar from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { driveItems } from "@/lib/mock-data";
import { DriveItem } from "@/types";
import { redirect } from "next/navigation";

const getRootItems = (): DriveItem[] => {
  return driveItems.filter((item) => item.parentId === null);
};

// 1. Make the component an async function
export default async function Home({
  searchParams,
}: {
  searchParams: { view?: string };
}) {
  // 2. Await the searchParams to get the resolved object
  const resolvedSearchParams = await searchParams;
  const rootItems = getRootItems();

  // 3. Use the resolved values
  const viewParam = resolvedSearchParams.view;
  const view = viewParam === "table" || viewParam === "grid" ? viewParam : null;

  // Redirect to default if not set (optional)
  if (!view) {
    redirect("/?view=grid");
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <DriveContent initialItems={rootItems} initialView={view} />
        <RightSidebar />
      </div>
    </div>
  );
}