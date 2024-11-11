import { useQuery } from "@tanstack/react-query";
import { PostLocationsGroupsIdResponseList } from "@/lib/groupType";
import { axiosInstance } from "@/components/axiosInstance";

const fetchMarkers = async (
  accessToken: string | null
): Promise<PostLocationsGroupsIdResponseList> => {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  const response = await axiosInstance.get<PostLocationsGroupsIdResponseList>(
    "/markers",
    {headers}
  );
  return response.data;
};
export const useMarkersLoad = (accessToken: string | null) => {
  return useQuery<PostLocationsGroupsIdResponseList>({
    queryKey: ["markers", accessToken],
    queryFn: () => fetchMarkers(accessToken),
    enabled: !!accessToken,
    // staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 유지
    refetchOnWindowFocus: false,
    // initialData: { userId: Number(userId), locations: [] },
  });
};
