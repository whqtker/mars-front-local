// src/hooks/useRestaurants.ts
import { useState, useEffect } from "react-query";
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

// src/hooks/useAuth.ts
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/services/authService";
import type { LoginRequest, RegisterRequest } from "../api/types";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (credentials: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);
      await authService.login(credentials);
      navigate("/");
    } catch (err) {
      setError("로그인에 실패했습니다.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setLoading(true);
      setError(null);
      await authService.register(data);
      navigate("/");
    } catch (err) {
      setError("회원가입에 실패했습니다.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login, register };
};
