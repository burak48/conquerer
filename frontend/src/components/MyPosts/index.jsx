import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

const MyPosts = ({ searchResults }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [posts, setPosts] = useState([]);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/posts/user/${user.id}`,
          { headers }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  let postsToDisplay = searchResults.length ? searchResults : posts;

  return (
    <div className="custom-max-height-75 overflow-y-auto">
      {postsToDisplay.map((post) => (
        <div
          key={post.id}
          className="bg-white py-8 mb-4 flex justify-between items-center"
        >
          <div>
            <span className="text-gray-500 text-sm">{post.category}</span>
            <Link to={`/blogs/${post.id}`}>
              <h1 className="text-lg font-bold">{post.title}</h1>
            </Link>
            <span className="text-gray-500 text-sm">
              {post.comments_count} comments
            </span>
          </div>
          <Link to={`/post/${post.id}`}>
            <button className="bg-sky-900 hover:bg-sky-950 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
