"use client";

import { useMemo, useEffect } from "react";
import { useMarkersLoad } from "@/hooks/mapMarker/useMarkerLoad";
import { useMap } from "@/hooks/useMap";
import { useMapMarkersLoad } from "@/hooks/mapMarker/useMapMarkerLoad";

import { useImagesLoad } from '@/hooks/useImagesLoad';
import GalleryOverlay from './markerGallery';


type mapCoordinate = {
  latitude: number;
  longitude: number;
};

export default function KakaoMap({ latitude, longitude }: mapCoordinate) {
  const { map, mapContainerRef } = useMap({ latitude, longitude });

  const { data, isLoading, isError } = useMarkersLoad();
  
  if (isLoading) {
    console.log("Loading...");
  }

  if (isError) {
    console.error("Error loading markers.");
  }

  const markersData = useMemo(() => {
    if (!data) return [];

    return data.map((item) => ({
      id: item.id,
      groupId: item.groupId,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
    }));
  }, [data]);
  
  useEffect(() => {
    if (map && markersData.length > 0) {
      const firstMarkerPosition = new window.kakao.maps.LatLng(
        markersData[0].latitude,
        markersData[0].longitude
      );
      map.setCenter(firstMarkerPosition);
    }
  }, [map, markersData]);
  useMapMarkersLoad({ map, markersData: markersData }); // 마커 데이터 전달
  console.log("markersData", markersData);
  return <div ref={mapContainerRef} className="w-full h-screen"></div>;
}
