"use client";

interface markerOverlayProps {
  onClose: () => void;
  onRegister: () => void;
}

export default function MarkerOverlay({ onClose, onRegister }: markerOverlayProps) {
  
  return (
    <div className="p-2 bg-white border border-black rounded-md text-black">
      <button className='' onClick={onRegister}>
        새 마커 위치
      </button>
      
      <button
        onClick={onClose}
        className="mt-1 cursor-pointer bg-gray-200 hover:bg-gray-300 text-sm px-3 py-1 rounded"
      >
        닫기
      </button>
    </div>
  );
}
