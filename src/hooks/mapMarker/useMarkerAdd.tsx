import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PostLocationsGroupsIdRequest, PostLocationsGroupsIdResponseList} from '@/lib/groupType';

const addMarker = async (marker: PostLocationsGroupsIdRequest): Promise<PostLocationsGroupsIdResponseList> => {
  const response = await axios.post<PostLocationsGroupsIdResponseList>("/api/markers", marker); // 마커 추가 API 호출
  return response.data; // 새 마커 데이터 반환
};


export const useAddMarkerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<PostLocationsGroupsIdResponseList, Error, PostLocationsGroupsIdRequest>({
    mutationFn: addMarker, 
    onSuccess: (newMarker) => {
      queryClient.setQueryData<PostLocationsGroupsIdResponseList[]>(["markers"], (oldMarkers = []) => [
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
