"use client";

import { useImagesLoad } from "@/hooks/useImagesLoad";
import ImageUploader from "./ImageUploader";
import { Xicon } from "./icons/icons";
import ImageDelete from "./ImageDelete";
import ImageModal from "./ImageModal";

import { useState, useRef, useEffect } from "react";
import MarkerDelete from './MarkerDelete';
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

  const [selectedIds, setSelectedIds] = useState<number[]>([]); // 한 개의 이미지 ID 상태
  
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);
  
  // const [modalImageUrl, setModalImageUrl] = useState<string | null>(null); // 모달 이미지 상태
  
  const [isDeleteMode, setIsDeleteMode] = useState<boolean>(false); // 삭제 모드 상태
  const overlayRef = useRef<HTMLDivElement>(null);


  const handleSelect = (id: number) => {
    setSelectedIds((prevIds) =>
      prevIds.includes(id) ? prevIds.filter((prevId) => prevId !== id) : [...prevIds, id]
    );
  };
  const handleImageClick = (index: number) => {
    if (!isDeleteMode) {
      setModalImageIndex(index); // 삭제 모드가 아니면 모달 열기
    } 
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
      className="top-2 left-2 p-4 bg-white border border-gray-300 rounded-md shadow-lg text-black w-[300px] absolute"
      onClick={(e) => e.stopPropagation()} // 이벤트 전파 방지
      // style={{ top: "20px", left: "20px" }} // 기본 위치 설정
    >
      {/* 제목 영역 */}
      <div className="mb-4 text-left">
        <h4 className="font-bold text-lg">{name}</h4>
      </div>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
        aria-label="Close"
      >
        <Xicon />
      </button>
      
      <MarkerDelete 
        locationId={locationId}
        onClose={onClose}
      />
      
      
      {/* 이미지 그리드 영역 */}
      <div
        className="grid grid-cols-3 gap-2 mb-4 max-h-[300px] overflow-y-auto pr-4"
        onWheel={(e) => {
          e.stopPropagation(); // 부모 요소로 이벤트가 전파되지 않도록 막음
        }}
      >
        {data?.map((image, index) => (
          <div
            key = {image.id || index}
            className="relative cursor-pointer"
            onClick={() => {
              if (!isDeleteMode) handleImageClick(index); // 삭제 모드가 아닐 때만 확대
            }}
          >
            <img
              src={image.url}
              alt={image.fileName}
              className="w-full h-24 object-cover rounded shadow-sm"
              loading="lazy"
              // onClick={() => handleImageClick(image.url)}
            />
            {/* 삭제 모드에서 체크박스 표시 */}
            {isDeleteMode && (
                <input
                  type="checkbox"
                  className="absolute top-2 right-2 w-5 h-5"
                  checked={selectedIds.includes(image.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelect(image.id)
                  }}
                />
              )}
          </div>
        ))}
      </div>

      {/* 사진 추가 버튼 및 삭제 버튼 */}
      <div className="flex gap-2 justify-center items-center">
        <ImageUploader locationId={locationId} />
        <button
            onClick={() => setIsDeleteMode((prev) => !prev)}
            className={`w-full block ${
              isDeleteMode ? "bg-gray-500 hover:bg-gray-600" : "bg-red-500 hover:bg-red-600"
            } text-white text-center py-2 rounded cursor-pointer`}
          >
            {isDeleteMode ? "삭제 취소" : "사진 삭제"}
          </button>
          {isDeleteMode && (
            <ImageDelete
              locationId={locationId}
              selectedIds={selectedIds}
              onDelete={() => setSelectedIds([])}
            />
          )}
      </div>
      {/* 모달 컴포넌트 */}
      {modalImageIndex !== null && (
        <ImageModal
          imageUrl={data[modalImageIndex].url}
          onClose={() => setModalImageIndex(null)}
          onNext={() =>
            setModalImageIndex((prev) =>
              prev === null || prev >= data.length - 1 ? 0 : prev + 1
            )
          }
          onPrev={() =>
            setModalImageIndex((prev) =>
              prev === null || prev <= 0 ? data.length - 1 : prev - 1
            )
          }
        />
      )}
    </div>
  );
}
