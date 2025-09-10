const multer = require("multer");
const path = require("path");
const fs = require("fs");
// cb آدرس نهایی برمیگرداند همین طور ارور هم برمیگردانه
// مقدار اول میگه یا ارور بده یا نال بده cb

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync("public/upload", { recursive: true });
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const formatList = [".png", ".jpg", ".jpeg", ".webp"];
    if (formatList.includes(ext)) {
      const fileName = Date.now() + ext;
      cb(null, fileName);
    } else {
      cb(new Error("only .png , .jpg , .jpeg , .webp format allowed"));
    }
  },
});
const size = 500000;
const uploadFile = multer({ storage, limits: { fileSize: size } });
module.exports = {
  uploadFile,
};
