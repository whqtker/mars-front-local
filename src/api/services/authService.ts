import apiClient from "../apiClient";
import type { ApiResponse, LoginRequest, RegisterRequest } from "../../types";

export const authService = {
  // 카카오 로그인
  async kakaoLogin(
    code: string
  ): Promise<ApiResponse<{ accessToken: string }>> {
    const response = await apiClient.get(
      `/api/auth/kakao/callback?code=${code}`
    );
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    return response.data;
  },

  // 구글 로그인
  async googleLogin(
    code: string
  ): Promise<ApiResponse<{ accessToken: string }>> {
    const response = await apiClient.get(
      `/api/auth/google/callback?code=${code}`
    );
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    return response.data;
  },

  // 로그아웃
  async logout(): Promise<ApiResponse<void>> {
    const response = await apiClient.post("/api/auth/logout");
    localStorage.removeItem("accessToken");
    return response.data;
  },
};
