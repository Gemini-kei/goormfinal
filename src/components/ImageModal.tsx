import ReactDOM from "react-dom";
import { useEffect } from "react";
import { Xicon } from './icons/icons';

interface ImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

export default function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="relative max-w-4xl w-full p-4 bg-white rounded-md shadow-lg">
        <img
          src={imageUrl}
          alt="Expanded"
          className="w-full h-auto object-contain max-h-[90vh]"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow hover:bg-gray-200"
          aria-label="Close"
        >
          <Xicon />
        </button>
      </div>
    </div>,
    document.body // 모달을 body에 렌더링
  );
}
