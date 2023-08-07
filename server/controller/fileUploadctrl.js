const asyncHandle = require("express-async-handler");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.APIC_KEY,
  api_secret: process.env.SECRET_KEY,
});

const upload = multer({ dest: "uploads/" });

const addFiles = asyncHandle(async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto", // Automatically detect the file type (image or PDF)
      folder: "uploads", // Optional: specify a folder in your Cloudinary account to store uploads
    });

    // Delete the temporary file after upload
    const fs = require("fs");
    fs.unlinkSync(req.file.path);
    console.log(result.secure_url);
    res.json(result.secure_url);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = { addFiles, upload };
