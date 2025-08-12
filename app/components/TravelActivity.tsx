import { useGetAllActivitiesQuery } from "@/services/activityApi";
import Image from "next/image";

const TravelActivity = () => {
  const { data, error, isLoading } = useGetAllActivitiesQuery();
  if (isLoading) return <div>Loading soon..........</div>;
  if (error) return <div>Error loading categories</div>;

  const activities = Array.isArray(data?.data) ? data.data : [];

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-8 text-center">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-[Carattere] text-[48px] font-normal text-[#CD1A40] leading-none m-0">
          Travel by
        </h2>
        <h1 className="font-[Work Sans] text-[64px] font-extralight uppercase text-[#222] my-2 leading-none">
          activity
        </h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity: any, index: number) => (
          <div
            key={index}
            className="group p-8 bg-[#FFF9F0] rounded-[10px] text-[#999] text-center font-[Work Sans] transition-all duration-300 hover:bg-gradient-to-r from-[#cd1a40] to-[#ff803c] hover:text-white cursor-pointer"
          >
            <Image
              src="/activity/Layer_1.png"
              alt={activity.name}
              className="w-[140px] h-[140px] object-contain mx-auto mb-4"
              width={140}
              height={140}
            />
            <h3 className="text-[32px] font-bold leading-none mb-2">
              {activity.name}
            </h3>
            <p className="text-[16px] font-normal leading-[22px]">
              Description
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TravelActivity;
