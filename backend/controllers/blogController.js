const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

exports.getBlogDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Post.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const comments = await Post.getComments(id);
    const commenter = await User.findNameById(comments.commenter_id);

    res.json({ blog, comments, commenter });
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

    const comment = await Comment.create({ blogId: id, commenterId, content });

    res.status(201).json({ comment });
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};
