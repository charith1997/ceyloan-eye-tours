import React, { useEffect, useState } from "react";
import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";
import { useGetBookingByIdQuery } from "@/services/bookingApi";
import { getUserDetails } from "@/utils/auth";
import { formatDuration } from "@/utils/package";
import Button from "../../components/atoms/Button";
import CancelBooking from "@/app/bookings/CancelBooking";
import PayHereCheckout from "./PayHereCheckout";

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

const BookingsPage: React.FC = () => {
  const userDetails: any = getUserDetails();
  const { data } = useGetBookingByIdQuery(userDetails.userId);
  const bookings = Array.isArray(data?.data) ? data.data : [];

  const [filter, setFilter] = useState<
    "all" | "pending" | "confirmed" | "completed" | "cancelled"
  >("all");

  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookings);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [showPayHereCheckout, setShowPayHereCheckout] = useState(false);

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
  }, [filter]);

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

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              My Bookings
            </h1>
            <p className="text-gray-600">
              Manage and track all your service bookings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
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

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
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

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
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

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
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

          <div className="space-y-6">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
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
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-4">
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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{formatDate(booking.start_date)}</span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{formatDuration(booking.duration)}</span>
                          </div>

                          <div className="flex items-center text-sm text-gray-600">
                            <UsersIcon className="w-4 h-4 mr-2 text-gray-400" />
                            <span>{`${booking.adult_count} adults & ${booking.child_count} children`}</span>
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
                        <p className="text-sm text-gray-500">Total Amount</p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                      {booking.status === "pending" && (
                        <>
                          <Button
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
                            label="Pay Now"
                            onClick={() => {
                              setShowPayHereCheckout(true);
                              setSelectedBookingId(booking.id);
                            }}
                          />
                          <Button
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none"
                            label="Cancel"
                            onClick={() => {
                              setSelectedBookingId(booking.id);
                              setShowCancelModal(true);
                            }}
                          />
                        </>
                      )}

                      {/* <Button
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      label="Edit Booking"
                    /> */}
                      {/* {booking.status === "pending" && (
                      <Button
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        label="Confirm"
                      />
                    )} */}
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
          setSelectedBookingId(null);
        }}
        selectedID={selectedBookingId}
      />

      <PayHereCheckout
        bookingId={selectedBookingId!}
        show={showPayHereCheckout}
        onClose={() => {
          setShowPayHereCheckout(false);
          setSelectedBookingId(null);
        }}
      />
    </>
  );
};

export default BookingsPage;
