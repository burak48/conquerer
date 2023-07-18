const config = require("./config");
const express = require("express");
const cors = require("cors");

const app = express();
const port = config.port || 3001;

const authRoutes = require("./routes/authRoutes");
const accountRoutes = require("./routes/accountRoutes");
const postRoutes = require("./routes/postRoutes");

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/account", accountRoutes);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
