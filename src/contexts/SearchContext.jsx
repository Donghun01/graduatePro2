// src/contexts/SearchContext.jsx
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import jsonData from "../../db.json";

const SearchContext = createContext();

const ITEMS_PER_PAGE = 3;

export const SearchProvider = ({ children }) => {
  const [crime, setCrime] = useState(0);
  const [rent, setRent] = useState(0);
  const [facility, setFacility] = useState(0);
  const [foreigner, setForeigner] = useState(0);
  const [youth, setYouth] = useState(0);
  const [senior, setSenior] = useState(0);
  const [address, setAddress] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState([37.5665, 126.978]);
  // 사용자가 입력한 주소의 마커 정보를 담을 상태 추가
  const [userAddressMarker, setUserAddressMarker] = useState(null);

  // 자동 검색 실행 함수
  const performSearch = useCallback(() => {
    const filterAndSetResults = () => {
        // 새로운 점수 계산 방식: [이용자의 범죄율 점수 * safty] + [이용자의 1인가구 점수 * household] + [이용자의 교통편의성 점수 * transport] + [이용자의 거주외국인 점수 * foreigner] + [이용자의 거주청년 점수 * youth] + [이용자의 거주노년 점수 * Senior]
        const scoredMarkers = jsonData.markers.map((marker) => {
          const saftyScore = parseFloat(marker.safty);
          const householdScore = parseFloat(marker.household);
          const transportScore = parseFloat(marker.transport);
          const foreignerScore = parseFloat(marker.foreigner);
          const youthScore = parseFloat(marker.youth);
          const seniorScore = parseFloat(marker.Senior);
          
          const totalScore = (crime * saftyScore) + (rent * householdScore) + (facility * transportScore) + (foreigner * foreignerScore) + (youth * youthScore) + (senior * seniorScore);
          
          return {
            ...marker,
            totalScore: totalScore
          };
        });
      
      // 점수가 높은 순서대로 정렬
      const sortedMarkers = scoredMarkers.sort((a, b) => b.totalScore - a.totalScore);
      
      setSearchResults(sortedMarkers);
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
  }, [crime, rent, facility, foreigner, youth, senior, address]);

  // 점수나 주소가 변경될 때마다 자동으로 검색 실행
  useEffect(() => {
    // 모든 점수가 0이고 주소가 비어있으면 검색하지 않음
    if (crime === 0 && rent === 0 && facility === 0 && foreigner === 0 && youth === 0 && senior === 0 && !address) {
      setShowResults(false);
      return;
    }
    
    setIsLoading(true);
    setShowResults(true);
    performSearch();
  }, [crime, rent, facility, foreigner, youth, senior, address, performSearch]);

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      // 이미 useEffect에서 자동으로 검색이 실행되므로 여기서는 추가 작업 없음
    },
    []
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
    foreigner,
    setForeigner,
    youth,
    setYouth,
    senior,
    setSenior,
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
