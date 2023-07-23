const config = require("../config");
const { Pool } = require("pg");
const User = require("./User");

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

class Comment {
  constructor({ id, blogId, commenterName, content, createdAt }) {
    this.id = id;
    this.blogId = blogId;
    this.commenterName = commenterName;
    this.content = content;
    this.createdAt = createdAt;
  }

  static async newComment({ blogId, commenterId, content }) {
    try {
      const insertQuery = `
        INSERT INTO comments (blog_id, commenter_id, content)
        VALUES ($1, $2, $3)
        RETURNING id, created_at
      `;
      const values = [blogId, commenterId, content];
      const result = await pool.query(insertQuery, values);
      return new Comment({ ...result.rows[0], blogId, commenterId });
    } catch (err) {
      console.error("Error creating comment:", err);
      throw new Error("Failed to create comment");
    }
  }

  static async findByBlogId(blogId) {
    try {
      const query = "SELECT * FROM comments WHERE blog_id = $1";
      const result = await pool.query(query, [blogId]);

      const comments = result.rows.map(async (row) => {
        const commenterName = await User.findNameById(row.commenter_id);
        return { ...row, commenterName };
      });
      return Promise.all(comments);
    } catch (err) {
      console.error("Error finding comments:", err);
      throw new Error("Failed to find comments");
    }
  }

  static async createTable() {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS comments (
          id SERIAL PRIMARY KEY,
          blog_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
          commenter_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          content TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `;

      await pool.query(createTableQuery);
    } catch (error) {
      console.error("Error creating comments table:", error);
      throw new Error("Failed to create comments table");
    }
  }

  static async getComments(userId) {
    try {
      const query = `
        SELECT
          comments.id,
          comments.commenter_id,
          comments.content,
          comments.created_at,
          users.fullName AS commenterName
        FROM
          comments
        INNER JOIN
          users
        ON
          comments.commenter_id = users.id
        WHERE
          comments.commenter_id = $1
        ORDER BY comments.created_at DESC;
      `;
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (err) {
      console.error("Error fetching comments:", err);
      throw new Error("Failed to fetch comments");
    }
  }
}

module.exports = Comment;
