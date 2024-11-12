import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/components/axiosInstance";
import { GetApiMembersInfoResponse } from "@/lib/authType";
import { useAuth } from '@/context/AuthContext';

const ChangePassword = async (
  accessToken: string,
  passwords: { oldPassword: string; newPassword: string }
):Promise<GetApiMembersInfoResponse> => {
  const { oldPassword, newPassword } = passwords;
  const response = await axiosInstance.patch<GetApiMembersInfoResponse>(
    "/members/password",
    { oldPassword, newPassword},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};

export const useChangePassword = () => {
  const {accessToken } = useAuth();
  return useMutation({
    mutationFn: (passwords: { oldPassword: string; newPassword: string }) => {
      if (!accessToken) {
        throw new Error("Access token is missing");
      }
      return ChangePassword(accessToken, passwords);
    },
    onSuccess: () => {
      alert("비밀번호가 성공적으로 변경되었습니다.");
    },
    onError: (error) => {
      console.error("비밀번호 변경 오류:", error);
      alert("비밀번호 변경에 실패했습니다.");
    },
  });
  // return useMutation<GetApiMembersInfoResponse>({
  //   mutationFn: (passwords: { oldPassword: string; newPassword: string }) => {
  //     if (!accessToken){
  //       throw new Error("Access token is missing");
  //     }
  //     return ChangePassword(accessToken!,passwords);
  //   }, 

  //   onSuccess: () => {
  //     alert("비밀번호가 성공적으로 변경되었습니다.");
  //   },
  //   onError: (error) => {
  //     console.error("비밀번호 변경 오류:", error);
  //     alert("비밀번호 변경에 실패했습니다.");
  //   },
  // });
};
