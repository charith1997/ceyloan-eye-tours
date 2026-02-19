import React from "react";
import Jumbotron from "../molecules/Jumbotron";
import DetailCardGrid from "@/components/organisams/DetailCardGrid";
import { renderStarsWhite } from "@/utils/common";
import PageRouting from "../molecules/PageRouting";
import { useGetAllPlacesWithHotelsQuery } from "@/services/placesApi";
import PageContainer from "../containers/PageContainer";
import { MapPin } from "lucide-react";

interface PlacePageProps {
  heroTitle: string;
  heroDescription: string;
  hotels: any[];
  description: string;
  imageUrl: string;
  title: string;
  location: string;
}

const PlacePage = ({
  heroTitle,
  heroDescription,
  hotels,
  description,
  imageUrl,
  title,
  location,
}: PlacePageProps) => {
  const { data } = useGetAllPlacesWithHotelsQuery();
  const places = Array.isArray(data?.data) ? data.data : [];

  return (
    <PageContainer>
      <Jumbotron
        title={heroTitle}
        description={heroDescription}
        imageUrl={imageUrl}
      />
      <div className="py-12">
        <PageRouting />
        <h1 className="text-3xl md:text-4xl font-semibold capitalize pt-2 pb-1">
          {title}
        </h1>
        <p className="text-gray-700 tracking-wide">{location}</p>
        <p className="text-gray-500 leading-relaxed text-justify pt-6">
          {description}
        </p>
      </div>
      <div>
        <DetailCardGrid data={hotels}>
          {(item: any) => (
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <div className="bg-gradient-to-r from-red to-orange p-3 sm:p-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                <div className="flex flex-row justify-between gap-2 items-center relative z-10">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white text-sm sm:text-base md:text-lg font-extrabold uppercase tracking-widest truncate leading-tight drop-shadow-lg">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3 h-3 text-white/80 flex-shrink-0" />
                      <p className="text-white/90 text-xs sm:text-sm font-medium truncate">
                        {
                          places.find(
                            (place: any) => place.id === item.place_id,
                          )?.name
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                    <div className="flex items-center gap-0.5">
                      {renderStarsWhite(item.rating, 5)}
                    </div>
                    {item.rating && (
                      <span className="text-white/80 text-xs font-semibold">
                        {item.rating}/5
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DetailCardGrid>
      </div>
    </PageContainer>
  );
};

export default PlacePage;
