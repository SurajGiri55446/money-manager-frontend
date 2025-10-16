// src/Util/uploadProfileImage.js
import { API_ENDPOINTS } from "./apiEndpoints";

const CLOUDINARY_UPLOAD_PRESET = "money-manager"; // must match exactly with Cloudinary preset

const uploadProfileImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  // Debug
  console.log("Uploading image...", [...formData.entries()]);

  try {
    const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Cloudinary error:", data);
      throw new Error(data.error?.message || "Upload failed");
    }

    console.log("✅ Upload success:", data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error("❌ Upload error:", error.message);
    throw error;
  }
};

export default uploadProfileImage;
