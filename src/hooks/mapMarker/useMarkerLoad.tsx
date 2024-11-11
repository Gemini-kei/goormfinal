import { useQuery } from "@tanstack/react-query";
import { PostLocationsGroupsIdResponseList } from "@/lib/groupType";
import { axiosInstance } from "@/components/axiosInstance";

const fetchMarkers = async (): Promise<PostLocationsGroupsIdResponseList> => {
  const response = await axiosInstance.get<PostLocationsGroupsIdResponseList>(
    "/locations");
  return response.data;
};
export const useMarkersLoad = () => {
  return useQuery<PostLocationsGroupsIdResponseList>({
    queryKey: ["locations"],
    queryFn: () => fetchMarkers(),
    // enabled: !!accessToken,
    // staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 유지
    refetchOnWindowFocus: false,
    // initialData: { userId: Number(userId), locations: [] },
  });
};
