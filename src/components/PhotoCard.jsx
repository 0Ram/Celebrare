import React, { useState, memo } from 'react';
import { getOptimizedImageUrl } from '../utils/imageUtils';

/**
 * PhotoCard Component
 *
 * Displays an individual photo with:
 * 1. The image (optimized dimensions for rapid loading, smooth fade-in)
 * 2. Author attribution
 * 3. Heart icon button for toggling favourite status
 *
 * Wrapped in React.memo to prevent unnecessary re-renders of unaffected cards
 * when favourites or sibling cards change.
 */
function PhotoCardComponent({ photo, isFavourite, onToggleFavourite }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const imageUrl = getOptimizedImageUrl(photo, 600, 420);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    onToggleFavourite(photo.id);
  };

  return (
    <article className="group relative flex flex-col rounded-2xl overflow-hidden bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      {/* Photo Container */}
      <div className="relative w-full aspect-[4/3] bg-slate-950 overflow-hidden">
        {/* Placeholder shimmer while image is loading */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-slate-800/60 animate-pulse flex items-center justify-center">
            <svg
              className="w-8 h-8 text-slate-700 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
        )}

        {/* Fallback if image fails */}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-500 p-4 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 mb-2 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs">Image unavailable</span>
          </div>
        ) : (
          <img
            src={imageUrl}
            alt={`Photo by ${photo.author || 'Unknown'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Floating Heart Button on Top Right of Photo */}
        <button
          type="button"
          onClick={handleHeartClick}
          aria-label={isFavourite ? `Remove ${photo.author} from favourites` : `Add ${photo.author} to favourites`}
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-md ${
            isFavourite
              ? 'bg-rose-500/90 text-white shadow-rose-500/30 scale-105 hover:bg-rose-600'
              : 'bg-black/40 text-white/80 hover:text-white hover:bg-black/60 hover:scale-110 active:scale-95'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 transition-transform active:scale-125"
            viewBox="0 0 24 24"
            fill={isFavourite ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={isFavourite ? '0' : '2'}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Card Footer: Author Attribution */}
      <div className="p-4 flex items-center justify-between gap-3 bg-slate-900/90">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-inner">
            {photo.author ? photo.author.charAt(0).toUpperCase() : 'P'}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 font-medium tracking-wider uppercase">Author</p>
            <p
              className="text-sm font-semibold text-slate-100 truncate group-hover:text-indigo-300 transition-colors"
              title={photo.author}
            >
              {photo.author || 'Unknown Artist'}
            </p>
          </div>
        </div>

        {/* Small badge showing image id */}
        <span className="text-[11px] font-mono text-slate-500 px-2 py-0.5 rounded bg-slate-800/80 shrink-0">
          #{photo.id}
        </span>
      </div>
    </article>
  );
}

export const PhotoCard = memo(PhotoCardComponent);
