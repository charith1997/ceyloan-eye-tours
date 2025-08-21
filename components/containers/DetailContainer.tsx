import React from "react";

interface ListContainerProps {
  children: React.ReactNode;
  className?: string;
}

const DetailContainer = ({ children, className }: ListContainerProps) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {children}
    </div>
  );
};

export default DetailContainer;
