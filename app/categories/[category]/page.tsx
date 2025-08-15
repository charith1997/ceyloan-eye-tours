"use client";

import CTAButton from "@/app/components/CTAButton";
import DetailCardGrid from "@/app/components/DetailCardGrid";
import Jumbotron from "@/components/molecules/Jumbotron";
import PageDetails from "@/components/organisams/PageDetails";
import { useGetCategoryByUrlPrefixQuery } from "@/services/categoryApi";
import { getLastParam } from "@/utils/common";

export default function CategoryPage() {
  const lastSegment = getLastParam();

  const { data, error, isLoading } =
    useGetCategoryByUrlPrefixQuery(lastSegment);

  const categoryData = data?.data ?? {};

  return (
    <section className="py-16 px-4 md:px-16">
      <Jumbotron
        title={categoryData.name}
        description={categoryData.hero_description}
        imageUrl={categoryData.image_url}
      />
      <PageDetails
        title={categoryData.name}
        description={categoryData.description}
      />
      <div className="min-h-screen">
        {categoryData.Packages && categoryData.Packages.length > 0 && (
          <DetailCardGrid packages={categoryData.Packages} />
        )}
        <CTAButton />
      </div>
    </section>
  );
}
