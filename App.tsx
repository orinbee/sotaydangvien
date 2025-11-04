import React, { useState, useEffect, useMemo } from 'react';
import { fetchVideosByTag } from './services/cloudinaryService';
import { getHistory, addToHistory } from './services/historyService';
import type { CloudinaryVideo, TabType } from './types';
import VideoList from './components/VideoList';
import VideoPlayer from './components/VideoPlayer';
import SearchBar from './components/SearchBar';
import Tabs from './components/Tabs';
import { AppHeader } from './components/AppHeader';
import ContactButton from './components/ContactButton';
import HistoryList from './components/HistoryList';
import Footer from './components/Footer';
import { useDebounce } from './hooks/useDebounce';

const App: React.FC = () => {
  const [videosMobile, setVideosMobile] = useState<CloudinaryVideo[]>([]);
  const [videosPC, setVideosPC] = useState<CloudinaryVideo[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('mobile');
  const [selectedVideo, setSelectedVideo] = useState<CloudinaryVideo | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearchTerm = useDebounce(searchInput, 300);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<CloudinaryVideo[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setStatus('loading');
        setHistory(getHistory()); // Load history on initial mount
        const [mobileData, pcData] = await Promise.all([
          fetchVideosByTag('stdangvienhuhh'),
          fetchVideosByTag('stdangvienhuhh_pc'),
        ]);
        setVideosMobile(mobileData);
        setVideosPC(pcData);
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError('Không thể tải danh sách video. Vui lòng thử lại sau.');
        console.error(err);
      }
    };
    loadData();
  }, []);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSearchInput('');
    setSelectedVideo(null);
  };

  const currentVideoList = useMemo(() => {
    return activeTab === 'mobile' ? videosMobile : videosPC;
  }, [activeTab, videosMobile, videosPC]);

  const filteredVideos = useMemo(() => {
    if (!currentVideoList) return [];
    return currentVideoList.filter(video => {
      const title = video.context?.custom?.caption || video.context?.custom?.alt || video.public_id;
      return title.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    });
  }, [currentVideoList, debouncedSearchTerm]);

  const handleVideoSelect = (video: CloudinaryVideo) => {
    setSelectedVideo(video);
    const newHistory = addToHistory(video);
    setHistory(newHistory);
  };

  const handleBackToList = () => {
    setSelectedVideo(null);
  }

  return (
    <div className="flex flex-col h-screen font-sans text-gray-800 bg-gray-50">
      <main className="flex flex-1 flex-col md:flex-row overflow-hidden">
        {/* Left Panel: Hidden on mobile when a video is selected */}
        <div
          className={`w-full md:w-2/5 lg:w-1/3 xl:w-1/4 flex-col bg-white border-r border-gray-200 ${
            selectedVideo ? 'hidden md:flex' : 'flex'
          }`}
        >
          <AppHeader />
          <div className="p-4 border-b border-gray-200">
            <SearchBar searchTerm={searchInput} onSearchChange={setSearchInput} />
          </div>
          <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
          
          <div className="flex-1 overflow-y-auto">
            {status === 'loading' && (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Đang tải video...</p>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-center justify-center h-full p-4">
                <p className="text-red-500 text-center">{error}</p>
              </div>
            )}
            {status === 'success' && (
              <>
                <HistoryList
                  videos={history}
                  onVideoSelect={handleVideoSelect}
                  selectedVideo={selectedVideo}
                />
                <VideoList
                  videos={filteredVideos}
                  onVideoSelect={handleVideoSelect}
                  selectedVideo={selectedVideo}
                />
              </>
            )}
          </div>
          <Footer />
        </div>

        {/* Right Panel: Shown on mobile only when a video is selected */}
        <div
          className={`flex-1 items-center justify-center bg-black ${
            selectedVideo ? 'flex' : 'hidden md:flex'
          }`}
        >
          <VideoPlayer video={selectedVideo} onBack={handleBackToList} />
        </div>
      </main>
      <ContactButton />
    </div>
  );
};

export default App;