import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { useUpdateStatusMutation } from "@/services/bookingApi";
import React from "react";
import toast from "react-hot-toast";

interface ActionModalProps {
  show: boolean;
  onClose: () => void;
  selectedID?: string | null;
  status: Status;
}

type Status = "pending" | "confirmed" | "cancelled" | "completed";

function getStatusTitle(status: Status): string {
  const titleMap: Record<Status, string> = {
    pending: "Pending Booking",
    confirmed: "Confirmed Booking",
    cancelled: "Cancelled Booking",
    completed: "Completed Booking",
  };

  return titleMap[status];
}

function ActionModal({ show, onClose, selectedID, status }: ActionModalProps) {
  const [updateStatus] = useUpdateStatusMutation();
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title={getStatusTitle(status as Status)}
      className="md:w-fit"
    >
      <p>Are you sure you want to {status} this booking?</p>
      <div className="flex justify-between gap-6 pt-6">
        <Button
          className="w-full text-white px-8 py-2 rounded-lg bg-[#1976D2] tracking-wide"
          label="No"
          onClick={onClose}
        />
        <Button
          className="w-full text-white px-8 py-2 rounded-lg bg-red tracking-wide"
          label={status.charAt(0).toUpperCase() + status.slice(1)}
          onClick={async () => {
            if (selectedID) {
              try {
                const response = await updateStatus({
                  id: selectedID,
                  data: { status },
                }).unwrap();
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

export default ActionModal;
