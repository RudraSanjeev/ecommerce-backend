const cloudinary = require("cloudinary").v2;
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SEC,
  secure: true,
});

const uploadImageToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

const imageUrl = async (imagePath) => {
  try {
    const result = await uploadImageToCloudinary(imagePath);
    return result;
  } catch (err) {
    console.log("error" + err);
  }
};
module.exports = imageUrl;
