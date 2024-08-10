import React, { useState } from "react";
import axios from "axios";
import styles from "./Category.module.scss"; // Import SCSS module
import apiService from "../../../config/services/ApiService";
import { useEffect } from "react";
import { toast } from "react-toastify";

const CategoryModal = ({ toggleModal, editDetails }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    let payload = {
      name: title,
    };
    try {
      if (!editDetails.id) {
        let response = await apiService.postCategoryData(payload);
        console.log(response);
        toast.success("Category Added!!!");
      } else {
        let response = await apiService.updateCategoryData(
          editDetails.id,
          payload
        );
        toast.success("Category Updated!!!");
        console.log(response);
      }
      toggleModal(true);
    } catch {
      toast.error("Something went wrong please try again!!!");
    }
  };

  useEffect(() => {
    if (editDetails) {
      setTitle(editDetails.name);
    }
  }, [editDetails]);

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
            {/* <form onSubmit={handleSubmit}> */}
            <form>
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
                  type="button"
                  onClick={handleSubmit}
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
