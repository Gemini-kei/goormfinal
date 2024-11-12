import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  PostLocationsGroupsIdRequest,
  PostLocationsGroupsIdResponseList,
} from "@/lib/groupType";
import { axiosInstance } from '@/components/axiosInstance';

export type ApiResponse<T> = {
  code: number;
  status: string;
  message: string;
  data: T;
};

const addMarker = async (
  marker: PostLocationsGroupsIdRequest,
  groupId: number
): Promise<PostLocationsGroupsIdResponseList> => {
  // const groupId = groupId
  const response = await axiosInstance.post<
    ApiResponse<PostLocationsGroupsIdResponseList>
  >(`/locations/groups/${groupId}`, marker); // 마커 추가 API 호출
  //console.log(response.data.data)
  return response.data.data; // 새 마커 데이터 반환
};

export const useAddMarkerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    PostLocationsGroupsIdResponseList,
    Error,
    { marker: PostLocationsGroupsIdRequest; groupId: number }
  >({
    mutationFn: ({ marker, groupId }) => addMarker(marker, groupId),
    onSuccess: (newMarker) => {
      queryClient.setQueryData<PostLocationsGroupsIdResponseList[]>(
        ["locations"],
        (oldMarkers = []) => [...oldMarkers, newMarker]
      );
      console.log("업로드 성공")
    },
    onError: (error) => {
      console.error("마커 추가 실패:", error);
      alert("마커 추가 중 문제가 발생했습니다.");
    },
  });
};
