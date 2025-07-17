// components/ui/filter_dropdown/FilterCustomDatePanel.tsx
"use client";

import { useState, useEffect } from "react";
import { Calendar } from "lucide-react";
import { CustomDateRange } from "@/types";
import React from "react"; // Explicitly import React

interface FilterCustomDatePanelProps {
  initialCustomDateRange: CustomDateRange; // Initial values from parent
  onApply: (range: CustomDateRange) => void;
  onClear: () => void;
  onCancel: () => void;
}

export default function FilterCustomDatePanel({
  initialCustomDateRange,
  onApply,
  onClear,
  onCancel,
}: FilterCustomDatePanelProps) {
  const [afterDateInput, setAfterDateInput] = useState<string>(
    initialCustomDateRange.after || ""
  );
  const [beforeDateInput, setBeforeDateInput] = useState<string>(
    initialCustomDateRange.before || ""
  );

  // Sync internal input states when initialCustomDateRange prop changes (e.g., parent clear/reset)
  useEffect(() => {
    setAfterDateInput(initialCustomDateRange.after || "");
    setBeforeDateInput(initialCustomDateRange.before || "");
  }, [initialCustomDateRange]);

  const handleClearClick = () => {
    setAfterDateInput("");
    setBeforeDateInput("");
    onClear(); // Notify parent to clear
  };

  const handleApplyClick = () => {
    onApply({ after: afterDateInput, before: beforeDateInput });
  };

  const handleCancelClick = () => {
    onCancel(); // Notify parent to cancel
  };

  return (
    <div className="p-4 text-slate-200">
      <h3 className="text-sm font-semibold mb-3">Custom date range</h3>
      <div className="mb-3">
        <label
          className="block text-xs font-medium text-slate-400 mb-1"
          htmlFor="afterDate"
        >
          After
        </label>
        <div className="relative">
          <input
            id="afterDate"
            type="date"
            value={afterDateInput}
            onChange={(e) => setAfterDateInput(e.target.value)}
            className="w-full p-2 pr-8 bg-slate-700 border border-slate-600 rounded text-sm focus:outline-none focus:border-blue-500 appearance-none"
          />
          <Calendar
            size={16}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block text-xs font-medium text-slate-400 mb-1"
          htmlFor="beforeDate"
        >
          Before
        </label>
        <div className="relative">
          <input
            id="beforeDate"
            type="date"
            value={beforeDateInput}
            onChange={(e) => setBeforeDateInput(e.target.value)}
            className="w-full p-2 pr-8 bg-slate-700 border border-slate-600 rounded text-sm focus:outline-none focus:border-blue-500 appearance-none"
          />
          <Calendar
            size={16}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center border-t border-slate-700 pt-3 mt-4 text-sm">
        <button
          onClick={handleClearClick}
          className="px-3 py-1 rounded text-blue-400 hover:bg-blue-900/40 transition-colors"
        >
          Clear all
        </button>
        <div className="flex gap-2">
          <button
            onClick={handleCancelClick}
            className="px-3 py-1 rounded hover:bg-slate-700/40 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyClick}
            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!afterDateInput && !beforeDateInput}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
