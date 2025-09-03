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
      <div className="max-w-5xl mx-auto">
        <Link
          to={`/list/${encodeURIComponent(neighborhood)}`}
          className="inline-flex items-center text-[#00AEEF] hover:text-[#008bb5] font-medium mb-6"
        >
          <span className="mr-2 text-2xl">←</span>
          <span className="text-lg">{neighborhood} 목록으로</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gallery */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="w-full aspect-[16/9] bg-gray-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Summary card */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-max">
            <h1 className="text-2xl font-extrabold text-gray-900">
              {item.title}
            </h1>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border border-gray-100 p-3">
                <div className="text-xs text-gray-500">치안</div>
                <div className="mt-1 text-lg font-semibold">
                  {item.safetyScore}
                </div>
              </div>
              <div className="rounded-xl border border-gray-100 p-3">
                <div className="text-xs text-gray-500">교통</div>
                <div className="mt-1 text-lg font-semibold">
                  {item.transportScore}
                </div>
              </div>
            </div>
            <button className="mt-5 w-full px-5 py-3 bg-[#00AEEF] text-white rounded-xl font-semibold hover:bg-[#008bb5] transition-colors">
              문의하기
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900">상세 설명</h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
