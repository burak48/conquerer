import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import CreatePostPage from "./components/AddBlog";
import UpdatePostPage from "./components/Posts";
import BlogDetails from "./components/BlogDetails";
import Home from "./components/Home";
import Logout from "./components/Logout";

const App = () => {
  return (
    <BrowserRouter>
      <Logout />
      <Routes>
        <Route
          path="/login"
          element={
            <>
              <Header />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Header />
              <Register />
            </>
          }
        />
        <Route
          path="/account"
          element={
            <>
              <Header />
              <Account />
            </>
          }
        />
        <Route
          path="/post"
          element={
            <>
              <Header />
              <CreatePostPage />
            </>
          }
        />
        <Route
          path="/post/:id"
          element={
            <>
              <Header />
              <UpdatePostPage />
            </>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <>
              <Header />
              <BlogDetails />
            </>
          }
        />
        <Route path="/home" element={<Home />} />
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/home" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
