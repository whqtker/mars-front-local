import { useState } from "react";
import { Search, Heart, TrendingUp, X } from "lucide-react";
import {
  useRestaurantSearch,
  useFavoriteRestaurants,
  useRecommendedRestaurants,
} from "../../api/services/restaurantService";
import type {
  Restaurant,
  ListType,
  SidebarButtonProps,
  RestaurantCardProps,
  SearchPanelProps,
  RestaurantListProps,
} from "../../api/types";
import { useNavigate } from "react-router-dom";

const SidebarButton = ({
  icon,
  label,
  isActive,
  onClick,
}: SidebarButtonProps) => (
  <button
    onClick={onClick}
    className={`w-14 h-14 mb-4 flex flex-col items-center justify-center rounded-lg transition-colors ${
      isActive
        ? "bg-orange-50 text-orange-500"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
    }`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </button>
);

const RestaurantCard = ({ restaurant, onClick }: RestaurantCardProps) => (
  <div
    onClick={() => onClick(restaurant.id)}
    className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
  >
    <img
      src={restaurant.imageUrl}
      alt={restaurant.name}
      className="w-24 h-24 rounded-lg object-cover mr-4 shadow-sm"
    />
    <div className="flex-1">
      <h4 className="font-medium text-gray-900 mb-1">{restaurant.name}</h4>
      <p className="text-gray-500 text-sm mb-2">{restaurant.address}</p>
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-orange-500">
          ⭐ {restaurant.rating.toFixed(1)}
        </span>
        <span className="text-gray-300">•</span>
        <span className="text-gray-500">
          리뷰 {restaurant.reviewCount.toLocaleString()}
        </span>
        <span className="text-gray-300">•</span>
        <span className="text-orange-500 font-medium">
          {restaurant.priceRange}
        </span>
      </div>
      <div className="mt-1">
        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
          {restaurant.category}
        </span>
      </div>
    </div>
  </div>
);

const SearchPanel = ({
  searchQuery,
  setSearchQuery,
  restaurants,
  onRestaurantClick,
  isLoading,
}: SearchPanelProps & { isLoading?: boolean }) => (
  <>
    <div className="p-4">
      {isLoading && <div className="text-center text-gray-500">검색중...</div>}
      <div className="relative">
        <input
          type="text"
          placeholder="동네 맛집 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
        />
        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
      </div>
    </div>
    <RestaurantList
      restaurants={restaurants}
      onRestaurantClick={onRestaurantClick}
    />
  </>
);

const RestaurantList = ({
  restaurants,
  onRestaurantClick,
}: RestaurantListProps) => (
  <div className="divide-y divide-gray-100">
    {restaurants.map((restaurant) => (
      <RestaurantCard
        key={restaurant.id}
        restaurant={restaurant}
        onClick={onRestaurantClick}
      />
    ))}
  </div>
);

interface SidebarProps {
  onRestaurantSelect?: (id: number) => void;
}

const Sidebar = ({ onRestaurantSelect }: SidebarProps) => {
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);
  const [listType, setListType] = useState<ListType>("search");
  const [searchQuery, setSearchQuery] = useState("");

  // API 호출 및 데이터 가져오기
  const { data: searchResults, isLoading: searchLoading } =
    useRestaurantSearch(searchQuery);
  const { data: favoriteRestaurants, isLoading: favoritesLoading } =
    useFavoriteRestaurants();
  const { data: recommendedRestaurants } = useRecommendedRestaurants();

  const getRestaurantsToDisplay = (): Restaurant[] => {
    switch (listType) {
      case "search":
        return searchQuery ? searchResults || [] : [];
      case "favorites":
        return favoriteRestaurants || [];
      case "trending":
        return recommendedRestaurants || [];
      default:
        return [];
    }
  };

  const handleRestaurantClick = (id: number) => {
    if (onRestaurantSelect) {
      onRestaurantSelect(id);
    }
    navigate(`/restaurant/${id}`);
  };

  const getListTitle = () => {
    const titles: Record<ListType, string> = {
      search: "맛집 검색",
      favorites: "찜한 맛집",
      trending: "인기 맛집",
    };
    return titles[listType];
  };

  const isLoading = (): boolean => {
    switch (listType) {
      case "search":
        return searchLoading;
      case "favorites":
        return favoritesLoading;
      case "trending":
        return false;
      default:
        return false;
    }
  };

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Compact Sidebar */}
      <aside className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-4 shadow-sm">
        <SidebarButton
          icon={<Search size={24} />}
          label="검색"
          isActive={showList && listType === "search"}
          onClick={() => {
            setShowList(true);
            setListType("search");
          }}
        />
        <SidebarButton
          icon={<Heart size={24} />}
          label="찜"
          isActive={showList && listType === "favorites"}
          onClick={() => {
            setShowList(true);
            setListType("favorites");
          }}
        />
        <SidebarButton
          icon={<TrendingUp size={24} />}
          label="인기"
          isActive={showList && listType === "trending"}
          onClick={() => {
            setShowList(true);
            setListType("trending");
          }}
        />
      </aside>

      {/* Content Panel */}
      {showList && (
        <div className="w-[360px] bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
            <h3 className="font-medium text-lg">{getListTitle()}</h3>
            <button
              onClick={() => setShowList(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close panel"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <SearchPanel
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            restaurants={getRestaurantsToDisplay()}
            isLoading={isLoading()}
            onRestaurantClick={(id) => {
              const restaurant = getRestaurantsToDisplay().find(
                (r) => r.id === id
              );
              if (restaurant) handleRestaurantClick(restaurant.id);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
