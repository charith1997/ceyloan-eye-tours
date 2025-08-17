import React from "react";

interface DropdownProps {
  options: string[];
  label: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, label }) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium">{label}</label>
      <select className="appearance-none w-full border border-gray-400 rounded px-3 py-2 text-sm focus:outline-none">
        <option value="">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 top-5 flex items-center px-2 text-gray-500">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
