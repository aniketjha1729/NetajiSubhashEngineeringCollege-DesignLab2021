import React from "react";
import "./singlePost.css";

const SingleImageHelper = ({ postId }) => {
  const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/post/photo/${postId}`;
  return (
    <img
      className="singlePostImg"
      src={imageUrl}
      alt="..."
    />
  );
};

export default SingleImageHelper;
