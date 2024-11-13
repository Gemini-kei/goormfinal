import { axiosInstance } from "@/components/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostPhotosPhotoIdResponseList } from "@/lib/photoType";
import { PostPhotosPhotoIdResponse } from "@/lib/photoType";
import axios from "axios";

export type ApiResponse<T> = {
  code: number;
  status: string;
  message: string;
  data: T;
};

export const confirmUpload = async (
  photoId: number,
  uploadStatus: boolean
): Promise<PostPhotosPhotoIdResponseList> => {
  const response = await axiosInstance.post<
    ApiResponse<PostPhotosPhotoIdResponseList>
  >(`/photos/${photoId}`, { uploadStatus });

  return response.data.data; // 서버에서 반환되는 응답
};

export const requestPresignedUrl = async (
  locationId: number,
  fileName: string,
  fileExtension: string
): Promise<PostPhotosPhotoIdResponse> => {
  const response = await axiosInstance.post<
    ApiResponse<PostPhotosPhotoIdResponse>
  >(`/photos/locations/${locationId}`, {
    fileName,
    fileExtension,
  });
  
  return response.data.data; // { url: string, fields: object, otherInfo: any }
};

export const upLoadToS3 = async (url: string, file: File) => {
  const response = await axios.put(url, file, {
    headers: {
      "Content-Type": file.type,
    },
  });

  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
};

export const useUploadImage = (locationId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      file,
      fileName,
      fileExtension,
    }: {
      file: File;
      fileName: string;
      fileExtension: string;
    }) => {
      const { url, id } = await requestPresignedUrl(
        locationId,
        fileName,
        fileExtension
      );

      console.log("S3보낼거",url, file)
      const uploadStatus = await upLoadToS3(url, file);
      // const uploadStatus = true

      return await confirmUpload(id, uploadStatus);
    },
    onSuccess: (newImages) => {
      // 업로드 성공 시 이미지 목록 갱신
      console.log("이미지", newImages);

      queryClient.setQueryData<PostPhotosPhotoIdResponseList[]>(
        ["images", locationId],
        (oldImages = []) => [...oldImages, newImages]
      );
      console.log("업로드 성공시");
    },

    onError: (error) => {
      console.error("Image upload failed:", error);
    },
  });
};
