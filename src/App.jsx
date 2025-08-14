// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/SearchContext"; // 추가
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
          <SearchProvider>
            {" "}
            {/* 추가 */}
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
          </SearchProvider>{" "}
          {/* 추가 */}
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
