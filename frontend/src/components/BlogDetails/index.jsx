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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/blogs/${id}`)
      .then((response) => {
        const { blog, comments } = response.data;
        setBlog(blog);
        setComments(comments);
      });
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/blogs/${id}/comments`,
      {
        commenterName: user.fullName,
        content: commentContent,
      }
    );

    setComments([...comments, response.data]);
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
            <h2 className="text-3xl font-bold mb-2">{blog.title}</h2>
            <p>{blog.createdAt}</p>
            <p>Author: {blog.authorName}</p>
            <p>Category: {blog.category}</p>
            <p className="text-gray-600 mb-4">{blog.description}</p>
            {blog.updatedAt && (
              <p className="text-gray-500">Updated: {blog.updatedAt}</p>
            )}
          </div>
        )}

        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2">Comments</h3>
          <hr className="mb-4" />
          {comments.length > 0 && (
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="mb-2">
                  <div className="grid grid-cols-12">
                    <div className="col-span-2 font-bold">
                      {comment.commenterName}
                    </div>
                    <div className="col-span-10 text-gray-600">
                      {comment.content}
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
                <span className="block mb-2">TEST USER</span>
              </div>
              <div className="col-span-10">
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded mb-4"
                  placeholder="Write your comment..."
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
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
