import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setUploadedImage } from "../../../config/redux/actions/ImageAction";
import html2canvas from "html2canvas";
import styles from "./TemplateCreate.module.scss"; // Import SCSS module

const TemplateCreator = () => {
  const [textInput, setTextInput] = useState(
    "You can get everything in life you want if you will just help enough other people get what they want."
  );
  const [authorInput, setAuthorInput] = useState("--Lev Tolstoy");
  const [imageSrc, setImageSrc] = useState("");
  const [textColor, setTextColor] = useState("#FFFFFF"); // Default text color
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const canvasRef = useRef(null);
  const dispatch = useDispatch();

  // Regular function to handle immediate text input changes
  const handleTextChange = (e) => {
    const { value } = e.target;
    setTextInput(value);
    drawCanvasDebounced(value, authorInput); // Update canvas with debounced value
  };

  const handleAuthorChange = (e) => {
    const { value } = e.target;
    setAuthorInput(value);
    drawCanvasDebounced(textInput, value); // Update canvas with debounced value
  };

  const handleColorChange = (e) => {
    const { value } = e.target;
    setTextColor(value);
    drawCanvasDebounced(textInput, authorInput); // Update canvas with debounced value
  };

  // Debounced function to handle canvas drawing based on text input
  const drawCanvasDebounced = debounce((quote, author) => {
    drawCanvas(quote, author); // Draw canvas with the debounced value
  }, 300); // Adjust debounce delay as needed (e.g., 300ms)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        drawCanvasDebounced(textInput, authorInput); // Update canvas with current text input
      };
      reader.readAsDataURL(file);
    }
  };

  const drawCanvas = (quote, author) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    html2canvas(canvasRef.current).then((canvas) => {
      const base64 = canvas.toDataURL("image/png");
      dispatch(setUploadedImage({ uploadedImage: base64 }));
      setCanvasLoaded(true);
    });
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    html2canvas(canvas).then((canvas) => {
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "template.png";
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  return (
    <Container className={styles["template-creator-container"]}>
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
              <Form.Label>Enter Quote:</Form.Label>
              <Form.Control
                type="text"
                value={textInput}
                onChange={handleTextChange}
                className={styles["input-field"]}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Enter Author:</Form.Label>
              <Form.Control
                type="text"
                value={authorInput}
                onChange={handleAuthorChange}
                className={styles["input-field"]}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Select Text Color:</Form.Label>
              <Form.Control
                type="color"
                value={textColor}
                onChange={handleColorChange}
                className={styles["color-picker"]}
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
          <h2 className={styles["preview-heading"]}>Preview</h2>
          <div className={styles["preview-container"]}>
            <div
              ref={canvasRef}
              className="d-inline-block"
              style={{ width: 350, height: 350, position: "relative" }}
            >
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
              {textInput && (
                <div
                  className={styles["quote-text"]}
                  style={{ color: textColor }}
                >
                  {textInput}
                </div>
              )}
              {authorInput && (
                <div
                  className={styles["author-text"]}
                  style={{ color: textColor }}
                >
                  {authorInput}
                </div>
              )}
            </div>
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
