import React from "react";
import Card from "../molecules/Card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";

interface CardGridProps {
  data: any[];
  isLinked?: boolean;
  children: (
    cardTitle: string,
    cardDescription: string,
    count: number
  ) => React.ReactNode;
}

function CardGrid({ data, isLinked = true, children }: CardGridProps) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
      {isLinked &&
        data.map((item: any, index: number) => (
          <Link
            href={`${pathname}/${item.url_prefix
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            key={index}
          >
            <Card title={item.name} imageUrl={item.image_url}>
              {children(item.cardTitle, item.cardDescription, item.count ?? "")}
            </Card>
          </Link>
        ))}

      {!isLinked &&
        data.map((item: any, index: number) => (
          <Card title={item.name} imageUrl={item.image_url} key={index}>
            {children(item.cardTitle, item.cardDescription, item.count ?? "")}
          </Card>
        ))}
    </div>
  );
}

export default CardGrid;
