import React from "react";
import Card1 from "../molecules/Card1";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { pushRoute } from "@/features/routingSlice";

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
            onClick={() => {
              dispatch(pushRoute(item.name.toLowerCase().replace(/\s+/g, "-")));
            }}
            key={index}
          >
            <Card1 title={item.name} imageUrl={item.image_url}>
              {children(item.cardTitle, item.cardDescription, item.count ?? "")}
            </Card1>
          </Link>
        ))}

      {!isLinked &&
        data.map((item: any, index: number) => (
          <Card1 title={item.name} imageUrl={item.image_url} key={index}>
            {children(item.cardTitle, item.cardDescription, item.count ?? "")}
          </Card1>
        ))}
    </div>
  );
}

export default CardGrid;
