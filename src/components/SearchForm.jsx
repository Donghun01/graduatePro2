// src/components/SearchForm.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSearch } from "../contexts/SearchContext";

const SearchForm = () => {
  const {
    crime,
    setCrime,
    rent,
    setRent,
    facility,
    setFacility,
    foreigner,
    setForeigner,
    youth,
    setYouth,
    senior,
    setSenior,
    address,
    setAddress,
    handleSearch,
  } = useSearch();

  // 자동완성 상태
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef(null);

  // 바깥 클릭 시 드롭다운 닫기
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // 주소 입력 디바운스 후 Kakao Places 검색
  useEffect(() => {
    const trimmed = (address || "").trim();
    if (!trimmed) {
      setSuggestions([]);
      setIsOpen(false);
      setHighlightIndex(-1);
      return;
    }

    const handler = setTimeout(() => {
      if (trimmed.length < 2) return; // 너무 짧은 검색어는 패스
      if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services)
        return;
      window.kakao.maps.load(() => {
        const places = new window.kakao.maps.services.Places();
        const options = { size: 7 }; // 최대 7개 추천어
        places.keywordSearch(
          trimmed,
          (data, status) => {
            if (status !== window.kakao.maps.services.Status.OK) {
              setSuggestions([]);
              setIsOpen(false);
              setHighlightIndex(-1);
              return;
            }
            const next = data.map((d) => ({
              id: d.id,
              main: d.place_name,
              addr: d.road_address_name || d.address_name || "",
            }));
            setSuggestions(next);
            setIsOpen(true);
            setHighlightIndex(-1);
          },
          options
        );
      });
    }, 300);

    return () => clearTimeout(handler);
  }, [address]);

  const selectSuggestion = (idx) => {
    if (idx < 0 || idx >= suggestions.length) return;
    const s = suggestions[idx];
    const text = s.addr || s.main;
    setAddress(text);
    setIsOpen(false);
    setHighlightIndex(-1);
  };

  const onKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0) {
        e.preventDefault();
        selectSuggestion(highlightIndex);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightIndex(-1);
    }
  };

  return (
    <div className="max-w-6xl mt-4 mx-auto flex flex-col gap-4 px-4 w-full">
      <section className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="mb-4 text-xl font-extrabold text-gray-900">
          우선순위를 설정하세요
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 첫 번째 줄 */}
          {/* 범죄율 */}
          <div className="rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛡️</span>
                <span className="font-semibold text-gray-900">범죄율</span>
                <span className="text-sm cursor-help relative group">
                  💡
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    인구수 대비 범죄율이 낮을 수록 점수가 높아요.
                  </div>
                </span>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#E6F7FD] text-[#007da0]">
                {crime}
              </span>
            </div>
            <div className="mt-4">
              <input
                type="range"
                min={0}
                max={10}
                value={crime}
                onChange={(e) => setCrime(+e.target.value)}
                className="w-full h-2 bg-gradient-to-r from-[#CDEFFC] via-[#8FDDF8] to-[#00AEEF] rounded-full appearance-none accent-[#00AEEF]"
              />
              <div className="mt-2 flex justify-between text-[11px] text-gray-400">
                <span>0</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
          </div>

          {/* 월세 */}
          <div className="rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏠</span>
                <span className="font-semibold text-gray-900">1인가구</span>
                <span className="text-sm cursor-help relative group">
                  💡
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    전체 세대 수 대비 1인가구가 많으면 점수가 높아요.
                  </div>
                </span>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#E6F7FD] text-[#007da0]">
                {rent}
              </span>
            </div>
            <div className="mt-4">
              <input
                type="range"
                min={0}
                max={10}
                value={rent}
                onChange={(e) => setRent(+e.target.value)}
                className="w-full h-2 bg-gradient-to-r from-[#CDEFFC] via-[#8FDDF8] to-[#00AEEF] rounded-full appearance-none accent-[#00AEEF]"
              />
              <div className="mt-2 flex justify-between text-[11px] text-gray-400">
                <span>0</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
          </div>

          {/* 편의시설 */}
          <div className="rounded-2xl border border-gray-100 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚉</span>
                <span className="font-semibold text-gray-900">교통편의성</span>
                <span className="text-sm cursor-help relative group">
                  💡
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    점수가 높을수록 대중교통이 활성화 되어있어요.
                  </div>
                </span>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#E6F7FD] text-[#007da0]">
                {facility}
              </span>
            </div>
            <div className="mt-4">
              <input
                type="range"
                min={0}
                max={10}
                value={facility}
                onChange={(e) => setFacility(+e.target.value)}
                className="w-full h-2 bg-gradient-to-r from-[#CDEFFC] via-[#8FDDF8] to-[#00AEEF] rounded-full appearance-none accent-[#00AEEF]"
              />
              <div className="mt-2 flex justify-between text-[11px] text-gray-400">
                <span>0</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
          </div>

          {/* 두 번째 줄 */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 거주외국인 */}
            <div className="rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌍</span>
                <span className="font-semibold text-gray-900">거주외국인</span>
                <span className="text-sm cursor-help relative group">
                  💡
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    외국인 거주율이 높을 수록 점수가 낮아요.
                  </div>
                </span>
              </div>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#E6F7FD] text-[#007da0]">
                  {foreigner}
                </span>
              </div>
              <div className="mt-4">
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={foreigner}
                  onChange={(e) => setForeigner(+e.target.value)}
                  className="w-full h-2 bg-gradient-to-r from-[#CDEFFC] via-[#8FDDF8] to-[#00AEEF] rounded-full appearance-none accent-[#00AEEF]"
                />
                <div className="mt-2 flex justify-between text-[11px] text-gray-400">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            {/* 거주청년 */}
            <div className="rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">👨‍💼</span>
                <span className="font-semibold text-gray-900">거주청년</span>
                <span className="text-sm cursor-help relative group">
                  💡
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    점수가 높을수록 청년 거주율이 높아요.
                  </div>
                </span>
              </div>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#E6F7FD] text-[#007da0]">
                  {youth}
                </span>
              </div>
              <div className="mt-4">
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={youth}
                  onChange={(e) => setYouth(+e.target.value)}
                  className="w-full h-2 bg-gradient-to-r from-[#CDEFFC] via-[#8FDDF8] to-[#00AEEF] rounded-full appearance-none accent-[#00AEEF]"
                />
                <div className="mt-2 flex justify-between text-[11px] text-gray-400">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            {/* 거주노년 */}
            <div className="rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">👴</span>
                <span className="font-semibold text-gray-900">거주노년</span>
                <span className="text-sm cursor-help relative group">
                  💡
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    점수가 높을수록 노년 거주율이 높아요.
                  </div>
                </span>
              </div>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#E6F7FD] text-[#007da0]">
                  {senior}
                </span>
              </div>
              <div className="mt-4">
                <input
                  type="range"
                  min={0}
                  max={10}
                  value={senior}
                  onChange={(e) => setSenior(+e.target.value)}
                  className="w-full h-2 bg-gradient-to-r from-[#CDEFFC] via-[#8FDDF8] to-[#00AEEF] rounded-full appearance-none accent-[#00AEEF]"
                />
                <div className="mt-2 flex justify-between text-[11px] text-gray-400">
                  <span>0</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={containerRef}
        className="bg-white shadow-lg rounded-xl p-4 flex flex-col md:flex-row items-center gap-4 relative"
      >
        <h3 className="w-full md:w-auto text-base font-semibold text-gray-800">
          자주 가는 장소
        </h3>
        <input
          type="text"
          placeholder="예) 서울특별시 강남구 역삼동"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
        />

        {isOpen && suggestions.length > 0 && (
          <div className="absolute left-[140px] right-6 top-[72px] z-20 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-auto">
            {suggestions.map((s, idx) => (
              <button
                type="button"
                key={s.id || idx}
                onClick={() => selectSuggestion(idx)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 ${
                  idx === highlightIndex ? "bg-gray-100" : ""
                }`}
              >
                <div className="text-sm font-medium text-gray-800">
                  {s.main}
                </div>
                {s.addr && (
                  <div className="text-xs text-gray-500 mt-0.5">{s.addr}</div>
                )}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchForm;
