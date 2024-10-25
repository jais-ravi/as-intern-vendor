"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission and image upload
  const onSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // Append the selected file

    try {
      // Upload the file to the API
      console.log(formData)
      const res = await axios.post("/api/lol", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for form data
        },
      });
      console.log("snd")

      // Check the response status
      if (res.status === 200) {
        setMessage("Image uploaded successfully!");
      } else {
        setMessage("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading the image:", error);
      setMessage("Failed to upload image. Please try again.");
    }
  };

  return (
    <div>
      <h1>Upload an Image</h1>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
