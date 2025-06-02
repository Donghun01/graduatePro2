// src/pages/MapPage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import MapView from "../components/MapView";

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
  // 항상 첫 번째 마커(강남) 위치를 센터로 사용
  const defaultCenter = [markers[0].lat, markers[0].lng];
  const defaultZoom = 9;

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
        {/* 지도 컴포넌트 */}
        <MapView center={defaultCenter} zoom={defaultZoom} markers={markers} />

        <div>
          {markers.map((item, idx) => (
            <Link
              key={idx}
              to={`/list/${encodeURIComponent(item.name)}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div
                style={{
                  marginBottom: "1.5rem",
                  padding: "1rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <h3>
                  {idx + 1}. {item.name}
                </h3>
                <p style={{ margin: "0.5rem 0" }}>
                  {item.description.slice(0, 30)}...
                </p>
                <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                  <li>평균 월세: {item.rent}</li>
                  <li>교통: {item.transport}</li>
                  <li>치안: {item.safety}</li>
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
