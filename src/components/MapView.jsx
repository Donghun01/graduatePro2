// src/components/MapView.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapView = ({ center = [37.5665, 126.978], zoom = 12, markers = [] }) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: "100%", height: "600px", borderRadius: "8px" }}
    >
      {/* OpenStreetMap 타일 레이어 */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 동네별 마커들 */}
      {markers.map((m, i) => (
        <Marker key={i} position={[m.lat, m.lng]}>
          <Popup>
            <strong>{m.name}</strong>
            <br />
            평균 월세: {m.rent}원<br />
            교통: {m.transport}
            <br />
            치안: {m.safety}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
