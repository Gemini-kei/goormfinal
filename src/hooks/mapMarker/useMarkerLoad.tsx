import { useQuery } from "@tanstack/react-query";
import { PostLocationsGroupsIdResponse } from '@/lib/groupType';
import { axiosInstance } from '@/components/axiosInstance';

const fetchMarkers = async (userId: string): Promise<PostLocationsGroupsIdResponse> => {
  const response = await axiosInstance.get<PostLocationsGroupsIdResponse>("/markers", {
    params: { userId }, // userId를 쿼리 파라미터로 전달
  });
  return response.data;
};
export const useMarkersLoad = (userId: string) => {
  return useQuery({
    queryKey: ["markers", userId],
    queryFn: () => fetchMarkers(userId),
    // staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 유지
    refetchOnWindowFocus: false,
    // initialData: { userId: Number(userId), locations: [] },
  });
};
