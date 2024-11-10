// "use client";

// import { useEffect, useRef, useState } from "react";
// import useMapMarkers from "@/hooks/useMapMarker";
// import { useMarkersLoad } from "@/hooks/mapMarker/useMarkerLoad";

// type mapCoordinate = {
//   latitude: number;
//   longitude: number;
// };

// export default function KakaoMap({ latitude, longitude }: mapCoordinate) {
//   const mapContainerRef = useRef<HTMLDivElement | null>(null);
//   const [map, setMap] = useState<kakao.maps.Map | null>(null);
//   const [userId, setUserId] = useState<string | null>("");
//   const { data: markersData } = useMarkersLoad(userId || ""); // userId가 없어도 호출 가능
//   // const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedUserId = localStorage.getItem("userId");
//       setUserId(storedUserId);
//     }
//   }, []); // 클라이언트에서만 실행

//   useEffect(() => {
//     if (
//       typeof window !== "undefined" &&
//       window.kakao &&
//       mapContainerRef.current
//     ) {
//       window.kakao.maps.load(() => {
//         const options = {
//           center: new window.kakao.maps.LatLng(latitude, longitude),
//           level: 2,
//         };

//         const newMap = new window.kakao.maps.Map(
//           mapContainerRef.current!,
//           options
//         );
//         setMap(newMap); // 맵 객체 저장
//       });
//     }
//   }, [latitude, longitude]);

//   useEffect(() => {
//     if (map && Array.isArray(markersData?.locations)) {
//       console.log("Markers Data:", markersData.locations); // 데이터 구조 확인
//       console.log("Map Object:", map); // 맵 객체 확인

//       markersData.locations.forEach((marker) => {
//         console.log("Adding Marker:", marker.latitude, marker.longitude);
//         const position = new window.kakao.maps.LatLng(
//           marker.latitude,
//           marker.longitude
//         );
//         const newMarker = new window.kakao.maps.Marker({
//           position: position,
//           clickable: true,
//         });
//         newMarker.setMap(map);
//       });
//     }
//   }, [map, markersData]);

//   useMapMarkers(map); // 마커 훅 사용

//   return <div ref={mapContainerRef} className="w-full h-screen"></div>;
// }
