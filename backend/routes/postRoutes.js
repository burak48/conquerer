const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
// const { authenticateToken } = require("../middleware/authentication");

// Create a new blog post
router.post("/", postController.createPost);

// Get all blog posts
router.get("/", postController.getAllPosts);

// Get a specific blog post
router.get("/:id", postController.getPostById);

// Update a blog post
router.put("/:id", postController.updatePost);

// Delete a blog post
router.delete("/:id", postController.deletePost);

module.exports = router;
