import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HouseCarousel from "../components/HouseCarousel";

const Home = () => {
  const navigate = useNavigate();

  const messages = [
    "당신의 다음 보금자리, 여기서 시작하세요",
    "데이터로 고른 안전하고 합리적인 동네 추천",
    "치안·임대료·교통·편의시설까지 한 번에 비교",
  ];

  const [message] = useState(
    () => messages[Math.floor(Math.random() * messages.length)]
  );

  const handleStart = () => navigate("/search");

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E6F7FD] via-white to-white" />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-14 md:pt-24 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white shadow-sm border border-gray-200 text-xs font-medium text-gray-600 mb-4">
                새로운 동네 찾기 가이드
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
                {message}
              </h1>
              <p className="mt-5 text-gray-600 text-lg leading-relaxed max-w-xl">
                월세, 치안, 교통, 생활 인프라를 종합 분석해 나에게 맞는 지역을
                추천합니다. 한 번의 검색으로 빠르게 비교해 보세요.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleStart}
                  className="px-6 py-3 bg-[#00AEEF] text-white rounded-xl text-base font-semibold shadow-md hover:bg-[#008bb5] transition-colors"
                >
                  맞춤 동네 찾기
                </button>
                <button
                  onClick={() =>
                    window.scrollTo({
                      top: window.innerHeight,
                      behavior: "smooth",
                    })
                  }
                  className="px-6 py-3 bg-white text-gray-800 rounded-xl text-base font-semibold shadow-sm border border-gray-200 hover:bg-gray-50"
                >
                  어떻게 추천하나요?
                </button>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="text-2xl">🛡️</div>
                  <div className="mt-2 text-sm font-semibold text-gray-800">
                    치안 지표
                  </div>
                  <div className="text-xs text-gray-500">
                    행정동 기준 안전도
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="text-2xl">🚇</div>
                  <div className="mt-2 text-sm font-semibold text-gray-800">
                    교통 접근성
                  </div>
                  <div className="text-xs text-gray-500">지하철/버스 거리</div>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="text-2xl">🏪</div>
                  <div className="mt-2 text-sm font-semibold text-gray-800">
                    생활 인프라
                  </div>
                  <div className="text-xs text-gray-500">편의시설 밀집도</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#A8E7FA] to-transparent blur-2xl opacity-60" />
              <div className="relative w-full bg-white rounded-3xl shadow-2xl overflow-hidden h-80 md:h-[460px]">
                <HouseCarousel />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights + CTA */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              빠른 비교, 신뢰할 수 있는 추천
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl">
              조건에 맞는 동네만 선별해 카드 형태로 보여드려요. 클릭 한 번으로
              상세 매물도 확인할 수 있어요.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-xl font-semibold text-gray-900">
                  맞춤 추천
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  조건 기반 동네 추천
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-xl font-semibold text-gray-900">
                  지도 중심
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  마커로 직관적 비교
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-xl font-semibold text-gray-900">
                  간편 탐색
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  페이지네이션 리스트
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="text-xl font-semibold text-gray-900">
                  자동완성
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  네이버식 추천어 제공
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#F0FBFF] to-white border border-[#D6F3FD] rounded-3xl p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              시작이 반입니다
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              몇 가지 선호만 알려주세요. 당신에게 꼭 맞는 동네를 빠르게
              찾아드릴게요.
            </p>
            <button
              onClick={handleStart}
              className="mt-5 w-full px-5 py-3 bg-[#00AEEF] text-white rounded-xl font-semibold hover:bg-[#008bb5] transition-colors shadow-md"
            >
              지금 추천받기
            </button>
            <ul className="mt-6 space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <span className="text-[#00AEEF]">✓</span> 무료로 간편하게
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#00AEEF]">✓</span> 데이터 기반 분석
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#00AEEF]">✓</span> 개인화 추천
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
