import { axiosInstance } from "@/components/axiosInstance";
import { PostInvitationsAcceptsResponse } from "@/lib/groupType";
import { useQuery } from '@tanstack/react-query';

export type ApiResponse<T> = {
  code: number;
  status: string;
  message: string;
  data: T;
};

export const groupInvitation = async (
  groupToken: string
): Promise<PostInvitationsAcceptsResponse> => {
  const response = await axiosInstance.post<ApiResponse<PostInvitationsAcceptsResponse>>("/invitations/accept", groupToken);

  return response.data.data; // 성공 메시지 반환
};


export const useGroupInvitation = (groupToken:string) => {
  return useQuery({
    queryKey: ["groupToken"],
    queryFn: () => groupInvitation(groupToken!),
    enabled: !!groupToken,
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터 재요청 방지
  });

}