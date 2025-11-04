import React, { useState, useEffect } from 'react';
import { getCount, incrementAndGetCount } from '../services/counterService';

const Footer: React.FC = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisitCount = async () => {
      const sessionKey = 'hasVisitedThisSession';
      const hasVisited = sessionStorage.getItem(sessionKey);
      let count: number | null = null;

      try {
        if (!hasVisited) {
          // If not visited in this session, increment the count
          count = await incrementAndGetCount();
          sessionStorage.setItem(sessionKey, 'true');
        } else {
          // If already visited, just get the current count
          count = await getCount();
        }

        if (count !== null) {
          setVisitCount(count);
        }
      } catch (error) {
        console.error("Could not fetch visit count:", error);
        // Silently fail, don't show an error to the user for this feature
      }
    };

    fetchVisitCount();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="p-4 border-t border-gray-200 text-sm text-gray-500">
      <div className="flex items-center justify-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>Lượt truy cập:</span>
        <span className="font-semibold text-gray-700">
          {visitCount !== null ? visitCount.toLocaleString('vi-VN') : '...'}
        </span>
      </div>
    </div>
  );
};

export default Footer;
