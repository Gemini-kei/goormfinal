import React from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string;
};

export default function EmailModal({ isOpen, onClose, message }: ModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-5">
        <p className="text-center text-black">{message}</p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 select-none cursor-pointer focus:outline-none text-xs"
          >
            닫기
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
