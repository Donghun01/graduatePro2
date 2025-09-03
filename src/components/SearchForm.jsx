// src/components/SearchForm.jsx
import React from "react";
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

  return (
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
          <label className="w-28 font-semibold text-gray-700">편의시설:</label>
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
  );
};

export default SearchForm;
