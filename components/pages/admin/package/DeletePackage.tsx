import React from "react";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { cancelBtnColor, deleteBtnColor } from "@/styles/colors";
import { useDeletePackageMutation } from "@/services/packageApi";
import toast from "react-hot-toast";

interface DeletePackageProps {
  show: boolean;
  onClose: () => void;
  selectedID: string | null;
}

function DeletePackage({ show, onClose, selectedID }: DeletePackageProps) {
  const [deletePackage] = useDeletePackageMutation();
  console.log("selectedID", selectedID);
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Delete Package"
      className="md:w-fit"
    >
      <p>Are you sure you want to delete this package?</p>
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
              console.log("selectedID", selectedID);

              try {
                const response = await deletePackage(selectedID).unwrap();
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

export default DeletePackage;
