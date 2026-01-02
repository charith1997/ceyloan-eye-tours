import React, { useState, useEffect } from "react";
import { BookText, Component } from "lucide-react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import { useLazyGetAllCategoriesPaginatedQuery } from "@/services/categoryApi";
import DetailContainer from "@/components/containers/DetailContainer";
import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import CategoryDetails from "./CategoryDetails";
import { deleteBtnColor, editBtnColor, viewBtnColor } from "@/styles/colors";
import { checkImageUrl } from "@/utils/common";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setCurrentPage, setTotalPages } from "@/features/paginatorSlice";

const AdminCategoryPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [getAllCategoriesPaginated, { data }] =
    useLazyGetAllCategoriesPaginatedQuery();
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.paginator
  );
  const dispatch = useDispatch();

  const getAllCategories = async () => {
    const params: any = {
      page: currentPage,
      size: 10,
    };

    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    await getAllCategoriesPaginated(params);
  };

  useEffect(() => {
    if (data?.success) {
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (currentPage) {
      getAllCategories();
    }
  }, [currentPage, searchQuery]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (totalPages) {
      if (currentPage > totalPages) {
        dispatch(setCurrentPage(1));
      }
    }
    if (searchQuery) {
      dispatch(setCurrentPage(1));
    }
  }, [totalPages, searchQuery]);

  const categories = data?.data || [];

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Category..."
          title="Categories"
          buttonName="Add Category"
          onClick={() => setShowModal(true)}
          onSearchChange={handleSearchChange}
        />
        <DetailContainer className="max-h-[calc(100vh-383px)] md:max-h-[calc(100vh-260px)]">
          {categories.map((category: any, index: number) => (
            <div key={index}>
              <div className="hidden md:flex w-full items-center justify-between p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-8">
                  <img
                    src={checkImageUrl(category.image_url)}
                    alt={`Category ${category.id}`}
                    className="object-cover rounded-lg w-28 h-28"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-md font-bold uppercase">
                      {category.name}
                    </h3>
                    <p className="flex text-sm gap-2 items-center">
                      <BookText width={16} />
                      <span
                        className="truncate max-w-2xl"
                        title={category.description}
                      >
                        {category.description}
                      </span>
                    </p>
                    <span className="flex text-sm gap-2 items-center">
                      <Component width={16} /> Package Count:{" "}
                      {category.packageCount}
                    </span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    label="View Details"
                    className={`w-fit text-sm uppercase ${viewBtnColor}`}
                    onClick={() => {
                      setDisplayDetails(true);
                      setSelectedCategory(category);
                    }}
                  />
                  <Button
                    label="Edit"
                    onClick={() => {
                      setIsEdit(true);
                      setSelectedCategory(category);
                      setShowModal(true);
                    }}
                    className={`w-fit text-sm uppercase ${editBtnColor}`}
                  />
                  <Button
                    label="Delete"
                    className={`w-fit text-sm uppercase ${deleteBtnColor}`}
                    onClick={() => {
                      setSelectedCategory(category);
                      setDeleteModal(true);
                    }}
                  />
                </div>
              </div>

              <div className="flex md:hidden w-full items-center justify-between py-2 px-4 gap-2 rounded-lg shadow-sm border border-gray-300">
                <div className="grid gap-4 w-full">
                  <div className="flex flex-col gap-1 text-sm">
                    <h3 className="font-bold uppercase">{category.name}</h3>
                    <p className="flex gap-2 items-center">
                      <BookText width={16} height={16} />
                      <span
                        className="line-clamp-2 w-full"
                        title={category.description}
                      >
                        {category.description}
                      </span>
                    </p>
                    <p className="flex gap-2 items-center">
                      <Component width={16} />
                      {`Package Count: ${category.packageCount}`}
                    </p>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button
                      label="View Details"
                      className={`w-fit ${viewBtnColor}`}
                      onClick={() => {
                        setDisplayDetails(true);
                        setSelectedCategory(category);
                      }}
                    />
                    <Button
                      label="Edit"
                      className={`w-fit ${editBtnColor}`}
                      onClick={() => {
                        setIsEdit(true);
                        setSelectedCategory(category);
                        setShowModal(true);
                      }}
                    />
                    <Button
                      label="Delete"
                      className={`w-fit ${deleteBtnColor}`}
                      onClick={() => {
                        setSelectedCategory(category);
                        setDeleteModal(true);
                      }}
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

      {displayDetails && (
        <CategoryDetails
          category={selectedCategory}
          onClose={() => {
            setDisplayDetails(false);
            setSelectedCategory(null);
          }}
        />
      )}
    </>
  );
};

export default AdminCategoryPage;
