import React, { useState } from 'react';
import SidebarSearch from '../search/contianer/SidebarSearch';
import SidebarFavorites from '../favorites/container/SidebarFavorites';
import SidebarTrending from '..//trending/contianer/SidebarTrending';
import { X } from 'lucide-react';

interface SideContainerProps {
    selectedMenu: string;
}

const SidebarDetail: React.FC<SideContainerProps> = ({ selectedMenu }) => {
    const [showList, setShowList] = useState(true);

    if (!showList) {
        return null;
    }

    const handleClose = () => {
        setShowList(false);
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case 'search':
                return <SidebarSearch />;
            case 'favorites':
                return <SidebarFavorites />;
            case 'trending':
                return <SidebarTrending />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col w-[360px] bg-white border-r border-gray-200 rounded-lg shadow-lg h-full">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-lg">
                    {selectedMenu === 'search' && '맛집 검색'}
                    {selectedMenu === 'favorites' && '찜한 맛집'}
                    {selectedMenu === 'trending' && '인기 맛집'}
                </h3>
                <button
                    onClick={() => handleClose()}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X size={20} className="text-gray-500" />
                </button>
            </div>
            <div className="p-4 max-h-full h-full">{renderContent()}</div>
        </div>
    );
};

export default SidebarDetail;
