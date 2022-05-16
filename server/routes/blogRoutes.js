const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");

const {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");

// routes
router.get("/", auth, getBlogs);
router.post("/", auth, createBlog);
router.put("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);
module.exports = router;
