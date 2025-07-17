import DriveContent from "@/components/drive/DriveContent";
import Header from "@/components/layout/Header";
import RightSidebar from "@/components/layout/RightSidebar";
import Sidebar from "@/components/layout/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <DriveContent />
        <RightSidebar />
      </div>
    </div>
  );
}
