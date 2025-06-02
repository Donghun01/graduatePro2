// src/pages/ListingPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

const listingsData = {
  강남: [
    {
      title: "강남 A 오피스텔",
      imageUrl: "/images/강남A.jpg",
      safetyScore: "9/10",
      transportScore: "200m",
      description:
        "편리한 쇼핑몰과 가까워서 편리합니다. 도보 5분 거리 지하철역과 연결되어 전철로 어디든 이동 가능해요.",
    },
    {
      title: "강남 B 오피스텔",
      imageUrl: "/images/강남B.jpg",
      safetyScore: "7/10",
      transportScore: "300m",
      description:
        "한적한 주택가 골목이라 조용합니다. 지하철역까지 도보 3분 거리로 접근성 좋음.",
    },
    {
      title: "강남 C 오피스텔",
      imageUrl: "/images/강남C.jpg",
      safetyScore: "8/10",
      transportScore: "150m",
      description:
        "고층 빌딩 숲 사이에 위치해 조망이 좋습니다. 주변에 편의점, 카페, 맛집 다수 위치.",
    },
  ],
  홍대: [
    {
      title: "홍대 A 원룸",
      imageUrl: "/images/홍대A.jpg",
      safetyScore: "8/10",
      transportScore: "250m",
      description:
        "감성 카페 골목과 가까워 트렌디한 분위기를 느낄 수 있어요. 홍대입구역까지 도보 5분.",
    },
    {
      title: "홍대 B 투룸",
      imageUrl: "/images/홍대B.jpg",
      safetyScore: "6/10",
      transportScore: "400m",
      description:
        "번화가 중심부보다 약간 떨어져서 조용합니다. 그래도 밤문화 즐기기 좋음.",
    },
    {
      title: "홍대 C 오피스텔",
      imageUrl: "/images/홍대C.jpg",
      safetyScore: "7/10",
      transportScore: "300m",
      description:
        "인근에 공연장과 클럽이 많아 문화생활이 편리합니다. 이태원으로도 이동하기 수월해요.",
    },
  ],
  이태원: [
    {
      title: "이태원 A 하우스",
      imageUrl: "/images/이태원A.jpg",
      safetyScore: "7/10",
      transportScore: "300m",
      description:
        "외국인 관광객이 많아 외국 식당과 다국적 푸드를 쉽게 즐길 수 있어요. 지하철 이태원역 3분 거리.",
    },
    {
      title: "이태원 B 스튜디오",
      imageUrl: "/images/이태원B.jpg",
      safetyScore: "6/10",
      transportScore: "250m",
      description:
        "힙한 분위기의 브랜드 카페가 도보 2분 거리. 해밀턴 호텔 바로 옆이라 안심됩니다.",
    },
    {
      title: "이태원 C 원룸",
      imageUrl: "/images/이태원C.jpg",
      safetyScore: "8/10",
      transportScore: "350m",
      description:
        "밤에는 조명이 예쁜 골목이 많아서 야경이 멋져요. 외국 생활을 체험하기 좋습니다.",
    },
  ],
};

const ListingPage = () => {
  const { neighborhood } = useParams();
  const items = listingsData[neighborhood] || [];

  return (
    <div style={{ padding: "2rem" }}>
      <Link
        to="/results"
        style={{
          textDecoration: "none",
          color: "#555",
          marginBottom: "1rem",
          display: "inline-block",
        }}
      >
        ← 돌아가기
      </Link>
      <h2>📌 {neighborhood} 지역 매물</h2>
      {items.length === 0 ? (
        <p>
          죄송해요, 현재 <strong>{neighborhood}</strong> 지역의 매물 정보를 찾을
          수 없습니다.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            marginTop: "1rem",
          }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ width: "200px", height: "150px", objectFit: "cover" }}
              />
              <div style={{ padding: "1rem", flex: 1 }}>
                <h3 style={{ margin: 0 }}>{item.title}</h3>
                <p style={{ margin: "0.5rem 0" }}>{item.description}</p>
                <ul style={{ paddingLeft: "1.2rem", margin: 0 }}>
                  <li>치안 점수: {item.safetyScore}</li>
                  <li>교통 거리: {item.transportScore}</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingPage;
