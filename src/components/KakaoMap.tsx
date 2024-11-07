// components/KakaoMap.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import useMapMarkers from "@/hooks/useMapMarker";

declare global {
  interface Window {
    kakao: any;
  }
}

type mapCoordinate = {
  latitude: number;
  longitude: number;
};

export default function KakaoMap({ latitude, longitude }: mapCoordinate) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.kakao && mapContainerRef.current) {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        const newMap = new window.kakao.maps.Map(mapContainerRef.current, options);
        setMap(newMap); // 맵 객체 저장
      });
    }
  }, [latitude, longitude]);

  useMapMarkers(map); // 마커 훅 사용

  return <div ref={mapContainerRef} className="w-full h-screen"></div>;
}
