// models/Image.js

import mongoose from 'mongoose';

// Define the schema for an image
const ImageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true, // Ensure the filename is provided
  },
  contentType: {
    type: String,
    required: true, // Ensure the content type is provided
  },
  size: {
    type: Number,
    required: true, // Ensure the size is provided
  },
  data: {
    type: [Buffer],
    required: true, // Ensure the image data is provided
  },
  uploadedAt: {
    type: Date,
    default: Date.now, // Automatically set the upload date
  },
});

// Create a model from the schema
const Image = mongoose.models.Image || mongoose.model('Image', ImageSchema);

export default Image;
