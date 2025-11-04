
import React from 'react';
import type { CloudinaryVideo } from '../types';

interface VideoListProps {
  videos: CloudinaryVideo[];
  onVideoSelect: (video: CloudinaryVideo) => void;
  selectedVideo: CloudinaryVideo | null;
}

const VideoItem: React.FC<{
  video: CloudinaryVideo;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ video, isSelected, onSelect }) => {
  const title = video.context?.custom?.caption || video.context?.custom?.alt || video.public_id.replace(/_/g, ' ');

  const itemClasses = `
    w-full p-4 text-left cursor-pointer transition-colors duration-200 ease-in-out border-b border-gray-200
    ${
      isSelected
        ? 'bg-red-100 text-red-800 font-semibold'
        : 'text-gray-700 hover:bg-gray-100'
    }
  `;

  return (
    <li>
      <button onClick={onSelect} className={itemClasses}>
        <span className="capitalize">{title}</span>
      </button>
    </li>
  );
};

const VideoList: React.FC<VideoListProps> = ({ videos, onVideoSelect, selectedVideo }) => {
  if (videos.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>Không tìm thấy video nào.</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {videos.map(video => (
        <VideoItem
          key={video.public_id}
          video={video}
          isSelected={selectedVideo?.public_id === video.public_id}
          onSelect={() => onVideoSelect(video)}
        />
      ))}
    </ul>
  );
};

export default VideoList;
