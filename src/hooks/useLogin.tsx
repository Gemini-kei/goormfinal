"use client"

import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axiosInstance';
import { PostApiMembersLoginRequest, GetApiMembersSignUpResponse } from '@/lib/authType'; 

const Login = async (loginData: PostApiMembersLoginRequest) => {
  const API_URL = "/members/login"
  const response = await axiosInstance.post<GetApiMembersSignUpResponse>(API_URL,loginData);
  const accessToken = response.headers['authorization']?.split(' ')[1];
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken); // 로컬스토리지에 저장
    
  }
  return response.data;
}

export const useLogin = () => {
  
  return useMutation<GetApiMembersSignUpResponse, Error, PostApiMembersLoginRequest>({
    mutationFn:Login
  })
}
