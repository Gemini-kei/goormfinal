import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import MarkerOverlay from "@/components/markerOverlay";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function useMapMarkers(map: any) {
  const [markers, setMarkers] = useState<any[]>([]);
  const [overlays, setOverlays] = useState<any[]>([]);

  useEffect(() => {
    if (!map || !window.kakao) return;

    const handleRightClick = (mouseEvent: any) => {
      const clickPosition = mouseEvent.latLng;
      overlays.forEach((overlay) => overlay.setMap(null))
      setOverlays([]);
      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        position: clickPosition,
      });

      //marker.setMap(map);

      // CustomOverlay DOM container 생성
      const container = document.createElement("div");

      //CustomOverlay 생성
      const overlay = new window.kakao.maps.CustomOverlay({
        position: clickPosition,
        content: container, // React Portal로 렌더링된 DOM 삽입
      });

      overlay.setMap(map);

      // React Portal로 OverlayContent 렌더링
      const root = ReactDOM.createRoot(container);
      root.render(<MarkerOverlay onClose={() => overlay.setMap(null)} />);

      setMarkers((prevMarkers) => [...prevMarkers, marker]);
      setOverlays((prevOverlays) => [...prevOverlays, overlay]); // 오버레이 상태 추가
    };

    const handleMapClick = () => {
      overlays.forEach((overlay) => overlay.setMap(null))
      setOverlays([]);
    }

    // 지도에 우클릭 이벤트 등록
    window.kakao.maps.event.addListener(map, "rightclick", handleRightClick);

    // 지도에 클릭 이벤트 등록
    window.kakao.maps.event.addListener(map, "click", handleMapClick)
    

    // 이벤트 제거
    return () => {
      window.kakao.maps.event.removeListener(map, "rightclick", handleRightClick);
    };
  }, [map, overlays]);

  return { markers, overlays };
}
