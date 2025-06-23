export default function TourTypeSection() {
  const tourTypes = [
    { title: "Short Trip", count: "08", image: "/short-trip.jpg" },
    { title: "Nature", count: "02", image: "/nature.jpg" },
    { title: "Safari", count: "03", image: "/safari.jpg" },
    { title: "Beach Stay", count: "05", image: "/beach.jpg" },
  ];

  return (
    // <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto pt-185">
    //   <div className="text-center mb-12">
    //     <h3 className="font-carattere font-normal text-[48px] leading-[100%] tracking-[0] text-red">
    //       Choose your
    //     </h3>
    //     <h2 className="font-work font-extralight text-[64px] leading-[100%] uppercase">
    //       TOUR TYPE
    //     </h2>
    //   </div>

    //   <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    //     {tourTypes.map(({ title, count, image }) => (
    //       <div
    //         key={title}
    //         className="relative rounded-xl overflow-hidden group h-60 md:h-64 lg:h-72"
    //       >
    //         <img
    //           src={image}
    //           alt={title}
    //           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    //         />
    //         <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    //         <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
    //           <h3 className="font-carattere text-2xl md:text-3xl mb-3">
    //             {title}
    //           </h3>
    //           <span className="px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-primary to-secondary">
    //             {count} TOURS
    //           </span>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   <div className="text-center mt-10">
    //     <button className="px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-secondary transition-all shadow-md">
    //       VIEW MORE
    //     </button>
    //   </div>
    // </section>

    <section className="max-w-[1200px] mx-auto mt-8 px-4 py-8 text-center pt-180">
      <div className="mb-8">
        <h2 className="font-[Carattere] text-[48px] font-normal text-[#CD1A40] leading-none m-0">
          Choose your
        </h2>
        <h1 className="font-[Work Sans] text-[64px] font-extralight uppercase text-[#222] my-2 leading-none">
          TOUR TYPE
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-[70vh]">
        <div
          className="flex-1 relative rounded-xl shadow-md bg-cover bg-center bg-no-repeat group hover:-translate-y-1.5 transition-transform duration-300 cursor-pointer"
          style={{ backgroundImage: 'url("/tour types/Rectangle 17.png")' }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white">
            <p className="font-[Carattere] text-[46px]">Short Trip</p>
            <button className="cursor-pointer mt-2 w-[100px] h-[48px] rounded-[18px] bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white font-medium hover:opacity-90 transition-opacity">
              08 Tours
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div className="flex gap-6 h-1/2">
            <div
              className="flex-1 relative rounded-xl shadow-md bg-cover bg-center bg-no-repeat group hover:-translate-y-1.5 transition-transform duration-300 cursor-pointer"
              style={{ backgroundImage: 'url("/tour types/Rectangle 19.png")' }}
            >
              <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white">
                <p className="font-[Carattere] text-[46px]">Nature</p>
                <button className="cursor-pointer mt-2 w-[100px] h-[48px] rounded-[18px] bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white font-medium hover:opacity-90 transition-opacity">
                  02 Tours
                </button>
              </div>
            </div>

            <div
              className="flex-1 relative rounded-xl shadow-md bg-cover bg-center bg-no-repeat group hover:-translate-y-1.5 transition-transform duration-300 cursor-pointer"
              style={{ backgroundImage: 'url("/tour types/Rectangle 18.png")' }}
            >
              <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />
              <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white">
                <p className="font-[Carattere] text-[46px]">Safari</p>
                <button className="cursor-pointer mt-2 w-[100px] h-[48px] rounded-[18px] bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white font-medium hover:opacity-90 transition-opacity">
                  03 Tours
                </button>
              </div>
            </div>
          </div>

          <div
            className="h-1/2 relative rounded-xl shadow-md bg-cover bg-center bg-no-repeat group hover:-translate-y-1.5 transition-transform duration-300 cursor-pointer"
            style={{ backgroundImage: 'url("/tour types/Rectangle 20.png")' }}
          >
            <div className="absolute inset-0 bg-black/40 rounded-xl z-0" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-white">
              <p className="font-[Carattere] text-[46px]">Beach Stay</p>
              <button className="cursor-pointer mt-2 w-[100px] h-[48px] rounded-[18px] bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white font-medium hover:opacity-90 transition-opacity">
                05 Tours
              </button>
            </div>
          </div>
        </div>
      </div>

      <button className="mt-8 px-4 py-2 rounded-[14px] bg-gradient-to-r from-[#cd1a40] to-[#ff803c] text-white font-[Work Sans] text-[14px] font-normal hover:opacity-90 transition-opacity cursor-pointer">
        VIEW MORE
      </button>
    </section>
  );
}
