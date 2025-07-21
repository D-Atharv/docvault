"use client";

import { List, LayoutGrid, Info } from "lucide-react";
import { Breadcrumb } from "@/lib/drive-utils";
import Breadcrumbs from "../../layout/BreadCrumbs";
import Tooltip from "../../layout/Tooltip";

type ViewType = "grid" | "table";

interface DriveContentHeaderProps {
  breadcrumbs: Breadcrumb[];
  view: ViewType;
  updateView: (view: ViewType) => void;
}

export default function DriveContentHeader({
  breadcrumbs,
  view,
  updateView,
}: DriveContentHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-4 border-b border-slate-600">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div className="flex items-center gap-2 self-end sm:self-center">
        <div className="flex items-center p-1 bg-slate-400/5 backdrop-blur-md border border-slate-500/20 rounded-lg">
          {(["table", "grid"] as ViewType[]).map((v) => {
            const Icon = v === "table" ? List : LayoutGrid;
            return (
              <Tooltip
                key={v}
                text={`${v.charAt(0).toUpperCase() + v.slice(1)} View`}
                position="bottom"
              >
                <button
                  onClick={() => updateView(v)}
                  className={`p-1.5 rounded-md transition-all ${
                    view === v
                      ? "bg-blue-500/60 text-white shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                </button>
              </Tooltip>
            );
          })}
        </div>
        <Tooltip text="Details" position="bottom">
          <button className="p-2 rounded-full text-slate-300 hover:bg-slate-700/40">
            <Info size={20} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
