import React, { useState } from "react";
import axios from "axios";
import styles from "./Quotes.module.scss"; // Import SCSS module

const QuoteModal = ({ toggleModal }) => {
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
        .post("YOUR_UPLOAD_QUOTES_API_ENDPOINT", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("File uploaded successfully", response.data);
          toggleModal();
          // Assuming you have a way to update quotes without full page reload
        })
        .catch((error) => {
          console.error("There was an error uploading the file!", error);
        });
    }
  };

  return (
    <div
      className={`modal show d-block  ${styles.modalBg}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className={`modal-dialog ${styles.modalDialog}`} role="document">
        <div className={`modal-content ${styles.modalContent}`}>
          <div className={`modal-header ${styles.modalHeader}`}>
            <h5 className={`modal-title ${styles.modalTitle}`}>
              Upload CSV File
            </h5>
            <button
              type="button"
              className={`close ${styles.modalClose}`}
              onClick={toggleModal}
            >
              <span>&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={`modal-body ${styles.modalBody}`}>
              <div className={`form-group ${styles.formGroup}`}>
                <label htmlFor="csvFile" className={styles.label}>
                  Choose CSV File:
                </label>
                <input
                  type="file"
                  className={`form-control-file ${styles.input}`}
                  id="csvFile"
                  onChange={handleFileChange}
                  accept=".csv"
                  required
                />
              </div>
            </div>
            <div className={`modal-footer ${styles.modalFooter}`}>
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
  );
};

export default QuoteModal;
