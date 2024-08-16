import React, { useState } from "react";
import styles from "./TemplateUpload.module.scss";
import apiService from "../../../config/services/ApiService";
import { toast } from "react-toastify";
import Loader from "../../shared/components/Loader/Loader";
import { FONT_FAMILIES } from "../../../assets/constants/app.constant";

const TemplateUploadModal = ({ toggleModal, categories }) => {
  const [file, setFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default black
  const [selectedFont, setSelectedFont] = useState(FONT_FAMILIES.arial);
  const [selectedFontWeight, setSelectedFontWeight] = useState("normal");
  const [isLoading, setIsLoading] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleFontChange = (e) => {
    setSelectedFont(FONT_FAMILIES[e.target.value]);
  };

  const handleFontWeightChange = (e) => {
    setSelectedFontWeight(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!selectedCategory) {
      toast.error("Please select a category!", { autoClose: 1000 });
      setIsLoading(false);
      return;
    }

    if (!file) {
      toast.error("Please select an image!", { autoClose: 1000 });
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", selectedCategory);
    formData.append("color", selectedColor);
    formData.append("font", selectedFont);
    formData.append("fontWeight", selectedFontWeight);

    try {
      let response = await apiService.imageUpload(formData);

      if (response) {
        let payload = {
          categoryId: selectedCategory,
          imageUrl: response.url,
          color: selectedColor,
          font: selectedFont,
          fontWeight: selectedFontWeight,
        };
        let templateRes = await apiService.templateUpload(payload);
        toast.success("Image Uploaded Successfully!");
      }
    } catch {
      toast.error("Something went wrong, please try again!");
    } finally {
      toggleModal(true);
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`modal modal-lg d-flex show ${styles.modalBg}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className={`modal-dialog ${styles.modalDialog}`} role="document">
        <div className={`modal-content ${styles.modalContent}`}>
          <div className={`modal-header ${styles.modalHeader}`}>
            <h5 className={`modal-title ${styles.modalTitle}`}>
              Upload Template Image
            </h5>
            <button
              type="button"
              className={`close ${styles.modalClose}`}
              onClick={toggleModal}
            >
              <span>&times;</span>
            </button>
          </div>
          <div className={`modal-body ${styles.modalBody}`}>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="categorySelect" className={styles.label}>
                      Select Category:
                    </label>
                    <select
                      id="categorySelect"
                      className={`form-control mt-2 ${styles.input}`}
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="templateFile" className={styles.label}>
                      Choose Image File:
                    </label>
                    <input
                      type="file"
                      className={`form-control-file mt-2 ${styles.input}`}
                      id="templateFile"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="colorPicker" className={styles.label}>
                      Select Color:
                    </label>
                    <input
                      type="color"
                      className={`form-control mt-2 ${styles.input}`}
                      id="colorPicker"
                      value={selectedColor}
                      onChange={handleColorChange}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="fontSelect" className={styles.label}>
                      Select Font Family:
                    </label>
                    <select
                      id="fontSelect"
                      className={`form-control mt-2 ${styles.input}`}
                      value={Object.keys(FONT_FAMILIES).find(
                        (key) => FONT_FAMILIES[key] === selectedFont
                      )}
                      onChange={handleFontChange}
                    >
                      {Object.keys(FONT_FAMILIES).map((fontKey) => (
                        <option key={fontKey} value={fontKey}>
                          {fontKey.charAt(0).toUpperCase() + fontKey.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className={`form-group ${styles.formGroup}`}>
                    <label htmlFor="fontWeightSelect" className={styles.label}>
                      Select Font Weight:
                    </label>
                    <select
                      id="fontWeightSelect"
                      className={`form-control mt-2 ${styles.input}`}
                      value={selectedFontWeight}
                      onChange={handleFontWeightChange}
                    >
                      <option value="lighter">Lighter</option>
                      <option value="normal">Normal</option>
                      <option value="bold">Bold</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className={`text-center ${styles.modalFooter}`}>
                <button
                  type="button"
                  className={`btn btn-secondary mx-2 ${styles.btnSecondary}`}
                  onClick={toggleModal}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${styles.btnPrimary}`}
                >
                  Upload
                </button>
              </div>
            </form>
            <div className={`mt-4 ${styles.preview}`}>
              <h5>Preview:</h5>
              {previewSrc && (
                <div
                  className={styles.templatePreview}
                  style={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "56.25%", // Aspect ratio (16:9)
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={previewSrc}
                    alt="Template Preview"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // Adjust image to contain within the area
                      objectPosition: "center", // Center the image within the area
                    }}
                  />
                  <p
                    style={{
                      color: selectedColor,
                      fontFamily: selectedFont,
                      fontWeight: selectedFontWeight,
                      position: "relative",
                      zIndex: 1,
                      width: 200,
                      textAlign: "center",
                    }}
                  >
                    Today's actions shape tomorrow's reality.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Loader isLoading={isLoading} message="Uploading data..." />
    </div>
  );
};

export default TemplateUploadModal;
