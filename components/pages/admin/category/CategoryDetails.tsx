import AdminDetailsContainer from "@/components/containers/AdminDetailsContainer";
import Image from "next/image";
import React from "react";

interface CategoryDetailsProps {
  category: any;
  onClose: () => void;
}

function CategoryDetails({ category, onClose }: CategoryDetailsProps) {
  return (
    <AdminDetailsContainer
      onClose={onClose}
      heading={
        <h3 className="text-xl font-semibold leading-6 text-gray-900">
          Category Details
        </h3>
      }
    >
      <div className="block md:flex gap-4">
        <Image
          src={category.image_url}
          alt="Category Image"
          width={250}
          height={200}
          className="object-cover rounded-lg w-full md:max-w-60 h-auto"
        />
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-lg text-gray-900 mb-4">Category Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
            <div className="flex gap-2 items-center">
              <p className="text-sm text-gray-500">Category Name:</p>
              <p className="text-sm text-gray-900">{category.name}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="text-sm text-gray-500">Package Count:</p>
              <p className="text-sm text-gray-900">{category.packageCount}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <p className="text-sm text-gray-500">Description:</p>
            <p className="text-sm text-gray-900">{category.description}</p>
          </div>
        </div>
      </div>
    </AdminDetailsContainer>
  );
}

export default CategoryDetails;
