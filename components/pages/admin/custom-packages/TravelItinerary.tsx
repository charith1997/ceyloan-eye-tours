import { Clock } from "lucide-react";
import React from "react";

interface TravelItineraryProps {
  pkg: any;
}

function TravelItinerary({ pkg }: TravelItineraryProps) {
  const sortedPlaceData =
    pkg &&
    pkg?.CustomizePackagePlaces &&
    [...pkg.CustomizePackagePlaces].sort((a, b) => {
      if (a.day_no !== b.day_no) {
        return a.day_no - b.day_no;
      }
      return a.sort_order - b.sort_order;
    });

  const groupedByDay =
    sortedPlaceData &&
    sortedPlaceData.reduce((acc: any, item: any) => {
      const { day_no } = item;
      if (!acc[day_no]) acc[day_no] = [];
      const stop = acc[day_no].length + 1;

      acc[day_no].push({ ...item, stop });
      return acc;
    }, {});
  return (
    <div className="min-h-screen bg-gray-50 p-4 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Travel Itinerary
          </h1>
          <p className="text-gray-600">Your journey awaits</p>
        </div>

        <div className="space-y-8">
          {Object.keys(groupedByDay).map((day) => (
            <div key={day} className="flex flex-col md:flex md:flex-row gap-6">
              <div className="w-full md:w-32 flex-shrink-0">
                <div className="sticky top-6">
                  <div className="bg-red text-white rounded-xl p-2 text-center shadow-lg">
                    <div className="text-sm font-medium mb-1">Day</div>
                    <div className="text-4xl font-bold">{day}</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                {groupedByDay[day].map((item: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-8">
                      <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-red shadow">
                        Stop {item.stop}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {item.Place.name}
                      </h3>

                      <p className="text-gray-700 mb-4 text-sm">
                        {item.description}
                      </p>

                      {item.Activities && item.Activities.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            Activities
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {item.Activities.map((activity: any) => (
                              <div
                                key={activity.id}
                                className="border border-gray-200 rounded-lg p-3 hover:border-orange-300 transition-colors"
                              >
                                <h5 className="text-sm text-gray-800 mb-1">
                                  {activity.name}
                                </h5>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TravelItinerary;
