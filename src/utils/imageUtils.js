/**
 * Formats a Picsum photo into an optimized thumbnail URL.
 *
 * Why this is crucial:
 * The raw Picsum `download_url` points to original full-resolution files (often 5000x3333px, > 5MB each).
 * Loading 30 full-resolution images would download ~150MB, causing severe lag and high bandwidth usage.
 * Picsum supports parameterized thumbnail routes: https://picsum.photos/id/{id}/{width}/{height}
 *
 * @param {object} photo
 * @param {number} width - default 600px
 * @param {number} height - default 400px
 * @returns {string} Optimized image URL
 */
export function getOptimizedImageUrl(photo, width = 600, height = 400) {
  if (!photo) return '';
  if (photo.id !== undefined && photo.id !== null) {
    return `https://picsum.photos/id/${photo.id}/${width}/${height}`;
  }
  return photo.download_url || photo.url || '';
}
