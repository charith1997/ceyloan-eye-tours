"use client";

import Button from "@/components/atoms/Button";
import { FormikInput } from "@/components/atoms/FormikInput";
import Modal from "@/components/molecules/Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";

interface PayHereCheckoutProps {
  bookingId: string;
  show: boolean;
  onClose: () => void;
}

export default function PayHereCheckout({
  bookingId,
  show,
  onClose,
}: PayHereCheckoutProps) {
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    currency: "USD",
  };
  const validationSchema = Yup.object({
    first_name: Yup.string().required("* First Name is Required"),
    last_name: Yup.string().required("* Last Name is Required"),
    email: Yup.string()
      .email("* Invalid email")
      .required("* Email is Required"),
    phone: Yup.string().required("* Phone is Required"),
    address: Yup.string().required("* Address is Required"),
    city: Yup.string().required("* City is Required"),
    country: Yup.string().required("* Country is Required"),
  });

  return (
    <Modal
      isOpen={show}
      onClose={onClose}
      title={"PayHere Checkout"}
      className="md:w-lg"
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments/add`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  bookingId,
                  currency: values.currency,
                }),
              }
            );

            const { data } = await res.json();

            const payherePayload = {
              merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID,
              return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/bookings?success=true`,
              cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/bookings?cancel=true`,
              notify_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments/update`,
              order_id: data.paymentId,
              items: "Booking Payment",
              currency: values.currency,
              amount: data.amount,
              first_name: values.first_name,
              last_name: values.last_name,
              email: values.email,
              phone: values.phone,
              address: values.address,
              city: values.city,
              country: values.country,
              hash: data.hash,
            };

            const form = document.createElement("form");
            form.method = "POST";
            form.action = "https://sandbox.payhere.lk/pay/checkout";

            Object.entries(payherePayload).forEach(([key, value]) => {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = key;
              input.value = String(value);
              form.appendChild(input);
            });

            document.body.appendChild(form);
            form.submit();
            resetForm();
          } catch (error) {
            console.error("Payment error:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="space-y-4 flex-1 overflow-y-auto py-2 pr-2">
          <FormikInput
            label="First Name:"
            name="first_name"
            placeholder="Enter first name"
          />

          <FormikInput
            label="Last Name:"
            name="last_name"
            placeholder="Enter last name"
          />

          <FormikInput
            label="Email:"
            name="email"
            placeholder="Enter email"
            type="email"
          />

          <FormikInput
            label="Phone:"
            name="phone"
            placeholder="Enter phone number"
            type="tel"
          />

          <FormikInput
            label="Address:"
            name="address"
            placeholder="Enter address"
          />

          <FormikInput label="City:" name="city" placeholder="Enter city" />

          <FormikInput
            label="Country:"
            name="country"
            placeholder="Enter country"
          />

          <Button
            className="w-full text-white px-8 py-2 rounded-lg bg-[#1976D2] tracking-wide"
            label="Pay Now"
            type="submit"
          />
        </Form>
      </Formik>
    </Modal>
  );
}
