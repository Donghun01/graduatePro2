// src/components/SearchResultsDisplay.jsx
import React from "react";
import MapSection from "./map/MapSection";
import ListSection from "./ListSection";
import { useSearch } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

const SearchResultsDisplay = () => {
  const navigate = useNavigate();
  const {
    searchResults,
    isLoading,
    currentPage,
    goToPage,
    totalPages,
    ITEMS_PER_PAGE,
    defaultCenter,
    userAddressMarker,
  } = useSearch();

  const handleMarkerClick = (marker) => {
    navigate(`/list/${marker.name}`);
  };

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = searchResults.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const defaultZoom = 9;

  return (
    <div className="w-full mt-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        추천 동네 결과
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <p className="text-xl text-gray-600">검색 중...</p>
        </div>
      ) : searchResults.length === 0 ? (
        <p className="text-center text-gray-600">
          죄송해요, 조건에 맞는 지역을 찾을 수 없습니다.
        </p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2">
            <MapSection
              center={defaultCenter}
              zoom={defaultZoom}
              markers={currentItems}
              userAddressMarker={userAddressMarker}
              onMarkerClick={handleMarkerClick}
            />
          </div>
          <div className="col-span-1">
            <ListSection items={currentItems} startIdx={startIdx} />
          </div>
        </div>
      )}

      {totalPages > 1 && !isLoading && searchResults.length > 0 && (
        <div className="flex justify-center items-center mt-6 space-x-2">
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

export default SearchResultsDisplay;
