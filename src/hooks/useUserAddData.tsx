// import { useQuery } from '@tanstack/react-query';
// import { axiosInstance } from '@/components/axiosInstance';

// // 추가 데이터 요청 함수
// const fetchUserAdditionalData = async (userId: string) => {
//   const response = await axiosInstance.get(`/user/${userId}/data`);
//   return response.data;
// };

// // 추가 데이터 요청 훅
// export const useFetchUserAdditionalData = (userId: string) => {
//   return useQuery({
//     queryKey:['userAdditionalData', userId],
//     queryFn:() => fetchUserAdditionalData(userId), 
//     enabled: !!userId,  // userId가 있을 때만 실행
//   });
// };
