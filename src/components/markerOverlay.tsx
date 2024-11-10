import { useState } from 'react';

type MarkerOverlayProps = {
  onAddMarker: (name: string) => void;
  onClose: () => void;
};

export default function MarkerOverlay({ onAddMarker, onClose }: MarkerOverlayProps) {
  const [markerName, setMarkerName] = useState("");

  return (
    <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
      <h4 className="text-lg font-semibold mb-2">Add a new marker</h4>
      <input
        type="text"
        placeholder="Enter marker name"
        value={markerName}
        onChange={(e) => setMarkerName(e.target.value)}
        className="mb-3 p-2 w-full border border-gray-300 rounded"
      />
      <button
        onClick={() => onAddMarker(markerName)}
        className="mr-3 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Marker
      </button>
      <button
        onClick={onClose}
        className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Close
      </button>
    </div>
  );
}
