require("dotenv").config();

module.exports = {
  dbHost: process.env.POSTGRES_HOST,
  dbPort: process.env.POSGRES_PORT,
  dbUsername: process.env.POSTGRES_USER,
  dbPassword: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DATABASE,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  port: process.env.PORT,
};
