import { useQuery } from "@tanstack/react-query";
import { PostLocationsGroupsIdResponseList } from "@/lib/groupType";
import { axiosInstance } from "@/components/axiosInstance";
import { useAuth } from '@/context/AuthContext';

const fetchMarkers = async (accessToken: string): Promise<PostLocationsGroupsIdResponseList> => {
  const response = await axiosInstance.get<PostLocationsGroupsIdResponseList>(
    "/locations",
  {
    headers:{
      Authorization: `Bearer ${accessToken}`,
    }
  });
  return response.data;
};
export const useMarkersLoad = () => {
  const {accessToken } = useAuth();

  return useQuery<PostLocationsGroupsIdResponseList>({
    queryKey: ["locations"],
    queryFn: () => fetchMarkers(accessToken!),
    enabled: !!accessToken,
    // staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 유지
    refetchOnWindowFocus: false,
    // initialData: { userId: Number(userId), locations: [] },
  });
};
