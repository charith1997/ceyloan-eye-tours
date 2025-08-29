"use client";

import { getLastParam } from "@/utils/common";
import { useGetPackageByUrlPrefixQuery } from "@/services/packageApi";
import PackagePage from "@/components/pages/PackagePage";

export default function PackageByRoundToursPage() {
  const lastParam = getLastParam();

  const { data, error } = useGetPackageByUrlPrefixQuery(lastParam);
  if (error) return <div>Error loading package details</div>;

  const packageData = data?.data ?? {};
  return (
    <PackagePage
      title={packageData.package.title}
      description={packageData.package.description}
      duration={packageData.package.duration}
      Images={packageData.package.Images}
      excludes={packageData.package.excludes}
      includes={packageData.package.includes}
      imageUrl={packageData.package.imageUrl}
      package_highlights={packageData.package.package_highlights}
      tour_type={packageData.package.tour_type}
      places={packageData.places}
    />
  );
}
