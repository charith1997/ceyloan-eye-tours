"use client";

import { getLastParam } from "@/utils/common";
import { useGetCategoryByUrlPrefixQuery } from "@/services/categoryApi";
import CategoryPage from "@/components/pages/CategoryPage";

export default function CategoryByDayToursPage() {
  const lastSegment = getLastParam();

  const { data, error, isLoading } = useGetCategoryByUrlPrefixQuery({
    slug: lastSegment,
    tourType: "1",
  });
  if (isLoading) return <div>Loading category...</div>;
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
