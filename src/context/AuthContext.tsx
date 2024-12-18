"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useLogin } from "@/hooks/auth/useLogin";
// import { useLogout } from "@/hooks/useLogout";
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isLogin: boolean;
  accessToken: string | null;
  setIsLogin: (value: boolean) => void;
  login: (loginData: { email: string; password: string }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();
  const loginMutation = useLogin(); // useLogin 훅 사용
  // const logoutMutation = useLogout(); // useLogout 훅 사용

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
      setIsLogin(true);
    }
  }, []);

  useEffect(() => {
    if (!isLogin) {
      localStorage.removeItem("accessToken")
    }
  },[isLogin])

  const login =  async (loginData: { email: string; password: string }) => {
    loginMutation.mutate(loginData,{
      onSuccess: () => {
          
          setAccessToken(localStorage.getItem('accessToken'))
          setIsLogin(true);
          router.push('/map');
  
      },
      onError:() => {
        console.log("로그인 실패")
      },});
  };

  // const logout = async () => {
  //   logoutMutation.mutate(undefined,{   
  //     onSuccess: () => {
  //         localStorage.removeItem('accessToken');
  //         setAccessToken(null);
  //         setIsLogin(false)
  //         console.log("logout success");
  //         router.push('/');
  
  //     },
  //     onError:() => {
  //       console.log("error");
  //     },});
  // };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(null);
    setIsLogin(false)
    console.log("logout")
    router.push('/');
  }
  return (
    <AuthContext.Provider value={{ isLogin, accessToken, setIsLogin, login, logout }}>
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
