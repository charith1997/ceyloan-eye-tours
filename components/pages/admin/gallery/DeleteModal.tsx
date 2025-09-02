import React from "react";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { useDeleteCategoryMutation } from "@/services/categoryApi";
import toast from "react-hot-toast";

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
          className="w-full text-white px-8 py-2 rounded-lg bg-[#1976D2] text-lg font-semibold uppercase"
          label="Cancel"
          onClick={onClose}
        />
        <Button
          className="w-full text-white px-8 py-2 rounded-lg bg-red text-lg font-semibold uppercase"
          label="Delete"
          onClick={handleDelete}
        />
      </div>
    </Modal>
  );
}

export default DeleteModal;
