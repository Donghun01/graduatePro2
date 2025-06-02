// src/components/ListSection.jsx
import React from "react";
import { Link } from "react-router-dom";

const ListSection = ({ items = [], startIdx }) => {
  return (
    <div className="space-y-6">
      {items.map((item, idx) => (
        <Link
          key={startIdx + idx}
          to={`/list/${encodeURIComponent(item.name)}`}
          className="block transform hover:scale-[1.02] transition-transform duration-200"
        >
          <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              {startIdx + idx + 1}. {item.name}
            </h3>
            <p className="mb-4 text-gray-600 line-clamp-3">
              {item.description}
            </p>
            <ul className="flex flex-wrap gap-4 text-gray-700 text-sm">
              <li className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 bg-[#00AEEF] rounded-full" />
                <span>평균 월세: {item.rent}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 bg-[#00AEEF] rounded-full" />
                <span>교통: {item.transport}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="inline-block w-2 h-2 bg-[#00AEEF] rounded-full" />
                <span>치안: {item.safety}</span>
              </li>
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListSection;
