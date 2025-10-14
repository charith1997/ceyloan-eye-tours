import React from "react";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { useDeleteCategoryMutation } from "@/services/categoryApi";
import toast from "react-hot-toast";
import { cancelBtnColor, deleteBtnColor } from "@/styles/colors";

interface DeleteCategoryProps {
  show: boolean;
  onClose: () => void;
  selectedID: string | null;
}

function DeleteCategory({ show, onClose, selectedID }: DeleteCategoryProps) {
  const [deleteCategory] = useDeleteCategoryMutation();
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Delete Category"
      className="md:w-fit"
    >
      <p>Are you sure you want to delete this category?</p>
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
                const response = await deleteCategory(selectedID).unwrap();
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

export default DeleteCategory;
