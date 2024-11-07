"use client"

import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axiosInstance';
import { PostApiMembersLoginRequest, GetApiMembersSignUpResponse } from '@/lib/authType'; 
import { useRouter } from 'next/navigation';

const Login = async (loginData: PostApiMembersLoginRequest) => {
  const API_URL = "/login"
  const response = await axiosInstance.post<GetApiMembersSignUpResponse>(API_URL,loginData);
  
  return response.data;
}

export const useLogin = () => {
  const router = useRouter();

  return useMutation<GetApiMembersSignUpResponse, Error, PostApiMembersLoginRequest>({
    mutationFn:Login,
    onSuccess: (data) => {
        localStorage.setItem('accessToken', data.accessToken)
        console.log("success", data);
        router.push('/map');

    },
    onError:() => {
      console.log("error");
    },
  })
}
