"use client";

import { getLastParam } from "@/utils/common";
import { useGetCategoryByUrlPrefixQuery } from "@/services/categoryApi";
import CategoryPage from "@/components/pages/CategoryPage";

export default function CategoryByDayToursPage() {
  const lastSegment = getLastParam();

  const { data } = useGetCategoryByUrlPrefixQuery({
    slug: lastSegment,
    tourType: "1",
  });

  const categoryData = data?.data ?? {};
  return (
    <CategoryPage
      heroTitle={categoryData.name}
      heroDescription={categoryData.hero_description}
      packages={categoryData.Packages}
      description={categoryData.description}
      imageUrl={categoryData.image_url}
      title={categoryData.name}
    />
  );
}
