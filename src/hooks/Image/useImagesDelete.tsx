import { axiosInstance } from "@/components/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostPhotosPhotoIdResponseList } from "@/lib/photoType";
import { PostPhotosPhotoIdResponse } from '@/lib/photoType';

export type ApiResponse<T> = {
  code: number;
  status: string;
  message: string;
  data: T;
};

export const imageDelete = async (photoId: number): Promise<PostPhotosPhotoIdResponse> => {
  
  const response = await axiosInstance.patch<
  ApiResponse<PostPhotosPhotoIdResponse>
>(
    `/photos/${photoId}/delete`,
    
  );
  
  return response.data.data; // 서버에서 반환되는 응답
};

export const useDeleteImage = (locationId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (photoId: number) =>{
      
      const { id } = await imageDelete(photoId)
      
      return id
    }, 
    onSuccess: (deletedImageId: number) => {
      queryClient.setQueryData<PostPhotosPhotoIdResponseList>(
        ["images", locationId],
        (oldImages = []) => 
          oldImages.filter((image) => image.id !== deletedImageId)
      )
    },

    onError: (error) => {
      console.error("Image upload failed:", error);
    },
  });
};
