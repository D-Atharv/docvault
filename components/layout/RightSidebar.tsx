import {
  Calendar,
  PenSquare,
  MessageSquare,
  Users,
  ChevronRight,
} from "lucide-react";

export default function RightSidebar() {
  const icons = [Calendar, PenSquare, MessageSquare, Users];

  return (
    <aside
      className="w-14 border-l border-slate-600/30 bg-slate-700/10 backdrop-blur-md shadow-xl flex flex-col items-center pt-6 gap-6 
        transition-all hover:border-blue-500/40 hover:shadow-4xl hover:shadow-blue-800/30 rounded-r-xl"
    >
      {icons.map((Icon, index) => (
        <button
          key={index}
          className="p-2 rounded-full hover:bg-blue-500/20 transition-colors"
        >
          <Icon className="h-5 w-5 text-slate-300" />
        </button>
      ))}

      <div className="flex-grow" />

      <button className="p-2 mb-4 hover:bg-blue-500/20 rounded-full transition-colors">
        <ChevronRight className="h-5 w-5 text-slate-300" />
      </button>
    </aside>
  );
}
