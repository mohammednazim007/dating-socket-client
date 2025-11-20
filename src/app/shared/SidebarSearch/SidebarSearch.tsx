"use client";

import { ChangeEvent, forwardRef, useImperativeHandle, useRef } from "react";
import { Search } from "lucide-react";

interface SidebarSearchProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SidebarSearchRef {
  focusInput: () => void;
}

const SidebarSearch = forwardRef<SidebarSearchRef, SidebarSearchProps>(
  ({ value, onChange }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Expose a focusInput function to parent
    useImperativeHandle(ref, () => ({
      focusInput: () => {
        inputRef.current?.focus();
      },
    }));

    return (
      <div className="p-3">
        <div className="relative border border-[#f4f4f463] rounded-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            type="text"
            placeholder="Search messages..."
            className="w-full bg-[#0C2B4E] border border-slate-800 text-slate-300 text-sm rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>
    );
  }
);

SidebarSearch.displayName = "SidebarSearch";
export default SidebarSearch;
