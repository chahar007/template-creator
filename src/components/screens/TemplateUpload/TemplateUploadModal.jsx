import React, { useState } from "react";
import styles from "./TemplateUpload.module.scss"; // Import SCSS module
import apiService from "../../../config/services/ApiService";
import { toast } from "react-toastify";
import Loader from "../../shared/components/Loader/Loader";

const TemplateUploadModal = ({ toggleModal, categories }) => {
  const [file, setFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!selectedCategory) {
      toast.error("Please select a category!", { autoClose: 1000 });
      return;
    }

    if (!file) {
      toast.error("Please select an image!", { autoClose: 1000 });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", selectedCategory);

    try {
      let response = await apiService.imageUpload(formData);

      if (response) {
        let payload = {
          categoryId: selectedCategory,
          imageUrl: response.url,
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
          </div>
        </div>
      </div>
      <Loader isLoading={isLoading} message="Uploading data..." />
    </div>
  );
};

export default TemplateUploadModal;
