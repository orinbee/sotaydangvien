import React, { useState } from 'react';
import type { CloudinaryVideo } from '../types';

interface HistoryListProps {
  videos: CloudinaryVideo[];
  onVideoSelect: (video: CloudinaryVideo) => void;
  selectedVideo: CloudinaryVideo | null;
  onClearHistory: () => void;
  onToggleWatched: (publicId: string) => void;
}

const HistoryItem: React.FC<{
  video: CloudinaryVideo;
  isSelected: boolean;
  onSelect: () => void;
  onToggleWatched: (publicId: string) => void;
}> = ({ video, isSelected, onSelect, onToggleWatched }) => {
  const title = video.context?.custom?.caption || video.context?.custom?.alt || video.public_id.replace(/_/g, ' ');
  
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent video selection when toggling watched status
    onToggleWatched(video.public_id);
  };

  const itemClasses = `
    w-full p-3 text-left transition-all duration-200 ease-in-out
    flex items-center space-x-3 text-sm rounded-md group
    ${ isSelected ? 'bg-red-100 text-red-800 font-semibold' : 'text-gray-600 hover:bg-gray-100' }
    ${ video.watched ? 'opacity-60' : 'opacity-100' }
  `;

  const buttonClasses = `
    flex-1 flex items-center space-x-3 cursor-pointer transform 
    transition-transform duration-200 group-hover:translate-x-1 group-active:scale-[0.98]
  `;

  return (
    <li className={itemClasses}>
      <button onClick={onSelect} className={buttonClasses}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="capitalize truncate">{title}</span>
      </button>
      <button 
        onClick={handleToggle} 
        className="p-1 rounded-full hover:bg-gray-200 transition-colors z-10"
        aria-label={video.watched ? "Đánh dấu là chưa xem" : "Đánh dấu là đã xem"}
      >
        {video.watched ? (
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        )}
      </button>
    </li>
  );
};

const HistoryList: React.FC<HistoryListProps> = ({ videos, onVideoSelect, selectedVideo, onClearHistory, onToggleWatched }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (videos.length === 0) {
    return null; // Don't render anything if there's no history
  }

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="w-full flex justify-between items-center mb-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center group focus:outline-none"
          aria-expanded={isExpanded}
          aria-controls="history-list-container"
        >
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider group-hover:text-gray-700 transition-colors">
            Xem gần đây
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 text-gray-400 transition-transform duration-300 transform ml-1 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        {isExpanded && (
          <button
            onClick={onClearHistory}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-200 flex items-center space-x-1"
            aria-label="Xóa lịch sử"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Xóa</span>
          </button>
        )}
      </div>
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
              onToggleWatched={onToggleWatched}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryList;