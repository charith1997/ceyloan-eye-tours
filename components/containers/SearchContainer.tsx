import Button from "@/components/atoms/Button";
import { logout } from "@/features/authSlice";
import { getUserDetails } from "@/utils/auth";
import { Plus, Power } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(logout());
    setShowModal(false);
    router.push("/");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        !target.closest(".user-profile-icon")
      ) {
        setShowModal(false);
      }
    }

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  const userImage = (height: number, width: number) => (
    <div
      onClick={() => setShowModal(!showModal)}
      className="cursor-pointer user-profile-icon flex"
    >
      {userDetails && userDetails?.profileImage ? (
        <Image
          className={`w-${width} h-${height} p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500`}
          src={userDetails?.profileImage}
          alt="Bordered avatar"
          width={40}
          height={40}
        />
      ) : (
        <div
          className={`relative inline-flex items-center justify-center w-${width} h-${height} overflow-hidden bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white`}
        >
          {userDetails.userName && (
            <span>
              {userDetails?.userName
                .split(" ")
                .map((word: string) => word[0])
                .join("")}
            </span>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between w-full md:items-center gap-4">
        <div className="flex justify-between">
          <div className="flex text-red">
            <h1 className="text-2xl">Welcome, </h1>
            <h1 className="text-2xl font-bold ps-2">{userDetails?.userName}</h1>
          </div>
          <span className="md:hidden">{userImage(10, 10)}</span>
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
          <span className="hidden md:flex">{userImage(10, 10)}</span>
          {showModal && (
            <div
              ref={modalRef}
              className="z-50 bg-white rounded-xl shadow-lg p-4 min-w-[200px] absolute top-32 md:top-16 right-4"
            >
              <div className="flex flex-col w-full gap-2">
                <div className="flex items-center gap-2 border-b-2 pb-2 border-gray-200">
                  {userImage(8, 8)}
                  <div className="font-semibold text-lg text-gray-600">
                    {userDetails?.userName}
                  </div>
                </div>
                <div
                  className="flex text-black gap-2 items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
                  onClick={handleLogout}
                >
                  <Power width={20} height={20} />
                  <h6>Logout</h6>
                </div>
              </div>
            </div>
          )}
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
            className="flex items-center gap-2 bg-[#1976D2] text-white px-4 py-2 rounded-lg uppercase cursor-pointer"
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
};

export default SearchContainer;
