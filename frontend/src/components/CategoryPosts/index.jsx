import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

const CategoryPosts = ({ category, searchResults }) => {
  const token = localStorage.getItem("token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/posts/category/${category}`,
          { headers }
        );
        setCategories(response.data);
      } catch (error) {
        console.error(`Error fetching ${category} posts:`, error);
      }
    };

    fetchPostsByCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const postsInCategory = searchResults.filter(
    (post) => post.category === category
  );

  let postsToDisplay = searchResults.length ? postsInCategory : categories;

  return (
    <div className="custom-max-height-75 overflow-y-auto">
      {postsToDisplay.length > 0 ? (
        postsToDisplay.map((post, index) => (
          <div
            key={index}
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
        ))
      ) : (
        <p>No posts found in the {category} category.</p>
      )}
    </div>
  );
};

export default CategoryPosts;
