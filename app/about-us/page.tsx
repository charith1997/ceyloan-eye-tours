"use client";

import React from "react";

import PageContainer from "@/components/containers/PageContainer";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageRouting from "@/components/molecules/PageRouting";
import Content from "./Content";

const AboutUs = () => {
  return (
    <PageContainer isDisplayPlan={false}>
      <Jumbotron
        title="About Jwing Tours"
        description="Experience the enchantment of Sri Lanka with a trusted partner in unforgettable journeys."
        imageUrl="/hero images/reviews.jpeg"
      />
      <div className="max-w-full py-12">
        <PageRouting />
        <Content />
      </div>
    </PageContainer>
  );
};

export default AboutUs;
