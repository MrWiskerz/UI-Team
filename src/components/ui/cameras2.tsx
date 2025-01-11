import { useState } from "react";

interface Camera {
  id: number;
  content: string;
  color: string;
  image: string;
}

export default function Cameras() {
  const cameras: Camera[] = [
    { id: 1, content: "Camera 1", color: "red", image: "/camera1.jpg" },
    { id: 2, content: "Camera 2", color: "blue", image: "/camera2.jpg" },
    { id: 3, content: "Camera 3", color: "green", image: "/camera3.jpg" },
    { id: 4, content: "Camera 4", color: "yellow", image: "/camera4.jpg" },
    { id: 5, content: "Camera 5", color: "purple", image: "/camera5.jpg" },
  ];

  const [selectedCamera, setSelectedCamera] = useState<Camera>(cameras[0]);

  return (
    <div className="container flex flex-col">
      {/* Camera Row */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          zIndex: 2,
        }}
      >
        {cameras.map((cam) => (
          <button
            key={cam.id}
            onClick={() => setSelectedCamera(cam)}
            style={{
              width: "120px",
              height: "50px",
              backgroundColor: cam.color,
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            {cam.content}
          </button>
        ))}
      </div>

      {/* Main Camera */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={selectedCamera.image}
          alt={selectedCamera.content}
          style={{
            width: "90%",
            height: "90%",
            objectFit: "contain",
            border: "5px solid white",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
}
