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
    <div
      className="rounded-xl shadow-md bg-cover bg-center h-[300px] inset-0 z-0 relative"
      style={{ backgroundImage: `url("${imageUrl}")` }}
    >
      <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white gap-6">
        <p className="font-[Work_Sans] text-[36px] md:text-[64px] font-bold leading-[100%] tracking-[0] whitespace-nowrap">
          {title}
        </p>
        <p className="font-[Work_Sans] text-[16px] font-medium leading-[24px] tracking-[0] w-full sm:w-3/5 text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Jumbotron;
