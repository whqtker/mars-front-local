import { useRecommendedRestaurants } from '../../api/services/restaurantService';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecommendedRestaurants = () => {
    // const { data: restaurants, isLoading, error } = useRecommendedRestaurants();
    const navigate = useNavigate();

    // if (isLoading) return <p>로딩 중...</p>;
    // if (error) return <p className="text-red-500">{error.message}</p>;

    const restaurants = [
        {
            id: 1,
            name: '맛집1',
            image: 'https://via.placeholder.com/300',
            address: '서울시 강남구',
            rating: 4.5,
            reviews: 10,
        },
        {
            id: 2,
            name: '맛집2',
            image: 'https://via.placeholder.com/300',
            address: '서울시 강남구',
            rating: 4.3,
            reviews: 15,
        },
        {
            id: 3,
            name: '맛집3',
            image: 'https://via.placeholder.com/300',
            address: '서울시 강남구',
            rating: 4.1,
            reviews: 20,
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    추천 맛집
                </h1>
                <p className="text-gray-600">
                    평점순으로 정렬된 추천 맛집 목록입니다.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants?.map((restaurant) => (
                    <div
                        key={restaurant.id}
                        onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <img
                            src={restaurant.image}
                            alt={restaurant.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">
                                {restaurant.name}
                            </h2>
                            <p className="text-gray-600 mb-2">
                                {restaurant.address}
                            </p>
                            <div className="flex items-center mb-2">
                                <Star className="text-orange-500" size={16} />
                                <span className="ml-1 text-sm">
                                    {restaurant.rating.toFixed(1)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 italic">
                                리뷰({restaurant.reviews}개)
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecommendedRestaurants;
