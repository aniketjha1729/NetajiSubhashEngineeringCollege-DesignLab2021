import React from "react";
import "./posts.css";

const ImageHelper = ({ postId }) => {
  const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/post/photo/${postId}`;
  return (
    <img
      className="postImg"
      src={imageUrl}
      alt="..."
    />
  );
};

export default ImageHelper;
