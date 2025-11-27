import React from "react";
import Button from "../atoms/Button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { isAuthenticated } from "@/utils/auth";
import AuthModal from "./AuthModal";

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
    <div className="lg:w-1/4 lg:self-end">
      <h3 className="text-3xl md:text-4xl text-red mb-4">Tour Highlights</h3>
      <ul className="list-disc space-y-2 ml-4">
        {highlights?.map((point: string, i: number) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
      <Button
        label="BOOK NOW"
        className="mt-6 w-full bg-red text-white py-3 rounded-md font-semibold"
        onClick={() => {
          if (!isAuthenticated()) {
            openModal("Please log in to create a custom package");
            return;
          }
          handleBooking();
        }}
      />
      <AuthModal isOpen={isOpen} message={message} onClose={closeModal} />
    </div>
  );
};

export default PackageHighlights;
