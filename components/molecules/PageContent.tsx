import { PAGE_DESCRIPTION, PAGE_TITLE } from "@/styles/font";
import React from "react";

interface PageContentProps {
  title: string;
  description: string;
}

const PageContent = ({ title, description }: PageContentProps) => {
  return (
    <div className="relative">
      <div className="space-y-4">
        <div className="relative inline-block">
          <h1 className={`${PAGE_TITLE} relative group`}>
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {title}
            </span>
          </h1>
        </div>

        <div className="relative">
          <p className={`${PAGE_DESCRIPTION} relative`}>{description}</p>
        </div>
      </div>

      <div className="mt-8 h-px bg-gradient-to-r from-gray-300 via-gray-200 to-transparent" />
    </div>
  );
};

export default PageContent;
