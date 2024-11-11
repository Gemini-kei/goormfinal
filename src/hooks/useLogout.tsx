"use client";

import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/components/axiosInstance";

const Logout = async () => {
  const API_URL = "/members/logout";
  const response = await axiosInstance.post(API_URL);

  return response.data;
};

export const useLogout = () => {
  return useMutation<void, Error, void>({
    mutationFn: Logout,
  });
};
