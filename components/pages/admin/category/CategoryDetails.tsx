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
        <div className="bg-gray-50 rounded-lg p-4 w-full">
          <h4 className="text-lg text-gray-900 mb-4">Category Information</h4>
          <div className="flex flex-col md:flex-row justify-between gap-4 pb-4 text-sm">
            <SingleInfo title="Name" value={category.name} />
            <SingleInfo title="Package Count" value={category.packageCount} />
          </div>
          <SingleInfo title="Description" value={category.description} />
        </div>
      </div>
    </AdminDetailsContainer>
  );
}

export default CategoryDetails;

interface SingleInfoProps {
  title: string;
  value: string;
}

const SingleInfo = ({ title, value }: SingleInfoProps) => (
  <div className="flex gap-2 text-sm">
    <p className="text-gray-600">{title}:</p>
    <p className="text-gray-900">{value}</p>
  </div>
);
