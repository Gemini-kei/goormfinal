"use client";

import { useChangePassword } from '@/hooks/useChangePassword';
import { useFetchUserInfo } from "@/hooks/useUserInfo"; // 가져온 훅
import { useState, useEffect } from "react";
import { useDeleteAccount } from '@/hooks/useUserDelete';

export default function UserInfo() {
  
  const { data, isLoading, isError } = useFetchUserInfo();
  const changePasswordMutation = useChangePassword();
  const { mutate: deleteAccount } = useDeleteAccount();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordChangeVisible, setIsPasswordChangeVisible] = useState(false);

  if (isLoading) return <p>Loading user info...</p>;
  if (isError || !data) return <p>Error loading user info</p>;

  const { name, email } = data; // 유저 이름, 이메일 데이터

  // 비밀번호 변경 함수
  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword) {
      alert("모든 비밀번호 필드를 입력하세요.");
      return;
    }

    changePasswordMutation.mutate(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          setOldPassword("");
          setNewPassword("");
          setIsPasswordChangeVisible(false);
        },
      }
    );
  };

  // 회원탈퇴 함수
  const handleDeleteAccount = () => {
    const confirmDelete = confirm("정말로 회원탈퇴를 진행하시겠습니까?");
    if (!confirmDelete) return;
    deleteAccount();
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">유저 정보</h2>
      <p>
        <strong>이메일:</strong> {email}
      </p>
      <p>
        <strong>이름:</strong> {name}
      </p>

      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setIsPasswordChangeVisible((prev) => !prev)}
      >
        비밀번호 변경
      </button>

      {isPasswordChangeVisible && (
        <div className="mt-4">
          <input
            type="password"
            placeholder="현재 비밀번호"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={handlePasswordChange}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            비밀번호 변경
          </button>
        </div>
      )}

      <button
        onClick={handleDeleteAccount}
        className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        회원탈퇴
      </button>
    </div>
  );
}
