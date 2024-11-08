import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PostLocationsGroupsIdRequest, PostLocationsGroupsIdResponse} from '@/lib/groupType';

const addMarker = async (marker: PostLocationsGroupsIdRequest): Promise<PostLocationsGroupsIdResponse> => {
  const response = await axios.post<PostLocationsGroupsIdResponse>("/api/markers", marker); // 마커 추가 API 호출
  return response.data; // 새 마커 데이터 반환
};


export const useAddMarkerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<PostLocationsGroupsIdResponse, Error, PostLocationsGroupsIdRequest>({
    mutationFn: addMarker, 
    onSuccess: (newMarker) => {
      queryClient.setQueryData<PostLocationsGroupsIdResponse[]>(["markers"], (oldMarkers = []) => [
        ...oldMarkers,
        newMarker,
      ]);
    },
    onError: (error) => {
      console.error("마커 추가 실패:", error);
      alert("마커 추가 중 문제가 발생했습니다.");
    },
  });
};
