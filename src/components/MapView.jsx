// src/components/MapView.jsx
import React, { useEffect, useRef } from "react";

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
      // (1-1) 맵이 아직 생성되지 않았다면 → 생성
      if (!kakaoMapRef.current) {
        kakaoMapRef.current = new kakao.maps.Map(mapContainerRef.current, {
          center: new kakao.maps.LatLng(center[0], center[1]),
          level: zoom,
        });
      } else {
        // (1-2) 이미 맵이 생성돼 있다면 → center와 zoom을 갱신
        const map = kakaoMapRef.current;
        const newCenter = new kakao.maps.LatLng(center[0], center[1]);
        map.setCenter(newCenter);
        map.setLevel(zoom);
      }
    });
  }, [center, zoom]); // center 또는 zoom이 변경될 때마다 실행

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
      // 2-2-1) 좌표 객체 생성
      const position = new kakao.maps.LatLng(m.lat, m.lng);
      // 2-2-2) 마커 생성 및 지도에 붙이기
      const marker = new kakao.maps.Marker({ position });
      marker.setMap(map);

      // 2-2-3) 인포윈도우(팝업) 내용 구성
      let infoContent = `
        <div style="padding:10px; min-width:180px; line-height:1.5;">
          <strong style="font-size:1.1em; margin-bottom:6px;">${m.name}</strong><br/>
          평균 월세: ${m.rent}<br/>
          교통: ${m.transport}<br/>
          치안: ${m.safety}
      `;
      if (m.description) {
        infoContent += `
          <div style="margin-top:8px; font-size:0.9em; color:#555;">
            ${m.description}
          </div>`;
      }
      infoContent += `</div>`;

      const infowindow = new kakao.maps.InfoWindow({ content: infoContent });
      kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });

      // 2-2-4) map._markerList에 marker 저장 (나중에 지우기 위해)
      map._markerList.push(marker);
    });
  }, [markers]);

  return (
    <div
      ref={mapContainerRef}
      className="w-[90%] h-[700px] rounded-lg overflow-hidden"
    />
  );
};

export default MapView;
