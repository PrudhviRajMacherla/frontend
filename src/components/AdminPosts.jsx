import React, { useState,useEffect } from 'react'
import toast from 'react-hot-toast';

const AdminPosts = () => {
  const [posts,setposts]= useState([]);
  const patchData = async (id) => {
    try {
      const data = await fetch(`http://localhost:5000/api/admin/post/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      const res = await data.json();
      console.log("Before filter");
      console.log(res);
      setposts(posts.filter((post) => post.id !== id));

      console.log("After filter");
      toast.success("Post approved successfully");
    } catch (err) {
      console.log(err);
    }
  }
  const getData = async () => {
    try {
      const data = await fetch("http://localhost:5000/api/post/allposts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      const res = await data.json();
      console.log(res);
      setposts(res);
     
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
      getData();
    }, []);
  return (
    <div className='w-1/2 border-black border'>
        <h1 className='text-center'>This contains list of all the posts that came for approval</h1>
        {posts.length == 0 ? (
        <h1 className="text-2xl text-center">No Post present to approve</h1>
      ) : (
        <ul className="text-center gap-2">
          {posts.map((post) => {
            return <li className='border-black border gap-4'>{post.title}{"   "}
            {post.content}
            <button  className='bg-green-500 text-white'onClick={() => patchData(post._id)}>Click to Approve</button>
            </li>;
          })}
        </ul>
      )}
    </div>
  )
}

export default AdminPosts