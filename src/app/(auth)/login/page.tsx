"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CloseEyeicon,
  KaKaoButtonSmall,
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
    <div className="flex w-full h-screen items-start justify-center">
      <div className="flex flex-col items-center justify-start mt-10 pd-5 space-y-5 w-[700px] h-[700px] bg-white text-black">
        <h1 className="text-2xl">로그인</h1>
        <form className="flex flex-col space-y-2" onSubmit={handleLogin}>
          <Input
            labelName="이메일"
            right={null}
            error={""}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength={22}
            placeholder="이메일 주소"
          />

          <Input
            labelName="비밀번호"
            right={
              <button type="button" onClick={toggleShowPassword}>
                {showPassword ? <CloseEyeicon /> : <OpenEyeicon />}
              </button>
            }
            error=""
            type={showPassword ? "password" : "text"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="비밀번호"
          />

          <div className="flex flex-col min-h-20">
            <button type="submit">로그인</button>
          </div>
        </form>
        <div className="flex flex-col min-h-20">
          <Link href="/signup">회원가입</Link>
        </div>
        <KakaoLoginButton />
        <button type="button">
          <KaKaoButtonSmall />
        </button>
      </div>
    </div>
  );
}
