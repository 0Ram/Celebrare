import { useState, useEffect, useCallback } from 'react';

const PICSUM_API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * Custom Hook: useFetchPhotos
 *
 * Encapsulates the remote data fetching logic for Picsum photos.
 * Separates data fetching concerns from UI components.
 *
 * Returns:
 * - photos: Array of 30 photo objects from Picsum API
 * - loading: Boolean indicating network fetch status
 * - error: String error message or null
 * - refetch: Trigger function to retry on failure
 *
 * @returns {{
 *   photos: Array<object>,
 *   loading: boolean,
 *   error: string | null,
 *   refetch: () => void
 * }}
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        const response = await fetch(PICSUM_API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch photos: Server responded with HTTP ${response.status} (${response.statusText})`
          );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from Picsum API');
        }

        if (isMounted) {
          setPhotos(data);
          setError(null);
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }
        console.error('Error fetching photos from Picsum API:', err);
        if (isMounted) {
          setError(
            err.message ||
              'An unexpected error occurred while fetching photos. Please check your internet connection and try again.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [trigger]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setTrigger((prev) => prev + 1);
  }, []);

  return { photos, loading, error, refetch };
}
