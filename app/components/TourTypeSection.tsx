export default function TourTypeSection() {
  return (
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
