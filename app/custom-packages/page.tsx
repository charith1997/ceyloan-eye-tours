"use client";

import PageRouting from "@/components/molecules/PageRouting";

import React from "react";
import CustomPackages from "./CustomPackages";

function CustomPackagePage() {
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <PageRouting />
      <CustomPackages />
    </section>
  );
}

export default CustomPackagePage;
