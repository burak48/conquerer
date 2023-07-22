const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { authenticateToken } = require("../middleware/authentication");

router.get("/:id", authenticateToken, blogController.getBlogDetails);
router.post("/:id/comments", authenticateToken, blogController.addComment);
router.get(
  "/comments/:id",
  authenticateToken,
  blogController.getCommentsByUserId
);

module.exports = router;
