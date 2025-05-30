// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import HouseCarousel from "../components/HouseCarousel";
import AdCarousel from "../components/AdCarousel";

const Home = () => {
  const navigate = useNavigate();
  const handleStart = () => navigate("/search");

  return (
    <div style={styles.container}>
      {/* <h1 style={styles.title}>이사하자</h1> */}
      <h1 style={styles.title}>서울 속, 나만의 안식처를 찾아드립니다.</h1>
      <p style={styles.subtitle}>
        <br />
        <span style={styles.descText}>
          치안, 임대료, 거리, 편의시설 등{" "}
          <span style={{ color: "#00AEEF", fontWeight: 700 }}>다양한 조건</span>
          을 바탕으로
          <br />
          <span style={{ color: "#00AEEF", fontWeight: 700 }}>
            나에게 딱 맞는 지역
          </span>
          을 추천해드립니다
        </span>
      </p>

      {/* 두 개의 캐러셀을 가로로 배치 */}
      <div style={styles.carouselWrapper}>
        <div style={styles.carouselBox}>
          <HouseCarousel />
        </div>
        <div style={styles.carouselBox}>
          <AdCarousel />
        </div>
      </div>

      {/* 버튼은 캐러셀 전체 가운데에 */}
      <button style={styles.button} onClick={handleStart}>
        Started
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3rem 1rem", // 좌우 패딩 추가로 화면 넘침 방지
    boxSizing: "border-box",
    width: "100vw",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  title: {
    marginBottom: "2rem",
  },
  subtitle: {
    textAlign: "center",
    maxWidth: "600px",
    lineHeight: 1.5,
    margin: 0,
  },
  carouselWrapper: {
    display: "flex",
    gap: "2rem", // gap을 줄여서 작은 화면에서 넘침 방지
    margin: "2rem 0",
    width: "100%",
    maxWidth: "900px", // maxWidth를 줄여서 화면에 맞춤
    flexWrap: "wrap", // 작은 화면에서 줄바꿈
    justifyContent: "center",
  },
  carouselBox: {
    flex: "1 1 320px", // 최소 너비 지정
    minWidth: "280px",
    maxWidth: "400px",
    borderRadius: 8,
    overflow: "hidden",
    boxSizing: "border-box",
  },
  button: {
    marginTop: "1rem",
    padding: "0.75rem 2rem",
    backgroundColor: "#00AEEF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    alignSelf: "center",
  },
};

export default Home;
