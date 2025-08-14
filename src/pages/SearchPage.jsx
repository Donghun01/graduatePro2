// src/pages/SearchPage.jsx
import React from "react";
import MapSection from "../components/MapSection";
import ListSection from "../components/ListSection";
import { useSearch } from "../contexts/SearchContext";
import { useNavigate } from "react-router-dom"; // useNavigate import 추가

const SearchPage = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const {
    crime,
    setCrime,
    rent,
    setRent,
    facility,
    setFacility,
    address,
    setAddress,
    searchResults,
    handleSearch,
    showResults,
    isLoading,
    currentPage,
    goToPage,
    totalPages,
    ITEMS_PER_PAGE,
    defaultCenter,
    userAddressMarker,
  } = useSearch();

  const handleMarkerClick = (marker) => {
    navigate(`/list/${marker.name}`); // 마커 클릭 시 해당 지역의 세부 페이지로 이동
  };

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = searchResults.slice(startIdx, startIdx + ITEMS_PER_PAGE);
  const defaultZoom = 9;

  return (
    <div className="flex flex-col items-center py-16 px-6 bg-gray-50">
      <form
        onSubmit={handleSearch}
        className="max-w-6xl mt-12 mx-auto flex flex-col gap-10 px-4 w-full"
      >
        <section className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-800">
            중요도를 선택하세요
          </h2>

          <div className="flex items-center mb-5 gap-6">
            <label className="w-28 font-semibold text-gray-700">범죄율:</label>
            <input
              type="range"
              min={0}
              max={10}
              value={crime}
              onChange={(e) => setCrime(+e.target.value)}
              className="flex-1 accent-[#00AEEF] h-2"
            />
            <span className="ml-6 w-10 text-center font-medium text-gray-800">
              {crime}
            </span>
          </div>

          <div className="flex items-center mb-5 gap-6">
            <label className="w-28 font-semibold text-gray-700">월세:</label>
            <input
              type="range"
              min={0}
              max={10}
              value={rent}
              onChange={(e) => setRent(+e.target.value)}
              className="flex-1 accent-[#00AEEF] h-2"
            />
            <span className="ml-6 w-10 text-center font-medium text-gray-800">
              {rent}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <label className="w-28 font-semibold text-gray-700">
              편의시설:
            </label>
            <input
              type="range"
              min={0}
              max={10}
              value={facility}
              onChange={(e) => setFacility(+e.target.value)}
              className="flex-1 accent-[#00AEEF] h-2"
            />
            <span className="ml-6 w-10 text-center font-medium text-gray-800">
              {facility}
            </span>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
          <h3 className="w-full md:w-auto text-lg font-semibold text-gray-800">
            자주 가는 장소
          </h3>
          <input
            type="text"
            placeholder="예) 서울시 강남구 역삼동"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="flex-1 py-3 px-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
          />
        </section>

        <button
          type="submit"
          className="self-end py-3 px-10 bg-[#00AEEF] text-white rounded-full text-lg font-semibold hover:bg-[#008bb5] transition-colors shadow-md"
        >
          제출하기
        </button>
      </form>

      {showResults && (
        <div className="w-full mt-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
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
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="col-span-1 lg:col-span-2">
                <MapSection
                  center={defaultCenter}
                  zoom={defaultZoom}
                  markers={currentItems}
                  userAddressMarker={userAddressMarker}
                  onMarkerClick={handleMarkerClick} // onMarkerClick props 추가
                />
              </div>
              <div className="col-span-1">
                <ListSection items={currentItems} startIdx={startIdx} />
              </div>
            </div>
          )}

          {totalPages > 1 && !isLoading && searchResults.length > 0 && (
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
        </div>
      )}
    </div>
  );
};

export default SearchPage;
