require("dotenv").config();

module.exports = {
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  port: process.env.PORT,
};
