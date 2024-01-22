const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  deleteSingleOrder,
  createOrder,
} = require("../controler/orderControler");

router.get("/getAllOrders", getAllOrders);
router.delete("/deleteSingleOrder/:id", deleteSingleOrder);
router.post("/createOrder", createOrder);

module.exports = router;
