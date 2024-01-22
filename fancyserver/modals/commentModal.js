const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const commentModal = mongoose.model("comment", commentSchema);
module.exports = commentModal;
