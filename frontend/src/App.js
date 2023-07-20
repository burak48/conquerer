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

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/post" element={<CreatePostPage />} />
        <Route path="/post/:id" element={<UpdatePostPage />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
