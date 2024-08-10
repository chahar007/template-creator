import React, { useState, useEffect } from "react";
import CategoryModal from "./CategoryModal";
import styles from "./Category.module.scss"; // Import SCSS module
import apiService from "../../../config/services/ApiService";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      let catData = await apiService.getCategoryData();
      setCategories(catData?.results || []);
    } catch {
      console.log("Error fetching categories");
    }
  };

  const toggleModal = (val) => {
    if (val) {
      fetchCategories();
    }
    setShowModal(!showModal);
  };

  const editCategory = (id) => {
    setShowModal(true);
    setEditData(id);
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
            <tr key={category.id}>
              <td scope="row">{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button
                  className="btn btn-secondary btn-sm mx-2"
                  onClick={() => editCategory(category)}
                >
                  Edit
                </button>
                {/* <button className="btn btn-danger btn-sm mx-2">Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <CategoryModal toggleModal={toggleModal} editDetails={editData} />
      )}
    </div>
  );
};

export default Category;
