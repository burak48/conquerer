import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <header className="bg-white p-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">
          <Link to={token ? "/home" : "/login"}>Home</Link>
        </h1>
      </div>
      <div>
        {token && (
          <>
            <Link
              to="/account"
              className="text-blue-500 hover:text-sky-900 mr-4"
            >
              Profile
            </Link>
            <button
              className="bg-sky-900 hover:bg-sky-950 text-white font-bold py-2 px-4 rounded"
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
