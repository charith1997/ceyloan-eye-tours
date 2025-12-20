import React from "react";
import "../../styles/paginator.css";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@/features/paginatorSlice";

const Paginator = () => {
  const { currentPage, totalPages } = useAppSelector(
    (state) => state.paginator
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
        <div className="flex items-center pagination">
          <div
            className={`pagination-item ${
              currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => {
              if (currentPage === 1) {
                return;
              }
              handleLeftClick();
            }}
          >
            {`<`}
          </div>

          {currentPage > 3 && <div className="pagination-item">...</div>}

          {Array.from({ length: totalPages }, (_, i) => {
            const pageNumber = i + 1;
            const isInRange =
              pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2;

            return isInRange ? (
              <div
                className={`pagination-item cursor-pointer ${
                  pageNumber === currentPage ? "pagination-item-active" : ""
                }`}
                key={i}
                onClick={() => {
                  console.log("clicked", pageNumber);
                  handleClickNumber(pageNumber);
                }}
              >
                {pageNumber}
              </div>
            ) : null;
          })}

          {currentPage < totalPages - 2 && (
            <div className="pagination-item">...</div>
          )}

          <div
            className={`pagination-item ${
              currentPage === totalPages
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={() => {
              if (currentPage === totalPages) {
                return;
              }
              handleRightClick();
            }}
          >
            {`>`}
          </div>
        </div>
      )}
    </>
  );
};

export default Paginator;
