import React, { useState } from 'react';
import { Search, Heart, TrendingUp } from 'lucide-react';

interface SidebarProps {
    onMenuSelect: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuSelect }) => {
    const [showList, setShowList] = useState(false);
    const [listType, setListType] = useState<
        'search' | 'favorites' | 'trending'
    >('search');

    return (
        <div className="w-[80px] h-full bg-white border-r border-gray-200 flex flex-col items-center py-4">
            {/* Search Button */}
            <button
                onClick={() => {
                    onMenuSelect('search');
                    setListType('search');
                    setShowList(true);
                }}
                className={`w-14 h-14 mb-4 flex flex-col items-center justify-center rounded-lg transition-colors ${
                    showList && listType === 'search'
                        ? 'bg-orange-50 text-orange-500'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
                <Search size={24} />
                <span className="text-xs mt-1">검색</span>
            </button>

            <button
                onClick={() => {
                    onMenuSelect('favorites');
                    setShowList(true);
                    setListType('favorites');
                }}
                className={`w-14 h-14 mb-4 flex flex-col items-center justify-center rounded-lg transition-colors ${
                    showList && listType === 'favorites'
                        ? 'bg-orange-50 text-orange-500'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
                <Heart size={24} />
                <span className="text-xs mt-1">찜</span>
            </button>

            <button
                onClick={() => {
                    onMenuSelect('trending');
                    setShowList(true);
                    setListType('trending');
                }}
                className={`w-14 h-14 flex flex-col items-center justify-center rounded-lg transition-colors ${
                    showList && listType === 'trending'
                        ? 'bg-orange-50 text-orange-500'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
                <TrendingUp size={24} />
                <span className="text-xs mt-1">인기</span>
            </button>
        </div>
    );
};

export default Sidebar;
