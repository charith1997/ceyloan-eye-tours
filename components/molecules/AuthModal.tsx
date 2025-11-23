"use client";

import React from "react";
import Button from "@/components/atoms/Button";
import Modal from "./Modal";

interface AuthModalProps {
  isOpen: boolean;
  message?: string;
  onClose: () => void;
}

export default function AuthModal({
  isOpen,
  message = "Please log in to continue",
  onClose,
}: AuthModalProps) {
  if (!isOpen) return null;

  const handleLogin = () => {
    window.location.href = "/login";
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Authentication Required"
      className="md:w-lg"
    >
      <p className="text-gray-800 text-sm mb-6">{message}</p>

      <div className="flex gap-3">
        <Button
          type="button"
          onClick={onClose}
          className="flex-1 py-2 px-4 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors text-center"
          label="Cancel"
        />
        <Button
          type="button"
          onClick={handleLogin}
          className="flex-1 py-2 px-4 rounded-lg font-semibold text-white bg-orange hover:opacity-90 transition-opacity text-center"
          label="Login"
        />
      </div>
    </Modal>
  );
}
