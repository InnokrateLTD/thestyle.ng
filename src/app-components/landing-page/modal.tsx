import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app-components/ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 ">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-none mx-4 shadow-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Close button */}
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent cursor-pointer hover:bg-transparent text-gray-400 hover:text-gray-600 focus:outline-none z-10"
        >
          <XMarkIcon className="w-5 h-5" />
        </Button>

        {/* Scrollable content */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
