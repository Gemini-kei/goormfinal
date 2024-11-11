import axios from "axios";
import { axiosInstance } from "@/components/axiosInstance";
import { GetApiMembersEmailCheckResponse } from '@/lib/authType';

export const checkEmail = async (email: string): Promise<GetApiMembersEmailCheckResponse> => {
  console.log(email)
  try {
    const response = await axiosInstance.post<GetApiMembersEmailCheckResponse>("/members/check-email",{email});
    console.log(response.data)
    return response.data; // 성공 메시지 반환
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message); // 서버 오류 메시지 전달
    }
    throw new Error("네트워크 오류가 발생했습니다."); // 네트워크 오류 메시지
  }
};
