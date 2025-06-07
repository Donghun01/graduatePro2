// src/pages/MapPage.jsx
import React, { useState } from "react";
import MapSection from "../components/MapSection";
import ListSection from "../components/ListSection";
import { sampleMarkers } from "../data/sampleMarkers";

const ITEMS_PER_PAGE = 3;

const MapPage = () => {
  const [markers] = useState(sampleMarkers);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(markers.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentItems = markers.slice(startIdx, endIdx);

  const defaultCenter = currentItems.length
    ? [currentItems[0].lat, currentItems[0].lng]
    : [37.5665, 126.978];
  const defaultZoom = 9;

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        추천 동네 결과
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="col-span-1 lg:col-span-2">
          <MapSection
            center={defaultCenter}
            zoom={defaultZoom}
            markers={currentItems}
          />
        </div>

        {/* 리스트 */}
        <div className="col-span-1">
          <ListSection items={currentItems} startIdx={startIdx} />
        </div>
      </div>

      {/* 페이지 */}
      {totalPages > 1 && (
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
      )}
    </div>
  );
};

export default MapPage;
