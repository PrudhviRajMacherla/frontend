import { jwtDecode } from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const admin = localStorage.getItem("role");
  const decoded = jwtDecode(localStorage.getItem("token"));
  const Logout = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
   
  };
  return (
    <div>
      <nav className="w-full bg-blue-500 flex justify-between mx-auto p-2">
            <Link className="ml-16 text-white font-bold ">  {decoded.username} - {admin} </Link> 
            {
              admin === "User" &&<Link to="/createpost"  className="mr-16 rounded text-blue font-bold bg-white  ">Create Post</Link>
            } 
            <Link to="/"  className="mr-16 rounded text-white font-bold " onClick={Logout}>Logout</Link>
            </nav>
    </div>
  );
};

export default Navbar;

