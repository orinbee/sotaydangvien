
import type { CloudinaryVideo } from '../types';

const CLOUD_NAME = 'dno8trp3p';

interface CloudinaryListResponse {
  resources: CloudinaryVideo[];
}

export const fetchVideosByTag = async (tag: string): Promise<CloudinaryVideo[]> => {
  try {
    const response = await fetch(`https://res.cloudinary.com/${CLOUD_NAME}/video/list/${tag}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: CloudinaryListResponse = await response.json();
    return data.resources.sort((a, b) => a.public_id.localeCompare(b.public_id));
  } catch (error) {
    console.error(`Error fetching Cloudinary videos for tag "${tag}":`, error);
    // Re-throw the error to be handled by the calling component
    throw error;
  }
};
