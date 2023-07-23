import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

const LastPosts = ({ searchResults }) => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/posts`,
          { headers }
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        </div>
      ))}
    </div>
  );
};

export default LastPosts;
