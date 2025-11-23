import { useCallback, useState } from "react";

interface UseAuthModalReturn {
  isOpen: boolean;
  message: string;
  openModal: (message?: string) => void;
  closeModal: () => void;
}

/**
 * Hook to manage AuthModal state.
 * Usage:
 *   const { isOpen, message, openModal, closeModal } = useAuthModal();
 *   openModal("Please login to continue");
 */
export function useAuthModal(): UseAuthModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("Please log in to continue");

  const openModal = useCallback((msg?: string) => {
    if (msg) setMessage(msg);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, message, openModal, closeModal };
}
