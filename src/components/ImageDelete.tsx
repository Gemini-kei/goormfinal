import { useUploadImage } from "@/hooks/useImagesUpload";

const ImageDelete = ({ locationId }: { locationId: number }) => {
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
      <label className="w-full block bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded cursor-pointer">
      사진 삭제
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleUpload} 
        className="hidden" 
      />
      </label>
      
    </div>
  );
};

export default ImageDelete;
