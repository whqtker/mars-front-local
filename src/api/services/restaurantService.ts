import { useQuery, useMutation } from "react-query";
import apiClient from "../apiClient";
import type { Restaurant, RestaurantDetail, Review } from "../../types";

export const useRecommendedRestaurants = () => {
  return useQuery<Restaurant[], Error>("recommendedRestaurants", async () => {
    const response = await apiClient.get("/api/v1/restaurant/recommended");
    return response.data.data;
  });
};

export const useRestaurantDetail = (id: number) => {
  return useQuery<RestaurantDetail, Error>(
    ["restaurantDetail", id],
    async () => {
      const response = await apiClient.get(`/api/v1/restaurant/${id}`);
      return response.data.data;
    }
  );
};

export const useRestaurantSearch = (query: string) => {
  return useQuery<Restaurant[], Error>(
    ["restaurantSearch", query],
    async () => {
      const response = await apiClient.get("/api/v1/restaurant/search", {
        params: { query },
      });
      return response.data.data;
    }
  );
};

export const useFavoriteRestaurants = () => {
  return useQuery<Restaurant[], Error>("favoriteRestaurants", async () => {
    const response = await apiClient.get("/api/v1/restaurant/favorites");
    return response.data.data;
  });
};

export const useToggleFavorite = () => {
  return useMutation<void, Error, number>(async (id) => {
    const response = await apiClient.post(`/api/v1/restaurant/${id}/favorite`);
    return response.data.data;
  });
};

export const useRestaurantReviews = (restaurantId: number) => {
  return useQuery<Review[], Error>(
    ["restaurantReviews", restaurantId],
    async () => {
      const response = await apiClient.get(
        `/api/v1/restaurant/${restaurantId}/review`
      );
      return response.data.data;
    }
  );
};

export const useCreateReview = () => {
  return useMutation<Review, Error, { restaurantId: number; data: FormData }>(
    async ({ restaurantId, data }) => {
      const response = await apiClient.post(
        `/api/v1/restaurant/${restaurantId}/review`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    }
  );
};

export const useDeleteReview = () => {
  return useMutation<void, Error, number>(async (reviewId) => {
    const response = await apiClient.delete(`/api/v1/review/${reviewId}`);
    return response.data.data;
  });
};

export const useUpdateReview = () => {
  return useMutation<Review, Error, { reviewId: number; data: FormData }>(
    async ({ reviewId, data }) => {
      const response = await apiClient.patch(
        `/api/v1/review/${reviewId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data;
    }
  );
};

export const getById = async (id: number) => {
  const response = await apiClient.get(`/api/v1/restaurant/${id}`);
  return response.data;
};
