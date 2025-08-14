// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext"; // SearchProvider 추가
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import SearchPage from "./pages/SearchPage";
import ListingPage from "./pages/ListingPage";
import ListingDetailPage from "./pages/ListingDetailPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1">
          {/* Routes를 SearchProvider로 감싸서 모든 자식 컴포넌트가 상태에 접근할 수 있게 합니다. */}
          <SearchProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/list/:neighborhood" element={<ListingPage />} />
              <Route
                path="/list/:neighborhood/:idx"
                element={<ListingDetailPage />}
              />
            </Routes>
          </SearchProvider>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
