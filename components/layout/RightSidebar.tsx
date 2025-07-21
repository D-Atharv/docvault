import {
  Calendar,
  PenSquare,
  MessageSquare,
  Users,
  ChevronRight,
} from "lucide-react";
import Tooltip from "./Tooltip";

type SidebarIcon = {
  Icon: React.ComponentType<{ className?: string }>;
  tooltip: string;
};

export default function RightSidebar() {
  const icons: SidebarIcon[] = [
    { Icon: Calendar, tooltip: "Calendar" },
    { Icon: PenSquare, tooltip: "Keep" },
    { Icon: MessageSquare, tooltip: "Tasks" },
    { Icon: Users, tooltip: "Contacts" },
  ];
  return (
    <aside
      className="w-14 border-l border-slate-600/30 bg-slate-700/10 backdrop-blur-md shadow-xl flex flex-col items-center pt-6 gap-6 
        transition-all hover:border-blue-500/40 hover:shadow-4xl hover:shadow-blue-800/30 rounded-r-xl"
    >
      {icons.map(({ Icon, tooltip }, index) => (
        <Tooltip key={index} text={tooltip} position="left">
          {" "}
          {/* 👈 Position updated */}
          <button className="p-2 rounded-full hover:bg-blue-500/20 transition-colors">
            <Icon className="h-5 w-5 text-slate-300" />
          </button>
        </Tooltip>
      ))}

      <div className="flex-grow" />

      <Tooltip text="Hide side panel" position="left">
        {" "}
        {/* 👈 Position updated */}
        <button className="p-2 mb-4 hover:bg-blue-500/20 rounded-full transition-colors">
          <ChevronRight className="h-5 w-5 text-slate-300" />
        </button>
      </Tooltip>
    </aside>
  );
}
