import React, { useState } from "react";
import axios from "axios";

const CreatePostPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const title = e.target.title.value;
      const description = e.target.description.value;
      const category = e.target.category.value;

      await axios.post(`${process.env.REACT_APP_API_URL}/posts`, {
        userId: user.id,
        title,
        description,
        category,
      });

      setTitle("");
      setDescription("");
      setCategory("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-2xl w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="Title"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full h-80 resize-none border border-gray-300 p-2 rounded"
              placeholder="Description"
              required
            ></textarea>
          </div>
          <div className="flex justify-between items-center">
            <select
              id="category"
              name="category"
              value={category}
              onChange={handleCategoryChange}
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
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
