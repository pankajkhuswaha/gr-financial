const fs = require("fs");
const asyncHandler = require("express-async-handler");
const pt = require("path");
const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const cloudinary = require("cloudinary");
require("dotenv").config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.APIC_KEY,
  api_secret: process.env.SECRET_KEY,
});

const uploadImages = asyncHandler(async (req, res, next) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const newpath = await uploader(pt.resolve(file.path));

      urls.push(newpath);

      fs.unlinkSync(pt.resolve(file.path));
    }
    console.log(urls);
    res.json(urls);
  } catch (error) {
    next(error);
  }
});

const deleteImage = asyncHandler(async (id) => {
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    // res.json({ message: "Deleted" });
    console.log("deleted");
  } catch (error) {
    throw new Error(error);
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  uploadImages,
  deleteImages,
  deleteImage,
};
