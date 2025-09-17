import React, { useState } from "react";
import { BookText, Component } from "lucide-react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import { useGetAllCategoriesQuery } from "@/services/categoryApi";
import DetailContainer from "@/components/containers/DetailContainer";
import Image from "next/image";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";

const AdminCategoryPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const { data } = useGetAllCategoriesQuery({});
  const categories = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Category..."
          title="Categories"
          buttonName="Add Category"
          onClick={() => setShowModal(true)}
        />
        <DetailContainer className="max-h-[calc(100vh-182px)] overflow-y-auto">
          {categories.map((category: any, index: number) => (
            <div key={index}>
              <div className="hidden md:flex w-full items-center justify-between p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-8">
                  <Image
                    src={category.image_url}
                    alt={`Category ${category.id}`}
                    width={120}
                    height={100}
                    className="object-cover rounded-lg w-28 h-28"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-md font-bold uppercase">
                      {category.name}
                    </h3>
                    <p className="flex text-sm gap-2 items-center">
                      <BookText width={16} />
                      {category.description}
                    </p>
                    <span className="flex text-sm gap-2 items-center">
                      <Component width={16} /> Package Count:{" "}
                      {category.packageCount}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    label="Edit"
                    onClick={() => {
                      setIsEdit(true);
                      setSelectedCategory(category);
                      setShowModal(true);
                    }}
                    className="w-20 p-2 rounded-lg text-white bg-orange text-sm uppercase"
                  />
                  <Button
                    label="Delete"
                    className="w-20 p-2 rounded-lg text-white bg-red text-sm uppercase"
                    onClick={() => {
                      setSelectedCategory(category);
                      setDeleteModal(true);
                    }}
                  />
                </div>
              </div>

              <div className="flex md:hidden w-full items-center justify-between p-2 gap-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <Image
                  src={category.image_url}
                  alt={`Tour ${category.id}`}
                  width={160}
                  height={160}
                  className="object-cover rounded-lg w-36 h-36"
                />
                <div className="grid gap-2">
                  <div className="flex flex-col gap-1 text-sm">
                    <h3 className="font-bold uppercase">{category.name}</h3>
                    <p className="flex gap-2 items-center">
                      <BookText width={16} />
                      {category.description}
                    </p>
                    <p className="flex gap-2 items-center">
                      <Component width={16} />
                      {`Package Count: ${category.packageCount}`}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      label="Edit"
                      className="w-20 p-2 rounded-lg text-white bg-orange text-sm uppercase"
                    />
                    <Button
                      label="Delete"
                      className="w-20 p-2 rounded-lg text-white bg-red text-sm uppercase"
                      onClick={() => setDeleteModal(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </DetailContainer>
      </NavigationContainer>

      <AddCategory
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedCategory(null);
          setIsEdit(false);
        }}
        isEdit={isEdit}
        initialValues={isEdit ? selectedCategory : null}
      />

      <DeleteCategory
        show={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelectedCategory(null);
        }}
        selectedID={selectedCategory?.id}
      />
    </>
  );
};

export default AdminCategoryPage;
