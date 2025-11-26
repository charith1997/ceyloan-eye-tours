import React from "react";
import DetailCard from "../molecules/DetailCard";

interface Data {
  title: string;
  images: any[];
  duration: string;
  price: string;
  url_prefix: string;
  rating: number;
}

interface DetailCardGridProps {
  data: Data[];
  children: (item: Data) => React.ReactNode;
}

export default function DetailCardGrid({
  data,
  children,
}: DetailCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
      {data?.map((item, index) => (
        <DetailCard
          key={index}
          {...item}
          imageUrl={item.images.length > 0 ? item.images[0] : null}
          title={item.title}
          price={item.price}
          slug={item.url_prefix}
        >
          {children(item)}
        </DetailCard>
      ))}
    </div>
  );
}
