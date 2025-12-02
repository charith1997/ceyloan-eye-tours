"use client";

import React, { use, useEffect, useState } from "react";
import { User, Upload } from "lucide-react";
import Image from "next/image";
import { checkImageUrl } from "@/utils/common";

interface ProfileImageProps {
  updateProfileImage: (file: File) => void;
  disabled?: boolean;
  initialImageUrl?: string;
}

function ProfileImage({
  updateProfileImage,
  disabled,
  initialImageUrl,
}: ProfileImageProps) {
  const [imagePreview, setImagePreview] = useState<any | null>(null);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      updateProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (initialImageUrl) {
      setImagePreview(initialImageUrl);
    }
  }, [initialImageUrl]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="relative">
          <div
            className={`w-24 h-24 rounded-full border-1 border-dashed border-gray-400 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {imagePreview ? (
              <Image
                src={checkImageUrl(imagePreview)}
                alt="Avatar preview"
                className="w-full h-full object-cover rounded-full"
                width={96}
                height={96}
              />
            ) : (
              <User className="w-10 h-10 text-gray-400" />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`absolute inset-0 w-full h-full opacity-0 ${
                disabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              disabled={disabled}
            />
          </div>

          <div className="absolute -bottom-1 -right-1 bg-orange rounded-full p-2 shadow-lg">
            <Upload className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-500 text-center mt-4 mb-6">
        Click to upload profile picture
      </p>
    </div>
  );
}

export default ProfileImage;
