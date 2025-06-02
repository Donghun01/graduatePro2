// src/components/MapSection.jsx
import React from "react";
import MapView from "./MapView";

const MapSection = ({ center, zoom, markers }) => {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg">
      <MapView center={center} zoom={zoom} markers={markers} />
    </div>
  );
};

export default MapSection;
