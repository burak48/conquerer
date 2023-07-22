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

  static async create({
    title,
    description,
    category,
    userId,
    created_at,
    updated_at,
  }) {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS posts (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          category VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NULL,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
        )
      `;
      await pool.query(createTableQuery);

      const insertQuery = `
        INSERT INTO posts (title, description, category, user_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;
      const values = [
        title,
        description,
        category,
        userId,
        created_at,
        updated_at,
      ];
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
      ORDER BY created_at DESC
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

    return result.rows[0];
  }

  static async update(id, { title, description, category, updated_at }) {
    try {
      const query =
        "UPDATE posts SET title = $1, description = $2, category = $3, updated_at = $4 WHERE id = $5 RETURNING *";
      const result = await pool.query(query, [
        title,
        description,
        category,
        updated_at,
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

  static async getPostsByUserId(userId) {
    try {
      const query = `
      SELECT
        p.id,
        p.category,
        p.title,
        COUNT(c.id) AS comments_count
      FROM posts p
      LEFT JOIN comments c ON p.id = c.blog_id
      WHERE p.user_id = $1
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `;
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Failed to fetch posts");
    }
  }

  static async getPostsByCategory(categoryName) {
    try {
      const selectQuery =
        "SELECT * FROM posts WHERE category = $1 ORDER BY created_at DESC";
      const result = await pool.query(selectQuery, [categoryName]);
      return result.rows.map((row) => new Post(row));
    } catch (error) {
      console.error("Error fetching posts by category:", error);
      throw error;
    }
  }

  static async findByTitle(title) {
    try {
      const selectQuery =
        "SELECT * FROM posts WHERE title LIKE $1 ORDER BY created_at DESC";
      const result = await pool.query(selectQuery, [`%${title}%`]);
      return result.rows.map((row) => new Post(row));
    } catch (error) {
      console.error("Error fetching posts by title:", error);
      throw error;
    }
  }

  static async getCommentsWithCommenterInfo(postId) {
    try {
      const query = `
        SELECT
          comments.*,
          users.fullName AS commenterName
        FROM
          comments
        INNER JOIN
          users
        ON
          comments.commenter_id = users.id
        WHERE
          comments.blog_id = $1
      `;
      const values = [postId];
      const result = await pool.query(query, values);
      return result.rows;
    } catch (err) {
      console.error("Error fetching comments with commenter info:", err);
      throw new Error("Failed to fetch comments with commenter info");
    }
  }
}

module.exports = Post;
