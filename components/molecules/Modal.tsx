"use client";
import Button from "@/components/atoms/Button";
import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className={`bg-white rounded-xl px-8 py-4 mx-4 shadow-2xl relative overflow-y-auto max-w-full md:max-w-3xl w-full ${className}`}
      >
        <Button
          label={<X />}
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
        />

        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <div className="flex flex-col max-h-[82vh]">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
