import React, { useState } from 'react';
import '../ui/SideContainerStyles.css';
import { SearchBox } from '../../index';
import CardComponent from '../../sideCard/SideCard';

interface SideContainerProps {
    selectedMenu: string;
}

const SideContainer: React.FC<SideContainerProps> = ({ selectedMenu }) => {
    const cards = [
        {
            title: '카페&펍 연무장 던던 동대문점',
            description: '연무장 동대문점 - 스포츠 펍&카페 예약 문의는...',
            reviews: 93,
            price: 20000,
            image: 'your-image-url-here', // replace with actual image URL
        },
        {
            title: '또 다른 장소',
            description: '이곳은 또 다른 장소에 대한 설명입니다.',
            reviews: 50,
            price: 15000,
            image: 'another-image-url-here', // replace with actual image URL
        },
    ];

    const renderContent = () => {
        switch (selectedMenu) {
            case 'search':
                return <SearchBox />;
            case 'likes':
                return <div>찜한 목록</div>;
            case 'pathFinder':
                return <div>길찾기</div>;
            case 'popularKeywords':
                return <div>인기키워드</div>;
            default:
                return <SearchBox />;
        }
    };

    return (
        <div className="side-container col-3 flex flex-col items-center bg-gray-200 p-4 border border-gray-300 h-full rounded-lg shadow-lg">
            {renderContent()}
            <h1 className="text-xl font-bold mt-4">식당 리스트</h1>
            <div className="card-container">
                {cards.map((card, index) => (
                    <CardComponent
                        key={index}
                        title={card.title}
                        description={card.description}
                        reviews={card.reviews}
                        price={card.price}
                        image={card.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default SideContainer;
