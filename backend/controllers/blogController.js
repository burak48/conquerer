const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const { formatDate, getFormattedCommentDate } = require("../utils/helpers");

let commentsTableCreated = false;

exports.getBlogDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Post.findById(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (!commentsTableCreated) {
      await Comment.createTable();
      commentsTableCreated = true;
    }

    let comments = await Post.getCommentsWithCommenterInfo(id);

    const formattedCommentDate = getFormattedCommentDate(comments);
    comments = formattedCommentDate;

    const authorName = await User.findNameById(blog.user_id);
    blog.author_name = authorName;

    const formattedCreatedDate = formatDate(blog.created_at);
    blog.created_at = formattedCreatedDate;

    if (blog.updated_at !== null) {
      const formattedUpdatedDate = formatDate(blog.updated_at);
      blog.updated_at = formattedUpdatedDate;
    }
    res.json({ blog, comments });
  } catch (err) {
    console.error("Error fetching blog details:", err);
    res.status(500).json({ error: "Failed to fetch blog details" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { commenterName, content } = req.body;
    const commenter = await User.findByFullName(commenterName);
    if (!commenter) {
      return res.status(404).json({ error: "Commenter not found" });
    }
    const commenterId = commenter.id;
    const comment = await Comment.newComment({
      blogId: id,
      commenterId,
      content,
    });
    res.status(201).json({ comment });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

exports.getCommentsByUserId = async (req, res) => {
  const { id } = req.params;

  try {
    const myComments = await Comment.getComments(id);
    res.json(myComments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
