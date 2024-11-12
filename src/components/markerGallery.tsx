"use client";

import { useImagesLoad } from '@/hooks/useImagesLoad';
interface markerGalleryProps {
  name: string
  locationId: number
  onClose:() => void
}

export default function GalleryOverlay({ name, locationId, onClose }: markerGalleryProps) {
  const { data, isLoading, isError } = useImagesLoad(locationId);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading photo</p>;
  
  return (
    <div className="p-2 bg-white border border-black rounded-md text-black">
      <div className="grid grid-cols-2 gap-4">
      {data?.map((image) => (
        <img
          key={image.id}
          src={image.url}
          alt={image.fileName}
          className="w-full h-auto rounded shadow"
        />
      ))}
    </div>
      
      <h4>{name}</h4>
    
      <button
        onClick={onClose}
        className="mt-1 cursor-pointer bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
      >
        닫기
      </button>
    </div>
  );
}
