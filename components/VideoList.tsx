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
    w-full p-3 text-left cursor-pointer transition-all duration-200 ease-in-out
    flex items-center space-x-3 text-sm rounded-md
    transform hover:translate-x-1 active:scale-[0.98]
    ${
      isSelected
        ? 'bg-red-100 text-red-800 font-semibold'
        : 'text-gray-600 hover:bg-gray-100'
    }
  `;

  return (
    <li>
      <button onClick={onSelect} className={itemClasses}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
        <span className="capitalize truncate">{title}</span>
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
    <div className="p-4">
       <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
        Danh sách video
      </h3>
      <ul className="space-y-1">
        {videos.map(video => (
          <VideoItem
            key={video.public_id}
            video={video}
            isSelected={selectedVideo?.public_id === video.public_id}
            onSelect={() => onVideoSelect(video)}
          />
        ))}
      </ul>
    </div>
  );
};

export default VideoList;