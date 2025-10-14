import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { cancelBtnColor } from "@/styles/colors";
import React from "react";

interface ActionModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  description: string;
  handleSubmit: () => void;
  buttonLabel?: string;
  submitLabel?: string;
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
  submitLabelColor,
}: ActionModalProps) {
  return (
    <Modal isOpen={show} onClose={onClose} title={title} className="md:w-fit">
      <p>{description}</p>
      <div className="flex justify-between gap-6 pt-6">
        <Button
          className={`w-full ${cancelBtnColor}`}
          label={buttonLabel || "Cancel"}
          onClick={onClose}
        />
        <Button
          className={submitLabelColor}
          label={submitLabel || "Approve"}
          onClick={handleSubmit}
        />
      </div>
    </Modal>
  );
}

export default ActionModal;
