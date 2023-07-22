import React, { useState } from "react";
import MyComments from "../MyComments";
import { Link } from "react-router-dom";
import MyPosts from "../MyPosts";
import LastPosts from "../LastPosts";
import CategoryPosts from "../CategoryPosts";
import SearchPosts from "../SearchPosts";

const Home = () => {
  const [activeTab, setActiveTab] = useState("My Posts");

  const handleTabClick = (tabTitle) => {
    setActiveTab(tabTitle);
  };

  return (
    <div className="p-4 flex flex-col min-h-screen">
      <div className="grid md:grid-cols-3 md:gap-4 flex-grow">
        {/* Left grid */}
        <div className="flex flex-col justify-between items-center">
          <div className="my-12">
            <h4 className="text-xl font-bold flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>

              <Link to={localStorage.getItem("token") ? "/home" : "/login"}>
                Home
              </Link>
            </h4>
            <div className="my-8 flex items-center">
              <h4 className="text-xl font-bold flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>

                <Link to="/account" className="mr-4">
                  Profile
                </Link>
              </h4>
            </div>
          </div>

          <div className="w-1/2">
            <Link to="/post">
              <button className="w-full bg-sky-900 hover:bg-sky-950 text-white font-bold py-2 px-4 rounded">
                Post
              </button>
            </Link>
          </div>

          <div className="w-1/2">
            <Link to="/login">
              <button className="w-full bg-sky-900 hover:bg-sky-950 text-white font-bold py-2 px-4 rounded">
                Logout
              </button>
            </Link>
          </div>
        </div>

        {/* Middle grid */}
        <div className="my-8">
          <SearchPosts />

          <div className="border-b border-gray-300 mb-4 space-x-4">
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
            {activeTab === "My Posts" && <MyPosts />}

            {activeTab === "Last Posts" && <LastPosts />}

            {activeTab === "Business" && (
              <CategoryPosts category={"Business"} />
            )}

            {activeTab === "Money" && <CategoryPosts category={"Money"} />}

            {activeTab === "Technology" && (
              <CategoryPosts category={"Technology"} />
            )}

            {activeTab === "Artificial Intelligence" && (
              <CategoryPosts category={"Artificial Intelligence"} />
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
