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
      queryClient.setQueryData<PostPhotosPhotoIdResponseList[]>(
        ["images", locationId],
        (oldImages = []) => {
          // 데이터 구조 확인을 위한 콘솔 출력
          console.log("oldImages:", oldImages); // oldImages가 배열인지 확인
          console.log("deletedImageId:", deletedImageId); // 삭제할 ID 확인
      
          if (!Array.isArray(oldImages)) {
            console.error("oldImages is not an array.");
            return [];
          }
      
          // 각 항목의 구조를 확인
          oldImages.forEach((image, index) => {
            console.log(`Image at index ${index}:`, image);
          });
          return []
          // return trueoldImages.filter((image) => image.id !== deletedImageId);
        }
      );
      
      // 삭제 성공 시 이미지 목록 갱신
      // queryClient.setQueryData<PostPhotosPhotoIdResponseList[]>(
      //   ["images", locationId],
      //   (oldImages = []) => oldImages.filter((image)=> image[0].id image.id !== deletedImageId)
        
      // );
      
    },

    onError: (error) => {
      console.error("Image upload failed:", error);
    },
  });
};
