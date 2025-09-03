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
    <form
      onSubmit={handleSearch}
      className="max-w-6xl mt-12 mx-auto flex flex-col gap-10 px-4 w-full"
    >
      <section className="bg-white shadow-lg rounded-2xl p-8">
        <h2 className="mb-6 text-2xl font-extrabold text-gray-900">
          우선순위를 설정하세요
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 범죄율 */}
          <div className="rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛡️</span>
                <span className="font-semibold text-gray-900">치안(안전)</span>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#E6F7FD] text-[#007da0]">
                {crime}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              숫자가 높을수록 안전을 더 중시
            </p>
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
          <div className="rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">💸</span>
                <span className="font-semibold text-gray-900">월세(예산)</span>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#E6F7FD] text-[#007da0]">
                {rent}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              숫자가 높을수록 저렴한 곳을 선호
            </p>
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
          <div className="rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏪</span>
                <span className="font-semibold text-gray-900">편의시설</span>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-[#E6F7FD] text-[#007da0]">
                {facility}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              숫자가 높을수록 생활 인프라 중시
            </p>
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
        </div>
      </section>

      <section
        ref={containerRef}
        className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 relative"
      >
        <h3 className="w-full md:w-auto text-lg font-semibold text-gray-800">
          자주 가는 장소
        </h3>
        <input
          type="text"
          placeholder="예) 서울특별시 강남구 역삼동"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 py-3 px-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00AEEF]"
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

      <button
        type="submit"
        className="self-end py-3 px-10 bg-[#00AEEF] text-white rounded-full text-lg font-semibold hover:bg-[#008bb5] transition-colors shadow-md"
      >
        제출하기
      </button>
    </form>
  );
};

export default SearchForm;
