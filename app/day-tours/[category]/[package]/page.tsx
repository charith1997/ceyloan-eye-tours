"use client";

import { getLastParam } from "@/utils/common";
import { useGetPackageByUrlPrefixQuery } from "@/services/packageApi";
import PackagePage from "@/components/pages/PackagePage";

export default function PackageByDayToursPage() {
  const lastParam = getLastParam();

  const { data, error, isLoading } = useGetPackageByUrlPrefixQuery(lastParam);
  if (isLoading) return <div>Loading package details...</div>;
  if (error) return <div>Error loading package details</div>;

  const packageData = data?.data ?? {};
  return (
    <PackagePage
      title={packageData.title}
      description={packageData.description}
      duration={packageData.duration}
      Images={packageData.Images}
      excludes={packageData.excludes}
      includes={packageData.includes}
      imageUrl={packageData.imageUrl}
      package_highlights={packageData.package_highlights}
      tour_type={packageData.tour_type}
    />
  );
}
