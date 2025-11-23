import { getUserDetails } from "@/utils/auth";
import {
  CalendarIcon,
  ChartGanttIcon,
  CheckCircleIcon,
  ClockIcon,
  CreditCardIcon,
  ExpandIcon,
  MailIcon,
  PlaneLandingIcon,
  StarIcon,
  UserIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import React, { JSX } from "react";

// Type definitions
interface Package {
  title: string;
}

interface CustomPackage {
  message: string;
}

interface User {
  name: string;
  email: string;
}

interface Review {
  rating: number;
  review: string;
}

interface Payment {
  id: string;
  payment_id: string;
  amount: string;
  status: "success" | "failed" | "pending";
}

interface Booking {
  id: string;
  adult_count: number;
  child_count: number;
  status: "completed" | "pending" | "cancelled" | "confirmed";
  start_date: string;
  package_id: string | null;
  custom_package_id: string | null;
  customer_id: string;
  message: string;
  created_at: string;
  updated_at: string;
  Package?: Package | null;
  CustomPackage?: CustomPackage | null;
  User: User;
  Review?: Review | null;
  Payment?: Payment | null;
}

interface BookingDetailsProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  booking,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !booking) return null;

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDateTime = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "completed":
        return "bg-green-200 text-green-800";
      case "pending":
        return "bg-yellow-200 text-yellow-800";
      case "cancelled":
        return "bg-red-200 text-red-800";
      case "confirmed":
        return "bg-blue-200 text-blue-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const renderStarRating = (rating: number): JSX.Element => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const { userName, email } = getUserDetails();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-75 transition-opacity"
          onClick={handleBackdropClick}
        />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-4xl">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <h3 className="text-xl font-semibold leading-6 text-gray-900">
                  Booking Details
                </h3>
                <div className="ml-4 flex items-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs border ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <XIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-lg text-gray-900 mb-3">
                  Package Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Package</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {booking.package_id
                        ? booking.Package?.title
                        : "Custom Package"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p
                      className="mt-1 text-sm text-gray-900 font-mono"
                      title={`Full ID: ${booking.id}`}
                    >
                      {booking.id.split("-")[0]}...
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-4">Booking Details</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CalendarIcon className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Start Date</p>
                      <p className="text-xs text-gray-900">
                        {formatDate(booking.start_date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <UsersIcon className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Participants</p>
                      <p className="text-xs text-gray-900">
                        {booking.adult_count} Adults, {booking.child_count}{" "}
                        Children
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CreditCardIcon className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Total Amount</p>
                      <p className="text-xs text-gray-900">
                        {formatPrice(
                          parseFloat(booking.Payment?.amount || "0")
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-4">
                  Customer Information
                </h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <UserIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Customer Name</p>
                        <p className="text-sm text-gray-900">{userName}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <MailIcon className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="text-sm text-gray-900">{email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {booking.Payment && (
                <div>
                  <h4 className="text-lg text-gray-900 mb-4">
                    Payment Information
                  </h4>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Payment ID</p>
                        <p className="mt-1 text-sm text-gray-900 font-mono">
                          {booking.Payment.payment_id}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          {formatPrice(parseFloat(booking.Payment.amount))}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">Payment Status</p>
                        <p
                          className={`mt-1 text-sm  ${
                            booking.Payment.status === "success"
                              ? "text-green-600"
                              : booking.Payment.status === "pending"
                              ? "text-yellow-600"
                              : booking.Payment.status === "failed"
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {booking.Payment.status.charAt(0).toUpperCase() +
                            booking.Payment.status.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {booking.Review && (
                <div>
                  <h4 className="text-lg text-gray-900 mb-4">
                    Customer Review
                  </h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-1">
                        <div className="mb-2">
                          {renderStarRating(booking.Review.rating)}
                        </div>
                        <p className="text-sm text-gray-700">
                          &quot;{booking.Review.review}&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-lg text-gray-900 mb-4">Booking Message</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <ChartGanttIcon className="w-5 h-5 text-gray-400 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">
                        {booking.message || "No additional message provided."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg text-gray-900 mb-4">Timeline</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Created At</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {formatDateTime(booking.created_at)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">Last Updated</p>
                      <p className="mt-1 text-sm text-gray-900">
                        {formatDateTime(booking.updated_at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
