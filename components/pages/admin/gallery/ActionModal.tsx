import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import React from "react";

interface ActionModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  description: string;
  handleSubmit: () => void;
  buttonLabel?: string;
  submitLabel?: string;
  buttonLabelColor?: string;
  submitLabelColor?: string;
}

function ActionModal({
  show,
  onClose,
  title,
  description,
  handleSubmit,
  buttonLabel,
  submitLabel,
  buttonLabelColor,
  submitLabelColor,
}: ActionModalProps) {
  return (
    <Modal isOpen={show} onClose={onClose} title={title} className="md:w-fit">
      <p>{description}</p>
      <div className="flex justify-between gap-6 pt-6">
        <Button
          className="w-full text-white px-8 py-2 rounded-lg text-lg font-semibold uppercase bg-[#1976D2]"
          label={buttonLabel || "Cancel"}
          onClick={onClose}
        />
        <Button
          className={`w-full text-white px-8 py-2 rounded-lg text-lg font-semibold uppercase ${submitLabelColor}`}
          label={submitLabel || "Approve"}
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
}

export default ActionModal;
