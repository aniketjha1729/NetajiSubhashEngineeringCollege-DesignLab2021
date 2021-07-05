const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const { signIn, signUp, currentProfile } = require("../controllers/user");

const { isUserAuth } = require("../middleware/auth");

/*<=======================================================================================================>*/

router.get("/test", (req, res) => {
  res.status(200).json({
    Message: "User Routes Working",
  });
});

router.get("/currentUser", isUserAuth, currentProfile);

router.post(
  "/signin",
  check("email", "Please include a valid email").isEmail(),
  signIn
);

router.post(
  "/signup",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  signUp
);

module.exports = router;
