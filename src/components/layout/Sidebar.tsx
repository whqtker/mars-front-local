import { useState } from 'react';
import { Search, Heart, TrendingUp, X } from 'lucide-react';
import {
    useRestaurantSearch,
    useFavoriteRestaurants,
    useRecommendedRestaurants,
} from '../../api/services/restaurantService';
import type { Restaurant } from '../../api/types';
import { useNavigate } from 'react-router-dom';
import RestaurantDetail from '../pages/restaurantDetail/RestaurantDetail';

const Sidebar = () => {
    const navigate = useNavigate();
    const [showList, setShowList] = useState(false);
    const [listType, setListType] = useState<
        'search' | 'favorites' | 'trending'
    >('search');
    const [selectedRestaurant, setSelectedRestaurant] =
        useState<Restaurant | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // // 각 모드별 백엔드 API 호출
    // const { data: searchResults } = useRestaurantSearch(searchQuery);
    // const { data: favoriteRestaurants } = useFavoriteRestaurants();
    // const { data: trendingRestaurants } = useRecommendedRestaurants();

    // const getRestaurantsToDisplay = () => {
    //     if (listType === 'search') {
    //         return searchQuery ? searchResults : [];
    //     } else if (listType === 'favorites') {
    //         return favoriteRestaurants || [];
    //     } else if (listType === 'trending') {
    //         return trendingRestaurants || [];
    //     } else {
    //         return [];
    //     }
    // };

    // const restaurants = getRestaurantsToDisplay();
    const restaurants = [
        {
            id: 1,
            name: '맛집1',
            image: 'https://via.placeholder.com/300',
            address: '서울시 강남구',
            rating: 4.5,
            reviewCount: 10,
            price: '₩₩',
        },
        {
            id: 2,
            name: '맛집2',
            image: 'https://via.placeholder.com/300',
            address: '서울시 강남구',
            rating: 4.3,
            reviewCount: 15,
            price: '₩₩₩',
        },
        {
            id: 3,
            name: '맛집3',
            image: 'https://via.placeholder.com/300',
            address: '서울시 강남구',
            rating: 4.1,
            reviewCount: 20,
            price: '₩₩₩₩',
        },
    ];

    const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
        <div
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
        >
            <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-24 h-24 rounded-lg object-cover mr-4"
            />
            <div className="flex-1">
                <h4 className="font-medium text-gray-900 mb-1">
                    {restaurant.name}
                </h4>
                <p className="text-gray-500 text-sm mb-2">
                    {restaurant.address}
                </p>
                <div className="flex items-center space-x-2 text-sm">
                    <span className="text-orange-500">
                        ⭐ {restaurant.rating.toFixed(1)}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-500">
                        리뷰 {restaurant.reviewCount}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="text-orange-500 font-medium">
                        {restaurant.price}
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-full">
            {/* Compact Sidebar */}
            <aside className="w-[80px] bg-white border-r border-gray-200 flex flex-col items-center py-4">
                {/* Search Button */}
                <button
                    onClick={() => {
                        setShowList(true);
                        setListType('search');
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

                {/* Favorites Button */}
                <button
                    onClick={() => {
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

                {/* Trending Button */}
                <button
                    onClick={() => {
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
            </aside>

            {/* Content Panel */}
            {showList && (
                <div className="w-[360px] bg-white border-r border-gray-200">
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="font-medium text-lg">
                                {listType === 'search' && '맛집 검색'}
                                {listType === 'favorites' && '찜한 맛집'}
                                {listType === 'trending' && '인기 맛집'}
                            </h3>
                            <button
                                onClick={() => setShowList(false)}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto">
                            {listType === 'search' && (
                                <>
                                    <div className="p-4">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="동네 맛집 검색"
                                                value={searchQuery}
                                                onChange={(e) =>
                                                    setSearchQuery(
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                                            />
                                            <Search
                                                className="absolute left-3 top-3.5 text-gray-400"
                                                size={20}
                                            />
                                        </div>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {restaurants?.map((restaurant) => (
                                            <RestaurantCard
                                                key={restaurant.id}
                                                restaurant={restaurant}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            {listType === 'favorites' && (
                                <div className="divide-y divide-gray-100">
                                    {restaurants?.map((restaurant) => (
                                        <RestaurantCard
                                            key={restaurant.id}
                                            restaurant={restaurant}
                                        />
                                    ))}
                                </div>
                            )}

                            {listType === 'trending' && (
                                <div className="divide-y divide-gray-100">
                                    {restaurants?.map((restaurant) => (
                                        <RestaurantCard
                                            key={restaurant.id}
                                            restaurant={restaurant}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Restaurant Detail */}
            {selectedRestaurant && (
                <RestaurantDetail
                    restaurant={selectedRestaurant}
                    onClose={() => setSelectedRestaurant(null)}
                />
            )}
        </div>
    );
};

export default Sidebar;
