import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin";
import CreatePost from "./components/CreatePost";
import User from "./components/User";

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/users" element={<User />} />
        <Route path="/createpost" element={<CreatePost />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
};

export default App;
