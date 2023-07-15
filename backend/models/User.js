const config = require("../config");
const { Pool } = require("pg");

const dbHost = config.dbHost;
const dbPort = config.dbPort;
const dbUser = config.dbUsername;
const dbPassword = config.dbPassword;
const dbName = config.dbName;

const pool = new Pool({
  user: dbUser,
  host: dbHost,
  database: dbName,
  password: dbPassword,
  port: dbPort,
});

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Error connecting to PostgreSQL: ", err));

class User {
  constructor({ id, username, password }) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  static async isTableExists() {
    try {
      const query = `
        SELECT EXISTS (
          SELECT 1
          FROM   information_schema.tables
          WHERE  table_name = 'users'
        )`;
      const result = await pool.query(query);
      console.log("result: ", result);
      return result.rows[0].exists;
    } catch (err) {
      console.error("Error checking if users table exists:", err);
      throw new Error("Failed to check if users table exists");
    }
  }

  static async createTableIfNotExists() {
    try {
      const query = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )`;
      await pool.query(query);
    } catch (err) {
      console.error("Error creating users table:", err);
      throw new Error("Failed to create users table");
    }
  }

  static async findOne({ username }) {
    try {
      const query = "SELECT * FROM users WHERE username = $1";
      const result = await pool.query(query, [username]);
      const user = result.rows[0];
      return user ? new User(user) : null;
    } catch (err) {
      console.error("Error finding user:", err);
      throw new Error("Failed to find user");
    }
  }

  async save() {
    try {
      const query =
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id";
      const result = await pool.query(query, [this.username, this.password]);
      this.id = result.rows[0].id;
    } catch (err) {
      console.error("Error saving user:", err);
      throw new Error("Failed to save user");
    }
  }
}

module.exports = User;
