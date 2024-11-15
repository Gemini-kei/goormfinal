import { useEffect, useRef, useState } from "react";
import GalleryOverlay from "@/components/markerGallery";
import MarkerOverlay2 from "@/components/markerOverlay2";
import { createRoot } from "react-dom/client";
import ReactQueryProvider from "@/components/queryClientProvider";
import { LocationData } from "@/lib/groupType";
import { useCallback } from "react";
import { useAddMarkerMutation } from "@/hooks/mapMarker/useMarkerAdd";

type UseMapMarkerLoadProps = {
  map: kakao.maps.Map | null;
  markersData: LocationData[] | [];
  groupId: number;
};

export function MapMarkersLoad2({
  map,
  markersData,
  groupId,
}: UseMapMarkerLoadProps) {
  const { mutate: addMarker } = useAddMarkerMutation();
  const markersRef = useRef<kakao.maps.Marker[]>([]); //현재 지도 모든 마커 관리
  const overlayRef = useRef<kakao.maps.CustomOverlay | null>(null);
  const customOverlays = useRef<kakao.maps.CustomOverlay[]>([]); // 커스텀 오버레이들을 저장.
  const [activeOverlayId, setActiveOverlayId] = useState<number | null>(null);

  // 맵 클릭 시 기존 오버레이 모두 닫기
  useEffect(() => {
    if (map) {
      const handleMapClick = () => {
        customOverlays.current.forEach((overlay) => overlay.setMap(null));
        overlayRef.current?.setMap(null); // 등록 중인 Overlay 닫기
      };

      kakao.maps.event.addListener(map, "click", handleMapClick);

      return () => {
        kakao.maps.event.removeListener(map, "click", handleMapClick);
      };
    }
  }, [map, customOverlays]);

  // 마커 렌더링 및 오버레이 생성
  useEffect(() => {
    if (map) {
      // 기존 마커 초기화
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // 기존 마커 렌더링
      markersData.forEach((markerData) => {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            markerData.latitude,
            markerData.longitude
          ),
          map,
        });

        const overlayDiv = document.createElement("div");

        const root = createRoot(overlayDiv);

        root.render(
          <ReactQueryProvider>
            <GalleryOverlay
              name={markerData.name || "Unnamed Marker"}
              locationId={markerData.id}
              onClose={() => customOverlay.setMap(null)}
            />
          </ReactQueryProvider>
        );

        const customOverlay = new window.kakao.maps.CustomOverlay({
          clickable: true,
          content: overlayDiv,
          position: marker.getPosition(),
          xAnchor: 0.5,
          yAnchor: 1.5,
          zIndex:3, 
        });

        customOverlays.current.push(customOverlay);

        window.kakao.maps.event.addListener(marker, "click", () => {
          customOverlays.current.forEach((overlay) => overlay.setMap(null));
          if (activeOverlayId !== markerData.id) {
            customOverlay.setMap(map); // GalleryOverlay 표시
            setActiveOverlayId(markerData.id);
          } else {
            setActiveOverlayId(null);
          }
        });
        markersRef.current.push(marker);
      });
    }
  }, [map, markersData, activeOverlayId]);

  const AddMarker = useCallback(
    (name: string, position: kakao.maps.LatLng) => {
      if (map) {
        const newMarker = new window.kakao.maps.Marker({
          position,
          map,
        });
        markersRef.current.push(newMarker);

        addMarker({
          marker: {
            name,
            latitude: position.getLat(),
            longitude: position.getLng(),
          },
          groupId, // 예시: 그룹 ID
        });

        const overlayDiv = document.createElement("div");
        const root = createRoot(overlayDiv);

        const newCustomOverlay = new window.kakao.maps.CustomOverlay({
          clickable: true,
          content: overlayDiv,
          position,
          xAnchor: 0.5,
          yAnchor: 1.5,
          zIndex: 3,
        });

        root.render(
          <ReactQueryProvider>
            <GalleryOverlay
              name={name}
              locationId={markersData.length + 1}
              onClose={() => newCustomOverlay.setMap(null)}
            />
          </ReactQueryProvider>
        );

        customOverlays.current.push(newCustomOverlay);

        window.kakao.maps.event.addListener(newMarker, "click", () => {
          newCustomOverlay.setMap(map);
        });

        overlayRef.current?.setMap(null); // MarkerOverlay 닫기
      }
    },
    [map, markersData, addMarker, groupId]
  );

  useEffect(() => {
    if (map) {
      const handleRightClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
        customOverlays.current.forEach((overlay) => overlay.setMap(null));
        overlayRef.current?.setMap(null); // 등록 중인 Overlay 닫기

        const latlng = mouseEvent.latLng;

        const overlayDiv = document.createElement("div");
        overlayDiv.style.whiteSpace = "normal";
        overlayDiv.style.maxWidth = "300px";

        const root = createRoot(overlayDiv);

        root.render(
          <ReactQueryProvider>
            <MarkerOverlay2
              onClose={() => overlayRef.current?.setMap(null)}
              onAddMarker={(markerName) => AddMarker(markerName, latlng)} // 함수 전달
            />
          </ReactQueryProvider>
        );

        const customOverlay = new window.kakao.maps.CustomOverlay({
          clickable: true,
          content: overlayDiv,
          position: latlng,
          xAnchor: 0.5,
          yAnchor: 1.5,
        });

        customOverlay.setMap(map); // MarkerOverlay 표시
        overlayRef.current = customOverlay;
      };

      kakao.maps.event.addListener(map, "rightclick", handleRightClick);

      // Clean-up
      return () => {
        kakao.maps.event.removeListener(map, "rightclick", handleRightClick);
      };
    }
  }, [map, markersData, AddMarker]);
  
}
