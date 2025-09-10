"use client";

import { useGetCategoryByUrlPrefixQuery } from "@/services/categoryApi";
import { getLastParam } from "@/utils/common";
import CategoryPage from "@/components/pages/CategoryPage";

export default function CategoryByRoundToursPage() {
  const lastSegment = getLastParam();

  const { data, error } = useGetCategoryByUrlPrefixQuery({
    slug: lastSegment,
    tourType: "0",
  });
  if (error) return <div>Error loading category</div>;

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
