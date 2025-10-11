import { XIcon } from "lucide-react";
import React from "react";
import Button from "../atoms/Button";

interface AdminDetailsContainerProps {
  onClose: () => void;
  heading: React.ReactNode;
  children: React.ReactNode;
}

const AdminDetailsContainer: React.FC<AdminDetailsContainerProps> = ({
  onClose,
  heading,
  children,
}) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-75 transition-opacity"
          onClick={handleBackdropClick}
        />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-4xl">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">{heading}</div>
              <Button
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
                onClick={onClose}
                label={<XIcon className="h-6 w-6" />}
              />
            </div>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="space-y-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDetailsContainer;
