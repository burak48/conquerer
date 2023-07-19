const config = require("../config");
const { Pool } = require("pg");
const Comment = require("./Comment");

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

class Post {
  constructor({ id, title, description, category, user_id }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.userId = user_id;
  }

  static async create({ title, description, category, userId }) {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS posts (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          category VARCHAR(255) NOT NULL,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
        )
      `;
      await pool.query(createTableQuery);

      const insertQuery = `
        INSERT INTO posts (title, description, category, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING id
      `;
      const values = [title, description, category, userId];
      const result = await pool.query(insertQuery, values);

      return result.rows[0].id;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Failed to create post");
    }
  }

  static async findAll() {
    const selectQuery = `
      SELECT * FROM posts
    `;
    const result = await pool.query(selectQuery);
    return result.rows.map((row) => new Post(row));
  }

  static async findById(id) {
    const selectQuery = `
      SELECT * FROM posts WHERE id = $1
    `;
    const result = await pool.query(selectQuery, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    const { title, description, category, user_id } = result.rows[0];
    return new Post({ id, title, description, category, user_id });
  }

  static async update(id, { title, description, category }) {
    try {
      const query =
        "UPDATE posts SET title = $1, description = $2, category = $3 WHERE id = $4 RETURNING *";
      const result = await pool.query(query, [
        title,
        description,
        category,
        id,
      ]);
      return result.rows[0];
    } catch (error) {
      console.error("Error updating post:", error);
      throw new Error("Failed to update post");
    }
  }

  static async delete(id) {
    try {
      const query = "DELETE FROM posts WHERE id = $1 RETURNING *";
      const result = await pool.query(query, [id]);
      console.log("result: ", result.rows[0]);
      // return result.rows[0];
    } catch (error) {
      console.error("Error deleting post:", error);
      throw new Error("Failed to delete post");
    }
  }

  static async getComments(id) {
    return Comment.findByBlogId(id);
  }
}

module.exports = Post;
