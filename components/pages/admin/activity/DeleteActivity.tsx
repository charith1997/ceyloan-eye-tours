import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { useDeleteActivityMutation } from "@/services/activityApi";
import { cancelBtnColor, deleteBtnColor } from "@/styles/colors";
import React from "react";
import toast from "react-hot-toast";

interface DeleteActivityProps {
  show: boolean;
  onClose: () => void;
  selectedID: string | null;
}

function DeleteActivity({ show, onClose, selectedID }: DeleteActivityProps) {
  const [deleteActivity] = useDeleteActivityMutation();
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
          className={`w-full ${cancelBtnColor}`}
          label="Cancel"
          onClick={onClose}
        />
        <Button
          className={`w-full ${deleteBtnColor}`}
          label="Delete"
          onClick={async () => {
            if (selectedID) {
              try {
                const response = await deleteActivity(selectedID).unwrap();
                toast.success(response.message);
                onClose();
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

export default DeleteActivity;
