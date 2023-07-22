const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

let commentsTableCreated = false;

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
};

const getFormattedCommentDate = (comments) => {
  if (!Array.isArray(comments)) {
    throw new Error(
      "Invalid comments data. Please provide an array of comments."
    );
  }

  const now = new Date();

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  return comments.map((comment) => {
    if (!comment.created_at || !(comment.created_at instanceof Date)) {
      throw new Error(
        "Invalid comment date. Please provide a valid Date object."
      );
    }

    const commentTime = comment.created_at;
    const timeDiff = now - commentTime;
    const seconds = Math.floor(timeDiff / 1000);

    if (seconds < 60) {
      return { ...comment, formattedDate: rtf.format(-seconds, "second") };
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return { ...comment, formattedDate: rtf.format(-minutes, "minute") };
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return { ...comment, formattedDate: rtf.format(-hours, "hour") };
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
      return { ...comment, formattedDate: rtf.format(-days, "day") };
    }

    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
      return { ...comment, formattedDate: rtf.format(-weeks, "week") };
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
      return { ...comment, formattedDate: rtf.format(-months, "month") };
    }

    const years = Math.floor(days / 365);
    return { ...comment, formattedDate: rtf.format(-years, "year") };
  });
};

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

    const formattedUpdatedDate = formatDate(blog.updated_at);
    blog.updated_at = formattedUpdatedDate;

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
