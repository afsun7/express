const express = require("express");
const path = require("path");
const { errorHandler, notFound } = require("./utils/errorHandler");
const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const blogs = require("./blogs.json");
  res.render("index", { blogs, blogTitle: "Ejs Blog" });
});

app.use(notFound);
app.use(errorHandler);
app.listen(3000, () => {
  console.log("server run on port 3000");
});
