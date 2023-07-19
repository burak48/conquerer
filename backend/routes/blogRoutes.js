const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
// const { authenticateToken } = require("../middleware/authentication");

router.get("/:id", blogController.getBlogDetails);
router.post("/:id/comments", blogController.addComment);

module.exports = router;
