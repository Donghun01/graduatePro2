import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HouseCarousel from "../components/HouseCarousel";
import AdCarousel from "../components/AdCarousel";

const Home = () => {
  const navigate = useNavigate();

  const messages = [
    "서울 속, 나만의 안식처를 찾아드립니다.",
    "당신에게 꼭 맞는 동네를 추천해드립니다.",
    "치안·임대료·편의시설, 모든 걸 고려한 최적의 지역을 알려드려요.",
  ];

  const [message] = useState(
    () => messages[Math.floor(Math.random() * messages.length)]
  );

  const handleStart = () => navigate("/search");

  return (
    <div className="flex flex-col items-center py-16 px-6 bg-gray-50">
      <h1 className="mb-7 text-center text-4xl font-extrabold text-gray-800">
        {message}
      </h1>

      <p className="text-center max-w-2xl mb-1 text-gray-800 leading-relaxed">
        치안, 임대료, 거리, 편의시설 등{" "}
        <span className="text-[#00AEEF] font-semibold">다양한 조건</span>을
        바탕으로
        <br />
        <span className="text-[#00AEEF] font-semibold">최적의 지역</span>을
        추천해드립니다.
      </p>

      <div className="flex flex-wrap justify-center gap-8 w-full max-w-4xl">
        <div className="mt-12 w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden h-96 md:h-[600px]">
          <HouseCarousel />
        </div>
      </div>

      <button
        onClick={handleStart}
        className="mt-10 px-8 py-3 px-10 bg-[#00AEEF] text-white rounded-full text-lg font-semibold hover:bg-[#008bb5] transition-colors shadow-md"
      >
        시작하기
      </button>
    </div>
  );
};

export default Home;
