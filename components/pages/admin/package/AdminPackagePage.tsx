import React, { useEffect, useState } from "react";
import { CalendarDays, Component } from "lucide-react";
import Button from "@/components/atoms/Button";
import NavigationContainer from "@/components/containers/NavigationContainer";
import SearchContainer from "@/components/containers/SearchContainer";
import {
  useGetAllPackagesQuery,
  useGetPackageByUrlPrefixQuery,
} from "@/services/packageApi";
import { formatDuration } from "@/utils/package";
import { displayTourType } from "@/utils/common";
import AddPackage from "./AddPackage";
import DetailContainer from "@/components/containers/DetailContainer";
import DeletePackage from "./DeletePackage";
import PackageDetails from "./PackageDetails";
import { deleteBtnColor, editBtnColor, viewBtnColor } from "@/styles/colors";

const AdminPackagePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any | null>(null);

  const [isEdit, setIsEdit] = useState(false);
  const [packagePlaceData, setPackagePlaceData] = useState([]);

  const { data } = useGetAllPackagesQuery();
  const packages = Array.isArray(data?.data) ? data.data : [];

  const { data: pkgPlaceData } = useGetPackageByUrlPrefixQuery(
    isEdit ? selectedPackage?.url_prefix || "" : "",
    { skip: !isEdit }
  );

  useEffect(() => {
    if (isEdit && pkgPlaceData) {
      setPackagePlaceData(
        pkgPlaceData?.data.places.map((item: any) => ({
          place_id: item.place?.id || "",
          description: item.packagePlace?.description || "",
          order: item.packagePlace?.sort_order || "",
          day_no: item.packagePlace?.day_no || "",
          events: item.packagePlace?.events || [],
        })) ?? []
      );
    }
  }, [isEdit, pkgPlaceData]);

  return (
    <>
      <NavigationContainer>
        <SearchContainer
          searchPlaceholder="Search Packages..."
          title="Packages"
          buttonName="Add Package"
          onClick={() => setShowModal(true)}
        />
        <DetailContainer className="max-h-[calc(100vh-307px)] md:max-h-[calc(100vh-182px)]">
          {packages.map((item: any, index: number) => (
            <div key={index}>
              <div className="hidden md:flex w-full items-center justify-between py-2 px-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-8">
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

                <div className="flex gap-2 text-sm font-bold">
                  <h3>LKR</h3>
                  <h3>{item.price}</h3>
                </div>

                <div className="flex gap-4">
                  <Button
                    label="View Details"
                    className={`w-fit text-sm uppercase ${viewBtnColor}`}
                    onClick={() => {
                      setDisplayDetails(true);
                      setSelectedPackage(item);
                    }}
                  />
                  <Button
                    label="Edit"
                    className={`w-fit text-sm uppercase ${editBtnColor}`}
                    onClick={() => {
                      setIsEdit(true);
                      setSelectedPackage(item);
                      setShowModal(true);
                    }}
                  />
                  <Button
                    label="Delete"
                    className={`w-fit text-sm uppercase ${deleteBtnColor}`}
                    onClick={() => setDeleteModal(true)}
                  />
                </div>
              </div>

              <div className="flex md:hidden w-full items-center justify-between py-2 px-4 gap-2 rounded-lg shadow-sm border border-gray-300">
                <div className="grid gap-4 w-full">
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
                    <p className="font-bold">LKR {item.price}</p>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button
                      label="View Details"
                      className={`w-fit ${viewBtnColor}`}
                      onClick={() => {
                        setDisplayDetails(true);
                        setSelectedPackage(item);
                      }}
                    />
                    <Button
                      label="Edit"
                      className={`w-fit ${editBtnColor}`}
                      onClick={() => {
                        setIsEdit(true);
                        setSelectedPackage(item);
                        setShowModal(true);
                      }}
                    />
                    <Button
                      label="Delete"
                      className={`w-fit ${deleteBtnColor}`}
                      onClick={() => setDeleteModal(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </DetailContainer>
      </NavigationContainer>

      <AddPackage
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedPackage(null);
          setIsEdit(false);
        }}
        isEdit={isEdit}
        initialValues={
          isEdit
            ? {
                ...selectedPackage,
                duration: parseInt(
                  selectedPackage.duration.match(/(\d+)\s*days?/i)?.[1] || "0",
                  10
                ),
                tourType: displayTourType(selectedPackage.tour_type),
                categoryIds: selectedPackage.Categories.map(
                  (category: any) => category.id
                ),
                arrival: selectedPackage.arrival_location,
                arrivalDescription: selectedPackage.arrival_description,
                departure: selectedPackage.departure_location,
                departureDescription: selectedPackage.departure_description,
                packageHighlights: selectedPackage.package_highlights,
                images: selectedPackage.Images.map(
                  (image: any) => image.image_url
                ),
                placeIds: packagePlaceData,
              }
            : null
        }
      />

      <DeletePackage
        show={deleteModal}
        onClose={() => {
          setDeleteModal(false);
          setSelectedPackage(null);
        }}
      />

      {displayDetails && (
        <PackageDetails
          pkg={selectedPackage}
          onClose={() => {
            setDisplayDetails(false);
            setSelectedPackage(null);
          }}
        />
      )}
    </>
  );
};

export default AdminPackagePage;
