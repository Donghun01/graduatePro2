// src/pages/MapPage.jsx
import React, { useState, useEffect } from "react";
import MapPageContent from "../components/MapPageContent"; // 새로 만든 컴포넌트 가져오기

const MapPage = () => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:3001/markers");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMarkers(data);
      } catch (err) {
        setError("마커 데이터를 가져오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMarkers();
  }, []);

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <MapPageContent markers={markers} />
    </div>
  );
};

export default MapPage;
