import { checkImageUrl } from "@/utils/common";
import React, { useState } from "react";
import { Sparkles } from "lucide-react";

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
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="rounded-2xl shadow-2xl bg-cover bg-center h-[350px] sm:h-[400px] md:h-[450px] relative overflow-hidden group">
      {!imageLoaded && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}

      <img
        src={imageUrl ? checkImageUrl(imageUrl) : "/default-image.jpg"}
        alt="Hero Image"
        className={`absolute w-full h-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-105 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setImageLoaded(true)}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20 rounded-2xl z-0 transition-all duration-500 group-hover:from-black/50 group-hover:via-black/30" />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-8 md:px-12 text-white">
        {/* Title */}
        <div className="text-center mb-4 sm:mb-6 transform transition-all duration-500 group-hover:scale-105">
          <div className="inline-block">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight px-4 py-2 rounded-lg transition-all duration-300"
              style={{
                textShadow:
                  "0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,1)",
                WebkitTextStroke: "0.5px rgba(255,255,255,0.2)",
              }}
            >
              {title}
            </h1>
            <div className="mt-3 mx-auto w-24 h-1 bg-gradient-to-r from-[#cd1a40] via-[#ff803c] to-[#cd1a40] rounded-full shadow-lg transform transition-all duration-500 group-hover:w-32" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-center leading-relaxed px-4 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:bg-black/40"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            }}
          >
            {description}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-2xl transition-opacity duration-700 pointer-events-none opacity-0 group-hover:opacity-100" />
    </div>
  );
};

export default Jumbotron;
