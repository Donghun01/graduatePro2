import React, { useState, useEffect } from "react";
import MapSection from "../components/MapSection";
import ListSection from "../components/ListSection";
// import { sampleMarkers } from "../data/sampleMarkers"; // 이 줄을 제거했습니다.

const ITEMS_PER_PAGE = 3;

const MapPage = () => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        setLoading(true);
        // Mock API 엔드포인트로 변경
        const response = await fetch("http://localhost:3001/markers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMarkers(data);
      } catch (err) {
        setError("마커 데이터를 가져오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMarkers();
  }, []);

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

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

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
