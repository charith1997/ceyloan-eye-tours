import Button from "@/components/atoms/Button";
import { getUserDetails } from "@/utils/auth";
import { CircleUserRound, Plus } from "lucide-react";
import React, { useState } from "react";

interface SearchContainerProps {
  searchPlaceholder: string;
  title: string;
  buttonName: string;
  onClick?: () => void;
  isDisplayActionButton?: boolean;
}

const SearchContainer = ({
  searchPlaceholder,
  title,
  buttonName,
  onClick,
  isDisplayActionButton = true,
}: SearchContainerProps) => {
  const [showModal, setShowModal] = useState(false);
  const userDetails = getUserDetails();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setShowModal(false);
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between w-full md:items-center gap-4">
        <div className="flex justify-between">
          <div className="flex text-red">
            <h1 className="text-2xl">Welcome, </h1>
            <h1 className="text-2xl font-bold ps-2">{userDetails?.userName}</h1>
          </div>
          <span className="md:hidden">
            <CircleUserRound width={40} height={40} onClick={() => setShowModal(!showModal)} />
          </span>
        </div>
        <div className="flex items-center gap-6 justify-between">
          <form className="max-w-full md:max-w-md w-full">
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
                required
              />
            </div>
          </form>
          <span className="hidden md:flex">
            <CircleUserRound width={40} height={40} onClick={() => setShowModal(!showModal)} />
          </span>
          {showModal && <div className="z-50 flex bg-gray-100 rounded shadow-2xl p-4 min-w-[200px] absolute right-0 mr-4 mt-12 md:mt-42">
            <div className="flex flex-col w-full gap-2">
              <div className="font-semibold text-lg text-gray-500">
                {userDetails?.userName}
              </div>
              <button
                className="py-2 bg-gradient-to-r from-red to-orange text-white rounded cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>}
        </div>
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
            className="flex items-center gap-2 bg-gradient-to-r from-red to-orange text-white px-4 py-2 rounded-lg uppercase cursor-pointer"
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
