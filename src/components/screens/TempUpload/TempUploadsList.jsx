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
  const [scheduleTime, setScheduleTime] = useState(""); // State for scheduling time
  const [currentDateTime, setCurrentDateTime] = useState(""); // State for current datetime
  const [timeDifference, setTimeDifference] = useState(60); // State for selected time difference in minutes, default 1 hour (60 minutes)

  // Array of time intervals in JSON format
  const timeIntervals = [
    { label: "1/2 hour", value: 30 },
    { label: "1 hour", value: 60 },
    { label: "2 hours", value: 120 },
    { label: "3 hours", value: 180 },
    { label: "4 hours", value: 240 },
    { label: "5 hours", value: 300 },
    { label: "6 hours", value: 360 },
    { label: "7 hours", value: 420 },
    { label: "8 hours", value: 480 },
    { label: "9 hours", value: 540 },
    { label: "10 hours", value: 600 },
    { label: "11 hours", value: 660 },
    { label: "12 hours", value: 720 },
    { label: "13 hours", value: 780 },
    { label: "14 hours", value: 840 },
    { label: "15 hours", value: 900 },
    { label: "16 hours", value: 960 },
    { label: "17 hours", value: 1020 },
    { label: "18 hours", value: 1080 },
    { label: "19 hours", value: 1140 },
    { label: "20 hours", value: 1200 },
    { label: "21 hours", value: 1260 },
    { label: "22 hours", value: 1320 },
    { label: "23 hours", value: 1380 },
    { label: "24 hours", value: 1440 }
  ];

  useEffect(() => {
    fetchTempTemplates();
    setCurrentDateTime(getCurrentDateTime()); // Set current date-time on component load
  }, []);

  // Helper function to get the current date-time in the proper format
  const getCurrentDateTime = () => {
    const now = new Date();
    const localDatetime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16); // Format it as 'YYYY-MM-DDTHH:MM'
    return localDatetime;
  };

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
    if (!scheduleTime || !timeDifference) {
      toast.error("Please select both schedule time and post interval");
      return;
    }

    try {
      const publishPayload = {
        scheduleFrom: scheduleTime, // Scheduled time for first post
        timeDifference,            // Time difference in minutes for subsequent posts
      };
      let publish = await apiService.goLive(publishPayload);
      toast.success("Post Successfully Scheduled!!!");
      fetchTempTemplates();
    } catch {
      toast.error("Something went wrong, please try again!!!");
    }
  };

  return (
    <div className={styles.container}>
      <header
        className={`${styles.header} d-flex justify-content-between align-items-center`}
      >
        <h3 className="mb-0">Temporaries List</h3>
        <div className="d-flex align-items-center gap-4">
          {/* DateTime Picker */}
          <input
            type="datetime-local"
            value={scheduleTime}
            min={currentDateTime} // Disable past date-time
            onChange={(e) => setScheduleTime(e.target.value)}
            className="form-control"
          />

          {/* Time Difference Dropdown */}
          <select
            value={timeDifference}
            onChange={(e) => setTimeDifference(e.target.value)}
            className="form-select"
          >
            <option value="" disabled>Select interval between posts</option>
            {timeIntervals.map((interval) => (
              <option key={interval.value} value={interval.value}>
                {interval.label}
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
