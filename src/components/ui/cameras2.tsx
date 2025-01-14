import { useState } from "react";

interface Camera {
  id: number;
  content: string;
  color: string;
  image: string;
}

export default function Cameras() {
  const cameras: Camera[] = [
    { id: 1, content: "Camera 1", color: "red", image: "/cat1.avif" },
    { id: 2, content: "Camera 2", color: "blue", image: "/cat2.jpg" },
    { id: 3, content: "Camera 3", color: "green", image: "/cat3.avif" },
    { id: 4, content: "Camera 4", color: "yellow", image: "/cat4.jpg" },
    { id: 5, content: "Camera 5", color: "purple", image: "/cat5.avif" },
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
              position: "relative",
              width: "200px", //120
              height: "80px", //50
              backgroundColor: cam.color,
              color: "white",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={cam.image}
              alt={cam.content}
              style={{
                width:"100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
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
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      </div>
    </div>
  );
}
