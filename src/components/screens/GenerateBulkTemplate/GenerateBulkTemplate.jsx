import React, { useState, useEffect } from "react";
import apiService from "../../../config/services/ApiService";
import Loader from "../../shared/components/Loader/Loader";
import styles from "./GenerateBulkTemplate.module.scss"; // Importing CSS Module
import TemplateGenerate from "./TemplateGenerate";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const GenerateBulkTemplate = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [generatedPayload, setGeneratedPayload] = useState([]);
  const [templateOutput, setTemplateOutput] = useState([]);

  useEffect(() => {
    fetchCategories();
    getQuotes();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError("");
    try {
      const catData = await apiService.getCategoryData();
      setCategories(catData.results || []);
    } catch (err) {
      setError("Error fetching categories");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTemplates = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const templateData = await apiService.getTemplates(id);
      setTemplates(templateData.results || []);
    } catch (err) {
      setError("Error fetching templates");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getQuotes = async (page) => {
    setIsLoading(true);
    try {
      let quotesData = await apiService.getQuotes({ page });
      setQuotes(quotesData.results || []);
    } catch {
      console.log("Error fetching quotes");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    setSelectedCategory(selectedId);
    if (selectedId) {
      fetchTemplates(selectedId);
    } else {
      setTemplates([]);
    }
  };

  const handleImageError = (e) => {
    e.target.style.display = "none";
  };

  const generateTemplates = () => {
    setIsLoading(true);
    const payload = syncPayload(templates, quotes);
    setGeneratedPayload(payload);
  };

  useEffect(() => {
    setCurrentIndex(0);
  }, [generatedPayload]);

  const tempOutput = (image) => {
    setTemplateOutput((prevOutput) => [...prevOutput, image]);
    console.log({ templateOutput });
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      if (newIndex < generatedPayload.length) {
        return newIndex;
      } else {
        setGeneratedPayload([]);
        setIsLoading(false);
        return null;
      }
    });
  };

  const downloadTemplates = () => {
    // downloadZip(templateOutput);
    handleUpload();
  };

  const handleUpload = async () => {
    const results = [];
    for (const template of templateOutput) {
      try {
        const formData = new FormData();
        let file = base64ToFile(template.image64, "template.png");
        formData.append("file", file);
        formData.append("type", "image/png");
        const response = await apiService.imageUploadToWP(formData);
        schedulePost(template, response.id);
        // results.push({ file: file.name, status: "success", response });

        console.log("Upload successful:", response);
      } catch (error) {
        // results.push({ file: file.name, status: "error", error });
        console.error("Error uploading image:", error);
      }
    }
    // setUploadResults(results);
  };

  const base64ToFile = (base64String, fileName) => {
    if (!base64String) return;
    // Ensure the base64 string is correctly formatted
    const base64Data = base64String.replace(/^data:.+;base64,/, "");
    const mime = base64String.match(/^data:(.+);base64,/);

    if (!mime) {
      throw new Error("Invalid Base64 string format.");
    }

    // Decode base64 string to binary
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    // Create a Blob from the byte array
    const blob = new Blob([byteArray], { type: mime[1] });

    // Convert the Blob to a File object
    return new File([blob], fileName, { type: mime[1] });
  };

  const schedulePost = async (temp, id) => {
    let payload = {
      title: temp.textInput,
      content: temp.textInput,
      status: "publish",
      featured_media: id,
      categories: 52,
    };

    try {
      let response = await apiService.schedulePost(payload);
    } catch {}
  };

  const downloadZip = (base64Images) => {
    setIsLoading(true);
    const zip = new JSZip();
    const imgFolder = zip.folder("images");

    base64Images.forEach((base64Image, index) => {
      const byteString = atob(base64Image.split(",")[1]);
      const mimeString = base64Image.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      imgFolder.file(`image${index + 1}.png`, blob);
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "templates.zip");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  };

  const syncPayload = (images, quotes) => {
    let data = [];
    images.forEach((img) => {
      quotes.map((quote, index) => {
        let payload = {
          image: img.imageUrl,
          authorText: quote.quote_by,
          textInput: quote.caption,
          id: index,
        };

        data.push(payload);
      });
    });
    console.log("payload", data);
    return data;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Generate Bulk Templates</h2>
      <select
        className={styles.select}
        onChange={handleCategoryChange}
        disabled={isLoading}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.templates}>
        {isLoading ? (
          <Loader />
        ) : templates.length > 0 ? (
          templates.map((template, index) => (
            <img
              key={index}
              src={template.imageUrl}
              alt={`Template ${index}`}
              className={styles.templateImage}
              onError={handleImageError}
            />
          ))
        ) : (
          <p>No templates available</p>
        )}
      </div>
      <button
        className={`${styles.button} ${
          !quotes.length || !selectedCategory ? styles.disabled : ""
        } `}
        onClick={generateTemplates}
      >
        Generate Templates
      </button>
      <div className={styles.output}>
        <div className={styles.outputHeader}>
          <h4>Output Templates: {templateOutput.length}</h4>
          <button className={styles.downloadButton} onClick={downloadTemplates}>
            Download
          </button>
        </div>
        <div className={styles.imageGrid}>
          {templateOutput.map((output, index) => (
            <img
              key={index}
              src={output.image64}
              alt={`Generated Template ${index}`}
              className={styles.generatedImage}
            />
          ))}
        </div>
      </div>
      {currentIndex > -1 && generatedPayload.length && (
        <div className={styles.templateGeneratorContianer}>
          <TemplateGenerate
            tempData={generatedPayload[currentIndex]}
            onImageGenerated={tempOutput}
          />
        </div>
      )}

      <Loader
        isLoading={isLoading}
        message="Processing your request please wait..."
      />
    </div>
  );
};

export default GenerateBulkTemplate;
