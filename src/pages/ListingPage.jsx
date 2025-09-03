// src/pages/ListingPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 4;

const ListingPage = () => {
  const { neighborhood } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3001/listings`);
        if (!response.ok) {
          throw new Error("네트워크 응답이 올바르지 않습니다.");
        }
        const data = await response.json();

        setItems(data[neighborhood] || []);
      } catch (err) {
        setError("매물 정보를 가져오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [neighborhood]);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIdx, startIdx + ITEMS_PER_PAGE);

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
      <button
        onClick={() => navigate("/search")}
        className="inline-flex items-center text-[#00AEEF] hover:text-[#008bb5] font-medium mb-6"
      >
        <span className="mr-2 text-2xl">←</span>
        <span className="text-lg">돌아가기</span>
      </button>

      <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
        {neighborhood} 지역 매물
      </h2>
      <p className="text-gray-600 mb-8">
        추천된 매물들을 한눈에 비교해 보세요.
      </p>

      {items.length === 0 ? (
        <p className="text-center text-gray-600">
          죄송해요, 현재{" "}
          <strong className="text-gray-800">{neighborhood}</strong> 지역의 매물
          정보를 찾을 수 없습니다.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentItems.map((item) => (
              <Link
                key={item.id}
                to={`/list/${encodeURIComponent(neighborhood)}/${item.id}`}
                className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                    <h3 className="text-white text-xl font-semibold drop-shadow">
                      {item.title}
                    </h3>
                    <div className="hidden group-hover:flex gap-2">
                      <span className="px-2 py-1 text-xs rounded-md bg-white/90 text-gray-800">
                        치안 {item.safetyScore}
                      </span>
                      <span className="px-2 py-1 text-xs rounded-md bg-white/90 text-gray-800">
                        교통 {item.transportScore}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-600 line-clamp-2 min-h-[44px]">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#E6F7FD] text-[#007da0]">
                      안전 {item.safetyScore}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                      교통 {item.transportScore}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 페이지네이션 */}
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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}

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
        </>
      )}
    </div>
  );
};

export default ListingPage;
