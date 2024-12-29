import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("");
  const navigate = useNavigate();

  const postData = async () => {
    if (!role) {
      toast.error("Please select a role");
      return;
    }
    try {
      const data = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          role: role,
        }),
      });
      const res = await data.json();
      console.log("Response", res);
      if (res.success) {
        toast.success("Register Successful");
        navigate("/");
      }
      if (res.message === "Username already exists try other username") {
        toast.error(res.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred during registration");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password, role);
    postData();
    setusername("");
    setpassword("");
    setrole("");
  };

  return (
    <div>
      <form
        className="flex flex-col w-1/6 mx-auto border shadow-lg p-2 mt-10"
        onSubmit={handleRegister}
      >
        <span className="text-2xl text-center">Register Form</span>
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
        <div className="my-5">
          <label className="mr-2">
            <input
              type="radio"
              name="role"
              value="Admin"
              checked={role === "Admin"}
              onChange={(e) => setrole(e.target.value)}
            />
            Admin
          </label>
          <label className="ml-4">
            <input
              type="radio"
              name="role"
              value="User"
              checked={role === "User"}
              onChange={(e) => setrole(e.target.value)}
            />
            User
          </label>
        </div>
        <button
          type="submit"
          className="border border-black my-10 bg-black text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
