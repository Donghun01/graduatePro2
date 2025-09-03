import React from "react";
import MapView from "./MapView";

const MapSection = ({
  center,
  zoom,
  markers,
  userAddressMarker,
  onMarkerClick,
}) => {
  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-lg">
      <MapView
        center={center}
        zoom={zoom}
        markers={markers}
        userAddressMarker={userAddressMarker}
        onMarkerClick={onMarkerClick}
      />
    </div>
  );
};

export default MapSection;
