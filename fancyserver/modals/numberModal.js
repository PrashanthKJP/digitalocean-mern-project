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
      type: Object,
    },
    category: {
      type: [String],
    },
    splitNumber1: {
      type: Number,
    },
    splitNumber2: {
      type: Number,
    },
    splitNumber3: {
      type: Number,
    },
    splitNumber4: {
      type: Number,
    },
    splitNumber5: {
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    sort: {
      type: String,
    },
  },
  { timestamps: true }
);

const numberModal = mongoose.model("number", numberSchema);
module.exports = numberModal;
