import React, { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    };
  
    const pageNumbers = getPageNumbers();
  
    const handlePageChange = (newPage) => {
      if (newPage >= 1 && newPage <= totalPages) {
        onPageChange(newPage);
      }
    };
  
    return (
      <div className="flex justify-center my-14 mx-auto">
        <div className="text-lg w-[100%]">
          <ul className="flex flex-row space-x-4">
            <button
              className="bg-PrimaryColors text-PrimaryBG border border-PrimaryColors p-1 px-3 duration-200 hover:bg-[transparent] hover:border-PrimaryColors hover:text-PrimaryColors"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            {pageNumbers.map((pageNumber, index) => (
              <button
                key={index}
                className={`${
                  currentPage === pageNumber
                    ? 'bg-[transparent] text-PrimaryColors '
                    : 'bg-PrimaryColors text-PrimaryBG border-PrimaryColors hover:bg-[transparent] hover:border-PrimaryColors hover:text-PrimaryColors'
                } p-1 px-3 duration-200 border`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
  
            <button
              className="bg-PrimaryColors text-PrimaryBG border border-PrimaryColors p-1 px-3 duration-200 hover:bg-[transparent] hover:border-PrimaryColors hover:text-PrimaryColors"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </ul>
        </div>
      </div>
    );
  }
export default Pagination;