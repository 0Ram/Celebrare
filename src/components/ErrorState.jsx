import React from 'react';

/**
 * ErrorState Component
 * Rendered when the API request encounters an issue.
 * Provides clear diagnostic text and a retry trigger.
 */
export function ErrorState({ message, onRetry }) {
  return (
    <div className="w-full max-w-lg mx-auto my-16 p-8 rounded-2xl bg-slate-900/90 border border-rose-500/30 text-center shadow-xl shadow-rose-950/20 backdrop-blur-md">
      {/* Error Icon */}
      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">Failed to Load Photos</h3>
      <p className="text-sm text-slate-400 mb-6 leading-relaxed">
        {message || 'Could not fetch data from the Picsum Photos API. Please check your network connection and try again.'}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-medium text-sm transition-all shadow-md shadow-rose-900/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Retry Connection
        </button>
      )}
    </div>
  );
}
