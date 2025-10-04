const express = require("express");
const { notFound, errorHandler } = require("./utils/errorHandler");
const fileUpload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// اگه کاربر فایلی بفرسته که از حداکثر حجم تعریف شده (limits) بیشتر باشه،
// آپلود قطع بشه (abort بشه) و کل request رد بشه.
app.use(
  fileUpload({
    abortOnLimit: true,
    limits: { fileSize: 1 * 1024 * 1024, fields: {} },
  })
);

app.post("/upload-buffer", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    throw { status: 400, message: "no file were uploaded" };
  }
  const { image } = req.files;
  const ext = path.extname(image.name);
  const destPath = path.join(__dirname, "public", "upload", Date.now() + ext);
  const buffer = Buffer.from(image.data);
  fs.writeFileSync(destPath, buffer);
  res.send(req.files);
});
app.post("/upload-mv", async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    throw { status: 400, message: "no file were uploaded" };
  }

  for (const key in req.files) {
    const file = req.files[key];
    const ext = path.extname(file.name);
    const destPath = path.join(__dirname, "public", "upload", Date.now() + ext);

    await new Promise((resolve, reject) => {
      file.mv(destPath, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  res.send(req.files);
});

app.use(notFound);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("server run on port 3000");
});
