import { useRecommendedRestaurants } from "../../../api/services/restaurantService";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "../../../components/ui/alert";

// 로딩 상태 컴포넌트
const LoadingState = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-pulse text-gray-600">로딩 중...</div>
  </div>
);

// 에러 상태 컴포넌트
const ErrorState = ({ message }: { message: string }) => (
  <Alert variant="destructive" className="m-4">
    <AlertDescription>{message}</AlertDescription>
  </Alert>
);

const RecommendedRestaurants = () => {
  const { data: restaurants, isLoading, error } = useRecommendedRestaurants();
  const navigate = useNavigate();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error.message} />;
  if (!restaurants)
    return <ErrorState message="추천 맛집을 찾을 수 없습니다." />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">추천 맛집</h1>
        <p className="text-gray-600">평점순으로 정렬된 추천 맛집 목록입니다.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{restaurant.name}</h2>
              <p className="text-gray-600 mb-2">{restaurant.address}</p>
              <div className="flex items-center mb-2">
                <Star className="text-orange-500" size={16} />
                <span className="ml-1 text-sm">
                  {restaurant.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500 italic">
                리뷰({restaurant.reviewCount}개)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedRestaurants;
