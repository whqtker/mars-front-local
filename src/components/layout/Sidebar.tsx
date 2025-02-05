import { useState, useEffect } from "react";
import { Search, Heart, TrendingUp, X } from "lucide-react";
import { restaurantService } from "../../api/services/restaurantService";
import type { Restaurant } from "../../types";
import { useNavigate } from "react-router-dom";
import RestaurantDetail from "../../components/pages/RestaurantDetail";

const Sidebar = () => {
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);
  const [listType, setListType] = useState<"search" | "favorites" | "trending">(
    "search"
  );
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[]>(
    []
  );

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await restaurantService.getRecommended();
        setRestaurants(response.data);
      } catch (err) {
        console.error("식당 데이터를 가져오는 데 실패했습니다.", err);
      }
    };

    fetchRestaurants();
  }, []);

  const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => (
    <div
      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
      className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
    >
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="w-24 h-24 rounded-lg object-cover mr-4"
      />
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 mb-1">{restaurant.name}</h4>
        <p className="text-gray-500 text-sm mb-2">{restaurant.address}</p>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-orange-500">
            ⭐ {restaurant.rating.toFixed(1)}
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500">리뷰 {restaurant.reviewCount}</span>
          <span className="text-gray-300">•</span>
          <span className="text-orange-500 font-medium">
            {restaurant.price}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Compact Sidebar */}
      <aside className="w-[80px] bg-white border-r border-gray-200 flex flex-col items-center py-4">
        {/* Search Button */}
        <button
          onClick={() => {
            setShowList(true);
            setListType("search");
          }}
          className={`w-14 h-14 mb-4 flex flex-col items-center justify-center rounded-lg transition-colors ${
            showList && listType === "search"
              ? "bg-orange-50 text-orange-500"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Search size={24} />
          <span className="text-xs mt-1">검색</span>
        </button>

        {/* Favorites Button */}
        <button
          onClick={() => {
            setShowList(true);
            setListType("favorites");
          }}
          className={`w-14 h-14 mb-4 flex flex-col items-center justify-center rounded-lg transition-colors ${
            showList && listType === "favorites"
              ? "bg-orange-50 text-orange-500"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Heart size={24} />
          <span className="text-xs mt-1">찜</span>
        </button>

        {/* Trending Button */}
        <button
          onClick={() => {
            setShowList(true);
            setListType("trending");
          }}
          className={`w-14 h-14 flex flex-col items-center justify-center rounded-lg transition-colors ${
            showList && listType === "trending"
              ? "bg-orange-50 text-orange-500"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
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
                {listType === "search" && "맛집 검색"}
                {listType === "favorites" && "찜한 맛집"}
                {listType === "trending" && "인기 맛집"}
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
              {listType === "search" && (
                <>
                  <div className="p-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="동네 맛집 검색"
                        className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                      />
                      <Search
                        className="absolute left-3 top-3.5 text-gray-400"
                        size={20}
                      />
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {restaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                      />
                    ))}
                  </div>
                </>
              )}

              {listType === "favorites" && (
                <div className="divide-y divide-gray-100">
                  {restaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                    />
                  ))}
                </div>
              )}

              {listType === "trending" && (
                <div className="p-4">
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex flex-wrap gap-2">
                      {["맛집", "카페", "디저트", "파스타", "한식", "일식"].map(
                        (keyword) => (
                          <div
                            key={keyword}
                            className="px-3 py-1.5 bg-white rounded-full text-sm text-gray-700 border border-gray-200 hover:border-orange-500 cursor-pointer"
                          >
                            #{keyword}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {restaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                      />
                    ))}
                  </div>
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
