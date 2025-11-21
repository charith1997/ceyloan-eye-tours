import React from "react";

interface IncludesAndExcludesProps {
  includes: string[];
  excludes: string[];
}

const IncludesAndExcludes: React.FC<IncludesAndExcludesProps> = ({
  includes,
  excludes,
}) => {
  return (
    <div className="lg:w-1/2 p-6">
      <h2 className="text-3xl md:text-4xl text-red mb-4">
        Tour Price Includes
      </h2>
      <ul className="list-disc space-y-2 ml-4">
        {includes?.map((point: string, i: number) => (
          <li key={i}>{point}</li>
        ))}
      </ul>

      <h2 className="text-3xl md:text-4xl text-red mb-4 mt-8">
        Tour Price Excludes
      </h2>
      <ul className="list-disc space-y-2 ml-4">
        {excludes?.map((point: string, i: number) => (
          <li key={i}>{point}</li>
        ))}
      </ul>
    </div>
  );
};

export default IncludesAndExcludes;
