import React from "react";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { cancelBtnColor, deleteBtnColor } from "@/styles/colors";
import { useDeleteVehicleMutation } from "@/services/vehicleApi";
import toast from "react-hot-toast";

interface DeleteVehicleProps {
  show: boolean;
  onClose: () => void;
  selectedID: string | null;
}

function DeleteVehicle({ show, onClose, selectedID }: DeleteVehicleProps) {
  const [deleteVehicle] = useDeleteVehicleMutation();
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Delete Vehicle"
      className="md:w-fit"
    >
      <p>Are you sure you want to delete this vehicle?</p>
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
                const response = await deleteVehicle(selectedID).unwrap();
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

export default DeleteVehicle;
