import React, { useState } from "react";
import { User, Upload } from "lucide-react";
import Image from "next/image";

interface ProfileImageProps {
  updateProfileImage: (file: File) => void;
}

function ProfileImage({ updateProfileImage }: ProfileImageProps) {
  const [imagePreview, setImagePreview] = useState(null);

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
  return (
    <div>
      <div className="flex justify-center">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-1 border-dashed border-gray-400 flex items-center justify-center overflow-hidden bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            {imagePreview ? (
              <Image
                src={imagePreview}
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
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
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
