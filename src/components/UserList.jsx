import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setusers] = useState([]);
  const getData = async () => {
    try {
      const data = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      const res = await data.json();
      setusers(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-1/2 border-black border">
      <h1 className="text-center">This contains list people</h1>
      {users.length == 0 ? (
        <h1 className="text-2xl ">No Users</h1>
      ) : (
        <ul className="text-center">
          {users.map((user,idx) => {
            return <li key={idx}>{user.username} -{user.role} </li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default UserList;
