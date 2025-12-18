"use client";

import { useEffect, useState, MouseEvent, JSX } from "react";
// import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface User {
  name: string;
  country: string;
}

interface Package {
  title: string;
}

interface CustomPackage {
  message: string;
}

interface Booking {
  start_date: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  User: User;
  Package?: Package;
  CustomPackage?: CustomPackage;
}

interface ApiResponse {
  success: boolean;
  data: Booking[];
}

type StatusColors = {
  [key in Booking["status"]]: string;
};

function Home() {
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hoveredDate, setHoveredDate] = useState<number | null>(null);
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const statusColors: StatusColors = {
    pending: "bg-yellow-100 border-l-4 border-yellow-500",
    confirmed: "bg-green-100 border-l-4 border-green-500",
    cancelled: "bg-red-100 border-l-4 border-red-500",
    completed: "bg-blue-100 border-l-4 border-blue-500",
  };

  const statusBadgeColors: StatusColors = {
    pending: "bg-yellow-500",
    confirmed: "bg-green-500",
    cancelled: "bg-red-500",
    completed: "bg-blue-500",
  };

  useEffect(() => {
    fetchBookings();
  }, [selectedYear, selectedMonth]);

  const fetchBookings = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/api/bookings/calendar?year=${selectedYear}&month=${selectedMonth}`
      );
      const data: ApiResponse = await response.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number): number => {
    const day = new Date(year, month - 1, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert Sunday (0) to 6, and shift others
  };

  const getBookingsForDate = (date: number): Booking[] => {
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.start_date);
      return (
        bookingDate.getDate() === date &&
        bookingDate.getMonth() === selectedMonth - 1 &&
        bookingDate.getFullYear() === selectedYear
      );
    });
  };

  const handlePrevMonth = (): void => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = (): void => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handleDateHover = (
    date: number,
    event: MouseEvent<HTMLDivElement>
  ): void => {
    const dayBookings = getBookingsForDate(date);
    if (dayBookings.length > 0) {
      const rect = event.currentTarget.getBoundingClientRect();
      setModalPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
      setHoveredDate(date);
    }
  };

  const handleDateLeave = (): void => {
    setHoveredDate(null);
  };

  const renderCalendarDays = (): JSX.Element[] => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
    const days: JSX.Element[] = [];

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="bg-gray-50 border border-gray-200"
        ></div>
      );
    }

    // Days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const dayBookings = getBookingsForDate(date);
      const displayBookings = dayBookings.slice(0, 3);
      const remainingCount = dayBookings.length - 3;

      days.push(
        <div
          key={date}
          className="bg-white border border-black min-h-28 p-2 hover:bg-gray-50 transition-colors relative"
          onMouseEnter={(e) => handleDateHover(date, e)}
          onMouseLeave={handleDateLeave}
        >
          <div className="font-semibold text-sm mb-1">{date}</div>
          <div className="space-y-1">
            {displayBookings.map((booking, idx) => (
              <div
                key={idx}
                className={`text-xs px-2 py-1 rounded ${
                  statusColors[booking.status]
                } truncate`}
              >
                {booking.User.name}
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="text-xs text-gray-600 font-semibold px-2">
                +{remainingCount} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const renderModal = (): JSX.Element | null => {
    if (!hoveredDate) return null;

    const dayBookings = getBookingsForDate(hoveredDate);
    if (dayBookings.length === 0) return null;

    return (
      <div
        className="fixed z-50 bg-white rounded-lg shadow-2xl border-2 border-gray-300 p-4 max-w-md w-80"
        style={{
          left: `${modalPosition.x}px`,
          top: `${modalPosition.y - 10}px`,
          transform: "translate(-50%, -100%)",
        }}
        onMouseEnter={() => setHoveredDate(hoveredDate)}
        onMouseLeave={handleDateLeave}
      >
        <div className="flex justify-between items-center mb-3 border-b pb-2">
          <h3 className="font-bold text-lg">
            {monthNames[selectedMonth - 1]} {hoveredDate}, {selectedYear}
          </h3>
          <button
            onClick={handleDateLeave}
            className="text-gray-500 hover:text-gray-700"
          >
            x
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto space-y-3">
          {dayBookings.map((booking, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-lg ${statusColors[booking.status]}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold">{booking.User.name}</div>
                <span
                  className={`text-xs text-white px-2 py-1 rounded ${
                    statusBadgeColors[booking.status]
                  }`}
                >
                  {booking.status}
                </span>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>📍 {booking.User.country}</div>
                {booking.Package && <div>📦 {booking.Package.title}</div>}
                {booking.CustomPackage && (
                  <div>✨ {booking.CustomPackage.message}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {/* <ChevronLeft size={24} /> */}
              left
            </button>
            <h2 className="text-2xl font-bold">
              {monthNames[selectedMonth - 1]} {selectedYear}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {/* <ChevronRight size={24} /> */}
              right
            </button>
          </div>

          <div className="flex gap-3">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {monthNames.map((month, idx) => (
                <option key={idx} value={idx + 1}>
                  {month}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from(
                { length: 10 },
                (_, i) => new Date().getFullYear() - 5 + i
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 border-l-4 border-yellow-500"></div>
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 border-l-4 border-green-500"></div>
            <span>Confirmed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-100 border-l-4 border-red-500"></div>
            <span>Cancelled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-100 border-l-4 border-blue-500"></div>
            <span>Completed</span>
          </div>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-0 mb-0">
          {dayNames.map((day) => (
            <div
              key={day}
              className="bg-gray-200 border border-gray-300 text-center font-semibold py-3 text-sm"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-0">{renderCalendarDays()}</div>
        )}

        {/* Modal */}
        {renderModal()}
      </div>
    </div>
  );
}

export default Home;
