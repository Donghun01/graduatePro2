// src/pages/MapPage.jsx
import React, { useState } from "react";
import MapView from "../components/MapView";
import Results from "../components/Results";

const sampleData = [
  {
    name: "강남",
    lat: 37.4979,
    lng: 127.0276,
    rent: "80만",
    transport: "매우 우수",
    safety: "우수",
    description: "화려한 아강 쇼핑몰...",
  },
  {
    name: "홍대",
    lat: 37.5572,
    lng: 126.9246,
    rent: "65만",
    transport: "우수",
    safety: "보통",
    description: "감성 카페와...",
  },
  {
    name: "이태원",
    lat: 37.5343,
    lng: 126.9949,
    rent: "75만",
    transport: "우수",
    safety: "보통",
    description: "다양성 중시...",
  },
];

const MapPage = () => {
  // ① markers 상태로 샘플 데이터를 관리
  const [markers] = useState(sampleData);

  // ② 초기 지도 중심(center)을 첫 번째 마커 위치(강남)로 설정
  //    만약 markers가 비어 있으면 기본값 [37.5665, 126.978] (서울시청) 사용
  const defaultCenter = markers.length
    ? [markers[0].lat, markers[0].lng]
    : [37.5665, 126.978];

  // ③ 초기 줌 레벨 (1~14). 숫자가 작을수록 확대(closer)되어 보입니다.
  const defaultZoom = 4;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>추천 동네 결과</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* ④ MapView에 center, zoom, markers를 모두 넘겨줍니다. */}
        <MapView center={defaultCenter} zoom={defaultZoom} markers={markers} />

        {/* ⑤ 오른쪽 컬럼에는 Results 컴포넌트를 렌더링 */}
        {/*    Results 컴포넌트는 items prop으로 sampleData(=markers) 배열을 받도록 가정 */}
        <Results items={markers} />
      </div>
    </div>
  );
};

export default MapPage;
