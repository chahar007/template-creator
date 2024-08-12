import React, { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import styles from "./VideoGeneration.module.scss"; // Import your SCSS module
import { Modal, Button } from "react-bootstrap"; // Import React Bootstrap Modal and Button

const videoSizes = {
  square: "1080x1080", // 1:1
  portrait: "1080x1350", // 4:5
  landscape: "1080x608", // 16:9
  stories: "1080x1920", // 9:16
};

const videoDurations = [2, 5, 10, 15, 20, 30, 45, 60]; // Available durations in seconds

const VideoGenerator = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [videoSize, setVideoSize] = useState(videoSizes.square); // Default to square
  const [videoDuration, setVideoDuration] = useState(videoDurations[0]); // Default to 2 seconds
  const [progress, setProgress] = useState(0);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const messageRef = useRef(null);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      console.log(message);
      if (message.includes("frame")) {
        const match = message.match(/frame=\s*(\d+)/);
        if (match) {
          const frameCount = parseInt(match[1], 10);
          const totalFrames = videoDuration * 15; // Calculate total frames based on fps
          setProgress(Math.min((frameCount / totalFrames) * 100, 100));
        }
      }
    });

    try {
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript"
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm"
        ),
      });
      setLoaded(true);
    } catch (error) {
      console.error("Error loading FFmpeg:", error);
      messageRef.current.innerHTML = "Error loading FFmpeg.";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleAudioChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAudio(file);
    }
  };

  const transcode = async () => {
    if (!selectedImage || !selectedAudio) {
      alert("Please select both an image and an audio file.");
      return;
    }

    const ffmpeg = ffmpegRef.current;

    try {
      // Write the selected image and audio file to FFmpeg
      await ffmpeg.writeFile("image.jpg", await fetchFile(selectedImage));
      await ffmpeg.writeFile("audio.mp3", await fetchFile(selectedAudio));

      // FFmpeg command to generate a video with optimized settings
      const command = [
        "-loop",
        "1", // Loop the image
        "-i",
        "image.jpg", // Input image
        "-i",
        "audio.mp3", // Input audio
        "-vf",
        `scale=${videoSize},setsar=1,format=yuv420p,fps=15`, // Set frame rate
        "-t",
        videoDuration.toString(), // Duration
        "-pix_fmt",
        "yuv420p", // Pixel format
        "-shortest", // Ensure video ends with the shortest input
        "-preset",
        "ultrafast", // Use the fastest preset
        "output.mp4", // Output file
      ];

      setProgress(0); // Reset progress
      setVideoGenerated(false); // Hide video player

      await ffmpeg.exec(command);

      const data = await ffmpeg.readFile("output.mp4");
      const videoURL = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );

      setVideoURL(videoURL); // Set the video URL for the video player
      setVideoGenerated(true); // Show video player
      toast.success("Video successfully generated!"); // Show success toast
      setShowModal(true); // Show modal
    } catch (error) {
      console.error("Error during video generation:", error);
      messageRef.current.innerHTML = "Error generating video.";
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = videoURL;
    link.download = "video.mp4";
    link.click();
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {loaded ? (
        <div className={`${styles.container} my-5`}>
          <div className={`${styles.card} p-4 shadow-lg`}>
            <h2 className="text-center mb-4">Video Generator</h2>
            <div className="form-group mb-3">
              <label htmlFor="imageInput" className="form-label">
                Select Image
              </label>
              <input
                type="file"
                id="imageInput"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="audioInput" className="form-label">
                Select Audio
              </label>
              <input
                type="file"
                id="audioInput"
                className="form-control"
                accept="audio/*"
                onChange={handleAudioChange}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="videoSizeSelect" className="form-label">
                Select Video Size
              </label>
              <select
                id="videoSizeSelect"
                className="form-select"
                onChange={(e) => setVideoSize(e.target.value)}
              >
                <option value={videoSizes.square}>Square Video (1:1)</option>
                <option value={videoSizes.portrait}>
                  Portrait Video (4:5)
                </option>
                <option value={videoSizes.landscape}>
                  Landscape Video (16:9)
                </option>
                <option value={videoSizes.stories}>Stories/Reels (9:16)</option>
              </select>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="videoDurationSelect" className="form-label">
                Select Video Duration (seconds)
              </label>
              <select
                id="videoDurationSelect"
                className="form-select"
                onChange={(e) => setVideoDuration(parseInt(e.target.value))}
              >
                {videoDurations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration} seconds
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-center mb-4">
              <button className="btn btn-primary" onClick={transcode}>
                Generate Video
              </button>
            </div>
            <div className="progress mb-4">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progress}%` }}
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {Math.round(progress)}%
              </div>
            </div>

            {videoGenerated && (
              <div className={`${styles.videoContainer} mb-4`}>
                <video
                  ref={videoRef}
                  className="rounded shadow"
                  controls
                  style={{ maxWidth: "100%", maxHeight: "300px" }} // Adjust maxWidth and maxHeight
                  src={videoURL}
                ></video>
              </div>
            )}

            <p ref={messageRef} className="text-muted text-center"></p>
            <p className="text-center text-muted">
              Open Developer Tools (Ctrl+Shift+I) to View Logs
            </p>
          </div>
        </div>
      ) : (
        <div className="container my-5 text-center">
          <button className="btn btn-secondary" onClick={load}>
            Load ffmpeg-core (~31 MB)
          </button>
        </div>
      )}

      {/* Modal for video playback and actions */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Video Generated</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <video className="w-100" controls src={videoURL}></video>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDownload}>
            Download Video
          </Button>
          <Button variant="primary" onClick={transcode}>
            Regenerate Video
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default VideoGenerator;
