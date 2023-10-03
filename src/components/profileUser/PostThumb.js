import React from "react";
import { Link } from "react-router-dom";

const PostThumb = ({ posts, result }) => {

  if(result === 0) return <h2 className="text-center">Chưa có bài viết !</h2>

  return (
    <div className="post_thumb">
      {posts.map((post) => (
        <Link key={post._id} to={`/post/${post._id}`}>
          <div className="post_thumb_display">
            <img src={post.img[0].url} alt={post.img[0].url} />
            <div className="post_thumb_menu">
              <i class="fa-solid fa-heart">{post.like.length}</i>
              <i class="fa-solid fa-comment">{post.comments.length}</i>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb;
