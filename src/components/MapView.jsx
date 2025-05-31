// src/components/MapView.jsx
import React, { useEffect, useRef } from "react";

const { kakao } = window; // 전역에 로드된 kakao 네임스페이스를 가져옵니다.

const MapView = ({
  center = [37.5665, 126.978], // [lat, lng]
  zoom = 4, // 카카오 지도 레벨 (1~14, 숫자가 작을수록 확대)
  markers = [], // [{ name, lat, lng, rent, transport, safety, description }, …]
}) => {
  const mapContainerRef = useRef(null); // 지도가 그려질 div
  const kakaoMapRef = useRef(null); // kakao.maps.Map 인스턴스를 저장

  // 1) 최초 마운트 시: Kakao SDK 로드 후 지도 생성
  useEffect(() => {
    // kakao.maps.load 을 사용하면, SDK가 완전히 로드된 뒤 콜백이 호출됩니다.
    kakao.maps.load(() => {
      if (!mapContainerRef.current) return;
      if (!kakaoMapRef.current) {
        const options = {
          center: new kakao.maps.LatLng(center[0], center[1]),
          level: zoom,
        };
        kakaoMapRef.current = new kakao.maps.Map(
          mapContainerRef.current,
          options
        );
      }
    });
  }, []); // 빈 배열 → 컴포넌트 마운트 시 1회만 실행

  // 2) center 또는 zoom이 변경되면 지도 업데이트
  useEffect(() => {
    const map = kakaoMapRef.current;
    if (!map) return;

    // 새로운 중심 좌표와 레벨로 설정
    const newCenter = new kakao.maps.LatLng(center[0], center[1]);
    map.setCenter(newCenter);
    map.setLevel(zoom);
  }, [center, zoom]);

  // 3) markers 배열이 바뀔 때마다 “기존 마커 제거 → 새로 그리기”
  useEffect(() => {
    const map = kakaoMapRef.current;
    if (!map) return;

    // (3-1) 이전에 찍어둔 마커들 전부 제거
    if (map._markerList) {
      map._markerList.forEach((m) => m.setMap(null));
    }
    map._markerList = [];

    // (3-2) markers 프로퍼티를 순회하며 마커 생성
    markers.forEach((m) => {
      // 3-2-1) 좌표 객체 생성
      const position = new kakao.maps.LatLng(m.lat, m.lng);

      // 3-2-2) 마커 생성 및 지도의 해당 위치에 붙이기
      const marker = new kakao.maps.Marker({ position });
      marker.setMap(map);

      // 3-2-3) 인포윈도우(팝업) 내용: name·rent·transport·safety·description 포함
      //            description 필드가 있을 경우, 팝업 하단에 추가로 보여주도록 했습니다.
      let infoContent = `
        <div style="padding:10px; min-width:180px; line-height:1.5;">
          <strong style="font-size:1.1em; margin-bottom:6px;">${m.name}</strong><br/>
          평균 월세: ${m.rent}<br/>
          교통: ${m.transport}<br/>
          치안: ${m.safety}
      `;

      if (m.description) {
        infoContent += `<div style="margin-top:8px; font-size:0.9em; color:#555;">
          ${m.description}
        </div>`;
      }

      infoContent += `</div>`;

      const infowindow = new kakao.maps.InfoWindow({
        content: infoContent,
      });

      // 3-2-4) 마커 클릭 시 인포윈도우 열기
      kakao.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });

      // 3-2-5) map._markerList에 지금 만든 marker를 저장 (나중에 지우기 위해)
      map._markerList.push(marker);
    });
  }, [markers]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "600px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    />
  );
};

export default MapView;
