"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useLogout } from "@/hooks/useLogout";

interface AuthContextType {
  isLogin: boolean;
  setIsLogin: (value: boolean) => void;
  login: (loginData: { email: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);

  const loginMutation = useLogin(); // useLogin 훅 사용
  const logoutMutation = useLogout(); // useLogout 훅 사용

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const login =  async (loginData: { email: string; password: string }) => {
    loginMutation.mutate(loginData, {
      onSuccess: (data) => {
        localStorage.setItem("accessToken", data.accessToken); // 로그인 성공 시 토큰 저장
        setIsLogin(true); // 로그인 상태 업데이트
        console.log(isLogin)
      },
      onError: () => {
        console.error("Login failed");
      },
    });
  };

  const logout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        setIsLogin(false); // 로그아웃 상태 업데이트
      },
      onError: () => {
        console.error("Logout failed");
      },
    });
  };

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 커스텀 훅 생성
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
