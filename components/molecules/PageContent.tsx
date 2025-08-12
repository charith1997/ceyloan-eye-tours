import { PAGE_DESCRIPTION, PAGE_TITLE } from "@/styles/font";
import React from "react";

interface PageContentProps {
  title: string;
  description: string;
}

const PageContent = ({ title, description }: PageContentProps) => {
  return (
    <>
      <h1 className={PAGE_TITLE}>{title}</h1>
      <p className={PAGE_DESCRIPTION}>{description}</p>
    </>
  );
};

export default PageContent;
