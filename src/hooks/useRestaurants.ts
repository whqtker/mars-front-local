// src/hooks/useRestaurants.ts
import { useState, useEffect } from "react";
import { restaurantService } from "../api/services/restaurantService";
import type { Restaurant } from "../types";

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await restaurantService.getRecommended();
      setRestaurants(response.data);
    } catch (err) {
      setError("맛집 정보를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return { restaurants, loading, error, refetch: fetchRestaurants };
};
