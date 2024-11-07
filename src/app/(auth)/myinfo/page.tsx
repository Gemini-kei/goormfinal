"use client";

import Input from "@/components/Input";
import { useState } from "react";

export default function MyInfo() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;

  const handleEmailCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!emailCheck.test(value)) {
      setError("유효한 이메일을 입력해주세요");
    } else {
      setError("");
    }
  };

  return (
    <div className="flex w-full h-screen items-start justify-center">
      <div className="flex flex-col items-center justify-start mt-10 pd-5 space-y-20 w-[700px] h-[700px] bg-white text-black">
        <h1 className="text-2xl">내정보</h1>
        <form className="flex flex-col space-y-2">
          <Input
            labelName="이메일"
            right={null}
            error={error}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailCheck}
            required
            maxLength={22}
            placeholder="이메일 주소"
          />
          <Input
            labelName="이메일"
            right={null}
            error=""
            type="text"
            id="name"
            name="name"
            required
            placeholder="이름"
          />
          <Input
            labelName="이메일"
            right={null}
            error=""
            type="password"
            id="password"
            name="password"
            required
            placeholder="기존 비밀번호"
          />
          <Input
            labelName="이메일"
            right={null}
            error=""
            type="password"
            id="changePassword"
            name="changePassword"
            required
            placeholder="변경할 비밀번호 "
          />
          <Input
            labelName="이메일"
            right={null}
            error=""
            type="password"
            id="confirmChangePassword"
            name="confirmChangePassword"
            required
            placeholder="변경할 비밀번호 확인"
          />

          <button type="submit">가입하고 시작하기</button>
        </form>
      </div>
    </div>
  );
}
