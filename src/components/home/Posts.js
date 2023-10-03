import React from "react";
import { useSelector } from "react-redux";
import PostCard from "../PostCard";

const Posts = () => {
  const postHome = useSelector((state) => state.postHome);

  return (
    <div>
      <div className="posts">
        {postHome.posts.map((post, index) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
