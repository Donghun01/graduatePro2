// src/components/MapView.jsx
import React, { useEffect, useRef } from "react";

const { kakao } = window;

const MapView = ({
  center = [37.5665, 126.978],
  zoom = 4,
  markers = [],
  userAddressMarker = null,
  onMarkerClick, // onMarkerClick props 추가
}) => {
  const mapContainerRef = useRef(null);
  const kakaoMapRef = useRef(null);

  useEffect(() => {
    kakao.maps.load(() => {
      if (!mapContainerRef.current) return;
      if (!kakaoMapRef.current) {
        kakaoMapRef.current = new kakao.maps.Map(mapContainerRef.current, {
          center: new kakao.maps.LatLng(center[0], center[1]),
          level: zoom,
        });
      } else {
        const map = kakaoMapRef.current;
        const newCenter = new kakao.maps.LatLng(center[0], center[1]);
        map.setCenter(newCenter);
        map.setLevel(zoom);
      }
    });
  }, [center, zoom]);

  useEffect(() => {
    const map = kakaoMapRef.current;
    if (!map) return;

    // 기존 마커 정리
    if (map._markerList) {
      map._markerList.forEach((m) => m.setMap(null));
    }
    map._markerList = [];

    // 기존 오버레이 정리
    if (map._overlayList) {
      map._overlayList.forEach((o) => o.setMap(null));
    }
    map._overlayList = [];

    // 기존 마커들 생성 (기본 마커 사용)
    markers.forEach((m) => {
      const position = new kakao.maps.LatLng(m.lat, m.lng);
      const marker = new kakao.maps.Marker({ position });
      marker.setMap(map);

      const infoContent = `
        <div class="bg-white p-4 rounded-lg shadow-md max-w-xs">
          <strong class="text-lg font-bold block mb-1 text-gray-800">${m.name}</strong>
          <ul class="text-sm text-gray-600 space-y-1">
            <li><span class="font-semibold text-blue-500">범죄율:</span> ${m.safty}</li>
            <li><span class="font-semibold text-blue-500">1인가구:</span> ${m.household}</li>
            <li><span class="font-semibold text-blue-500">교통편의성:</span> ${m.transport}</li>
            <li><span class="font-semibold text-blue-500">거주외국인:</span> ${m.foreigner}</li>
            <li><span class="font-semibold text-blue-500">거주청년:</span> ${m.youth}</li>
            <li><span class="font-semibold text-blue-500">거주노년:</span> ${m.Senior}</li>
          </ul>
          <p class="mt-2 text-xs text-gray-500 line-clamp-2">${m.description || ''}</p>
        </div>`;
      const infowindow = new kakao.maps.InfoWindow({
        content: infoContent,
        removable: true,
      });

      kakao.maps.event.addListener(marker, "click", () => {
        map._markerList.forEach((m) => m._infowindow.close());
        infowindow.open(map, marker);
        // 마커 클릭 시 onMarkerClick 함수 실행
        if (onMarkerClick) {
          onMarkerClick(m);
        }
      });
      marker._infowindow = infowindow;
      map._markerList.push(marker);
    });

    // 사용자가 입력한 주소의 마커 생성 (기본 마커 + 파란 점 오버레이로 강조)
    if (userAddressMarker) {
      const position = new kakao.maps.LatLng(
        userAddressMarker.lat,
        userAddressMarker.lng
      );
      const userMarker = new kakao.maps.Marker({ position });
      userMarker.setMap(map);

      const infoContent = `
        <div class="bg-white p-4 rounded-lg shadow-md max-w-xs">
          <strong class="text-lg font-bold block mb-1 text-gray-800">내가 찾는 지역</strong>
          <p class="mt-2 text-sm text-gray-600">${userAddressMarker.name}</p>
        </div>`;
      const infowindow = new kakao.maps.InfoWindow({
        content: infoContent,
        removable: true,
      });
      kakao.maps.event.addListener(userMarker, "click", () => {
        map._markerList.forEach((m) => m._infowindow.close());
        infowindow.open(map, userMarker);
      });
      userMarker._infowindow = infowindow;

      // 파란 점 오버레이로 시각적 강조 (기본 마커 위에 표시)
      const overlay = new kakao.maps.CustomOverlay({
        position,
        yAnchor: 1.2,
        content:
          '<div style="width:12px;height:12px;background:#00AEEF;border:2px solid #ffffff;border-radius:9999px;box-shadow:0 0 0 4px rgba(0,174,239,0.25);"></div>',
      });
      overlay.setMap(map);

      map._markerList.push(userMarker);
      map._overlayList.push(overlay);
    }
  }, [markers, userAddressMarker, onMarkerClick]); // onMarkerClick을 의존성 배열에 추가

  return (
    <div
      ref={mapContainerRef}
      className="w-[100%] h-[700px] rounded-lg overflow-hidden"
    />
  );
};

export default MapView;
