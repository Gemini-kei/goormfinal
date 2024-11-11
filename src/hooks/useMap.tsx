import { useEffect, useRef, useState } from "react";

type UseKakaoMapProps = {
  latitude: number;
  longitude: number;
  level?: number;
};


export function useMap({ latitude, longitude, level = 2 }: UseKakaoMapProps) {

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.kakao && mapContainerRef.current) {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level,
        };
        const newMap = new window.kakao.maps.Map(mapContainerRef.current!, options);
        setMap(newMap);
      });
    }
  }, [latitude, longitude, level]);

  return { map, mapContainerRef };
}
