import type { CloudinaryVideo } from '../types';

const HISTORY_KEY = 'stadv-video-history';
const MAX_HISTORY_SIZE = 5;

/**
 * Retrieves the viewing history from localStorage.
 * @returns An array of CloudinaryVideo objects or an empty array.
 */
export const getHistory = (): CloudinaryVideo[] => {
  try {
    const historyJson = localStorage.getItem(HISTORY_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    console.error('Failed to parse history from localStorage', error);
    return [];
  }
};

/**
 * Adds a video to the viewing history and saves it to localStorage.
 * Manages the history size, keeping only the most recent items.
 * @param video The video to add to the history.
 * @returns The updated history array.
 */
export const addToHistory = (video: CloudinaryVideo): CloudinaryVideo[] => {
  let history = getHistory();
  // Remove the video if it already exists to move it to the front
  history = history.filter(v => v.public_id !== video.public_id);
  // Add the new video to the beginning of the array
  history.unshift(video);
  // Trim the array to the max size
  if (history.length > MAX_HISTORY_SIZE) {
    history = history.slice(0, MAX_HISTORY_SIZE);
  }
  // Save back to localStorage
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error)
    {
    console.error('Failed to save history to localStorage', error);
  }
  return history;
};

/**
 * Clears the entire viewing history from localStorage.
 */
export const clearHistory = (): void => {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history from localStorage', error);
  }
};
