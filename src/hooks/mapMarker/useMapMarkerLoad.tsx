import { useEffect, useRef } from "react";
import GalleryOverlay from '@/components/markerGallery';
import { createRoot } from 'react-dom/client';

type MarkerData = {
  latitude: number;
  longitude: number;
  name?: string;
};

export function useMapMarkersLoad(
  map: kakao.maps.Map | null,
  markersData: MarkerData[]
) {
  const markersRef = useRef<kakao.maps.Marker[]>([]);

  useEffect(() => {
    if (map) {
      // 기존 마커 제거
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      markersData.forEach((markerData) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(markerData.latitude, markerData.longitude),
          map,
        });

        // 마커 클릭 시 커스텀 오버레이 표시
        if (markerData.name) {
          const overlayDiv = document.createElement("div");
          
          const root = createRoot(overlayDiv)
          // React 컴포넌트를 오버레이에 렌더링
          root.render(<GalleryOverlay name={markerData.name} 
            onClose={()=> customOverlay.setMap(null)}
          />);

          const customOverlay = new window.kakao.maps.CustomOverlay({
            content: overlayDiv,
            position: marker.getPosition(),
            xAnchor: 0.5,
            yAnchor: 1.5,
          });

          window.kakao.maps.event.addListener(marker, "click", () => {
            customOverlay.setMap(map); // 오버레이 표시
          });

          window.kakao.maps.event.addListener(map, "click", () => {
            customOverlay.setMap(null); // 맵 클릭 시 오버레이 닫기
          });
        }

        markersRef.current.push(marker);
      });
    }
  }, [map, markersData]);
}
