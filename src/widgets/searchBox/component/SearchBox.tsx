import React from 'react';

const SearchBox: React.FC = () => {
    return (
        <div className="search-box-container w-full flex items-center border border-gray-300 rounded-lg p-2">
            <svg
                className="w-6 h-6 text-gray-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
            </svg>
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="search-box-input w-full p-2"
            />
        </div>
    );
};

export default SearchBox;
