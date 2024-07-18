import React, { useState, useEffect } from "react";
import CategoryModal from "./CategoryModal";
import styles from "./Category.module.scss"; // Import SCSS module
import { CATEGORIES } from "../../../assets/constants/app.constant";
import apiService from "../../../config/services/ApiService";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    let catData = await apiService.getCategoryData();
    setCategories(catData?.data || []);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={`${styles.categoryContainer}`}>
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">Categories</h2>
        <button className="btn btn-primary mb-3" onClick={toggleModal}>
          Add Category
        </button>
      </div>
      <table className={`table table-striped ${styles.categoryTable}`}>
        <thead>
          <tr key={"head"}>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td scope="row">{index + 1}</td>
              <td>{category.name}</td>
              <td>
                <button className="btn btn-warning btn-sm mx-2">Edit</button>
                <button className="btn btn-danger btn-sm mx-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <CategoryModal toggleModal={toggleModal} />}
    </div>
  );
};

export default Category;
