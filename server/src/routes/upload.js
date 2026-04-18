const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const authMiddleware = require("../middleware/auth");
const superUserMiddleware = require("../middleware/superUser");
const { cloudinary, hasCloudinaryConfig } = require("../../config/cloudinary");

const router = express.Router();

const upload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "mayabri/products",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
      transformation: [{ width: 1400, height: 1400, crop: "limit", quality: "auto" }],
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/", authMiddleware, superUserMiddleware, (req, res, next) => {
  if (!hasCloudinaryConfig) {
    return res.status(500).json({
      message:
        "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
    });
  }

  upload.single("image")(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "Image must be 5MB or smaller." });
      }
      return res.status(400).json({ message: error.message });
    }

    if (error) {
      return next(error);
    }

    if (!req.file?.path) {
      return res.status(400).json({ message: "Image file is required." });
    }

    return res.status(201).json({
      message: "Image uploaded successfully.",
      url: req.file.path,
      publicId: req.file.filename,
    });
  });
});

module.exports = router;
