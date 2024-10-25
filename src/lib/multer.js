// lib/multerMiddleware.js
import multer from 'multer';

// Set up Multer with memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const multerMiddleware = upload.single('file'); // Adjust 'file' to the name of your input field
