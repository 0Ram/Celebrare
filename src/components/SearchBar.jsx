import React, { memo } from 'react';

/**
 * SearchBar Component
 *
 * Controlled search input filtering photos by author name in real-time.
 * Wrapped in React.memo so it only re-renders when its own props (value, counts) change,
 * taking full advantage of the `useCallback` handler passed from the parent.
 */
function SearchBarComponent({
  value,
  onChange,
  onClear,
  totalCount = 0,
  filteredCount = 0,
}) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="relative flex items-center group">
        {/* Search Icon */}
        <div className="absolute left-4 pointer-events-none text-slate-400 group-focus-within:text-indigo-400 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Input Field */}
        <input
          id="author-search-input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Filter photos by author name (e.g. Ram Charan, Sai, Mahesh)..."
          className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-lg shadow-black/20 backdrop-blur-md"
          autoComplete="off"
        />

        {/* Clear Button and Match Counter */}
        <div className="absolute right-3.5 flex items-center gap-2">
          {value && (
            <button
              type="button"
              onClick={onClear}
              aria-label="Clear search"
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Result Count Badge */}
          <span className="text-xs font-medium px-2 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-400">
            {filteredCount} / {totalCount}
          </span>
        </div>
      </div>
    </div>
  );
}

export const SearchBar = memo(SearchBarComponent);
