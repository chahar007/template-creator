import React, { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import imageKeyMappings from "../../../assets/images/imageKeyMappings";
import { useSelector } from "react-redux";

const VideoGenerator = ({ imageSrc }) => {
  const [loaded, setLoaded] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);
  const messageRef = useRef(null);

  const base64Image = useSelector((store) => store.imageReducer.uploadedImage);

  const load = async () => {
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on("log", ({ message }) => {
      messageRef.current.innerHTML = message;
      console.log(message);
    });

    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });
    setLoaded(true);
  };

  // const transcode = async () => {
  //   const ffmpeg = ffmpegRef.current;

  //   // Decode base64 image
  //   const byteString = atob(base64Image.split(",")[1]);
  //   const mimeString = base64Image.split(",")[0].split(":")[1]?.split(";")[0];
  //   const buffer = new Uint8Array(byteString.length);

  //   for (let i = 0; i < byteString.length; i++) {
  //     buffer[i] = byteString.charCodeAt(i);
  //   }

  //   // Write the decoded image file to FFmpeg
  //   await ffmpeg.writeFile("image.jpg", buffer);

  //   // // Load image file
  //   // await ffmpeg.writeFile(
  //   //   "image.jpg",
  //   //   await fetchFile(imageKeyMappings.temp1)
  //   // );

  //   // FFmpeg command to generate a video from the image
  //   const command = [
  //     "-loop",
  //     "1",
  //     "-i",
  //     "image.jpg",
  //     "-c:v",
  //     "libx264",
  //     "-t",
  //     "5", // Duration of the video in seconds
  //     "-pix_fmt",
  //     "yuv420p",
  //     "-shortest",
  //     "output.mp4",
  //   ];

  //   await ffmpeg.exec(command);

  //   const data = await ffmpeg.readFile("output.mp4");
  //   videoRef.current.src = URL.createObjectURL(
  //     new Blob([data.buffer], { type: "video/mp4" })
  //   );
  // };

  const transcode = async () => {
    const ffmpeg = ffmpegRef.current;

    // Decode base64 image
    const byteString = atob(base64Image.split(",")[1]);
    const mimeString = base64Image.split(",")[0].split(":")[1]?.split(";")[0];
    const buffer = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      buffer[i] = byteString.charCodeAt(i);
    }

    // Write the decoded image file to FFmpeg
    await ffmpeg.writeFile("image.jpg", buffer);

    // FFmpeg command to generate a video from the image with animations
    const command = [
      "-loop",
      "1",
      "-i",
      "image.jpg",
      "-vf",
      "zoompan=z='if(lte(in,60),zoom-0.3,zoom+0.1)':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)',scale=1280:720,setsar=1,format=yuv420p",
      "-t",
      "5", // Duration of the video in seconds
      "-pix_fmt",
      "yuv420p",
      "-shortest",
      "output.mp4",
    ];

    await ffmpeg.exec(command);

    const data = await ffmpeg.readFile("output.mp4");
    videoRef.current.src = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
  };

  return loaded ? (
    <>
      <div style={{ width: 100 }}>
        <video
          style={{ width: 300, height: 300 }}
          ref={videoRef}
          controls
        ></video>
      </div>
      <br />
      <button onClick={transcode}>Generate Video</button>
      <p ref={messageRef}></p>
      <p>Open Developer Tools (Ctrl+Shift+I) to View Logs</p>
    </>
  ) : (
    <button onClick={load}>Load ffmpeg-core (~31 MB)</button>
  );
};

export default VideoGenerator;
