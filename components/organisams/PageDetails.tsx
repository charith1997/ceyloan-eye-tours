import React from "react";
import PageRouting from "../molecules/PageRouting";
import PageContent from "../molecules/PageContent";

interface PageDetailsProps {
  title: string;
  description: string;
}

const PageDetails = ({ title, description }: PageDetailsProps) => {
  return (
    <div className="py-12">
      <PageRouting />
      <PageContent title={title} description={description} />
    </div>
  );
};

export default PageDetails;
