import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import ImageHelper from "./ImageHelper";
import "./posts.css";

const Posts = ({ isAuthenticated }) => {
  const [allPosts, setAllPosts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [commentId, setCommentId] = useState();

  const sortByDate = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  };

  const toggleComment = (postId) => {
    setCommentId(postId);
  };

  const getAllPost = async () => {
    try {
      const { data } = await axios.get("/post/allPosts");
      const sortedData = data.sort(sortByDate);
      setAllPosts(sortedData);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addLikes = async (postId) => {
    try {
      const { data } = await axios.put(`/post/addLikes/${postId}`);
      getAllPost();
    } catch (err) {
      console.log(err);
    }
  };

  const addLove = async (postId) => {
    try {
      const { data } = await axios.put(`/post/addLove/${postId}`);
      getAllPost();
    } catch (err) {
      console.log(err);
    }
  };

  const addClaps = async (postId) => {
    try {
      const { data } = await axios.put(`/post/addClaps/${postId}`);
      getAllPost();
    } catch (err) {
      console.log(err);
    }
  };

  const makeComment = async (comment, postId, e) => {
    const body = { comment };
    try {
      const { data } = await axios.post(
        `/post/addComments/comment/${postId}`,
        body
      );
      e.target[0].value = "";
      getAllPost();
    } catch (err) {
      console.log(err);
    }
  };

  const filterByCategory = async (e) => {
    setCategoryName(e.target.value);
    try {
      const { data } = await axios.get("/post/allPosts");
      const filteredData = data.filter(
        (item) => item.category == e.target.value
      );
      setAllPosts(filteredData);
      console.log(allPosts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);
  return (
    <>
      <div className="filterContainer">
        <select
          name="filterByStream"
          value={categoryName}
          onChange={(value) => filterByCategory(value)}
          className="customSelect"
        >
          <option value="">Category</option>
          <option value="Comedy">Comedy</option>
          <option value="Thriller">Thriller</option>
          <option value="Drama">Drama</option>
        </select>
      </div>
      <div className="posts">
        {allPosts.map((post) => (
          <>
            <div className="post">
              <ImageHelper postId={post._id} />
              <div className="postInfo">
                <div className="postCats">
                  <span className="postCat"></span>
                </div>
                <Link to="" className="link">
                  <span className="postTitle">{post.title}</span>
                </Link>
                <hr />
                <span className="postDate">
                  {new Date(post.date).toDateString()}
                </span>
              </div>
              <p className="postDesc">{post.content}</p>
              <Link to={`/post/${post._id}`} className="">
                Read More...
              </Link>
              <div className="postAction">
                <div className="postReaction">
                  <div
                    className="postLike"
                    onClick={() => {
                      addLikes(post._id);
                    }}
                  >
                    👍 {post.likes.length}
                  </div>
                  <div
                    className="postLike"
                    onClick={() => {
                      addLove(post._id);
                    }}
                  >
                    {" "}
                    😍{post.love.length}
                  </div>
                  <div
                    className="postLike"
                    onClick={() => {
                      addClaps(post._id);
                    }}
                  >
                    {" "}
                    👏{post.claps.length}
                  </div>
                </div>
                <div className="commentButton" style={{ cursor: "pointer" }}>
                  <div
                    className="postLike"
                    onClick={() => toggleComment(post._id)}
                  >
                    📝{post.comments.length}
                  </div>
                </div>
              </div>
              {commentId == post._id ? (
                <div className="commentContainer">
                  <div className="previousCommnets">
                    {post.comments.map((comment) => (
                      <p>{comment.comment}</p>
                    ))}
                  </div>
                  {isAuthenticated ? (
                    <div className="addCommnetContainer">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          makeComment(e.target[0].value, post._id, e);
                        }}
                      >
                        <div className="form-group">
                          <input
                            style={{ width: "100%", height: "30px" }}
                            type="text"
                            className="commentInput"
                            placeholder="Write a comment..."
                          />
                        </div>
                      </form>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Posts;
