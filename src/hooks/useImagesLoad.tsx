import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/components/axiosInstance";
import { PostPhotosPhotoIdResponseList } from "@/lib/photoType";

export type ApiResponse<T> = {
  code: number;
  status: string;
  message: string;
  data: T;
};

export const fetchImages = async (
  locationId: number
): Promise<PostPhotosPhotoIdResponseList> => {
  const response = await axiosInstance.get<
    ApiResponse<PostPhotosPhotoIdResponseList>
  >(`/photos/locations/${locationId}`);
  return response.data.data;
};

export const useImagesLoad = (locationId: number) => {
  return useQuery<PostPhotosPhotoIdResponseList>({
    queryKey: ["images", locationId], // Query Key 설정
    queryFn: () => fetchImages(locationId),
    enabled: !!locationId,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선 유지
  });
};
