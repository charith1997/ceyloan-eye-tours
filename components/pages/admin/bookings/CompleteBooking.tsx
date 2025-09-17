import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { useUpdateStatusMutation } from "@/services/bookingApi";
import React from "react";
import toast from "react-hot-toast";

interface CompleteBookingProps {
  show: boolean;
  onClose: () => void;
  selectedID: string | null;
}

function CompleteBooking({ show, onClose, selectedID }: CompleteBookingProps) {
  const [updateStatus] = useUpdateStatusMutation();
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Complete Booking"
      className="md:w-fit"
    >
      <p>Are you sure you want to complete this booking?</p>
      <div className="flex justify-between gap-6 pt-6">
        <Button
          className="w-full text-white px-8 py-2 rounded-lg bg-[#1976D2] tracking-wide"
          label="No"
          onClick={onClose}
        />
        <Button
          className="w-full text-white px-8 py-2 rounded-lg bg-green-600 tracking-wide"
          label="Complete"
          onClick={async () => {
            if (selectedID) {
              try {
                const response = await updateStatus({
                  id: selectedID,
                  data: { status: "completed" },
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

export default CompleteBooking;
