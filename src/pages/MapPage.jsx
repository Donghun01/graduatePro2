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
  const [markers] = useState(sampleData);

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
        <MapView markers={markers} />
        <Results items={sampleData} />
      </div>
    </div>
  );
};

export default MapPage;
