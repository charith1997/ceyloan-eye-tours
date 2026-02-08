"use client";

import Button from "@/components/atoms/Button";
import Modal from "./Modal";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setRedirectPath } from "@/features/authSlice";
import { ShieldAlert } from "lucide-react";

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
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogin = () => {
    dispatch(setRedirectPath(pathname));
    router.push("/login");
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Authentication Required"
      className="md:w-lg"
    >
      <div className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-4 py-4">
          <div className="relative">
            <div className="relative bg-gradient-to-br from-orange-100 to-red-100 p-4 rounded-full">
              <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12 text-[#cd1a40]" />
            </div>
          </div>

          <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-sm">
            {message}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <Button
            type="button"
            onClick={onClose}
            className="group flex-1 py-3 px-6 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-300 text-center border-2 border-gray-200 hover:border-gray-300 transform shadow-sm hover:shadow-md"
            label={
              <span className="flex items-center justify-center gap-2">
                Cancel
              </span>
            }
          />

          <Button
            type="button"
            onClick={handleLogin}
            className="group relative flex-1 py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-[#cd1a40] to-[#ff803c] hover:shadow-md hover:shadow-orange-500/50 transition-all duration-300 text-center transform overflow-hidden"
            label={
              <span className="relative z-10 flex items-center justify-center gap-2">
                Login to Continue
              </span>
            }
          />
        </div>

        <p className="text-xs sm:text-sm text-gray-500 text-center pt-2">
          Don't have an account?{" "}
          <button
            onClick={() => {
              router.push("/register");
              onClose();
            }}
            className="text-red font-semibold hover:underline transition-colors duration-200"
          >
            Sign up here
          </button>
        </p>
      </div>
    </Modal>
  );
}
