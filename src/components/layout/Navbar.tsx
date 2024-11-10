"use client";

// import { useLogout } from "@/hooks/useLogout";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function NavBar() {
  const { isLogin, logout } = useAuth(); // useAuth 훅에서 로그인 상태와 로그아웃 함수 가져오기
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout(); // useAuth에서 제공하는 로그아웃 함수 호출
  };

  return (
    <nav className="fixed top-0 z-10 w-full bg-white shadow-md">
      <div className="flex items-center justify-between p-4 lg:px-6">
        {/* Logo */}
        <div>
          <Link href={isLogin ? "/map" : "/"} className="text-xl font-bold text-blue-500">
            PhotoMap
          </Link>
        </div>

        {/* Hamburger menu button for mobile */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
            ☰
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-6">
          {isLogin ? (
            <>
              <Link href="/myinfo" className="text-gray-700 font-semibold hover:text-blue-600 focus:text-blue-600">
                내정보
              </Link>
              <Link
                href="/"
                onClick={handleLogout}
                className="text-gray-700 font-semibold hover:text-red-500 focus:text-red-500"
              >
                로그아웃
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 font-semibold hover:text-blue-600 focus:text-blue-600">
                로그인
              </Link>
              <Link
                href="/signup"
                className="text-black px-4 py-2 rounded-lg font-semibold hover:text-blue-600"
              >
                가입하기
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="lg:hidden flex flex-col items-center bg-gray-100 p-4 space-y-3">
          {isLogin ? (
            <>
              <Link href="/myinfo" className="text-gray-700 font-semibold hover:text-blue-600">
                내정보
              </Link>
              <Link
                href="/"
                onClick={handleLogout}
                className="text-gray-700 font-semibold hover:text-red-500"
              >
                로그아웃
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-700 font-semibold hover:text-blue-600">
                로그인
              </Link>
              <Link
                href="/signup"
                className=" text-black px-4 py-2 rounded-lg font-semibold hover:bg-blue-600"
              >
                가입하기
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
