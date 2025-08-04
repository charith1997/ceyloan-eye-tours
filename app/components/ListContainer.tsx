import React from "react";
import Image from "next/image";

interface ListContainerProps {
  cardDetails: React.ReactNode;
  priceDetails: React.ReactNode;
  actionButtons: (item: { id: number; imageURL: string }) => React.ReactNode;
  mobileViewCardDetails?: React.ReactNode;
  list: {
    id: number;
    imageURL: string;
  }[];
}

const ListContainer = ({
  cardDetails,
  priceDetails,
  actionButtons,
  mobileViewCardDetails,
  list,
}: ListContainerProps) => {
  return (
    <div className="flex flex-col gap-4">
      {list.map((item: { id: number; imageURL: string }) => (
        <>
          <div className="hidden md:flex w-full items-center justify-between p-2 border-2 rounded-lg border-orange">
            <div className="flex items-center gap-8">
              <Image
                src={item.imageURL}
                alt={`Tour ${item.id + 1}`}
                width={120}
                height={100}
                className="object-cover rounded-lg w-28 h-28"
              />
              {cardDetails}
            </div>

            {priceDetails}

            {actionButtons(item)}
          </div>

          <div className="flex md:hidden w-full items-center justify-between p-2 border-2 rounded-lg border-orange gap-2">
            <Image
              src={item.imageURL}
              alt={`Tour ${item.id + 1}`}
              width={160}
              height={160}
              className="object-cover rounded-lg w-36 h-36"
            />
            <div className="grid gap-2">
              {mobileViewCardDetails}
              {actionButtons(item)}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default ListContainer;
