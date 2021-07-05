const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  photo: {
    data: Buffer,
    contentType: String,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  comments: [
    {
      comment: {
        type: String,
        required: true,
      },
      commentedBy: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  love: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  claps: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("posts", PostSchema);
