// src/pages/ListingDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import { sampleListings } from "../data/sampleListings"; // 이 줄은 이제 필요 없습니다.

const ListingDetailPage = () => {
  const { neighborhood, idx } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListingDetail = async () => {
      try {
        setLoading(true);
        // Mock API의 listings 객체 전체를 가져옵니다.
        const response = await fetch(`http://localhost:3001/listings`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // 가져온 데이터에서 neighborhood에 해당하는 배열을 찾은 후,
        // URL의 idx(id)와 일치하는 항목을 찾습니다.
        const listingsInNeighborhood = data[neighborhood] || [];
        const listing = listingsInNeighborhood.find(
          (listing) => String(listing.id) === String(idx)
        );

        setItem(listing);
      } catch (err) {
        setError("매물 정보를 가져오는 데 실패했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListingDetail();
  }, [neighborhood, idx]);

  if (loading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl text-gray-600 mb-4">존재하지 않는 매물입니다.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-[#00AEEF] text-white rounded-lg hover:bg-[#008bb5] transition-colors"
        >
          이전으로
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <Link
        to={`/list/${encodeURIComponent(neighborhood)}`}
        className="inline-flex items-center text-[#00AEEF] hover:text-[#008bb5] font-medium mb-6"
      >
        <span className="mr-2 text-2xl">←</span>
        <span className="text-lg">뒤로 가기</span>
      </Link>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="w-full h-80 md:h-96 overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">{item.title}</h2>

          <p className="text-gray-700 leading-relaxed">{item.description}</p>

          <ul className="space-y-3 text-gray-700 text-sm">
            <li className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 bg-[#00AEEF] rounded-full" />
              <span>치안 점수: {item.safetyScore}</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 bg-[#00AEEF] rounded-full" />
              <span>교통 거리: {item.transportScore}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
