import React from "react";
import { Link } from "react-router-dom";

const ListSection = ({ items = [], startIdx }) => {
  // 구별 다방 링크 매핑
  const getDabangLink = (districtName) => {
    const links = {
      "종로구": "https://www.dabangapp.com/map/onetwo?m_lat=37.5822204&m_lng=126.9710212&m_zoom=12",
      "중구": "https://www.dabangapp.com/map/onetwo?m_lat=37.5580018&m_lng=126.9941896&m_zoom=12",
      "용산구": "https://www.dabangapp.com/map/onetwo?m_lat=37.5311065&m_lng=126.9810068&m_zoom=12",
      "성동구": "https://www.dabangapp.com/map/onetwo?m_lat=37.5504942&m_lng=127.0413642&m_zoom=12",
      "광진구": "https://www.dabangapp.com/map/onetwo?m_lat=37.5481567&m_lng=127.0856699&m_zoom=12",
      "동대문구": "https://www.dabangapp.com/map/onetwo?m_lat=37.583742&m_lng=127.0506975&m_zoom=12",
      "중랑구": "https://www.dabangapp.com/map/onetwo?m_lat=37.5953196&m_lng=127.0936595&m_zoom=12",
      "성북구": "https://www.dabangapp.com/map/onetwo?m_lat=37.6069522&m_lng=127.0232788&m_zoom=12",
      "강북구": "https://www.dabangapp.com/map/onetwo?m_lat=37.6337522&m_lng=127.0187917&m_zoom=12",
      "도봉구": "https://www.dabangapp.com/map/onetwo?m_lat=37.6659128&m_lng=127.0316678&m_zoom=12",
      "노원구": "https://www.dabangapp.com/map/onetwo?m_lat=37.6551602&m_lng=127.0774625&m_zoom=12",
      "은평구": "https://www.dabangapp.com/map/onetwo?m_lat=37.6176223&m_lng=126.9226468&m_zoom=12",
      "서대문구": "https://www.dabangapp.com/map/onetwo?m_lat=37.581982&m_lng=126.9357206&m_zoom=12",
      "마포구": "https://www.dabangapp.com/map/onetwo?m_lat=37.5622643&m_lng=126.9087377&m_zoom=12",
      "양천구": "https://www.dabangapp.com/map/onetwo?m_lat=37.527119&m_lng=126.8562246&m_zoom=12",
      "강서구": "https://www.dabangapp.com/map/onetwo?m_lat=37.561189&m_lng=126.8228609&m_zoom=12",
      "구로구": "https://www.dabangapp.com/map/onetwo?m_lat=37.4954662&m_lng=126.8587304&m_zoom=12",
      "금천구": "https://www.dabangapp.com/map/onetwo?m_lat=37.4597158&m_lng=126.9000219&m_zoom=12",
      "영등포구": "https://www.dabangapp.com/map/onetwo?m_lat=37.5206289&m_lng=126.9140036&m_zoom=12",
      "동작구": "https://www.dabangapp.com/map/onetwo?m_lat=37.4969735&m_lng=126.9511577&m_zoom=12",
      "관악구": "https://www.dabangapp.com/map/onetwo?m_lat=37.476009&m_lng=126.9351997&m_zoom=12",
      "서초구": "https://www.dabangapp.com/map/onetwo?m_lat=37.4769035&m_lng=127.0379868&m_zoom=12",
      "강남구": "https://www.dabangapp.com/map/onetwo?m_lat=37.5074007&m_lng=127.0460937&m_zoom=12",
      "송파구": "https://www.dabangapp.com/map/onetwo?m_lat=37.5048438&m_lng=127.1142144&m_zoom=12",
      "강동구": "https://www.dabangapp.com/map/onetwo?m_lat=37.5489817&m_lng=127.1464631&m_zoom=12"
    };
    return links[districtName] || "#";
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <a
          key={startIdx + idx}
          href={getDabangLink(item.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="block transform hover:scale-[1.02] transition-transform duration-200"
        >
          <div className="p-4 bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {startIdx + idx + 1}. {item.name}
            </h3>
            <p className="mb-3 text-gray-600 line-clamp-2">
              {item.description}
            </p>
            <div className="grid grid-cols-3 gap-4 text-gray-700 text-sm">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 bg-[#00AEEF] rounded-full" />
                <span>범죄율: {item.safty}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 bg-[#00AEEF] rounded-full" />
                <span>교통편의성: {item.transport}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 bg-[#00AEEF] rounded-full" />
                <span>1인가구: {item.household}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 bg-[#00AEEF] rounded-full" />
                <span>거주외국인: {item.foreigner}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 bg-[#00AEEF] rounded-full" />
                <span>거주청년: {item.youth}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 bg-[#00AEEF] rounded-full" />
                <span>거주노년: {item.Senior}</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ListSection;
