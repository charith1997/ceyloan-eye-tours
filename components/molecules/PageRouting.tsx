"use client";

import React from "react";
import { useSelector } from "react-redux";

const PageRouting = () => {
  const routingStack = useSelector((state: any) => state.routing.stack);
  console.log(routingStack);

  return (
    <div className="mb-4 text-sm font-medium text-gray-700">
      {routingStack.map((route: string, idx: number) => (
        <React.Fragment key={route}>
          <span
            className={
              idx === routingStack.length - 1
                ? "font-work text-[14px] md:text-[16px] text-red font-semibold leading-[100%] tracking-wide"
                : "font-work text-[14px] md:text-[16px] text-black font-semibold leading-[100%] tracking-wide"
            }
          >
            {route.charAt(0).toUpperCase() + route.slice(1).replace(/-/g, " ")}
          </span>
          {idx < routingStack.length - 1 && <span className="mx-1">{">"}</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PageRouting;
