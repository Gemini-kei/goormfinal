"use client";

import { useEffect, useState } from 'react';
import { useMarkersLoad } from "@/hooks/mapMarker/useMarkerLoad";
import { useMap } from "@/hooks/useMap";
import {useMapMarkersLoad} from '@/hooks/mapMarker/useMapMarkerLoad';

type mapCoordinate = {
  latitude: number;
  longitude: number;
};

export default function KakaoMap2({ latitude, longitude }: mapCoordinate) {
  const { map, mapContainerRef } = useMap({ latitude, longitude });
  const [userId, setUserId] = useState<string | null>("");

  const { data: markersData } = useMarkersLoad(userId || "");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  useMapMarkersLoad(map, markersData?.locations || []); // 마커 데이터 전달

  return <div ref={mapContainerRef} className="w-full h-screen"></div>;
}
