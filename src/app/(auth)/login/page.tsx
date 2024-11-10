"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CloseEyeicon,
  OpenEyeicon,
} from "@/components/icons/icons";
import Input from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import KakaoLoginButton from "@/hooks/useSocialLogin";

export default function Login() {
  // const [email, setEmail] = useState("");
  // const [error, setError] = useState("");

  // const [password, setPassword] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(true);

  const { login } = useAuth();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // name 속성을 키로 사용하여 상태 업데이트
    });
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    login({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="flex w-full h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-start p-8 space-y-6 w-[400px] bg-white text-black rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800">로그인</h1>
        <p className="text-sm text-gray-600">계정 정보를 입력해주세요.</p>
        <form className="flex flex-col space-y-4 w-full" onSubmit={handleLogin}>
          <Input
            labelName="이메일"
            right={null}
            error={""}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            // required
            maxLength={22}
            placeholder="이메일 주소"
          />

          <Input
            labelName="비밀번호"
            right={
              <button
                type="button"
                onClick={toggleShowPassword}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <CloseEyeicon /> : <OpenEyeicon />}
              </button>
            }
            error=""
            type={showPassword ? "password" : "text"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            // required
            placeholder="비밀번호"
          />
          {/* <div className="flex justify-between items-center text-sm text-gray-500">
            <Link href="/reset-password" className="hover:text-blue-500">
              비밀번호를 잊으셨나요?
            </Link>
          </div> */}
          <div className="flex flex-col min-h-20">
            <button type="submit" className='w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50'>로그인</button>
          </div>
        </form>

        <p className="text-sm text-gray-500">계정이 없으신가요? <Link href="/signup" className="text-blue-500 hover:underline">회원가입</Link></p>

        <KakaoLoginButton />
      </div>
    </div>
  );
}
