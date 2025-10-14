import React from "react";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { useDeleteCategoryMutation } from "@/services/categoryApi";
import toast from "react-hot-toast";
import { cancelBtnColor, deleteBtnColor } from "@/styles/colors";

interface DeleteCategoryProps {
  show: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  handleDelete: () => void;
}

function DeleteModal({
  show,
  onClose,
  title,
  description,
  handleDelete,
}: DeleteCategoryProps) {
  return (
    <Modal isOpen={show} onClose={onClose} title={title} className="md:w-fit">
      <p>{description}</p>
      <div className="flex justify-between gap-6 pt-6">
        <Button
          className={`w-full ${cancelBtnColor}`}
          label="Cancel"
          onClick={onClose}
        />
        <Button
          className={`w-full ${deleteBtnColor}`}
          label="Delete"
          onClick={handleDelete}
        />
      </div>
    </Modal>
  );
}

export default DeleteModal;
