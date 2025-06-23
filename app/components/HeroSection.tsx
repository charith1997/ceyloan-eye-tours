import { CalendarDays, MapPin, Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="absolute top-0 bg-center bg-cover h-screen w-full text-white">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/hero.png')" }}
      ></div>

      <div
        className="relative z-10 pt-20 h-full"
        style={{
          background:
            "linear-gradient(90.28deg, rgba(0, 0, 0, 0.8) 0.23%, rgba(0, 0, 0, 0) 99.74%)",
        }}
      >
        <div className="max-w-md md:max-w-4xl xl:max-w-6xl mx-auto flex flex-col justify-center h-full text-white">
          <h1 className="font-water font-normal text-[46px] leading-[100%] tracking-[0]">
            Explorer and Sri Lanka
          </h1>
          <h1 className="font-work font-bold text-[86px] leading-[100%] tracking-[0]">
            Let’s Go Now
          </h1>
          <p className="font-work font-normal text-base leading-6 tracking-[0] w-full md:w-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s,
          </p>

          <div className="backdrop-blur-lg p-4 rounded-3xl flex flex-col md:flex-row items-center gap-4 w-full max-w-lg mt-8">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <MapPin size={20} />
              <div>
                <p className="font-work font-normal text-base leading-[24px] tracking-normal">Location</p>
                <p className="font-work font-bold text-[20px] leading-[24px] tracking-normal">Mirissa</p>
              </div>
            </div>
            <span className="hidden md:block h-10 w-px bg-gray-600 mx-auto"></span>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <CalendarDays size={20} />
              <div>
                <p className="font-work font-normal text-base leading-[24px] tracking-normal">Date</p>
                <p className="font-work font-bold text-[20px] leading-[24px] tracking-normal">13 May, 2025</p>
              </div>
            </div>
            <button className="flex ml-auto p-3 rounded-xl bg-gradient-to-r from-red to-orange hover:opacity-90 transition absolute md:relative self-end [margin:inherit] md:m-auto">
              <Search size={20} className="text-white" />
            </button>
          </div>

          <div className="mt-10 flex gap-4 justify-center">
            <span className="w-8 h-2 rounded-full bg-red"></span>
            <span className="w-8 h-2 rounded-full bg-gray-500"></span>
            <span className="w-8 h-2 rounded-full bg-gray-500"></span>
          </div>
        </div>
      </div>
    </section>
  );
}
