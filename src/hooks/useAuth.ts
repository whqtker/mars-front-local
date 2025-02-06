/*
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/services/authService";
import type { LoginRequest, RegisterRequest } from "../types";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
*/
