// src/components/MapPageContent.jsx
import React from "react";
import MapSection from "./MapSection";
import ListSection from "./ListSection";
import MapPagePagination from "./MapPagePagination"; // 새로 만들 컴포넌트 가져오기

const ITEMS_PER_PAGE = 3;

const MapPageContent = ({ markers }) => {
  const [currentPage, setCurrentPage] = React.useState(1);

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
    <>
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

      {/* 페이지네이션 */}
      <MapPagePagination
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
      />
    </>
  );
};

export default MapPageContent;
