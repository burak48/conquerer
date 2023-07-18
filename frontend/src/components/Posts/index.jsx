import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePostPage = ({ postId }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/posts/${id}`
        );
        const data = response.data;

        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedData = {
        userId: user.id,
        title,
        description,
        category,
      };

      await axios.put(
        `${process.env.REACT_APP_API_URL}/posts/${id}`,
        updatedData
      );

      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`);

      navigate("/home");
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Update a Post</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Title"
            />
          </div>
          <div>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-80 resize-none border border-gray-300 p-2 rounded"
              placeholder="Description"
            ></textarea>
          </div>
          <div>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-1/2 border border-gray-300 p-2 rounded"
              required
            >
              <option value="">Choose category</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Business">Business</option>
              <option value="Money">Money</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
          <div className="flex justify-between items-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              Delete Post
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePostPage;
