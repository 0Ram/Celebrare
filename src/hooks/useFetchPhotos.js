import { useState, useEffect, useCallback } from 'react';

const PICSUM_API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * 30 Authentic Indian / Telugu author names.
 *
 * Why this is used:
 * The raw Picsum API dataset contains duplicate names (the first 10+ photos are all by "Alejandro Escamilla").
 * Mapping unique, well-known Telugu and Indian names makes the author names easy to read,
 * pronounce, and demonstrate during the video presentation.
 */
const TELUGU_AUTHOR_NAMES = [
  'Ram Charan',
  'Sai Kumar',
  'Ravi Teja',
  'Mahesh Babu',
  'Prabhas Raju',
  'Allu Arjun',
  'Kalyan Kumar',
  'Vijay Varma',
  'Tarun Reddy',
  'Nagarjuna Rao',
  'Venkatesh Daggubati',
  'Samantha Ruth',
  'Sai Pallavi',
  'Keerthy Suresh',
  'Rashmika Mandanna',
  'Anushka Shetty',
  'Pooja Hegde',
  'Sreeleela Reddy',
  'Nani Ghanta',
  'Chiranjeevi Konidela',
  'Brahmanandam Kanneganti',
  'Vennela Kishore',
  'Priyadarshi Pulikonda',
  'Sunil Varma',
  'Jagapathi Babu',
  'Rajamouli Koduri',
  'Trivikram Srinivas',
  'Sukumar Bandreddi',
  'Balakrishna Nandamuri',
  'Jr NTR Taraka',
];

/**
 * Custom Hook: useFetchPhotos
 *
 * Encapsulates the remote data fetching logic for Picsum photos.
 * Separates data fetching concerns from UI components.
 *
 * Returns:
 * - photos: Array of 30 photo objects from Picsum API (with Telugu author names)
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

        // Map authentic Telugu / Indian author names
        const normalizedData = data.map((photo, index) => ({
          ...photo,
          author: TELUGU_AUTHOR_NAMES[index] || photo.author || 'Unknown Artist',
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
