import ReactDOM from "react-dom";
import { useEffect } from "react";
import { Xicon } from "../icons/icons";
import Image from "next/image";

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function ImageModal({
  imageUrl,
  onClose,
  onNext,
  onPrev,
}: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  // const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (e.target === e.currentTarget) {
  //     onClose();
  //   }
  // };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-2/3 h-2/3 items-center p-4 bg-transparent border-spacing-1 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
         {/* 이미지와 빈 공간 모두 포함 */}
    <div className="relative w-full h-full pointer-events-none">
      <Image
        src={imageUrl}
        alt="expanded"
        fill
        className="object-contain pointer-events-auto"
        onClick={(e) => e.stopPropagation()} // 이미지 위 실제 영역만 클릭 이벤트 방지
        priority
      />
    </div>
  

        <button
          onClick={onClose}
          className="fixed top-4 right-4 bg-transparent rounded-full p-2 shadow hover:bg-gray-200"
          aria-label="Close"
        >
          <Xicon />
        </button>
        <button
          onClick={onPrev}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-transparent rounded-full p-2 shadow hover:bg-gray-200"
          aria-label="Previous"
        >
          ◀
        </button>
        <button
          onClick={onNext}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-transparent rounded-full p-2 shadow hover:bg-gray-200"
          aria-label="Next"
        >
          ▶
        </button>
      </div>
    </div>,
    document.body // 모달을 body에 렌더링
  );
}
