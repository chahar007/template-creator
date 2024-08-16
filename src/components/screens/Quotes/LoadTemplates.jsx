import React, { useState } from "react";
import html2canvas from "html2canvas";
import styles from "./Quotes.module.scss"; // Importing the SCSS module

const ImagePreviewModal = ({ data, images, closePreview }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageSelect = (id) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((imageId) => imageId !== id)
        : [...prevSelected, id]
    );
  };

  const handleUpload = async () => {
    for (const imageId of selectedImages) {
      const imageElement = document.getElementById(`image-${imageId}`);
      if (imageElement) {
        const canvas = await html2canvas(imageElement);
        const dataUrl = canvas.toDataURL("image/png");
        // Perform the upload to the server with the dataUrl
        // Example: uploadImage(dataUrl);
      }
    }

    closePreview();
  };

  return (
    <div
      className={`modal show d-block ${styles.modalBg}`}
      id="imagePreviewModal"
      tabIndex="-1"
      aria-labelledby="imagePreviewModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="imagePreviewModalLabel">
              {data.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closePreview}
            ></button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column align-items-center">
              {images.map((image) => (
                <div
                  id={`image-${image.id}`}
                  className={`${styles.imageContainer} mb-4 ${
                    selectedImages.includes(image.id) ? styles.selected : ""
                  }`}
                  key={image.id}
                  onClick={() => handleImageSelect(image.id)}
                >
                  <img
                    src={image.imageUrl}
                    className="img-fluid"
                    alt={data.title}
                  />
                  <div className={styles.caption}>{data.caption}</div>
                  <div className={styles.quoteBy}>{data.quote_by}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpload}
              disabled={selectedImages.length === 0}
            >
              Upload Selected Images
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
