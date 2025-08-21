import React, { useState } from "react";
import { CalendarDays, Component } from "lucide-react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import { useGetAllPackagesQuery } from "@/services/packageApi";
import { formatDuration } from "@/utils/package";
import { displayTourType } from "@/utils/common";
import AddPackage from "./AddPackage";
import DetailContainer from "@/components/containers/DetailContainer";
import Image from "next/image";
import DeletePackage from "./DeletePackage";

const AdminPackagePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data, error, isLoading } = useGetAllPackagesQuery();
  const packages = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Packages..."
          title="Packages"
          buttonName="Add Package"
          onClick={() => setShowModal(true)}
        />
        <DetailContainer className="max-h-[calc(100vh-182px)] overflow-y-auto">
          {packages.map((item: any, index: number) => (
            <div key={index}>
              <div className="hidden md:flex w-full items-center justify-between p-2 border-2 rounded-lg border-orange">
                <div className="flex items-center gap-8">
                  <Image
                    src={item.image_url || "/tour packages/package_1.jpg"}
                    alt={`Package ${item.id}`}
                    width={120}
                    height={100}
                    className="object-cover rounded-lg w-28 h-28"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-md font-bold uppercase">
                      {item.title}
                    </h3>
                    <p className="text-sm flex gap-2 items-center">
                      <Component fill="black" width={16} />
                      {displayTourType(item.tour_type)}
                    </p>
                    <span className="flex text-sm gap-2 items-center">
                      <CalendarDays width={16} />{" "}
                      {formatDuration(item.duration)}
                    </span>
                  </div>
                </div>

                <div className="block justify-items-center text-sm font-bold">
                  <h3>$</h3>
                  <h3>{item.price}</h3>
                </div>

                <div className="flex gap-4">
                  <Button
                    label="Edit"
                    className="w-20 p-2 rounded-md text-white bg-orange text-sm uppercase"
                  />
                  <Button
                    label="Delete"
                    className="w-20 p-2 rounded-md text-white bg-red text-sm uppercase"
                    onClick={() => setDeleteModal(true)}
                  />
                </div>
              </div>

              <div className="flex md:hidden w-full items-center justify-between p-2 border-2 rounded-lg border-orange gap-2">
                <Image
                  src={item.image_url || "/tour packages/package_1.jpg"}
                  alt={`Tour ${item.id}`}
                  width={160}
                  height={160}
                  className="object-cover rounded-lg w-36 h-36"
                />
                <div className="grid gap-2">
                  <div className="flex flex-col gap-1 text-sm">
                    <h3 className="font-bold uppercase">{item.title}</h3>
                    <p className="flex gap-2 items-center">
                      <Component fill="black" width={16} />
                      {displayTourType(item.tour_type)}
                    </p>
                    <span className="flex gap-1 items-center">
                      <CalendarDays width={16} />{" "}
                      {formatDuration(item.duration)}
                    </span>
                    <p className="font-bold">${item.price}</p>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      label="Edit"
                      className="w-20 p-2 rounded-md text-white bg-orange text-sm uppercase"
                    />
                    <Button
                      label="Delete"
                      className="w-20 p-2 rounded-md text-white bg-red text-sm uppercase"
                      onClick={() => setDeleteModal(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </DetailContainer>
      </NavigationContainer>

      <AddPackage show={showModal} onClose={() => setShowModal(false)} />

      <DeletePackage show={deleteModal} onClose={() => setDeleteModal(false)} />

      {/* <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Tour Form"
      >
        <form
          id="tour-form"
          className="space-y-4 flex-1 overflow-y-auto py-2 pr-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tour name:"
              inputClassNames={textFieldClassNames}
              labelClassNames={labelClassNames}
            />
            <Input
              label="Day count:"
              inputClassNames={textFieldClassNames}
              labelClassNames={labelClassNames}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Dropdown options={["Option 1", "Option 2"]} label="Tour Type:" />
            <Dropdown
              options={["Option 1", "Option 2"]}
              label="Places to visit:"
            />
          </div>
          <TextArea
            label="Description:"
            labelClassNames={labelClassNames}
            textAreaClassNames={`${textFieldClassNames} h-24`}
          />
          <TextArea
            label="Tour Highlights:"
            labelClassNames={labelClassNames}
            textAreaClassNames={`${textFieldClassNames} h-24`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextArea
              label="Price Includes:"
              labelClassNames={labelClassNames}
              textAreaClassNames={`${textFieldClassNames} h-24`}
            />
            <TextArea
              label="Price Excludes:"
              labelClassNames={labelClassNames}
              textAreaClassNames={`${textFieldClassNames} h-24`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Images:</label>
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-1 file:px-4 file:rounded file:border-0 file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Price:"
              inputClassNames={textFieldClassNames}
              labelClassNames={labelClassNames}
            />
          </div>
        </form>
        <div className="flex justify-center gap-6 mt-4 bg-white">
          <Button
            onClick={() => setShowModal(false)}
            className="w-full text-white px-8 py-2 rounded-lg cursor-pointer bg-[#1976D2] text-lg font-semibold uppercase"
            label="Cancel"
          />
          <Button
            type="submit"
            form="tour-form"
            className="w-full text-white px-8 py-2 rounded-lg cursor-pointer bg-gradient-to-r from-red to-orange text-lg font-semibold uppercase"
            onClick={() => {}}
            label="Save"
          />
        </div>
      </Modal> */}
    </>
  );
};

export default AdminPackagePage;
