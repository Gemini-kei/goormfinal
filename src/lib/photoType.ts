

export type PostPhotosPhotoIdRequest = {
  uploadStatus: boolean
}
export type PostPhotosPhotoIdResponse = {
  id: number;
  memberId: number;
  locationId: number;
  fileName: string;
  fileExtension: string;
  fileKey: string;
  url: string;
  uploadStatus: boolean
}

export type PostPhotosPhotoIdResponseList = PostPhotosPhotoIdResponse[]

export type GetPhotosRequestBody = {
  accessToken:string;
}

export type PatchPhotosPhotoId = {
  locationId: number
}