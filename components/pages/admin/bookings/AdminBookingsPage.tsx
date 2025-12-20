import React, { useEffect, useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  MailIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";
import { useGetAllBookingsQuery } from "@/services/bookingApi";
import { getUserDetails } from "@/utils/auth";
import { formatDuration, formatDurationForDayCount } from "@/utils/package";
import CancelBooking from "@/app/bookings/CancelBooking";
import Button from "@/components/atoms/Button";

import data from "../../../../data.json";
import CompleteBooking from "./CompleteBooking";
import ReopenBooking from "./ReopenBooking";
import BookingDetails from "./BookingDetails";
import {
  addBtnColor,
  approveBtnColor,
  cancelBtnColor,
  viewBtnColor,
} from "@/styles/colors";
import ActionModal from "./ActionModal";
import RefundBooking from "./RefundBooking";

interface Booking {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  location: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  price: number;
  duration: string;
  notes?: string;
}

const AdminBookingsPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [filter, setFilter] = useState<
    "all" | "pending" | "confirmed" | "completed" | "cancelled"
  >("all");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showReopenModal, setShowReopenModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [selectedBookingAction, setSelectedBookingAction] = useState<
    "pending" | "confirmed" | "cancelled" | "completed"
  >("pending");

  // Only get user details on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserDetails(getUserDetails());
    }
  }, []);

  const { data } = useGetAllBookingsQuery();
  const bookings = Array.isArray(data?.data) ? data.data : [];
  const [filteredBookings, setFilteredBookings] = useState(bookings);

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-200 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-200 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-200 text-red-800 border-red-200";
      case "confirmed":
        return "bg-blue-200 text-blue-800 border-blue-200";
      default:
        return "bg-gray-200 text-gray-800 border-gray-200";
    }
  };
  useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

  useEffect(() => {
    const filtered =
      filter === "all"
        ? bookings
        : bookings.filter((booking: any) => booking.status === filter);
    setFilteredBookings(filtered);
  }, [filter, bookings]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Prevent rendering on server or before userDetails is loaded
  if (typeof window === "undefined" || !userDetails) {
    return null;
  }

  return (
    <>
      <div className="bg-gray-50 py-8 overflow-y-auto max-h-[calc(100vh-69px)] md:min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              All Bookings
            </h1>
            <p className="text-gray-600">Manage and track all the bookings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center pl-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Pending</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {bookings.filter((b: any) => b.status === "pending").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center pl-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Confirmed</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      bookings.filter((b: any) => b.status === "confirmed")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center pl-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {
                      bookings.filter((b: any) => b.status === "completed")
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center pl-2">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {formatPrice(
                      bookings.reduce((sum: number, booking: any) => {
                        const amount = booking.Payment?.amount
                          ? parseFloat(booking.Payment.amount)
                          : 0;
                        return sum + amount;
                      }, 0)
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                {["all", "pending", "confirmed", "completed", "cancelled"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() =>
                        setFilter(
                          status as
                            | "all"
                            | "pending"
                            | "confirmed"
                            | "completed"
                            | "cancelled"
                        )
                      }
                      className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                        filter === status
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {status} (
                      {status === "all"
                        ? bookings.length
                        : bookings.filter((b: any) => b.status === status)
                            .length}
                      )
                    </button>
                  )
                )}
              </nav>
            </div>
          </div>

          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-328px)] pb-4">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <CalendarIcon className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-gray-500">
                  No bookings match your current filter.
                </p>
              </div>
            ) : (
              filteredBookings.map((booking: any) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <div className="px-6 py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 mr-3">
                            {booking.package_id
                              ? booking.Package?.title
                              : "Custom Package"}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                          {booking?.Payment?.status === "chargedback" ? (
                            <span
                              className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-gray-200 text-gray-800 border-gray-200`}
                            >
                              {booking.Payment.status}
                            </span>
                          ) : null}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <UserIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{booking.User.name}</span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{formatDate(booking.start_date)}</span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>
                              {booking.package_id
                                ? formatDuration(booking?.Package?.duration)
                                : formatDurationForDayCount(
                                    Number(
                                      booking?.CustomPackage?.required_day_count
                                    )
                                  )}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Notes:</span>{" "}
                            {booking.package_id
                              ? booking.message
                              : booking.CustomPackage.message}
                          </p>
                        </div>
                      </div>

                      <div className="ml-6 text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {formatPrice(
                            booking?.Payment?.amount
                              ? parseFloat(booking.Payment.amount)
                              : 0
                          )}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking.Payment
                            ? "Total Amount"
                            : "Awaiting Payment"}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center whitespace-nowrap space-x-3 pt-4 border-t border-gray-200">
                      <Button
                        className={`w-fit md:text-sm md:uppercase ${viewBtnColor}`}
                        label="View Details"
                        onClick={() => {
                          setBookingDetails(booking);
                          setShowDetailsModal(true);
                        }}
                      />

                      <div className="flex space-x-3">
                        {booking.status === "pending" && booking?.Payment && (
                          <Button
                            className={`w-fit md:text-sm md:uppercase ${approveBtnColor}`}
                            label="Confirm"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setSelectedBookingAction("confirmed");
                              setShowActionModal(true);
                            }}
                          />
                        )}
                        {(booking.status === "pending" ||
                          booking.status === "confirmed") && (
                          <Button
                            className={`w-fit md:text-sm md:uppercase ${cancelBtnColor}`}
                            label="Cancel"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setSelectedBookingAction("cancelled");
                              setShowCancelModal(true);
                            }}
                          />
                        )}
                        {booking.status === "confirmed" && (
                          <Button
                            className={`w-fit md:text-sm md:uppercase ${approveBtnColor}`}
                            label="Complete"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setSelectedBookingAction("completed");
                              setShowCompleteModal(true);
                            }}
                          />
                        )}
                        {booking.status === "cancelled" && (
                          <>
                            <Button
                              className={`w-fit md:text-sm md:uppercase ${addBtnColor}`}
                              label="Reopen"
                              onClick={() => {
                                setSelectedBooking(booking);
                                setSelectedBookingAction("pending");
                                setShowReopenModal(true);
                              }}
                            />
                          </>
                        )}
                        {booking.status === "cancelled" &&
                        booking.Payment?.status === "success" ? (
                          <Button
                            className={`w-fit md:text-sm md:uppercase ${addBtnColor}`}
                            label="Refund"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setShowRefundModal(true);
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <CancelBooking
        show={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setSelectedBooking(null);
        }}
        selectedID={selectedBooking?.id}
      />
      {showRefundModal && (
        <RefundBooking
          show={showRefundModal}
          onClose={() => {
            setSelectedBooking(null);
            setShowRefundModal(false);
          }}
          payment_id={selectedBooking?.Payment.payment_id}
          description="Cancel the order"
          pyament_record_id={selectedBooking?.Payment.id}
        />
      )}
      <CompleteBooking
        show={showCompleteModal}
        onClose={() => {
          setShowCompleteModal(false);
          setSelectedBooking(null);
        }}
        selectedID={selectedBooking?.id}
      />
      <ReopenBooking
        show={showReopenModal}
        onClose={() => {
          setShowReopenModal(false);
          setSelectedBooking(null);
        }}
        selectedID={selectedBooking?.id}
      />
      {showDetailsModal && (
        <BookingDetails
          onClose={() => {
            setShowDetailsModal(false);
            setBookingDetails(null);
          }}
          booking={bookingDetails}
          isOpen={showDetailsModal}
        />
      )}

      {showActionModal && (
        <ActionModal
          onClose={() => {
            setShowActionModal(false);
            setSelectedBooking(null);
          }}
          show={showActionModal}
          status={selectedBookingAction}
          selectedID={selectedBooking?.id}
        />
      )}
    </>
  );
};

export default AdminBookingsPage;
