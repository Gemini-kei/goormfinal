"use client";

import { useMemo} from "react";
import { useMarkersLoad } from "@/hooks/mapMarker/useMarkerLoad";
import { useMap } from "@/hooks/useMap";
import { useMapMarkersLoad } from "@/hooks/mapMarker/useMapMarkerLoad";

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
  useMapMarkersLoad({ map, markersData: markersData }); // 마커 데이터 전달

  return <div ref={mapContainerRef} className="w-full h-screen"></div>;
}
