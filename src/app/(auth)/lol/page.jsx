"use client";
import { useState, useEffect } from "react";

export default function DisplayImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("/api/images");
        const data = await response.json();
        
        // Log the data to check the structure
        // console.log("API response:", data);

        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          setError("Unexpected response format");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to load images");
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <p>Loading images...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Uploaded Images</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <div key={image._id} style={{ margin: "10px" }}>
            <h3>{image.filename}</h3>
            <img
              src={`data:${image.contentType};base64,${image.data}`}
              alt={image.filename}
              style={{ width: "200px", height: "auto" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
