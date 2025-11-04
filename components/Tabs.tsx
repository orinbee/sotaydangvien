
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
      w-1/2 py-3 px-1 text-center text-sm font-medium cursor-pointer border-b-2
      transition-colors duration-200 ease-in-out
      ${
        isActive
          ? 'border-red-600 text-red-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }
    `;
  };

  return (
    <div className="flex border-b border-gray-200">
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
  );
};

export default Tabs;
