"use client";

import { setCurrentPage, setTotalPages } from "@/features/paginatorSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ChevronRight, Home } from "lucide-react";

export default function PageRouting() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const segments = pathname.split("/").filter(Boolean);

  const formatSegment = (segment: string) => {
    return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const resetPages = () => {
    dispatch(setTotalPages(0));
    dispatch(setCurrentPage(1));
  };

  useEffect(() => {
    if (pathname) {
      resetPages();
    }
  }, [pathname]);

  return (
    <nav className="mb-6">
      <ol className="flex items-center flex-wrap gap-2">
        <li className="group">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[13px] sm:text-[14px] md:text-[15px] font-semibold text-gray-700 hover:text-red transition-all duration-300 hover:bg-white hover:shadow-md transform hover:-translate-y-0.5"
          >
            <Home
              size={16}
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </li>

        {segments.map((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const isLast = idx === segments.length - 1;

          return (
            <li key={href} className="flex items-center gap-1 md:gap-2">
              <ChevronRight
                size={16}
                className="text-gray-400 flex-shrink-0 animate-pulse"
                style={{ animationDuration: "2s" }}
              />

              {isLast ? (
                <span className="px-2 py-1.5 rounded-lg text-[13px] sm:text-[14px] md:text-[15px] font-bold bg-gradient-to-r from-red to-orange text-white shadow-md">
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link
                  href={href}
                  className="px-2 py-1.5 rounded-lg text-[13px] sm:text-[14px] md:text-[15px] font-semibold text-gray-700 hover:text-red transition-all duration-300 hover:bg-white hover:shadow-md transform hover:-translate-y-0.5"
                >
                  {formatSegment(segment)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
