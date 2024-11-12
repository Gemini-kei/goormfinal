"use client";

import { useImagesLoad } from "@/hooks/useImagesLoad";
import ImageUploader from "./ImageUploader";
import { Xicon } from "./icons/icons";
import ImageDelete from "./ImageDelete";

import { useState, useRef, useEffect } from "react";
interface markerGalleryProps {
  name: string;
  locationId: number;
  onClose: () => void;
}

export default function GalleryOverlay({
  name,
  locationId,
  onClose,
}: markerGalleryProps) {
  const { data, isLoading, isError } = useImagesLoad(locationId);

  const [selectedId, setSelectedId] = useState<number | null>(null); // 한 개의 이미지 ID 상태

  const overlayRef = useRef<HTMLDivElement>(null);

  const handleSelect = (id: number) => {
    setSelectedId((prevId) => (prevId === id ? null : id)); // 이미 선택된 ID 클릭 시 해제
  };

  useEffect(() => {
    if (overlayRef.current) {
      const overlay = overlayRef.current;
      const { top, left, right, bottom } = overlay.getBoundingClientRect();

      // 뷰포트 경계 초과 방지
      if (top < 0) overlay.style.top = `${window.scrollY + 10}px`; // 화면 위로 넘어가지 않게
      if (left < 0) overlay.style.left = `10px`; // 왼쪽 경계
      if (right > window.innerWidth)
        overlay.style.left = `${window.innerWidth - overlay.offsetWidth - 10}px`; // 오른쪽 경계
      if (bottom > window.innerHeight)
        overlay.style.top = `${window.innerHeight - overlay.offsetHeight - 10}px`; // 아래 경계
    }
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading photo</p>;

  return (
    <div
      ref={overlayRef}
      className="top-4 left-4 p-4 bg-white border border-gray-300 rounded-md shadow-lg text-black w-[300px] absolute"
      // style={{ top: "20px", left: "20px" }} // 기본 위치 설정
    >
      {/* 제목 영역 */}
      <div className="mb-4 text-center">
        <h4 className="font-bold text-lg">{name}</h4>
      </div>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
        aria-label="Close"
      >
        <Xicon />
      </button>
      {/* 이미지 그리드 영역 */}
      <div
        className="grid grid-cols-3 gap-2 mb-4 h-[300px] overflow-y-auto pr-4"
        onWheel={(e) => {
          e.stopPropagation(); // 부모 요소로 이벤트가 전파되지 않도록 막음
        }}
      >
        {data?.map((image, index) => (
          <div
            key={image.id || index}
            onClick={() => handleSelect(image.id)}
            className={`relative cursor-pointer ${
              selectedId === image.id ? "border-4 border-blue-500" : ""
            }`}
          >
            <img
              src={image.url}
              alt={image.fileName}
              className="w-full h-24 object-cover rounded shadow-sm"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* 사진 추가 버튼 및 삭제 버튼 */}
      <div className="flex gap-2 justify-center items-center">
        <ImageUploader locationId={locationId} />
        <ImageDelete
          locationId={locationId}
          selectedId={selectedId || 0}
          onDelete={() => setSelectedId(null)}
        />
      </div>
    </div>
  );
}
