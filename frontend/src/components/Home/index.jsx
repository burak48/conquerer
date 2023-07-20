import React, { useState } from "react";
import MyComments from "../MyComments";

const Home = () => {
  const [activeTab, setActiveTab] = useState("My Posts");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter posts based on searchQuery
  //   const filteredPosts = posts.filter((post) =>
  //     post.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {/* Left grid */}
        <div></div>

        {/* Middle grid */}
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full border border-gray-300 p-2 rounded mb-4"
            placeholder="Search by post title..."
          />

          <div className="flex border-b border-gray-300 mb-4 space-x-4">
            <button
              className={`tablinks ${
                activeTab === "My Posts"
                  ? "active text-blue-500 border-b-2 border-blue-500"
                  : ""
              }`}
              onClick={() => handleTabClick("My Posts")}
            >
              My Posts
            </button>
            <button
              className={`tablinks ${
                activeTab === "Last Posts"
                  ? "active text-blue-500 border-b-2 border-blue-500"
                  : ""
              }`}
              onClick={() => handleTabClick("Last Posts")}
            >
              Last Posts
            </button>
            <button
              className={`tablinks ${
                activeTab === "Business"
                  ? "active text-blue-500 border-b-2 border-blue-500"
                  : ""
              }`}
              onClick={() => handleTabClick("Business")}
            >
              Business
            </button>
            <button
              className={`tablinks ${
                activeTab === "Money"
                  ? "active text-blue-500 border-b-2 border-blue-500"
                  : ""
              }`}
              onClick={() => handleTabClick("Money")}
            >
              Money
            </button>
            <button
              className={`tablinks ${
                activeTab === "Technology"
                  ? "active text-blue-500 border-b-2 border-blue-500"
                  : ""
              }`}
              onClick={() => handleTabClick("Technology")}
            >
              Technology
            </button>
            <button
              className={`tablinks ${
                activeTab === "Artificial Intelligence"
                  ? "active text-blue-500 border-b-2 border-blue-500"
                  : ""
              }`}
              onClick={() => handleTabClick("Artificial Intelligence")}
            >
              Artificial Intelligence
            </button>
          </div>

          <div className="tabcontent">
            {activeTab === "My Posts" && (
              <div>
                <h3>My Posts</h3>
                <p>This is the content for "My Posts".</p>
              </div>
            )}

            {activeTab === "Last Posts" && (
              <div>
                <h3>Last Posts</h3>
                <p>This is the content for "Last Posts".</p>
              </div>
            )}

            {activeTab === "Business" && (
              <div>
                <h3>Business</h3>
                <p>This is the content for "Business".</p>
              </div>
            )}

            {activeTab === "Money" && (
              <div>
                <h3>Money</h3>
                <p>This is the content for "Money".</p>
              </div>
            )}

            {activeTab === "Technology" && (
              <div>
                <h3>Technology</h3>
                <p>This is the content for "Technology".</p>
              </div>
            )}

            {activeTab === "Artificial Intelligence" && (
              <div>
                <h3>Artificial Intelligence</h3>
                <p>This is the content for "Artificial Intelligence".</p>
              </div>
            )}
          </div>
        </div>

        {/* Right grid */}
        <>
          <MyComments />
        </>
      </div>
    </div>
  );
};

export default Home;
