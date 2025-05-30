import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MapPage from "./pages/MapPage";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import About from "./pages/AboutPage";
import "./index.css";

import "leaflet/dist/leaflet.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <BrowserRouter>
      {/* 화면 전체를 세로 flex 컨테이너로 만들기 */}
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* 1. 네비게이션 */}
        <Navbar />

        {/* 2. 메인 콘텐츠: 남은 공간을 차지하도록 flex:1 */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/results" element={<MapPage />} />
          </Routes>
        </main>

        {/* 3. 푸터: flex 컬럼의 마지막에 고정 */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
