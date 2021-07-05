const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const authKey = process.env.SECRET_USER_AUTH_KEY;

exports.currentProfile = async (req, res) => {
  try {
    let user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.json({ errors: [{ msg: "Invalid token" }] });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

exports.getUserById = async (req, res) => {
  try {
    let user = await User.findById({ _id: req.params.userId }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "No user found" }] });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ errors: [{ msg: "Server Error" }] });
  }
};

exports.signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "User does not exists" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }
      const userAuthToken = jwt.sign(
        {
          _id: user._id,
        },
        authKey,
        {
          expiresIn: "48h",
        }
      );
      return res.status(200).json({
        userAuthToken,
      });
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
};

exports.signUp = async (req, res) => {
  console.log("hello");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .json(200)
        .json({ errors: [{ msg: "All fields are required" }] });
    }
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(404)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      const newuser = User({
        name,
        email,
        password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newuser.password, salt, (err, hash) => {
          if (err) throw err;
          newuser.password = hash;
          newuser.save((err, user) => {
            console.log("here");
            res.status(200).json({ success: [{ msg: "Signup Success" }] });
          });
        });
      });
    } catch (err) {
      return res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
  }
};
