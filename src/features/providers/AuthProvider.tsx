import React, { createContext, useContext, useState, useEffect } from "react";

// 사용자 정보 및 로그인 상태 관리 타입 정의
interface AuthContextType {
  user: { email: string } | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Context 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  // 로그인 함수: 토큰 저장 후 사용자 정보 가져오기
  const login = (token: string) => {
    localStorage.setItem("jwt", token);
    fetchUser(token);
  };

  // 로그아웃 함수: 토큰 삭제
  const logout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
  };

  // JWT를 이용해 사용자 정보 가져오기
  const fetchUser = (token: string) => {
    fetch(import.meta.env.VITE_CORE_API_BASE_URL + "/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("jwt");
        setUser(null);
      });
  };

  // 초기화: 앱 로드 시 JWT 검증
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      fetchUser(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Context를 쉽게 사용하기 위한 커스텀 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
