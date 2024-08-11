import React, { useState } from "react";
import axios from "axios";
import styles from "./Quotes.module.scss"; // Import SCSS module
import apiService from "../../../config/services/ApiService";
import { toast } from "react-toastify";

const QuoteModal = ({ toggleModal, editData }) => {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileError(""); // Reset file error when file is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Validate file
    if (!file) {
      setFileError("File is required.");
      hasError = true;
    }

    if (hasError) return;

    const formData = new FormData();
    formData.append("file", file);
    // formData.append("category", selectedCategory);

    try {
      let response = await apiService.quoteUploads(formData);

      toast.success("Quotes Updated!!!");

      console.log("resposne", response);

      toggleModal(true);
    } catch {
      toast.error("Something went wrong please try again!!!");
    }
  };

  return (
    <div
      className={`modal show d-block ${styles.modalBg}`}
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
                />
                {fileError && (
                  <div className={styles.errorText}>{fileError}</div>
                )}
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
                disabled={!file} // Disable submit button if category or file is missing
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
