import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  // Handle edge cases
  if (totalPages <= 1) return null;

  // Calculate range of visible page numbers
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Always show first page
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    // Show middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Handler functions
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col-reverse items-center my-3 w-full">
      {/* Page Info */}
      <span className="ml-4 text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <div className="flex items-center justify-center gap-2 my-6">
        {/* Back To First Button */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all
            ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
            }
          `}
        >
          First
        </button>
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all
            ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
            }
          `}
        >
          Previous
        </button>
        
        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(page)}
              disabled={page === "..."}
              className={`
                min-w-[40px] h-[40px] rounded-lg font-medium transition-all
                ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : page === "..."
                      ? "bg-transparent text-gray-400 cursor-default"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95"
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>
        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all
            ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
            }
          `}
        >
          Next
        </button>
        {/* Go To Last Button */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`
            px-4 py-2 rounded-lg font-medium transition-all
            ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95"
            }
          `}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;
