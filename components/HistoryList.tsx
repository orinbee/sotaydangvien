import React, { useState } from 'react';
import type { CloudinaryVideo } from '../types';

interface HistoryListProps {
  videos: CloudinaryVideo[];
  onVideoSelect: (video: CloudinaryVideo) => void;
  selectedVideo: CloudinaryVideo | null;
}

const HistoryItem: React.FC<{
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="capitalize truncate">{title}</span>
      </button>
    </li>
  );
};

const HistoryList: React.FC<HistoryListProps> = ({ videos, onVideoSelect, selectedVideo }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (videos.length === 0) {
    return null; // Don't render anything if there's no history
  }

  return (
    <div className="p-4 border-b border-gray-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center mb-2 focus:outline-none"
        aria-expanded={isExpanded}
        aria-controls="history-list-container"
      >
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Xem gần đây
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-gray-400 transition-transform duration-300 transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
      <div
        id="history-list-container"
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <ul className="space-y-1 pt-1">
          {videos.map(video => (
            <HistoryItem
              key={`hist-${video.public_id}`}
              video={video}
              isSelected={selectedVideo?.public_id === video.public_id}
              onSelect={() => onVideoSelect(video)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryList;