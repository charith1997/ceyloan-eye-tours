import React from "react";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@/features/paginatorSlice";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const Paginator = () => {
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.paginator,
  );

  const dispatch = useDispatch();

  const handleLeftClick = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const handleRightClick = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const handleClickNumber = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <>
      {totalPages >= 1 && (
        <div className="flex items-center justify-center">
          <nav className="flex items-center gap-1 sm:gap-2 p-2 sm:p-3 bg-white rounded-xl shadow-lg border border-gray-100">
            <button
              onClick={() => {
                if (currentPage === 1) return;
                handleLeftClick();
              }}
              disabled={currentPage === 1}
              className={`
                flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-semibold
                transition-all duration-300 transform
                ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed bg-gray-50"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-red hover:to-orange hover:text-white hover:shadow-md hover:-translate-x-0.5 bg-gray-50 hover:scale-105 cursor-pointer"
                }
              `}
              aria-label="Previous page"
            >
              <ChevronLeft size={20} className="sm:w-5 sm:h-5" />
            </button>

            {currentPage > 3 && (
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-gray-400">
                <MoreHorizontal size={20} className="sm:w-5 sm:h-5" />
              </div>
            )}

            {Array.from({ length: totalPages }, (_, i) => {
              const pageNumber = i + 1;
              const isInRange =
                pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2;

              return isInRange ? (
                <button
                  key={i}
                  onClick={() => {
                    console.log("clicked", pageNumber);
                    handleClickNumber(pageNumber);
                  }}
                  disabled={pageNumber === currentPage}
                  className={`
                    relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-semibold text-sm sm:text-base
                    transition-all duration-300 transform overflow-hidden
                    ${
                      pageNumber === currentPage
                        ? "bg-gradient-to-r from-red to-orange text-white shadow-lg scale-110 cursor-default"
                        : "text-gray-700 hover:bg-gradient-to-r hover:from-red hover:to-orange hover:text-white hover:shadow-md hover:scale-105 bg-gray-50 cursor-pointer"
                    }
                  `}
                  aria-label={`Page ${pageNumber}`}
                  aria-current={pageNumber === currentPage ? "page" : undefined}
                >
                  <span className="relative z-10">{pageNumber}</span>

                  {pageNumber === currentPage && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full animate-shimmer" />
                  )}
                </button>
              ) : null;
            })}

            {currentPage < totalPages - 2 && (
              <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-gray-400">
                <MoreHorizontal size={20} className="sm:w-5 sm:h-5" />
              </div>
            )}

            <button
              onClick={() => {
                if (currentPage === totalPages) return;
                handleRightClick();
              }}
              disabled={currentPage === totalPages}
              className={`
                flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg font-semibold
                transition-all duration-300 transform
                ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-not-allowed bg-gray-50"
                    : "text-gray-700 hover:bg-gradient-to-r hover:from-red hover:to-orange hover:text-white hover:shadow-md hover:translate-x-0.5 bg-gray-50 hover:scale-105 cursor-pointer"
                }
              `}
              aria-label="Next page"
            >
              <ChevronRight size={20} className="sm:w-5 sm:h-5" />
            </button>
          </nav>

          <div className="ml-4 text-sm text-gray-600 font-medium hidden sm:block">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}
    </>
  );
};

export default Paginator;
