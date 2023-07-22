const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secretKey = process.env.JWT_SECRET_KEY.toString();

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const isTableExists = await User.isTableExists();
    if (!isTableExists) {
      await User.createTableIfNotExists();
    }

    const existingUser = await User.findOne({ fullName });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  const { fullName, password } = req.body;

  try {
    const user = await User.findOne({ fullName });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    const userData = {
      id: user.id,
      fullName: user.fullname,
      userName: user?.username,
      email: user.email,
      birthDate: user?.birthdate,
    };
    res.json({ user: userData, token });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Login failed" });
  }
};
