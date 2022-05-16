const Blog = require("../Models/Blog");
// get blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find({ user: req.user._id });
  res.json(blogs);
};

const createBlog = async (req, res) => {
  const blog = new Blog({
    user: req.user._id,
    title: req.body.title,
  });

  try {
    await blog.save();
    res.status(201).json({ message: "blog created" });
  } catch (error) {
    res.status(400).json({ error: "there was a problem creating blog" });
  }
};

const updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  console.log(req.user._id.toString(), blog.user.toString());

  if (req.user._id.toString() !== blog.user.toString()) {
    res.status(400).json({ error: "unauthorized" });
  } else {
    blog.title = req.body.title;
    await blog.save();
    res.status(200).json(blog);
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;

  const blog = await Blog.findById(id).populate("user");

  if (blog) {
    await blog.remove();
    res.status(200).json({ message: "blog deleted" });
  } else {
    res.status(400).json({ error: "blog not found" });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  deleteBlog,
  updateBlog,
};
