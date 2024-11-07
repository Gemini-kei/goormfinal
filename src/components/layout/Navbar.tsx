"use client";

// import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";
// import { useState, useEffect } from "react";
import { useAuth } from '@/context/AuthContext';

export default function NavBar() {
  const { isLogin, logout } = useAuth(); // useAuth 훅에서 로그인 상태와 로그아웃 함수 가져오기

  const handleLogout = () => {
    logout(); // useAuth에서 제공하는 로그아웃 함수 호출
  };

  return (
    
    <nav className="flex items-center justify-between p-4 lg:px-6 bg-white text-black">
      
      <div>
        <Link href="/">PhotoMap</Link>
        
      </div>
      
      <div className="flex items-center space-x-4">
        
        {isLogin ? (
          <div className="flex items-center space-x-4">
            <Link href="/myinfo" className="hover:text-gray-700">
              내정보
            </Link>
            <Link href="/" onClick={handleLogout}>
              로그아웃
            </Link>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/login" className="hover:text-gray-700">
              로그인
            </Link>
            <Link href="/signup">가입하기</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
