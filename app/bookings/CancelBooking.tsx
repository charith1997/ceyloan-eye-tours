import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { useDeleteActivityMutation } from "@/services/activityApi";
import { useUpdateStatusMutation } from "@/services/bookingApi";
import React from "react";
import toast from "react-hot-toast";

interface CancelBookingProps {
  show: boolean;
  onClose: () => void;
  selectedID: string | null;
}

function CancelBooking({ show, onClose, selectedID }: CancelBookingProps) {
  const [updateStatus] = useUpdateStatusMutation();
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Cancel Booking"
      className="md:w-fit"
    >
      <p>Are you sure you want to cancel this booking?</p>
      <div className="flex justify-between gap-6 pt-6">
        <Button
          className="w-full text-white px-8 py-2 rounded-lg bg-[#1976D2] tracking-wide"
          label="No"
          onClick={onClose}
        />
        <Button
          className="w-full text-white px-8 py-2 rounded-lg bg-red tracking-wide"
          label="Cancel"
          onClick={async () => {
            if (selectedID) {
              try {
                const response = await updateStatus({
                  id: selectedID,
                  data: { status: "cancelled" },
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

export default CancelBooking;
