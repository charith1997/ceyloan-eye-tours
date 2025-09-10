import React from "react";
import Jumbotron from "../molecules/Jumbotron";
import PageRouting from "../molecules/PageRouting";
import CTAButton from "../molecules/CTAButton";
import DurationCard from "../molecules/DurationCard";
import PackageDetails from "../organisams/PackageDetails";
import BookPackage from "../organisams/BookPackage";

interface PackagePageProps {
  title: string;
  description: string[];
  imageUrl: string;
  duration: string;
  tour_type: number;
  package_highlights: string[];
  includes: string[];
  excludes: string[];
  Images: string[];
  places: any[];
  packageId: string;
}

const PackagePage: React.FC<PackagePageProps> = ({
  title,
  description,
  duration,
  Images,
  excludes,
  includes,
  imageUrl,
  package_highlights,
  tour_type,
  places,
  packageId,
}) => {
  const [showBooking, setShowBooking] = React.useState(false);
  return (
    <section className="pt-24 pb-16 px-4 md:px-16">
      <Jumbotron
        title={title}
        description="Hero description"
        imageUrl={imageUrl}
      />
      <DurationCard duration={duration} tour_type={tour_type} />

      <PageRouting />

      <PackageDetails
        description={description}
        images={Images}
        highlights={package_highlights}
        includes={includes}
        excludes={excludes}
        places={places}
        handleBooking={() => setShowBooking(true)}
      />

      <CTAButton />
      <BookPackage
        show={showBooking}
        onClose={() => setShowBooking(false)}
        packageId={packageId}
      />
    </section>
  );
};

export default PackagePage;
