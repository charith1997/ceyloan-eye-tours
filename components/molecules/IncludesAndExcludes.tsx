import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";

interface IncludesAndExcludesProps {
  includes: string[];
  excludes: string[];
}

const IncludesAndExcludes: React.FC<IncludesAndExcludesProps> = ({
  includes,
  excludes,
}) => {
  return (
    <div className="lg:w-1/2 pr-6">
      <div className="mb-10 sm:mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            What's Included
          </h2>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6" />

        <div className="bg-gradient-to-br from-green-50 to-emerald-50/50 rounded-2xl p-4 sm:p-6 border border-green-100 shadow-md">
          <ul className="space-y-3">
            {includes?.map((point: string, i: number) => (
              <li
                key={i}
                className="flex items-start gap-3 group animate-slideIn"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-red-100 to-orange-100 rounded-xl">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            What's Not Included
          </h2>
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full mb-6" />

        <div className="bg-gradient-to-br from-red-50 to-orange-50/50 rounded-2xl p-4 sm:p-6 border border-red-100 shadow-md">
          <ul className="space-y-3">
            {excludes?.map((point: string, i: number) => (
              <li
                key={i}
                className="flex items-start gap-3 group animate-slideIn"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

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
};

export default IncludesAndExcludes;
