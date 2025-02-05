import apiClient from "../apiClient";
import type { ApiResponse, LoginRequest, RegisterRequest } from "../../types";

export const authService = {
  async login(
    data: LoginRequest
  ): Promise<ApiResponse<{ accessToken: string }>> {
    const response = await apiClient.post("/auth/login", data);
    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
    }
    return {
      status: response.status,
      message: response.statusText || "Login successful",
      data: response.data,
    };
  },

  async register(data: RegisterRequest): Promise<ApiResponse<void>> {
    const response = await apiClient.post("/auth/register", data);
    return {
      status: response.status,
      message: response.statusText || "Registration successful",
      data: response.data,
    };
  },

  async logout(): Promise<ApiResponse<void>> {
    const response = await apiClient.post("/auth/logout");
    localStorage.removeItem("accessToken");
    return {
      status: response.status,
      message: response.statusText || "Logout successful",
      data: response.data,
    };
  },
};
