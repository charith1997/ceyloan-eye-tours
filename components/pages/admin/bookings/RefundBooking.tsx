import Button from "@/components/atoms/Button";
import Modal from "@/components/molecules/Modal";
import { useRefundPaymentMutation } from "@/services/paymentApi";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface RefundBookingProps {
  show: boolean;
  onClose: () => void;
  payment_id: string;
  description: string;
  pyament_record_id: string;
}

function RefundBooking({
  show,
  onClose,
  payment_id,
  description,
  pyament_record_id,
}: RefundBookingProps) {
  const [message, setMessaage] = useState(description);
  const [refundPayment] = useRefundPaymentMutation();
  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title="Refund this payment"
      className="md:w-fit"
    >
      <p>Are you sure you want to refund this payment?</p>
      <div className="block mt-5">
        <label className="block text-sm font-medium">Reason</label>
        <input
          className="w-full text-sm border border-gray-400 rounded px-3 py-2 focus:outline-none"
          value={message}
          onChange={(e) => setMessaage(e.target.value)}
          required
        />
        {message === null || message === "" ? (
          <label className="justify-self-end text-xs font-medium text-red-500">
            * Reason is required
          </label>
        ) : null}
      </div>
      <div className="flex justify-between gap-6 pt-6">
        <Button
          className="w-full text-white px-8 py-2 rounded-lg bg-[#1976D2] tracking-wide"
          label="No"
          onClick={onClose}
        />
        <Button
          className="w-full text-white px-8 py-2 rounded-lg bg-red tracking-wide"
          label="Refund"
          onClick={async () => {
            if (payment_id && message) {
              try {
                const response = await refundPayment({
                  payment_id: payment_id,
                  description: message,
                  pyament_record_id: pyament_record_id,
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

export default RefundBooking;
