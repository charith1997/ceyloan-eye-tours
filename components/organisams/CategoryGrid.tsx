"use client";

import React from "react";
import Card from "../molecules/Card";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { pushRoute } from "@/features/routingSlice";
import { useDispatch } from "react-redux";

const CategoryGrid = ({ categories }: { categories: any[] }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
      {categories.map((category: any, index: number) => (
        <Link
          href={`${pathname}/${category.url_prefix
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          onClick={() => {
            dispatch(
              pushRoute(category.name.toLowerCase().replace(/\s+/g, "-"))
            );
          }}
          key={index}
        >
          <Card
            title={category.name}
            count={category.packageCount}
            imageUrl={category.image_url}
            description="Tours"
            isTitleHighlighted={true}
          />
        </Link>
      ))}
    </div>
  );
};

export default CategoryGrid;
