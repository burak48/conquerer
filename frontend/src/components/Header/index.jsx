import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">
          <Link to={localStorage.getItem("token") ? "/home" : "/login"}>
            Home
          </Link>
        </h1>
      </div>
      <div>
        {localStorage.getItem("token") && (
          <>
            <Link
              to="/account"
              className="text-blue-500 hover:text-blue-600 mr-4"
            >
              Account
            </Link>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
