import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/components/axiosInstance";
import { GetApiMembersInfoResponse } from "@/lib/authType";
// 유저 정보 요청 함수
const fetchUserInfo = async (accessToken: string) => {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await axiosInstance.get<GetApiMembersInfoResponse>(
    "/members/info",
    { headers }
  );
  return response.data;
};

// 유저 정보 요청 훅
export const useFetchUserInfo = (accessToken: string) => {
  return useQuery({
    queryKey: ["userInfo", accessToken],
    queryFn: () => fetchUserInfo(accessToken!),
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 재요청 방지
  });
};
