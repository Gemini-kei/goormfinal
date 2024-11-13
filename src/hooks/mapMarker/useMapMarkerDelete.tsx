import { axiosInstance } from "@/components/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PostLocationsGroupsIdResponseList } from "@/lib/groupType";
import { LocationData } from "@/lib/groupType";

export type ApiResponse<T> = {
  code: number;
  status: string;
  message: string;
  data: T;
};

export const markerDelete = async (
  locationId: number
): Promise<LocationData> => {
  const response = await axiosInstance.patch<ApiResponse<LocationData>>(
    `/locations/${locationId}/delete`
  );
  console.log("위치삭제", response.data)
  return response.data.data; // 서버에서 반환되는 응답
};

export const useDeleteMarker = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (locationId: number) => {
      const {id} = await markerDelete(locationId);
      return id;
    },
    onSuccess: (deletedMarkerId) => {
      queryClient.setQueryData<PostLocationsGroupsIdResponseList>(
        ["locations"],
        (oldMarkers = []) => oldMarkers.filter((marker) => marker.id !== deletedMarkerId)    
        
      );
      console.log("위치삭제 성공");
    },

    onError: (error) => {
      console.error("Image upload failed:", error);
    },
  });
};
