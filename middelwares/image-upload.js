const multer = require("multer");
const uuid = require("uuid").v4;

const upload = multer({
  // select path of storing image
  storage: multer.diskStorage({
    destination: "products-data/images",
    filename: function (req, file, callback) {
      callback(null, uuid() + "-" + file.originalname);
    },
  }),
});

// upload single image
const configureMulterMiddelware = upload.single("image");

module.exports = configureMulterMiddelware;
