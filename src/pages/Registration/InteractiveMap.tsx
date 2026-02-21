import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet default icon issue
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface InteractiveMapProps {
  position: L.LatLngExpression;
  setPosition: (pos: L.LatLngExpression) => void;
  onPositionChange?: (latlng: L.LatLng) => void;
}

const MapUpdater = ({ center }: { center: L.LatLngExpression }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const DraggableMarker = ({ position, setPosition, onPositionChange }: any) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      if (onPositionChange) onPositionChange(e.latlng);
    },
  });

  return (
    <Marker
      draggable={true}
      position={position}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          if (marker != null) {
            const newPos = marker.getLatLng();
            setPosition(newPos);
            if (onPositionChange) onPositionChange(newPos);
          }
        },
      }}
    />
  );
};

const InteractiveMap = ({
  position,
  setPosition,
  onPositionChange,
}: InteractiveMapProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "350px", md: "450px" },
        bgcolor: "#f0f0f0",
        borderRadius: "12px",
        mb: 3,
        position: "relative",
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        "& .leaflet-container": {
          width: "100%",
          height: "100%",
          zIndex: 1,
        },
      }}
    >
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater center={position} />
        <DraggableMarker
          position={position}
          setPosition={setPosition}
          onPositionChange={onPositionChange}
        />
      </MapContainer>
    </Box>
  );
};

export default InteractiveMap;
