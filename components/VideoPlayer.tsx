import React from 'react';
import type { CloudinaryVideo } from '../types';

interface VideoPlayerProps {
  video: CloudinaryVideo | null;
  onBack: () => void; // New prop for mobile navigation
}

const CLOUD_NAME = 'dno8trp3p';

const getVideoUrl = (video: CloudinaryVideo): string => {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/v${video.version}/${video.public_id}.${video.format}`;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, onBack }) => {
  if (!video) {
    return (
      <div className="w-full max-w-4xl aspect-video bg-black flex flex-col items-center justify-center text-white rounded-lg shadow-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-semibold">Sổ tay Đảng Viên</h2>
        <p className="text-gray-400 mt-1">Chọn một video hướng dẫn để bắt đầu xem</p>
      </div>
    );
  }

  const videoUrl = getVideoUrl(video);
  const title = video.context?.custom?.caption || video.context?.custom?.alt || video.public_id;

  return (
    <div className="w-full h-full md:h-auto md:max-w-4xl flex flex-col justify-center relative p-2 md:p-0">
       {/* Back button, only on mobile */}
       <button
        onClick={onBack}
        className="md:hidden absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-opacity"
        aria-label="Quay lại danh sách"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

       <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-2xl">
         <video
           key={video.public_id}
           className="w-full h-full"
           controls
           autoPlay
           src={videoUrl}
         >
           Your browser does not support the video tag.
         </video>
       </div>
       <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold text-white capitalize">{title}</h3>
       </div>
    </div>
  );
};

export default VideoPlayer;