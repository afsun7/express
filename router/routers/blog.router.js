const { Router } = require("express");
const BLogController = require("../controllers/blog.controller");
const blogController = new BLogController();
const router = Router();
router.get("/", blogController.getBlogs);
router.post("/", blogController.createBlog);
router.delete("/:id", blogController.deleteBlog);
router.patch("/:id", blogController.updateBlog);

module.exports = router;
