import { useDeleteMarker } from '@/hooks/mapMarker/useMapMarkerDelete';

const MarkerDelete = ({
  locationId,
  onClose,
}: {
  locationId: number;
  onClose: () => void;
}) => {
  const deleteMutation = useDeleteMarker();
  
  
  const handleDelete = () => {
    console.log("테스트")
    deleteMutation.mutate(locationId, {
        onSuccess: () => {
  
          onClose();
        }
      })
    }



  return (
    <div className="flex justify-center w-full">
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
      >
        위치삭제
      </button>
    </div>
  );
};

export default MarkerDelete