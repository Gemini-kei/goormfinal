import axios from "axios";
import { axiosInstance } from "@/components/axiosInstance";
import { GetApiMembersEmailCheckResponse } from "@/lib/authType";
export type ApiResponse<T> = {
  code: number;
  status: string;
  message: string;
  data: T;
};
export const checkEmail = async (
  email: string
): Promise<GetApiMembersEmailCheckResponse> => {
  try {
    const response = await axiosInstance.get<ApiResponse<GetApiMembersEmailCheckResponse>>(
      "/members/check-email",
      {
        params: { email },
      }
      
    );
    
    return response.data.data; // 성공 메시지 반환
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message); // 서버 오류 메시지 전달
    }
    throw new Error("네트워크 오류가 발생했습니다."); // 네트워크 오류 메시지
  }
};
