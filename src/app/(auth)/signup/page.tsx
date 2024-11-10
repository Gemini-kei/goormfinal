"use client";

import { useSignUp } from "@/hooks/useSignup";
import { useState } from "react";
import { CloseEyeicon, OpenEyeicon } from "@/components/icons/icons";
import Input from "@/components/Input";
import { validateField } from "@/components/auth/authValidate";
// import { checkEmail } from "@/hooks/useCheckEmail";
import EmailModal from "@/components/emailCheckModal";
// import { useAuth } from '@/context/AuthContext';

export default function SignUp() {
  // const { login } = useAuth();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [showPassword, setShowPassword] = useState(true);
  const [emailCheckMessage, setEmailCheckMessage] = useState<string | null>(
    null
  );
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const signUpMutation = useSignUp();

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const error = validateField(name, value, formValues.password);
    if (name === "confirmPassword" && formValues.password !== value) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "비밀번호가 일치하지 않습니다.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const isButtonDisabled =
    !isEmailValid ||
    Object.values(errors).some((error) => error !== "") ||
    Object.values(formValues).some((value) => value === "");

  const handleCheckEmail = () => {
    setIsEmailValid(true);
    setEmailCheckMessage("테스트");
    setModalOpen(true);
  };
  // const handleCheckEmail = async () => {
  //   try {
  //     const message = await checkEmail(formValues.email);
  //     setEmailCheckMessage(message);
  //     setIsEmailValid(true);
  //   } catch (error) {
  //     setEmailCheckMessage((error as Error).message);
  //     setIsEmailValid(false);
  //   } finally {
  //     setModalOpen(true);
  //   }
  // };

  const handleSignUp: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const { email, password, name, confirmPassword } = formValues;

    if (isButtonDisabled) return;
    if (password !== confirmPassword) return;

    signUpMutation.mutate({
      email,
      password,
      name,
    });
    // login({ email, password });
  };

  return (
    <div className="flex w-full h-screen items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center justify-start p-10 space-y-6 w-[380px] bg-white text-black rounded-xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">
          회원 가입
        </h1>
        <form
          className="flex flex-col space-y-4 w-full"
          onSubmit={handleSignUp}
        >
          <Input
            labelName="이메일"
            error={errors.email}
            right={
              <button
                type="button"
                onClick={handleCheckEmail}
                className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                중복확인
              </button>
            }
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="이메일 주소"
          />
          <EmailModal
            isOpen={modalOpen}
            onClose={() => {
              setModalOpen(false);
              setEmailCheckMessage(null); // 메시지 초기화
            }}
            message={emailCheckMessage || ""}
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
            error={errors.password}
            type={showPassword ? "password" : "text"}
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            placeholder="비밀번호 4자 이상 입력하세요"
          />

          <Input
            labelName="비밀번호 확인"
            right={null}
            error={errors.confirmPassword}
            type={showPassword ? "password" : "text"}
            id="confirmPassword"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
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
            value={formValues.name}
            onChange={handleChange}
            required
            placeholder="이름"
          />

          <button
            type="submit"
            disabled={isButtonDisabled}
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:opacity-50 shadow-md"
          >
            가입하고 시작하기
          </button>
        </form>
      </div>
    </div>
  );
}
