import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import DetailContainer from "@/components/containers/DetailContainer";
import { useLazyGetAllHotelTypesPaginatedQuery } from "@/services/hotelTypeApi";
import { BookText, Component } from "lucide-react";
import { deleteBtnColor, editBtnColor, viewBtnColor } from "@/styles/colors";
import { checkImageUrl } from "@/utils/common";
import HotelDetails from "./HotelDetails";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setTotalPages } from "@/features/paginatorSlice";

interface AdminHotelTypesProps {
  setDeleteHotelType: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedHotelType: React.Dispatch<React.SetStateAction<any | null>>;
  setShowHotelTypeModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchData: React.Dispatch<React.SetStateAction<any[]>>;
  setSearchKeys: React.Dispatch<React.SetStateAction<string[]>>;
  filteredData: any[];
}

function AdminHotelTypes({
  setDeleteHotelType,
  setSelectedHotelType,
  setShowHotelTypeModal,
  setSearchData,
  setSearchKeys,
  filteredData,
}: AdminHotelTypesProps) {
  const [show, setShow] = useState(false);
  const [hotelTypeURL, setHotelTypeURL] = useState<string | null>(null);

  const [hotelTypes, setHotelTypes] = useState<any[]>([]);
  const [getAllHotelTypesPaginated] = useLazyGetAllHotelTypesPaginatedQuery();
  const { currentPage } = useAppSelector((state) => state.paginator);

  const dispatch = useDispatch();

  const getAllHotelTypes = async () => {
    const { data } = await getAllHotelTypesPaginated({
      page: currentPage,
      size: 10,
    });
    if (data.success) {
      setHotelTypes(data.data);
      dispatch(setTotalPages(data.pagination.totalPages));
    }
  };

  useEffect(() => {
    if (currentPage) {
      getAllHotelTypes();
    }
  }, [currentPage]);

  useEffect(() => {
    setSearchData(hotelTypes);
    setSearchKeys(["name"]);
  }, [hotelTypes.length]);
  return (
    <>
      <DetailContainer className="max-h-[calc(100vh-377px)] md:max-h-[calc(100vh-252px)]">
        {filteredData.map((item: any, index: number) => (
          <div key={index}>
            {item && (
              <div className="hidden md:flex w-full items-center justify-between p-2 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-8">
                  <Image
                    src={
                      item.image_url
                        ? checkImageUrl(item.image_url)
                        : "/default-image.jpg"
                    }
                    alt={`Tour ${item.id}`}
                    width={120}
                    height={100}
                    className="object-cover rounded-lg w-28 h-28"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="text-md font-bold uppercase">{item.name}</h3>
                    <p className="flex text-sm gap-2 items-center">
                      <BookText width={16} />
                      {item.description}
                    </p>
                    <p className="flex text-sm gap-2 items-center">
                      <Component width={16} />
                      {item.hotelCount} Hotels
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    label="View Details"
                    className={`w-fit text-sm uppercase ${viewBtnColor}`}
                    onClick={() => {
                      setShow(true);
                      setHotelTypeURL(item.url_prefix);
                    }}
                  />
                  <Button
                    label="Edit"
                    className={`w-fit text-sm uppercase ${editBtnColor}`}
                    onClick={() => {
                      setShowHotelTypeModal(true);
                      setSelectedHotelType(item);
                    }}
                  />
                  <Button
                    label="Delete"
                    className={`w-fit text-sm uppercase ${deleteBtnColor}`}
                    onClick={() => {
                      setDeleteHotelType(true);
                      setSelectedHotelType(item);
                    }}
                  />
                </div>
              </div>
            )}

            {item && (
              <div className="flex md:hidden w-full items-center justify-between px-4 py-2 gap-2 rounded-lg shadow-sm border border-gray-200">
                <div className="grid gap-6 w-full">
                  <div className="flex flex-col gap-1 text-sm">
                    <h3 className="font-bold uppercase">{item.name}</h3>
                    <p className="flex text-sm gap-2 items-center">
                      <BookText width={16} />
                      {item.description}
                    </p>
                    <p className="flex text-sm gap-2 items-center">
                      <Component width={16} />
                      {item.hotelCount} Hotels
                    </p>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Button
                      label="View Details"
                      className={`w-fit ${viewBtnColor}`}
                      onClick={() => {
                        setShow(true);
                        setHotelTypeURL(item.url_prefix);
                      }}
                    />
                    <Button
                      label="Edit"
                      className={`w-fit ${editBtnColor}`}
                      onClick={() => {
                        setShowHotelTypeModal(true);
                        setSelectedHotelType(item);
                      }}
                    />
                    <Button
                      label="Delete"
                      className={`w-fit ${deleteBtnColor}`}
                      onClick={() => {
                        setDeleteHotelType(true);
                        setSelectedHotelType(item);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </DetailContainer>

      {show && hotelTypeURL && (
        <HotelDetails
          hotelURL={hotelTypeURL}
          onClose={() => {
            setShow(false);
            setHotelTypeURL(null);
          }}
        />
      )}
    </>
  );
}

export default AdminHotelTypes;
