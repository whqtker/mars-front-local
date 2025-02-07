import React from 'react';
import SearchRestaurantSummaryCardProps from './SearchRestaurantSummaryCardProps';

const RestaurantCard: React.FC<SearchRestaurantSummaryCardProps> = ({
    image,
    name,
    address,
    rating,
    reviewCount,
    price,
}) => {
    return (
        <div
            // onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
        >
            <img
                src={image}
                alt={name}
                className="w-24 h-24 rounded-lg object-cover mr-4"
            />
            <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">{name}</h4>
                <p className="text-gray-500 text-sm mb-2">{address}</p>
                <div className="flex items-center space-x-2 text-sm">
                    <span className="text-orange-500">
                        ⭐ {rating.toFixed(1)}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">리뷰 {reviewCount}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-orange-500 font-medium">{price}</span>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
