import React from "react";
import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";

interface DeletePackageProps {
  show: boolean;
  onClose: () => void;
}

function DeletePackage({ show, onClose }: DeletePackageProps) {
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
          className="w-full text-white px-8 py-2 rounded-lg bg-[#1976D2] text-lg font-semibold uppercase"
          label="Cancel"
          onClick={onClose}
        />
        <Button
          className="w-full text-white px-8 py-2 rounded-lg bg-red text-lg font-semibold uppercase"
          label="Delete"
          onClick={() => {}}
        />
      </div>
    </Modal>
  );
}

export default DeletePackage;
