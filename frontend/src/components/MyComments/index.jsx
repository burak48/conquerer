import React from "react";

const MyComments = () => {
  // Sample data for comments
  const myComments = [
    { id: 1, commenterName: "User 1", content: "Comment 1" },
    { id: 2, commenterName: "User 2", content: "Comment 2" },
    { id: 3, commenterName: "User 3", content: "Comment 3" },
  ];

  return (
    <div className="border border-gray-300 p-2 rounded">
      <h3 className="text-xl font-bold mb-4">My Comments</h3>
      <div className="grid grid-cols-2 gap-4">
        {myComments.map((comment) => (
          <React.Fragment key={comment.id}>
            <div>
              <p className="font-bold">{comment.commenterName}</p>
            </div>
            <div>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MyComments;
