"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PageRouting() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const formatSegment = (segment: string) => {
    return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className="text-[14px] md:text-[16px] font-semibold leading-[100%] tracking-wide hover:underline"
          >
            Home
          </Link>
        </li>

        {segments.map((segment, idx) => {
          const href = "/" + segments.slice(0, idx + 1).join("/");
          const isLast = idx === segments.length - 1;

          return (
            <li key={href} className="flex items-center space-x-2">
              <span className="text-gray-400">{">"}</span>
              {isLast ? (
                <span className="text-[14px] md:text-[16px] font-semibold leading-[100%] tracking-wide text-red">
                  {formatSegment(segment)}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-[14px] md:text-[16px] font-semibold leading-[100%] tracking-wide hover:underline"
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
