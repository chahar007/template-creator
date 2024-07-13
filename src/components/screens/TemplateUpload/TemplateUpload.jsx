import React, { useState, useEffect } from "react";
import TemplateUploadModal from "./TemplateUploadModal"; // Import TemplateUpload
import styles from "./TemplateUpload.module.scss"; // Import SCSS module
import { QUOTES } from "../../../assets/constants/app.constant";

const TemplateUpload = () => {
  const [categories, setCategories] = useState(QUOTES);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Example code for fetching categories from an API
    // axios
    //   .get("YOUR_GET_API_ENDPOINT")
    //   .then((response) => {
    //     setCategories(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("There was an error fetching the categories!", error);
    //   });
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={`${styles.categoryContainer}`}>
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">Categories</h2>
        <button className="btn btn-primary mb-3" onClick={toggleModal}>
          Upload Template
        </button>
      </div>
      <table className={`table table-striped ${styles.categoryTable}`}>
        <thead>
          <tr key={"head"}>
            <th scope="col">S.No</th>
            <th scope="col">Category</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td scope="row">{index + 1}</td>
              <td>{category.category}</td>
              <td>{category.title}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-2">Edit</button>
                <button className="btn btn-danger btn-sm mx-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <TemplateUploadModal toggleModal={toggleModal} />}
    </div>
  );
};

export default TemplateUpload;
