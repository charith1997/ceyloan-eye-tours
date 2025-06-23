const TravelActivity = () => {
  const activities = [
    {
      title: "Adventure",
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`,
      imageUrl: "/activity/Layer_1.png",
    },
    {
      title: "Camping",
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`,
      imageUrl: "/activity/Layer_2.png",
    },
    {
      title: "Hiking",
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`,
      imageUrl: "/activity/Layer_3.png",
    },
    {
      title: "Off Road",
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`,
      imageUrl: "/activity/Layer_4.png",
    },
    {
      title: "Surfing",
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`,
      imageUrl: "/activity/Layer_5.png",
    },
    {
      title: "Rafting",
      content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,`,
      imageUrl: "/activity/Layer_6.png",
    },
  ];

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
        {activities.map((activity, index) => (
          <div
            key={index}
            className="group p-8 bg-[#FFF9F0] rounded-[10px] text-[#999] text-center font-[Work Sans] transition-all duration-300 hover:bg-gradient-to-r from-[#cd1a40] to-[#ff803c] hover:text-white cursor-pointer"
          >
            <img
              src={activity.imageUrl}
              alt={activity.title}
              className="w-[140px] h-[140px] object-contain mx-auto mb-4"
            />
            <h3 className="text-[32px] font-bold leading-none mb-2">
              {activity.title}
            </h3>
            <p className="text-[16px] font-normal leading-[22px]">
              {activity.content}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TravelActivity;
