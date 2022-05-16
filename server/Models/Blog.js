const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
