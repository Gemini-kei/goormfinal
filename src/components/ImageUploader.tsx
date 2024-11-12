import { useUploadImage } from "@/hooks/useImagesUpload";

const ImageUploader = ({ locationId }: { locationId: number }) => {
  const uploadMutation = useUploadImage(locationId);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileName = file.name; // 전체 파일 이름
      const fileExtension = fileName.split(".").pop() || ""; // 확장자 추출
      console.log("오류 확인 handleupload")
      // 업로드 Mutation 실행
      uploadMutation.mutate({ file, fileName, fileExtension });
    }
  };

  return (
    <div className="flex justify-center w-full">
      <label className="w-full block bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded cursor-pointer">
      사진 추가
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleUpload} 
        className="hidden" 
      />
      </label>
      {uploadMutation.isError && <p className="text-red-500 text-sm mt-2">Error uploading image</p>}
      {uploadMutation.isSuccess && <p className="text-red-500 text-sm mt-2">Image uploaded successfully!</p>}
    </div>
  );
};

export default ImageUploader;
