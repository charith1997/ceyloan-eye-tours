import React from "react";
import Button from "../atoms/Button";

interface PackageHighlightsProps {
  highlights: string[];
}

const PackageHighlights = ({ highlights }: PackageHighlightsProps) => {
  return (
    <div className="lg:w-1/4 lg:self-end">
      <h3 className="font-work text-[36px] tracking-[0] font-medium text-red mb-4">
        Tour Highlights
      </h3>
      <ul className="list-disc list-inside text-sm space-y-2">
        {highlights?.map((point: string, i: number) => (
          <li className="font-semibold" key={i}>
            {point}
          </li>
        ))}
      </ul>
      <Button
        label="BOOK NOW"
        className="mt-6 w-full bg-gradient-to-r from-pink-600 to-orange-400 text-white py-3 rounded-md font-semibold"
      />
    </div>
  );
};

export default PackageHighlights;
