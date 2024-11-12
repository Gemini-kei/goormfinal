import { useState } from "react";
import { Xicon } from "./icons/icons";
import { useAddMarkerMutation } from '@/hooks/mapMarker/useMarkerAdd';

type MarkerOverlayProps = {
  latitude:number
  longitude:number;
  groupId: number;
  onClose: () => void;
};

export default function MarkerOverlay({
  latitude,
  longitude,
  groupId,
  onClose,
}: MarkerOverlayProps) {
  const [markerName, setMarkerName] = useState("");
  const {mutate: addMarker} = useAddMarkerMutation();

  const handleAddMarker = () => {
    if (markerName.trim() === "") {
      alert("마커 이름을 입력하세요");
      return;
    }
    const marker = {name:markerName, latitude, longitude}
    addMarker(
      {marker, groupId},
      {
        onSuccess: () => {
          console.log("마커추가")
          setMarkerName("");
          onClose();
        }
      }
    )
  }

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
          onClick={() => handleAddMarker()}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          위치 추가
        </button>
      
    </div>
  );
}
