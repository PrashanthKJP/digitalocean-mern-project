const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    numbers: {
      type: [String],
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const orderModal = mongoose.model("order", orderSchema);
module.exports = orderModal;
