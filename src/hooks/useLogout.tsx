"use client"

import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/components/axiosInstance';
import { useRouter } from 'next/navigation';

const Logout = async () => {
  const API_URL = "/logout"
  const response = await axiosInstance.post(API_URL);
  
  return response.data;
}

export const useLogout = () => {
  const router = useRouter();

  return useMutation<void, Error, void>({
    mutationFn:Logout,
    
    onSuccess: () => {
        localStorage.removeItem('accessToken');
        
        
        console.log("logout success");
        router.push('/');

    },
    onError:() => {
      console.log("error");
    },
  })
}
