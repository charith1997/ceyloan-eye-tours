import Modal from "@/components/molecules/Modal";
import Image from "next/image";
import React from "react";

interface VehicleDetailsProps {
  visible: boolean;
  details: any;
  onClose: () => void;
}

function VehicleDetails({ visible, details, onClose }: VehicleDetailsProps) {
  return (
    <Modal
      isOpen={visible}
      onClose={onClose}
      title="Activities"
      className="md:w-2xl pb-12"
    >
      <div className="flex flex-col">
        <div className="flex">
            
        </div>
      </div>
    </Modal>
  );
}

export default VehicleDetails;
