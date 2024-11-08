"use client";

interface markerGalleryProps {
  name: string
  onClose:() => void
}

export default function GalleryOverlay({ name, onClose }: markerGalleryProps) {
  
  return (
    <div className="p-2 bg-white border border-black rounded-md text-black">
      
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
