import React from "react";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { BookText, DollarSign } from "lucide-react";
import Image from "next/image";
import { deleteBtnColor, editBtnColor } from "@/styles/colors";

interface PlaceActivitiesProps {
  show: boolean;
  onClose: () => void;
  activities: any[];
  showDeleteModal: (id: string) => void;
}

function PlaceActivities({
  show,
  onClose,
  activities,
  showDeleteModal,
}: PlaceActivitiesProps) {
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Activities"
      className="md:w-2xl pb-12"
    >
      <div className="flex flex-col gap-4">
        {activities.map((activity: any) => (
          <div key={activity.id}>
            <div className="hidden md:flex w-full items-center justify-between p-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-8">
                <Image
                  src={activity.image_url}
                  alt={`Activity ${activity.name}`}
                  width={120}
                  height={100}
                  className="object-cover rounded-lg w-28 h-28"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-md font-bold uppercase">
                    {activity.name}
                  </h3>
                  <p className="flex text-sm gap-2 items-center">
                    <BookText width={16} />
                    {activity.description}
                  </p>
                  <span className="flex text-sm gap-2 items-center">
                    <DollarSign width={16} /> {activity.price}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  label="Edit"
                  className={`w-fit text-sm uppercase ${editBtnColor}`}
                />
                <Button
                  label="Delete"
                  className={`w-fit text-sm uppercase ${deleteBtnColor}`}
                  onClick={() => showDeleteModal(activity.id)}
                />
              </div>
            </div>
            <div className="flex md:hidden w-full items-center justify-between p-2 bg-white rounded-lg shadow-sm border border-gray-200 gap-2">
              <Image
                src={activity.image_url}
                alt={`Activity ${activity.name}`}
                width={160}
                height={160}
                className="object-cover rounded-lg w-36 h-36"
              />
              <div className="grid gap-2">
                <div className="flex flex-col gap-1 text-sm">
                  <h3 className="font-bold uppercase">{activity.name}</h3>
                  <p className="flex gap-2 items-center">
                    <BookText width={16} />
                    {activity.description}
                  </p>
                  <p className="flex gap-2 items-center">
                    <DollarSign width={16} />
                    {activity.price}
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button label="Edit" className={`w-fit ${editBtnColor}`} />
                  <Button
                    label="Delete"
                    className={`w-fit ${deleteBtnColor}`}
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default PlaceActivities;
