import { useState } from "react";
import { Xicon } from "./icons/icons";

type MarkerOverlayProps = {
  onClose: () => void;
  onAddMarker: (markerName:string) => void;
};

export default function MarkerOverlay2({
  onClose,
  onAddMarker,
}: MarkerOverlayProps) {
  
  const [markerName, setMarkerName] = useState("");
  
  return (
    <div className="relative flex-col bg-white p-6 border border-gray-200 rounded-xl shadow-lg w-[320px] space-y-4">
      {/* Close Icon Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-sm"
        aria-label="Close"
      >
        <Xicon />
      </button>

      <h4 className="text-xl font-semibold text-gray-800 text-center">
        위치 추가
      </h4>
      
        <input
          type="text"
          placeholder="이름"
          value={markerName}
          onChange={(e) => setMarkerName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => onAddMarker(markerName)}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          위치 추가
        </button>
      
    </div>
  );
}
