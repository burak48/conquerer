const config = require("../config");
const { Pool } = require("pg");

const dbHost = config.dbHost;
const dbPort = config.dbPort;
const dbUser = config.dbUsername;
const dbPassword = config.dbPassword;
const dbName = config.dbName;

let pool;
if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword,
    port: dbPort,
    ssl: { rejectUnauthorized: false },
  });
} else {
  pool = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword,
    port: dbPort,
  });
}

pool
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Error connecting to PostgreSQL: ", err));

class User {
  constructor({ id, fullName, email, password }) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
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
        fullname VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE,
        birthdate VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      )`;
      await pool.query(query);
    } catch (err) {
      console.error("Error creating users table:", err);
      throw new Error("Failed to create users table");
    }
  }

  static async findOne({ fullName }) {
    try {
      const query = "SELECT * FROM users WHERE fullname = $1";
      const result = await pool.query(query, [fullName]);
      const user = result.rows[0];
      return user;
    } catch (err) {
      console.error("Error finding user:", err);
      throw new Error("Failed to find user");
    }
  }

  async save() {
    try {
      const query =
        "INSERT INTO users (fullName, email, password) VALUES ($1, $2, $3) RETURNING id";
      const result = await pool.query(query, [
        this.fullName,
        this.email,
        this.password,
      ]);
      this.id = result.rows[0].id;
    } catch (err) {
      console.error("Error saving user:", err);
      throw new Error("Failed to save user");
    }
  }

  static async updateInfo({ userId, fullName, username, birthDate }) {
    try {
      const query =
        "UPDATE users SET fullname = $1, username = $2, birthdate = $3 WHERE id = $4";
      await pool.query(query, [fullName, username, birthDate, userId]);
    } catch (err) {
      console.error("Error updating personal info:", err);
      throw new Error("Failed to update personal info");
    }
  }

  static async updateSecurityInfo({ userId, fullName, hashedPassword }) {
    try {
      const user = await User.findOne({ fullName });

      if (!user) {
        throw new Error("User not found");
      }

      const query = "UPDATE users SET password = $1 WHERE id = $2";
      await pool.query(query, [hashedPassword, userId]);

      return { message: "Password updated successfully" };
    } catch (err) {
      console.error("Error updating security info:", err);
      throw new Error("Failed to update security info");
    }
  }

  static async deleteUserAccount({ userId }) {
    try {
      const deleteAccountQuery = "DELETE FROM users WHERE id = $1";
      await pool.query(deleteAccountQuery, [userId]);

      return { message: "Account deleted successfully" };
    } catch (err) {
      console.error("Error deleting account:", err);
      throw new Error("Failed to delete account");
    }
  }

  static async findByFullName(fullName) {
    try {
      const query = "SELECT * FROM users WHERE fullname = $1";
      const result = await pool.query(query, [fullName]);
      const user = result.rows[0];
      return user ? new User(user) : null;
    } catch (err) {
      console.error("Error finding user by name:", err);
      throw new Error("Failed to find user by name");
    }
  }

  static async findNameById(userId) {
    try {
      const query = "SELECT fullname FROM users WHERE id = $1";
      const result = await pool.query(query, [userId]);
      const user = result.rows[0];
      return user ? user.fullname : null;
    } catch (err) {
      console.error("Error finding user:", err);
      throw new Error("Failed to find user");
    }
  }
}

module.exports = User;
