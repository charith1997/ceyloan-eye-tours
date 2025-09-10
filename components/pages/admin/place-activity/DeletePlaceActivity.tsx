import React from "react";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { useDeletePlaceActivityMutation } from "@/services/placeActivity";
import toast from "react-hot-toast";

interface DeletePackageProps {
  show: boolean;
  onClose: () => void;
  placeId: string | null;
  activityId: string | null;
  callback: () => void;
}

function DeletePlaceActivity({
  show,
  onClose,
  placeId,
  activityId,
  callback,
}: DeletePackageProps) {
  const [deletePlaceActivity] = useDeletePlaceActivityMutation();
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Delete Activity"
      className="md:w-fit"
    >
      <p>Are you sure you want to delete this activity?</p>
      <div className="flex justify-between gap-6 pt-6">
        <Button
          className="w-full text-white px-8 py-2 rounded-lg bg-[#1976D2] text-lg font-semibold uppercase"
          label="Cancel"
          onClick={onClose}
        />
        <Button
          className="w-full text-white px-8 py-2 rounded-lg bg-red text-lg font-semibold uppercase"
          label="Delete"
          onClick={async () => {
            if (placeId && activityId) {
              try {
                const response = await deletePlaceActivity(
                  `${placeId}/${activityId}`
                ).unwrap();
                toast.success(response.message);
                onClose();
                if (callback) callback();
              } catch (err: any) {
                toast.error(err?.data?.message);
              }
            }
          }}
        />
      </div>
    </Modal>
  );
}

export default DeletePlaceActivity;
