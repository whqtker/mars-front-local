import { useState } from "react";
import Sidebar from "../layout/Sidebar";
import MapArea from "../map/MapArea";
import RestaurantDetail from "../restaurant/RestaurantDetail";
import RecommendedRestaurants from "./RecommendedRestaurants";

const MainPage = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <div className="relative flex h-[calc(100vh-73px)]">
      <Sidebar />
      <MapArea />
      <div className="flex-1 overflow-y-auto">
        <RecommendedRestaurants />
      </div>
      {selectedRestaurant && (
        <div className="fixed right-0 top-[73px] h-[calc(100vh-73px)]">
          <RestaurantDetail
            restaurant={selectedRestaurant}
            onClose={() => setSelectedRestaurant(null)}
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
