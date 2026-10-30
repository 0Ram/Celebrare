import React from 'react';

/**
 * LoadingSpinner Component
 * Displays a modern circular loading spinner and skeleton placeholder grid
 * while the Picsum API request is pending.
 */
export function LoadingSpinner({ count = 8 }) {
  return (
    <div className="w-full py-12 flex flex-col items-center justify-center">
      {/* Central Spinner */}
      <div className="flex flex-col items-center gap-3 mb-12">
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin" />
        </div>
        <p className="text-sm font-medium text-slate-400 animate-pulse tracking-wide">
          Fetching photos from Picsum API...
        </p>
      </div>

      {/* Responsive Skeleton Grid matching the 4/2/1 column layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden bg-slate-900/60 border border-slate-800/80 animate-pulse shadow-sm"
          >
            {/* Image Placeholder */}
            <div className="w-full aspect-[4/3] bg-slate-800/60 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-700/20 to-transparent animate-shimmer" />
            </div>

            {/* Content Bar */}
            <div className="p-4 flex items-center justify-between">
              <div className="space-y-2 flex-1 mr-3">
                <div className="h-4 bg-slate-800 rounded-md w-3/4" />
                <div className="h-3 bg-slate-800/60 rounded-md w-1/3" />
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
