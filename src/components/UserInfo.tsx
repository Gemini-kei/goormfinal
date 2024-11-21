"use client";

import { useChangePassword } from "@/hooks/user/useChangePassword";
import { useFetchUserInfo } from "@/hooks/user/useUserInfo"; // 가져온 훅
import { useState } from "react";
import { useDeleteAccount } from "@/hooks/user/useUserDelete";

export default function UserInfo() {
  const { data, isLoading, isError } = useFetchUserInfo();
  const changePasswordMutation = useChangePassword();
  const { mutate: deleteAccount } = useDeleteAccount();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);

  if (isLoading) return <p>Loading user info...</p>;
  if (isError || !data) return <p>Error loading user info</p>;

  const { name, email } = data; // 유저 이름, 이메일 데이터

  // 비밀번호 변경 함수
  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword || !newPasswordConfirm) {
      alert("모든 비밀번호 필드를 입력하세요.");
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setPasswordError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    changePasswordMutation.mutate(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          setOldPassword("");
          setNewPassword("");
          setNewPasswordConfirm("");
          setPasswordError(null);
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
    <div className="min-h-screen bg-gray-50">
      {/* 네비게이션 바 아래로 콘텐츠를 밀기 위한 상단 패딩 */}
      <div className="pt-16">
        <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold text-gray-900">유저 정보</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">이메일</span>
              <span className="text-gray-900">{email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">이름</span>
              <span className="text-gray-900">{name}</span>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="현재 비밀번호"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="새 비밀번호"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="새 비밀번호 확인"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              className="w-full p-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <button
              onClick={handlePasswordChange}
              className="w-full bg-green-600 text-white font-medium py-3 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              비밀번호 변경
            </button>
          </div>

          <button
            onClick={handleDeleteAccount}
            className="w-full bg-red-600 text-white font-medium py-3 rounded-lg hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}
