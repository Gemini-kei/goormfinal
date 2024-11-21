
import { axiosInstance } from "@/components/axiosInstance";
import { GetApiMembersInfoResponse } from "@/lib/authType";
import { useAuth } from '@/context/AuthContext';
import { useMutation } from '@tanstack/react-query';

const UserDelete = async (accessToken: string) => {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await axiosInstance.patch<GetApiMembersInfoResponse>(
    "/members/delete",
    { headers }
  );
  return response.data;
};

export const useDeleteAccount = () => {
  const { accessToken, logout } = useAuth(); // logout 함수 포함

  return useMutation({
    mutationFn: async () => {
      if (!accessToken) {
        throw new Error("Access token is missing");
      }
      return UserDelete(accessToken);
    },
    onSuccess: () => {
      alert("회원탈퇴가 성공적으로 완료되었습니다.");
      logout(); // 로그아웃 처리
    },
    onError: (error) => {
      console.error("회원탈퇴 오류:", error);
      alert("회원탈퇴에 실패했습니다. 다시 시도해주세요.");
    },
  });
};