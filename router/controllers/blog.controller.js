class BLogController {
  getBlogs(req, res, next) {
    console.log(req.time);

    res.send("blogs");
  }
  createBlog(req, res, next) {
    console.log(req.time);

    res.send("created new blog");
  }
  deleteBlog(req, res, next) {
    console.log(req.time);

    res.send(`delete blog by id #${req.params.id}`);
  }
  updateBlog(req, res, next) {
    console.log(req.time);

    res.send(`updated blog by id #${req.params.id}`);
  }
}

module.exports = BLogController;
