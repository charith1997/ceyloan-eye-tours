import Button from "@/components/atoms/Button";
import { addBtnColor } from "@/styles/colors";
import { getUserDetails } from "@/utils/auth";
import { Plus } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface SearchContainerProps {
  searchPlaceholder: string;
  title: string;
  buttonName: string;
  onClick?: () => void;
  isDisplayActionButton?: boolean;
  onSearchChange?: (searchQuery: string) => void;
  displaySearch?: boolean;
}

const SearchContainer = ({
  searchPlaceholder,
  title,
  buttonName,
  onClick,
  isDisplayActionButton = true,
  displaySearch = true,
  onSearchChange,
}: SearchContainerProps) => {
  const userDetails = getUserDetails();
  const [searchQuery, setSearchQuery] = useState("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    if (onSearchChange) {
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        onSearchChange(searchQuery);
      }, 500); // 500ms debounce delay

      // Cleanup
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }
  }, [searchQuery, onSearchChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between w-full md:items-center gap-4">
        <div className="flex justify-between">
          <div className="flex text-red">
            <h1 className="text-2xl">Welcome, </h1>
            <h1 className="text-2xl font-bold ps-2">{userDetails?.userName}</h1>
          </div>
        </div>
        {displaySearch && (
          <div className="flex items-center gap-6 justify-between">
            <form
              className="max-w-full md:max-w-md w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="w-full p-3 ps-10 text-sm border border-gray-300 rounded-lg focus:outline-none"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-bold">{title}</h4>
        {isDisplayActionButton && (
          <Button
            label={
              <>
                <Plus width={20} height={20} />
                {buttonName}
              </>
            }
            className={`flex items-center gap-2 uppercase cursor-pointer whitespace-nowrap ${addBtnColor}`}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
