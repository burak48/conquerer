import React, { useState } from "react";
import axios from "axios";

const Account = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [fullName, setFullName] = useState(user.fullName);
  const [username, setUsername] = useState(user?.userName);
  const [birthDate, setBirthDate] = useState(user?.birthDate);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleUpdatePersonalInfo = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/account/update-personal-info`,
        {
          userId: user.id,
          fullName,
          username,
          birthDate,
        }
      );

      const updatedUser = {
        ...user,
        fullName,
        userName: username,
        birthDate,
      };

      setFullName(updatedUser.fullName);
      setUsername(updatedUser.userName);
      setBirthDate(updatedUser.birthDate);

      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating personal info:", error);
    }
  };

  const handleUpdateSecurity = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      console.error("New password and confirm password do not match");
      return;
    }

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/account/update-security`,
        {
          userId: user.id,
          fullName,
          newPassword,
        }
      );

      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error updating security:", error);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/account/delete-account`,
        {
          data: {
            userId: user.id,
          },
        }
      );
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Personal Info</h2>
        <form onSubmit={handleUpdatePersonalInfo}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block mb-1">
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block mb-1">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="birthDate" className="block mb-1">
              Birth Date:
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Update Personal Info
          </button>
        </form>

        <h2 className="text-2xl font-bold mt-8 mb-4">Security</h2>
        <form onSubmit={handleUpdateSecurity}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block mb-1">
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmNewPassword" className="block mb-1">
              Confirm New Password:
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Update Security
          </button>
        </form>
        <h2 className="text-2xl font-bold mt-8">Delete Account</h2>
        <form onSubmit={handleDeleteAccount}>
          <p className="text-red-500 mb-4">
            Are you sure you want to delete your account?
          </p>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
