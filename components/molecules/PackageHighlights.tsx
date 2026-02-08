import React from "react";
import Button from "../atoms/Button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { isAuthenticated } from "@/utils/auth";
import AuthModal from "./AuthModal";
import { Star, CheckCircle2, Calendar } from "lucide-react";

interface PackageHighlightsProps {
  highlights: string[];
  handleBooking: () => void;
}

const PackageHighlights = ({
  highlights,
  handleBooking,
}: PackageHighlightsProps) => {
  const { isOpen, message, openModal, closeModal } = useAuthModal();

  return (
    <div className="lg:w-1/3 lg:self-end">
      <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 sm:p-8 shadow-xl border border-orange-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-r from-red to-orange rounded-xl">
            <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red to-orange bg-clip-text text-transparent">
            Tour Highlights
          </h3>
        </div>

        <ul className="space-y-3 mb-8">
          {highlights?.map((point: string, i: number) => (
            <li
              key={i}
              className="flex items-start gap-3 group animate-fadeIn"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CheckCircle2 className="w-5 h-5 text-red flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {point}
              </span>
            </li>
          ))}
        </ul>

        <div className="relative group">
          <Button
            label={
              <span className="flex items-center justify-center gap-2 relative z-10">
                <Calendar className="w-5 h-5" />
                <span className="font-bold text-base sm:text-lg">BOOK NOW</span>
              </span>
            }
            className="relative w-full bg-gradient-to-r from-red to-orange text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
            onClick={() => {
              if (!isAuthenticated()) {
                openModal("Please log in to book this tour");
                return;
              }
              handleBooking();
            }}
          />
        </div>
      </div>

      <AuthModal isOpen={isOpen} message={message} onClose={closeModal} />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default PackageHighlights;
