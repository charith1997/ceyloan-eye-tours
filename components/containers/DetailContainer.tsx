import React from "react";
import Paginator from "../organisams/Paginator";

interface ListContainerProps {
  children: React.ReactNode;
  className?: string;
}

const DetailContainer = ({ children, className }: ListContainerProps) => {
  return (
    <div className="relative">
      <div
        className={`flex flex-col gap-4 ${className} overflow-y-auto scrollbar-thin scroll-smooth md:py-2 pr-2 md:pr-1`}
      >
        {children}
      </div>
      <div className="bottom-4 fixed flex justify-center left-0 md:left-1/4 w-full md:w-3/4">
        <Paginator />
      </div>
    </div>
  );
};

export default DetailContainer;
