import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const createCustomIcon = (rotationAngle: number) =>
  L.divIcon({
    html: `<img src="https://www.freeiconspng.com/uploads/green-arrow-up-icon-13.png" style="transform: rotate(${rotationAngle}deg); width: 20px; height: 20px;" />`,
    className: "rover-icon",
    iconSize: [60, 60],
    iconAnchor: [10, 110],
  });

const CenterMap: React.FC<{ position: [number, number] }> = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom()); // Center map position
  }, [map, position]);
  return null;
};

// Position stuff (for Conner)
const Map: React.FC = () => {
  const [roverPosition, setRoverPosition] = useState<[number, number]>([
    32.993601, -96.75333,
  ]);

  //roration angle contant
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  //trail
  const [trail, setTrail] = useState<[number, number][]>([]);

  useEffect(() => {
    setTrail((prevTrail) => [
      ...prevTrail,
      [roverPosition[0] + 0.00045, roverPosition[1]],
    ]);
  }, [roverPosition]);

  //delete oldest point after a certain amount of time

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prevTrail) => {
        if (prevTrail.length > 0) {
          return prevTrail.slice(1);
        }
        return prevTrail;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const keysPressed = new Set<string>();

    const handleKeyDown = (event: KeyboardEvent) => {
      keysPressed.add(event.key);

      setRoverPosition((prevPosition) => {
        const movement = 0.00001; // Movement step size
        const newPosition = [...prevPosition];

        if (keysPressed.has("ArrowUp") && keysPressed.has("ArrowRight")) {
          setRotationAngle(45); // Up-Right
          newPosition[0] += movement; // Move up
          newPosition[1] += movement; // Move right
        } else if (keysPressed.has("ArrowUp") && keysPressed.has("ArrowLeft")) {
          setRotationAngle(315); // Up-Left
          newPosition[0] += movement; // Move up
          newPosition[1] -= movement; // Move left
        } else if (
          keysPressed.has("ArrowDown") &&
          keysPressed.has("ArrowRight")
        ) {
          setRotationAngle(135); // Down-Right
          newPosition[0] -= movement; // Move down
          newPosition[1] += movement; // Move right
        } else if (
          keysPressed.has("ArrowDown") &&
          keysPressed.has("ArrowLeft")
        ) {
          setRotationAngle(225); // Down-Left
          newPosition[0] -= movement; // Move down
          newPosition[1] -= movement; // Move left
        } else if (keysPressed.has("ArrowUp")) {
          setRotationAngle(0); // Up
          newPosition[0] += movement; // Move up
        } else if (keysPressed.has("ArrowDown")) {
          setRotationAngle(180); // Down
          newPosition[0] -= movement; // Move down
        } else if (keysPressed.has("ArrowLeft")) {
          setRotationAngle(270); // Left
          newPosition[1] -= movement; // Move left
        } else if (keysPressed.has("ArrowRight")) {
          setRotationAngle(90); // Right
          newPosition[1] += movement; // Move right
        }

        return newPosition as [number, number];
      });
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      keysPressed.delete(event.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={roverPosition}
        zoom={19} // Zoom level
        style={{ height: "400px", width: "100%", backgroundColor: "#171717" }} // Map size
        scrollWheelZoom={false}
        dragging={false}
        worldCopyJump={false}
        zoomControl={false}
        keyboard={false}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Polyline positions={trail} color="green" weight={3} opacity={0.8} />
        <Marker
          position={roverPosition}
          icon={createCustomIcon(rotationAngle)}
        />
        <CenterMap position={roverPosition} />
      </MapContainer>
    </div>
  );
};

export default Map;
