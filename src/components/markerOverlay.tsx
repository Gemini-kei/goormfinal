"use client";

interface markerOverlayProps {
  onClose: () => void;
}

export default function MarkerOverlay({ onClose }: markerOverlayProps) {
  return (
    <div style={{ padding: "10px", background: "white", border: "1px solid black", borderRadius: "8px" }}>
      <p>새 마커 위치</p>
      <button onClick={onClose} style={{ marginTop: "5px", cursor: "pointer" }}>
        닫기
      </button>
    </div>
  );
}
