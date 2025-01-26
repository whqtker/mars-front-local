import React from 'react';
import { logoPath } from '../../../shared';
import '../ui/SideBarStyle.css';

const Sidebar: React.FC = () => {
    return (
        <div className="bg-gray-200 text-black flex flex-col items-center h-full border-r border-gray-300">
            <a href="#home" className="flex flex-col items-center p-4">
                <img
                    src={logoPath}
                    width="50"
                    height="50"
                    className="inline-block"
                    alt="Logo"
                />
                <span className="mt-2 text-xl font-bold">Commars</span>
            </a>
            {/* 다른 사이드바 항목들 추가 */}
            <div className="menu flex flex-col items-center mt-4 space-y-4 w-full">
                <ul className="w-full">
                    <li className="text-center py-2 border-t border-b border-gray-300 hover:bg-gray-300 pt-4 pb-4 w-full">
                        <a href="#search">검색</a>
                    </li>
                    <li className="text-center py-2 border-b border-gray-300 hover:bg-gray-300 pt-4 pb-4 ">
                        <a href="#likes">찜</a>
                    </li>
                    <li className="text-center py-2 border-b border-gray-300 hover:bg-gray-300 pt-4 pb-4 ">
                        <a href="#pathFinder">길찾기</a>
                    </li>
                    <li className="text-center py-2 border-b border-gray-300 hover:bg-gray-300 pt-4 pb-4 ">
                        <a href="#popularKeywords">인기키워드</a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
