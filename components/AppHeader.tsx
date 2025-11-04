import React from 'react';

export const AppHeader: React.FC = () => {
  return (
    <div className="p-4 bg-red-700 text-white shadow-md">
      <div className="flex items-center space-x-3">
        <img
          src="https://cdn.quangnam.gov.vn/2025/02/03/co-dang-.png"
          alt="Cờ Đảng"
          className="w-8 h-8 object-cover"
        />
        <div>
          <h1 className="text-xl font-bold tracking-tight">Sổ tay Đảng Viên</h1>
          <p className="text-sm text-red-100 font-light">
            Hướng dẫn sử dụng ứng dụng
          </p>
        </div>
      </div>
    </div>
  );
};
