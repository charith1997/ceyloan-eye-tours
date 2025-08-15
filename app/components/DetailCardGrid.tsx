import DetailCard from "./DetailCard";

interface Package {
  title: string;
  Images: string[];
  duration: string;
  price: string;
  url_prefix: string;
  rating: number;
}

interface DetailCardGridProps {
  packages: Package[];
}

export default function DetailCardGrid({ packages }: DetailCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-8">
      {packages?.map((packagex, index) => (
        <DetailCard
          key={index}
          {...packagex}
          imageUrl={packagex.Images[0] || "/family tours/Wildlife.jpg"}
          slug={packagex.url_prefix}
        />
      ))}
    </div>
  );
}
