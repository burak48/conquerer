const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { title, description, category, userId } = req.body;

    const createdAt = new Date();
    const updatedAt = null;

    const postId = await Post.create({
      title,
      description,
      category,
      userId,
      created_at: createdAt,
      updated_at: updatedAt,
    });

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

  const updatedAt = new Date();

  try {
    const updatedPost = await Post.update(id, {
      title,
      description,
      category,
      updated_at: updatedAt,
    });
    if (!updatedPost) {
      return;
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

exports.getPostsByUserId = async (req, res) => {
  const { user_id } = req.params;

  try {
    const posts = await Post.getPostsByUserId(user_id);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.getPostsByCategory = async (req, res) => {
  const { category_name } = req.params;

  try {
    const posts = await Post.getPostsByCategory(category_name);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

exports.searchPostsByTitle = async (req, res) => {
  const { search_term } = req.query;

  try {
    const posts = await Post.findByTitle(search_term);
    res.json(posts);
  } catch (error) {
    console.error("Error searching posts by title:", error);
    res.status(500).json({ error: "Failed to search posts" });
  }
};
