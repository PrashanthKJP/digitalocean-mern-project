const express = require("express");
const router = express.Router();
const {
  getAllNumber,
  addNumber,
  getSingleNumber,
  updateSingleNumber,
  deletSingleNumber,
} = require("../controler/numberControler");

//get all number
router.get("/getAllNumber", getAllNumber);
router.post("/addNumber", addNumber);
router.get("/getSingleNumber/:id", getSingleNumber);
router.put("/updateSingleNumber/:id", updateSingleNumber);
router.delete("/deletSingleNumber/:id", deletSingleNumber);

module.exports = router;
