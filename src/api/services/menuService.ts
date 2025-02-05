import { apiClient } from "../apiClient";
import type { ApiResponse } from "../types";
import type { MenuItem } from "../types";

export const menuService = {
  // 식당 메뉴 조회: GET /api/v1/restaurant/{restaurant_id}/menu
  async getMenu(restaurantId: number): Promise<ApiResponse<MenuItem[]>> {
    return apiClient.get(`/api/v1/restaurant/${restaurantId}/menu`);
  },

  // 식당 메뉴 등록: POST /api/v1/restaurant/{restaurant_id}/menu
  async createMenu(
    restaurantId: number,
    data: MenuItem
  ): Promise<ApiResponse<MenuItem>> {
    return apiClient.post(`/api/v1/restaurant/${restaurantId}/menu`, data);
  },

  // 메뉴 삭제: DELETE /api/v1/menu/{menu_id}
  async deleteMenu(menuId: number): Promise<ApiResponse<void>> {
    return apiClient.delete(`/api/v1/menu/${menuId}`);
  },

  // 메뉴 수정: PATCH /api/v1/menu/{menu_id}
  async updateMenu(
    menuId: number,
    data: Partial<MenuItem>
  ): Promise<ApiResponse<MenuItem>> {
    return apiClient.patch(`/api/v1/menu/${menuId}`, data);
  },
};
