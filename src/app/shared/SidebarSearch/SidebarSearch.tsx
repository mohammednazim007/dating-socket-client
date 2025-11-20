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

    useImperativeHandle(ref, () => ({
      focusInput: () => {
        inputRef.current?.focus();
      },
    }));

    return (
      <div className="px-2 pb-2 mt-2">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors duration-200" />
          </div>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            type="text"
            placeholder="Search..."
            className="block w-full bg-slate-900/50 border border-slate-800 text-slate-200 text-sm rounded-xl pl-10 pr-12 py-2.5 
            placeholder:text-slate-600
            focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 focus:bg-slate-900
            transition-all duration-200 ease-in-out shadow-sm"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="inline-flex items-center h-5 border border-slate-700 rounded px-1.5 text-[10px] font-medium text-slate-500 bg-slate-800/50 font-sans">
              <span className="text-xs mr-0.5">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>
    );
  }
);

SidebarSearch.displayName = "SidebarSearch";
export default SidebarSearch;
