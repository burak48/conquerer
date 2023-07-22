const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const { authenticateToken } = require("../middleware/authentication");

// Create a new blog post
router.post("/", authenticateToken, postController.createPost);

// Get all blog posts
router.get("/", authenticateToken, postController.getAllPosts);

// Search posts by title query
router.get("/search", authenticateToken, postController.searchPostsByTitle);

// Get a specific blog post
router.get("/:id", authenticateToken, postController.getPostById);

// Update a blog post
router.put("/:id", authenticateToken, postController.updatePost);

// Delete a blog post
router.delete("/:id", authenticateToken, postController.deletePost);

// Get all blog posts with a specific user
router.get(
  "/user/:user_id",
  authenticateToken,
  postController.getPostsByUserId
);

// Get all blog posts with a specific category
router.get(
  "/category/:category_name",
  authenticateToken,
  postController.getPostsByCategory
);

module.exports = router;
