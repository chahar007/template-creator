import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import debounce from "lodash.debounce";

const TemplateCreator = () => {
  const [textInput, setTextInput] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const canvasRef = useRef(null);

  // Regular function to handle immediate text input changes
  const handleTextChange = (e) => {
    const { value } = e.target;
    setTextInput(value);
    drawCanvasDebounced(value); // Update canvas with debounced value
  };

  // Debounced function to handle canvas drawing based on text input
  const drawCanvasDebounced = debounce((value) => {
    drawCanvas(value); // Draw canvas with the debounced value
  }, 300); // Adjust debounce delay as needed (e.g., 300ms)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        drawCanvasDebounced(textInput); // Update canvas with current text input
      };
      reader.readAsDataURL(file);
    }
  };
  const drawCanvas = (textValue) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Clear previous content
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Load image onto canvas
    if (imageSrc) {
      const img = new Image();
      img.onload = () => {
        // Calculate dimensions to fit within the canvas while preserving aspect ratio
        let canvasWidth = canvas.width;
        let canvasHeight = canvas.height;
        let imageWidth = img.width;
        let imageHeight = img.height;

        // Scale the image to fit within the canvas
        if (imageWidth > canvasWidth || imageHeight > canvasHeight) {
          const scaleFactor = Math.min(
            canvasWidth / imageWidth,
            canvasHeight / imageHeight
          );
          imageWidth *= scaleFactor;
          imageHeight *= scaleFactor;
        }

        // Calculate position to center the image on the canvas
        const x = (canvasWidth - imageWidth) / 2;
        const y = (canvasHeight - imageHeight) / 2;

        // Draw the image on the canvas
        ctx.drawImage(img, x, y, imageWidth, imageHeight);

        // Wrap text function
        const wrapText = (context, text, maxWidth, lineHeight) => {
          let words = text.split(" ");
          let line = "";
          let lines = [];

          for (let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + " ";
            let metrics = context.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
              lines.push(line);
              line = words[n] + " ";
            } else {
              line = testLine;
            }
          }
          lines.push(line);

          // Calculate text position to center it on the canvas
          let textX = canvasWidth / 2;
          let textY = canvasHeight / 2 - ((lines.length - 1) * lineHeight) / 2;

          context.textAlign = "center";
          context.fillStyle = "white";
          context.font = "bold 18px Arial";
          lines.forEach((line, index) => {
            context.fillText(line.trim(), textX, textY + index * lineHeight);
          });
        };

        // Call wrapText to draw wrapped text
        const maxWidth = canvasWidth * 0.8; // 80% of canvas width
        const lineHeight = 36; // Adjust as needed
        wrapText(ctx, textValue, maxWidth, lineHeight);

        setCanvasLoaded(true);
      };

      // Set image src after defining onload function
      img.src = imageSrc;
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert canvas to image and download
    const dataURL = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");
    link.download = "template.jpg";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <h2 className="text-center mb-4">Template Creator</h2>
          <Form>
            <Form.Group>
              <Form.Label>Upload Image:</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter Text:</Form.Label>
              <Form.Control
                type="text"
                value={textInput}
                onChange={handleTextChange}
              />
            </Form.Group>
          </Form>
          <div className="text-center mt-4">
            <Button
              variant="primary"
              onClick={handleDownload}
              disabled={!canvasLoaded}
            >
              Download Template
            </Button>
          </div>
        </Col>
        <Col md={6} className="text-center">
          <h2 className="mb-4">Preview</h2>
          <div className="position-relative d-inline-block">
            <canvas
              ref={canvasRef}
              className="img-fluid"
              width="400"
              height="400"
            />
            {!imageSrc && (
              <p className="text-muted">Upload an image to see the preview</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TemplateCreator;
