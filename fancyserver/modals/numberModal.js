const mongoose = require("mongoose");

const numberSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    oneTimeSum: {
      type: Number,
    },
    secondTimeSum: {
      type: Number,
    },
    thridTimeSum: {
      type: Number,
    },
    currentUserId: {
      type: String,
    },
    category: {
      type: [String],
    },
    splitNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

const numberModal = mongoose.model("number", numberSchema);
module.exports = numberModal;
