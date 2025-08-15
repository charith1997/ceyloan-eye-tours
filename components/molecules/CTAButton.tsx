"use client";

import Button from "@/components/atoms/Button";
import { resetRoute } from "@/features/routingSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";

const CTAButton = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center mt-6">
      <Button
        label={
          <Link
            href="/plan-your-trip"
            onClick={() => {
              dispatch(resetRoute("plan-your-trip"));
            }}
          >
            Plan Your Trip
          </Link>
        }
        className="bg-gradient-to-r from-red to-orange text-white font-semibold px-8 py-3 rounded-md shadow-lg hover:opacity-90 transition cursor-pointer"
      />
    </div>
  );
};

export default CTAButton;
