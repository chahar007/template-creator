import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./TempUpload.module.scss";
import apiService from "../../../config/services/ApiService";
import { toast } from "react-toastify";

const TempUploadsList = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      let tempData = await apiService.getCategoryData();
      setCategories(tempData?.results || []);
    } catch {
      console.log("Error fetching templates");
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    if (selectedCategory) fetchTempTemplates();
  }, [selectedCategory]);

  const fetchTempTemplates = async () => {
    try {
      let _res = await apiService.getBulkUpload(selectedCategory);
      if (_res.results) {
        setTemplates(_res.results || []);
      }
    } catch {
      console.log("errror");
    }
  };

  const handlePublish = async () => {
    try {
      let publish = await apiService.goLive();
      toast.success("Post Successfully Published!!!");
    } catch {
      toast.error("Something went wrong please try again!!!");
    }
  };

  return (
    <div className={styles.container}>
      <header
        className={`${styles.header} d-flex justify-content-between align-items-center`}
      >
        <h3 className="mb-0">Temporaries List</h3>
        <div className="d-flex align-items-center gap-4">
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
            onClick={handlePublish}
            className={`btn btn-primary ${
              templates.length === 0 ? "btn-disabled" : ""
            }`}
            disabled={templates.length === 0}
          >
            Publish
          </button>
        </div>
      </header>

      <div className={styles.imageList}>
        {templates.map((template) => (
          <div
            id={`image-${template.id}`}
            className={`${styles.imageContainer}`}
            key={template.id}
          >
            <img src={template.mediaUrl} className={styles.image} alt="img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempUploadsList;
