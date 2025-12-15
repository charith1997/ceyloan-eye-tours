"use client";

import Button from "@/components/atoms/Button";
import { isAuthenticated } from "@/utils/auth";
import AuthModal from "./AuthModal";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";

const CTAButton = () => {
  const { isOpen, message, openModal, closeModal } = useAuthModal();
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center mt-12">
        <Button
          onClick={() => {
            if (!isAuthenticated()) {
              openModal("Please log in to create a custom package");
              return;
            }
            router.push("/plan-your-trip");
          }}
          label="Plan Your Trip"
          className="bg-gradient-to-r from-red to-orange text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:opacity-90 transition cursor-pointer"
        />
      </div>
      <AuthModal isOpen={isOpen} message={message} onClose={closeModal} />
    </>
  );
};

export default CTAButton;
