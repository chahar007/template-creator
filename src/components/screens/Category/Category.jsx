import React, { useState, useEffect } from "react";
import CategoryModal from "./CategoryModal";
import styles from "./Category.module.scss"; // Import SCSS module
import apiService from "../../../config/services/ApiService";
import Loader from "../../shared/components/Loader/Loader";
import CustomPagination from "../../shared/components/CustomPagination"; // Import CustomPagination

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // State for total pages

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const fetchCategories = async (page) => {
    setIsLoading(true);
    try {
      let catData = await apiService.getCategoryData({ page });
      setCategories(catData.results || []);
      setTotalPages(catData.totalPages || 1); // Set total pages from API response
    } catch {
      console.log("Error fetching categories");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = (val) => {
    if (val) {
      fetchCategories(currentPage);
    }
    setShowModal(!showModal);
  };

  const editCategory = (category) => {
    setEditData(category);
    setShowModal(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page
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
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category.id}>
              <td scope="row">{index + 1}</td>
              <td>{category.name}</td>
              <td>{category.email}</td>
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

      <Loader isLoading={isLoading} message="Fetching data..." />

      {/* Add Pagination Component */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Category;
