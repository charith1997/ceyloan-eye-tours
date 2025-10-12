import React, { useEffect, useState } from "react";
import { MapPin, Calendar, Clock } from "lucide-react";
import { useGetPackageByUrlPrefixQuery } from "@/services/packageApi";

interface TravelItineraryProps {
  id: string;
}

export default function TravelItinerary({ id }: TravelItineraryProps) {
  const { data } = useGetPackageByUrlPrefixQuery(id);
  const itineraryData = data?.data.places ?? [];
  // Sort by day_no first, then by sort_order
  const sortedItinerary = [...itineraryData].sort((a: any, b: any) => {
    if (a.packagePlace.day_no !== b.packagePlace.day_no) {
      return a.packagePlace.day_no - b.packagePlace.day_no;
    }
    return a.packagePlace.sort_order - b.packagePlace.sort_order;
  });

  // Group by day
  const groupedByDay = sortedItinerary.reduce((acc: any, item: any) => {
    const day = item.packagePlace.day_no;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(item);
    return acc;
  }, {});

  return (
    <>
      {itineraryData.length > 0 ? (
        <div className="min-h-screen bg-gray-50 p-6 rounded-lg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Travel Itinerary
              </h1>
              <p className="text-gray-600">Your journey awaits</p>
            </div>

            <div className="space-y-8">
              {Object.keys(groupedByDay).map((day) => (
                <div key={day} className="flex gap-6">
                  <div className="w-32 flex-shrink-0">
                    <div className="sticky top-6">
                      <div className="bg-red text-white rounded-xl p-4 text-center shadow-lg">
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
                        <div className="relative h-64">
                          <img
                            src={item.place.image_url}
                            alt={item.place.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-red shadow">
                            Stop {item.packagePlace.sort_order}
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {item.place.name}
                          </h3>

                          <div className="flex items-center text-gray-600 mb-4">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-sm">
                              {item.place.location}
                            </span>
                            <span className="mx-2">•</span>
                            <span className="text-sm">
                              {item.place.latitude}°N, {item.place.longitude}°E
                            </span>
                          </div>

                          <p className="text-gray-700 mb-4">
                            {item.packagePlace.description}
                          </p>

                          {item.packagePlace.events &&
                            item.packagePlace.events.length > 0 && (
                              <div className="mb-4">
                                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                                  <Calendar className="w-4 h-4 mr-2" />
                                  Events
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {item.packagePlace.events.map(
                                    (event: any, idx: number) => (
                                      <span
                                        key={idx}
                                        className="bg-indigo-50 px-3 py-1 rounded-full text-sm"
                                      >
                                        {event}
                                      </span>
                                    )
                                  )}
                                </div>
                              </div>
                            )}

                          {item.place.Activities &&
                            item.place.Activities.length > 0 && (
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                                  <Clock className="w-4 h-4 mr-2" />
                                  Activities
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {item.place.Activities.map(
                                    (activity: any) => (
                                      <div
                                        key={activity.id}
                                        className="border border-gray-200 rounded-lg p-3 hover:border-orange-300 transition-colors"
                                      >
                                        <h5 className="font-semibold text-gray-800 mb-1">
                                          {activity.name}
                                        </h5>
                                        <p className="text-gray-600 text-sm">
                                          {activity.description}
                                        </p>
                                      </div>
                                    )
                                  )}
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
      ) : null}
    </>
  );
}
