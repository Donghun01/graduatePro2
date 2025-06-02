import React, { useState } from "react";
import MapSection from "../components/MapSection";
import ListSection from "../components/ListSection";
import { sampleMarkers } from "../data/sampleMarkers";

const ITEMS_PER_PAGE = 3;

const MapPage = () => {
  const [markers] = useState(sampleMarkers);
  const [currentPage, setCurrentPage] = useState(1);

  // 전체 페이지 수
  const totalPages = Math.ceil(markers.length / ITEMS_PER_PAGE);

  // 현재 페이지에 보여줄 ITEMS_PER_PAGE개 아이템 구하기
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const currentItems = markers.slice(startIdx, endIdx);

  // 페이지 전환 함수
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // 현재 페이지 첫 번째 아이템을 기준으로 지도 center 값 설정
  const defaultCenter = currentItems.length
    ? [currentItems[0].lat, currentItems[0].lng]
    : [37.5665, 126.978]; // 비어 있을 경우 서울시청 좌표
  const defaultZoom = 9;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        추천 동네 결과
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        {/* 좌측: 지도 섹션 (현재 페이지 마커만 넘김) */}
        <MapSection
          center={defaultCenter}
          zoom={defaultZoom}
          markers={currentItems}
        />

        {/* 우측: 리스트 섹션 (현재 페이지 아이템만 넘김) */}
        <ListSection items={currentItems} startIdx={startIdx} />
      </div>

      {/* 하단 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-2">
          {/* Prev 버튼 */}
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

          {/* 페이지 번호 버튼 */}
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

          {/* Next 버튼 */}
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
