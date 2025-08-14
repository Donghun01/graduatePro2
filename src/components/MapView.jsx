// src/components/MapView.jsx
import React, { useEffect, useRef } from "react";
import icon from "../assets/icon.png"; // 마커 이미지 경로

const { kakao } = window; // 전역에 로드된 kakao 네임스페이스를 가져옵니다.

const MapView = ({
  center = [37.5665, 126.978], // [lat, lng]
  zoom = 4, // 카카오 지도 레벨 (1~14, 숫자가 작을수록 확대)
  markers = [], // [{ name, lat, lng, rent, transport, safety, description }, …]
}) => {
  const mapContainerRef = useRef(null); // 지도가 그려질 div를 참조할 ref
  const kakaoMapRef = useRef(null); // kakao.maps.Map 인스턴스를 저장

  // 1) map 생성 및 center/zoom 변경을 한 곳에서 처리
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

  // 2) markers 배열이 바뀔 때마다 “이전 마커 제거 → 새로 그리기”
  useEffect(() => {
    const map = kakaoMapRef.current;
    if (!map) return;

    // (2-1) 이전에 찍어 둔 마커들 전부 제거
    if (map._markerList) {
      map._markerList.forEach((m) => m.setMap(null));
    }
    map._markerList = [];

    // (2-2) markers 배열을 순회하며 마커 생성
    markers.forEach((m) => {
      // 2-2-1) 안전 점수에 따라 다른 마커 이미지를 설정합니다.
      let markerImageSrc;
      switch (m.safety) {
        case "매우 우수":
          markerImageSrc = icon; // 예시: 매우 우수
          break;
        case "우수":
          markerImageSrc = icon; // 예시: 우수
          break;
        case "보통":
          markerImageSrc = icon; // 예시: 보통
          break;
        default:
          markerImageSrc = icon; // 기본값
          break;
      }

      const imageSize = new kakao.maps.Size(40, 45); // 마커 이미지 크기
      const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize);

      // 2-2-2) 좌표 객체 생성
      const position = new kakao.maps.LatLng(m.lat, m.lng);
      // 2-2-3) 마커 생성 및 지도에 붙이기
      const marker = new kakao.maps.Marker({ position, image: markerImage });
      marker.setMap(map);

      // 2-2-4) 인포윈도우(팝업) 내용 구성
      const infoContent = `
        <div class="bg-white p-4 rounded-lg shadow-md max-w-xs">
          <strong class="text-lg font-bold block mb-1 text-gray-800">${m.name}</strong>
          <ul class="text-sm text-gray-600 space-y-1">
            <li><span class="font-semibold text-blue-500">월세:</span> ${m.rent}</li>
            <li><span class="font-semibold text-blue-500">교통:</span> ${m.transport}</li>
            <li><span class="font-semibold text-blue-500">치안:</span> ${m.safety}</li>
          </ul>
          <p class="mt-2 text-xs text-gray-500 line-clamp-2">${m.description}</p>
        </div>`;

      const infowindow = new kakao.maps.InfoWindow({
        content: infoContent,
        removable: true,
      });

      // 마커 클릭 시 인포윈도우 표시
      kakao.maps.event.addListener(marker, "click", () => {
        // 모든 인포윈도우 닫기
        map._markerList.forEach((m) => m._infowindow.close());
        infowindow.open(map, marker);
        console.log("Clicked marker:", m); // 콘솔에 마커 정보 출력
      });

      // 마커 객체에 인포윈도우 저장
      marker._infowindow = infowindow;

      // 2-2-5) map._markerList에 marker 저장 (나중에 지우기 위해)
      map._markerList.push(marker);
    });
  }, [markers]);

  return (
    <div
      ref={mapContainerRef}
      className="w-[100%] h-[700px] rounded-lg overflow-hidden"
    />
  );
};

export default MapView;
