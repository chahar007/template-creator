import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";

const TemplateGenerate = ({ tempData, onImageGenerated }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      generateImage();
    }
    console.log({ tempData });
  }, [tempData]);

  const generateImage = () => {
    html2canvas(canvasRef.current, { useCORS: true, scale: 2 }).then(
      (canvas) => {
        const base64Image = canvas.toDataURL("image/png");
        if (onImageGenerated) {
          onImageGenerated(base64Image);
        }
      }
    );
  };

  return (
    <div
      ref={canvasRef}
      style={{
        width: 350,
        height: 350,
        position: "relative",
        display: "inline-block",
      }}
    >
      {tempData.image && (
        <img
          src={tempData.image}
          alt="Preview"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {tempData.textInput && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#000", // Adjust text color as needed
            textAlign: "center",
          }}
        >
          {tempData.textInput}
        </div>
      )}
      {tempData.authorText && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            color: "#000", // Adjust text color as needed
            fontSize: "0.9em",
          }}
        >
          {tempData.authorText}
        </div>
      )}
    </div>
  );
};

export default TemplateGenerate;
