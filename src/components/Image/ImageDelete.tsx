import { useDeleteImage } from "@/hooks/Image/useImagesDelete";
import { TrashBin } from '../icons/icons';

const ImageDelete = ({
  locationId,
  selectedIds,
  onDelete,
}: {
  locationId: number;
  selectedIds: number[]; // 선택된 이미지 ID
  onDelete: () => void;
}) => {
  const deleteMutation = useDeleteImage(locationId);

  const handleDelete = () => {
    if(selectedIds.length === 0) {
      alert("삭제할 이미지를 선택하세요.");
      return;
    }

    selectedIds.forEach((id) => {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          onDelete();
        }
      })
    })
    
  };

  return (
    <div className="flex justify-center w-full">
      <button
        onClick={handleDelete}
        className="w-full block bg-red-500 hover:bg-red-600 text-white text-center py-2 rounded cursor-pointer"
      >
        <TrashBin />
      </button>
    </div>
  );
};

export default ImageDelete;
