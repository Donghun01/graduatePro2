// src/components/MapPagePagination.jsx
import React from "react";

const MapPagePagination = ({ currentPage, totalPages, goToPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-10 space-x-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#00AEEF] text-white hover:bg-[#008bb5]"
        }`}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            page === currentPage
              ? "bg-[#00AEEF] text-white shadow-lg"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#00AEEF] text-white hover:bg-[#008bb5]"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default MapPagePagination;
