import React from 'react';
import { Search } from 'lucide-react';
import { cn } from './StatCard'; // assuming we put cn in a shared place or just define locally

export function SearchInput({ placeholder = "Search...", className, ...props }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-muted-foreground" />
      </div>
      <input
        type="search"
        className="block w-full pl-10 pr-3 py-2 border border-border rounded-md leading-5 bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring sm:text-sm transition-colors"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
