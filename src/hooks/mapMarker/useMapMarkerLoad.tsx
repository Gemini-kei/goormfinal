import { useEffect, useRef, useState, useCallback } from "react";
import GalleryOverlay from '@/components/markerGallery';
import MarkerOverlay from '@/components/markerOverlay';
import { createRoot } from 'react-dom/client';

type MarkerData = {
  latitude: number;
  longitude: number;
  name?: string;
};

type UseMapMarkerLoadProps = {
  map: kakao.maps.Map | null;
  markersData: MarkerData[] | [];
};

export function useMapMarkersLoad({ map, markersData }: UseMapMarkerLoadProps) {
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const overlayRef = useRef<kakao.maps.CustomOverlay | null>(null);
  const [overlayPosition, setOverlayPosition] = useState<kakao.maps.LatLng | null>(null);
  const customOverlays = useRef<kakao.maps.CustomOverlay[]>([]); // 기존 오버레이 관리
  
  const handleAddMarker = useCallback(
    (name: string, position: kakao.maps.LatLng) => {
      if (map) {
        const newMarker = new window.kakao.maps.Marker({
          position,
          map,
        });
  
        markersRef.current.push(newMarker);
  
        const overlayDiv = document.createElement("div");
        const root = createRoot(overlayDiv);
  
        const newCustomOverlay = new window.kakao.maps.CustomOverlay({
          content: overlayDiv,
          position,
          xAnchor: 0.5,
          yAnchor: 1.5,
        });
  
        root.render(
          <GalleryOverlay
            name={name}
            onClose={() => newCustomOverlay.setMap(null)}
          />
        );
  
        customOverlays.current.push(newCustomOverlay);
  
        window.kakao.maps.event.addListener(newMarker, "click", () => {
          newCustomOverlay.setMap(map);
        });
  
        overlayRef.current?.setMap(null); // MarkerOverlay 닫기
      }
    },
    [map, markersRef, customOverlays]
  );
  useEffect(() => {
    if (map) {
      // 기존 마커 초기화
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // 기존 마커 렌더링
      markersData.forEach((markerData) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(markerData.latitude, markerData.longitude),
          map,
        });

        const overlayDiv = document.createElement("div");
        const root = createRoot(overlayDiv);
        root.render(
          <GalleryOverlay
            name={markerData.name || "Unnamed Marker"}
            onClose={() => customOverlay.setMap(null)}
          />
        );

        const customOverlay = new window.kakao.maps.CustomOverlay({
          content: overlayDiv,
          position: marker.getPosition(),
          xAnchor: 0.5,
          yAnchor: 1.5,
        });

        customOverlays.current.push(customOverlay);

        window.kakao.maps.event.addListener(marker, "click", () => {
          customOverlay.setMap(map); // GalleryOverlay 표시
        });

        markersRef.current.push(marker);
      });

      // 맵 우클릭 이벤트로 새로운 마커 등록용 Overlay 표시
      window.kakao.maps.event.addListener(map, "rightclick", (mouseEvent: kakao.maps.event.MouseEvent) => {
        overlayRef.current?.setMap(null)  // 우클릭시 기존에 오버레이 삭제
        setOverlayPosition(mouseEvent.latLng); // 우클릭 위치 저장
      });
    }
  }, [map, markersData]);

  useEffect(() => {
    if (map && overlayPosition) {
      const overlayDiv = document.createElement("div");
      const root = createRoot(overlayDiv);

      root.render(
        <MarkerOverlay
          onAddMarker={(name: string) => handleAddMarker(name, overlayPosition)}
          onClose={() => overlayRef.current?.setMap(null)}
        />
      );

      const customOverlay = new window.kakao.maps.CustomOverlay({
        content: overlayDiv,
        position: overlayPosition,
        xAnchor: 0.5,
        yAnchor: 1.5,
      });

      customOverlay.setMap(map); // MarkerOverlay 표시
      overlayRef.current = customOverlay;
    }
  }, [map, overlayPosition, handleAddMarker]); // handleAddMarker 포함
}
