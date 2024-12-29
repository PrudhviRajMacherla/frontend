import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const postData = async () => {
    try{
      const data = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,password
        })}
      );
      const res = await data.json();
      // decoding the token to get the role
      const decoded = jwtDecode(res.token);
      // when the login is successfull it will return the token we will store it in the localstorage
      if(res.success){
        localStorage.setItem("token", res.token);
        localStorage.setItem("role",decoded.role);
        toast.success('Login Successfull');
        if(decoded.role === 'Admin'){
          navigate('/admin');
        }
        else if(decoded.role === 'User'){
          navigate('/users');
        }
        else{
          navigate('/');
        }
      }
    }
    catch(err){
      console.log(err);
      toast.error('Make sure Credentials are correct');
    }
  };  
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username, password);
    // calling the backend using login api
    postData();
    setusername("");
    setpassword("");
  };
  return (
    <div>
      <form
        className="flex flex-col w-1/6 mx-auto  border shadow-lg p-2 mt-10"
        onSubmit={handleLogin}
      >
        <span className="text-2xl text-center">Login Form</span>
        <input
          type="text"
          className="border border-black my-5"
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="password"
          className="border border-black my-5"
          placeholder="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button
          type="submit"
          className="border border-black my-10 bg-black text-white"
        >
          Login
        </button>
        <Link className="ml-16 text-blue-400" to="/register">dont have an account ? </Link>
      </form>
    </div>
  );
};

export default Login;
