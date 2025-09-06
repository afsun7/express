const express = require("express");
const { errorHandler, notFound } = require("./utils/errorHandler");
const { BlogModel } = require("./model/blog.model");
const { isValidObjectId } = require("mongoose");
const omitEmpty = require("omit-empty");
const app = express();
require("./config/mongo.config");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/create", async (req, res, next) => {
  try {
    const { title, text } = req.body;
    const result = await BlogModel.create({
      title,
      text,
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
});
app.post("/new", async (req, res, next) => {
  try {
    const { title, text } = req.body;
    // new دیگر نیازی به await نیست
    const newBlog = new BlogModel({
      title,
      text,
    });
    //save یک عملیات async است
    await newBlog.save();
    res.send(newBlog);
  } catch (error) {
    next(error);
  }
});
app.get("/insert-many", async (req, res, next) => {
  try {
    const newBlogs = await BlogModel.insertMany([
      {
        title: "1th title",
        text: "1th text",
      },
      {
        title: "2th title",
        text: "2th text",
      },
      {
        title: "3th title",
        text: "3th text",
      },
    ]);
    res.send(newBlogs);
  } catch (error) {
    next(error);
  }
});
app.get("/blogs", async (req, res, next) => {
  try {
    const blogs = await BlogModel.find();
    res.send({
      statusCode: 200,
      total: blogs.length,
      blogs,
    });
  } catch (error) {
    next(error);
  }
});
app.get("/blog/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      throw { status: 400, message: "your id is not valid" };

    const blog = await BlogModel.findOne({ _id: id });
    res.send({
      statusCode: 200,
      blog,
    });
  } catch (error) {
    next(error);
  }
});
app.delete("/blog/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id))
      throw { status: 400, message: "your id is not valid" };

    const blog = await BlogModel.deleteOne({ _id: id });
    res.send(blog);
  } catch (error) {
    next(error);
  }
});
app.delete("/blogs", async (req, res, next) => {
  try {
    const blogs = await BlogModel.deleteMany({});
    res.send(blogs);
  } catch (error) {
    next(error);
  }
});
app.put("/blog/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const newBodyObject = omitEmpty(req.body);
    const blog = await BlogModel.findOne({ _id: id });
    if (!blog) throw { status: 404, message: "not found blog" };
    Object.assign(blog, newBodyObject);
    await blog.save();
    res.send(blog);
  } catch (error) {
    next(error);
  }
});
app.patch("/blog/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const newBodyObject = omitEmpty(req.body);
    // const blog = await BlogModel.findOne({ _id: id });
    // if (!blog) throw { status: 404, message: "not found blog" };
    // const result = await BlogModel.updateOne(
    //   { _id: id },
    //   { $set: newBodyObject }
    // );
    // فرق findOneAndUpdate به این صورت است که نتیجه برنمیگردانه چه تغییر کند چه تغییر نکند مقدار را برمیگرداند
    const blog = await BlogModel.findOneAndUpdate(
      { _id: id },
      { $set: newBodyObject }
    );
    res.send(blog);
  } catch (error) {
    next(error);
  }
});
app.use(notFound);
app.use(errorHandler);
app.listen(3000, () => {
  console.log("server run on port 3000");
});
