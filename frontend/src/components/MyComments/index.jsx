import React, { useState, useEffect } from "react";
import axios from "axios";

const MyComments = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [numCommentsToShow, setNumCommentsToShow] = useState(3);
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [myComments, setMyComments] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/blogs/comments/${user.id}`)
      .then((response) => {
        setMyComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [user.id]);

  const handleShowMoreComments = () => {
    setNumCommentsToShow(myComments.length);
    setShowMoreButton(false);
  };

  console.log(myComments);

  return (
    <div
      className="border border-gray-300 p-2 mt-8 rounded flex flex-col overflow-y-auto"
      style={{
        maxHeight: "500px",
      }}
    >
      <h3 className="text-xl font-bold mb-4">My Comments</h3>
      <div className="grid grid-cols-2 gap-4">
        {myComments.slice(0, numCommentsToShow).map((comment) => (
          <React.Fragment key={comment.id}>
            <div className="flex items-center">
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
              <p className="font-bold ml-4">{comment.commentername}</p>
            </div>
            <div>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="h-full flex items-end">
        {showMoreButton && myComments.length > numCommentsToShow && (
          <button
            onClick={handleShowMoreComments}
            className="text-blue-500 hover:text-sky-900 mt-8"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default MyComments;
