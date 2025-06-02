import React from "react";

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center py-12 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">About Our Project</h1>
      <p className="text-center max-w-2xl mb-8 text-gray-700 leading-relaxed">
        이 프로젝트는 서울시 다양한 지역 정보를 기반으로 사용자에게 최적의
        안식처를 추천해주는 플랫폼입니다. 사용자는 치안, 임대료, 편의시설, 교통
        등을 직접 설정하여 자신만의 필터를 만들고, 그 결과를 지도와 리스트
        형태로 확인할 수 있습니다.
      </p>

      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">주요 기능</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            사용자 맞춤 필터: 범죄율, 월세, 편의시설 등 중요도를 조정하여 관심
            지역 추천
          </li>
          <li>지도 시각화: 카카오맵을 활용하여 추천 지역을 한눈에 확인</li>
          <li>
            상세 매물 리스트: 각 지역별 오피스텔, 원룸 등 매물 정보를 이미지와
            함께 제공
          </li>
        </ul>
      </div>

      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">팀 소개</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          본 프로젝트는 졸업 작품으로 기획되었으며, 학생 개발자들이 협업하여
          완성했습니다. 프론트엔드에서는 React, Tailwind CSS를 사용하여
          직관적이고 깔끔한 UI를 구현했습니다.
        </p>
        <p className="text-gray-700 leading-relaxed">
          사용자의 편의성을 최우선으로 생각하며, 실제 이사 준비 과정에서 필요한
          정보를 쉽고 빠르게 제공하는 것을 목표로 하고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
