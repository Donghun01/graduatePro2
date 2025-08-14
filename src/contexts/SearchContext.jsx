// src/contexts/SearchContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import jsonData from "../../db.json";

const SearchContext = createContext();

const ITEMS_PER_PAGE = 3;

export const SearchProvider = ({ children }) => {
  const [crime, setCrime] = useState(0);
  const [rent, setRent] = useState(0);
  const [facility, setFacility] = useState(0);
  const [address, setAddress] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([37.5665, 126.978]);
  // 사용자가 입력한 주소의 마커 정보를 담을 상태 추가
  const [userAddressMarker, setUserAddressMarker] = useState(null);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      setIsLoading(true);
      setShowResults(true);

      const filterAndSetResults = () => {
        const filteredMarkers = jsonData.markers.filter((marker) => {
          const markerRent = parseInt(marker.rent.replace("만", ""));
          const isRentMatch = rent === 0 || markerRent <= rent * 10;
          const markerSafetyText = marker.safety;
          const markerSafetyScore =
            markerSafetyText === "매우 우수"
              ? 10
              : markerSafetyText === "우수"
              ? 7
              : 4;
          const isSafetyMatch = crime === 0 || markerSafetyScore >= crime;
          return isRentMatch && isSafetyMatch;
        });
        setSearchResults(filteredMarkers);
        setCurrentPage(1);
        setIsLoading(false);
      };

      if (address) {
        window.kakao.maps.load(() => {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = { lat: result[0].y, lng: result[0].x };
              setMapCenter([coords.lat, coords.lng]);
              // 주소 검색 성공 시, userAddressMarker 상태 업데이트
              setUserAddressMarker({ ...coords, name: address });
            } else {
              console.error("주소 검색 실패:", status);
              setMapCenter([37.5665, 126.978]);
              setUserAddressMarker(null);
            }
            filterAndSetResults();
          });
        });
      } else {
        setMapCenter([37.5665, 126.978]);
        setUserAddressMarker(null); // 주소 입력이 없으면 마커 제거
        filterAndSetResults();
      }
    },
    [crime, rent, address]
  );

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = searchResults.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const defaultCenter = currentItems.length
    ? [currentItems[0].lat, currentItems[0].lng]
    : mapCenter;

  const value = {
    crime,
    setCrime,
    rent,
    setRent,
    facility,
    setFacility,
    address,
    setAddress,
    searchResults,
    handleSearch,
    showResults,
    isLoading,
    currentPage,
    goToPage,
    totalPages,
    ITEMS_PER_PAGE,
    defaultCenter,
    userAddressMarker, // Context에 userAddressMarker 추가
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
