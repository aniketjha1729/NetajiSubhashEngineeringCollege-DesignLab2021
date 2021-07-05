const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPost,
  getPostById,
  addLikes,
  addLove,
  addClaps,
  addComment,
  photo,
} = require("../controllers/post");
const { isUserAuth } = require("../middleware/auth");

/*<=======================================================================================================>*/

router.get("/test", (req, res) => {
  res.status(200).json({
    Message: "User Routes Working",
  });
});

router.post("/createPost", isUserAuth, createPost);

router.put("/addLikes/:postId", isUserAuth, addLikes);

router.put("/addLove/:postId", isUserAuth, addLove);

router.put("/addClaps/:postId", isUserAuth, addClaps);

router.post("/addComments/comment/:postId", isUserAuth, addComment);

router.get("/allPosts", getAllPost);

router.get("/getPostById/:postId", getPostById);

router.get("/photo/:postId", photo);

module.exports = router;
