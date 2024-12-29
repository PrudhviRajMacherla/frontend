import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const postData = async () => {
    try {
      const data = await fetch("http://localhost:5000/api/post/createpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
      const res = await data.json();
      console.log("Response", res);
      if (res.success) {
        toast.success("Post Created Successfully");
        navigate("/users");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred during post creation");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, content);
    postData();
    setTitle("");
    setContent("");
  };
  return (
    <div>
      <form 
      className="flex flex-col w-1/2 mx-auto  border shadow-lg p-2 mt-10 p-10"
      onSubmit={handleSubmit}>
        <span>Create Post</span>
        <input
          type="text"
          placeholder="title"
          value={title}
          className="my-2 border border-black"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="textarea"
          placeholder="Enter the text"
          value={content}
          className="my-2 border border-black"  
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
