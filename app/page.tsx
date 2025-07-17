import DriveContent from "@/components/ui/DriveContent";
import Header from "@/components/ui/Header";
import RightSidebar from "@/components/ui/RightSidebar";
import Sidebar from "@/components/ui/sidebar/Sidebar";

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
