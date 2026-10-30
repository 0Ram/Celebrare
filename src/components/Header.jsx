import React from 'react';

/**
 * Header Component
 * Displays brand logo/title, description, and favourites badge.
 */
export function Header({ totalPhotos = 0, favouritesCount = 0 }) {
  return (
    <header className="pt-10 pb-6 text-center max-w-4xl mx-auto">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4 tracking-wide uppercase">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Picsum Public API
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
        Photo{' '}
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
          Gallery
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed">
        Explore high-resolution photography, filter by author in real-time, and save your favourite
        shots with persistent storage.
      </p>

      {/* Stats summary bar */}
      <div className="inline-flex items-center gap-4 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 backdrop-blur-sm">
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">Total:</span>
          <span className="font-semibold text-white">{totalPhotos}</span>
        </div>
        <div className="w-1 h-1 rounded-full bg-slate-700" />
        <div className="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5 text-rose-500 fill-rose-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-slate-400">Favourites:</span>
          <span className="font-semibold text-rose-400">{favouritesCount}</span>
        </div>
      </div>
    </header>
  );
}
