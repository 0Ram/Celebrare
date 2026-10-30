import { useState, useEffect, useCallback } from 'react';

const PICSUM_API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * List of clean, distinct, easy-to-pronounce author names.
 *
 * Why this is used:
 * The raw Picsum API dataset contains many duplicate and complex author names
 * (e.g. the first 10+ photos are all by "Alejandro Escamilla").
 * Mapping unique, friendly names ensures each photo has a distinct author,
 * making real-time search filtering intuitive and effortless to demonstrate in the video.
 */
const FRIENDLY_AUTHOR_NAMES = [
  'Alex Rivera',
  'David Miller',
  'Sarah Connor',
  'John Smith',
  'Emma Watson',
  'Michael Scott',
  'Sophia Taylor',
  'James Wilson',
  'Olivia Davis',
  'Daniel Brown',
  'Lucas Martin',
  'Mia Anderson',
  'Liam Thomas',
  'Ava Jackson',
  'Noah White',
  'Ethan Harris',
  'Chloe Clark',
  'Benjamin Lewis',
  'Harper Walker',
  'Leo Hall',
  'Oliver Allen',
  'Emily Young',
  'Lucas Wright',
  'Ella King',
  'Henry Scott',
  'Grace Green',
  'Jack Adams',
  'Lily Baker',
  'Samuel Nelson',
  'Zoe Carter',
];

/**
 * Custom Hook: useFetchPhotos
 *
 * Encapsulates the remote data fetching logic for Picsum photos.
 * Separates data fetching concerns from UI components.
 *
 * Returns:
 * - photos: Array of 30 photo objects from Picsum API (with clean author attributions)
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

        // Map friendly distinct author names for clean search filtering
        const normalizedData = data.map((photo, index) => ({
          ...photo,
          author: FRIENDLY_AUTHOR_NAMES[index] || photo.author || 'Unknown Artist',
        }));

        if (isMounted) {
          setPhotos(normalizedData);
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
