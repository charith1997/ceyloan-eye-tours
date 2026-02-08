"use client";

import React, { useState, useEffect, useRef } from "react";
import Card from "../molecules/Card";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CardGridProps {
  data: any[];
  isLinked?: boolean;
  children: (
    cardTitle: string,
    cardDescription: string,
    count: number,
  ) => React.ReactNode;
}

function CardGrid({ data, isLinked = true, children }: CardGridProps) {
  const pathname = usePathname();
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((cardRef, index) => {
      if (!cardRef) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleCards((prev) => new Set(prev).add(index));
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "50px",
        },
      );

      observer.observe(cardRef);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [data]);

  // Different animation patterns
  const getAnimationClass = (index: number, isVisible: boolean) => {
    const patterns = [
      // Pattern 0: Slide from left
      isVisible
        ? "opacity-100 translate-x-0 scale-100"
        : "opacity-0 -translate-x-12 scale-95",
      // Pattern 1: Slide from right
      isVisible
        ? "opacity-100 translate-x-0 scale-100"
        : "opacity-0 translate-x-12 scale-95",
      // Pattern 2: Slide from bottom
      isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 translate-y-12 scale-95",
      // Pattern 3: Zoom in
      isVisible
        ? "opacity-100 scale-100 rotate-0"
        : "opacity-0 scale-75 rotate-3",
      // Pattern 4: Slide from top
      isVisible
        ? "opacity-100 translate-y-0 scale-100"
        : "opacity-0 -translate-y-12 scale-95",
      // Pattern 5: Flip effect
      isVisible
        ? "opacity-100 scale-100 rotate-0"
        : "opacity-0 scale-90 -rotate-6",
    ];

    return patterns[index % patterns.length];
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 py-4 sm:py-6 px-2 sm:px-0">
      {isLinked &&
        data.map((item: any, index: number) => (
          <div
            key={index}
            ref={(el: any) => (cardRefs.current[index] = el)}
            className={`transition-all duration-700 ease-out ${getAnimationClass(
              index,
              visibleCards.has(index),
            )}`}
            style={{
              transitionDelay: `${(index % 3) * 100}ms`,
            }}
          >
            <Link
              href={`${pathname}/${item.url_prefix
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="block"
            >
              <Card title={item.name} imageUrl={item.image_url}>
                {children(
                  item.cardTitle,
                  item.cardDescription,
                  item.count ?? "",
                )}
              </Card>
            </Link>
          </div>
        ))}

      {!isLinked &&
        data.map((item: any, index: number) => (
          <div
            key={index}
            ref={(el: any) => (cardRefs.current[index] = el)}
            className={`transition-all duration-700 ease-out ${getAnimationClass(
              index,
              visibleCards.has(index),
            )}`}
            style={{
              transitionDelay: `${(index % 3) * 100}ms`,
            }}
          >
            <Card title={item.name} imageUrl={item.image_url}>
              {children(item.cardTitle, item.cardDescription, item.count ?? "")}
            </Card>
          </div>
        ))}
    </div>
  );
}

export default CardGrid;
