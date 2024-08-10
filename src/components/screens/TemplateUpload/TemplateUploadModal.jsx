import React, { useState } from "react";
import styles from "./TemplateUpload.module.scss"; // Import SCSS module
import apiService from "../../../config/services/ApiService";
import { toast } from "react-toastify";

const TemplateUploadModal = ({ toggleModal }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Validate file
    if (!file) {
      toast.error("Please select image!!!", { autoClose: 1000 });
      return;
    }

    if (hasError) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      let response = await apiService.templateImageUpload(formData);

      toast.success("Image Updated!!!");

      console.log("resposne", response);
    } catch {
      toast.error("Something went wrong please try again!!!");
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
    </div>
  );
};

export default TemplateUploadModal;
