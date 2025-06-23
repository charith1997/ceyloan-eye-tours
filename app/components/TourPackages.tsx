const TourPackages = () => {
  const packages = [
    { title: 'Kandy', count: 3, price: 1500, imageUrl: '/tour packages/package_1.jpg' },
    { title: 'Udawalawa', count: 5, price: 3000, imageUrl: '/tour packages/package_2.jpg' },
    { title: 'Mirissa', count: 6, price: 7000, imageUrl: '/tour packages/package_3.jpg' },
  ];

  return (
    <section className="max-w-[1200px] mx-auto my-8 px-4 text-center">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-[Carattere] text-[48px] font-normal text-[#CD1A40] leading-none">Popular</h2>
        <h1 className="font-[Work Sans] text-[64px] font-extralight uppercase text-[#1e1e1e] my-2 leading-none">tour packages</h1>
        <p className="font-[Work Sans] text-[16px] font-normal leading-[26px]">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((tourPackage, index) => (
          <div key={index} className="cursor-pointer font-[Work Sans]">
            <img
              src={tourPackage.imageUrl}
              alt={tourPackage.title}
              className="w-[320px] h-[320px] object-cover rounded-t-[10px] mx-auto"
            />
            <div className="flex justify-between items-center bg-[#FFF9F0] text-left px-4 py-3 rounded-b-[10px] w-[320px] mx-auto">
              <div>
                <h3 className="text-[24px] font-semibold uppercase text-[#1e1e1e] m-0">{tourPackage.title}</h3>
                <p className="text-[16px] font-light text-[#1e1e1e] mt-1">{tourPackage.count} days trip</p>
              </div>
              <h3 className="text-[24px] font-bold text-[#1e1e1e] m-0">${tourPackage.price}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TourPackages;
