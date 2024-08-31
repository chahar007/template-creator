import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "./Category.module.scss"; // Import SCSS module
import apiService from "../../../config/services/ApiService";

const CategoryModal = ({ toggleModal, editDetails }) => {
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    // Basic validation
    if (!email || !password || !title) {
      toast.error("All fields are required!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    let payload = {
      name: title,
      email,
      password,
    };

    try {
      let response;
      if (!editDetails.id) {
        response = await apiService.postCategoryData(payload);
        toast.success("Category Added!!!");
      } else {
        response = await apiService.updateCategoryData(editDetails.id, payload);
        toast.success("Category Updated!!!");
      }
      console.log(response);
      toggleModal(true);
    } catch {
      toast.error("Something went wrong, please try again!!!");
    }
  };

  useEffect(() => {
    if (editDetails) {
      setTitle(editDetails.name);
      setEmail(editDetails.email);
      setPassword(editDetails.password);
    }
  }, [editDetails]);

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
              {editDetails?.id ? "Edit Category" : "Add Category"}
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
              <div className={`form-group ${styles.formGroup}`}>
                <label htmlFor="categoryEmail" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  className={`form-control mt-2 ${styles.input}`}
                  id="categoryEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={`form-group ${styles.formGroup}`}>
                <label htmlFor="categoryPassword" className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control mt-2 ${styles.input}`}
                  id="categoryPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
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
