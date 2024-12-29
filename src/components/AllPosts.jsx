import React from 'react';
import { useState, useEffect } from 'react';


const AllPosts = () => {
      const[myposts,setmyposts]= useState([]);
    const getData = async () => {
            try {
              const data = await fetch("http://localhost:5000/api/post/allapprovedposts", {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${localStorage.getItem("token")}`,
                },
              });
              const res = await data.json();
              setmyposts(res);
            } catch (err) {
              console.log(err);
            }
          };
          useEffect(() => {
            getData();
          }, []);
  return (
    <div className='w-1/2 border-black border text-center'>All Posts Approved by Admin
        {myposts.length == 0 ? (
        <h1 className="text-2xl ">No Posts</h1>
      ) : ( 
        <ul className="text-center gap-2 border border-black">
          {myposts.map((post) => {
            return <li>{post.title} -- {post.content} -- {post.status} </li>;
          })}
        </ul>)}
    </div>
  )
}

export default AllPosts