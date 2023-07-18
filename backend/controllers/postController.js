const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, description, category, userId } = req.body;

    const postId = await Post.create({ title, description, category, userId });

    res.status(201).json({ id: postId, message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error("Error getting blog posts:", error);
    res.status(500).json({ error: "Failed to get blog posts" });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error("Error getting blog post:", error);
    res.status(500).json({ error: "Failed to get blog post" });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;

  try {
    const updatedPost = await Post.update(id, { title, description, category });
    if (!updatedPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Failed to update blog post" });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.delete(id);
    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
};
