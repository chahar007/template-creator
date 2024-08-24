import React, { useState, useEffect } from "react";
import TemplateUploadModal from "./TemplateUploadModal";
import styles from "./TemplateUpload.module.scss";
import apiService from "../../../config/services/ApiService";
import CustomPagination from "../../shared/components/CustomPagination"; // Import the pagination component

const TemplateUpload = () => {
  const [categories, setCategories] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state

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

  const fetchTemplates = async (categoryId, page = 1) => {
    try {
      let tempData = await apiService.getTemplates(categoryId, page);
      setTemplates(tempData?.results || []);
      setTotalPages(tempData?.totalPages || 1);
    } catch {
      console.log("Error fetching templates");
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    fetchTemplates(categoryId, 1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchTemplates(selectedCategory, page);
  };

  const toggleModal = (arg) => {
    if (arg) {
      fetchTemplates(selectedCategory);
    }
    setShowModal(!showModal);
  };

  return (
    <div className={`${styles.categoryContainer}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Templates</h2>
        <div className="d-flex align-items-center gap-2">
          <select
            className="form-select mr-3"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            className="btn btn-primary "
            style={{ whiteSpace: "nowrap" }}
            onClick={toggleModal}
          >
            Upload Template
          </button>
        </div>
      </div>
      <table className={`table table-striped ${styles.categoryTable}`}>
        <thead>
          <tr key={"head"}>
            <th scope="col">S.No</th>
            <th scope="col">Image</th>
            <th scope="col">Details</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template, index) => (
            <tr key={template.id}>
              <td scope="row">{index + 1}</td>
              <td>
                <img
                  width={100}
                  height={100}
                  src={template.imageUrl}
                  alt="template"
                />
              </td>
              <td>
                <ul type="none">
                  <li>
                    Color: <b>{template.color}</b>
                  </li>
                  <li>
                    Font: <b>{template.font}</b>
                  </li>
                  <li>
                    FontWeight: <b>{template.fontWeight}</b>
                  </li>
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {templates.length > 0 && (
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {showModal && (
        <TemplateUploadModal
          toggleModal={toggleModal}
          categories={categories}
        />
      )}
    </div>
  );
};

export default TemplateUpload;
