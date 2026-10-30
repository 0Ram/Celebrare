/**
 * Reducer actions for managing favourite photo IDs.
 */
export const FAVOURITES_ACTIONS = {
  TOGGLE_FAVOURITE: 'TOGGLE_FAVOURITE',
  SET_FAVOURITES: 'SET_FAVOURITES',
  CLEAR_FAVOURITES: 'CLEAR_FAVOURITES',
};

export const FAVOURITES_STORAGE_KEY = 'celebrare_favourite_photos_v1';

/**
 * Helper to safely read favourites from localStorage.
 * Used as initializer function for useReducer (lazy initialization).
 * @returns {string[]} Array of favourited photo IDs
 */
export function getInitialFavourites() {
  try {
    const stored = localStorage.getItem(FAVOURITES_STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load favourites from localStorage:', err);
    return [];
  }
}

/**
 * Pure reducer function for favourites state.
 *
 * @param {string[]} state - Array of favourited photo IDs
 * @param {{ type: string, payload?: any }} action
 * @returns {string[]} New state array
 */
export function favouritesReducer(state, action) {
  switch (action.type) {
    case FAVOURITES_ACTIONS.TOGGLE_FAVOURITE: {
      const id = String(action.payload);
      const isAlreadyFav = state.includes(id);
      if (isAlreadyFav) {
        return state.filter((favId) => favId !== id);
      } else {
        return [...state, id];
      }
    }

    case FAVOURITES_ACTIONS.SET_FAVOURITES: {
      return Array.isArray(action.payload) ? action.payload : [];
    }

    case FAVOURITES_ACTIONS.CLEAR_FAVOURITES: {
      return [];
    }

    default:
      return state;
  }
}
