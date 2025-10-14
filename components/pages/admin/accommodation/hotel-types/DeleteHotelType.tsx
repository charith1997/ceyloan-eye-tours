import React from "react";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import toast from "react-hot-toast";
import { useDeleteHotelTypeMutation } from "@/services/hotelTypeApi";
import { cancelBtnColor, deleteBtnColor } from "@/styles/colors";

interface DeleteHotelTypeProps {
  show: boolean;
  onClose: () => void;
  selectedID: string | null;
}

function DeleteHotelType({ show, onClose, selectedID }: DeleteHotelTypeProps) {
  const [deleteHotelType] = useDeleteHotelTypeMutation();
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Delete Hotel Type"
      className="md:w-fit"
    >
      <p>Are you sure you want to delete this hotel type?</p>
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
                const response = await deleteHotelType(selectedID).unwrap();
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

export default DeleteHotelType;
