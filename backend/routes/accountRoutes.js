const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

// Update personal info
router.put("/update-personal-info", accountController.updatePersonalInfo);

// Update security
router.put("/update-security", accountController.updateSecurity);

// Delete account
router.delete("/delete-account", accountController.deleteAccount);

module.exports = router;
