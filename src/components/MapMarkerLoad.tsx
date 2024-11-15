import { useEffect, useRef, useState, useCallback } from "react";
import GalleryOverlay from "@/components/markerGallery";
import MarkerOverlay2 from "@/components/markerOverlay2";
import { createRoot } from "react-dom/client";
import ReactQueryProvider from "@/components/queryClientProvider";
import { LocationData } from "@/lib/groupType";
import { useAddMarkerMutation } from "@/hooks/mapMarker/useMarkerAdd";

type UseMapMarkerLoadProps = {
  map: kakao.maps.Map | null;
  markersData: LocationData[] | [];
  groupId: number;
};

export function MapMarkersLoad({ map, markersData, groupId }: UseMapMarkerLoadProps) {
  const { mutate: addMarker } = useAddMarkerMutation();
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const customOverlays = useRef<kakao.maps.CustomOverlay[]>([]);
  const overlayRef = useRef<kakao.maps.CustomOverlay | null>(null);
  const [activeOverlayId, setActiveOverlayId] = useState<number | null>(null);

  /** 마커와 오버레이 생성 함수 */
  const createMarkerWithOverlay = useCallback(
    (markerData: LocationData) => {
      if (!map) return;

      const position = new window.kakao.maps.LatLng(markerData.latitude, markerData.longitude);
      const marker = new window.kakao.maps.Marker({ position, map });
      markersRef.current.push(marker);

      const overlayDiv = document.createElement("div");
      const root = createRoot(overlayDiv);

      root.render(
        <ReactQueryProvider>
          <GalleryOverlay
            name={markerData.name || "Unnamed Marker"}
            locationId={markerData.id}
            onClose={() => setActiveOverlayId(null)}
          />
        </ReactQueryProvider>
      );

      const customOverlay = new window.kakao.maps.CustomOverlay({
        clickable: true,
        content: overlayDiv,
        position,
        xAnchor: 0.5,
        yAnchor: 1.5,
      });

      customOverlays.current.push(customOverlay);

      kakao.maps.event.addListener(marker, "click", () => {
        customOverlays.current.forEach((overlay) => overlay.setMap(null));
        if (activeOverlayId !== markerData.id) {
          customOverlay.setMap(map);
          setActiveOverlayId(markerData.id);
        } else {
          setActiveOverlayId(null);
        }
      });
    },
    [map, activeOverlayId]
  );

  /** 마커 초기화 및 렌더링 */
  useEffect(() => {
    if (!map) return;

    // 기존 마커 초기화
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // 새로운 마커와 오버레이 생성
    markersData.forEach(createMarkerWithOverlay);
  }, [map, markersData, createMarkerWithOverlay]);

  /** 새로운 마커 추가 핸들러 */
  const AddMarker = useCallback(
    (name: string, position: kakao.maps.LatLng) => {
      if (!map) return;

      const newMarkerData: LocationData = {
        id: Date.now(), // 임시 ID
        groupId,
        latitude: position.getLat(),
        longitude: position.getLng(),
        name,
      };

      addMarker(
        {
          marker: newMarkerData,
          groupId,
        },
        {
          onSuccess: () => {
            createMarkerWithOverlay(newMarkerData);
          },
        }
      );

      overlayRef.current?.setMap(null); // 추가 시 오버레이 닫기
    },
    [map, groupId, addMarker, createMarkerWithOverlay]
  );

  /** 맵 우클릭 이벤트 등록 */
  useEffect(() => {
    if (!map) return;

    const handleRightClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
      const latlng = mouseEvent.latLng;
      customOverlays.current.forEach((overlay) => overlay.setMap(null));
      overlayRef.current?.setMap(null);
      
      const overlayDiv = document.createElement("div");
      const root = createRoot(overlayDiv);

      root.render(
        <ReactQueryProvider>
          <MarkerOverlay2
            onClose={() => overlayRef.current?.setMap(null)}
            onAddMarker={(markerName) => AddMarker(markerName, latlng)}
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

      customOverlay.setMap(map);
      overlayRef.current = customOverlay;
    };

    kakao.maps.event.addListener(map, "rightclick", handleRightClick);
    return () => {
      kakao.maps.event.removeListener(map, "rightclick", handleRightClick);
    };
  }, [map, AddMarker]);

  /** 맵 클릭 시 모든 오버레이 닫기 */
  useEffect(() => {
    if (!map) return;

    const handleMapClick = () => {
      customOverlays.current.forEach((overlay) => overlay.setMap(null));
      overlayRef.current?.setMap(null);
      setActiveOverlayId(null);
    };

    kakao.maps.event.addListener(map, "click", handleMapClick);
    return () => {
      kakao.maps.event.removeListener(map, "click", handleMapClick);
    };
  }, [map]);
}
