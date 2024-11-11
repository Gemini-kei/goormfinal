import { useState } from 'react';
import { Xicon } from './icons/icons';

type MarkerOverlayProps = {
  onAddMarker: (name: string) => void;
  onClose: () => void;
};

export default function MarkerOverlay({ onAddMarker, onClose }: MarkerOverlayProps) {
  const [markerName, setMarkerName] = useState("");

  return (
    <div className="relative bg-white p-6 border border-gray-200 rounded-2xl shadow-lg w-[350px]">
      {/* Close Icon Button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
        aria-label="Close"
      >
        <Xicon />
      </button>

      <h4 className="text-xl font-bold text-gray-800 mb-4 text-center">Add New Marker</h4>

      <input
        type="text"
        placeholder="Enter marker name"
        value={markerName}
        onChange={(e) => setMarkerName(e.target.value)}
        className="mb-4 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={() => onAddMarker(markerName)}
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all"
      >
        Add Marker
      </button>
    </div>
  );
}
