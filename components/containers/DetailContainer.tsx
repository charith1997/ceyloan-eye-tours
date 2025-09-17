import React from "react";

interface ListContainerProps {
  children: React.ReactNode;
  className?: string;
}

const DetailContainer = ({ children, className }: ListContainerProps) => {
  return (
    <div
      className={`flex flex-col gap-4 ${className} overflow-y-auto scrollbar-thin scroll-smooth md:py-2 pr-2 md:pr-1`}
    >
      {children}
    </div>
  );
};

export default DetailContainer;
