import React from "react";
import CTAButton from "../molecules/CTAButton";
import Paginator from "../organisams/Paginator";

function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      {children}
      <div className="mt-8 flex justify-center">
        <Paginator />
      </div>
      <CTAButton />
    </section>
  );
}

export default PageContainer;
