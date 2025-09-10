import { useGetAllActivitiesQuery } from "@/services/activityApi";
import Image from "next/image";

const TravelActivity = () => {
  const { data } = useGetAllActivitiesQuery();

  const activities = Array.isArray(data?.data) ? data.data : [];

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-8 text-center">
      <div className="mb-8">
        <h2 className="font-[Carattere] text-[48px] font-normal text-[#CD1A40] leading-none m-0">
          Travel by
        </h2>
        <h1 className="font-[Work Sans] text-[64px] font-extralight uppercase text-[#222] my-2 leading-none">
          activity
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity: any, index: number) => (
          <div
            className="flex-1 relative rounded-xl shadow-md bg-cover bg-center bg-no-repeat group hover:-translate-y-1.5 transition-transform duration-300 cursor-pointer"
            style={{
              backgroundImage: `url(${activity.image_url})`,
              height: "300px",
              width: "100%",
              objectFit: "cover",
            }}
            key={index}
          >
            <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />
            <div className="relative z-10 flex flex-col items-center justify-end h-full p-6 text-white gap-2">
              <div className="text-4xl font-bold leading-none">
                {activity.name}
              </div>
              <div className="text-lg">{activity.description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TravelActivity;
