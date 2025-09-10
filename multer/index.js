const express = require("express");
const { uploadFile } = require("./middleware/multer");
const { notFound, errorHandler } = require("./utils/errorHandler");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// در چه مسیری فایل آپلود شود مقصد را مشخص میکنیم
// const uploadFile = multer({ dest: "uploads/" });

//  سینگل یک دانه فایل ارسال میکند یک فایل را بخواهیم ارسال کنیم

app.post("/upload-single", uploadFile.single("image"), (req, res) => {
  res.send(req.file);
});
app.post("/upload-array", uploadFile.array("image", 3), (req, res) => {
  res.send(req.files);
});
app.post("/upload-any", uploadFile.any("image", 3), (req, res) => {
  res.send(req.files);
});
app.post(
  "/upload-fields",
  uploadFile.fields([
    { name: "image", maxCount: 2 },
    { name: "file", maxCount: 1 },
  ]),
  (req, res) => {
    res.send(req.files);
  }
);
app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("server run on port 3000");
});
