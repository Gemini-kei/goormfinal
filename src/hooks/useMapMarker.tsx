import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import MarkerOverlay from "@/components/markerOverlay";

// declare global {
//   interface Window {
//     kakao: any;
//   }
// }

export default function useMapMarkers(map: kakao.maps.Map | null) {
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
  const [overlay, setOverlay] = useState<kakao.maps.CustomOverlay | null>(null);
  // const [markerInfo, setMarkerInfo] = useState<kakao.maps.LatLng | null>(null);

  useEffect(() => {
    if (!map || !window.kakao) return;

    const handleRightClick = (mouseEvent: kakao.maps.event.MouseEvent) => {
      const clickPosition = mouseEvent.latLng;

      if(overlay) { overlay.setMap(null)}
      

      // CustomOverlay DOM container 생성
      const container = document.createElement("div");

      //CustomOverlay 생성
      const newOverlay = new window.kakao.maps.CustomOverlay({
        position: clickPosition,
        content: container, // React Portal로 렌더링된 DOM 삽입
      });

      newOverlay.setMap(map);

      // React Portal로 OverlayContent 렌더링
      const root = ReactDOM.createRoot(container);
      console.log('test1')
      const newMarker = new window.kakao.maps.Marker({
        position: clickPosition,
      });
      console.log(clickPosition.getLat(), clickPosition.getLng())
      newMarker.setMap(map);

      root.render(
        <MarkerOverlay
          onClose={() => {
            newOverlay.setMap(null)
            console.log("닫기")
          }
          }
          onRegister={() => {
            newMarker.setMap(map);
            console.log('test2')      
            setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
            newOverlay.setMap(null); // 등록후 오버레이 삭제
          }}
        />
      );
      setOverlay(newOverlay); // 오버레이 상태 추가
    };

    const handleMapClick = () => {
      if(overlay) { overlay.setMap(null)}
      setOverlay(null);
    };

    // 지도에 우클릭 이벤트 등록
    window.kakao.maps.event.addListener(map, "rightclick", handleRightClick);

    // 지도에 클릭 이벤트 등록
    window.kakao.maps.event.addListener(map, "click", handleMapClick);

    // 이벤트 제거
    return () => {
      window.kakao.maps.event.removeListener(map, "rightclick", handleRightClick);
      window.kakao.maps.event.removeListener(map, "click", handleMapClick);
    };
  }, [map, overlay]);

  return { markers };
}
