import React from "react";
import { ListChecks, Sparkles } from "lucide-react";

interface TripDetailsProps {
  events: any[];
  id: number;
  isHovered?: boolean;
}

function TripDetails({ events, id, isHovered = false }: TripDetailsProps) {
  return (
    <div
      className={`flex flex-col w-full max-w-sm p-5 shadow-xl bg-gradient-to-br from-white to-orange-50/30 border border-orange-100/50 absolute transition-all duration-500 ${
        id % 2 === 0
          ? "rounded-tl-2xl rounded-bl-2xl rounded-br-2xl right-6"
          : "rounded-tr-2xl rounded-bl-2xl rounded-br-2xl left-6"
      } ${isHovered ? "shadow-2xl scale-105" : "scale-100"}`}
    >
      <div
        className={`absolute ${id % 2 === 0 ? "top-0 left-0" : "top-0 right-0"} w-20 h-20 bg-gradient-to-br from-orange-100/40 to-transparent rounded-2xl blur-xl`}
      />

      <div className="flex items-center gap-2 mb-4 relative z-10">
        <div className="p-2 bg-gradient-to-r from-red to-orange rounded-lg">
          <ListChecks className="w-4 h-4 text-white" />
        </div>
        <h6 className="font-bold text-gray-800 text-base">Daily Activities</h6>
      </div>

      <div className="w-16 h-0.5 bg-gradient-to-r from-red to-orange rounded-full mb-4" />

      <ul className="space-y-2 text-gray-700 text-sm relative z-10">
        {events.map((point: any, idx: number) => (
          <li
            key={idx}
            className="flex items-start gap-2 group animate-slideIn"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-red to-orange rounded-full mt-1.5 flex-shrink-0 group-hover:scale-150 transition-transform duration-300" />
            <span className="leading-relaxed">{point}</span>
          </li>
        ))}
      </ul>

      <div
        className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-2xl transition-opacity duration-700 pointer-events-none ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default TripDetails;
