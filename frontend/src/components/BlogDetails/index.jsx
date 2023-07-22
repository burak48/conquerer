import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  //   const [commenterName, setCommenterName] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [numComments, setNumComments] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/blogs/${id}`)
      .then((response) => {
        const { blog, comments } = response.data;
        setBlog(blog);
        setComments(comments);
        setNumComments(comments.length);
      });
  }, [id, numComments]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentContent.trim()) {
      setError("Comment content can't be empty");
      return;
    }

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/blogs/${id}/comments`,
      {
        commenterName: user.fullName,
        content: commentContent,
      }
    );
    setError("");
    setComments([...comments, response.data]);
    setCommentContent("");
    setNumComments(numComments + 1);
  };

  const handleCancelComment = () => {
    setCommentContent("");
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-6xl w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        {blog && (
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
            <p className="mb-8">
              {blog.created_at} Posted by {blog.author_name} in {blog.category}
            </p>
            <p className="text-gray-600 mb-4">{blog.description}</p>
            {blog.updated_at && (
              <p className="text-gray-500 flex justify-end">
                Updated at {blog.updated_at}
              </p>
            )}
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2">Comments</h3>
          <hr className="mb-4" />
          {comments.length > 0 && (
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="mb-2">
                  <div className="grid grid-cols-12">
                    <div className="col-span-2 font-bold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-12 h-12"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="block mx-2">
                        {comment.commentername}
                      </span>
                    </div>
                    <div className="col-span-10 text-gray-600">
                      <div className="mb-2">
                        {comment.commentername} commented{" "}
                        {comment.formattedDate}
                      </div>
                      <div>{comment.content}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-4">Leave a Comment</h3>
          <form onSubmit={handleAddComment}>
            <div className="grid grid-cols-12 mb-4">
              <div className="col-span-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="block mx-2">{user.fullName}</span>
              </div>
              <div className="col-span-10">
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded mb-4"
                  placeholder="Write your comment..."
                ></textarea>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                onClick={handleCancelComment}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Submit Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
