import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/components/axiosInstance";
import { GetApiMembersInfoResponse } from "@/lib/authType";
import { useAuth } from '@/context/AuthContext';
// 유저 정보 요청 함수

export type ApiResponse<T> = {
  code: number;
  status: string;
  message: string;
  data: T;
};

const fetchUserInfo = async (accessToken: string):Promise<GetApiMembersInfoResponse> => {
    const response = await axiosInstance.get<ApiResponse<GetApiMembersInfoResponse>>(
    "/members/info",
    {
    headers:{
      Authorization: `Bearer ${accessToken}`,
    }}
  );
  console.log(response.data.data)
  return response.data.data;
};

// 유저 정보 요청 훅
export const useFetchUserInfo = () => {
  const {accessToken } = useAuth();

  return useQuery({
    queryKey: ["userInfo", accessToken],
    queryFn: () => fetchUserInfo(accessToken!),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 재요청 방지
  });
};
