import React, { useState } from "react";
import axios from "axios";
import styles from "./TemplateUpload.module.scss"; // Import SCSS module

const TemplateUploadModal = ({ toggleModal }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post("YOUR_UPLOAD_TEMPLATE_API_ENDPOINT", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("File uploaded successfully", response.data);
          toggleModal();
        })
        .catch((error) => {
          console.error("There was an error uploading the file!", error);
        });
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
                  className={`btn btn-secondary ${styles.btnSecondary}`}
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
