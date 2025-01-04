import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.ENCRYPTION_KEY;

// Validate SECRET_KEY
if (!SECRET_KEY) {
  throw new Error("Encryption key is missing in environment variables.");
}

// Encrypt function
export function encrypt(text) {
  try {
    if (!text) throw new Error("No text provided for encryption.");
    return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  } catch (error) {
    console.error("Encryption failed:", error.message);
    throw new Error("Encryption error occurred.");
  }
}

// Decrypt function
export function decrypt(cipherText) {
  try {
    if (!cipherText) throw new Error("No cipherText provided for decryption.");
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (!originalText) throw new Error("Decryption produced an empty string.");
    return originalText;
  } catch (error) {
    console.error("Decryption failed:", error.message);
    throw new Error("Decryption error occurred.");
  }
}
