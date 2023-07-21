import React, { useState } from "react";
import axios from "axios";

const SearchPosts = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/search`,
        {
          params: { search_term: searchQuery },
        }
      );
      console.log("response.data: ", response.data);
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="w-full border border-gray-300 p-2 rounded mb-4"
        placeholder="Search by post title..."
      />
    </div>
  );
};

export default SearchPosts;
