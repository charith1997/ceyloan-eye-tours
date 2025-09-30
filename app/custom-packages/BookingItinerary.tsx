import {
  Calendar,
  CalendarIcon,
  ChartGanttIcon,
  Compass,
  CreditCardIcon,
  MailIcon,
  MapPin,
  StarIcon,
  UserIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import React from "react";

interface Activity {
  id: string;
  name: string;
}

interface Place {
  id: string;
  name: string;
}

interface ItineraryItem {
  id: string;
  customize_package_id: string;
  place_id: string;
  sort_order: number;
  day_no: number;
  description: string;
  created_at: string;
  updated_at: string;
  Place: Place;
  Activities: Activity[];
}

interface BookingItineraryProps {
  onClose: () => void;
  data: ItineraryItem[];
}

function BookingItinerary({ onClose, data }: BookingItineraryProps) {
  const groupedByDay = [...data]
    .sort((a, b) => {
      if (a.day_no !== b.day_no) return a.day_no - b.day_no;
      return a.sort_order - b.sort_order;
    })
    .reduce((acc, item) => {
      if (!acc[item.day_no]) {
        acc[item.day_no] = [];
      }
      acc[item.day_no].push(item);
      return acc;
    }, {} as Record<number, ItineraryItem[]>);

  const days = Object.keys(groupedByDay)
    .map(Number)
    .sort((a, b) => a - b);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-75 transition-opacity"
          onClick={handleBackdropClick}
        />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-4xl">
          <div className="px-4 py-4 justify-end flex">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none cursor-pointer"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-6 pb-4 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
              Your Travel Itinerary
            </h1>

            <div className="space-y-8">
              {days.map((dayNo) => (
                <div
                  key={dayNo}
                  className="flex flex-col md:flex-row gap-6 md:gap-8"
                >
                  <div className="flex-shrink-0 w-full md:w-24">
                    <div className="sticky top-8">
                      <div
                        className="rounded-2xl p-4 shadow-lg text-center"
                        style={{ backgroundColor: "#cd1a40" }}
                      >
                        <div className="text-white text-sm font-semibold uppercase tracking-wide mb-1">
                          Day
                        </div>
                        <div className="text-white text-4xl font-bold">
                          {dayNo}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4">
                    {groupedByDay[dayNo].map((item, index) => (
                      <div
                        key={item.id}
                        className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                      >
                        <div
                          className="absolute left-0 top-0 bottom-0 w-1.5"
                          style={{
                            backgroundColor:
                              index % 2 === 0 ? "#cd1a40" : "#ff803c",
                          }}
                        ></div>

                        <div className="p-6 pl-8">
                          <div className="flex flex-col">
                            <div className="flex items-center mb-2 gap-4">
                              <div
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold"
                                style={{ backgroundColor: "#ff803c" }}
                              >
                                {index + 1}
                              </div>
                              <h3 className="text-2xl font-bold text-gray-800">
                                {item.Place.name}
                              </h3>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          {item.Activities.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                                Included Activities
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <ul className="">
                                  {item.Activities.map((activity) => (
                                    <li
                                      key={activity.id}
                                      className="list-disc list-inside text-gray-700 text-sm"
                                    >
                                      {activity.name}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-pink-50 opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingItinerary;
