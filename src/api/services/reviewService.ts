import apiClient from "../apiClient";
import type { ApiResponse } from "../types";
import type { Review } from "../types";

export const reviewService = {
  async getByRestaurant(restaurantId: number): Promise<ApiResponse<Review[]>> {
    return apiClient.get(`/api/v1/restaurant/${restaurantId}/review`);
  },

  async create(
    restaurantId: number,
    data: FormData
  ): Promise<ApiResponse<Review>> {
    return apiClient.post(`/api/v1/restaurant/${restaurantId}/review`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  async delete(reviewId: number): Promise<ApiResponse<void>> {
    return apiClient.delete(`/api/v1/review/${reviewId}`);
  },

  async update(reviewId: number, data: FormData): Promise<ApiResponse<Review>> {
    return apiClient.patch(`/api/v1/review/${reviewId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
