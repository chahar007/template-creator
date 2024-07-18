import React, { useState } from "react";
import axios from "axios";
import styles from "./Category.module.scss"; // Import SCSS module
import apiService from "../../../config/services/ApiService";

const CategoryModal = ({ toggleModal }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    let payload = {
      name: title,
    };
    let response = await apiService.postCategoryData(payload);
    // if (response.status === 200) {
    toggleModal();
  };

  return (
    <div
      className={`modal modal-lg d-flex show ${styles.modalBg} `}
      tabIndex="-1"
      role="dialog"
    >
      <div className={`modal-dialog ${styles.modalDialog}`} role="document">
        <div className={`modal-content ${styles.modalContent}`}>
          <div className={`modal-header ${styles.modalHeader}`}>
            <h5 className={`modal-title ${styles.modalTitle}`}>Add Category</h5>
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
                <label htmlFor="categoryTitle" className={styles.label}>
                  Title
                </label>
                <input
                  type="text"
                  className={`form-control mt-2 ${styles.input}`}
                  id="categoryTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className={`text-center ${styles.modalFooter}`}>
                <button
                  type="submit"
                  className={`btn btn-primary mt-3 ${styles.btnPrimary}`}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
