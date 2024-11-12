import { axiosInstance } from "@/components/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostPhotosPhotoIdResponseList } from "@/lib/photoType";
import axios from 'axios';

export type ApiResponse<T> = {
  code: number;
  status: string;
  message: string;
  data: T;
};

export const confirmUpload = async (locationId: number, uploadStatus: boolean): Promise<PostPhotosPhotoIdResponseList> => {
  
  const response = await axiosInstance.post<
  ApiResponse<PostPhotosPhotoIdResponseList>
>(
    `/photos/locations/${locationId}`,
    uploadStatus
  );
  console.log("오류 확인 업로드 확인")
  return response.data.data; // 서버에서 반환되는 응답
};

export const requestPresignedUrl = async (
  locationId: number,
  fileName: string,
  fileExtension: string
): Promise<PostPhotosPhotoIdResponseList> => {
  console.log("오류 확인 url받기")
  const response = await axiosInstance.post<
    ApiResponse<PostPhotosPhotoIdResponseList>
  >(`/photos/locations/${locationId}/presigned-url`, {
    fileName,
    fileExtension,
  });

  return response.data.data; // { url: string, fields: object, otherInfo: any }
};

export const upLoadToS3 = async (url: string, file: File) => {
  console.log("오류 확인 uploadtoS3")
  const response = await axios.put(url, file
    , {
    headers: {
      "Content-Type" : file.type,
    }
  }
)

  if (response.status === 200) {
    return true;
  } else{
    return false;
  }
}

export const useUploadImage = (locationId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({file, fileName, fileExtension}:{
      file: File;
      fileName: string;
      fileExtension: string;
    }) =>{
      
      const data  = await requestPresignedUrl(locationId, fileName, fileExtension)
      const url = data[0].url

      const uploadStatus = await upLoadToS3(url, file);
      
      return await confirmUpload(locationId, uploadStatus)
    }, 
    onSuccess: (newImages) => {
      // 업로드 성공 시 이미지 목록 갱신
      queryClient.setQueryData<PostPhotosPhotoIdResponseList[]>(
        ["images", locationId],
        (oldImages = []) => [...oldImages, newImages]
      );
    },

    onError: (error) => {
      console.error("Image upload failed:", error);
    },
  });
};
