import { useDeleteImage } from "@/hooks/useImagesDelete";

const ImageDelete = ({
  locationId,
  selectedId,
  onDelete,
}: {
  locationId: number;
  selectedId: number; // 선택된 이미지 ID
  onDelete: () => void;
}) => {
  const deleteMutation = useDeleteImage(locationId);

  const handleDelete = () => {
    deleteMutation.mutate(selectedId, {
      onSuccess: () => {
        onDelete(); // 삭제 성공 후 선택 해제
      },
    });
  };

  return (
    <div className="flex justify-center w-full">
      <button
        onClick={handleDelete}
        className="w-full block bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded cursor-pointer"
      >
        사진 삭제
      </button>
    </div>
  );
};

export default ImageDelete;
