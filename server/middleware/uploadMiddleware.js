const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        format: async (req, file) => "jpg", // Format
        public_id: (req, file) => file.fieldname + "-" + Date.now(),
    },
});

// Initialize Multer
const upload = multer({ storage });

module.exports = upload;
