import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PostLocationsGroupsIdRequest, PostLocationsGroupsIdResponseList} from '@/lib/groupType';

export type ApiResponse<T> = {
  code: number;
  status: string;
  message: string;
  data: T;
};


const addMarker = async (marker: PostLocationsGroupsIdRequest,  groupId:number): Promise<PostLocationsGroupsIdResponseList> => {
  // const groupId = groupId
  const response = await axios.post<ApiResponse<PostLocationsGroupsIdResponseList>>(`/api/locations/groups/${groupId}`, marker); // 마커 추가 API 호출
  return response.data.data; // 새 마커 데이터 반환
};


export const useAddMarkerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<PostLocationsGroupsIdResponseList, Error, {marker:PostLocationsGroupsIdRequest, groupId:number}>({
    mutationFn:  ({marker, groupId}) => addMarker(marker,groupId), 
    onSuccess: (newMarker) => {
      queryClient.setQueryData<PostLocationsGroupsIdResponseList[]>(["locations"], (oldMarkers = []) => [
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
