const config = require("./config");
const express = require("express");
const cors = require("cors");

const app = express();
const port = config.port || 3001;

const authRoutes = require("./routes/authRoutes");

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
