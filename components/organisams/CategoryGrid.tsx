import React from "react";
import Card from "../molecules/Card";

const CategoryGrid = ({ categories }: { categories: any[] }) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {categories.map((category: any, index: number) => (
        <Card
          key={index}
          title={category.name}
          count={category.packageCount}
          imageUrl={category.image_url}
          slug={category.name}
          description="Tours"
          isTitleHighlighted={true}
          parentRoute="round-tours"
        />
      ))}
    </div>
  );
};

export default CategoryGrid;
