import { useState } from "react";
import type { RestaurantDetail } from "../../api/types";
import { restaurantService } from "../../api/services/restaurantService";
import Sidebar from "../layout/Sidebar";
import MapArea from "../map/MapArea";
import RestaurantDetailView from "./RestaurantDetail";
import RecommendedRestaurants from "./RecommendedRestaurants";

const MainPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantDetail | null>(null);

  const handleRestaurantSelect = async (id: number) => {
    try {
      const response = await restaurantService.getById(id);
      setSelectedRestaurant(response);
    } catch (error) {
      console.error("식당 상세 정보 로딩 실패:", error);
    }
  };

  return (
    <div className="relative flex h-[calc(100vh-73px)]">
      <Sidebar onRestaurantSelect={handleRestaurantSelect} />
      <MapArea />
      <div className="flex-1 overflow-y-auto">
        <RecommendedRestaurants />
      </div>
      {selectedRestaurant && (
        <div className="fixed right-0 top-[73px] h-[calc(100vh-73px)]">
          <RestaurantDetailView
            restaurantId={selectedRestaurant.id}
            onClose={() => setSelectedRestaurant(null)}
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
