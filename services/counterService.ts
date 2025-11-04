const API_URL = 'https://api.countapi.xyz';
const NAMESPACE = 'stdangvien-huongdan'; // Unique identifier for our counter
const KEY = 'visits'; // The key for the counter

interface CountApiResponse {
  value: number;
}

/**
 * A helper function to perform the fetch request to the counter API.
 * It handles errors gracefully and returns null on failure.
 * @param url The API URL to fetch.
 * @returns The count number or null if the request fails.
 */
const fetchCount = async (url: string): Promise<number | null> => {
  try {
    // Using { cache: 'no-store' } to prevent browsers from returning a cached count.
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) {
      // Log server-side errors (e.g., 404, 500)
      console.error(`Counter API request failed. Status: ${response.status}`);
      return null;
    }
    const data: CountApiResponse = await response.json();
    return data.value;
  } catch (error) {
    // Log network errors (e.g., "Failed to fetch", DNS issues, CORS)
    // This is the error the user is reporting.
    console.error('Error fetching visit count:', error);
    return null;
  }
};


// Hits the counter and returns the new value
export const incrementAndGetCount = async (): Promise<number | null> => {
  return fetchCount(`${API_URL}/hit/${NAMESPACE}/${KEY}`);
};

// Gets the current value of the counter without incrementing
export const getCount = async (): Promise<number | null> => {
  return fetchCount(`${API_URL}/get/${NAMESPACE}/${KEY}`);
};