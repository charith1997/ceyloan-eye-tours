"use client";

import React from "react";
import PageContainer from "@/components/containers/PageContainer";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageRouting from "@/components/molecules/PageRouting";
import Content from "./Content";

function PrivacyAndPolicyPage() {
  return (
    <PageContainer isDisplayPlan={false}>
      <Jumbotron
        title="Privacy & Policy"
        description="Please read our payment and cancellation policies carefully"
        imageUrl="/hero images/reviews.jpeg"
      />
      <div className="max-w-full py-12">
        <PageRouting />
        <Content />
      </div>
    </PageContainer>
  );
}

export default PrivacyAndPolicyPage;
