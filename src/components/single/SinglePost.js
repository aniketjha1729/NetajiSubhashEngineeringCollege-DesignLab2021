import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./singlePost.css";
import ImageHelper from "./ImageHelper";

const SinglePost = () => {
  const [post, setPost] = useState();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const getPost = async () => {
    try {
      const { data } = await axios.get(`/post/getPostById/${path}`);
      setPost(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost();
    console.log(path);
  }, []);
  return (
    <div className="singlePost">
      {post ? (
        <div className="singlePostWrapper">
          <ImageHelper postId={post._id} />
          <h1 className="singlePostTitle">
            {post.title}
            {/* <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div> */}
          </h1>
          <div className="singlePostInfo">
            <span>
              Author: &nbsp;
              <b className="singlePostAuthor">
                <Link className="link" to="/posts?username=Safak">
                  {post.postedBy.name}
                </Link>
              </b>
            </span>
            <span>{new Date(post.date).toDateString()}</span>
          </div>
          <p className="singlePostDesc">{post.content}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SinglePost;
