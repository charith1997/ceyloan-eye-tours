import React from "react";

interface ListContainerProps {
  children: React.ReactNode;
}

const DetailContainer = ({ children }: ListContainerProps) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

export default DetailContainer;
