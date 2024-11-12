"use client";

import { useImagesLoad } from "@/hooks/useImagesLoad";
import ImageUploader from "./ImageUploader";
import { Xicon } from "./icons/icons";
import ImageDelete from "./ImageDelete";
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

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading photo</p>;

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-md shadow-lg text-black w-[300px]">
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
      <div className="grid grid-cols-3 gap-2 mb-4">
        {data?.map((image, index) => (
          <img
            key={image.id || index}
            src={image.url}
            alt={image.fileName}
            className="w-full h-auto rounded shadow-sm object-cover"
            loading="lazy"
          />
        ))}
      </div>

      {/* 사진 추가 버튼 및 삭제 버튼 */}
      <div className="flex gap-2 justify-center items-center">
        <ImageUploader locationId={locationId} />
        <ImageDelete locationId={locationId} />
      </div>
    </div>
  );
}
