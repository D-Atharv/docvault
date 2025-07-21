import DriveContent from "@/components/drive/DriveContent";
import Header from "@/components/layout/Header";
import RightSidebar from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { getFolderContents } from "@/lib/drive-utils";
import { Breadcrumb } from "@/lib/drive-utils";


export default async function RootDrivePage({
  searchParams,
}: {
  searchParams?: Promise<{ view?: string }>;
}) {
  // Await the searchParams promise to get the resolved object
  const resolvedSearchParams = await searchParams;

  // Use the resolved object to access its properties
  const viewParam = resolvedSearchParams?.view === "table" ? "table" : "grid";

  // Get items at the root (parentId is null)
  const rootItems = getFolderContents(null);

  // The breadcrumbs must now point to /drive as the base
  const breadcrumbs: Breadcrumb[] = [{ name: "My Drive", href: "/drive" }];

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <DriveContent
          initialItems={rootItems}
          initialView={viewParam}
          breadcrumbs={breadcrumbs}
        />
        <RightSidebar />
      </div>
    </div>
  );
}
