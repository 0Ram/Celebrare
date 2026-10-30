import React, { useState, useReducer, useEffect, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import {
  favouritesReducer,
  FAVOURITES_ACTIONS,
  FAVOURITES_STORAGE_KEY,
  getInitialFavourites,
} from '../reducers/favouritesReducer';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { PhotoCard } from './PhotoCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorState } from './ErrorState';

/**
 * Gallery Component
 *
 * Core component satisfying all 7 requirements:
 * 1. Project setup: React + Vite + Tailwind CSS.
 * 2. Fetch photos: Picsum API via useFetchPhotos custom hook with loading & error states.
 * 3. Responsive grid: Desktop 4 cols (lg:grid-cols-4), Tablet 2 cols (md:grid-cols-2), Mobile 1 col.
 * 4. Search filter: Real-time filtering by author name without re-fetching or page reload.
 * 5. Favourites with useReducer: Managed via useReducer and persisted to localStorage.
 * 6. Custom hook: useFetchPhotos returns photos, loading, error.
 * 7. useCallback + useMemo:
 *    - useCallback on handleSearchChange prevents SearchBar from re-rendering on parent updates.
 *    - useMemo computes filteredPhotos so expensive .filter() is skipped if photos/searchTerm didn't change.
 */
export function Gallery() {
  // Requirement 6: Custom Hook for API data fetching
  const { photos, loading, error, refetch } = useFetchPhotos();

  // Search input state
  const [searchTerm, setSearchTerm] = useState('');

  // Optional view filter: 'all' vs 'favourites' (bonus UX convenience within scope)
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);

  // Requirement 5: useReducer for favourites state with lazy localStorage initialization
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    getInitialFavourites
  );

  // Requirement 5: Persist favourites to localStorage whenever the favourites state changes
  useEffect(() => {
    try {
      localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(favourites));
    } catch (err) {
      console.error('Failed to save favourites to localStorage:', err);
    }
  }, [favourites]);

  /**
   * Requirement 7: useCallback on the search filter handler.
   *
   * WHY useCallback IS USED HERE:
   * 1. Preserves function reference identity across component re-renders.
   * 2. Since SearchBar is memoized with React.memo, passing a stable handleSearchChange
   *    reference prevents SearchBar from re-rendering when other state changes (such as
   *    clicking the heart icon to toggle a favourite).
   */
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  /**
   * Memoized toggle handler for dispatching action to favouritesReducer.
   * Kept stable to prevent unnecessary re-renders of PhotoCard components.
   */
  const handleToggleFavourite = useCallback((id) => {
    dispatch({
      type: FAVOURITES_ACTIONS.TOGGLE_FAVOURITE,
      payload: id,
    });
  }, []);

  /**
   * Fast lookup Set for favourited photo IDs.
   * Computed via useMemo to achieve O(1) lookups during card rendering.
   */
  const favouritesSet = useMemo(() => new Set(favourites), [favourites]);

  /**
   * Requirement 7: useMemo to compute the filtered photo list.
   *
   * WHY useMemo IS USED HERE:
   * 1. Filtering an array with string manipulation (.trim(), .toLowerCase(), .includes())
   *    is a computational operation.
   * 2. If the user toggles a favourite on a photo, or if unrelated state updates,
   *    useMemo skips running the filter calculation and instantly returns the cached list.
   * 3. It only recomputes when its actual dependencies (`photos`, `searchTerm`, or `showFavouritesOnly`) change.
   */
  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return photos.filter((photo) => {
      // Filter by author name if search query is present
      const matchesSearch = query
        ? photo.author?.toLowerCase().includes(query)
        : true;

      // Filter by favourite if the favourites filter tab is active
      const matchesFavourites = showFavouritesOnly
        ? favouritesSet.has(String(photo.id))
        : true;

      return matchesSearch && matchesFavourites;
    });
  }, [photos, searchTerm, showFavouritesOnly, favouritesSet]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col">
      {/* Top Banner & Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <Header
          totalPhotos={photos.length}
          favouritesCount={favourites.length}
        />

        {/* Controls Section: Search Bar and Quick View Tabs */}
        {!loading && !error && photos.length > 0 && (
          <div className="mt-4 mb-8">
            {/* Search Input (Requirement 4 & 7) */}
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              onClear={handleClearSearch}
              totalCount={photos.length}
              filteredCount={filteredPhotos.length}
            />

            {/* Quick Filter Tabs: All Photos vs Favourites */}
            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setShowFavouritesOnly(false)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  !showFavouritesOnly
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All Photos ({photos.length})
              </button>
              <button
                type="button"
                onClick={() => setShowFavouritesOnly(true)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  showFavouritesOnly
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Favourites ({favourites.length})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Requirement 2: Loading State */}
        {loading && <LoadingSpinner count={8} />}

        {/* Requirement 2: Error State with Retry Button */}
        {!loading && error && (
          <ErrorState message={error} onRetry={refetch} />
        )}

        {/* Photos Grid & Empty States */}
        {!loading && !error && (
          <>
            {filteredPhotos.length > 0 ? (
              /* Requirement 3: Responsive Grid
               * Desktop: 4 columns (lg:grid-cols-4)
               * Tablet: 2 columns (md:grid-cols-2)
               * Mobile: 1 column (grid-cols-1)
               */
              <div
                id="photo-grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {filteredPhotos.map((photo) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    isFavourite={favouritesSet.has(String(photo.id))}
                    onToggleFavourite={handleToggleFavourite}
                  />
                ))}
              </div>
            ) : (
              /* Empty Search / Empty Favourites State */
              <div className="py-20 text-center max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  {showFavouritesOnly && favourites.length === 0
                    ? 'No favourites yet'
                    : 'No matching photos found'}
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  {showFavouritesOnly && favourites.length === 0
                    ? 'Click the heart icon on any photo card to add it to your favourites list.'
                    : `No photos match the author search "${searchTerm}".`}
                </p>
                {searchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                    Clear Search Filter
                  </button>
                )}
                {showFavouritesOnly && favourites.length === 0 && (
                  <button
                    type="button"
                    onClick={() => setShowFavouritesOnly(false)}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                    Browse All Photos
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>
          Celebrare Frontend Assignment &bull; Built with React, Vite & Tailwind CSS
        </p>
      </footer>
    </div>
  );
}
