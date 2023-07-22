const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");
const { authenticateToken } = require("../middleware/authentication");

// Update personal info
router.put(
  "/update-personal-info",
  authenticateToken,
  accountController.updatePersonalInfo
);

// Update security
router.put(
  "/update-security",
  authenticateToken,
  accountController.updateSecurity
);

// Delete account
router.delete(
  "/delete-account",
  authenticateToken,
  accountController.deleteAccount
);

module.exports = router;
