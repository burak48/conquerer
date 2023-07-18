const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.updatePersonalInfo = async (req, res) => {
  try {
    const { userId, fullName, username, birthDate } = req.body;

    await User.updateInfo({ userId, fullName, username, birthDate });

    res.json({ message: "Personal info updated successfully" });
  } catch (err) {
    console.error("Error updating personal info:", err);
    res.status(500).json({ error: "Failed to update personal info" });
  }
};

exports.updateSecurity = async (req, res) => {
  try {
    const { userId, fullName, newPassword } = req.body;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.updateSecurityInfo({ userId, fullName, hashedPassword });

    res.json({ message: "Security info updated successfully" });
  } catch (err) {
    console.error("Error updating security info:", err);
    res.status(500).json({ error: "Failed to update security info" });
  }
};

exports.deleteAccount = async (req, res) => {
  console.log("req.body: ", req.body);
  try {
    const { userId } = req.body;

    await User.deleteUserAccount({ userId });

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Error deleting account:", err);
    res.status(500).json({ error: "Failed to delete account" });
  }
};
