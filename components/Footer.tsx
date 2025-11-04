import React, { useState, useEffect } from 'react';
import { incrementAndGetCount } from '../services/counterService';

const Footer: React.FC = () => {
  const [visitCount, setVisitCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchVisitCount = async () => {
      try {
        // Luôn tăng bộ đếm trong mỗi lần tải trang để theo dõi tổng số lượt truy cập
        const count = await incrementAndGetCount();
        if (count !== null) {
          setVisitCount(count);
        }
      } catch (error) {
        console.error("Could not fetch visit count:", error);
        // Bỏ qua lỗi một cách âm thầm, không hiển thị cho người dùng
      }
    };

    fetchVisitCount();
  }, []); // Mảng phụ thuộc trống đảm bảo việc này chỉ chạy một lần khi component được gắn kết (tức là mỗi khi trang được tải)

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