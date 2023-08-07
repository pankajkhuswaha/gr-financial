const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto } = require("../middlewares/uploadImage");
const { addFiles, upload } = require("../controller/fileUploadctrl");
const router = express.Router();

// router.post(
//   "/",
//   uploadPhoto.array("images", 10),
//   uploadImages
// );  
router.post("/",upload.single('images'),addFiles)

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
