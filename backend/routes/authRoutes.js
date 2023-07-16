const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authentication");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

router.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "Protected route accessed successfully",
    userId: req.userId,
  });
});

module.exports = router;
