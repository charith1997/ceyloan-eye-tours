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

  const { data, error } = useGetAllPackagesQuery();
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
              <div className="hidden md:flex w-full items-center justify-between p-2 bg-white rounded-lg shadow-sm border border-gray-200">
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

              <div className="flex md:hidden w-full items-center justify-between p-2 gap-2 rounded-lg shadow-sm border border-gray-200">
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
    </>
  );
};

export default AdminPackagePage;
