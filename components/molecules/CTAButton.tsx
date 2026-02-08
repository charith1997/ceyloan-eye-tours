"use client";

import Button from "@/components/atoms/Button";
import { isAuthenticated } from "@/utils/auth";
import AuthModal from "./AuthModal";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";

const CTAButton = () => {
  const { isOpen, message, openModal, closeModal } = useAuthModal();
  const router = useRouter();

  return (
    <>
      <div className="flex justify-center mt-12 sm:mt-16 px-4">
        <div className="relative group">
          <div className="relative">
            <Button
              onClick={() => {
                if (!isAuthenticated()) {
                  openModal("Please log in to create a custom package");
                  return;
                }
                router.push("/plan-your-trip");
              }}
              label={
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-base sm:text-lg md:text-xl font-bold">
                    Plan Your Trip
                  </span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              }
              className="relative bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white font-bold px-6 py-3 sm:px-10 sm:py-4 md:px-12 md:py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 overflow-hidden"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4 px-4">
        <p className="text-xs sm:text-sm md:text-base text-gray-600 text-center max-w-md">
          Create your personalized adventure in just a few clicks
        </p>
      </div>

      <AuthModal isOpen={isOpen} message={message} onClose={closeModal} />
    </>
  );
};

export default CTAButton;
