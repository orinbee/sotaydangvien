import React from 'react';
import type { TabType } from '../types';

interface TabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const getTabClasses = (tabName: TabType) => {
    const isActive = activeTab === tabName;
    return `
      w-1/2 py-3 px-1 text-center text-sm font-medium cursor-pointer
      transition-colors duration-300 ease-in-out relative z-10
      ${
        isActive
          ? 'text-red-600'
          : 'text-gray-500 hover:text-gray-700'
      }
    `;
  };

  return (
    <div className="relative border-b border-gray-200">
      <div className="flex">
        <button
          onClick={() => onTabChange('mobile')}
          className={getTabClasses('mobile')}
        >
          Điện thoại
        </button>
        <button
          onClick={() => onTabChange('pc')}
          className={getTabClasses('pc')}
        >
          Máy tính
        </button>
      </div>
      <div
        className="absolute bottom-[-1px] h-0.5 bg-red-600 transition-transform duration-300 ease-in-out"
        style={{
          width: '50%',
          transform: `translateX(${activeTab === 'mobile' ? '0%' : '100%'})`,
        }}
      />
    </div>
  );
};

export default Tabs;