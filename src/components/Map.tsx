"use client";

import { useMemo, useEffect, useState } from "react";
import { useMarkersLoad } from "@/hooks/mapMarker/useMarkerLoad";
import { useMap } from "@/hooks/useMap";
// import { MapMarkersLoad } from "@/components/MapMarkerLoad";
import { MapMarkersLoad2 } from './MapMarkerLoad2';

export default function KakaoMap() {
  const latitude = 37.5665
  const longitude = 126.978;
  const { map, mapContainerRef } = useMap({latitude, longitude});
  const [groupId, setGroupId] = useState(0)
  const { data } = useMarkersLoad();

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
      setGroupId(markersData[0].groupId)
    }
  }, [map, markersData]);
  
  // MapMarkersLoad({ map, markersData: markersData,groupId }); // 마커 데이터 전달 1차 원래꺼
  MapMarkersLoad2({map, markersData:markersData, groupId})
  // console.log("markersData", markersData);
  return <div ref={mapContainerRef} className="w-full h-screen"></div>;
}
