import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./TempUpload.module.scss";
import html2canvas from "html2canvas";
import apiService from "../../../config/services/ApiService";
import Loader from "../../shared/components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const TempUpload = () => {
  const location = useLocation();
  const data = location.state;
  const [templates, setTemplates] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      let tempData = await apiService.getTemplates(data.category_id, 1);
      setTemplates(tempData?.results || []);
    } catch {
      console.log("Error fetching templates");
    }
  };

  const handleImageSelect = (id) => {
    setSelectedImages((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((imageId) => imageId !== id)
        : [...prevSelected, id]
    );
  };

  // const handleUpload = async () => {
  //   let bulkTempData = [];
  //   for (const imageId of selectedImages) {
  //     const imageElement = document.getElementById(`image-${imageId}`);
  //     if (imageElement) {
  //       const canvas = await html2canvas(imageElement);
  //       const dataUrl = canvas.toDataURL("image/png");
  //       let _file = base64ToFile(dataUrl, "image.png");
  //       const formData = new FormData();
  //       formData.append("file", _file);

  //       try {
  //         let response = await apiService.imageUpload(formData);
  //         if (response.url) {
  //           let payload = {
  //             categoryId: templates.find((x) => x.id == imageId).categoryId,
  //             templateId: imageId,
  //             mediaUrl: response.url,
  //             mediaType: "image",
  //             placementType: "post",
  //             caption: data.caption,
  //             hashtags: "sample #post #instagram #viral #motivation",
  //             scheduledOn: new Date().toISOString(), // This will give you the date in the desired format
  //             status: "new",
  //           };

  //           bulkTempData.push(payload);
  //         }
  //       } catch (e) {}
  //     }
  //   }
  //   console.log("imageIUd", bulkTempData);
  //   bulkUpload(bulkTempData);
  // };

  const handleUpload = async () => {
    let bulkTempData = [];
    setIsLoading(true);
    for (const imageId of selectedImages) {
      const imageElement = document.getElementById(`image-${imageId}`);
      if (imageElement) {
        try {
          // Temporarily remove the selected class
          imageElement.classList.remove(styles.selected);

          // Ensure all images inside the element are loaded
          await ensureImagesLoaded(imageElement);

          // Capture the canvas with the required options
          const canvas = await html2canvas(imageElement, {
            useCORS: true,
            scale: 6, // Increase the scale for better quality
            width: imageElement.scrollWidth, // Set the width
            height: imageElement.scrollHeight, // Set the height
            allowTaint: false,
          });

          const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
          let _file = base64ToFile(dataUrl, "image.jpeg");
          const formData = new FormData();
          formData.append("file", _file);

          let response = await apiService.imageUpload(formData);
          if (response.url) {
            let payload = {
              categoryId: templates.find((x) => x.id == imageId).categoryId,
              templateId: imageId,
              mediaUrl: response.url,
              mediaType: "image",
              placementType: "post",
              caption: data.caption,
              quoteId: data.id,
              hashtags:data.hashtags,
              scheduledOn: new Date().toISOString(),
              status: "new",
            };

            bulkTempData.push(payload);
          }
        } catch (e) {
          console.error("Error uploading image:", e);
        }
      }
    }
    console.log("imageIUd", bulkTempData);
    bulkUpload(bulkTempData);
  };

  // Helper function to ensure images are loaded
  const ensureImagesLoaded = (element) => {
    const images = element.getElementsByTagName("img");
    const promises = [];

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      if (!img.complete || img.naturalWidth === 0) {
        promises.push(
          new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          })
        );
      }
    }

    return Promise.all(promises);
  };

  const bulkUpload = async (tempData) => {
    try {
      let response = await apiService.bulkTemplateUpload(tempData);
      setIsLoading(false);
      navigate("/temp-uploads-list");
      console.log(response);
    } catch {}
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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h3>{data.caption}</h3>
        <button
          onClick={handleUpload}
          className={`btn btn-primary ${
            selectedImages.length === 0 ? "btn-disabled" : ""
          }`}
          disabled={selectedImages.length === 0}
        >
          Submit
        </button>
      </header>
      <div className={styles.imageList}>
        {templates.map((template) => (
          <div
            id={`image-${template.id}`}
            className={`${styles.imageContainer} ${
              selectedImages.includes(template.id) ? styles.selected : ""
            }`}
            key={template.id}
            onClick={() => handleImageSelect(template.id)}
          >
            <img
              src={template.imageUrl}
              className={styles.image}
              alt={data.title}
            />
            <div
              className={styles.caption}
              style={{
                color: template.color,
                fontFamily: template.font,
                fontWeight: template.fontWeight,
              }}
            >
              {data.title}
            </div>
            <div
              className={styles.quoteBy}
              style={{
                color: template.color,
                fontFamily: template.font,
                fontWeight: template.fontWeight,
              }}
            >
              {data.quote_by}
            </div>
          </div>
        ))}
      </div>

      <Loader isLoading={isLoading} message="Fetching data..." />
    </div>
  );
};

export default TempUpload;
