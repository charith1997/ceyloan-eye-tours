import { checkImageUrl } from "@/utils/common";
import React from "react";

interface JumbotronProps {
  title: string | React.ReactNode;
  description: string;
  imageUrl: string;
}

const Jumbotron: React.FC<JumbotronProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <div className="rounded-xl shadow-md bg-cover bg-center h-[300px] inset-0 z-0 relative">
      <img
        src={imageUrl ? checkImageUrl(imageUrl) : "/default-image.jpg"}
        alt="Hero Image"
        className="absolute w-full h-full object-cover rounded-xl"
      />

      <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white gap-6">
        <p className="text-4xl md:text-6xl font-bold md:whitespace-nowrap text-center">
          {title}
        </p>
        <p className="text-lg w-full sm:w-3/5 text-center">{description}</p>
      </div>
    </div>
  );
};

export default Jumbotron;
