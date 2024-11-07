"use client";

import { useSignUp } from "@/hooks/useSignup";
import { useState } from "react";
import { CloseEyeicon, OpenEyeicon } from "@/components/icons/icons";
import Input from "@/components/Input";

const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
const passwordCheck = /^.{4,}$/;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  new FormData
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signUpMutation = useSignUp();

  const [error, setError] = useState("필수입력");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // HandleCheck 호출하여 에러 메시지를 설정
    if (e.target.name === "email") {
      setEmail(value);
      if (!emailCheck.test(value)) {
        setError("유효한 이메일을 입력해주세요");
      } else {
        setError("");
      }
    } else if (e.target.name === "password") {
      setPassword(value);
      if (!passwordCheck.test(value)) {
        setError("유효한 비밀번호를 입력해주세요");
      } else {
        setError("");
      }
    } else if (e.target.name === "confirmPassword") {
      if (password === value) {
        setError("비밀번호가 다릅니다.");
      } else {
        setError("");
      }
    }
  };

  const isButtonDisabled = !!error;

  const handleSignUp: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const name = formData.get("name");

    if (isButtonDisabled) {
      return;
    }

    if (!email || !name || !password) {
      return;
    }
    if (password !== confirmPassword) {
      return;
    }
    if (
      typeof email !== "string" ||
      typeof name !== "string" ||
      typeof password !== "string"
    ) {
      return;
    }

    signUpMutation.mutate({
      email: email,
      password: password,
      name: name,
    });
  };

  // 웹 접근성
  //

  return (
    <div className="flex w-full h-screen items-start justify-center">
      <div className="flex flex-col items-center justify-start mt-10 pd-5 space-y-20 w-[700px] h-[700px] bg-white text-black">
        <h1 className="text-2xl">회원 가입</h1>
        <form className="flex flex-col space-y-2" onSubmit={handleSignUp}>
          <Input
            labelName="이메일"
            error={error}
            right={
              <button type="button" className="">
                중복확인
              </button>
            }
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="이메일 주소"
          />

          <Input
            labelName="비밀번호"
            right={
              <button type="button" onClick={toggleShowPassword}>
                {showPassword ? <CloseEyeicon /> : <OpenEyeicon />}
              </button>
            }
            error={error}
            type={showPassword ? "password" : "text"}
            id="password"
            name="password"
            onChange={handleChange}
            required
            placeholder="비밀번호 4자 이상 입력하세요"
          />

          <Input
            labelName="비밀번호 확인"
            right={null}
            error={error}
            type={showPassword ? "password" : "text"}
            id="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            required
            placeholder="비밀번호 확인"
          />

          <Input
            labelName="이름"
            right={null}
            error=""
            type="text"
            id="name"
            name="name"
            required
            placeholder="이름"
          />

          <button type="submit" disabled={isButtonDisabled}>
            가입하고 시작하기
          </button>
        </form>
      </div>
    </div>
  );
}
